import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "@/components/icons";
import { PageHero } from "@/components/page-hero";
import { getFaqs } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description: "Answers about estate auctions, home clean-outs, cost, preparation, licensing, and choosing a liquidator.",
};

export default async function FaqPage() {
  const faqs = await getFaqs();

  return (
    <>
      <PageHero eyebrow="Frequently asked questions" title={<>Good decisions start with <em>clear answers.</em></>} intro="Most families only navigate an estate liquidation once or twice. These are the questions worth asking before you choose a path—or a company." />
      <section className="faq-section section">
        <div className="shell faq-section__grid">
          <aside><p className="eyebrow">Need a specific answer?</p><h2>Every home is different.</h2><p>If your question depends on the property or your timeline, a short conversation may be more useful than a general answer.</p><Link className="text-link" href="/contact">Ask Hansen McDowell <ArrowUpRight /></Link></aside>
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <details key={faq.question} open={index === 0}>
                <summary><span>0{index + 1}</span><h3>{faq.question}</h3><i /></summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
      <section className="interview-guide section--cream-deep">
        <div className="shell interview-guide__grid">
          <div><p className="eyebrow">Questions for any liquidator</p><h2>Know what to ask before you hire.</h2></div>
          <ol><li>Are you licensed, bonded, and insured?</li><li>Who will have access to the home, and who supervises that access?</li><li>How are unsold items handled after the sale?</li><li>Do you charge a minimum or guaranteed commission?</li><li>Can you provide current references?</li></ol>
        </div>
      </section>
    </>
  );
}
