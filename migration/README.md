# Hansen McDowell — Sanity content migration

Idempotent seed migration from curated legacy content and Next.js draft copy into the connected Sanity project (`production` dataset).

## Document ID strategy

| Kind | `_id` pattern | Notes |
|---|---|---|
| Singletons | Fixed: `siteSettings`, `homePage`, `aboutPage`, `contactPage` | Always `createOrReplace` |
| Services | `service-estate-sales`, `service-clean-outs` | Stable seed IDs; safe to re-run |
| Testimonials | `testimonial-01-tim-ali` … `testimonial-18-kathy-moenich` | Includes `legacyId` (1–18) |
| FAQs | `faq-primary-1` … `faq-primary-4`, `faq-interview-*` | Interview Q3 (website) omitted per content-map |

This is a **one-time seed**, not a continuous CMS sync. Deterministic IDs make re-runs safe.

## Images

- Unsplash placeholders are **not** imported.
- Image fields are left unset unless `public/images/viking-cat.jpg` exists (optional `_sanityAsset` on `siteSettings.brandMark`).
- Upload real brand photography in Studio after cutover.

## Commands

```bash
# 1. Transform curated content → migration/transformed/
pnpm run migrate:transform

# 2. Validate counts, singletons, required fields
pnpm run migrate:validate

# 3. Import into production (CLI auth or SANITY_API_WRITE_TOKEN)
pnpm run migrate:import
```

### Manual CLI import (if import script cannot find a token)

```bash
pnpm exec sanity dataset import migration/transformed/import.ndjson production --replace
```

Requires `npx sanity login` (or existing CLI session).

### Re-fetch legacy HTML (optional)

Snapshots already live in `migration/extracted/` (gitignored). To refresh:

```bash
npx tsx migration/scripts/extract.ts
```

## Expected document counts

| Type | Count |
|---|---|
| siteSettings | 1 |
| homePage | 1 |
| aboutPage | 1 |
| contactPage | 1 |
| service | 2 |
| testimonial | 18 |
| faq | 11 |
| **Total** | **35** |

Validation report: `migration/reports/validation.json`

## Environment

From `.env.local`:

- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET` (default `production`)
- Optional: `SANITY_API_WRITE_TOKEN` or `SANITY_API_TOKEN` for programmatic import

## Content sources

- `migration/content-map.md` — curation decisions
- `migration/inventory.md` — legacy facts and gaps
- `migration/extracted/*.html` — Blogger snapshots
- `src/lib/site-data.ts` and page components — redesign draft copy
