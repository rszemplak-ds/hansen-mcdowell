import Link from "next/link";
import type { SiteSettings } from "@/lib/content";
import { BrandMark } from "./brand-mark";

export function SiteFooter({ settings }: { settings: SiteSettings }) {
  const tel = settings.phone.replace(/\D/g, "");
  const contactName = settings.contactName ?? "Lynn";

  return (
    <footer className="site-footer">
      <div className="shell site-footer__grid">
        <div className="site-footer__brand">
          <BrandMark inverse />
          <p>
            Family-owned estate sales and clean-outs helping {settings.serviceArea}{" "}
            families move forward with care.
          </p>
        </div>

        <div className="site-footer__col">
          <span>Services</span>
          <Link href="/estate-sales">Online Estate Auctions</Link>
          <Link href="/clean-outs">Complete Clean-Outs</Link>
          <Link href="/services">All Services</Link>
          <a href={settings.auctionUrl} target="_blank" rel="noreferrer">
            Current Auctions
          </a>
        </div>

        <div className="site-footer__col">
          <span>Quick Links</span>
          <Link href="/about">About</Link>
          <Link href="/faq">FAQ</Link>
          <Link href="/testimonials">Testimonials</Link>
          <Link href="/contact">Contact</Link>
        </div>

        <div className="site-footer__col">
          <span>Contact</span>
          <p>Talk with {contactName}</p>
          <a href={`tel:${tel}`}>{settings.phone}</a>
          <a href={`mailto:${settings.email}`}>{settings.email}</a>
          <p>{settings.serviceArea}</p>
        </div>
      </div>

      <div className="shell site-footer__bottom">
        <span>© {new Date().getFullYear()} Hansen McDowell Estate Sales. All rights reserved.</span>
        <span>{settings.license}</span>
      </div>
    </footer>
  );
}
