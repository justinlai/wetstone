"use client";

import ExportedImage from "next-image-export-optimizer";
import { useEffect, useRef, useState } from "react";
import { STEPS } from "./steps";

/**
 * "How it works" pinned scroll section (spec: Extra Virgin handoff, 16 Nov 2026).
 * Desktop: 0–600px the page darkens to #050F24 and the title shrinks into place; after that
 * p = clamp((y − 600) / 700, 0, 5) scrubs the step list, the stacked panels and the gauge.
 * Mobile keeps it simple: the title is small and fixed, the page darkens over the first 200px,
 * and each step swaps in with a short CSS transition instead of following the finger frame by frame.
 */
const INTRO = 600;
const STEP = 700;
const INTRO_M = 200;
const STEP_M = 560;
const LAST = STEPS.length - 1;
const DEEP = [5, 15, 36]; // #050F24
const WHITE = [255, 255, 255];
const GAUGE_TICKS = 36;

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const smooth = (t: number) => {
  const c = clamp(t);
  return c * c * (3 - 2 * c);
};
const mix = (from: number[], to: number[], t: number) =>
  `rgb(${from.map((c, i) => Math.round(c + (to[i] - c) * t)).join(",")})`;
const pad = (n: number) => String(n).padStart(2, "0");

export function HowWeDoIt() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const gaugeFillRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<HTMLDivElement>(null);
  // Mobile horizontal gauge
  const mobileGaugeRef = useRef<HTMLDivElement>(null);
  const mobileGaugeFillRef = useRef<HTMLDivElement>(null);
  const mobileMarkerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 1023px)");
    let frame = 0;

    const render = () => {
      frame = 0;
      const section = sectionRef.current!;
      const y = -section.getBoundingClientRect().top;
      const m = mobile.matches;
      const vh = window.innerHeight;

      const intro = m ? INTRO_M : INTRO;
      const step = m ? STEP_M : STEP;

      // Stage 1: intro
      const q = smooth(y / intro);
      stageRef.current!.style.backgroundColor = mix(WHITE, DEEP, q);
      sectionRef.current!.dataset.navTheme = q > 0.5 ? "dark" : "light";
      const title = titleRef.current!;
      title.style.color = mix(DEEP, WHITE, q);
      contentRef.current!.style.color = mix(DEEP, WHITE, q);
      if (m) {
        title.style.transform = `translate3d(0, ${Math.max(108, vh * 0.11)}px, 0)`;
        contentRef.current!.style.opacity = String(Math.max(0.3, q));
      } else {
        const startTop = Math.min(250, vh * 0.28);
        const endTop = Math.max(130, vh / 2 - 230);
        const endScale = 0.583;
        title.style.transform = `translate3d(0, ${(startTop + (endTop - startTop) * q).toFixed(1)}px, 0) scale(${(1 + (endScale - 1) * q).toFixed(4)})`;
        contentRef.current!.style.opacity = String(Math.max(0.3, smooth(y / 400)));
      }

      // Stage 2: steps
      const p = clamp((y - intro) / step, 0, LAST);
      const current = Math.round(p);
      setActive(current);
      panelRefs.current.forEach((panel, i) => {
        if (!panel) return;
        if (m) {
          const off = i === current ? 0 : i < current ? -32 : 32;
          panel.style.opacity = i === current ? "1" : "0";
          panel.style.transform = `translate3d(0, ${off}px, 0)`;
          panel.style.transitionDuration = i === current ? "0.5s" : "0.2s";
          panel.style.transitionDelay = i === current ? "0.16s" : "0s";
          panel.style.visibility = "visible";
          return;
        }
        const d = p - i;
        const ad = Math.max(0, Math.abs(d) - 0.3) / 0.7;
        panel.style.opacity = String(clamp(1 - 2.0 * ad));
        panel.style.transform = `translate3d(0, ${(-Math.sign(d) * ad * 300).toFixed(1)}px, 0)`;
        panel.style.visibility = ad > 0.5 ? "hidden" : "visible";
      });

      // Desktop gauge
      const travel = 419;
      if (markerRef.current) markerRef.current.style.transform = `translate3d(0, ${((p / LAST) * travel).toFixed(1)}px, 0)`;
      if (gaugeFillRef.current) gaugeFillRef.current.style.clipPath = `inset(0 0 ${(1 - p / LAST) * 100}% 0)`;

      // Mobile horizontal gauge
      if (m && mobileGaugeRef.current) {
        const gw = mobileGaugeRef.current.offsetWidth;
        mobileGaugeRef.current.style.setProperty("--mgt", `${(gw / (GAUGE_TICKS - 1)).toFixed(2)}px`);
        if (mobileGaugeFillRef.current)
          mobileGaugeFillRef.current.style.clipPath = `inset(0 ${((1 - p / LAST) * 100).toFixed(2)}% 0 0)`;
        if (mobileMarkerRef.current)
          mobileMarkerRef.current.style.transform = `translate3d(${((p / LAST) * gw).toFixed(1)}px, 0, 0)`;
      }
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(render);
    };

    render();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  const goTo = (i: number) => {
    const section = sectionRef.current!;
    const top = section.getBoundingClientRect().top + window.scrollY;
    const m = window.matchMedia("(max-width: 1023px)").matches;
    window.scrollTo({ top: top + (m ? INTRO_M + i * STEP_M : INTRO + i * STEP), behavior: "smooth" });
  };

  const ticks = {
    backgroundImage: `repeating-linear-gradient(to bottom, currentColor 0 1px, transparent 1px ${419 / (GAUGE_TICKS - 1)}px)`,
  };
  const mobileTicks = {
    backgroundImage: "repeating-linear-gradient(to right, currentColor 0 1px, transparent 1px var(--mgt, 10px))",
  };

  return (
    <>
      {/* Pinned version */}
      <section
        ref={sectionRef}
        aria-labelledby="how-it-works-title"
        className="relative h-[calc(100svh+3050px)] motion-reduce:hidden lg:h-[calc(100svh+4250px)]"
      >
        {/* h-dvh: fills the full visible viewport including home indicator area on newer iPhones */}
        <div ref={stageRef} className="sticky top-0 h-dvh overflow-hidden bg-white">
          <div className="relative h-full">
            <h2
              ref={titleRef}
              id="how-it-works-title"
              className="absolute left-6 top-0 z-10 origin-top-left whitespace-nowrap text-[24px] font-medium leading-none tracking-[-0.035em] text-deep will-change-transform lg:left-(--gutter) lg:text-[64px]"
            >
              How it works
            </h2>

            <div ref={contentRef} className="opacity-0">
              {/* Desktop step list */}
              <ol className="absolute left-(--gutter) top-[calc(50svh-165px)] hidden w-[440px] lg:block">
                {STEPS.map((step, i) => {
                  const state = i === active ? "translate-x-3" : i < active ? "opacity-60" : "opacity-40";
                  return (
                    <li key={step.title}>
                      <button
                        type="button"
                        onClick={() => goTo(i)}
                        aria-current={i === active ? "step" : undefined}
                        className={`flex min-h-[54px] w-full items-center gap-6 text-left transition-[opacity,transform] duration-300 ease-out hover:opacity-100 ${state}`}
                      >
                        <span className="w-[26px] text-[16px] tabular-nums">{pad(i + 1)}</span>
                        <span className="text-[26px] font-light tracking-[-0.02em]">{step.title}</span>
                      </button>
                    </li>
                  );
                })}
              </ol>

              {/* Mobile horizontal gauge — same tick style as desktop, laid horizontally */}
              <div
                aria-hidden
                className="absolute inset-x-6 top-[max(155px,14.5svh)] z-10 flex items-center gap-4 lg:hidden"
              >
                <span className="shrink-0 text-[13px] tabular-nums">
                  {pad(active + 1)} / {pad(STEPS.length)}
                </span>
                <div ref={mobileGaugeRef} className="relative h-[18px] flex-1">
                  <div className="absolute inset-0 opacity-25" style={mobileTicks} />
                  <div ref={mobileGaugeFillRef} className="absolute inset-0 opacity-90" style={{ ...mobileTicks, clipPath: "inset(0 100% 0 0)" }} />
                  <div ref={mobileMarkerRef} className="absolute -top-2 left-0 h-[34px] w-px bg-current will-change-transform" />
                </div>
              </div>

              {/* Step panels
                  Mobile: absolute inset-0 (fills full sticky height); each panel is a flex column
                  with the icon centered in the available space and text pinned to the bottom.
                  Desktop: positioned at the right column, same as before. */}
              <div className="absolute inset-0 lg:inset-y-auto lg:left-[47.2%] lg:right-auto lg:bottom-auto lg:top-[calc(50svh-165px)] lg:w-[560px]">
                {STEPS.map((step, i) => (
                  <div
                    key={step.title}
                    ref={(el) => {
                      panelRefs.current[i] = el;
                    }}
                    aria-hidden={i !== active}
                    className="absolute inset-0 will-change-transform max-lg:transition-[opacity,transform] max-lg:duration-500 max-lg:ease-[cubic-bezier(0.22,1,0.36,1)] lg:inset-y-auto lg:inset-x-0 lg:top-0"
                    style={{ opacity: i === 0 ? 1 : 0 }}
                  >
                    {/* Mobile: flex column — space at top clears title+gauge, icon centers in flex-1, text at bottom */}
                    <div className="flex h-full flex-col justify-evenly px-6 pb-[max(20px,calc(env(safe-area-inset-bottom,0px)+4px))] pt-[max(195px,16.5svh)] lg:hidden">
                      <div className="flex justify-center">
                        <div className="relative size-[min(260px,55vw,calc(100svh-490px))]">
                          <ExportedImage placeholder="empty" src={step.icon} alt="" fill sizes="260px" className="object-contain" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-[32px] font-light leading-[1.05] tracking-[-0.03em]">{step.title}</h3>
                        <p className="mt-4 text-[16px] leading-[1.5] text-current/70">{step.body}</p>
                      </div>
                    </div>

                    {/* Desktop: original layout */}
                    <div className="hidden lg:block">
                      <div className="relative size-[min(260px,calc(100svh-560px))]">
                        <ExportedImage placeholder="empty" src={step.icon} alt="" fill sizes="260px" className="object-contain object-left" />
                      </div>
                      <h3 className="mt-14 text-[44px] font-light leading-[1.05] tracking-[-0.03em]">{step.title}</h3>
                      <p className="mt-4 max-w-[500px] text-[19px] leading-[1.55] text-current/70">{step.body}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop progress gauge */}
              <div aria-hidden className="absolute right-[calc(var(--gutter)+26px)] top-[calc(50svh-151px)] hidden h-[420px] w-[18px] lg:block">
                <div className="absolute inset-0 opacity-25" style={ticks} />
                <div ref={gaugeFillRef} className="absolute inset-0 opacity-90" style={{ ...ticks, clipPath: "inset(0 0 100% 0)" }} />
                <div ref={markerRef} className="absolute -left-2 top-0 h-px w-[34px] bg-current will-change-transform">
                  <span className="absolute right-[calc(100%+14px)] top-1/2 -translate-y-1/2 whitespace-nowrap text-[13px] tabular-nums">
                    {pad(active + 1)} / {pad(STEPS.length)}
                  </span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Reduced motion: plain stacked list on navy */}
      <section aria-label="How it works" data-nav-theme="dark" className="hidden bg-deep px-6 py-20 text-white motion-reduce:block lg:px-(--gutter)">
        <h2 className="text-[40px] font-medium tracking-[-0.035em] lg:text-[56px]">How it works</h2>
        <ol className="mt-12 grid gap-16 lg:grid-cols-2">
          {STEPS.map((step, i) => (
            <li key={step.title}>
              <div className="relative size-[160px]">
                <ExportedImage placeholder="empty" src={step.icon} alt="" fill sizes="160px" className="object-contain object-left" />
              </div>
              <p className="mt-6 text-[13px] tabular-nums text-white/60">{pad(i + 1)}</p>
              <h3 className="mt-2 text-[32px] font-light tracking-[-0.03em]">{step.title}</h3>
              <p className="mt-3 max-w-[500px] text-[17px] leading-[1.55] text-muted">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
