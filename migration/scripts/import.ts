import { config as loadEnv } from "dotenv";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { execSync } from "node:child_process";
import { createClient } from "@sanity/client";
import { repoRoot, transformedDir } from "./lib/paths.js";
import type { SanityDoc } from "./lib/sanity-doc.js";

loadEnv({ path: join(repoRoot, ".env.local") });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-08-08";
const writeToken =
  process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_TOKEN;

function loadDocuments(): SanityDoc[] {
  return JSON.parse(
    readFileSync(join(transformedDir, "documents.json"), "utf8"),
  ) as SanityDoc[];
}

async function importWithClient(docs: SanityDoc[]) {
  if (!projectId) {
    throw new Error("NEXT_PUBLIC_SANITY_PROJECT_ID is not set in .env.local");
  }
  if (!writeToken) {
    throw new Error("No SANITY_API_WRITE_TOKEN or SANITY_API_TOKEN found");
  }

  const client = createClient({
    projectId,
    dataset,
    apiVersion,
    token: writeToken,
    useCdn: false,
  });

  let created = 0;
  for (const doc of docs) {
    await client.createOrReplace(doc);
    created += 1;
    console.log(`  upserted ${doc._id} (${doc._type})`);
  }

  return { method: "client" as const, count: created };
}

function importWithCli() {
  const ndjsonPath = join(transformedDir, "import.ndjson");
  const cmd = `npx sanity dataset import "${ndjsonPath}" ${dataset} --replace`;
  console.log(`Running: ${cmd}`);
  execSync(cmd, {
    cwd: repoRoot,
    stdio: "inherit",
    env: {
      ...process.env,
      SANITY_STUDIO_PROJECT_ID: projectId,
      SANITY_STUDIO_DATASET: dataset,
    },
  });
  return { method: "cli" as const };
}

async function main() {
  const docs = loadDocuments();
  console.log(`Importing ${docs.length} documents to ${projectId}/${dataset}`);

  if (writeToken && projectId) {
    try {
      const result = await importWithClient(docs);
      console.log(
        `Import complete via @sanity/client: ${result.count} documents.`,
      );
      return;
    } catch (err) {
      console.warn("Client import failed, falling back to Sanity CLI:", err);
    }
  } else {
    console.log(
      "No write token in env — using Sanity CLI auth (npx sanity dataset import).",
    );
    console.log(
      "To use @sanity/client instead, set SANITY_API_WRITE_TOKEN in .env.local.",
    );
  }

  importWithCli();
  console.log(`Import complete via CLI: ${docs.length} documents (expected).`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
