"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Subtle parallax for full-bleed images: the layer moves a little slower than the page.
 * Desktop only (≥1024px) and off under reduced motion. The parent must clip overflow.
 */
export function Parallax({ children, strength = 0.12 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const desktop = window.matchMedia("(min-width: 1024px) and (prefers-reduced-motion: no-preference)");
    let frame = 0;

    const update = () => {
      frame = 0;
      if (!desktop.matches) {
        el.style.transform = "";
        return;
      }
      const rect = el.parentElement!.getBoundingClientRect();
      const center = rect.top + rect.height / 2 - window.innerHeight / 2;
      el.style.transform = `translate3d(0, ${(-center * strength).toFixed(1)}px, 0)`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    desktop.addEventListener("change", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      desktop.removeEventListener("change", onScroll);
    };
  }, [strength]);

  return (
    <div ref={ref} className="absolute inset-x-0 -top-[12%] -bottom-[12%] will-change-transform">
      {children}
    </div>
  );
}
