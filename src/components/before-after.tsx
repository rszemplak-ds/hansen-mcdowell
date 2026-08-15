"use client";

import Image from "next/image";
import { useState } from "react";

export function BeforeAfter({
  before,
  after,
  title,
  beforeAlt,
  afterAlt,
}: {
  before: string;
  after: string;
  title: string;
  beforeAlt?: string | null;
  afterAlt?: string | null;
}) {
  const [position, setPosition] = useState(52);

  return (
    <figure className="comparison" style={{ "--position": `${position}%` } as React.CSSProperties}>
      <Image
        src={before}
        alt={beforeAlt?.trim() || `${title}, before clean-out`}
        fill
        sizes="100vw"
      />
      <div className="comparison__after">
        <Image
          src={after}
          alt={afterAlt?.trim() || `${title}, after clean-out`}
          fill
          sizes="100vw"
        />
      </div>
      <figcaption className="comparison__labels">
        <span className="comparison__label comparison__label--before">Before</span>
        <span className="comparison__label comparison__label--after">After</span>
      </figcaption>
      <div className="comparison__line" aria-hidden="true">
        <span>↔</span>
      </div>
      <input
        type="range"
        min="0"
        max="100"
        value={position}
        onChange={(event) => setPosition(Number(event.target.value))}
        aria-label="Move to compare the before and after images"
      />
    </figure>
  );
}
