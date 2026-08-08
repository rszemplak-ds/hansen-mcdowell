import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check } from "@/components/icons";
import { PageHero } from "@/components/page-hero";
import { getEstateSales, getSiteSettings } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Estate Sales & Online Auctions",
  description: "Full-service online estate and household liquidation in Greater Cleveland, including research, photography, advertising, and pickup coordination.",
};

export default async function EstateSalesPage() {
  const [sales, settings] = await Promise.all([getEstateSales(), getSiteSettings()]);

  return (
    <>
      <PageHero
        eyebrow="Online estate auctions"
        title={<>Your family’s things deserve a <em>thoughtful</em> market.</>}
        intro="We turn a home’s contents into a carefully researched, photographed, and marketed online auction—designed to reach buyers while reducing the burden on your family."
      >
        <a className="button" href={settings.auctionUrl} target="_blank" rel="noreferrer">Browse current auctions <ArrowUpRight /></a>
      </PageHero>
      <section className="feature-split section">
        <div className="shell feature-split__grid">
          <div className="feature-split__image">
            <Image src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=85" alt="Curated furniture and artwork in a living room" fill priority sizes="(max-width: 800px) 100vw, 52vw" />
          </div>
          <div className="prose-block">
            <p className="eyebrow">Full-service from assessment to settlement</p>
            <h2>We see value where others may see a full house.</h2>
            <p>Experience with antiques, collectibles, and current resale markets helps the team identify, group, and present items for the right buyers.</p>
            <ul className="check-list">
              <li><Check /> Thorough assessment, including attics and crawlspaces</li>
              <li><Check /> Organization, research, and careful photography</li>
              <li><Check /> Online advertising and auction administration</li>
              <li><Check /> Managed pickup and settlement of net proceeds</li>
            </ul>
          </div>
        </div>
      </section>
      <section className="timeline section section--dark">
        <div className="shell">
          <p className="eyebrow eyebrow--light">What to expect</p>
          <h2>One team, through every stage.</h2>
          <div className="timeline__grid">
            <article><span>01</span><h3>Consultation</h3><p>We walk through the home, listen to your goals, and assess the contents.</p></article>
            <article><span>02</span><h3>Preparation</h3><p>Items are organized, researched, photographed, and arranged into auction lots.</p></article>
            <article><span>03</span><h3>Online auction</h3><p>The sale is marketed and bidding takes place online over a defined period.</p></article>
            <article><span>04</span><h3>Pickup &amp; settlement</h3><p>We coordinate local pickup and pay net proceeds promptly after pickup.</p></article>
          </div>
        </div>
      </section>
      <section className="current-sales section">
        <div className="shell">
          <div className="current-sales__heading"><div><p className="eyebrow">Current sales</p><h2>Now open for bidding.</h2></div><a className="text-link" href={settings.auctionUrl} target="_blank" rel="noreferrer">All auctions <ArrowUpRight /></a></div>
          {sales.length ? (
            <div className="sales-grid">
              {sales.map((sale) => (
                <article key={`${sale.city}-${sale.title}`}>
                  {sale.imageUrl && <div className="sale-card__image"><Image src={sale.imageUrl} alt="" fill sizes="(max-width: 800px) 100vw, 33vw" /></div>}
                  <p className="eyebrow">{sale.city}</p><h3>{sale.title}</h3><p>{sale.summary}</p>
                  {sale.biddingEnds && <dl><dt>Bidding ends</dt><dd>{sale.biddingEnds}</dd></dl>}
                  {sale.auctionUrl && <a className="text-link" href={sale.auctionUrl} target="_blank" rel="noreferrer">View auction <ArrowUpRight /></a>}
                </article>
              ))}
            </div>
          ) : (
            <div className="empty-auctions"><p>Current auctions are published through Viking Cat Auctions.</p><a className="button" href={settings.auctionUrl} target="_blank" rel="noreferrer">Check current listings <ArrowUpRight /></a></div>
          )}
        </div>
      </section>
      <section className="pre-call section--cream-deep"><div className="shell pre-call__grid"><h2>Before you sort or throw anything away, let’s talk.</h2><div><p>Everyday-looking items can have unexpected value. Seeing the home as it is helps us give you the best guidance.</p><Link className="button" href="/contact">Request a consultation <ArrowUpRight /></Link></div></div></section>
    </>
  );
}
