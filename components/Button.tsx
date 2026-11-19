import Link from "next/link";
import type { CSSProperties } from "react";

type ButtonProps = {
  href: string;
  children: string;
  /** navy: navy outline · light: white outline · current: follows the parent's text color · glass: frosted fill */
  variant?: "navy" | "light" | "current" | "glass";
  className?: string;
  style?: CSSProperties;
};

// Each variant sets the colour of the fill that swipes in from the left on hover (the ::before layer).
const variants = {
  navy: "border-navy text-navy before:bg-navy hover:text-white",
  light: "border-white text-white before:bg-white hover:text-navy",
  current: "border-current before:bg-current hover:text-white",
  glass: "border-transparent bg-white/10 text-white backdrop-blur-[15px] before:bg-white/15",
};

const swipe =
  "relative isolate overflow-hidden before:absolute before:inset-0 before:-z-10 before:origin-left before:scale-x-0 before:transition-transform before:duration-500 before:ease-[cubic-bezier(0.22,1,0.36,1)] before:content-[''] hover:before:scale-x-100 focus-visible:before:scale-x-100";

/** Outline call-to-action with the brand arrow (Figma "Component 2/3/4/5"). On hover a fill swipes in from the left. */
export function Button({ href, children, variant = "navy", className = "", style }: ButtonProps) {
  const external = href.startsWith("http") || href.startsWith("mailto:");
  const classes = `inline-flex items-center gap-[9px] border-[0.75px] border-solid px-[21px] py-[15px] text-[10.5px] font-medium uppercase leading-none tracking-[0.03em] whitespace-nowrap transition-colors duration-500 ${swipe} ${variants[variant]} ${className}`;
  const content = (
    <>
      <span>{children}</span>
      <span aria-hidden className="icon-arrow" />
    </>
  );

  if (external) {
    return (
      <a href={href} className={classes} style={style} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={classes} style={style}>
      {content}
    </Link>
  );
}
