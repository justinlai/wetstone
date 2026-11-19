"use client";

import { useEffect, useRef, type ReactNode, type CSSProperties } from "react";

type RevealProps = {
  children: ReactNode;
  /** "up" fades and rises text; "image" fades in and settles from a slight zoom. */
  variant?: "up" | "image";
  delay?: number;
  className?: string;
  style?: CSSProperties;
  as?: "div" | "span" | "li";
};

/**
 * Reveals its children once, when they scroll into view.
 * The CSS lives in globals.css (.reveal / .reveal-image) and is disabled under reduced motion.
 */
export function Reveal({ children, variant = "up", delay = 0, className = "", style, as = "div" }: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Also reveal anything already scrolled past (fast flicks or anchor jumps can skip over it).
        if (entry.isIntersecting || entry.boundingClientRect.bottom < 0) {
          el.setAttribute("data-shown", "");
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const Tag = as;
  return (
    <Tag
      ref={ref as never}
      className={`${variant === "image" ? "reveal-image" : "reveal"} ${className}`}
      style={{ ...style, ["--reveal-delay" as string]: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
