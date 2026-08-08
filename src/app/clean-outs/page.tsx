import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BeforeAfter } from "@/components/before-after";
import { ArrowUpRight, Check } from "@/components/icons";
import { PageHero } from "@/components/page-hero";
import { getCleanoutProjects } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Home Clean-Outs",
  description: "Respectful, complete home clean-out services in Greater Cleveland, available after an estate auction or as a standalone service.",
};

export default async function CleanOutsPage() {
  const projects = await getCleanoutProjects();

  return (
    <>
      <PageHero
        eyebrow="Complete home clean-outs"
        title={<>From a full house to a <em>clear</em> next step.</>}
        intro="When a property needs to be emptied, our supervised team handles the remaining work carefully and efficiently—whether or not we managed the estate auction."
      >
        <Link className="button" href="/contact">Request a walkthrough <ArrowUpRight /></Link>
      </PageHero>
      <section className="feature-split section">
        <div className="shell feature-split__grid feature-split__grid--reverse">
          <div className="feature-split__image">
            <Image src="https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1600&q=85" alt="A clean, open living room" fill priority sizes="(max-width: 800px) 100vw, 52vw" />
          </div>
          <div className="prose-block">
            <p className="eyebrow">Care through the final handoff</p>
            <h2>The last 10% can feel like the hardest part.</h2>
            <p>After the important decisions and valuable items are handled, a home may still hold furniture, household goods, and years of everyday belongings. We coordinate that final stage so the property can move forward.</p>
            <ul className="check-list">
              <li><Check /> Available after an auction or as a separate service</li>
              <li><Check /> Property-specific scope and clear quote</li>
              <li><Check /> Supervised access and respectful handling</li>
              <li><Check /> Broom-clean condition when agreed</li>
            </ul>
          </div>
        </div>
      </section>
      <section className="cleanout-types section--cream-deep">
        <div className="shell cleanout-types__grid">
          <div><p className="eyebrow">Built around the property</p><h2>A practical answer for many kinds of transitions.</h2></div>
          <div className="cleanout-types__list">
            <article><span>01</span><h3>After an estate auction</h3><p>Clear remaining items so the property is ready for sale, transfer, or renovation.</p></article>
            <article><span>02</span><h3>Downsizing or relocation</h3><p>Help reduce the physical burden when a household is moving to a smaller home.</p></article>
            <article><span>03</span><h3>Standalone clean-outs</h3><p>A direct solution when an auction is not the right fit for the home’s contents.</p></article>
          </div>
        </div>
      </section>
      {projects.length > 0 && (
        <section className="projects section">
          <div className="shell">
            <div className="projects__heading"><p className="eyebrow">Before &amp; after</p><h2>The difference a complete clean-out can make.</h2></div>
            <div className="projects__list">
              {projects.map((project) => (
                <article key={project.title}>
                  <BeforeAfter before={project.beforeImageUrl} after={project.afterImageUrl} title={project.title} />
                  <div><h3>{project.title}</h3>{project.location && <span>{project.location}</span>}<p>{project.description}</p></div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
      <section className="pre-call section--dark"><div className="shell pre-call__grid"><h2>Let us see the home before you start clearing it.</h2><div><p>A walkthrough helps protect potential value and gives you a realistic plan for the whole property.</p><Link className="button button--cream" href="/contact">Schedule a walkthrough <ArrowUpRight /></Link></div></div></section>
    </>
  );
}
