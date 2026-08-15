import { defineField, defineType } from "sanity";

const stageTitles: Record<string, string> = {
  before: "Before",
  after: "After",
  detail: "Detail",
};

export const projectPhoto = defineType({
  name: "projectPhoto",
  title: "Photo",
  type: "object",
  fields: [
    defineField({
      name: "image",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required().error("Choose a photo to upload"),
    }),
    defineField({
      name: "stage",
      title: "Which stage is this?",
      description: "Groups the photo on the project page.",
      type: "string",
      initialValue: "detail",
      options: {
        list: [
          { title: "Before", value: "before" },
          { title: "After", value: "after" },
          { title: "Detail / other", value: "detail" },
        ],
        layout: "radio",
      },
    }),
    defineField({
      name: "caption",
      title: "Caption",
      description: "Optional. Shown under the photo, e.g. “Basement storage”.",
      type: "string",
    }),
    defineField({
      name: "alt",
      title: "Alt text",
      description: "Optional description for screen readers.",
      type: "string",
    }),
  ],
  preview: {
    select: { media: "image", caption: "caption", stage: "stage" },
    prepare({ media, caption, stage }) {
      const stageTitle = stageTitles[stage as string] ?? "Photo";
      return {
        title: caption || stageTitle,
        subtitle: caption ? stageTitle : undefined,
        media,
      };
    },
  },
});
