import { defineField, defineType } from "sanity";

export const faq = defineType({
  name: "faq",
  title: "FAQs",
  type: "document",
  fields: [
    defineField({
      name: "question",
      title: "Question",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "answer",
      title: "Answer",
      type: "text",
      rows: 6,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "order",
      title: "Display order",
      type: "number",
      initialValue: 10,
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Primary FAQ", value: "primary" },
          { title: "Liquidator interview", value: "interview" },
        ],
        layout: "radio",
      },
      initialValue: "primary",
    }),
    defineField({
      name: "legacyId",
      title: "Legacy ID",
      description: "Original Blogger FAQ number for migration tracking",
      type: "string",
    }),
  ],
  preview: { select: { title: "question", subtitle: "category" } },
});
