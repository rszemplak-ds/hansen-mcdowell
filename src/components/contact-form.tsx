"use client";

import { useActionState, useRef, useState } from "react";
import PhoneInput, { type Value } from "react-phone-number-input/input";
import {
  submitContactForm,
  type ContactFormState,
  type ContactFormValues,
} from "@/app/actions/contact";
import { ArrowRight } from "./icons";

const initialState: ContactFormState = { status: "idle", message: "", submission: 0 };

const emptyValues: ContactFormValues = {
  name: "",
  email: "",
  phone: "",
  service: "",
  timeline: "",
  message: "",
};

/** National digits only — strips a leading US country code if present. */
function usNationalDigits(value: string) {
  const digits = value.replace(/\D/g, "");
  return digits.startsWith("1") && digits.length > 10 ? digits.slice(1) : digits;
}

export function ContactForm() {
  const [state, action, pending] = useActionState(submitContactForm, initialState);

  if (state.status === "success") {
    return (
      <div className="form-success" role="status">
        <p className="eyebrow">Message received</p>
        <h2>Thank you for reaching out.</h2>
        <p>{state.message}</p>
      </div>
    );
  }

  return (
    <form className="contact-form" action={action}>
      {/*
        React clears a form once its action settles, which wipes everything the
        visitor typed when we come back with an error. Remounting on each attempt
        re-seeds every field from the values the server echoed back.
      */}
      <ContactFields
        key={state.submission}
        values={state.values ?? emptyValues}
        errors={state.errors}
        error={state.status === "error" ? state.message : null}
        pending={pending}
      />
    </form>
  );
}

function ContactFields({
  values,
  errors,
  error,
  pending,
}: {
  values: ContactFormValues;
  errors?: Record<string, string[]>;
  error: string | null;
  pending: boolean;
}) {
  const [phone, setPhone] = useState<Value | undefined>(
    values.phone ? (values.phone as Value) : undefined,
  );
  const loadedAt = useRef(0);

  const onPhoneChange = (value?: Value) => {
    if (!value) {
      setPhone(undefined);
      return;
    }
    // Hard stop at 10 national digits — ignore extra keystrokes.
    if (usNationalDigits(value).length > 10) return;
    setPhone(value);
  };

  const errorFor = (field: string) => errors?.[field]?.[0];

  return (
    <>
      <input
        type="hidden"
        name="startedAt"
        defaultValue="0"
        ref={(node) => {
          if (!node) return;
          if (loadedAt.current === 0) loadedAt.current = Date.now();
          node.value = String(loadedAt.current);
        }}
      />
      <div className="honeypot" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="form-grid">
        <label>
          <span>Name</span>
          <input
            name="name"
            type="text"
            autoComplete="name"
            required
            minLength={3}
            maxLength={100}
            defaultValue={values.name}
          />
          {errorFor("name") && <small>{errorFor("name")}</small>}
        </label>
        <label>
          <span>Email</span>
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={254}
            inputMode="email"
            defaultValue={values.email}
          />
          {errorFor("email") && <small>{errorFor("email")}</small>}
        </label>
        <label>
          <span>Phone</span>
          <PhoneInput
            country="US"
            international={false}
            value={phone}
            onChange={onPhoneChange}
            maxLength={14}
            autoComplete="tel"
            className="contact-form__phone-input"
          />
          <input type="hidden" name="phone" value={phone ?? ""} />
          {errorFor("phone") && <small>{errorFor("phone")}</small>}
        </label>
        <label>
          <span>How can we help?</span>
          <select name="service" defaultValue={values.service} required>
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
        <input
          name="timeline"
          type="text"
          placeholder="For example: within the next 60 days"
          defaultValue={values.timeline}
        />
      </label>
      <label>
        <span>Tell us about the property</span>
        <textarea
          name="message"
          rows={6}
          required
          minLength={10}
          maxLength={3000}
          defaultValue={values.message}
        />
        {errorFor("message") && <small>{errorFor("message")}</small>}
      </label>
      {error && <p className="form-error" role="alert">{error}</p>}
      <div className="form-submit">
        <button className="button" type="submit" disabled={pending}>
          {pending ? "Sending…" : "Send inquiry"} <ArrowRight />
        </button>
        <p>Your details are used only to respond to this inquiry.</p>
      </div>
    </>
  );
}
