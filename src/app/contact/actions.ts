"use server";

import { Resend } from "resend";
import { z } from "zod";

export type ContactFormState = {
  status: "idle" | "success" | "error";
  message: string;
  errors?: Record<string, string[]>;
};

const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(100),
  email: z.email("Please enter a valid email address."),
  phone: z.string().trim().min(7, "Please enter a phone number.").max(30),
  service: z.enum(["estate-sale", "clean-out", "both", "not-sure"]),
  timeline: z.string().trim().max(100).optional(),
  message: z.string().trim().min(10, "Please share a few more details.").max(3000),
  website: z.string().max(0),
  startedAt: z.coerce.number(),
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

export async function submitContactForm(
  _previousState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const submitted = contactSchema.safeParse(Object.fromEntries(formData));

  if (!submitted.success) {
    return {
      status: "error",
      message: "Please review the highlighted information and try again.",
      errors: submitted.error.flatten().fieldErrors,
    };
  }

  const elapsed = Date.now() - submitted.data.startedAt;
  if (elapsed < 1500 || elapsed > 86_400_000) {
    return {
      status: "error",
      message: "Please refresh the page and try again.",
    };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    return {
      status: "error",
      message:
        "Online inquiries are being configured. Please call 440-669-9665 or email hansenmcdowell@yahoo.com.",
    };
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
    return {
      status: "error",
      message:
        "We couldn’t send the form just now. Please call 440-669-9665 or email hansenmcdowell@yahoo.com.",
    };
  }

  await resend.emails.send({
    from,
    to: [details.email],
    subject: "We received your Hansen McDowell inquiry",
    html: `
      <div style="font-family:Arial,sans-serif;line-height:1.6;color:#25211e;max-width:640px">
        <p style="color:#a3292f;font-size:12px;letter-spacing:.12em;text-transform:uppercase">Hansen McDowell Estate Sales</p>
        <h1 style="font-family:Georgia,serif;font-weight:400">Thank you, ${escapeHtml(details.name)}.</h1>
        <p>We received your inquiry and will be in touch as soon as possible.</p>
        <p>If your need is time-sensitive, call <a href="tel:4406699665">440-669-9665</a>.</p>
      </div>
    `,
  });

  return {
    status: "success",
    message: "Thank you. Your note is on its way, and we’ll be in touch soon.",
  };
}
