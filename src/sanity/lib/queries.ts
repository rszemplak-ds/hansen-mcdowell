import { defineQuery } from "next-sanity";

const imageWithAltProjection = /* groq */ `{
  alt,
  hotspot,
  crop,
  "url": asset->url,
  "assetId": asset->_id
}`;

const seoProjection = /* groq */ `{
  seoTitle,
  seoDescription
}`;

const processStepProjection = /* groq */ `{
  _key,
  title,
  body,
  order
}`;

const valueItemProjection = /* groq */ `{
  _key,
  title,
  body,
  order
}`;

const projectPhotoProjection = /* groq */ `{
  _key,
  stage,
  caption,
  alt,
  "image": image{
    hotspot,
    crop,
    "url": asset->url,
    "assetId": asset->_id
  }
}`;

export const SITE_SETTINGS_QUERY = defineQuery(/* groq */ `
  *[_type == "siteSettings"][0]{
    businessName,
    shortName,
    phone,
    email,
    serviceArea,
    serviceAreaCities,
    license,
    auctionUrl,
    facebookUrl,
    instagramUrl,
    twitterUrl,
    contactName,
    settlementNote,
    brandMark ${imageWithAltProjection},
    logo ${imageWithAltProjection},
    defaultSeo ${seoProjection}
  }
`);

export const HOME_PAGE_QUERY = defineQuery(/* groq */ `
  *[_type == "homePage"][0]{
    heroEyebrow,
    heroHeading,
    heroIntroduction,
    heroProofPoints,
    introEyebrow,
    introHeading,
    introBody,
    processEyebrow,
    processHeading,
    processIntro,
    processSteps[] ${processStepProjection},
    integrityEyebrow,
    integrityHeading,
    integrityBody,
    integrityQuote,
    integrityQuoteAttribution,
    auctionBandEyebrow,
    auctionBandHeading,
    seo ${seoProjection}
  }
`);

export const ABOUT_PAGE_QUERY = defineQuery(/* groq */ `
  *[_type == "aboutPage"][0]{
    heroEyebrow,
    heroHeading,
    heroIntroduction,
    storyEyebrow,
    storyHeading,
    storyBody,
    valuesEyebrow,
    valuesHeading,
    values[] ${valueItemProjection},
    credentialsEyebrow,
    credentialsHeading,
    credentials[] ${valueItemProjection},
    seo ${seoProjection}
  }
`);

export const CONTACT_PAGE_QUERY = defineQuery(/* groq */ `
  *[_type == "contactPage"][0]{
    heroEyebrow,
    heroHeading,
    heroIntroduction,
    directContactHeading,
    directContactNote,
    formHeading,
    formIntro,
    seo ${seoProjection}
  }
`);

export const SERVICES_QUERY = defineQuery(/* groq */ `
  *[_type == "service"] | order(order asc){
    _id,
    title,
    "slug": slug.current,
    eyebrow,
    summary,
    description,
    image ${imageWithAltProjection},
    features,
    order,
    heroEyebrow,
    heroHeading,
    heroIntroduction,
    processSteps[] ${processStepProjection},
    seo ${seoProjection},
    category
  }
`);

export const SERVICE_BY_SLUG_QUERY = defineQuery(/* groq */ `
  *[_type == "service" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    eyebrow,
    summary,
    description,
    image ${imageWithAltProjection},
    features,
    order,
    heroEyebrow,
    heroHeading,
    heroIntroduction,
    processSteps[] ${processStepProjection},
    seo ${seoProjection},
    category
  }
`);

export const TESTIMONIALS_QUERY = defineQuery(/* groq */ `
  *[_type == "testimonial"] | order(order asc){
    _id,
    quote,
    name,
    role,
    featured,
    order,
    legacyId
  }
`);

export const FAQS_QUERY = defineQuery(/* groq */ `
  *[_type == "faq"] | order(order asc){
    _id,
    question,
    answer,
    order,
    category,
    legacyId
  }
`);

export const ESTATE_SALES_QUERY = defineQuery(/* groq */ `
  *[_type == "estateSale" && status == "published"] | order(biddingEnds asc){
    _id,
    title,
    city,
    status,
    biddingStarts,
    biddingEnds,
    pickup,
    summary,
    auctionUrl,
    "featuredImage": featuredImage{
      hotspot,
      crop,
      "url": asset->url,
      "assetId": asset->_id
    },
    gallery[]{
      _key,
      hotspot,
      crop,
      "url": asset->url,
      "assetId": asset->_id
    },
    legacyId,
    legacyUrl
  }
`);

export const CLEANOUT_PROJECTS_QUERY = defineQuery(/* groq */ `
  *[_type == "cleanoutProject" && coalesce(published, true) == true] | order(order asc, completedAt desc){
    _id,
    title,
    "slug": slug.current,
    location,
    description,
    order,
    published,
    "photoCount": count(gallery[defined(image.asset)]),
    "beforeImage": beforeImage{
      alt,
      hotspot,
      crop,
      "url": asset->url,
      "assetId": asset->_id
    },
    "afterImage": afterImage{
      alt,
      hotspot,
      crop,
      "url": asset->url,
      "assetId": asset->_id
    },
    completedAt
  }
`);

export const CLEANOUT_PROJECT_BY_SLUG_QUERY = defineQuery(/* groq */ `
  *[_type == "cleanoutProject" && slug.current == $slug && coalesce(published, true) == true][0]{
    _id,
    title,
    "slug": slug.current,
    location,
    description,
    completedAt,
    "beforeImage": beforeImage{
      alt,
      hotspot,
      crop,
      "url": asset->url,
      "assetId": asset->_id
    },
    "afterImage": afterImage{
      alt,
      hotspot,
      crop,
      "url": asset->url,
      "assetId": asset->_id
    },
    "gallery": gallery[defined(image.asset)] ${projectPhotoProjection}
  }
`);
