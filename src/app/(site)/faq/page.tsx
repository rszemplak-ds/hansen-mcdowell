import type { Metadata } from "next";
import Link from "next/link";
import { ContentPlaceholder } from "@/components/content-placeholder";
import { ArrowUpRight } from "@/components/icons";
import { PageHero } from "@/components/page-hero";
import { getInterviewFaqs, getPrimaryFaqs, metadataFromSeo } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  return metadataFromSeo(null, {
    title: "Frequently Asked Questions",
    description:
      "Answers about estate auctions, home clean-outs, cost, preparation, licensing, and choosing a liquidator.",
  });
}

export default async function FaqPage() {
  const [primaryFaqs, interviewFaqs] = await Promise.all([
    getPrimaryFaqs(),
    getInterviewFaqs(),
  ]);

  return (
    <>
      <PageHero
        eyebrow="Frequently asked questions"
        title="Clear answers before you decide."
        intro="We encourage families to interview several companies. These answers cover how Hansen McDowell works — and the questions worth asking any liquidator."
      />

      <section className="section">
        <div className="shell home-story__grid">
          <aside>
            <p className="eyebrow">Common questions</p>
            <h2>Every home is different.</h2>
            <p style={{ color: "var(--muted)" }}>
              If your question depends on the property or your timeline, a short
              conversation may be more useful than a general answer.
            </p>
            <Link className="text-link" href="/contact">
              Ask Hansen McDowell <ArrowUpRight />
            </Link>
          </aside>
          <div className="faq-list">
            {primaryFaqs.length > 0 ? (
              primaryFaqs.map((faq, index) => (
                <details key={faq._id} open={index === 0}>
                  <summary>{faq.question ?? "Question"}</summary>
                  {faq.answer ? <p>{faq.answer}</p> : null}
                </details>
              ))
            ) : (
              <ContentPlaceholder message="FAQs will appear here once published in Sanity." />
            )}
          </div>
        </div>
      </section>

      <section className="home-process section">
        <div className="shell">
          <div className="home-process__head">
            <p className="eyebrow">Questions for any liquidator</p>
            <h2>Key questions to ask every liquidator.</h2>
            <p>
              Before you hire, confirm licensing, references, access policies, and
              what happens to unsold items. We welcome the comparison.
            </p>
          </div>
          {interviewFaqs.length > 0 ? (
            <ol className="interview-guide">
              {interviewFaqs.map((faq) => (
                <li key={faq._id}>
                  <div>
                    <h3>{faq.question ?? "Question"}</h3>
                    {faq.answer ? <p>{faq.answer}</p> : null}
                  </div>
                </li>
              ))}
            </ol>
          ) : (
            <ContentPlaceholder message="Interview guide questions pending import into Sanity." />
          )}
        </div>
      </section>
    </>
  );
}
