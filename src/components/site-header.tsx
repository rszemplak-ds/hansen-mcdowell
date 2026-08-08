import Link from "next/link";
import type { SiteSettings } from "@/lib/site-data";
import { ArrowUpRight, Phone } from "./icons";
import { BrandMark } from "./brand-mark";

const navigation = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/estate-sales", label: "Estate sales" },
  { href: "/clean-outs", label: "Clean-outs" },
  { href: "/faq", label: "FAQ" },
];

export function SiteHeader({ settings }: { settings: SiteSettings }) {
  return (
    <header className="site-header">
      <div className="topline">
        <div className="shell topline__inner">
          <span>{settings.serviceArea}</span>
          <span className="topline__license">Licensed &amp; bonded · {settings.license}</span>
          <a href={`tel:${settings.phone.replace(/\D/g, "")}`}>
            <Phone /> {settings.phone}
          </a>
        </div>
      </div>
      <div className="shell nav-wrap">
        <BrandMark />
        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <Link className="button button--small header-cta" href="/contact">
          Start a conversation <ArrowUpRight />
        </Link>
        <details className="mobile-menu">
          <summary aria-label="Open menu"><span /><span /></summary>
          <nav aria-label="Mobile navigation">
            {navigation.map((item) => (
              <Link key={item.href} href={item.href}>{item.label}</Link>
            ))}
            <Link href="/testimonials">Testimonials</Link>
            <Link href="/contact">Contact</Link>
          </nav>
        </details>
      </div>
    </header>
  );
}
