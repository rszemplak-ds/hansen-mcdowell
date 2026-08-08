"use client";

import Image from "next/image";
import { useState } from "react";

export function BeforeAfter({
  before,
  after,
  title,
}: {
  before: string;
  after: string;
  title: string;
}) {
  const [position, setPosition] = useState(52);

  return (
    <div className="comparison" style={{ "--position": `${position}%` } as React.CSSProperties}>
      <Image src={before} alt={`${title}, before clean-out`} fill sizes="100vw" />
      <div className="comparison__after">
        <Image src={after} alt={`${title}, after clean-out`} fill sizes="100vw" />
      </div>
      <span className="comparison__label comparison__label--before">Before</span>
      <span className="comparison__label comparison__label--after">After</span>
      <div className="comparison__line" aria-hidden="true"><span>↔</span></div>
      <input
        type="range"
        min="0"
        max="100"
        value={position}
        onChange={(event) => setPosition(Number(event.target.value))}
        aria-label="Move to compare the before and after images"
      />
    </div>
  );
}
