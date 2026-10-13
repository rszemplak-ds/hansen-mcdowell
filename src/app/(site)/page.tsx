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
  type HomePage,
  type SiteSettings,
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

type HeroCta = NonNullable<HomePage["heroPrimaryCta"]>;
type ResolvedButton = { label: string; href: string; openInNewTab: boolean };

const sectionTitles: Record<string, string> = {
  "/services": "Services",
  "/estate-sales": "Estate sales",
  "/clean-outs": "Clean-outs",
  "/faq": "FAQ",
  "/testimonials": "Testimonials",
};

/** Service slugs that have their own top-level route; others fall back to /services. */
const serviceRoutes = new Set(["estate-sales", "clean-outs"]);

function phoneHref(phone: string | null | undefined) {
  const digits = (phone ?? "").replace(/\D/g, "");
  const national = digits.length === 11 && digits.startsWith("1") ? digits.slice(1) : digits;
  return national.length === 10 ? `tel:${national}` : null;
}

function pageDestination(page: HeroCta["page"]): ResolvedButton | null {
  if (!page) return null;
  switch (page._type) {
    case "homePage":
      return { label: "Home", href: "/", openInNewTab: false };
    case "aboutPage":
      return { label: "About us", href: "/about", openInNewTab: false };
    case "contactPage":
      return { label: "Contact us", href: "/contact", openInNewTab: false };
    case "service":
      return {
        label: page.title ?? "Services",
        href: page.slug && serviceRoutes.has(page.slug) ? `/${page.slug}` : "/services",
        openInNewTab: false,
      };
    case "cleanoutProject":
      return page.slug
        ? {
            label: page.title ?? "View project",
            href: `/clean-outs/${page.slug}`,
            openInNewTab: false,
          }
        : null;
    default:
      return null;
  }
}

function settingDestination(setting: string | null, settings: SiteSettings): ResolvedButton | null {
  switch (setting) {
    case "phone": {
      const href = phoneHref(settings.phone);
      return href ? { label: `Call ${settings.phone}`, href, openInNewTab: false } : null;
    }
    case "email":
      return settings.email
        ? { label: "Email us", href: `mailto:${settings.email}`, openInNewTab: false }
        : null;
    case "auctionUrl":
      return settings.auctionUrl
        ? { label: "Browse Online Auctions", href: settings.auctionUrl, openInNewTab: true }
        : null;
    case "facebookUrl":
      return settings.facebookUrl
        ? { label: "Follow on Facebook", href: settings.facebookUrl, openInNewTab: true }
        : null;
    case "instagramUrl":
      return settings.instagramUrl
        ? { label: "Follow on Instagram", href: settings.instagramUrl, openInNewTab: true }
        : null;
    default:
      return null;
  }
}

function linkDestination(cta: HeroCta, settings: SiteSettings): ResolvedButton | null {
  switch (cta.linkType) {
    case "page":
      return (
        pageDestination(cta.page) ??
        (cta.section && sectionTitles[cta.section]
          ? { label: sectionTitles[cta.section], href: cta.section, openInNewTab: false }
          : null)
      );
    case "setting":
      return settingDestination(cta.setting, settings);
    case "phone": {
      const href = phoneHref(cta.phone);
      return href ? { label: `Call ${cta.phone}`, href, openInNewTab: false } : null;
    }
    case "email":
      return cta.email
        ? { label: "Email us", href: `mailto:${cta.email}`, openInNewTab: false }
        : null;
    case "url":
      return cta.url ? { label: "Learn more", href: cta.url, openInNewTab: true } : null;
    default:
      return null;
  }
}

/**
 * Resolves an editor-configured button. Anything incomplete falls back to the
 * given site setting, so a half-filled button in Studio never breaks the hero.
 */
function resolveHeroButton(
  cta: HomePage["heroPrimaryCta"],
  fallbackSetting: "auctionUrl" | "phone",
  settings: SiteSettings,
): ResolvedButton | null {
  const destination =
    (cta && linkDestination(cta, settings)) ?? settingDestination(fallbackSetting, settings);
  if (!destination) return null;
  return { ...destination, label: cta?.label?.trim() || destination.label };
}

function HeroButton({
  label,
  href,
  openInNewTab,
  className,
  showArrow = false,
}: {
  label: string;
  href: string;
  openInNewTab: boolean;
  className: string;
  showArrow?: boolean;
}) {
  const isPhone = href.startsWith("tel:");
  const content = (
    <>
      {isPhone ? <Phone /> : null}
      {label}
      {showArrow && !isPhone ? <ArrowRight /> : null}
    </>
  );

  if (href.startsWith("/") && !openInNewTab) {
    return (
      <Link className={className} href={href}>
        {content}
      </Link>
    );
  }

  return (
    <a
      className={className}
      href={href}
      {...(openInNewTab ? { target: "_blank", rel: "noreferrer" } : {})}
    >
      {content}
    </a>
  );
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
  const primaryButton = resolveHeroButton(homePage?.heroPrimaryCta ?? null, "auctionUrl", settings);
  const secondaryButton = resolveHeroButton(homePage?.heroSecondaryCta ?? null, "phone", settings);

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
              {primaryButton ? (
                <HeroButton {...primaryButton} className="button button--pill" showArrow />
              ) : null}
              {secondaryButton ? (
                <HeroButton {...secondaryButton} className="button button--pill button--outline" />
              ) : null}
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
