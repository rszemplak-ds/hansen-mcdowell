import { defineField, defineType } from "sanity";

export const estateSale = defineType({
  name: "estateSale",
  title: "Estate sales",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Sale title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "city", title: "City", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "status", title: "Status", type: "string", initialValue: "draft", options: { list: [{ title: "Draft", value: "draft" }, { title: "Published", value: "published" }, { title: "Completed", value: "completed" }], layout: "radio" } }),
    defineField({ name: "biddingStarts", title: "Bidding starts", type: "datetime" }),
    defineField({ name: "biddingEnds", title: "Bidding ends", type: "datetime" }),
    defineField({ name: "pickup", title: "Pickup details", type: "string" }),
    defineField({ name: "summary", title: "Sale description", type: "text", rows: 6 }),
    defineField({ name: "auctionUrl", title: "Auction listing URL", type: "url" }),
    defineField({ name: "featuredImage", title: "Featured image", type: "image", options: { hotspot: true } }),
    defineField({ name: "gallery", title: "Gallery", type: "array", of: [{ type: "image", options: { hotspot: true } }] }),
  ],
  preview: { select: { title: "title", subtitle: "city", media: "featuredImage" } },
});
