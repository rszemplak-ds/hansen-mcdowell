import { defineField, defineType } from "sanity";

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonials",
  type: "document",
  fields: [
    defineField({ name: "quote", title: "Quote", type: "text", rows: 6, validation: (rule) => rule.required() }),
    defineField({ name: "name", title: "Name", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "role", title: "Role or company", type: "string" }),
    defineField({ name: "featured", title: "Feature on homepage", type: "boolean", initialValue: false }),
    defineField({ name: "order", title: "Display order", type: "number", initialValue: 10 }),
  ],
  preview: { select: { title: "name", subtitle: "role" } },
});
