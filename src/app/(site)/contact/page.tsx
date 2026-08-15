import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { PageHero } from "@/components/page-hero";
import { getContactPage, getSiteSettings, metadataFromSeo } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const contactPage = await getContactPage();
  return metadataFromSeo(contactPage?.seo, {
    title: "Contact",
    description:
      "Request a confidential estate sale or home clean-out consultation with Hansen McDowell in Greater Cleveland.",
  });
}

export default async function ContactPage() {
  const [settings, contactPage] = await Promise.all([
    getSiteSettings(),
    getContactPage(),
  ]);

  const contactHeading =
    contactPage?.directContactHeading ??
    (settings.contactName
      ? `Talk with ${settings.contactName.split(" ")[0]}.`
      : "Talk with us.");

  return (
    <>
      <PageHero
        eyebrow={contactPage?.heroEyebrow ?? "Start a conversation"}
        title={contactPage?.heroHeading ?? "Contact"}
        intro={
          contactPage?.heroIntroduction ??
          "Share a little about the property and timeline. Lynn will follow up."
        }
      />
      <section className="section">
        <div className="shell contact-layout">
          <div className="contact-card">
            <p className="eyebrow eyebrow--light">Direct contact</p>
            <h2>{contactHeading}</h2>
            <div className="contact-card__meta">
              {settings.contactName ? (
                <div>
                  <strong>Contact</strong>
                  <p>{settings.contactName}</p>
                </div>
              ) : null}
              <div>
                <strong>Phone</strong>
                <a href={`tel:${settings.phone.replace(/\D/g, "")}`}>{settings.phone}</a>
              </div>
              <div>
                <strong>Email</strong>
                <a href={`mailto:${settings.email}`}>{settings.email}</a>
              </div>
              <div>
                <strong>Service area</strong>
                <p>{settings.serviceArea}</p>
              </div>
              {settings.license ? (
                <div>
                  <strong>License</strong>
                  <p>{settings.license}</p>
                </div>
              ) : null}
            </div>
            {contactPage?.directContactNote ? (
              <p style={{ marginTop: "1.5rem" }}>{contactPage.directContactNote}</p>
            ) : null}
          </div>
          <div className="contact-form-panel">
            <p className="eyebrow">{contactPage?.formHeading ?? "Request a consultation"}</p>
            <h2>{contactPage?.formIntro ?? "How can we help?"}</h2>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
