# Hansen McDowell — Content Curation Map

One decision per content item.  
Decisions: **preserve** | **rewrite** | **merge** | **retire** | **needs-owner-review**

Legend for target: where migrated content should land (Sanity schema or Next.js page).

---

## Pages & navigation

| Content item | Source | Decision | Target / notes |
|---|---|---|---|
| Home (Blogger index) | `home.html` | merge | `/` — combine legacy facts with redesign hero/process in `page.tsx` |
| Home 2016 blog post | `home-2016-post.html` | retire | Duplicate body of index; keep snapshot for audit only |
| Our Services | `services.html` | merge | `/services`, `/estate-sales`, `/clean-outs` |
| FAQ | `faq.html` | preserve + rewrite | Sanity `faq` documents; tighten tone, keep legal facts |
| Testimonials | `testimonials.html` | preserve | Sanity `testimonial` documents (all 18) |
| Contact Us | `contact-us.html` | merge | Sanity `siteSettings` + `/contact` form |
| Online Auctions | `online-auctions.html` | retire | Replace with external link to live auction platform |
| Blogger global nav | all pages | retire | Replaced by Next.js header/footer |
| Blogger sidebar contact form | all pages | retire | Replaced by `/contact` |

---

## Business identity & contact

| Content item | Source | Decision | Target / notes |
|---|---|---|---|
| Business name | legacy header | preserve | `siteSettings.businessName` |
| Phone 440-669-9665 | contact-us | preserve | `siteSettings.phone` |
| Email hansenmcdowell@yahoo.com | contact-us | preserve | `siteSettings.email` |
| License #2022000139 | home, faq, services, online-auctions | preserve | `siteSettings.license` |
| Lynn D. Hansen as contact name | contact-us | preserve | Contact page / email templates |
| Service area summary | home | preserve | `siteSettings.serviceArea` |
| Service area city list | services | preserve | New `siteSettings.serviceAreaCities` or About/Services rich text |
| Auction URL (Viking Cat) | legacy sidebar + online-auctions | preserve | `siteSettings.auctionUrl` — confirm canonical domain with owner |
| Facebook page URL | legacy sidebar | preserve | `siteSettings.facebookUrl` — replace placeholder |
| Instagram URL | legacy sidebar | preserve | Add to `siteSettings` (new field) |
| Twitter/X URL | legacy sidebar | needs-owner-review | Confirm account still active before adding |

---

## Family story & marketing copy

| Content item | Source | Decision | Target / notes |
|---|---|---|---|
| Family owned & operated / 30+ years | home | merge | Home hero + About — legacy fact + redesign prose |
| Antique Corner origin (Lakewood) | home | preserve | About page / `page.tsx` integrity section |
| Lynn, Doug, Hans, Diana, Roger | home, about | preserve | About page |
| "Integrity is the foundation" | home | merge | Home integrity section — legacy tagline + redesign blockquote |
| Home intro (overwhelming task of cleaning out) | home | rewrite | Already rewritten in `page.tsx` intro — keep draft tone |
| "We encourage you to interview other companies" | home, faq | preserve | FAQ intro / interview guide section |
| Hero headline & eyebrow | `page.tsx` | rewrite | Redesign copy; no legacy equivalent |
| 4-step process (01–04) | `page.tsx` | merge | Align bullets with legacy service process list |
| About values grid (4 articles) | `about/page.tsx` | rewrite | New content; thematically aligned with legacy integrity message |
| Services page hero | `services/page.tsx` | rewrite | New marketing copy |
| Estate sales timeline (4 stages) | `estate-sales/page.tsx` | merge | Map to legacy process bullets + settlement claim |
| Clean-out types (3 articles) | `clean-outs/page.tsx` | rewrite | Expands legacy one-liner on clean-outs |

---

## Services & process

| Content item | Source | Decision | Target / notes |
|---|---|---|---|
| "We do cleanouts as well as online auctions" | services | preserve | Services intro |
| Assessment incl. attic & crawlspace | services | preserve | `servicesFallback` features + estate-sales page |
| Organize, research, photograph, advertise | services | preserve | `servicesFallback` / estate-sales |
| Commission-only pricing (no out-of-pocket) | faq | preserve | FAQ + services |
| 3-day settlement after pickup | services | preserve | Estate sales page + FAQ — **add explicit day count** (missing in current draft) |
| Clean-out quoted per property | services | preserve | Clean-outs page + service description |
| Highest prices / most items sold goal | services | rewrite | Softened in redesign; preserve intent in service copy |
| Market pricing & collecting background | services | preserve | About credentials / estate-sales feature copy |
| Service feature bullets in `servicesFallback` | site-data.ts | merge | Enrich with legacy list wording where stronger |

---

## FAQs

