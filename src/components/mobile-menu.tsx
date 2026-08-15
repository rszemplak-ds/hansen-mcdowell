"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";

type NavLink = {
  href: string;
  label: string;
};

export function MobileMenu({
  phone,
  serviceLinks,
  primaryLinks,
}: {
  phone: string;
  serviceLinks: readonly NavLink[];
  primaryLinks: readonly NavLink[];
}) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const tel = phone.replace(/\D/g, "");
  const close = () => setOpen(false);

  useEffect(() => {
    if (!open) return;

    const restoreOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = restoreOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div className={`mobile-menu${open ? " mobile-menu--open" : ""}`}>
      <button
        type="button"
        className="mobile-menu__toggle"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((current) => !current)}
      >
        <span />
        <span />
        <span />
      </button>
      {open ? (
        <>
          <button
            type="button"
            className="mobile-menu__backdrop"
            aria-label="Close menu"
            onClick={close}
          />
          <nav id={panelId} className="mobile-menu__panel" aria-label="Mobile navigation">
            {primaryLinks.slice(0, 1).map((item) => (
              <Link key={item.href} href={item.href} onClick={close}>
                {item.label}
              </Link>
            ))}
            <div className="mobile-menu__group">
              <span className="mobile-menu__group-label">Services</span>
              {serviceLinks.map((item) => (
                <Link key={item.href} href={item.href} onClick={close}>
                  {item.label}
                </Link>
              ))}
            </div>
            {primaryLinks.slice(1).map((item) => (
              <Link key={item.href} href={item.href} onClick={close}>
                {item.label}
              </Link>
            ))}
            <Link href="/about" onClick={close}>
              About
            </Link>
            <Link className="button button--pill mobile-menu__cta" href="/contact" onClick={close}>
              Book Consultation
            </Link>
            <a className="mobile-menu__phone" href={`tel:${tel}`}>
              {phone}
            </a>
          </nav>
        </>
      ) : null}
    </div>
  );
}
