"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef } from "react";
import { Lightbox, useLightbox, type LightboxPhoto } from "@/components/lightbox";

export type GalleryPhoto = LightboxPhoto;

export type GalleryGroup = {
  stage: string;
  title: string;
  photos: GalleryPhoto[];
};

export function ProjectGallery({ groups }: { groups: GalleryGroup[] }) {
  const photos = useMemo(() => groups.flatMap((group) => group.photos), [groups]);
  const indexByKey = useMemo(
    () => new Map(photos.map((photo, index) => [photo.key, index])),
    [photos],
  );

  const { index, open, close, step } = useLightbox(photos.length);
  const triggers = useRef(new Map<string, HTMLButtonElement>());
  const openedFrom = useRef<string | null>(null);

  // Send focus back to the thumbnail that opened the viewer.
  useEffect(() => {
    if (index === null && openedFrom.current) {
      triggers.current.get(openedFrom.current)?.focus();
    }
  }, [index]);

  return (
    <>
      {groups.map((group) => (
        <div key={group.stage} className="project-gallery__group">
          <h2>{group.title}</h2>
          <div className="photo-grid">
            {group.photos.map((photo) => (
              <figure key={photo.key}>
                <button
                  type="button"
                  className="photo-grid__open"
                  aria-label={`View larger: ${photo.alt}`}
                  ref={(node) => {
                    if (node) {
                      triggers.current.set(photo.key, node);
                    } else {
                      triggers.current.delete(photo.key);
                    }
                  }}
                  onClick={() => {
                    openedFrom.current = photo.key;
                    open(indexByKey.get(photo.key) ?? 0);
                  }}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 700px) 100vw, (max-width: 960px) 50vw, 33vw"
                  />
                </button>
                {photo.caption ? <figcaption>{photo.caption}</figcaption> : null}
              </figure>
            ))}
          </div>
        </div>
      ))}

      {index === null ? null : (
        <Lightbox photos={photos} index={index} onClose={close} onStep={step} />
      )}
    </>
  );
}
