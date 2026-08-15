# Hansen McDowell — Content Inventory

Generated: 2026-08-11  
Sources: Legacy Blogger snapshots in `migration/extracted/` + Next.js fallbacks in `src/lib/site-data.ts` and page components.

## Extraction summary

| Snapshot file | Legacy URL | Fetch status | Bytes |
|---|---|---|---|
| `home.html` | https://hansenmcdowell.blogspot.com/ | OK | 40,143 |
| `home-2016-post.html` | https://hansenmcdowell.blogspot.com/2016/02/home_58.html | OK | 40,893 |
| `services.html` | http://hansenmcdowell.blogspot.com/p/our-services.html | OK | 39,227 |
| `faq.html` | http://hansenmcdowell.blogspot.com/p/faq.html | OK | 42,069 |
| `testimonials.html` | http://hansenmcdowell.blogspot.com/p/testimonials.html | OK | 49,674 |
| `contact-us.html` | http://hansenmcdowell.blogspot.com/p/contact-us.html | OK | 38,606 |
| `online-auctions.html` | https://hansenmcdowell.blogspot.com/p/online-aucti.html | OK | 45,951 |

**Fetch failures:** none (all 7 URLs returned valid Blogger HTML).

---

## Site map (legacy → proposed Next.js)

| Legacy page | Legacy URL | Next.js route | Notes |
|---|---|---|---|
| Home | `/` (Blogger index) | `/` | Same body copy as 2016 post; wrapper differs |
| Our Services | `/p/our-services.html` | `/services`, `/estate-sales`, `/clean-outs` | Split into service detail pages |
| FAQ | `/p/faq.html` | `/faq` | Legacy has 4 FAQs + 8 interview questions; app has 5 FAQs + 5 hard-coded interview bullets |
| Feedback / Testimonials | `/p/testimonials.html` | `/testimonials` | Legacy: 18 attributed entries; fallback: 4 |
| Contact Us | `/p/contact-us.html` | `/contact` | Legacy: phone/email only; app adds form |
| Online Auctions | `/p/online-aucti.html` | External (`settings.auctionUrl`) | Legacy page is stale; app links out |
| About (implicit on home) | Home copy | `/about` | Family story expanded in redesign |

Global sidebar (all legacy pages): CAGA logo, ASEL seal, Viking cat mascot, social icons, Blogger contact form widget.

---

## Business facts

| Fact | Legacy value | Next.js fallback (`site-data.ts` / pages) | Match? |
|---|---|---|---|
| Business name | HANSEN MCDOWELL ESTATE SALES | Hansen McDowell Estate Sales | Yes (casing) |
| Phone | 440-669-9665 | 440-669-9665 | Yes |
| Email | hansenmcdowell@yahoo.com | hansenmcdowell@yahoo.com | Yes |
| License | Ohio #2022000139 | Ohio license #2022000139 | Yes |
| Service area (summary) | Greater Cleveland area & surrounding suburbs | Greater Cleveland & Northeast Ohio | Yes (summary) |
| Service area (city list) | Fairview Park, Rocky River, Westlake, Avon, Avon Lake, Lakewood, North Olmsted, Strongsville, Seven Hills, North Royalton, Parma, Independence, North Ridgeville, Elyria, Cleveland, Brooklyn, Parma Heights, Middleburg Heights, & all other Northeast Ohio suburbs | Not listed in fallbacks | **Gap** |
| Auction platform | VikingCatAuctions.com / greatfindsauction.com | https://vikingcatauctions.com | Partial (domain aligned) |
| Commission model | No out-of-pocket cost; paid via agreed commission | Same (FAQ fallback) | Yes |
| Settlement timing | Net proceeds paid within **3 days** after sale pickup | Estate sales page: "promptly after pickup" (no day count) | **Gap** |
| Experience claim | 30+ years | 30+ years (hero, about, footer) | Yes |
| Family ownership | Lynn Hansen, Doug McDowell, son Hans; parents Diana & Roger Hansen; The Antique Corner, Lakewood | Same (home, about) | Yes |
| Integrity tagline | "INTEGRITY IS THE FOUNDATION OF OUR BUSINESS" | "Integrity is the foundation" (home integrity section) | Yes |
| Bonded / licensed | Licensed and bonded in favor of State of Ohio | About credentials section | Yes |

---

## People

| Name | Role / context | Source |
|---|---|---|
| Lynn D. Hansen | Owner / primary contact | contact-us, throughout |
| Doug McDowell | Co-owner, Lynn's husband | home, about |
| Hans | Son, now in the business | home, about |
| Diana Hansen | Lynn's mother; co-founder of Antique Corner | home, about |
| Roger Hansen | Lynn's father; co-founder of Antique Corner | home, about |

