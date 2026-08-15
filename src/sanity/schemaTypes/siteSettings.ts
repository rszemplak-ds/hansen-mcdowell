import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  fields: [
    defineField({
      name: "businessName",
      title: "Business name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "shortName",
      title: "Short name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "phone",
      title: "Phone",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: "serviceArea",
      title: "Service area",
      type: "string",
    }),
    defineField({
      name: "serviceAreaCities",
      title: "Service area cities",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "license",
      title: "License statement",
      type: "string",
    }),
    defineField({
      name: "auctionUrl",
      title: "Auction website",
      type: "url",
      initialValue: "https://greatfindsauction.com",
    }),
    defineField({
      name: "facebookUrl",
      title: "Facebook page",
      type: "url",
    }),
    defineField({
      name: "instagramUrl",
      title: "Instagram profile",
      type: "url",
    }),
    defineField({
      name: "twitterUrl",
      title: "Twitter / X profile",
      type: "url",
    }),
    defineField({
      name: "contactName",
      title: "Primary contact name",
      type: "string",
      initialValue: "Lynn D. Hansen",
    }),
    defineField({
      name: "settlementNote",
      title: "Settlement note",
      description: "e.g. Net proceeds paid within 3 days after pickup",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "brandMark",
      title: "Brand mark",
      type: "imageWithAlt",
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "imageWithAlt",
    }),
    defineField({
      name: "defaultSeo",
      title: "Default SEO",
      type: "seoFields",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Site settings" }),
  },
});
