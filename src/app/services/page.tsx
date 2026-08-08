import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check } from "@/components/icons";
import { PageHero } from "@/components/page-hero";
import { getServices } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Services",
  description: "Online estate auctions and complete home clean-out services throughout Greater Cleveland and Northeast Ohio.",
};

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <>
      <PageHero
        eyebrow="How we help"
        title={<>The right plan for the home—and the <em>people</em> in it.</>}
        intro="Every property, collection, and timeline is different. We look at the whole situation before recommending an online auction, a clean-out, or a coordinated combination."
      />
      <section className="service-details section">
        <div className="shell">
          {services.map((service, index) => (
            <article className="service-detail" key={service.slug}>
              <div className="service-detail__image">
                <Image src={service.imageUrl} alt="Prepared home interior" fill sizes="(max-width: 800px) 100vw, 48vw" />
              </div>
              <div className="service-detail__content">
                <span className="service-detail__number">0{index + 1}</span>
                <p className="eyebrow">{service.eyebrow}</p>
                <h2>{service.title}</h2>
                <p>{service.description}</p>
                <ul>{service.features.map((feature) => <li key={feature}><Check /> {feature}</li>)}</ul>
                <Link className="text-link" href={`/${service.slug}`}>See how it works <ArrowUpRight /></Link>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="decision-band section--cream-deep">
        <div className="shell decision-band__grid">
          <div><p className="eyebrow">Not sure which service fits?</p><h2>You don’t need to decide before you call.</h2></div>
          <div><p>A walkthrough gives us the context to recommend the most timely and cost-effective option for the property.</p><Link className="button" href="/contact">Schedule a walkthrough <ArrowUpRight /></Link></div>
        </div>
      </section>
    </>
  );
}