---

## Services (legacy)

### Online estate auctions / household liquidation

- Assessment of house and all contents, including attic & crawlspace
- Organize all items and areas
- Research items (often includes cleaning)
- Photograph the sale
- Advertise the sale
- Settlement of net proceeds within 3 days after sale pickup
- Goal: highest prices while selling most items; current market pricing and trends

### Clean-outs

- Available after sale or standalone
- Quoted per property at time of assessment

### Service area cities (verbatim list)

Fairview Park, Rocky River, Westlake, Avon, Avon Lake, Lakewood, North Olmsted, Strongsville, Seven Hills, North Royalton, Parma, Independence, North Ridgeville, Elyria, Cleveland, Brooklyn, Parma Heights, Middleburg Heights, & all other suburbs in Northeast Ohio.

---

## FAQs (legacy — 4 primary + 8 liquidator interview questions)

### Primary FAQs

1. **Who is best served by an estate sale?**  
   Death, divorce, downsizing, foreclosure — circumstances requiring sale and emptying of a home.

2. **What items are sold at an estate sale?**  
   Virtually anything in a home: furniture, appliances, antiques, collectibles, tools, jewelry, glassware, linens, holiday items, kitchenware, decorative items, clothing, guns, coins, vehicles, and more.

3. **What will it cost me to have a sale?**  
   No out-of-pocket cost. Services include advertising, supplies, time, and knowledge. Paid only via agreed commission.

4. **What do I need to do to prepare the home prior to calling you?**  
   NOTHING — do not throw anything away before the meeting; valuable items are often discarded by families who clean first.

### Key questions to ask every liquidator (legacy list)

1. Are you Licensed, Bonded & Insured? If not, what protections exist?
2. Are you a certified personal property appraiser?
3. Do you have a website? What is the address?
4. Do you have current references? May I have 3?
5. Who will have access to my home during the sale and clean-out? Will the liquidator always be on site?
6. After the sale, what happens to unsold items? Does the liquidator own them?
7. Do you charge a minimum (guaranteed commission)? It should never cost out-of-pocket.
8. Do you have a retail location or outlet? Is that a conflict of interest?

Closing line: Hansen McDowell is licensed and bonded in the favor of the state of Ohio. License #2022000139.

### Next.js FAQ fallback overlap (`faqsFallback`)

| Legacy FAQ | In fallback? | Notes |
|---|---|---|
| Who is best served | Yes | Rewritten; adds relocation; softer tone |
| What items can be sold | Yes | Rewritten; drops "guns" explicitly |
| What does it cost | Yes | Rewritten; mentions clean-out quote separately |
| What to do before walkthrough | Yes | Rewritten; same core message |
| Liquidator interview Q5 (access) | Partial | Condensed into fallback Q5 |
| Liquidator interview Q6–8 | No | Missing from fallback |
| Liquidator Q1–4 | Partial | Hard-coded as 5 bullets on `/faq` page (not in Sanity fallback) |

---

## Testimonials (18 extracted from legacy)

Intro note on legacy page: feedback derived from post-sale client questionnaire.

| # | Name | Role | Quote (abbreviated) |
|---|---|---|---|
| 1 | Tim Ali | Tim Ali Realty | Trust, professionalism, clean-out ability; "Yes, very thorough and thoughtful." |
| 2 | Aileen FitzGerald | Howard Hanna | "Lynn Hansen has done a fantastic job for my clients on more than one occasion. I can highly recommend her." |
| 3 | Mary Ellen Branson | Client | Out-of-state help; walk-through pleasure; furniture/garbage removed; broom clean; responsive to calls/texts |
| 4 | Joe Cardi | Client | Fast service; handled all aspects; Lynn and Doug on top of details; made tough process easier |
| 5 | Amy | Client | Emotional parent estate; kind, friendly, understanding; great team; timely and efficient |
| 6 | David Linville | Client | Updated information; professional crew; knowledgeable pricing; flawless sale days |
| 7 | Cindy Mate | Client | Professionalism, clean-out, trust, recommendation; Lynn and Doug an awesome team |
| 8 | Jane Vitou, ABR | Keller Williams Greater Cleveland West | Known Lynn for years; responsive referrals; professional demeanor + compassion |
| 9 | Rachele Glynias | Howard Hanna | Impeccable service; thorough clean-out; trustworthy, self-starter, hands-on communication |
| 10 | *(unnamed)* | Client | Trust and professionalism; ease of contact; happy customers |
| 11 | Maureen | Client | Out-of-state sale without direct involvement; "Professional, trustworthy, knowledgeable… Lynn made this difficult experience easier." |
| 12 | Jerry Skoch | Client | House immaculate and ready for buyers; no hassles; complete integrity |
| 13 | Sandie | Client | Kindness and expertise during parent estate stress; "Rock on!!" |
| 14 | Kathy Baker | Client | Tactful issue handling; treated parents' home with care during downsizing |
| 15 | Chuck Strejnowski | Client | Daily/weekly communication; coordinated entire process; honest and pleasant |
| 16 | Rosalie Artino | Client | Best, organized; turned stressful situation smooth |
| 17 | Stacey | Client | Respected Dad's home and belongings; trusted; delivered as promised; clear communication |
| 18 | Kathy Moenich | Client | Recommendation; Lynn kept updated; kind and respectful during grief; flexible |