| Content item | Source | Decision | Target / notes |
|---|---|---|---|
| FAQ 1 — Who is best served | faq | rewrite | In fallback; add foreclosure; keep relocation from draft |
| FAQ 2 — What items sold | faq | merge | Preserve item breadth; **needs-owner-review** for "guns" mention |
| FAQ 3 — Cost / commission | faq | preserve | Core fact unchanged |
| FAQ 4 — Do not discard before visit | faq | preserve | Strong legacy language; already in fallback |
| Interview Q1 — Licensed, bonded, insured | faq | preserve | `/faq` interview guide + expandable FAQ |
| Interview Q2 — Certified appraiser | faq | preserve | Add to interview guide (missing in app today) |
| Interview Q3 — Website address | faq | retire | Less relevant once new site launches |
| Interview Q4 — Three references | faq | preserve | Interview guide |
| Interview Q5 — Home access / supervision | faq | preserve | In fallback Q5 + interview guide |
| Interview Q6 — Unsold items ownership | faq | preserve | Add to interview guide (missing today) |
| Interview Q7 — Minimum commission | faq | preserve | Add to interview guide |
| Interview Q8 — Retail outlet conflict | faq | preserve | Add to interview guide |
| FAQ page hero & aside | `faq/page.tsx` | rewrite | Redesign marketing wrapper |
| Hard-coded 5-item interview `<ol>` | `faq/page.tsx` | merge | Expand to full legacy 8-question list |

---

## Testimonials (18)

| # | Name | Role | Decision | Notes |
|---|---|---|---|---|
| 1 | Tim Ali | Tim Ali Realty | preserve | |
| 2 | Aileen FitzGerald | Howard Hanna | preserve | Already in fallback |
| 3 | Mary Ellen Branson | Client | preserve | Already in fallback |
| 4 | Joe Cardi | Client | preserve | Already in fallback |
| 5 | Amy | Client | preserve | |
| 6 | David Linville | Client | preserve | |
| 7 | Cindy Mate | Client | preserve | |
| 8 | Jane Vitou, ABR | Keller Williams Greater Cleveland West | preserve | |
| 9 | Rachele Glynias | Howard Hanna | preserve | |
| 10 | *(unnamed)* | Client | needs-owner-review | Obtain name or redact attribution |
| 11 | Maureen | Client | preserve | Already in fallback |
| 12 | Jerry Skoch | Client | preserve | |
| 13 | Sandie | Client | preserve | |
| 14 | Kathy Baker | Client | preserve | |
| 15 | Chuck Strejnowski | Client | preserve | |
| 16 | Rosalie Artino | Client | preserve | |
| 17 | Stacey | Client | preserve | Paraphrase used on home page blockquote |
| 18 | Kathy Moenich | Client | preserve | |
| Questionnaire intro line | testimonials | rewrite | Shorten for web; keep "post-sale survey" context |
| Testimonials page hero | `testimonials/page.tsx` | rewrite | Redesign wrapper |

---

## Online auctions & listings

| Content item | Source | Decision | Target / notes |
|---|---|---|---|
| North Ridgeville June auction block | online-auctions | retire | Stale; empty auction link |
| Westlake October auction block | online-auctions | retire | Expired dated listing |
| "Please look at all pictures…" boilerplate | online-auctions | retire | Platform-side content |
| Cash on pickup note | online-auctions | needs-owner-review | Confirm still accurate for Viking Cat |
| License footer on auctions page | online-auctions | preserve | Already in site settings |
| Facebook Pixel (1164479227417189) | online-auctions | needs-owner-review | Re-implement in Next.js analytics if desired |
| Current sales section (Sanity-driven) | `estate-sales/page.tsx` | preserve | Empty fallback `[]`; populate from Sanity when live |
| Auction band CTA | `page.tsx` | merge | Links to `settings.auctionUrl` |

---

## Credentials & trust marks

| Content item | Source | Decision | Target / notes |
|---|---|---|---|
| CAGA logo + link | sidebar | needs-owner-review | Confirm membership/current use rights before import |
| ASEL Service Excellence seal | sidebar | needs-owner-review | Confirm accreditation status and display rights |
| Viking cat mascot image | sidebar | merge | Optional brand accent; tie to Viking Cat Auctions partnership |
| Licensed & bonded bullet list | about | preserve | Matches legacy FAQ closing |
| Bloggertrix social icon PNGs | sidebar | retire | Replace with SVG/icon components |

---

## Assets & media

| Content item | Source | Decision | Target / notes |
|---|---|---|---|
| NEW-LOGO-COLOR-WEB.png | header | preserve | Primary brand asset for Sanity |
| Unsplash hero/feature images | Next.js app | retire | Temporary placeholders only — replace with owned photography |
| dondaviddesigns Instagram icon | sidebar | retire | Broken third-party hotlink |
| Blogger favicon | all pages | merge | Replace with exported logo derivative |

---

## Sidebar & chrome

| Content item | Source | Decision | Target / notes |
|---|---|---|---|
| "CONTACT US TODAY!" Blogger widget | sidebar | retire | |
| Repeated sidebar on every page | all | retire | |
| Footer copyright / tagline | Next.js footer | merge | "Family owned · 30+ years" aligns with legacy |

---

## Decision summary

| Decision | Count (approx.) |
|---|---|
| preserve | 42 |
| rewrite | 12 |
| merge | 18 |
| retire | 16 |
| needs-owner-review | 8 |

### Priority preserve list (owner-critical facts)

- Family history & people
- Phone, email, license #2022000139
- Service area city list
- Commission model (no out-of-pocket)
- Process bullets + **3-day settlement**
- Full FAQ set + 8 liquidator interview questions
- All 18 testimonials with attribution
- Social URLs (Facebook, Instagram; Twitter TBD)
- CAGA / ASEL marks (pending rights confirmation)

### Priority retire list

- Undated June North Ridgeville auction listing
- Empty / broken auction link anchor
- Duplicate 2016 home post (content only; file kept in `extracted/`)
- Blogger sidebar contact forms
- Bloggertrix / third-party decorative assets
- Unsplash placeholders (after real assets sourced)
