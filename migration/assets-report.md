# Hansen McDowell — Legacy Assets Report

Generated: 2026-08-11  
Source: HTML snapshots in `migration/extracted/`

---

## Temporary placeholders in current Next.js app

The redesign uses **Unsplash stock photography** as stand-ins until owned assets are migrated to Sanity. These are **not** legacy content and should be replaced before launch.

| File | Unsplash URL | Usage |
|---|---|---|
| `src/lib/site-data.ts` | `photo-1600210492486-724fe5c67fb0` | Estate sales service card |
| `src/lib/site-data.ts` | `photo-1493663284031-b7e3aefcae8e` | Clean-outs service card |
| `src/app/page.tsx` | `photo-1600210492486-724fe5c67fb0` | Home hero |
| `src/app/page.tsx` | `photo-1586023492125-27b2c045efd7` | Home integrity section |
| `src/app/about/page.tsx` | `photo-1523413651479-597eb2da0ad6` | About feature image |
| `src/app/estate-sales/page.tsx` | `photo-1618221195710-dd6b41faaea6` | Estate sales feature |
| `src/app/clean-outs/page.tsx` | `photo-1493663284031-b7e3aefcae8e` | Clean-outs feature |

**Recommendation:** Skip importing Unsplash URLs into Sanity. Source real photos (auctions, clean-outs, team, Antique Corner history) from owner.

---

## Legacy Blogger images

### Brand & identity

| Asset | URL | Appears on | Recommendation | Notes |
|---|---|---|---|---|
| Header logo (`NEW-LOGO-COLOR-WEB.png`) | `https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiJbOGL5fpeVjQgOj3MNo2TcxFlBEXHBV40knzUi_fumPGg9EEjSorr8t00wU5IK8CcBg4vRUnMh2oIdQs5kmrWlyJ6OwEUsdFIH-KyWf0VL9XTEi9IzOyiR_eI7-67RhUPu4n3JyCDwrg-/s1600/NEW-LOGO-COLOR-WEB.png` | All pages (CSS background) | **Import** | Primary logo; export at s1600, verify owner has vector/source |
| Favicon | `https://hansenmcdowell.blogspot.com/favicon.ico` | All pages | **Import** | Derive modern favicon set from logo |
| OG proxy image (online-auctions) | `https://lh3.googleusercontent.com/blogger_img_proxy/AEn0k_sX8vYy4GH6bGfYsoWqBR9Ip_fIFx6H4N8hXBeFUHd9ZTYtxiC6IkZxDLuRIaspuouK4Bvqc_mrYsAxLDu_PcpuJjWQ589ZCt4bzqmEN3zULry49cBOTskOOPIpwkW_OrX501o0Jdxwagk=w1200-h630-p-k-no-nu` | online-auctions meta | **Skip** | Blogger-generated proxy; use logo or hero photo instead |

### Credentials & partners

| Asset | URL | Appears on | Recommendation | Notes |
|---|---|---|---|---|
| CAGA logo (`CAGALogo-web.jpg`) | `https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh9Hi2hIfx-9WLZT_CFBNofCABJqGM8VfZ_BSGuBjg-hrDgNKduK0Oyf21Q3o73_7s2Z0qRhuCs7w_2sikFr8fHnnWnDTdqg1Deg6OxgovcOYbd_yvJt3tHa4KtrQP2zzUAB7cGtHIbudJy/s252/CAGALogo-web.jpg` | Sidebar (all pages) | **needs-owner-review** | Links to certifiedappraisersguild.org; confirm membership before display |
| ASEL seal (`Service+Excellence+Seal+no+date.gif`) | `https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg4RTA3ZLCE_r1z_tUhppKp-Xme2LvhyphenhyphenCOkQzdetDoviNbbztnPPtbbkQGw-k8uGmNPgDdfeapbi1HsfFWmPShHtcHEo-aHh__5_6zSAx3CCtuFTfGM9i12_e5uI-g_fztpsYF-0IrHiBQC/s1600/Service+Excellence+Seal+no+date.gif` | Sidebar (all pages) | **needs-owner-review** | GIF badge; verify ASEL accreditation + usage rights |
| Viking cat mascot (`cat-logo-estate-sales-net.jpg`) | `https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj59AT-USLAdg1davlHvoBkz5LzTpuzcB8E1PoyEncOErR7ceA_FJnxFcMIGE6sAmEWkSRKV170tiin4Wdh_eht0els7wXLu5furoArxm1zkLPUUJYDgSvE597mZePRM_ZP8WztWL7wPIXJ/s252/cat-logo-estate-sales-net.jpg` | Sidebar (all pages) | **Import (optional)** | Alt text: "OUR VIKING MASCOT"; ties to Viking Cat Auctions brand |

