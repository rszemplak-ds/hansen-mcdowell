import Link from "next/link";
import type { SiteSettings } from "@/lib/content";
import { BrandMark } from "./brand-mark";
import { MobileMenu } from "./mobile-menu";
import { ServicesDropdown } from "./services-dropdown";

const primaryNavigation = [
  { href: "/", label: "Home" },
  { href: "/faq", label: "FAQ" },
  { href: "/testimonials", label: "Testimonials" },
] as const;

const serviceLinks = [
  { href: "/estate-sales", label: "Online Estate Auctions" },
  { href: "/clean-outs", label: "Complete Clean-Outs" },
  { href: "/services", label: "All Services" },
] as const;

export function SiteHeader({ settings }: { settings: SiteSettings }) {
  return (
    <header className="site-header">
      <div className="shell site-header__inner">
        <BrandMark />
        <nav className="desktop-nav" aria-label="Main navigation">
          <Link href={primaryNavigation[0].href}>{primaryNavigation[0].label}</Link>
          <ServicesDropdown links={serviceLinks} />
          {primaryNavigation.slice(1).map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <Link className="button button--pill header-cta" href="/contact">
          Book Consultation
        </Link>
        <MobileMenu
          phone={settings.phone}
          serviceLinks={serviceLinks}
          primaryLinks={primaryNavigation}
        />
      </div>
    </header>
  );
}
