import { defineField, defineType } from "sanity";

export const faq = defineType({
  name: "faq",
  title: "FAQs",
  type: "document",
  fields: [
    defineField({ name: "question", title: "Question", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "answer", title: "Answer", type: "text", rows: 6, validation: (rule) => rule.required() }),
    defineField({ name: "order", title: "Display order", type: "number", initialValue: 10 }),
  ],
  preview: { select: { title: "question" } },
});
