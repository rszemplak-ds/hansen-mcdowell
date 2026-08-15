import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const libDir = dirname(fileURLToPath(import.meta.url));
export const repoRoot = join(libDir, "../../..");
export const extractedDir = join(repoRoot, "migration/extracted");
export const transformedDir = join(repoRoot, "migration/transformed");
export const reportsDir = join(repoRoot, "migration/reports");
