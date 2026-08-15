import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ContentPlaceholder } from "@/components/content-placeholder";
import { ArrowUpRight, Check } from "@/components/icons";
import { PageHero } from "@/components/page-hero";
import { ProjectSpotlight } from "@/components/project-spotlight";
import {
  getCleanoutProjects,
  getServiceBySlug,
  metadataFromSeo,
} from "@/lib/content";
import { resolveImage, stockImages } from "@/lib/images";

export async function generateMetadata(): Promise<Metadata> {
  const service = await getServiceBySlug("clean-outs");
  return metadataFromSeo(service?.seo, {
    title: "Home Clean-Outs",
    description:
      "Respectful, complete home clean-out services in Greater Cleveland, available after an estate auction or as a standalone service.",
  });
}

export default async function CleanOutsPage() {
  const [projects, service] = await Promise.all([
    getCleanoutProjects(),
    getServiceBySlug("clean-outs"),
  ]);

  const features = service?.features ?? [];
  const processSteps = service?.processSteps ?? [];
  const featureImage = resolveImage(service?.image, stockImages.clearedKitchen);
  const visibleProjects = projects.filter(
    (project) => project.beforeImage?.url && project.afterImage?.url && project.title,
  );

  return (
    <>
      <PageHero
        eyebrow={service?.heroEyebrow ?? service?.eyebrow ?? "Complete home clean-outs"}
        title={service?.heroHeading ?? service?.title ?? "Home clean-outs"}
        intro={
          service?.heroIntroduction ??
          service?.summary ??
          "Clean-outs page content pending import into Sanity."
        }
      >
        <Link className="button button--pill" href="/contact">
          Request a walkthrough <ArrowUpRight />
        </Link>
      </PageHero>

      <section className="feature-split section">
        <div className="shell feature-split__grid feature-split__grid--reverse">
          <div className="feature-frame feature-frame--photo" aria-hidden="true">
            <Image
              src={featureImage.src}
              alt=""
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
            />
            <div className="feature-frame__caption">
              <strong>Complete clean-outs</strong>
              <p>After an auction or on its own — quoted for the specific property.</p>
            </div>
          </div>
          <div className="prose-block">
            {service?.eyebrow ? <p className="eyebrow">{service.eyebrow}</p> : null}
            {service?.title ? <h2>{service.title}</h2> : null}
            {service?.description ? <p>{service.description}</p> : null}
            {!service?.description ? (
              <ContentPlaceholder message="Clean-outs service details pending import into Sanity." />
            ) : null}
            {features.length > 0 ? (
              <ul className="check-list">
                {features.map((feature) => (
                  <li key={feature}>
                    <Check /> {feature}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      </section>

      <section className="section home-process">
        <div className="shell cleanout-types__grid">
          <div>
            <p className="eyebrow">{service?.eyebrow ?? "Built around the property"}</p>
            <h2>
              {service?.summary ?? "A practical answer for many kinds of transitions."}
            </h2>
          </div>
          {processSteps.length > 0 ? (
            <div className="cleanout-types__list">
              {processSteps.map((step, index) => (
                <article key={step._key}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {step.title ? <h3>{step.title}</h3> : null}
                  {step.body ? <p>{step.body}</p> : null}
                </article>
              ))}
            </div>
          ) : (
            <ContentPlaceholder message="Clean-outs process steps pending import into Sanity." />
          )}
        </div>
      </section>

      {visibleProjects.length > 0 ? (
        <section className="projects section">
          <div className="shell">
            <div className="projects__heading">
              <p className="eyebrow">Before &amp; after</p>
              <h2>The difference a complete clean-out can make.</h2>
            </div>
            <div className="projects__list">
              {visibleProjects.map((project) => (
                <article key={project._id}>
                  <ProjectSpotlight
                    before={project.beforeImage!.url!}
                    after={project.afterImage!.url!}
                    title={project.title!}
                    beforeAlt={project.beforeImage?.alt}
                    afterAlt={project.afterImage?.alt}
                    showHint={false}
                  />
                  <div>
                    <h3>{project.title}</h3>
                    {project.location ? <span>{project.location}</span> : null}
                    {project.description ? <p>{project.description}</p> : null}
                    {project.slug && (project.photoCount ?? 0) > 0 ? (
                      <Link className="text-link" href={`/clean-outs/${project.slug}`}>
                        View {project.photoCount} more{" "}
                        {project.photoCount === 1 ? "photo" : "photos"} <ArrowUpRight />
                      </Link>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="pre-call section section--dark">
        <div className="shell pre-call__grid">
          <h2>Let us see the home before you start clearing it.</h2>
          <div>
            <p>
              A walkthrough helps protect potential value and gives you a realistic
              plan for the whole property.
            </p>
            <Link className="button button--pill button--cream" href="/contact">
              Schedule a walkthrough <ArrowUpRight />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
