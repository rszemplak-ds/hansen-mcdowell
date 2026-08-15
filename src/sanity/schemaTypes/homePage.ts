import { defineArrayMember, defineField, defineType } from "sanity";

export const homePage = defineType({
  name: "homePage",
  title: "Home page",
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
      name: "heroProofPoints",
      title: "Hero proof points",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({ name: "introEyebrow", title: "Intro eyebrow", type: "string" }),
    defineField({ name: "introHeading", title: "Intro heading", type: "string" }),
    defineField({
      name: "introBody",
      title: "Intro body",
      type: "text",
      rows: 5,
    }),
    defineField({
      name: "processEyebrow",
      title: "Process eyebrow",
      type: "string",
    }),
    defineField({
      name: "processHeading",
      title: "Process heading",
      type: "string",
    }),
    defineField({
      name: "processIntro",
      title: "Process introduction",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "processSteps",
      title: "Process steps",
      type: "array",
      of: [defineArrayMember({ type: "processStep" })],
    }),
    defineField({
      name: "integrityEyebrow",
      title: "Integrity eyebrow",
      type: "string",
    }),
    defineField({
      name: "integrityHeading",
      title: "Integrity heading",
      type: "string",
    }),
    defineField({
      name: "integrityBody",
      title: "Integrity body",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "integrityQuote",
      title: "Integrity quote",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "integrityQuoteAttribution",
      title: "Integrity quote attribution",
      type: "string",
    }),
    defineField({
      name: "auctionBandEyebrow",
      title: "Auction band eyebrow",
      type: "string",
    }),
    defineField({
      name: "auctionBandHeading",
      title: "Auction band heading",
      type: "string",
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seoFields",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Home page" }),
  },
});
