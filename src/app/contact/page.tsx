import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { PageHero } from "@/components/page-hero";
import { getSiteSettings } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Contact",
  description: "Request a confidential estate sale or home clean-out consultation with Hansen McDowell in Greater Cleveland.",
};

export default async function ContactPage() {
  const settings = await getSiteSettings();

  return (
    <>
      <PageHero eyebrow="Start a conversation" title={<>Tell us what’s ahead. We’ll help you find the <em>next step.</em></>} intro="You don’t need to sort the home or know which service you need. Share a little about the property and timeline, and Lynn will follow up." />
      <section className="contact-section section">
        <div className="shell contact-section__grid">
          <div className="contact-card">
            <p className="eyebrow eyebrow--light">Prefer to reach us directly?</p>
            <h2>Talk with Lynn.</h2>
            <dl><div><dt>Phone</dt><dd><a href={`tel:${settings.phone.replace(/\D/g, "")}`}>{settings.phone}</a></dd></div><div><dt>Email</dt><dd><a href={`mailto:${settings.email}`}>{settings.email}</a></dd></div><div><dt>Service area</dt><dd>{settings.serviceArea}</dd></div></dl>
            <p className="contact-card__note">Please don’t discard or organize items before the initial walkthrough. What looks ordinary may still have value.</p>
          </div>
          <div className="form-wrap"><p className="eyebrow">Request a consultation</p><h2>How can we help?</h2><ContactForm /></div>
        </div>
      </section>
    </>
  );
}
