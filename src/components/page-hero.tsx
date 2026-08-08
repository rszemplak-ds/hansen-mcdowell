import type { ReactNode } from "react";

export function PageHero({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  intro: string;
  children?: ReactNode;
}) {
  return (
    <section className="page-hero">
      <div className="shell page-hero__grid">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
        </div>
        <div className="page-hero__aside">
          <p className="page-hero__intro">{intro}</p>
          {children}
        </div>
      </div>
    </section>
  );
}
