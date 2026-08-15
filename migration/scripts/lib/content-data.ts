import { existsSync } from "node:fs";
import { join } from "node:path";
import {
  block,
  processStep,
  slugField,
  valueItem,
  type SanityDoc,
} from "./sanity-doc.js";
import { repoRoot } from "./paths.js";

export const SERVICE_AREA_CITIES = [
  "Fairview Park",
  "Rocky River",
  "Westlake",
  "Avon",
  "Avon Lake",
  "Lakewood",
  "North Olmsted",
  "Strongsville",
  "Seven Hills",
  "North Royalton",
  "Parma",
  "Independence",
  "North Ridgeville",
  "Elyria",
  "Cleveland",
  "Brooklyn",
  "Parma Heights",
  "Middleburg Heights",
  "All other Northeast Ohio suburbs",
];

const vikingCatPath = join(repoRoot, "public/images/viking-cat.jpg");
const vikingCatAsset = existsSync(vikingCatPath)
  ? {
      _type: "image",
      _sanityAsset: `image@file://${vikingCatPath}`,
    }
  : undefined;

export function buildDocuments(): SanityDoc[] {
  const docs: SanityDoc[] = [];

  docs.push({
    _id: "siteSettings",
    _type: "siteSettings",
    businessName: "Hansen McDowell Estate Sales",
    shortName: "Hansen McDowell",
    phone: "440-669-9665",
    email: "hansenmcdowell@yahoo.com",
    serviceArea: "Greater Cleveland & Northeast Ohio",
    serviceAreaCities: SERVICE_AREA_CITIES,
    license: "Ohio license #2022000139",
    auctionUrl: "https://greatfindsauction.com",
    facebookUrl:
      "https://www.facebook.com/Hansen-McDowell-Estate-Sales-118037206261422/",
    instagramUrl: "https://www.instagram.com/hansenmcdowellestatesales/",
    contactName: "Lynn D. Hansen",
    settlementNote:
      "Net proceeds are paid within 3 days after sale pickup, once buyer pickup is complete.",
    ...(vikingCatAsset ? { brandMark: { ...vikingCatAsset, alt: "Viking Cat mascot" } } : {}),
    defaultSeo: {
      seoTitle: "Hansen McDowell Estate Sales | Greater Cleveland",
      seoDescription:
        "Family-owned online estate auctions and complete home clean-outs throughout Greater Cleveland and Northeast Ohio. Licensed, bonded, 30+ years of experience.",
    },
  });

  docs.push({
    _id: "homePage",
    _type: "homePage",
    heroEyebrow: "Estate sales · Clean-outs · Northeast Ohio",
    heroHeading: "Experience that brings clarity to life's transitions.",
    heroIntroduction:
      "A family-owned team handling online estate auctions and complete home clean-outs with care, transparency, and more than 30 years of experience.",
    heroProofPoints: [
      "Family owned & operated",
      "Licensed & bonded",
      "Full-service support",
    ],
    introEyebrow: "A steady hand, start to finish",
    introHeading: "The home holds a lifetime. We handle what comes next.",
    introBody:
      "Whether you are settling an estate, downsizing, or preparing a property for sale, the details can feel overwhelming. Hansen McDowell brings the knowledge, organization, and compassion to make the process manageable.",
    processEyebrow: "A thoughtful process",
    processHeading: "You don't need to have it figured out.",
    processIntro:
      "We meet you where you are, explain every step, and keep you informed without adding more to your plate.",
    processSteps: [
      processStep(
        "Start with a conversation",
        "Tell us about the property, circumstances, and timeline.",
        1,
      ),
      processStep(
        "Walk through the home",
        "We assess the full contents—even the attic and crawlspace.",
        2,
      ),
      processStep(
        "Choose the right plan",
        "We recommend an auction, clean-out, or a coordinated combination.",
        3,
      ),
      processStep(
        "Leave the details to us",
        "Our team organizes, researches, sells, and clears the way forward.",
        4,
      ),
    ],
    integrityEyebrow: "Integrity is the foundation",
    integrityHeading: "Professional expertise, with the care of family.",
    integrityBody:
      "Hansen McDowell grew from the Hansen family's Lakewood antique shop, The Antique Corner. Today, Lynn Hansen, Doug McDowell, and their son Hans continue that legacy across Greater Cleveland.",
    integrityQuote:
      "We felt that they respected our dad's home, his belongings, and the difficult process of this transition.",
    integrityQuoteAttribution: "Stacey, client",
    auctionBandEyebrow: "Looking for current sales?",
    auctionBandHeading: "See what's coming up for auction.",
    seo: {
      seoTitle: "Hansen McDowell Estate Sales",
      seoDescription:
        "Online estate auctions and complete home clean-outs in Greater Cleveland. Family owned, licensed, and bonded with 30+ years of experience.",
    },
  });

  docs.push({
    _id: "aboutPage",
    _type: "aboutPage",
    heroEyebrow: "Our story",
    heroHeading: "Family knowledge, carried forward.",
    heroIntroduction:
      "Three generations of experience in antiques, personal property, and the often-emotional work of helping families close one chapter and begin another.",
    storyEyebrow: "From The Antique Corner to today",
    storyHeading: "It started with a family antique shop in Lakewood.",
    storyBody: [
      block(
        "Lynn Hansen and her husband Doug McDowell began in the business alongside Lynn's parents, Diana and Roger Hansen, at The Antique Corner. That hands-on education built an instinct for value that can't be learned from a price guide alone.",
      ),
      block(
        "The business has since grown to include their son Hans. Together, they serve families throughout Greater Cleveland with online estate auctions, household liquidation, and complete home clean-outs.",
      ),
    ],
    valuesEyebrow: "What guides the work",
    valuesHeading: "Integrity isn't a slogan. It's how every home is handled.",
    values: [
      valueItem(
        "Clear communication",
        "You'll understand the recommendation, the process, and what happens next.",
        1,
      ),
      valueItem(
        "Respect for the home",
        "Access is supervised and belongings are handled with care from walkthrough to pickup.",
        2,
      ),
      valueItem(
        "Knowledge that earns value",
        "Research, market awareness, and years of collecting experience inform every auction.",
        3,
      ),
      valueItem(
        "Follow-through",
        "The team stays involved until the agreed work is complete and the property is ready.",
        4,
      ),
    ],
    credentialsEyebrow: "Professional standards",
    credentialsHeading: "Protection and accountability matter.",
    credentials: [
      valueItem(
        "Licensed and bonded",
        "Licensed and bonded in favor of the State of Ohio.",
        1,
      ),
      valueItem(
        "30+ years of experience",
        "More than three decades of family experience in antiques and estate liquidation.",
        2,
      ),
      valueItem(
        "Current market research",
        "Research and pricing informed by current resale markets and collecting background.",
        3,
      ),
      valueItem(
        "Full-service capabilities",
        "Online estate auctions, household liquidation, and complete home clean-outs.",
        4,
      ),
    ],
    seo: {
      seoTitle: "About Hansen McDowell Estate Sales",
      seoDescription:
        "Meet the family behind Hansen McDowell Estate Sales and learn about more than 30 years of experience in antiques and estate liquidation.",
    },
  });

  docs.push({
    _id: "contactPage",
    _type: "contactPage",
    heroEyebrow: "Start a conversation",
    heroHeading: "Tell us what's ahead. We'll help you find the next step.",
    heroIntroduction:
      "You don't need to sort the home or know which service you need. Share a little about the property and timeline, and Lynn will follow up.",
    directContactHeading: "Talk with Lynn.",
    directContactNote:
      "Please don't discard or organize items before the initial walkthrough. What looks ordinary may still have value.",
    formHeading: "How can we help?",
    formIntro: "Request a confidential consultation for an estate sale or home clean-out.",
    seo: {
      seoTitle: "Contact Hansen McDowell Estate Sales",
      seoDescription:
        "Request a confidential estate sale or home clean-out consultation with Hansen McDowell in Greater Cleveland.",
    },
  });

  docs.push({
    _id: "service-estate-sales",
    _type: "service",
    title: "Online estate auctions",
    slug: slugField("estate-sales"),
    eyebrow: "Estate & household liquidation",
    category: "estate-sales",
    order: 1,
    summary:
      "A thoughtful, full-service way to sell the contents of a home while reaching serious buyers online.",
    description:
      "We assess the home and its contents—including attics and crawlspaces—organize and research items, photograph every sale, advertise to buyers, coordinate pickup, and settle net proceeds within 3 days after pickup.",
    features: [
      "Thorough whole-home assessment, including attics and crawlspaces",
      "Organization, research, and careful photography",
      "Online marketing and auction administration",
      "Managed buyer pickup and settlement of net proceeds",
    ],
    heroEyebrow: "Online estate auctions",
    heroHeading: "Your family's things deserve a thoughtful market.",
    heroIntroduction:
      "We turn a home's contents into a carefully researched, photographed, and marketed online auction—designed to reach buyers while reducing the burden on your family.",
    processSteps: [
      processStep(
        "Consultation",
        "We walk through the home, listen to your goals, and assess the contents.",
        1,
      ),
      processStep(
        "Preparation",
        "Items are organized, researched, photographed, and arranged into auction lots.",
        2,
      ),
      processStep(
        "Online auction",
        "The sale is marketed and bidding takes place online over a defined period.",
        3,
      ),
      processStep(
        "Pickup & settlement",
        "We coordinate local pickup and pay net proceeds within 3 days after pickup.",
        4,
      ),
    ],
    seo: {
      seoTitle: "Estate Sales & Online Auctions | Hansen McDowell",
      seoDescription:
        "Full-service online estate and household liquidation in Greater Cleveland, including research, photography, advertising, and pickup coordination.",
    },
  });

  docs.push({
    _id: "service-clean-outs",
    _type: "service",
    title: "Complete home clean-outs",
    slug: slugField("clean-outs"),
    eyebrow: "A clear next step",
    category: "clean-outs",
    order: 2,
    summary:
      "From remaining furniture to everyday household items, we help leave the property ready for what comes next.",
    description:
      "Clean-out services can follow an auction or stand on their own. Every project begins with a walkthrough and a clear, property-specific quote.",
    features: [
      "Available after an auction or as a separate service",
      "Property-specific scope and clear quote",
      "Supervised access and respectful handling",
      "Broom-clean condition when agreed",
    ],
    heroEyebrow: "Complete home clean-outs",
    heroHeading: "From a full house to a clear next step.",
    heroIntroduction:
      "When a property needs to be emptied, our supervised team handles the remaining work carefully and efficiently—whether or not we managed the estate auction.",
    processSteps: [
      processStep(
        "After an estate auction",
        "Clear remaining items so the property is ready for sale, transfer, or renovation.",
        1,
      ),
      processStep(
        "Downsizing or relocation",
        "Help reduce the physical burden when a household is moving to a smaller home.",
        2,
      ),
      processStep(
        "Standalone clean-outs",
        "A direct solution when an auction is not the right fit for the home's contents.",
        3,
      ),
    ],
    seo: {
      seoTitle: "Home Clean-Outs | Hansen McDowell",
      seoDescription:
        "Respectful, complete home clean-out services in Greater Cleveland, available after an estate auction or as a standalone service.",
    },
  });

  docs.push(...buildTestimonials());
  docs.push(...buildFaqs());

  return docs;
}

