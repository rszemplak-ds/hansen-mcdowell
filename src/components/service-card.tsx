import Image from "next/image";
import Link from "next/link";
import type { Service } from "@/lib/site-data";
import { ArrowUpRight } from "./icons";

export function ServiceCard({ service, index }: { service: Service; index: number }) {
  return (
    <article className="service-card">
      <div className="service-card__image">
        <Image
          src={service.imageUrl}
          alt="A thoughtfully prepared home interior"
          fill
          sizes="(max-width: 800px) 100vw, 50vw"
        />
        <span>0{index + 1}</span>
      </div>
      <div className="service-card__body">
        <p className="eyebrow">{service.eyebrow}</p>
        <h3>{service.title}</h3>
        <p>{service.summary}</p>
        <Link className="text-link" href={`/${service.slug}`}>
          Explore the service <ArrowUpRight />
        </Link>
      </div>
    </article>
  );
}
