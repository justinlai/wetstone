"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Logo } from "./Logo";

export const NAV_LINKS = [
  { href: "/why-wetstone", label: "Our Mission" },
  { href: "/how-it-works", label: "How We Work" },
  { href: "/about", label: "About Us" },
];

type Theme = "light" | "dark";

/**
 * See-through header, matching the live Webflow site: a square frosted bar (10% white, 60px blur),
 * 72px tall, 24px from the top and inset by the page gutter. It stays visible while scrolling and
 * switches between white and navy (#031227) text with the section at 10% of the viewport height.
 * Dark sections opt in with `data-nav-theme="dark"`; pinned sections that change colour while
 * scrolling update that attribute themselves.
 */
export function Navbar() {
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>("light");

  // Close the mobile menu when the route changes.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  // Same rule as the Webflow site: the bar takes the theme of the section sitting at 10% of the viewport height.
  useEffect(() => {
    let frame = 0;
    const probe = () => {
      frame = 0;
      const header = headerRef.current;
      if (!header) return;
      const under = document
        .elementsFromPoint(window.innerWidth / 2, window.innerHeight * 0.1)
        .find((el) => !header.contains(el));
      const next: Theme = under?.closest<HTMLElement>("[data-nav-theme]")?.dataset.navTheme === "dark" ? "dark" : "light";
      setTheme(next);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(probe);
    };
    probe();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onOutside = (e: MouseEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onOutside);
    return () => document.removeEventListener("mousedown", onOutside);
  }, [open]);

  const dark = open || theme === "dark";

  return (
    <header ref={headerRef} className="fixed inset-x-[5%] top-5 z-50 lg:inset-x-(--gutter) lg:top-6">
      <nav
        aria-label="Main"
        className={`relative flex min-h-16 items-center justify-between px-5 backdrop-blur-[60px] transition-colors duration-300 lg:h-[72px] lg:px-8 ${open ? "bg-navy" : "bg-white/10"} ${dark ? "text-white" : "text-abyss"}`}
      >
        <Link href="/" aria-label="Wetstone home" className="block">
          <Logo className="h-[22px] w-[160px] lg:h-[30px] lg:w-[216px]" />
        </Link>

        <ul className="hidden items-center lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={pathname === link.href ? "page" : undefined}
                className="block px-6 py-2 text-[14px] font-semibold uppercase leading-[1.2] tracking-[0.03em]"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
          className="relative -mr-2 h-[34px] w-[43px] lg:hidden"
        >
          <span className={`absolute left-4 h-px w-[21px] bg-current transition-transform duration-300 ${open ? "top-4 rotate-45" : "top-[7px]"}`} />
          <span className={`absolute left-4 top-4 h-px w-[21px] bg-current transition-opacity duration-200 ${open ? "opacity-0" : ""}`} />
          <span className={`absolute left-4 h-px w-[21px] bg-current transition-transform duration-300 ${open ? "top-4 -rotate-45" : "top-[25px]"}`} />
        </button>
      </nav>

      {/* Mobile menu: drops down from the bar in the same width (old Webflow style), small uppercase links. */}
      <div
        id="mobile-menu"
        aria-hidden={!open}
        className={`grid overflow-hidden bg-navy transition-[grid-template-rows,opacity] duration-300 ease-in-out lg:hidden ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0 pointer-events-none"}`}
      >
        <div className="overflow-hidden">
          <ul className="flex flex-col gap-6 px-5 pt-3 pb-8">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  aria-current={pathname === link.href ? "page" : undefined}
                  className="block text-[14px] font-medium uppercase leading-none tracking-[0.04em] text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
}
