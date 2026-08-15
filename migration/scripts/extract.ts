/**
 * Extraction snapshots live in migration/extracted/ (gitignored).
 *
 * Agent A fetched all 7 legacy Blogger pages on 2026-08-11. Re-fetch only if
 * snapshots are missing or you need to refresh legacy HTML:
 *
 *   npx tsx migration/scripts/extract.ts
 *
 * Source URLs are listed in migration/inventory.md.
 */

import { mkdirSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { extractedDir } from "./lib/paths.js";

const SNAPSHOTS: Array<{ file: string; url: string }> = [
  { file: "home.html", url: "https://hansenmcdowell.blogspot.com/" },
  {
    file: "home-2016-post.html",
    url: "https://hansenmcdowell.blogspot.com/2016/02/home_58.html",
  },
  {
    file: "services.html",
    url: "http://hansenmcdowell.blogspot.com/p/our-services.html",
  },
  { file: "faq.html", url: "http://hansenmcdowell.blogspot.com/p/faq.html" },
  {
    file: "testimonials.html",
    url: "http://hansenmcdowell.blogspot.com/p/testimonials.html",
  },
  {
    file: "contact-us.html",
    url: "http://hansenmcdowell.blogspot.com/p/contact-us.html",
  },
  {
    file: "online-auctions.html",
    url: "https://hansenmcdowell.blogspot.com/p/online-aucti.html",
  },
];

async function fetchSnapshot({ file, url }: (typeof SNAPSHOTS)[number]) {
  const dest = join(extractedDir, file);
  if (existsSync(dest)) {
    console.log(`skip ${file} (already exists)`);
    return;
  }

  console.log(`fetch ${url} -> ${file}`);
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}: ${res.status} ${res.statusText}`);
  }
  const html = await res.text();
  mkdirSync(extractedDir, { recursive: true });
  writeFileSync(dest, html, "utf8");
}

async function main() {
  const missing = SNAPSHOTS.filter(
    ({ file }) => !existsSync(join(extractedDir, file)),
  );

  if (missing.length === 0) {
    console.log(
      "All snapshots present in migration/extracted/. Nothing to fetch.",
    );
    return;
  }

  for (const snapshot of missing) {
    await fetchSnapshot(snapshot);
  }

  console.log("Extraction complete.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
