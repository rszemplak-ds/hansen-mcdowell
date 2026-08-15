"use client";

import { useActionState, useEffect, useRef } from "react";
import {
  submitContactForm,
  type ContactFormState,
} from "@/app/actions/contact";
import { ArrowRight } from "./icons";

const initialState: ContactFormState = { status: "idle", message: "" };

export function ContactForm() {
  const [state, action, pending] = useActionState(submitContactForm, initialState);
  const startedAt = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (startedAt.current) {
      startedAt.current.value = String(Date.now());
    }
  }, []);

  if (state.status === "success") {
    return (
      <div className="form-success" role="status">
        <p className="eyebrow">Message received</p>
        <h2>Thank you for reaching out.</h2>
        <p>{state.message}</p>
      </div>
    );
  }

  const errorFor = (field: string) => state.errors?.[field]?.[0];

  return (
    <form className="contact-form" action={action}>
      <input ref={startedAt} type="hidden" name="startedAt" defaultValue="0" />
      <div className="honeypot" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="form-grid">
        <label>
          <span>Name</span>
          <input name="name" type="text" autoComplete="name" required />
          {errorFor("name") && <small>{errorFor("name")}</small>}
        </label>
        <label>
          <span>Email</span>
          <input name="email" type="email" autoComplete="email" required />
          {errorFor("email") && <small>{errorFor("email")}</small>}
        </label>
        <label>
          <span>Phone</span>
          <input name="phone" type="tel" autoComplete="tel" required />
          {errorFor("phone") && <small>{errorFor("phone")}</small>}
        </label>
        <label>
          <span>How can we help?</span>
          <select name="service" defaultValue="" required>
            <option value="" disabled>Select a service</option>
            <option value="estate-sale">Online estate auction</option>
            <option value="clean-out">Home clean-out</option>
            <option value="both">Auction and clean-out</option>
            <option value="not-sure">I’m not sure yet</option>
          </select>
          {errorFor("service") && <small>{errorFor("service")}</small>}
        </label>
      </div>
      <label>
        <span>Ideal timeline <em>Optional</em></span>
        <input name="timeline" type="text" placeholder="For example: within the next 60 days" />
      </label>
      <label>
        <span>Tell us about the property</span>
        <textarea name="message" rows={6} required />
        {errorFor("message") && <small>{errorFor("message")}</small>}
      </label>
      {state.status === "error" && (
        <p className="form-error" role="alert">{state.message}</p>
      )}
      <div className="form-submit">
        <button className="button" type="submit" disabled={pending}>
          {pending ? "Sending…" : "Send inquiry"} <ArrowRight />
        </button>
        <p>Your details are used only to respond to this inquiry.</p>
      </div>
    </form>
  );
}
