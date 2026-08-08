import Link from "next/link";
import type { SiteSettings } from "@/lib/site-data";
import { ArrowUpRight } from "./icons";
import { BrandMark } from "./brand-mark";

export function SiteFooter({ settings }: { settings: SiteSettings }) {
  return (
    <footer className="site-footer">
      <div className="shell footer__lead">
        <p className="eyebrow eyebrow--light">When you’re ready</p>
        <div className="footer__lead-grid">
          <h2>Let’s make the next step feel manageable.</h2>
          <div>
            <p>
              Tell us about the home, your timeline, and what your family needs.
              We’ll listen first and recommend a clear path forward.
            </p>
            <Link className="button button--cream" href="/contact">
              Request a consultation <ArrowUpRight />
            </Link>
          </div>
        </div>
      </div>
      <div className="shell footer__main">
        <BrandMark inverse />
        <div className="footer__links">
          <div>
            <span>Explore</span>
            <Link href="/about">About</Link>
            <Link href="/services">Services</Link>
            <Link href="/estate-sales">Estate sales</Link>
            <Link href="/clean-outs">Clean-outs</Link>
          </div>
          <div>
            <span>Information</span>
            <Link href="/faq">FAQ</Link>
            <Link href="/testimonials">Testimonials</Link>
            <Link href="/contact">Contact</Link>
            <a href={settings.auctionUrl} target="_blank" rel="noreferrer">Online auctions</a>
          </div>
          <div>
            <span>Contact</span>
            <a href={`tel:${settings.phone.replace(/\D/g, "")}`}>{settings.phone}</a>
            <a href={`mailto:${settings.email}`}>{settings.email}</a>
            <p>{settings.serviceArea}</p>
          </div>
        </div>
      </div>
      <div className="shell footer__bottom">
        <span>© {new Date().getFullYear()} Hansen McDowell Estate Sales</span>
        <span>Family owned · More than 30 years of experience</span>
      </div>
    </footer>
  );
}
