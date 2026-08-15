export type ResolvedImage = {
  src: string;
  alt: string;
};

/** Shape shared by the image projections in `queries.ts`; `alt` is absent on some. */
type SanityImageLike = { url?: string | null; alt?: string | null } | null | undefined;

const unsplash = (id: string, width: number) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=80`;

/** Stand-ins used only where Sanity has no image yet. */
export const stockImages = {
  heroLiving: {
    src: unsplash("1618221195710-dd6b41faaea6", 900),
    alt: "Warm living room with collected furnishings",
  },
  heroObjects: {
    src: unsplash("1586023492125-27b2c045efd7", 700),
    alt: "Curated household objects on a table",
  },
  heroCleared: {
    src: unsplash("1493663284031-b7e3aefcae8e", 700),
    alt: "Bright, cleared room ready for what comes next",
  },
  estateContents: {
    src: unsplash("1513694203232-719a280e022f", 900),
    alt: "Dresser and furnishings arranged in a quiet room",
  },
  clearedKitchen: {
    src: unsplash("1484154218962-a197022b5858", 900),
    alt: "Clean, emptied kitchen ready for the next owner",
  },
  familyRoom: {
    src: unsplash("1493809842364-78817add7ffb", 900),
    alt: "Comfortable family living room with natural light",
  },
  furnishing: {
    src: unsplash("1555041469-a586c61ea9bc", 800),
    alt: "A single well-kept sofa against a bright wall",
  },
} satisfies Record<string, ResolvedImage>;

/** Sanity content always wins; the stock image is only a backstop. */
export function resolveImage(
  image: SanityImageLike,
  fallback: ResolvedImage,
): ResolvedImage {
  const src = image?.url?.trim();
  if (!src) return fallback;

  return { src, alt: image?.alt?.trim() || fallback.alt };
}

export function serviceImageFallback(slug?: string | null): ResolvedImage {
  switch (slug) {
    case "estate-sales":
      return stockImages.estateContents;
    case "clean-outs":
      return stockImages.clearedKitchen;
    default:
      return stockImages.furnishing;
  }
}
