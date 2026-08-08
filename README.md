# Hansen McDowell

A modern, editorial website for Hansen McDowell Estate Sales, built with Next.js, Sanity, and Resend.

## Local setup

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env.local`.
3. Add a Sanity project ID and Resend API key when those services are ready.
4. Start the site with `npm run dev`.

The site uses carefully written local fallback content until Sanity is connected. Once configured, published Sanity documents override those defaults without changing the page components.

## Content editing

The embedded Sanity Studio lives at `/studio`. Its content model includes site settings, pages, services, estate sales, clean-out projects, testimonials, and FAQs.

## Contact form

The contact form uses a Next.js Server Action and Resend. New inquiries go to `CONTACT_TO_EMAIL`, and the visitor receives a confirmation at the email address they supplied. The form does not store submissions in Sanity.
