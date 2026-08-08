import { defineField, defineType } from "sanity";

export const cleanoutProject = defineType({
  name: "cleanoutProject",
  title: "Clean-out projects",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Project title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "location", title: "Location", type: "string" }),
    defineField({ name: "description", title: "Description", type: "text", rows: 4 }),
    defineField({ name: "beforeImage", title: "Before image", type: "image", options: { hotspot: true }, validation: (rule) => rule.required() }),
    defineField({ name: "afterImage", title: "After image", type: "image", options: { hotspot: true }, validation: (rule) => rule.required() }),
    defineField({ name: "completedAt", title: "Completed", type: "date" }),
  ],
  preview: { select: { title: "title", subtitle: "location", media: "afterImage" } },
});
