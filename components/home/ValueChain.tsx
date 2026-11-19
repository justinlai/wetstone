"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { Button } from "../Button";
import { Reveal } from "../Reveal";

/**
 * "Wetstone is building the full ocean mineral value chain."
 * Survey frame over open water. The square follows the cursor (eased) and works as a window onto
 * the bathymetry map, with rays running to the frame's corners. Mechanics follow the live Webflow
 * radar section: eased follow, 75% travel limit, a short scripted sweep when it first comes into view,
 * and a return to centre when the cursor leaves. Moving the cursor cancels the sweep at any point.
 */

// Sizes in % of the frame (908 × 938 artboard).
const OUTER = 36.7;
const INNER = 29.1;
const WINDOW = 22;
const TRAVEL = (50 - OUTER / 2) * 0.75;
const MIN = 50 - TRAVEL;
const MAX = 50 + TRAVEL;
const EASE = 0.06; // share of the remaining distance covered per frame
const SWEEP = [
  { x: 32, y: 32 },
  { x: 70, y: 50 },
  { x: 50, y: 50 },
];
const SWEEP_STEP_MS = 1600;

const clamp = (v: number) => Math.min(MAX, Math.max(MIN, v));

export function ValueChain() {
  const sectionRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const outerRef = useRef<SVGRectElement>(null);
  const innerRef = useRef<SVGRectElement>(null);
  const lineRefs = useRef<(SVGLineElement | null)[]>([]);
  const windowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current!;
    const frame = frameRef.current!;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let x = 50;
    let y = 50;
    let tx = 50;
    let ty = 50;
    let raf = 0;
    let sweeping = false;
    const timers: number[] = [];

    const draw = () => {
      const half = OUTER / 2;
      const l = x - half;
      const t = y - half;
      const outer = outerRef.current!;
      outer.setAttribute("x", l.toFixed(3));
      outer.setAttribute("y", t.toFixed(3));
      const inner = innerRef.current!;
      inner.setAttribute("x", (x - INNER / 2).toFixed(3));
      inner.setAttribute("y", (y - INNER / 2).toFixed(3));
      const ends = [
        [0, 0, l, t],
        [100, 0, l + OUTER, t],
        [100, 100, l + OUTER, t + OUTER],
        [0, 100, l, t + OUTER],
      ];
      lineRefs.current.forEach((line, i) => {
        if (!line) return;
        const [x1, y1, x2, y2] = ends[i];
        line.setAttribute("x1", String(x1));
        line.setAttribute("y1", String(y1));
        line.setAttribute("x2", x2.toFixed(3));
        line.setAttribute("y2", y2.toFixed(3));
      });
      const w = WINDOW / 2;
      windowRef.current!.style.clipPath = `inset(${(y - w).toFixed(3)}% ${(100 - x - w).toFixed(3)}% ${(100 - y - w).toFixed(3)}% ${(x - w).toFixed(3)}%)`;
    };

    const tick = () => {
      x += (tx - x) * EASE;
      y += (ty - y) * EASE;
      draw();
      raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.01 ? requestAnimationFrame(tick) : 0;
    };
    const aim = (nx: number, ny: number) => {
      tx = clamp(nx);
      ty = clamp(ny);
      if (!raf) raf = requestAnimationFrame(tick);
    };

    draw();
    if (reduced) return;

    // Scripted sweep the first time the frame is mostly in view.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        sweeping = true;
        SWEEP.forEach((p, i) => timers.push(window.setTimeout(() => aim(p.x, p.y), i * SWEEP_STEP_MS)));
        timers.push(window.setTimeout(() => (sweeping = false), SWEEP.length * SWEEP_STEP_MS));
      },
      { threshold: 0.6 },
    );
    io.observe(frame);

    // Follow the cursor anywhere over the section, mapped onto the frame.
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      // The cursor takes over at any point, cancelling the intro sweep.
      if (sweeping) {
        sweeping = false;
        timers.forEach(clearTimeout);
        timers.length = 0;
      }
      const r = frame.getBoundingClientRect();
      aim(((e.clientX - r.left) / r.width) * 100, ((e.clientY - r.top) / r.height) * 100);
    };
    const onLeave = () => {
      if (!sweeping) aim(50, 50);
    };
    section.addEventListener("pointermove", onMove);
    section.addEventListener("pointerleave", onLeave);

    return () => {
      io.disconnect();
      timers.forEach(clearTimeout);
      cancelAnimationFrame(raf);
      section.removeEventListener("pointermove", onMove);
      section.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <section ref={sectionRef} data-nav-theme="dark" className="relative isolate overflow-hidden bg-[#002143] lg:h-[865px]">
      {/* Satellite view of the ocean (client's background.png, 18 Nov). */}
      <Image src="/images/value-background.jpg" alt="" fill sizes="100vw" className="-z-10 object-cover" />
      {/* Soft hand-off from the dark depth panel above. */}
      <div aria-hidden className="absolute inset-x-0 top-0 -z-10 h-[220px] bg-gradient-to-b from-abyss to-transparent lg:h-[300px]" />

      {/* Survey frame (left half on desktop). */}
      <Reveal variant="image" className="relative aspect-[908/938] w-full max-w-[560px] lg:absolute lg:left-0 lg:top-0 lg:w-[908px] lg:max-w-none">
        <div ref={frameRef} className="absolute inset-0">
          <div ref={windowRef} className="absolute inset-0 bg-navy" style={{ clipPath: "inset(39% 39% 39% 39%)" }}>
            <Image
              src="/images/value-bathymetry.jpg"
              alt="Bathymetry survey map"
              fill
              sizes="(min-width: 1024px) 908px, 100vw"
              className="object-cover"
            />
          </div>
          <svg aria-hidden viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 size-full overflow-visible" fill="none" stroke="#E4E8EE" strokeOpacity="0.55">
            {[0, 1, 2, 3].map((i) => (
              <line
                key={i}
                ref={(el) => {
                  lineRefs.current[i] = el;
                }}
                vectorEffect="non-scaling-stroke"
              />
            ))}
            <rect ref={outerRef} width={OUTER} height={OUTER} vectorEffect="non-scaling-stroke" />
            <rect ref={innerRef} width={INNER} height={INNER} vectorEffect="non-scaling-stroke" />
          </svg>
        </div>
      </Reveal>

      <Reveal className="relative px-6 pb-16 pt-2 lg:absolute lg:left-[calc(50%+76.5px)] lg:top-[calc(50%-96.5px)] lg:w-[438px] lg:p-0">
        <h2 className="text-[34px] font-medium leading-[1.1] tracking-[-0.03em] text-white lg:text-[48px]">
          Wetstone is building the full ocean mineral value chain
        </h2>
        <Button href="/how-it-works" variant="light" className="mt-8 lg:mt-[50px]">
          How we work
        </Button>
      </Reveal>
    </section>
  );
}
