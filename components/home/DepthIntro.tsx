"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { Button } from "../Button";

/**
 * "Depth intro" scroll section (spec: Extra Virgin handoff, 13 Nov 2026).
 * Stage 1 pins for L px (420 on desktop, 900 on phones) while the background fades white → #031227 and the gauge dives 0 → 6,000 m.
 * Stage 2 is a navy arrival panel where the terrain rises in.
 */
// Scroll distance of the dive: longer on phones, where one flick would otherwise skip it.
const L_DESKTOP = 420;
const L_MOBILE = 900;
const TICKS = 72;
const WHITE = [255, 255, 255];
const ABYSS = [3, 18, 39]; // #031227
const NAVY = [0, 36, 93]; // #00245D

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const smooth = (a: number, b: number, v: number) => {
  const t = clamp((v - a) / (b - a));
  return t * t * (3 - 2 * t);
};
const mix = (from: number[], to: number[], t: number) =>
  `rgb(${from.map((c, i) => Math.round(c + (to[i] - c) * t)).join(",")})`;

export function DepthIntro() {
  const diveRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const gaugeRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const terrainRef = useRef<HTMLDivElement>(null);
  const terrainSectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobile = window.matchMedia("(max-width: 1023px)");
    let frame = 0;
    let lastLabel = "";

    const render = () => {
      frame = 0;
      const dive = diveRef.current!;
      const gauge = gaugeRef.current!;
      const still = reduced.matches;

      // Stage 1: the dive
      const y = -dive.getBoundingClientRect().top;
      const p = still ? 1 : clamp(y / (mobile.matches ? L_MOBILE : L_DESKTOP));
      const bg = mix(WHITE, ABYSS, smooth(0, 1, p));
      const fg = mix(NAVY, WHITE, smooth(0.3, 0.62, p));
      dive.style.backgroundColor = bg;
      dive.dataset.navTheme = smooth(0, 1, p) > 0.5 ? "dark" : "light";
      stageRef.current!.style.color = fg;

      const h = gauge.offsetHeight;
      gauge.style.setProperty("--tick-gap", `${(h - 1.5) / (TICKS - 1)}px`);
      const travel = h - 2;
      fillRef.current!.style.clipPath = `inset(0 0 ${(1 - p) * 100}% 0)`;
      markerRef.current!.style.transform = `translate3d(0, ${(p * travel).toFixed(1)}px, 0)`;
      const label = `${(Math.round((p * 6000) / 10) * 10).toLocaleString("en-US")} m`;
      if (label !== lastLabel) {
        labelRef.current!.textContent = label;
        lastLabel = label;
      }

      // Stage 2: the wave texture rises in in sync with the dark bg so the two sections always match.
      const m = mobile.matches;
      const terrain = still ? 1 : smooth(0, 1, p);
      if (terrainSectionRef.current) terrainSectionRef.current.style.backgroundColor = bg;
      terrainRef.current!.style.opacity = String(terrain);
      terrainRef.current!.style.transform = `translate3d(0, ${((1 - terrain) * (m ? 32 : 40)).toFixed(1)}px, 0)`;
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(render);
    };

    render();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    reduced.addEventListener("change", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      reduced.removeEventListener("change", schedule);
    };
  }, []);

  const ticks = {
    backgroundImage: "repeating-linear-gradient(to bottom, currentColor 0 1.5px, transparent 1.5px var(--tick-gap, 6.76px))",
  };

  return (
    <>
      <section ref={diveRef} className="relative h-[calc(100svh+900px)] bg-white motion-reduce:h-svh lg:h-[calc(100svh+420px)]">
        <div
          ref={stageRef}
          className="sticky top-0 z-10 flex h-svh flex-col items-center px-6 pt-[112px] pb-[112px] text-navy lg:px-(--gutter) lg:pt-[128px] lg:pb-[128px]"
        >
          <div className="flex flex-col items-center gap-6">
            <h2 className="max-w-[342px] text-center text-[28px] font-medium leading-[1.15] tracking-[-0.025em] lg:max-w-[880px] lg:text-[44px] lg:leading-[1.12]">
              Secure, scalable, and sustainable technology for the next 100 years of minerals demand
            </h2>
            <Button href="/why-wetstone" variant="current">
              Our Mission
            </Button>
          </div>

          <div
            ref={gaugeRef}
            aria-hidden
            className="relative my-auto h-[min(420px,calc(100svh-420px))] w-3 shrink-0 lg:h-[min(480px,calc(100svh-460px))] lg:w-[14px]"
          >
            <div className="absolute inset-0 opacity-[0.28]" style={ticks} />
            <div ref={fillRef} className="absolute inset-0" style={{ ...ticks, clipPath: "inset(0 0 100% 0)" }} />
            <div ref={markerRef} className="absolute left-[-10px] top-0 flex items-center will-change-transform lg:left-[-12px]">
              <span className="h-[2px] w-8 bg-current lg:w-[38px]" />
              <span ref={labelRef} className="absolute left-[calc(100%+4px)] -translate-y-px whitespace-nowrap text-[12px] font-light tabular-nums lg:left-[calc(100%+6px)] lg:text-[13px]">
                0 m
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Wave texture: laid over the bottom of the dive (negative margin equal to its height), so the
          section ends right below the "Our mission" button and the waves run behind it. The dive's stage
          sits above it with z-10 and has no background of its own. */}
      <section ref={terrainSectionRef} aria-hidden className="relative -mt-[calc(48svh+64px)] h-[calc(48svh+60px)] overflow-hidden lg:-mt-[364px] lg:h-[360px]">
        <div
          ref={terrainRef}
          className="absolute inset-0 opacity-0 will-change-transform"
          style={{
            maskImage: "linear-gradient(to bottom, transparent 0%, black 18%)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 18%)",
          }}
        >
          <Image src="/images/depth-waves.svg" alt="" fill unoptimized className="object-cover object-bottom" />
        </div>
      </section>
    </>
  );
}
