import { defineArrayMember, defineField, defineType } from "sanity";

export const aboutPage = defineType({
  name: "aboutPage",
  title: "About page",
  type: "document",
  fields: [
    defineField({ name: "heroEyebrow", title: "Hero eyebrow", type: "string" }),
    defineField({ name: "heroHeading", title: "Hero heading", type: "string" }),
    defineField({
      name: "heroIntroduction",
      title: "Hero introduction",
      type: "text",
      rows: 4,
    }),
    defineField({ name: "storyEyebrow", title: "Story eyebrow", type: "string" }),
    defineField({ name: "storyHeading", title: "Story heading", type: "string" }),
    defineField({
      name: "storyBody",
      title: "Story body",
      type: "array",
      of: [defineArrayMember({ type: "block" })],
    }),
    defineField({
      name: "valuesEyebrow",
      title: "Values eyebrow",
      type: "string",
    }),
    defineField({ name: "valuesHeading", title: "Values heading", type: "string" }),
    defineField({
      name: "values",
      title: "Values",
      type: "array",
      of: [defineArrayMember({ type: "valueItem" })],
    }),
    defineField({
      name: "credentialsEyebrow",
      title: "Credentials eyebrow",
      type: "string",
    }),
    defineField({
      name: "credentialsHeading",
      title: "Credentials heading",
      type: "string",
    }),
    defineField({
      name: "credentials",
      title: "Credentials",
      type: "array",
      of: [defineArrayMember({ type: "valueItem" })],
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seoFields",
    }),
  ],
  preview: {
    prepare: () => ({ title: "About page" }),
  },
});
