import { defineArrayMember, defineField, defineType } from "sanity";

export const service = defineType({
  name: "service",
  title: "Services",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "eyebrow", title: "Short label", type: "string" }),
    defineField({
      name: "summary",
      title: "Card summary",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "description",
      title: "Full description",
      type: "text",
      rows: 5,
    }),
    defineField({
      name: "image",
      title: "Featured image",
      type: "imageWithAlt",
    }),
    defineField({
      name: "features",
      title: "What's included",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "order",
      title: "Display order",
      type: "number",
      initialValue: 10,
    }),
    defineField({ name: "heroEyebrow", title: "Hero eyebrow", type: "string" }),
    defineField({ name: "heroHeading", title: "Hero heading", type: "string" }),
    defineField({
      name: "heroIntroduction",
      title: "Hero introduction",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "processSteps",
      title: "Process steps",
      type: "array",
      of: [defineArrayMember({ type: "processStep" })],
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seoFields",
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Estate sales", value: "estate-sales" },
          { title: "Clean-outs", value: "clean-outs" },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
  ],
  preview: { select: { title: "title", media: "image" } },
});
