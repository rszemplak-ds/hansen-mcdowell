import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check } from "@/components/icons";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "About",
  description: "Meet the family behind Hansen McDowell Estate Sales and learn about more than 30 years of experience in antiques and estate liquidation.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Our story"
        title={<>Family knowledge, carried <em>forward.</em></>}
        intro="Three generations of experience in antiques, personal property, and the often-emotional work of helping families close one chapter and begin another."
      />
      <section className="story-feature section">
        <div className="shell story-feature__grid">
          <div className="story-feature__image">
            <Image
              src="https://images.unsplash.com/photo-1523413651479-597eb2da0ad6?auto=format&fit=crop&w=1500&q=85"
              alt="Vintage books and collected objects"
              fill
              priority
              sizes="(max-width: 800px) 100vw, 50vw"
            />
          </div>
          <div className="prose-block">
            <p className="eyebrow">From The Antique Corner to today</p>
            <h2>It started with a family antique shop in Lakewood.</h2>
            <p>
              Lynn Hansen and her husband Doug McDowell began in the business
              alongside Lynn’s parents, Diana and Roger Hansen, at The Antique
              Corner. That hands-on education built an instinct for value that
              can’t be learned from a price guide alone.
            </p>
            <p>
              The business has since grown to include their son Hans. Together,
              they serve families throughout Greater Cleveland with online estate
              auctions, household liquidation, and complete home clean-outs.
            </p>
          </div>
        </div>
      </section>
      <section className="values section section--cream-deep">
        <div className="shell">
          <div className="values__intro">
            <p className="eyebrow">What guides the work</p>
            <h2>Integrity isn’t a slogan. It’s how every home is handled.</h2>
          </div>
          <div className="values__grid">
            <article><span>01</span><h3>Clear communication</h3><p>You’ll understand the recommendation, the process, and what happens next.</p></article>
            <article><span>02</span><h3>Respect for the home</h3><p>Access is supervised and belongings are handled with care from walkthrough to pickup.</p></article>
            <article><span>03</span><h3>Knowledge that earns value</h3><p>Research, market awareness, and years of collecting experience inform every auction.</p></article>
            <article><span>04</span><h3>Follow-through</h3><p>The team stays involved until the agreed work is complete and the property is ready.</p></article>
          </div>
        </div>
      </section>
      <section className="credentials section section--dark">
        <div className="shell credentials__grid">
          <div>
            <p className="eyebrow eyebrow--light">Professional standards</p>
            <h2>Protection and accountability matter.</h2>
          </div>
          <ul>
            <li><Check /> Licensed and bonded in favor of the State of Ohio</li>
            <li><Check /> More than 30 years of family experience</li>
            <li><Check /> Current market research for household contents</li>
            <li><Check /> Full-service sale and clean-out capabilities</li>
          </ul>
          <Link className="button button--cream" href="/contact">Talk with Lynn <ArrowUpRight /></Link>
        </div>
      </section>
    </>
  );
}
