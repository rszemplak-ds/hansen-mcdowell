import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { buildDocuments } from "./lib/content-data.js";
import { transformedDir } from "./lib/paths.js";
import type { SanityDoc } from "./lib/sanity-doc.js";

function writeJson(path: string, data: unknown) {
  writeFileSync(path, `${JSON.stringify(data, null, 2)}\n`, "utf8");
}

function summarize(docs: SanityDoc[]) {
  const counts: Record<string, number> = {};
  for (const doc of docs) {
    counts[doc._type] = (counts[doc._type] ?? 0) + 1;
  }
  return counts;
}

function main() {
  const docs = buildDocuments();
  mkdirSync(transformedDir, { recursive: true });

  writeJson(join(transformedDir, "documents.json"), docs);

  const ndjson = docs.map((doc) => JSON.stringify(doc)).join("\n") + "\n";
  writeFileSync(join(transformedDir, "import.ndjson"), ndjson, "utf8");

  for (const doc of docs) {
    writeJson(join(transformedDir, `${doc._id}.json`), doc);
  }

  const counts = summarize(docs);
  console.log("Transform complete.");
  console.log(`  Total documents: ${docs.length}`);
  console.log(`  By type: ${JSON.stringify(counts)}`);
  console.log(`  Output: ${transformedDir}`);
}

main();
