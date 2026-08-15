import { defineArrayMember, defineField, defineType } from "sanity";

export const page = defineType({
  name: "page",
  title: "Pages (deprecated)",
  type: "document",
  deprecated: {
    reason: "Use homePage, aboutPage, or contactPage singletons instead.",
  },
  fields: [
    defineField({
      name: "title",
      title: "Page name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "URL slug",
      type: "slug",
      options: { source: "title" },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "heroEyebrow", title: "Hero label", type: "string" }),
    defineField({ name: "heroHeading", title: "Hero heading", type: "string" }),
    defineField({
      name: "heroIntroduction",
      title: "Hero introduction",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "body",
      title: "Additional page copy",
      type: "array",
      of: [
        defineArrayMember({ type: "block" }),
        defineArrayMember({ type: "image", options: { hotspot: true } }),
      ],
    }),
    defineField({
      name: "seoTitle",
      title: "SEO title",
      type: "string",
      validation: (rule) => rule.max(60),
    }),
    defineField({
      name: "seoDescription",
      title: "SEO description",
      type: "text",
      rows: 3,
      validation: (rule) => rule.max(160),
    }),
  ],
  preview: { select: { title: "title", subtitle: "slug.current" } },
});
