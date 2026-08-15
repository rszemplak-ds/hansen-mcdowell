import type { StructureResolver } from "sanity/structure";

const singletonTypes = new Set(["siteSettings", "homePage", "aboutPage", "contactPage"]);
const hiddenTypes = new Set(["page"]);

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Hansen McDowell")
    .items([
      S.listItem()
        .title("Site settings")
        .id("siteSettings")
        .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
      S.divider(),
      S.listItem()
        .title("Home page")
        .id("homePage")
        .child(S.document().schemaType("homePage").documentId("homePage")),
      S.listItem()
        .title("About page")
        .id("aboutPage")
        .child(S.document().schemaType("aboutPage").documentId("aboutPage")),
      S.listItem()
        .title("Contact page")
        .id("contactPage")
        .child(S.document().schemaType("contactPage").documentId("contactPage")),
      S.divider(),
      S.documentTypeListItem("service").title("Services"),
      S.documentTypeListItem("estateSale").title("Estate sales"),
      S.listItem()
        .title("Before & after projects")
        .schemaType("cleanoutProject")
        .child(
          S.documentTypeList("cleanoutProject")
            .title("Before & after projects")
            .defaultOrdering([
              { field: "order", direction: "asc" },
              { field: "completedAt", direction: "desc" },
            ]),
        ),
      S.documentTypeListItem("testimonial").title("Testimonials"),
      S.documentTypeListItem("faq").title("FAQs"),
    ]);

export const singletonDocumentIds = singletonTypes;
export const hiddenDocumentTypes = hiddenTypes;