function buildTestimonials(): SanityDoc[] {
  const items: Array<{
    id: string;
    legacyId: string;
    name: string;
    role: string;
    quote: string;
    featured?: boolean;
    order: number;
  }> = [
    {
      id: "testimonial-01-tim-ali",
      legacyId: "1",
      name: "Tim Ali",
      role: "Tim Ali Realty",
      quote:
        "The reasons I hired Hansen McDowell were trust, professionalism, and the ability to do a clean-out. When asked if I would recommend them, my answer was: Yes, very thorough and thoughtful.",
      order: 1,
    },
    {
      id: "testimonial-02-aileen-fitzgerald",
      legacyId: "2",
      name: "Aileen FitzGerald",
      role: "Howard Hanna",
      quote:
        "Lynn Hansen has done a fantastic job for my clients on more than one occasion. I can highly recommend her.",
      featured: true,
      order: 2,
    },
    {
      id: "testimonial-03-mary-ellen-branson",
      legacyId: "3",
      name: "Mary Ellen Branson",
      role: "Client",
      quote:
        "We couldn't have done it without the help of Lynn Hansen and her associates. Living out of state, we were unable to manage the sale and final clean-out ourselves. Everything was taken care of: furniture removed, garbage removed, and the house was left broom clean. Lynn made herself available, answered our questions, and responded to calls and texts very promptly.",
      order: 3,
    },
    {
      id: "testimonial-04-joe-cardi",
      legacyId: "4",
      name: "Joe Cardi",
      role: "Client",
      quote:
        "They handled all aspects of the sale and made the whole process easy for our family. Lynn and Doug were on top of all details of the sale. They made a tough, long process much easier.",
      featured: true,
      order: 4,
    },
    {
      id: "testimonial-05-amy",
      legacyId: "5",
      name: "Amy",
      role: "Client",
      quote:
        "Clearing out my parent's home was an emotional task and they made it easier for me to get the process done. They were very kind, friendly, and understanding of what I was going through. They have a great team that gets the job done in a timely and efficient manner.",
      order: 5,
    },
    {
      id: "testimonial-06-david-linville",
      legacyId: "6",
      name: "David Linville",
      role: "Client",
      quote:
        "Lynn always gave me updated information on what was being done. Lynn and her crew are always professional and very knowledgeable with pricing. They spent numerous hours preparing for the sale and managed the days of the sale without a flaw.",
      order: 6,
    },
    {
      id: "testimonial-07-cindy-mate",
      legacyId: "7",
      name: "Cindy Mate",
      role: "Client",
      quote:
        "Professionalism, ability to do a clean-out, trust, and a recommendation. Lynn and Doug are very professional and they're an awesome team.",
      order: 7,
    },
    {
      id: "testimonial-08-jane-vitou",
      legacyId: "8",
      name: "Jane Vitou, ABR",
      role: "Keller Williams Greater Cleveland West",
      quote:
        "I have known Lynn Hansen for years, first as a Realtor and later as the owner of an estate sale company. Lynn is a professional through and through. Her professional demeanor, combined with her compassionate nature, makes for a great combination. The process of clearing out a house is challenging and often emotional. Lynn handles all challenges well.",
      order: 8,
    },
    {
      id: "testimonial-09-rachele-glynias",
      legacyId: "9",
      name: "Rachele Glynias",
      role: "Howard Hanna",
      quote:
        "Your service was impeccable. From start to finish, you were professional, punctual, knowledgeable, and did everything you stated and more. The clean-out was very thorough making my job much easier. I prefer someone trustworthy that I do not need to handhold—you were superior, a self-starter, and extremely hands-on with communication.",
      order: 9,
    },
    {
      id: "testimonial-10-unnamed",
      legacyId: "10",
      name: "Client",
      role: "Client",
      quote:
        "They made the sale easier for me by providing ease of contact and the customers were happy. Trust and professionalism made the difference.",
      order: 10,
    },
    {
      id: "testimonial-11-maureen",
      legacyId: "11",
      name: "Maureen",
      role: "Client",
      quote:
        "Professional, trustworthy, knowledgeable—you couldn't ask for anything else. Lynn made this difficult experience easier. Her compassion helped us feel better about the whole process. Because we live in a different state, Lynn conducted the entire sale and clean-out without our direct involvement.",
      featured: true,
      order: 11,
    },
    {
      id: "testimonial-12-jerry-skoch",
      legacyId: "12",
      name: "Jerry Skoch",
      role: "Client",
      quote:
        "When they completed their work the house was immaculate and ready to turnover to the buyers. No hassles and complete integrity.",
      order: 12,
    },
    {
      id: "testimonial-13-sandie",
      legacyId: "13",
      name: "Sandie",
      role: "Client",
      quote:
        "I was really stressed as to how to handle my parent's estate and how to move forward. Thank you for your kindness and expertise. Totally satisfied. Rock on!!",
      order: 13,
    },
    {
      id: "testimonial-14-kathy-baker",
      legacyId: "14",
      name: "Kathy Baker",
      role: "Client",
      quote:
        "They kept me informed of any issues and handled all the problems tactfully. Downsizing your family's heirlooms is a sad process and they treated my parents' home with care and respect.",
      order: 14,
    },
    {
      id: "testimonial-15-chuck-strejnowski",
      legacyId: "15",
      name: "Chuck Strejnowski",
      role: "Client",
      quote:
        "They knew exactly what to do, they were very organized and communicated with me on a daily and weekly basis. They took all the pressure off of me and handled everything in a timely basis. Honest and very pleasant to work with during this time.",
      order: 15,
    },
    {
      id: "testimonial-16-rosalie-artino",
      legacyId: "16",
      name: "Rosalie Artino",
      role: "Client",
      quote:
        "They were the best. So organized. They turned a stressful situation into a smooth process. I would recommend Hansen McDowell to anyone.",
      order: 16,
    },
    {
      id: "testimonial-17-stacey",
      legacyId: "17",
      name: "Stacey",
      role: "Client",
      quote:
        "We felt that they respected our Dad's home, his belongings, and the difficult process of this transition. We trusted them and they delivered exactly as promised. I liked the brief but respectful updates along the way, and your clear communication.",
      featured: true,
      order: 17,
    },
    {
      id: "testimonial-18-kathy-moenich",
      legacyId: "18",
      name: "Kathy Moenich",
      role: "Client",
      quote:
        "They did everything. I didn't need to be there. Lynn kept me updated regularly. They were very professional, also very kind and respectful during my time of grief. They were very flexible and worked with me and my schedule and needs.",
      order: 18,
    },
  ];

  return items.map(({ id, legacyId, name, role, quote, featured, order }) => ({
    _id: id,
    _type: "testimonial",
    legacyId,
    name,
    role,
    quote,
    featured: featured ?? false,
    order,
  }));
}

