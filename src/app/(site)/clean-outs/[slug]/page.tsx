import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "@/components/icons";
import { ProjectGallery, type GalleryGroup } from "@/components/project-gallery";
import { ProjectSpotlight } from "@/components/project-spotlight";
import {
  getCleanoutProjectBySlug,
  getCleanoutProjects,
  type CleanoutProjectDetail,
} from "@/lib/content";

type ProjectPhoto = NonNullable<CleanoutProjectDetail["gallery"]>[number];

const photoGroups = [
  { stage: "before", title: "Before" },
  { stage: "after", title: "After" },
  { stage: "detail", title: "More details" },
] as const;

export async function generateStaticParams() {
  const projects = await getCleanoutProjects();
  return projects
    .map((project) => project.slug)
    .filter((slug): slug is string => Boolean(slug))
    .map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getCleanoutProjectBySlug(slug);

  if (!project) {
    return { title: "Project not found" };
  }

  const place = project.location ? ` in ${project.location}` : "";
  return {
    title: `${project.title ?? "Clean-out project"} — before & after`,
    description:
      project.description ??
      `Before and after photos from a complete home clean-out${place} by Hansen McDowell.`,
  };
}

function groupPhotos(gallery: ProjectPhoto[], title: string): GalleryGroup[] {
  return photoGroups
    .map((group) => ({
      stage: group.stage,
      title: group.title,
      photos: gallery
        .filter((photo) => (photo.stage ?? "detail") === group.stage)
        .map((photo) => ({
          key: photo._key,
          src: photo.image!.url!,
          alt: photo.alt?.trim() || photo.caption?.trim() || title,
          caption: photo.caption ?? null,
        })),
    }))
    .filter((group) => group.photos.length > 0);
}

export default async function CleanoutProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getCleanoutProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const title = project.title ?? "Clean-out project";
  const gallery = (project.gallery ?? []).filter((photo) => photo.image?.url);
  const groups = groupPhotos(gallery, title);
  const hasSpotlight = Boolean(project.beforeImage?.url && project.afterImage?.url);
  const completed = project.completedAt
    ? new Date(project.completedAt).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <>
      <section className="project-hero">
        <div className="shell">
          <Link className="text-link project-hero__back" href="/clean-outs">
            Back to clean-outs
          </Link>
          <p className="eyebrow">Before &amp; after</p>
          <h1>{title}</h1>
          {project.description ? (
            <p className="project-hero__intro">{project.description}</p>
          ) : null}
          {project.location || completed ? (
            <p className="project-hero__meta">
              {[project.location, completed].filter(Boolean).join(" · ")}
            </p>
          ) : null}
        </div>
      </section>

      {hasSpotlight ? (
        <section className="project-spotlight section">
          <div className="shell">
            <ProjectSpotlight
              before={project.beforeImage!.url!}
              after={project.afterImage!.url!}
              title={title}
              beforeAlt={project.beforeImage?.alt}
              afterAlt={project.afterImage?.alt}
            />
          </div>
        </section>
      ) : null}

      {groups.length > 0 ? (
        <section className="project-gallery section">
          <div className="shell">
            <ProjectGallery groups={groups} />
          </div>
        </section>
      ) : null}

      <section className="pre-call section section--dark">
        <div className="shell pre-call__grid">
          <h2>Have a home that needs the same attention?</h2>
          <div>
            <p>
              Every property is different. A walkthrough gives you a realistic plan and a
              quote for the whole job.
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
