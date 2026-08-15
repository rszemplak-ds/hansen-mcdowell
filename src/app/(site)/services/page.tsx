import type { Metadata } from "next";
import Link from "next/link";
import { ContentPlaceholder } from "@/components/content-placeholder";
import { ArrowUpRight } from "@/components/icons";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { ServiceCard } from "@/components/service-card";
import { getServices, metadataFromSeo } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const services = await getServices();
  const seo = services.find((service) => service.seo)?.seo;
  return metadataFromSeo(seo, {
    title: "Services",
    description:
      "Online estate auctions and complete home clean-out services throughout Greater Cleveland and Northeast Ohio.",
  });
}

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <>
      <PageHero
        eyebrow="How we help"
        title="Two paths forward, one trusted team."
        intro="Whether the home calls for an online auction or a complete clean-out, we begin with a walkthrough and recommend the approach that fits the property, the timeline, and your family."
      >
        <Link className="button button--pill" href="/contact">
          Schedule a walkthrough <ArrowUpRight />
        </Link>
      </PageHero>

      <section className="services section">
        <div className="shell">
          <SectionHeading
            eyebrow="Our services"
            title="Clear options, carried through every stage."
          >
            <p>
              Each service is meant to reduce the burden on your family while
              protecting value and leaving the property ready for what comes next.
            </p>
          </SectionHeading>
          {services.length > 0 ? (
            <div className="services__grid">
              {services.map((service, index) => (
                <ServiceCard key={service._id} service={service} index={index} />
              ))}
            </div>
          ) : (
            <ContentPlaceholder message="Services will appear here once published in Sanity." />
          )}
        </div>
      </section>

      <section className="decision-band section section--dark">
        <div className="shell decision-band__inner">
          <div>
            <p className="eyebrow eyebrow--light">Not sure which service fits?</p>
            <h2>You don&apos;t need to decide before you call.</h2>
          </div>
          <div>
            <p>
              A walkthrough gives us the context to recommend the most timely and
              cost-effective option for the property — with no obligation to proceed.
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
