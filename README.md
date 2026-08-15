# Hansen McDowell

A modern, editorial website for Hansen McDowell Estate Sales, built with Next.js, Sanity, and Resend.

## Local setup

1. Install dependencies with `pnpm install`.
2. Copy `.env.example` to `.env.local`.
3. Add a Sanity project ID and Resend API key when those services are ready.
4. Start the site with `pnpm run dev`.

Published Sanity documents drive page content. Studio lives at `/studio`.

## Content editing

The embedded Sanity Studio lives at `/studio`. Its content model includes site settings, pages, services, estate sales, clean-out projects, testimonials, and FAQs.

## Contact form

The contact form uses a Next.js Server Action and Resend. New inquiries go to the email in Sanity **Site settings** (`siteSettings.email`) when present, otherwise `CONTACT_TO_EMAIL`. The visitor receives a confirmation at the email address they supplied. Sending still requires `RESEND_API_KEY` and a verified `CONTACT_FROM_EMAIL` in env — Sanity stores the destination address only. The form does not store submissions in Sanity.
