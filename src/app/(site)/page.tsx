import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  IconAuction,
  IconCleanout,
  IconHome,
  Phone,
} from "@/components/icons";
import {
  getHomePage,
  getServices,
  getSiteSettings,
  getTestimonials,
  metadataFromSeo,
} from "@/lib/content";
import { stockImages } from "@/lib/images";

export async function generateMetadata(): Promise<Metadata> {
  const homePage = await getHomePage();
  return metadataFromSeo(homePage?.seo, {
    title: "Home",
    description:
      "Family-owned online estate auction and home clean-out services for Greater Cleveland and Northeast Ohio.",
  });
}

const heroImages = [
  { ...stockImages.heroLiving, className: "hero-collage__card hero-collage__card--main" },
  { ...stockImages.heroObjects, className: "hero-collage__card hero-collage__card--top" },
  {
    ...stockImages.heroCleared,
    className: "hero-collage__card hero-collage__card--bottom",
  },
];

export default async function HomePage() {
  const [settings, homePage, services, testimonials] = await Promise.all([
    getSiteSettings(),
    getHomePage(),
    getServices(),
    getTestimonials(),
  ]);

  const processSteps = homePage?.processSteps ?? [];
  const previewQuotes = testimonials.slice(0, 3);
  const tel = settings.phone.replace(/\D/g, "");
  const contactName = settings.contactName ?? "Lynn";

  const serviceCards = [
    {
      key: "estate",
      title: "Online Estate Auctions",
      summary:
        "Research, photography, marketing, and managed pickup — so families can settle contents without a traditional in-home sale.",
      href: "/estate-sales",
      linkLabel: "See what's included",
      Icon: IconAuction,
    },
    {
      key: "cleanout",
      title: "Complete Clean-Outs",
      summary:
        "Post-sale or standalone clean-outs that leave the property broom-clean and ready for the next chapter.",
      href: "/clean-outs",
      linkLabel: "Learn about clean-outs",
      Icon: IconCleanout,
    },
    {
      key: "guide",
      title: "Guidance & Walkthroughs",
      summary:
        "Not sure where to begin? Start with a conversation and a home walkthrough — no sorting required beforehand.",
      href: "/contact",
      linkLabel: "Book a consultation",
      Icon: IconHome,
    },
  ].map((card) => {
    const match = services.find((service) =>
      card.key === "estate"
        ? service.slug === "estate-sales"
        : card.key === "cleanout"
          ? service.slug === "clean-outs"
          : false,
    );
    return {
      ...card,
      title: match?.title ?? card.title,
      summary: match?.summary ?? card.summary,
    };
  });

  return (
    <>
      <section className="landing-hero" aria-labelledby="home-hero-heading">
        <div className="shell landing-hero__grid">
          <div className="landing-hero__copy">
            <h1 id="home-hero-heading">
              {homePage?.heroHeading ??
                "Helping families move forward, one home at a time."}
            </h1>
            <p>
              {homePage?.heroIntroduction ??
                `Hansen McDowell is a family-owned estate sale company serving ${settings.serviceArea}. We handle online estate auctions and complete clean-outs with care, clarity, and more than 30 years of experience.`}
            </p>
            <div className="button-row">
              <a
                className="button button--pill"
                href={settings.auctionUrl}
                target="_blank"
                rel="noreferrer"
              >
                Browse Online Auctions <ArrowRight />
              </a>
              <a className="button button--pill button--outline" href={`tel:${tel}`}>
                <Phone /> Call {settings.phone}
              </a>
            </div>
            <ul className="landing-hero__proof">
              {(homePage?.heroProofPoints?.length
                ? homePage.heroProofPoints
                : [
                    "Family owned & operated",
                    "Licensed & bonded in Ohio",
                    "Full-service auctions & clean-outs",
                  ]
              ).map((point) => (
                <li key={point}>
                  <span className="landing-hero__check" aria-hidden="true">
                    <Check />
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </div>

          <div className="hero-collage" aria-hidden="true">
            {heroImages.map((image) => (
              <div key={image.src} className={image.className}>
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 900px) 90vw, 420px"
                  priority={image.className.includes("main")}
                />
              </div>
            ))}
            <div className="hero-collage__badge">
              <strong>30+</strong>
              <span>Years in Northeast Ohio</span>
            </div>
          </div>
        </div>
      </section>

      <section className="stats-band" aria-label="Company highlights">
        <div className="shell stats-band__grid">
          <article>
            <strong>30+ Years</strong>
            <span>Family experience in antiques &amp; estates</span>
          </article>
          <article>
            <strong>Full Service</strong>
            <span>From walkthrough to broom-clean handoff</span>
          </article>
          <article>
            <strong>3 Days</strong>
            <span>Typical settlement after pickup</span>
          </article>
          <article>
            <strong>Local</strong>
            <span>{settings.serviceArea}</span>
          </article>
        </div>
      </section>

      <section className="landing-services section" aria-labelledby="services-heading">
        <div className="shell">
          <div className="landing-services__head">
            <h2 id="services-heading">
              Everything you need to settle a home with care.
            </h2>
            <Link className="button button--pill button--outline-ink" href="/services">
              View All Services
            </Link>
          </div>
          <div className="landing-services__grid">
            {serviceCards.map(({ key, title, summary, href, linkLabel, Icon }) => (
              <article key={key} className="service-panel">
                <span className="service-panel__icon" aria-hidden="true">
                  <Icon />
                </span>
                <h3>{title}</h3>
                <p>{summary}</p>
                <Link className="text-link" href={href}>
                  {linkLabel} <ArrowRight />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {processSteps.length > 0 ? (
        <section className="landing-process" aria-labelledby="process-heading">
          <div className="shell">
            <h2 id="process-heading">
              {homePage?.processHeading ?? "You make one call. We handle the rest."}
            </h2>
            {homePage?.processIntro ? (
              <p className="landing-process__intro">{homePage.processIntro}</p>
            ) : null}
            <ol className="landing-process__grid">
              {processSteps.map((step, index) => (
                <li key={step._key ?? `${step.title}-${index}`}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {step.title ? <h3>{step.title}</h3> : null}
                  {step.body ? <p>{step.body}</p> : null}
                </li>
              ))}
            </ol>
          </div>
        </section>
      ) : null}

      {previewQuotes.length > 0 ? (
        <section className="landing-quotes section" aria-labelledby="quotes-heading">
          <div className="shell">
            <div className="landing-quotes__head">
              <h2 id="quotes-heading">What families say about working with us.</h2>
              <Link
                className="button button--pill button--outline-ink"
                href="/testimonials"
              >
                Read More Feedback
              </Link>
            </div>
            <div className="landing-quotes__grid">
              {previewQuotes.map((item) => (
                <blockquote key={item._id}>
                  <span aria-hidden="true">&ldquo;</span>
                  {item.quote ? <p>{item.quote}</p> : null}
                  <footer>
                    {item.name ? <strong>{item.name}</strong> : null}
                    {item.role ? <em>{item.role}</em> : null}
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="landing-cta section" aria-labelledby="cta-heading">
        <div className="shell">
          <div className="landing-cta__panel">
            <div>
              <h2 id="cta-heading">Not sure where to begin?</h2>
              <p>
                Tell {contactName} about the home and timeline. We&apos;ll listen first
                and recommend a clear path forward.
              </p>
            </div>
            <div className="landing-cta__actions">
              <Link className="button button--pill button--cream" href="/contact">
                Request a Consultation
              </Link>
              <a className="button button--pill button--ghost" href={`tel:${tel}`}>
                Call Today
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
