import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import {
  EXPECTED_COUNTS,
  SERVICE_AREA_CITIES,
  SINGLETON_IDS,
} from "./lib/content-data.js";
import { reportsDir, transformedDir } from "./lib/paths.js";
import type { SanityDoc } from "./lib/sanity-doc.js";

type ValidationIssue = {
  severity: "error" | "warning";
  code: string;
  message: string;
  documentId?: string;
};

type ValidationReport = {
  generatedAt: string;
  valid: boolean;
  summary: {
    totalDocuments: number;
    expectedTotal: number;
    countsByType: Record<string, number>;
    featuredTestimonials: number;
    errors: number;
    warnings: number;
  };
  issues: ValidationIssue[];
};

const REQUIRED: Record<string, string[]> = {
  siteSettings: ["businessName", "shortName", "phone", "email"],
  homePage: ["heroHeading", "processSteps"],
  aboutPage: ["heroHeading", "storyBody"],
  contactPage: ["heroHeading"],
  service: ["title", "slug", "category"],
  testimonial: ["quote", "name"],
  faq: ["question", "answer", "category"],
};

function loadDocuments(): SanityDoc[] {
  const path = join(transformedDir, "documents.json");
  return JSON.parse(readFileSync(path, "utf8")) as SanityDoc[];
}

function validateDocuments(docs: SanityDoc[]): ValidationReport {
  const issues: ValidationIssue[] = [];
  const countsByType: Record<string, number> = {};

  for (const doc of docs) {
    countsByType[doc._type] = (countsByType[doc._type] ?? 0) + 1;

    if (!doc._id || !doc._type) {
      issues.push({
        severity: "error",
        code: "missing-id-or-type",
        message: "Document missing _id or _type",
        documentId: String(doc._id ?? "(none)"),
      });
      continue;
    }

    const required = REQUIRED[doc._type] ?? [];
    for (const field of required) {
      const value = doc[field];
      if (value === undefined || value === null || value === "") {
        issues.push({
          severity: "error",
          code: "missing-required-field",
          message: `Missing required field "${field}" on ${doc._type}`,
          documentId: doc._id,
        });
      }
    }

    if (doc._type === "service") {
      const slug = doc.slug as { current?: string } | undefined;
      if (!slug?.current) {
        issues.push({
          severity: "error",
          code: "missing-slug",
          message: "Service missing slug.current",
          documentId: doc._id,
        });
      }
    }
  }

  const ids = new Set(docs.map((d) => d._id));
  for (const singletonId of SINGLETON_IDS) {
    if (!ids.has(singletonId)) {
      issues.push({
        severity: "error",
        code: "missing-singleton",
        message: `Missing singleton document "${singletonId}"`,
        documentId: singletonId,
      });
    }
  }

  for (const [type, expected] of Object.entries(EXPECTED_COUNTS)) {
    if (type === "total") continue;
    const actual = countsByType[type] ?? 0;
    if (actual !== expected) {
      issues.push({
        severity: "error",
        code: "count-mismatch",
        message: `Expected ${expected} ${type} documents, found ${actual}`,
      });
    }
  }

  if (docs.length !== EXPECTED_COUNTS.total) {
    issues.push({
      severity: "error",
      code: "total-count-mismatch",
      message: `Expected ${EXPECTED_COUNTS.total} total documents, found ${docs.length}`,
    });
  }

  const siteSettings = docs.find((d) => d._id === "siteSettings");
  if (siteSettings) {
    const cities = siteSettings.serviceAreaCities as string[] | undefined;
    if (!cities || cities.length < SERVICE_AREA_CITIES.length) {
      issues.push({
        severity: "error",
        code: "service-area-cities",
        message: "siteSettings.serviceAreaCities incomplete",
        documentId: "siteSettings",
      });
    }
  }

  const featured = docs.filter(
    (d) => d._type === "testimonial" && d.featured === true,
  ).length;
  if (featured < 3 || featured > 4) {
    issues.push({
      severity: "warning",
      code: "featured-testimonials",
      message: `Expected 3–4 featured testimonials, found ${featured}`,
    });
  }

  const faqItems = docs.filter((d) => d._type === "faq");
  const interviewIds = faqItems
    .filter((d) => d.category === "interview")
    .map((d) => d.legacyId);
  if (interviewIds.includes("interview-3")) {
    issues.push({
      severity: "error",
      code: "retired-faq",
      message: "Interview FAQ Q3 (website) should be omitted",
    });
  }

  const gunsMention = faqItems.some(
    (d) =>
      typeof d.answer === "string" &&
      /\bguns\b/i.test(d.answer),
  );
  if (gunsMention) {
    issues.push({
      severity: "warning",
      code: "guns-mention",
      message: "FAQ answer still mentions guns (needs-owner-review)",
    });
  }

  const errors = issues.filter((i) => i.severity === "error").length;
  const warnings = issues.filter((i) => i.severity === "warning").length;

  return {
    generatedAt: new Date().toISOString(),
    valid: errors === 0,
    summary: {
      totalDocuments: docs.length,
      expectedTotal: EXPECTED_COUNTS.total,
      countsByType,
      featuredTestimonials: featured,
      errors,
      warnings,
    },
    issues,
  };
}

function main() {
  const docs = loadDocuments();
  const report = validateDocuments(docs);

  mkdirSync(reportsDir, { recursive: true });
  const reportPath = join(reportsDir, "validation.json");
  writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");

  console.log(`Validation ${report.valid ? "PASSED" : "FAILED"}`);
  console.log(`  Documents: ${report.summary.totalDocuments}`);
  console.log(`  By type: ${JSON.stringify(report.summary.countsByType)}`);
  console.log(`  Featured testimonials: ${report.summary.featuredTestimonials}`);
  console.log(`  Errors: ${report.summary.errors}, Warnings: ${report.summary.warnings}`);
  console.log(`  Report: ${reportPath}`);

  if (!report.valid) {
    for (const issue of report.issues.filter((i) => i.severity === "error")) {
      console.error(`  ERROR [${issue.code}]: ${issue.message}`);
    }
    process.exit(1);
  }
}

main();
