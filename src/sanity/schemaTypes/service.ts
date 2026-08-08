import { defineField, defineType } from "sanity";

export const service = defineType({
  name: "service",
  title: "Services",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: (rule) => rule.required() }),
    defineField({ name: "eyebrow", title: "Short label", type: "string" }),
    defineField({ name: "summary", title: "Card summary", type: "text", rows: 3 }),
    defineField({ name: "description", title: "Full description", type: "text", rows: 5 }),
    defineField({ name: "image", title: "Featured image", type: "image", options: { hotspot: true }, fields: [{ name: "alt", title: "Alternative text", type: "string" }] }),
    defineField({ name: "features", title: "What’s included", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "order", title: "Display order", type: "number", initialValue: 10 }),
  ],
  preview: { select: { title: "title", media: "image" } },
});