### Next.js testimonial fallback overlap (`testimonialsFallback`)

Only 4 of 18 legacy testimonials appear in `testimonialsFallback`: Joe Cardi, Maureen, Mary Ellen Branson, Aileen FitzGerald.  
Home page blockquote uses a paraphrase of Stacey (#17) with attribution "Stacey, client" — not in fallback array.

---

## Social links

| Platform | Legacy URL | Next.js |
|---|---|---|
| Facebook | https://www.facebook.com/Hansen-McDowell-Estate-Sales-118037206261422/ | `https://www.facebook.com/` (placeholder) |
| Instagram | https://www.instagram.com/hansenmcdowellestatesales/ | Not in fallbacks |
| Twitter/X | https://twitter.com/hansenmcdowell/ | Not in fallbacks |

---

## External / partner links

| Link | URL | Status |
|---|---|---|
| CAGA (Certified Appraisers Guild) | http://www.certifiedappraisersguild.org/ | Sidebar badge |
| ASEL (Accredited Senior Estate Liquidators) | http://www.aselonline.com/ | Sidebar badge |
| Viking Cat Auctions (Westlake listing) | https://greatfindsauction.com/Event/Details/59149716/... | Legacy listing (dated) |
| North Ridgeville auction | https://www.greatfindsauction.com/Event/Details/78252924/... | **Empty anchor text** — link href present but no visible label |
| Facebook Pixel | ID 1164479227417189 | Tracking script on online-auctions page |

---

## Legacy assets (image URLs)

See `migration/assets-report.md` for import/skip recommendations. Summary:

- `NEW-LOGO-COLOR-WEB.png` — header logo (all pages)
- `CAGALogo-web.jpg` — sidebar
- `Service+Excellence+Seal+no+date.gif` — ASEL sidebar seal
- `cat-logo-estate-sales-net.jpg` — Viking mascot sidebar
- Bloggertrix social icon PNGs (Facebook, Twitter) — decorative only
- `http://dondaviddesigns.com/new-instagram-logo.png` — third-party Instagram icon (broken/external dependency)

**Temporary placeholders in Next.js app:** Unsplash stock photos in `site-data.ts`, `page.tsx`, `about/page.tsx`, `estate-sales/page.tsx`, `clean-outs/page.tsx`. Not legacy content.

---

## Stale / broken / duplicate items

| Item | Issue |
|---|---|
| North Ridgeville June 2019 auction block | Undated June 19–28 schedule; auction link anchor is empty; content is years stale |
| Westlake October auction block | Dated October 17–24 listing; likely expired; HTML comment suggests partially disabled |
| `home-2016-post.html` vs `home.html` | Post body identical; only Blogger wrapper/canonical metadata differs |
| Blogger sidebar contact form | Duplicated on every page; replaced by Next.js `/contact` form |
| `dondaviddesigns.com` Instagram icon | External hotlink; may break |
| Facebook URL in `settingsFallback` | Placeholder root URL, not business page |
| `guns` in legacy FAQ item list | Present on legacy; omitted in Next.js rewrite — verify owner preference |

---

## Next.js page copy not in legacy snapshots

Hard-coded marketing copy lives in page components (not `site-data.ts`):

- **Home (`page.tsx`):** hero headline, intro section, 4-step process, integrity blockquote (Stacey), auction band CTA
- **About (`about/page.tsx`):** values grid (4 items), credentials list
- **Services (`services/page.tsx`):** hero, decision band
- **FAQ (`faq/page.tsx`):** hero, aside copy, 5-item interview guide `<ol>`
- **Estate sales / Clean-outs:** feature copy, timelines, clean-out types
- **Contact (`contact/actions.ts`):** form error fallbacks with phone/email

These should be merged with legacy facts during Sanity migration (see `content-map.md`).
