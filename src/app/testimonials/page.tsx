import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "@/components/icons";
import { PageHero } from "@/components/page-hero";
import { getTestimonials } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Testimonials",
  description: "Read what clients and Greater Cleveland real estate professionals say about working with Hansen McDowell.",
};

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials();

  return (
    <>
      <PageHero eyebrow="Client stories" title={<>Trusted to carry the weight—and follow <em>through.</em></>} intro="These words come from families and real estate professionals who asked Hansen McDowell to handle important homes, belongings, and deadlines." />
      <section className="testimonials-page section">
        <div className="shell masonry-quotes">
          {testimonials.map((testimonial, index) => (
            <blockquote className={index === 0 ? "featured-quote" : ""} key={`${testimonial.name}-${testimonial.quote.slice(0, 12)}`}>
              <span className="quote-mark">“</span><p>{testimonial.quote}</p><footer><strong>{testimonial.name}</strong><span>{testimonial.role}</span></footer>
            </blockquote>
          ))}
        </div>
      </section>
      <section className="pre-call section--dark"><div className="shell pre-call__grid"><h2>Make an overwhelming process feel manageable.</h2><div><p>Start with a conversation about the home and what your family needs next.</p><Link className="button button--cream" href="/contact">Request a consultation <ArrowUpRight /></Link></div></div></section>
    </>
  );
}
