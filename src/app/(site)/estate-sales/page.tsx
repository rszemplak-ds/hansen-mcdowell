import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ContentPlaceholder } from "@/components/content-placeholder";
import { ArrowUpRight, Check } from "@/components/icons";
import { PageHero } from "@/components/page-hero";
import {
  getEstateSales,
  getServiceBySlug,
  getSiteSettings,
  metadataFromSeo,
} from "@/lib/content";
import { resolveImage, stockImages } from "@/lib/images";

export async function generateMetadata(): Promise<Metadata> {
  const service = await getServiceBySlug("estate-sales");
  return metadataFromSeo(service?.seo, {
    title: "Estate Sales & Online Auctions",
    description:
      "Full-service online estate and household liquidation in Greater Cleveland, including research, photography, advertising, and pickup coordination.",
  });
}

export default async function EstateSalesPage() {
  const [sales, settings, service] = await Promise.all([
    getEstateSales(),
    getSiteSettings(),
    getServiceBySlug("estate-sales"),
  ]);

  const processSteps = service?.processSteps ?? [];
  const features = service?.features ?? [];
  const featureImage = resolveImage(service?.image, stockImages.estateContents);

  return (
    <>
      <PageHero
        eyebrow={service?.heroEyebrow ?? service?.eyebrow ?? "Online estate auctions"}
        title={service?.heroHeading ?? service?.title ?? "Estate sales"}
        intro={
          service?.heroIntroduction ??
          service?.summary ??
          "Estate sales page content pending import into Sanity."
        }
      >
        <a className="button button--pill" href={settings.auctionUrl} target="_blank" rel="noreferrer">
          Browse current auctions <ArrowUpRight />
        </a>
      </PageHero>

      <section className="feature-split section">
        <div className="shell feature-split__grid">
          <div className="feature-frame feature-frame--photo" aria-hidden="true">
            <Image
              src={featureImage.src}
              alt=""
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
            />
            <div className="feature-frame__caption">
              <strong>Online estate auctions</strong>
              <p>Research, photography, marketing, pickup, and settlement.</p>
            </div>
          </div>
          <div className="prose-block">
            {service?.eyebrow ? <p className="eyebrow">{service.eyebrow}</p> : null}
            {service?.title ? <h2>{service.title}</h2> : null}
            {service?.description ? <p>{service.description}</p> : null}
            {!service?.description ? (
              <ContentPlaceholder message="Estate sales service details pending import into Sanity." />
            ) : null}
            {features.length > 0 ? (
              <ul className="check-list">
                {features.map((feature) => (
                  <li key={feature}>
                    <Check /> {feature}
                  </li>
                ))}
              </ul>
            ) : null}
            {settings.settlementNote ? (
              <p className="settlement-note">{settings.settlementNote}</p>
            ) : null}
          </div>
        </div>
      </section>

      <section className="timeline section section--dark">
        <div className="shell">
          <p className="eyebrow eyebrow--light">What to expect</p>
          <h2>One team, through every stage.</h2>
          {processSteps.length > 0 ? (
            <div className="timeline__grid">
              {processSteps.map((step, index) => (
                <article key={step._key}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {step.title ? <h3>{step.title}</h3> : null}
                  {step.body ? <p>{step.body}</p> : null}
                </article>
              ))}
            </div>
          ) : (
            <ContentPlaceholder message="Estate sales process steps pending import into Sanity." />
          )}
        </div>
      </section>

      <section className="current-sales section">
        <div className="shell">
          <div className="current-sales__heading">
            <div>
              <p className="eyebrow">Current sales</p>
              <h2>Now open for bidding.</h2>
            </div>
            <a className="text-link" href={settings.auctionUrl} target="_blank" rel="noreferrer">
              All auctions <ArrowUpRight />
            </a>
          </div>
          {sales.length ? (
            <div className="sales-grid">
              {sales.map((sale) => {
                const saleImage = resolveImage(sale.featuredImage, {
                  ...stockImages.furnishing,
                  alt: sale.title
                    ? `${sale.title} estate auction`
                    : stockImages.furnishing.alt,
                });

                return (
                  <article key={sale._id}>
                    <div className="sales-grid__image">
                      <Image
                        src={saleImage.src}
                        alt={saleImage.alt}
                        fill
                        sizes="(max-width: 800px) 100vw, 33vw"
                      />
                    </div>
                    {sale.city ? <p className="eyebrow">{sale.city}</p> : null}
                    {sale.title ? <h3>{sale.title}</h3> : null}
                    {sale.summary ? <p>{sale.summary}</p> : null}
                    {sale.auctionUrl ? (
                      <a
                        className="text-link"
                        href={sale.auctionUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        View auction <ArrowUpRight />
                      </a>
                    ) : null}
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="empty-auctions">
              <p>Current auctions are published through Viking Cat Auctions.</p>
              <a className="button button--pill" href={settings.auctionUrl} target="_blank" rel="noreferrer">
                Check current listings <ArrowUpRight />
              </a>
            </div>
          )}
        </div>
      </section>

      <section className="pre-call section">
        <div className="shell pre-call__grid">
          <h2>Before you sort or throw anything away, let&apos;s talk.</h2>
          <div>
            <p>
              Everyday-looking items can have unexpected value. Seeing the home as it is
              helps us give you the best guidance.
            </p>
            <Link className="button button--pill button--cream" href="/contact">
              Request a consultation <ArrowUpRight />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
