import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  return ["", "/about", "/services", "/estate-sales", "/clean-outs", "/faq", "/testimonials", "/contact"].map(
    (path) => ({ url: `${siteUrl}${path}`, changeFrequency: "monthly" as const, priority: path === "" ? 1 : 0.8 }),
  );
}
