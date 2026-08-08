import { createClient } from "next-sanity";

export type SiteSettings = {
  businessName: string;
  shortName: string;
  phone: string;
  email: string;
  serviceArea: string;
  license: string;
  auctionUrl: string;
  facebookUrl: string;
};

export type Service = {
  title: string;
  slug: string;
  eyebrow: string;
  summary: string;
  description: string;
  imageUrl: string;
  features: string[];
};

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

export type Faq = {
  question: string;
  answer: string;
};

export type EstateSale = {
  title: string;
  city: string;
  biddingStarts?: string;
  biddingEnds?: string;
  pickup?: string;
  summary: string;
  auctionUrl?: string;
  imageUrl?: string;
};

export type CleanoutProject = {
  title: string;
  location?: string;
  description: string;
  beforeImageUrl: string;
  afterImageUrl: string;
};

export const settingsFallback: SiteSettings = {
  businessName: "Hansen McDowell Estate Sales",
  shortName: "Hansen McDowell",
  phone: "440-669-9665",
  email: "hansenmcdowell@yahoo.com",
  serviceArea: "Greater Cleveland & Northeast Ohio",
  license: "Ohio license #2022000139",
  auctionUrl: "https://vikingcatauctions.com",
  facebookUrl: "https://www.facebook.com/",
};

export const servicesFallback: Service[] = [
  {
    title: "Online estate auctions",
    slug: "estate-sales",
    eyebrow: "Estate & household liquidation",
    summary:
      "A thoughtful, full-service way to sell the contents of a home while reaching serious buyers online.",
    description:
      "We assess the home and its contents, organize and research items, photograph every sale, advertise to buyers, coordinate pickup, and settle net proceeds promptly.",
    imageUrl:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85",
    features: [
      "Whole-home assessment",
      "Research, organization, and photography",
      "Online marketing and auction management",
      "Coordinated buyer pickup",
    ],
  },
  {
    title: "Complete home clean-outs",
    slug: "clean-outs",
    eyebrow: "A clear next step",
    summary:
      "From remaining furniture to everyday household items, we help leave the property ready for what comes next.",
    description:
      "Clean-out services can follow an auction or stand on their own. Every project begins with a walkthrough and a clear, property-specific quote.",
    imageUrl:
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1600&q=85",
    features: [
      "Post-sale clean-outs",
      "Whole-home and household clean-outs",
      "Respectful, supervised access",
      "Broom-clean handoff",
    ],
  },
];

export const testimonialsFallback: Testimonial[] = [
  {
    quote:
      "They handled all aspects of the sale and made the whole process easy for our family. They made a tough, long process much easier.",
    name: "Joe Cardi",
    role: "Client",
  },
  {
    quote:
      "Professional, trustworthy, knowledgeable—you couldn’t ask for anything else. Lynn made this difficult experience easier.",
    name: "Maureen",
    role: "Client",
  },
  {
    quote:
      "Everything was taken care of: furniture removed, garbage removed, and the house was left broom clean.",
    name: "Mary Ellen Branson",
    role: "Client",
  },
  {
    quote:
      "Lynn Hansen has done a fantastic job for my clients on more than one occasion. I can highly recommend her.",
    name: "Aileen FitzGerald",
    role: "Howard Hanna",
  },
];

export const faqsFallback: Faq[] = [
  {
    question: "Who is best served by an estate sale?",
    answer:
      "Estate and household liquidation can help when a home needs to be emptied because of a death, divorce, downsizing, relocation, or foreclosure. We begin with a conversation about the property, timeline, and the family’s priorities.",
  },
  {
    question: "What items can be sold?",
    answer:
      "Nearly anything found in a home may have a buyer: furniture, appliances, antiques, collectibles, tools, jewelry, glassware, linens, holiday items, kitchenware, clothing, coins, vehicles, and more. We assess the full picture before making recommendations.",
  },
  {
    question: "What does it cost to have a sale?",
    answer:
      "There is no out-of-pocket cost to conduct the auction. Hansen McDowell’s work is paid through an agreed commission, which covers advertising, supplies, time, and expertise. Any separate clean-out work is quoted for the specific property.",
  },
  {
    question: "What should I do before the first walkthrough?",
    answer:
      "Please do not throw things away or organize the home before the consultation. Items that look ordinary can still have value, and seeing the property as it is helps us recommend the right plan.",
  },
  {
    question: "What should I ask any liquidator I interview?",
    answer:
      "Ask whether the company is licensed, bonded, and insured; who will have access to the home; how unsold items are handled; whether there is a minimum fee; and whether current references are available.",
  },
];

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-08-08";

const sanityClient = projectId
  ? createClient({ projectId, dataset, apiVersion, useCdn: true })
  : null;

async function fetchSanity<T>(
  query: string,
  fallback: T,
  params: Record<string, unknown> = {},
): Promise<T> {
  if (!sanityClient) return fallback;

  try {
    const value = await sanityClient.fetch<T>(query, params, {
      next: { revalidate: 60 },
    });
    return value ?? fallback;
  } catch {
    return fallback;
  }
}

export function getSiteSettings() {
  return fetchSanity<SiteSettings>(
    `*[_type == "siteSettings"][0]{businessName, shortName, phone, email, serviceArea, license, auctionUrl, facebookUrl}`,
    settingsFallback,
  );
}

export function getServices() {
  return fetchSanity<Service[]>(
    `*[_type == "service"] | order(order asc){title, "slug": slug.current, eyebrow, summary, description, "imageUrl": image.asset->url, features}`,
    servicesFallback,
  );
}

export function getTestimonials() {
  return fetchSanity<Testimonial[]>(
    `*[_type == "testimonial"] | order(order asc){quote, name, role}`,
    testimonialsFallback,
  );
}

export function getFaqs() {
  return fetchSanity<Faq[]>(
    `*[_type == "faq"] | order(order asc){question, answer}`,
    faqsFallback,
  );
}

export function getEstateSales() {
  return fetchSanity<EstateSale[]>(
    `*[_type == "estateSale" && status == "published"] | order(biddingEnds asc){title, city, biddingStarts, biddingEnds, pickup, summary, auctionUrl, "imageUrl": featuredImage.asset->url}`,
    [],
  );
}

export function getCleanoutProjects() {
  return fetchSanity<CleanoutProject[]>(
    `*[_type == "cleanoutProject"] | order(completedAt desc){title, location, description, "beforeImageUrl": beforeImage.asset->url, "afterImageUrl": afterImage.asset->url}`,
    [],
  );
}
