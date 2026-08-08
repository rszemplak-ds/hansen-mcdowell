import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check } from "@/components/icons";
import { SectionHeading } from "@/components/section-heading";
import { ServiceCard } from "@/components/service-card";
import {
  getServices,
  getSiteSettings,
  getTestimonials,
} from "@/lib/site-data";

export default async function HomePage() {
  const [settings, services, testimonials] = await Promise.all([
    getSiteSettings(),
    getServices(),
    getTestimonials(),
  ]);

  return (
    <>
      <section className="hero">
        <div className="shell hero__grid">
          <div className="hero__content">
            <p className="eyebrow">Estate sales · Clean-outs · Northeast Ohio</p>
            <h1>
              Experience that brings <em>clarity</em> to life’s transitions.
            </h1>
            <p className="hero__intro">
              A family-owned team handling online estate auctions and complete
              home clean-outs with care, transparency, and more than 30 years
              of experience.
            </p>
            <div className="button-row">
              <Link className="button" href="/contact">
                Request a consultation <ArrowUpRight />
              </Link>
              <Link className="text-link" href="/services">
                Explore our services <ArrowRight />
              </Link>
            </div>
            <div className="hero__proof">
              <span><Check /> Family owned &amp; operated</span>
              <span><Check /> Licensed &amp; bonded</span>
              <span><Check /> Full-service support</span>
            </div>
          </div>
          <div className="hero__visual">
            <div className="hero__image">
              <Image
                src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=88"
                alt="An elegant, warmly lit living room"
                fill
                priority
                sizes="(max-width: 900px) 100vw, 48vw"
              />
            </div>
            <div className="hero__note">
              <span>30+</span>
              <p>Years helping Northeast Ohio families move forward.</p>
            </div>
          </div>
        </div>
        <div className="shell hero__scroll"><span>Discover</span><i /></div>
      </section>

      <section className="intro section">
        <div className="shell intro__grid">
          <p className="eyebrow">A steady hand, start to finish</p>
          <div>
            <h2>The home holds a lifetime. We handle what comes next.</h2>
            <div className="intro__copy">
              <p>
                Whether you are settling an estate, downsizing, or preparing a
                property for sale, the details can feel overwhelming. Hansen
                McDowell brings the knowledge, organization, and compassion to
                make the process manageable.
              </p>
              <Link className="text-link" href="/about">
                Meet the family behind the work <ArrowUpRight />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="services section">
        <div className="shell">
          <SectionHeading eyebrow="How we help" title="Two services. One clear path forward.">
            <p>
              Start with a conversation. We’ll assess the home and recommend the
              approach that best fits its contents, condition, and timeline.
            </p>
          </SectionHeading>
          <div className="services__grid">
            {services.map((service, index) => (
              <ServiceCard key={service.slug} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="process section section--dark">
        <div className="shell">
          <SectionHeading eyebrow="A thoughtful process" title="You don’t need to have it figured out." light>
            <p>
              We meet you where you are, explain every step, and keep you informed
              without adding more to your plate.
            </p>
          </SectionHeading>
          <ol className="process__steps">
            <li>
              <span>01</span>
              <div><h3>Start with a conversation</h3><p>Tell us about the property, circumstances, and timeline.</p></div>
            </li>
            <li>
              <span>02</span>
              <div><h3>Walk through the home</h3><p>We assess the full contents—even the attic and crawlspace.</p></div>
            </li>
            <li>
              <span>03</span>
              <div><h3>Choose the right plan</h3><p>We recommend an auction, clean-out, or a coordinated combination.</p></div>
            </li>
            <li>
              <span>04</span>
              <div><h3>Leave the details to us</h3><p>Our team organizes, researches, sells, and clears the way forward.</p></div>
            </li>
          </ol>
        </div>
      </section>

      <section className="integrity section">
        <div className="shell integrity__grid">
          <div className="integrity__image">
            <Image
              src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1400&q=85"
              alt="Curated antique objects arranged in a home"
              fill
              sizes="(max-width: 800px) 100vw, 44vw"
            />
          </div>
          <div className="integrity__content">
            <p className="eyebrow">Integrity is the foundation</p>
            <h2>Professional expertise, with the care of family.</h2>
            <p>
              Hansen McDowell grew from the Hansen family’s Lakewood antique shop,
              The Antique Corner. Today, Lynn Hansen, Doug McDowell, and their son
              Hans continue that legacy across Greater Cleveland.
            </p>
            <blockquote>
              “We felt that they respected our dad’s home, his belongings, and the
              difficult process of this transition.”
              <cite>— Stacey, client</cite>
            </blockquote>
            <Link className="text-link" href="/about">Our story <ArrowUpRight /></Link>
          </div>
        </div>
      </section>

      <section className="testimonials-preview section">
        <div className="shell">
          <SectionHeading eyebrow="In their words" title="Trusted when the details matter most.">
            <Link className="text-link" href="/testimonials">Read more stories <ArrowUpRight /></Link>
          </SectionHeading>
          <div className="quote-grid">
            {testimonials.slice(0, 3).map((testimonial) => (
              <blockquote key={`${testimonial.name}-${testimonial.quote.slice(0, 12)}`}>
                <span className="quote-mark">“</span>
                <p>{testimonial.quote}</p>
                <footer><strong>{testimonial.name}</strong><span>{testimonial.role}</span></footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="auction-band">
        <div className="shell auction-band__inner">
          <div>
            <p className="eyebrow eyebrow--light">Looking for current sales?</p>
            <h2>See what’s coming up for auction.</h2>
          </div>
          <a className="button button--cream" href={settings.auctionUrl} target="_blank" rel="noreferrer">
            Visit Viking Cat Auctions <ArrowUpRight />
          </a>
        </div>
      </section>
    </>
  );
}
