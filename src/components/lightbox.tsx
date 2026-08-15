"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

export type LightboxPhoto = {
  key: string;
  src: string;
  alt: string;
  caption?: string | null;
};

const SWIPE_THRESHOLD_PX = 50;

/** Open/close/step state for a set of `total` photos, with wrap-around paging. */
export function useLightbox(total: number) {
  const [index, setIndex] = useState<number | null>(null);

  const open = useCallback((next: number) => setIndex(next), []);
  const close = useCallback(() => setIndex(null), []);
  const step = useCallback(
    (delta: number) =>
      setIndex((current) =>
        current === null || total === 0 ? current : (current + delta + total) % total,
      ),
    [total],
  );

  return { index, open, close, step };
}

/** Fullscreen photo viewer. Mounted only while open, so it owns no open/close state. */
export function Lightbox({
  photos,
  index,
  onClose,
  onStep,
}: {
  photos: LightboxPhoto[];
  index: number;
  onClose: () => void;
  onStep: (delta: number) => void;
}) {
  const dialog = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  const total = photos.length;
  const photo = photos[index];

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowRight":
          onStep(1);
          break;
        case "ArrowLeft":
          onStep(-1);
          break;
        default:
          break;
      }
    };

    document.addEventListener("keydown", onKeyDown);
    const restoreOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = restoreOverflow;
    };
  }, [onClose, onStep]);

  useEffect(() => {
    dialog.current?.focus();
  }, []);

  const onTouchEnd = (event: React.TouchEvent) => {
    const start = touchStartX.current;
    touchStartX.current = null;
    if (start === null) return;

    const travelled = event.changedTouches[0].clientX - start;
    if (Math.abs(travelled) < SWIPE_THRESHOLD_PX) return;
    onStep(travelled < 0 ? 1 : -1);
  };

  if (!photo) return null;

  return (
    <div className="lightbox">
      <div className="lightbox__backdrop" aria-hidden="true" onClick={onClose} />
      <div
        className="lightbox__dialog"
        role="dialog"
        aria-modal="true"
        aria-label={`Photo ${index + 1} of ${total}${
          photo.caption ? `: ${photo.caption}` : ""
        }`}
        tabIndex={-1}
        ref={dialog}
      >
        <div className="lightbox__bar">
          <p className="lightbox__count">
            {index + 1} / {total}
          </p>
          <button
            type="button"
            className="lightbox__close"
            onClick={onClose}
            aria-label="Close gallery"
          >
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.8" />
            </svg>
          </button>
        </div>

        <div
          className="lightbox__frame"
          onTouchStart={(event) => {
            touchStartX.current = event.touches[0].clientX;
          }}
          onTouchEnd={onTouchEnd}
        >
          <Image key={photo.key} src={photo.src} alt={photo.alt} fill sizes="92vw" />
        </div>

        {total > 1 ? (
          <>
            <button
              type="button"
              className="lightbox__nav lightbox__nav--prev"
              onClick={() => onStep(-1)}
              aria-label="Previous photo"
            >
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M15 5l-7 7 7 7" stroke="currentColor" strokeWidth="1.8" />
              </svg>
            </button>
            <button
              type="button"
              className="lightbox__nav lightbox__nav--next"
              onClick={() => onStep(1)}
              aria-label="Next photo"
            >
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="1.8" />
              </svg>
            </button>
          </>
        ) : null}

        {photo.caption ? <p className="lightbox__caption">{photo.caption}</p> : null}
      </div>
    </div>
  );
}
