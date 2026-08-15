import { defineArrayMember, defineField, defineType } from "sanity";

export const cleanoutProject = defineType({
  name: "cleanoutProject",
  title: "Before & after projects",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "media", title: "Photos" },
    { name: "settings", title: "Settings" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Project title",
      description: "Short label for this clean-out, e.g. “Lakewood attic & garage”.",
      type: "string",
      group: "content",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Page address",
      description:
        "Needed only if you add extra photos below. Click Generate to build it from the title.",
      type: "slug",
      group: "content",
      options: { source: "title", maxLength: 96 },
      validation: (rule) =>
        rule.custom((value, context) => {
          const gallery = (context.document as { gallery?: unknown[] } | undefined)?.gallery;
          if (Array.isArray(gallery) && gallery.length > 0 && !value?.current) {
            return "Generate a page address so visitors can open the full photo set";
          }
          return true;
        }),
    }),
    defineField({
      name: "location",
      title: "Location",
      description: "City or neighborhood shown under the title.",
      type: "string",
      group: "content",
    }),
    defineField({
      name: "description",
      title: "Description",
      description: "Optional note about what was cleared or the result.",
      type: "text",
      rows: 4,
      group: "content",
    }),
    defineField({
      name: "beforeImage",
      title: "Spotlight before photo",
      description:
        "The main “before” shot used in the slider on the Clean-outs page.",
      type: "image",
      group: "media",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
          description: "Optional. Defaults to the project title if left blank.",
        }),
      ],
      validation: (rule) => rule.required().error("Add a before photo"),
    }),
    defineField({
      name: "afterImage",
      title: "Spotlight after photo",
      description: "The matching “after” shot for the slider.",
      type: "image",
      group: "media",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
          description: "Optional. Defaults to the project title if left blank.",
        }),
      ],
      validation: (rule) => rule.required().error("Add an after photo"),
    }),
    defineField({
      name: "gallery",
      title: "More photos",
      description:
        "Extra photos for this project's own page. Add as many as you like — a “View more photos” link appears automatically once there is at least one.",
      type: "array",
      group: "media",
      of: [defineArrayMember({ type: "projectPhoto" })],
      options: { layout: "grid" },
    }),
    defineField({
      name: "published",
      title: "Show on website",
      description: "Turn on when this before & after is ready to appear on the Clean-outs page.",
      type: "boolean",
      group: "settings",
      initialValue: true,
    }),
    defineField({
      name: "order",
      title: "Display order",
      description: "Lower numbers appear first. Use 10, 20, 30… so you can insert items later.",
      type: "number",
      group: "settings",
      initialValue: 10,
      validation: (rule) => rule.integer().min(0),
    }),
    defineField({
      name: "completedAt",
      title: "Completed date",
      description: "Optional. Used as a secondary sort when display order matches.",
      type: "date",
      group: "settings",
    }),
    defineField({
      name: "legacyId",
      title: "Legacy ID",
      description: "Original source identifier for migration tracking",
      type: "string",
      group: "settings",
      hidden: true,
    }),
    defineField({
      name: "legacyUrl",
      title: "Legacy URL",
      type: "url",
      group: "settings",
      hidden: true,
    }),
  ],
  orderings: [
    {
      title: "Display order",
      name: "orderAsc",
      by: [
        { field: "order", direction: "asc" },
        { field: "completedAt", direction: "desc" },
      ],
    },
    {
      title: "Newest completed",
      name: "completedDesc",
      by: [{ field: "completedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      location: "location",
      published: "published",
      media: "afterImage",
    },
    prepare({ title, location, published, media }) {
      const visibility = published === false ? "Hidden" : "Live";
      const place = location ? `${location} · ` : "";
      return {
        title: title || "Untitled project",
        subtitle: `${place}${visibility}`,
        media,
      };
    },
  },
});