function buildFaqs(): SanityDoc[] {
  const primary: Array<{
    id: string;
    legacyId: string;
    question: string;
    answer: string;
    order: number;
  }> = [
    {
      id: "faq-primary-1",
      legacyId: "primary-1",
      order: 1,
      question: "Who is best served by an estate sale?",
      answer:
        "Estate and household liquidation can help when a home needs to be emptied because of a death, divorce, downsizing, relocation, or foreclosure. We begin with a conversation about the property, timeline, and the family's priorities.",
    },
    {
      id: "faq-primary-2",
      legacyId: "primary-2",
      order: 2,
      question: "What items can be sold?",
      answer:
        "Nearly anything found in a home may have a buyer: furniture, appliances, antiques, collectibles, tools, jewelry, glassware, linens, holiday items, kitchenware, clothing, coins, vehicles, and more. We assess the full picture before making recommendations.",
    },
    {
      id: "faq-primary-3",
      legacyId: "primary-3",
      order: 3,
      question: "What does it cost to have a sale?",
      answer:
        "There is no out-of-pocket cost to conduct the auction. Hansen McDowell's work is paid through an agreed commission, which covers advertising, supplies, time, and expertise. Any separate clean-out work is quoted for the specific property.",
    },
    {
      id: "faq-primary-4",
      legacyId: "primary-4",
      order: 4,
      question: "What should I do before the first walkthrough?",
      answer:
        "Please do not throw things away or organize the home before the consultation. Items that look ordinary can still have value, and seeing the property as it is helps us recommend the right plan.",
    },
  ];

  const interview: Array<{
    id: string;
    legacyId: string;
    question: string;
    answer: string;
    order: number;
  }> = [
    {
      id: "faq-interview-1",
      legacyId: "interview-1",
      order: 10,
      question: "Are you licensed, bonded, and insured?",
      answer:
        "If not, what protections are in place for the homeowner or estate? Hansen McDowell is licensed and bonded in favor of the State of Ohio. License #2022000139.",
    },
    {
      id: "faq-interview-2",
      legacyId: "interview-2",
      order: 11,
      question: "Are you a certified personal property appraiser?",
      answer:
        "Ask whether the liquidator holds relevant appraisal credentials and how that informs pricing and research for your sale.",
    },
    {
      id: "faq-interview-4",
      legacyId: "interview-4",
      order: 13,
      question: "Do you have current references?",
      answer: "May I have three? Speaking with recent clients is an important part of choosing a liquidator.",
    },
    {
      id: "faq-interview-5",
      legacyId: "interview-5",
      order: 14,
      question:
        "Who will have access to my home during the sale process and clean-out?",
      answer:
        "Will the liquidator always be on site to provide access, supervise, and ensure the security of the property? If not, who will they assign these tasks and responsibilities to?",
    },
    {
      id: "faq-interview-6",
      legacyId: "interview-6",
      order: 15,
      question: "After the sale, what happens to unsold items?",
      answer:
        "Does the liquidator now own them to sell or dispose of at their discretion—and profit?",
    },
    {
      id: "faq-interview-7",
      legacyId: "interview-7",
      order: 16,
      question: "Do you charge a minimum or guaranteed commission?",
      answer:
        "It should never cost you anything out of pocket to have a sale. If there is not enough value to conduct a sale and perform a clean-out while still netting you a profit, there are other options available to you.",
    },
    {
      id: "faq-interview-8",
      legacyId: "interview-8",
      order: 17,
      question: "Do you have a retail location or outlet?",
      answer: "Is that a conflict of interest?",
    },
  ];

  return [
    ...primary.map(({ id, legacyId, question, answer, order }) => ({
      _id: id,
      _type: "faq",
      category: "primary",
      legacyId,
      question,
      answer,
      order,
    })),
    ...interview.map(({ id, legacyId, question, answer, order }) => ({
      _id: id,
      _type: "faq",
      category: "interview",
      legacyId,
      question,
      answer,
      order,
    })),
  ];
}

export const EXPECTED_COUNTS = {
  total: 35,
  siteSettings: 1,
  homePage: 1,
  aboutPage: 1,
  contactPage: 1,
  service: 2,
  testimonial: 18,
  faq: 11,
} as const;

export const SINGLETON_IDS = [
  "siteSettings",
  "homePage",
  "aboutPage",
  "contactPage",
] as const;
