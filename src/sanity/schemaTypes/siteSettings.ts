import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  fields: [
    defineField({ name: "businessName", title: "Business name", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "shortName", title: "Short name", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "phone", title: "Phone", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "email", title: "Email", type: "string", validation: (rule) => rule.required().email() }),
    defineField({ name: "serviceArea", title: "Service area", type: "string" }),
    defineField({ name: "license", title: "License statement", type: "string" }),
    defineField({ name: "auctionUrl", title: "Auction website", type: "url" }),
    defineField({ name: "facebookUrl", title: "Facebook page", type: "url" }),
  ],
});
