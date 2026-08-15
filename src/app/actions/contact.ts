"use server";

import { getSiteSettings } from "@/lib/content";
import { isValidPhoneNumber, parsePhoneNumber } from "libphonenumber-js";
import { Resend } from "resend";
import { z } from "zod";

export type ContactFormValues = {
  name: string;
  email: string;
  phone: string;
  service: string;
  timeline: string;
  message: string;
};

export type ContactFormState = {
  status: "idle" | "success" | "error";
  message: string;
  errors?: Record<string, string[]>;
  /** Echoed back on failure so the form can repopulate what was typed. */
  values?: ContactFormValues;
  /** Increments per attempt so the client can re-seed its fields. */
  submission: number;
};

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Please enter at least 3 characters for your name.")
    .max(100, "Please keep your name under 100 characters."),
  email: z
    .string()
    .trim()
    .min(1, "Please enter your email address.")
    .pipe(z.email("Please enter a valid email address.")),
  phone: z
    .string()
    .trim()
    .min(1, "Please enter a phone number.")
    .refine((value) => isValidPhoneNumber(value, "US"), {
      message: "Please enter a valid US phone number.",
    })
    .transform((value) => parsePhoneNumber(value, "US")?.formatNational() ?? value),
  service: z.enum(["estate-sale", "clean-out", "both", "not-sure"], {
    error: "Please choose how we can help.",
  }),
  timeline: z.string().trim().max(100).optional(),
  message: z
    .string()
    .trim()
    .min(10, "Please share at least 10 characters about the property.")
    .max(3000, "Please keep your message under 3,000 characters."),
  website: z.string().max(0),
  startedAt: z.coerce.number().catch(0),
});

function escapeHtml(value: string) {
  return value.replace(
    /[&<>'"]/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "'": "&#39;",
        '"': "&quot;",
      })[character] || character,
  );
}

const serviceLabels: Record<string, string> = {
  "estate-sale": "Online estate auction",
  "clean-out": "Home clean-out",
  both: "Auction and clean-out",
  "not-sure": "Not sure yet",
};

function contactFallbackMessage(phone: string, email: string) {
  return `Online inquiries are being configured. Please call ${phone} or email ${email}.`;
}

function submittedValues(formData: FormData): ContactFormValues {
  const read = (field: string) => {
    const value = formData.get(field);
    return typeof value === "string" ? value : "";
  };

  return {
    name: read("name"),
    email: read("email"),
    phone: read("phone"),
    service: read("service"),
    timeline: read("timeline"),
    message: read("message"),
  };
}

/**
 * Resend refuses to deliver to anyone but the account owner until a sending
 * domain is verified, so allow redirecting mail while developing locally.
 */
function recipientOverride() {
  if (process.env.NODE_ENV === "production") return undefined;
  return process.env.CONTACT_TO_EMAIL_OVERRIDE?.trim() || undefined;
}

export async function submitContactForm(
  previousState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const submission = previousState.submission + 1;
  const values = submittedValues(formData);
  const fail = (message: string, errors?: Record<string, string[]>): ContactFormState => ({
    status: "error",
    message,
    errors,
    values,
    submission,
  });

  const submitted = contactSchema.safeParse(Object.fromEntries(formData));

  if (!submitted.success) {
    return fail(
      "Please review the highlighted information and try again.",
      submitted.error.flatten().fieldErrors,
    );
  }

  // A missing timestamp means the client script never ran, so skip the bot
  // timing heuristic rather than blocking someone who filled the form out.
  const { startedAt } = submitted.data;
  if (startedAt > 0) {
    const elapsed = Date.now() - startedAt;
    if (elapsed < 1500 || elapsed > 86_400_000) {
      return fail("Please refresh the page and try again.");
    }
  }

  const settings = await getSiteSettings().catch(() => null);
  const fallbackPhone = settings?.phone ?? "440-669-9665";
  const fallbackEmail =
    settings?.email ?? process.env.CONTACT_TO_EMAIL ?? "hansenmcdowell@yahoo.com";

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const override = recipientOverride();
  const to = override ?? settings?.email ?? process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !to || !from) {
    return fail(contactFallbackMessage(fallbackPhone, fallbackEmail));
  }

  const resend = new Resend(apiKey);
  const details = submitted.data;
  const service = serviceLabels[details.service];
  const safeMessage = escapeHtml(details.message).replace(/\n/g, "<br />");

  const { error } = await resend.emails.send({
    from,
    to: [to],
    replyTo: details.email,
    subject: `New website inquiry — ${service}`,
    html: `
      <div style="font-family:Arial,sans-serif;line-height:1.6;color:#25211e;max-width:640px">
        <p style="color:#a3292f;font-size:12px;letter-spacing:.12em;text-transform:uppercase">New website inquiry</p>
        <h1 style="font-family:Georgia,serif;font-weight:400">${escapeHtml(service)}</h1>
        <p><strong>Name:</strong> ${escapeHtml(details.name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(details.email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(details.phone)}</p>
        <p><strong>Timeline:</strong> ${escapeHtml(details.timeline || "Not provided")}</p>
        <p><strong>Message:</strong><br />${safeMessage}</p>
      </div>
    `,
  });

  if (error) {
    console.error("Contact form: Resend rejected the inquiry email", error);
    return fail(
      `We couldn’t send the form just now. Please call ${fallbackPhone} or email ${fallbackEmail}.`,
    );
  }

  const confirmation = await resend.emails.send({
    from,
    to: [override ?? details.email],
    subject: "We received your Hansen McDowell inquiry",
    html: `
      <div style="font-family:Arial,sans-serif;line-height:1.6;color:#25211e;max-width:640px">
        <p style="color:#a3292f;font-size:12px;letter-spacing:.12em;text-transform:uppercase">Hansen McDowell Estate Sales</p>
        <h1 style="font-family:Georgia,serif;font-weight:400">Thank you, ${escapeHtml(details.name)}.</h1>
        <p>We received your inquiry and will be in touch as soon as possible.</p>
        <p>If your need is time-sensitive, call <a href="tel:${fallbackPhone.replace(/\D/g, "")}">${escapeHtml(fallbackPhone)}</a>.</p>
      </div>
    `,
  });

  // The inquiry already reached the inbox, so a failed courtesy reply is logged
  // rather than surfaced as a submission failure.
  if (confirmation.error) {
    console.error("Contact form: Resend rejected the confirmation email", confirmation.error);
  }

  return {
    status: "success",
    message: "Thank you. Your note is on its way, and we’ll be in touch soon.",
    submission,
  };
}
