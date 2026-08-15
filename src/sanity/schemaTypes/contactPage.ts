import { defineField, defineType } from "sanity";

export const contactPage = defineType({
  name: "contactPage",
  title: "Contact page",
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
    defineField({
      name: "directContactHeading",
      title: "Direct contact heading",
      type: "string",
    }),
    defineField({
      name: "directContactNote",
      title: "Direct contact note",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "formHeading",
      title: "Form heading",
      type: "string",
    }),
    defineField({
      name: "formIntro",
      title: "Form introduction",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seoFields",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Contact page" }),
  },
});