### Social icon decorations (legacy)

| Asset | URL | Recommendation | Notes |
|---|---|---|---|
| Facebook icon PNG | `https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjCUapqSAqz_5KnIzB0JGJccK3DexRedfA1D5RGCZBavDoTU7Jb3ynizYQ9-eHvkpH4StTQr8n5lHkmq3qgMnY8aIevJRCmrFZLGZLEsPXCHEDSjHQcWzWOT1HpZpoxA9t6MMSXXPo8Ps9u/s1600/Bloggertrix-facebook.png` | **Skip** | Replace with inline SVG / lucide icon |
| Twitter icon PNG | `https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhJEwR8BiK6YRn3m9GAsNv3mRh8ww4D2uRFO8pyBmgfibXNhowlCjEP61b9D71siJGbY5pnvsT-eVjoOO1M_RKc4MLtiwHZP6Ubd87jGbo2Dgfsn_9Dpj1kLKsBxvkFt4u55C97rgC0_6E5/s1600/bloggertrix-twitter.png` | **Skip** | Same |
| Instagram icon (Blogger proxy) | `https://lh3.googleusercontent.com/blogger_img_proxy/AEn0k_ucHwPn8bXVryiuZO6S8TYUmZfo4ST59z9zo7goxrp64klDtwxLWc79dID-P-UKNLj9N1U1wAE4a6RJ2s8rFDBTqoffjT4nnr3P1G3XXneOYSJW0w=s0-d` | **Skip** | Only on some pages; use standard icon |
| Instagram icon (third-party) | `http://dondaviddesigns.com/new-instagram-logo.png` | **Skip** | External hotlink; unreliable |

### Tracking / non-content

| Asset | URL | Recommendation | Notes |
|---|---|---|---|
| Facebook Pixel noscript GIF | `https://www.facebook.com/tr?id=1164479227417189&ev=PageView&noscript=1` | **Skip** | Re-implement pixel in Next.js if owner wants analytics |

---

## Content-page images

No inline content images were found in legacy page bodies (home, services, FAQ, testimonials, contact). All meaningful legacy visuals live in the **header logo** and **sidebar widgets**.

The online-auctions page contains **text-only auction listings** (no listing photos embedded in the Blogger HTML).

---

## Import priority

1. **Must import:** `NEW-LOGO-COLOR-WEB.png` (brand mark, favicon source)
2. **Should import (pending owner):** CAGA logo, ASEL seal — only after rights confirmation
3. **Nice to have:** Viking cat mascot for auction-band or footer Easter egg
4. **Skip:** Bloggertrix icons, dondaviddesigns hotlink, Blogger OG proxy, Facebook pixel image
5. **Replace (not import):** All Unsplash URLs in Next.js with owner-provided photography

---

## Suggested Sanity asset folders

| Folder | Assets |
|---|---|
| `brand/` | Logo PNG/SVG, favicon derivatives |
| `credentials/` | CAGA, ASEL (if approved) |
| `marketing/` | Team photos, Antique Corner history, auction/clean-out photos |
| `partners/` | Viking mascot (optional) |

---

## Broken / stale asset risks

| Risk | Detail |
|---|---|
| Googleusercontent hotlinks | Blogger CDN URLs may remain stable but should be downloaded and self-hosted in Sanity |
| `dondaviddesigns.com` | Third-party Instagram icon; already inconsistent across pages |
| Empty auction anchor | North Ridgeville listing has href but no link text — content rot, not asset issue |
| GIF seal | ASEL badge is animated GIF; consider static PNG export for performance |

---

## Download command reference

Raw snapshots are in `migration/extracted/` (gitignored). To re-fetch individual assets during a future import pass:

```bash
curl -L -o migration/transformed/NEW-LOGO-COLOR-WEB.png \
  "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiJbOGL5fpeVjQgOj3MNo2TcxFlBEXHBV40knzUi_fumPGg9EEjSorr8t00wU5IK8CcBg4vRUnMh2oIdQs5kmrWlyJ6OwEUsdFIH-KyWf0VL9XTEi9IzOyiR_eI7-67RhUPu4n3JyCDwrg-/s1600/NEW-LOGO-COLOR-WEB.png"
```

(Do not run import until owner approves asset pipeline.)
