import { defineField, defineType } from "sanity";
import { SiteSettingInput, siteSettingOptions } from "../../components/site-setting-input";

const linkTypes = [
  { title: "Page", value: "page" },
  { title: "Site setting", value: "setting" },
  { title: "Phone", value: "phone" },
  { title: "Email", value: "email" },
  { title: "Website", value: "url" },
] as const;

const sectionPages = [
  { title: "Services", value: "/services" },
  { title: "Estate sales", value: "/estate-sales" },
  { title: "Clean-outs", value: "/clean-outs" },
  { title: "FAQ", value: "/faq" },
  { title: "Testimonials", value: "/testimonials" },
] as const;

type ButtonParent = { linkType?: string; page?: unknown; section?: string };

const requiredFor =
  (linkType: string, message: string) =>
  (value: unknown, context: { parent?: unknown }) => {
    const parent = context.parent as ButtonParent | undefined;
    return parent?.linkType === linkType && !value ? message : true;
  };

export const heroButton = defineType({
  name: "heroButton",
  title: "Button",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Button text",
      type: "string",
      description: "Leave blank to use a sensible default, like “Call 440-669-9665”.",
    }),
    defineField({
      name: "linkType",
      title: "Links to",
      type: "string",
      options: { list: [...linkTypes], layout: "radio", direction: "horizontal" },
      initialValue: "page",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "page",
      title: "Page",
      type: "reference",
      to: [
        { type: "homePage" },
        { type: "aboutPage" },
        { type: "contactPage" },
        { type: "service" },
        { type: "cleanoutProject" },
      ],
      options: { disableNew: true },
      hidden: ({ parent }) => parent?.linkType !== "page",
      validation: (rule) =>
        rule.custom((value, context) => {
          const parent = context.parent as ButtonParent | undefined;
          return parent?.linkType === "page" && !value && !parent.section
            ? "Choose a page or a section."
            : true;
        }),
    }),
    defineField({
      name: "section",
      title: "Or a section page",
      type: "string",
      description: "Listing pages that aren't a single document in Studio.",
      options: { list: [...sectionPages] },
      hidden: ({ parent }) => parent?.linkType !== "page",
    }),
    defineField({
      name: "setting",
      title: "Site setting",
      type: "string",
      description: "Stays in sync — edit the value in Site settings and this button follows.",
      options: { list: [...siteSettingOptions], layout: "radio" },
      components: { input: SiteSettingInput },
      hidden: ({ parent }) => parent?.linkType !== "setting",
      validation: (rule) => rule.custom(requiredFor("setting", "Choose a site setting.")),
    }),
    defineField({
      name: "phone",
      title: "Phone number",
      type: "string",
      placeholder: "440-555-0123",
      hidden: ({ parent }) => parent?.linkType !== "phone",
      validation: (rule) =>
        rule.custom((value, context) => {
          const missing = requiredFor("phone", "Add a phone number.")(value, context);
          if (missing !== true) return missing;
          if (typeof value === "string" && value.replace(/\D/g, "").length < 10) {
            return "Use a full 10-digit phone number.";
          }
          return true;
        }),
    }),
    defineField({
      name: "email",
      title: "Email address",
      type: "string",
      hidden: ({ parent }) => parent?.linkType !== "email",
      validation: (rule) =>
        rule.email().custom(requiredFor("email", "Add an email address.")),
    }),
    defineField({
      name: "url",
      title: "Website address",
      type: "url",
      placeholder: "https://",
      hidden: ({ parent }) => parent?.linkType !== "url",
      validation: (rule) =>
        rule
          .uri({ scheme: ["http", "https"] })
          .custom(requiredFor("url", "Add a website address.")),
    }),
  ],
  preview: {
    select: {
      label: "label",
      linkType: "linkType",
      setting: "setting",
      section: "section",
      pageTitle: "page.title",
      pageType: "page._type",
      phone: "phone",
      email: "email",
      url: "url",
    },
    prepare({ label, linkType, setting, section, pageTitle, pageType, phone, email, url }) {
      const settingTitle = siteSettingOptions.find((item) => item.value === setting)?.title;
      const sectionTitle = sectionPages.find((item) => item.value === section)?.title;
      const destination =
        linkType === "setting"
          ? settingTitle && `Site setting: ${settingTitle}`
          : linkType === "page"
            ? pageTitle || pageType || sectionTitle
            : linkType === "phone"
              ? phone
              : linkType === "email"
                ? email
                : url;
      return { title: label || "Default text", subtitle: destination || "Not linked yet" };
    },
  },
});
