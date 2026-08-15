import type { Metadata } from "next";

import { sanityFetch } from "@/sanity/lib/fetch";
import {
  ABOUT_PAGE_QUERY,
  CLEANOUT_PROJECT_BY_SLUG_QUERY,
  CLEANOUT_PROJECTS_QUERY,
  CONTACT_PAGE_QUERY,
  ESTATE_SALES_QUERY,
  FAQS_QUERY,
  HOME_PAGE_QUERY,
  SERVICE_BY_SLUG_QUERY,
  SERVICES_QUERY,
  SITE_SETTINGS_QUERY,
  TESTIMONIALS_QUERY,
} from "@/sanity/lib/queries";
import type {
  ABOUT_PAGE_QUERY_RESULT,
  CLEANOUT_PROJECT_BY_SLUG_QUERY_RESULT,
  CLEANOUT_PROJECTS_QUERY_RESULT,
  CONTACT_PAGE_QUERY_RESULT,
  ESTATE_SALES_QUERY_RESULT,
  FAQS_QUERY_RESULT,
  HOME_PAGE_QUERY_RESULT,
  SERVICE_BY_SLUG_QUERY_RESULT,
  SERVICES_QUERY_RESULT,
  SITE_SETTINGS_QUERY_RESULT,
  TESTIMONIALS_QUERY_RESULT,
} from "@/sanity/types";

type SeoFields =
  | {
      seoTitle?: string | null;
      seoDescription?: string | null;
    }
  | null
  | undefined;

export const DEFAULT_AUCTION_URL = "https://greatfindsauction.com";

const LEGACY_AUCTION_HOST = "vikingcatauctions.com";

const SITE_SETTINGS_REQUIRED = [
  "businessName",
  "shortName",
  "phone",
  "email",
  "serviceArea",
  "license",
  "auctionUrl",
] as const satisfies ReadonlyArray<keyof NonNullable<SITE_SETTINGS_QUERY_RESULT>>;

function resolveAuctionUrl(url: string | null | undefined): string {
  if (!url) {
    return DEFAULT_AUCTION_URL;
  }

  try {
    const host = new URL(url).hostname.replace(/^www\./, "");
    if (host === LEGACY_AUCTION_HOST) {
      return DEFAULT_AUCTION_URL;
    }
  } catch {
    return DEFAULT_AUCTION_URL;
  }

  return url;
}

export type SiteSettings = NonNullable<SITE_SETTINGS_QUERY_RESULT> & {
  businessName: string;
  shortName: string;
  phone: string;
  email: string;
  serviceArea: string;
  license: string;
  auctionUrl: string;
};

export type Service = SERVICES_QUERY_RESULT[number];
export type Testimonial = TESTIMONIALS_QUERY_RESULT[number];
export type Faq = FAQS_QUERY_RESULT[number];
export type EstateSale = ESTATE_SALES_QUERY_RESULT[number];
export type CleanoutProject = CLEANOUT_PROJECTS_QUERY_RESULT[number];
export type CleanoutProjectDetail = NonNullable<CLEANOUT_PROJECT_BY_SLUG_QUERY_RESULT>;

export type HomePage = NonNullable<HOME_PAGE_QUERY_RESULT>;
export type AboutPage = NonNullable<ABOUT_PAGE_QUERY_RESULT>;
export type ContactPage = NonNullable<CONTACT_PAGE_QUERY_RESULT>;

export function metadataFromSeo(
  seo: SeoFields,
  defaults: { title: string; description: string },
): Metadata {
  return {
    title: seo?.seoTitle ?? defaults.title,
    description: seo?.seoDescription ?? defaults.description,
  };
}

function assertSiteSettings(
  data: SITE_SETTINGS_QUERY_RESULT,
): asserts data is SiteSettings {
  if (!data) {
    throw new Error(
      "Site settings document not found in Sanity. Import siteSettings during migration.",
    );
  }

  for (const field of SITE_SETTINGS_REQUIRED) {
    if (!data[field]) {
      throw new Error(`Site settings missing required field: ${field}`);
    }
  }
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const data = await sanityFetch<SITE_SETTINGS_QUERY_RESULT>({
    query: SITE_SETTINGS_QUERY,
  });
  const settings = data
    ? { ...data, auctionUrl: resolveAuctionUrl(data.auctionUrl) }
    : data;
  assertSiteSettings(settings);
  return settings;
}

export async function getHomePage(): Promise<HOME_PAGE_QUERY_RESULT> {
  return sanityFetch<HOME_PAGE_QUERY_RESULT>({ query: HOME_PAGE_QUERY });
}

export async function getAboutPage(): Promise<ABOUT_PAGE_QUERY_RESULT> {
  return sanityFetch<ABOUT_PAGE_QUERY_RESULT>({ query: ABOUT_PAGE_QUERY });
}

export async function getContactPage(): Promise<CONTACT_PAGE_QUERY_RESULT> {
  return sanityFetch<CONTACT_PAGE_QUERY_RESULT>({ query: CONTACT_PAGE_QUERY });
}

export async function getServices(): Promise<SERVICES_QUERY_RESULT> {
  return sanityFetch<SERVICES_QUERY_RESULT>({ query: SERVICES_QUERY });
}

export async function getServiceBySlug(
  slug: string,
): Promise<SERVICE_BY_SLUG_QUERY_RESULT> {
  return sanityFetch<SERVICE_BY_SLUG_QUERY_RESULT>({
    query: SERVICE_BY_SLUG_QUERY,
    params: { slug },
  });
}

export async function getTestimonials(): Promise<TESTIMONIALS_QUERY_RESULT> {
  return sanityFetch<TESTIMONIALS_QUERY_RESULT>({ query: TESTIMONIALS_QUERY });
}

export async function getFaqs(): Promise<FAQS_QUERY_RESULT> {
  return sanityFetch<FAQS_QUERY_RESULT>({ query: FAQS_QUERY });
}

export async function getPrimaryFaqs(): Promise<FAQS_QUERY_RESULT> {
  const faqs = await getFaqs();
  return faqs.filter((faq) => faq.category !== "interview");
}

export async function getInterviewFaqs(): Promise<FAQS_QUERY_RESULT> {
  const faqs = await getFaqs();
  return faqs.filter((faq) => faq.category === "interview");
}

export async function getEstateSales(): Promise<ESTATE_SALES_QUERY_RESULT> {
  return sanityFetch<ESTATE_SALES_QUERY_RESULT>({ query: ESTATE_SALES_QUERY });
}

export async function getCleanoutProjects(): Promise<CLEANOUT_PROJECTS_QUERY_RESULT> {
  return sanityFetch<CLEANOUT_PROJECTS_QUERY_RESULT>({
    query: CLEANOUT_PROJECTS_QUERY,
  });
}

export async function getCleanoutProjectBySlug(
  slug: string,
): Promise<CLEANOUT_PROJECT_BY_SLUG_QUERY_RESULT> {
  return sanityFetch<CLEANOUT_PROJECT_BY_SLUG_QUERY_RESULT>({
    query: CLEANOUT_PROJECT_BY_SLUG_QUERY,
    params: { slug },
  });
}
