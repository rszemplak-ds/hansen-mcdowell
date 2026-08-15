"use client";

import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState } from "react";

export type NavLink = {
  href: string;
  label: string;
};

export function ServicesDropdown({ links }: { links: readonly NavLink[] }) {
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;

    const firstLink = menuRef.current?.querySelector<HTMLElement>("a");
    firstLink?.focus();

    const onPointerDown = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        close();
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        triggerRef.current?.focus();
        return;
      }

      if (!menuRef.current) return;

      const menuItems = Array.from(
        menuRef.current.querySelectorAll<HTMLAnchorElement>("a[role='menuitem']"),
      );
      const currentIndex = menuItems.indexOf(document.activeElement as HTMLAnchorElement);

      if (event.key === "ArrowDown") {
        event.preventDefault();
        const next = currentIndex < menuItems.length - 1 ? currentIndex + 1 : 0;
        menuItems[next]?.focus();
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        const prev = currentIndex > 0 ? currentIndex - 1 : menuItems.length - 1;
        menuItems[prev]?.focus();
      }
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, close]);

  return (
    <div
      className={`nav-dropdown${open ? " nav-dropdown--open" : ""}`}
      ref={containerRef}
    >
      <button
        ref={triggerRef}
        type="button"
        className="nav-dropdown__trigger"
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((prev) => !prev)}
      >
        Services
        <span aria-hidden="true" className="nav-dropdown__chevron" />
      </button>
      {open ? (
        <ul id={menuId} ref={menuRef} className="nav-dropdown__menu" role="menu">
          {links.map((item) => (
            <li key={item.href} role="none">
              <Link
                href={item.href}
                role="menuitem"
                className="nav-dropdown__link"
                onClick={close}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
