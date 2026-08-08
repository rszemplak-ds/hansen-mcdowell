import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  children,
  light = false,
}: {
  eyebrow: string;
  title: string;
  children?: ReactNode;
  light?: boolean;
}) {
  return (
    <div className={`section-heading ${light ? "section-heading--light" : ""}`}>
      <p className={`eyebrow ${light ? "eyebrow--light" : ""}`}>{eyebrow}</p>
      <div className="section-heading__row">
        <h2>{title}</h2>
        {children && <div className="section-heading__copy">{children}</div>}
      </div>
    </div>
  );
}
