import Image from "next/image";
import Link from "next/link";
import type { Service } from "@/lib/content";
import { resolveImage, serviceImageFallback } from "@/lib/images";
import { ArrowUpRight } from "./icons";

export function ServiceCard({ service, index }: { service: Service; index: number }) {
  const slug = service.slug ?? "";
  const image = resolveImage(service.image, serviceImageFallback(service.slug));

  return (
    <article className="service-card">
      <div className="service-card__image">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(max-width: 800px) 100vw, 50vw"
        />
        <span className="service-card__index">0{index + 1}</span>
      </div>
      <div className="service-card__body">
        {service.eyebrow ? <p className="eyebrow">{service.eyebrow}</p> : null}
        <h3>{service.title ?? "Service"}</h3>
        {service.summary ? <p>{service.summary}</p> : null}
        {slug ? (
          <Link className="text-link" href={`/${slug}`}>
            Explore the service <ArrowUpRight />
          </Link>
        ) : null}
      </div>
    </article>
  );
}
