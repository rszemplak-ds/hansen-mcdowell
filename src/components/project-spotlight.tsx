"use client";

import { useEffect, useMemo, useRef } from "react";
import { BeforeAfter } from "@/components/before-after";
import { Lightbox, useLightbox, type LightboxPhoto } from "@/components/lightbox";

export function ProjectSpotlight({
  before,
  after,
  title,
  beforeAlt,
  afterAlt,
  showHint = true,
}: {
  before: string;
  after: string;
  title: string;
  beforeAlt?: string | null;
  afterAlt?: string | null;
  /** The drag instruction only needs saying once per page. */
  showHint?: boolean;
}) {
  const photos = useMemo<LightboxPhoto[]>(
    () => [
      {
        key: "before",
        src: before,
        alt: beforeAlt?.trim() || `${title}, before clean-out`,
        caption: "Before",
      },
      {
        key: "after",
        src: after,
        alt: afterAlt?.trim() || `${title}, after clean-out`,
        caption: "After",
      },
    ],
    [before, after, title, beforeAlt, afterAlt],
  );

  const { index, open, close, step } = useLightbox(photos.length);
  const trigger = useRef<HTMLButtonElement>(null);
  const hasOpened = useRef(false);

  // Send focus back to the trigger on close, but never steal it on first render.
  useEffect(() => {
    if (index !== null) {
      hasOpened.current = true;
      return;
    }
    if (hasOpened.current) {
      trigger.current?.focus();
    }
  }, [index]);

  return (
    <>
      <BeforeAfter
        before={before}
        after={after}
        title={title}
        beforeAlt={beforeAlt}
        afterAlt={afterAlt}
      />

      <div className="project-spotlight__actions">
        {showHint ? (
          <p className="project-spotlight__hint">
            Drag the slider to compare the room before and after.
          </p>
        ) : null}
        <button
          type="button"
          className="button button--pill button--outline-ink button--small"
          onClick={() => open(0)}
          aria-label={`View ${title} before and after at full size`}
          ref={trigger}
        >
          View full size
        </button>
      </div>

      {index === null ? null : (
        <Lightbox photos={photos} index={index} onClose={close} onStep={step} />
      )}
    </>
  );
}
