/** Minimal Sanity document shape for migration NDJSON / client import. */
export type SanityDoc = {
  _id: string;
  _type: string;
  [key: string]: unknown;
};

export function block(text: string, style: "normal" | "h2" = "normal") {
  return {
    _type: "block" as const,
    style,
    markDefs: [],
    children: [{ _type: "span" as const, text, marks: [] as string[] }],
  };
}

export function processStep(title: string, body: string, order: number) {
  return { _type: "processStep" as const, title, body, order };
}

export function valueItem(title: string, body: string, order: number) {
  return { _type: "valueItem" as const, title, body, order };
}

export function slugField(current: string) {
  return { _type: "slug" as const, current };
}
