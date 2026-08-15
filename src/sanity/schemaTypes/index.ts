import { aboutPage } from "./aboutPage";
import { cleanoutProject } from "./cleanoutProject";
import { contactPage } from "./contactPage";
import { estateSale } from "./estateSale";
import { faq } from "./faq";
import { homePage } from "./homePage";
import { ctaLink } from "./objects/ctaLink";
import { imageWithAlt } from "./objects/imageWithAlt";
import { processStep } from "./objects/processStep";
import { projectPhoto } from "./objects/projectPhoto";
import { seoFields } from "./objects/seoFields";
import { valueItem } from "./objects/valueItem";
import { page } from "./page";
import { service } from "./service";
import { siteSettings } from "./siteSettings";
import { testimonial } from "./testimonial";

export const schemaTypes = [
  // Objects
  seoFields,
  imageWithAlt,
  ctaLink,
  processStep,
  projectPhoto,
  valueItem,
  // Singletons
  siteSettings,
  homePage,
  aboutPage,
  contactPage,
  // Documents
  service,
  estateSale,
  cleanoutProject,
  testimonial,
  faq,
  // Deprecated
  page,
];
