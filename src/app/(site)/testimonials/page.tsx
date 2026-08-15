import type { Metadata } from "next";
import Link from "next/link";
import { ContentPlaceholder } from "@/components/content-placeholder";
import { ArrowUpRight } from "@/components/icons";
import { PageHero } from "@/components/page-hero";
import { getTestimonials, metadataFromSeo } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  return metadataFromSeo(null, {
    title: "Testimonials",
    description:
      "Read what clients and Greater Cleveland real estate professionals say about working with Hansen McDowell.",
  });
}

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials();
  const sortedTestimonials = [...testimonials].sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return (a.order ?? 0) - (b.order ?? 0);
  });

  return (
    <>
      <PageHero
        eyebrow="Client stories"
        title="Trusted when the details matter most."
        intro={
          testimonials.length > 0
            ? `${testimonials.length} notes from families, executors, and real estate professionals across Greater Cleveland.`
            : "Client stories will appear here once published in Sanity."
        }
      />
      <section className="section">
        <div className="shell">
          {testimonials.length > 0 ? (
            <div className="masonry-quotes">
              {sortedTestimonials.map((testimonial) => (
                <blockquote
                  className={testimonial.featured ? "featured-quote" : undefined}
                  key={testimonial._id}
                >
                  <span className="quote-mark" aria-hidden="true">
                    “
                  </span>
                  {testimonial.quote ? <p>{testimonial.quote}</p> : null}
                  <footer>
                    {testimonial.name ? <strong>{testimonial.name}</strong> : null}
                    {testimonial.role ? <span>{testimonial.role}</span> : null}
                  </footer>
                </blockquote>
              ))}
            </div>
          ) : (
            <ContentPlaceholder message="Testimonials will appear here once published in Sanity." />
          )}
        </div>
      </section>
      <section className="pre-call section--dark section">
        <div className="shell pre-call__grid">
          <h2>Make an overwhelming process feel manageable.</h2>
          <div>
            <p>Start with a conversation about the home and what your family needs next.</p>
            <Link className="button button--pill button--cream" href="/contact">
              Request a consultation <ArrowUpRight />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
