import Image from "next/image";
import type { CSSProperties } from "react";
import { Reveal } from "../Reveal";

/**
 * Home hero, option E from the "Wetstone Hero – Shortlist": a radar beam turns around the
 * bottom-centre of the bathymetry map every 14s and reveals a heat map that fades out behind it.
 *
 * Built for smooth playback in Safari: the heat map, contour lines and bright rings are one
 * pre-rendered image (public/images/hero-heat-2x.png, rendered from the original SVG filter), and
 * the only thing that moves is a CSS transform. A square centred on the pivot turns; its
 * conic-gradient mask is the fading trail, and the heat image inside it turns the other way so it
 * stays put on the map. No SVG filters or masks are recomputed per frame.
 *
 * Everything is laid out in the 1440 × 866 artboard, which covers the section the same way as the
 * photo (object-cover), so the overlay stays on top of the islands at any size.
 * Reduced motion freezes the beam part-way round.
 */

const CX = 720;
const CY = 866;
const R = 1180;
const WEDGES_N = 40;
const TRAIL_DEG = 85;

// Opacity of the trail θ degrees behind the beam: 40 stacked 8% wedges, as in the original SVG.
const trailAlpha = (theta: number) => {
  let n = 0;
  for (let i = 0; i < WEDGES_N; i++) if (TRAIL_DEG * Math.pow((i + 1) / WEDGES_N, 2.2) >= theta) n++;
  return 1 - Math.pow(0.92, n);
};

// Conic gradient for the trail. CSS conic angles start at 12 o'clock; the beam points left (270deg)
// at rotation 0, and the trail sits just counter-clockwise of it.
const trail = (scale: number, rgb: string) => {
  const stops: string[] = [`rgba(${rgb},0) 0deg`, `rgba(${rgb},0) ${270 - TRAIL_DEG}deg`];
  for (let theta = TRAIL_DEG; theta >= 0; theta -= 5) {
    stops.push(`rgba(${rgb},${(trailAlpha(theta) * scale).toFixed(3)}) ${270 - theta}deg`);
  }
  stops.push(`rgba(${rgb},0) 270deg`, `rgba(${rgb},0) 360deg`);
  return `conic-gradient(${stops.join(",")})`;
};
const TRAIL_MASK = trail(1, "0,0,0");
const TRAIL_GLOW = trail(0.09 * 0.75, "214,229,255");

// The turning square (side 2R) in artboard units, and the artboard's place inside it.
const SQUARE: CSSProperties = {
  left: `${((CX - R) / 1440) * 100}%`,
  top: `${((CY - R) / 866) * 100}%`,
  width: `${((2 * R) / 1440) * 100}%`,
  aspectRatio: "1",
};
const ART_IN_SQUARE: CSSProperties = {
  left: `${((R - CX) / (2 * R)) * 100}%`,
  top: `${((R - CY) / (2 * R)) * 100}%`,
  width: `${(1440 / (2 * R)) * 100}%`,
  height: `${(866 / (2 * R)) * 100}%`,
};

const pt = (deg: number, r: number) => {
  const a = (deg * Math.PI) / 180;
  return `${(CX + r * Math.cos(a)).toFixed(1)} ${(CY + r * Math.sin(a)).toFixed(1)}`;
};

const TICKS = (() => {
  let d = "";
  for (let a = 190; a < 360; a += 10) {
    const len = a % 30 === 0 ? 14 : 6;
    d += `M${pt(a, 660)}L${pt(a, 660 - len)}`;
  }
  for (let k = 1; k <= 7; k++) {
    const a = 180 + k * 22.5;
    d += `M${pt(a, 40)}L${pt(a, 1200)}`;
  }
  return d;
})();

const RINGS = ["M500 866A220 220 0 0 1 940 866", "M280 866A440 440 0 0 1 1160 866", "M60 866A660 660 0 0 1 1380 866", "M-160 866A880 880 0 0 1 1600 866"];

// The beam runs from the pivot (centre of the square) to its left edge.
const BEAM =
  "linear-gradient(to left, rgba(255,255,255,0) 50%, rgba(255,255,255,0.81) 58%, rgba(234,242,255,0.6) 85%, rgba(234,242,255,0.17) 100%)";

export function HeroSweep() {
  return (
    <section data-nav-theme="dark" className="relative isolate h-svh min-h-[600px] overflow-hidden bg-[#0039AF] [container-type:size] lg:h-[866px]">
      <Image src="/images/hero-map-2x.jpg" alt="" fill preload sizes="100vw" className="-z-10 object-cover" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-abyss/20" />

      {/* 1440 × 866 artboard, scaled to cover the section like the photo. */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2"
        style={{ width: "max(100cqw, calc(100cqh * 1440 / 866))", height: "max(100cqh, calc(100cqw * 866 / 1440))" }}
      >
        {/* Static: faint range rings, bearings and distance labels */}
        <svg viewBox="0 0 1440 866" className="absolute inset-0 size-full overflow-visible">
          <g fill="none" stroke="#D6E5FF" strokeWidth="0.85" opacity="0.14">
            {RINGS.map((d) => (
              <path key={d} d={d} />
            ))}
            <path d={TICKS} />
          </g>
          <g fill="#D6E5FF" opacity="0.55" fontSize="11" letterSpacing="0.04em" className="font-sans">
            <text x="948" y="856">500 m</text>
            <text x="1168" y="856">1,000 m</text>
            <text x="1388" y="856">1,500 m</text>
          </g>
        </svg>

        {/* Turning square centred on the pivot: trail glow, revealed heat map and the beam. */}
        <div className="hero-radar absolute will-change-transform" style={SQUARE}>
          <div className="absolute inset-0 rounded-full" style={{ backgroundImage: TRAIL_GLOW }} />
          <div className="absolute inset-0" style={{ maskImage: TRAIL_MASK, WebkitMaskImage: TRAIL_MASK }}>
            <div className="hero-radar-counter absolute inset-0">
              <div className="absolute" style={ART_IN_SQUARE}>
                <Image src="/images/hero-heat-2x.png" alt="" fill sizes="100vw" className="object-fill" />
              </div>
            </div>
          </div>
          <div className="absolute left-0 top-1/2 h-[0.3%] w-full -translate-y-1/2 opacity-[0.12] blur-[2px]" style={{ backgroundImage: BEAM }} />
          <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2" style={{ backgroundImage: BEAM }} />
        </div>

        <svg viewBox="0 0 1440 866" className="absolute inset-0 size-full overflow-visible">
          <circle cx="720" cy="866" r="12" fill="none" stroke="#D6E5FF" strokeWidth="0.75" opacity="0.4" />
          <circle cx="720" cy="866" r="3" fill="#FFFFFF" opacity="0.9" />
        </svg>
      </div>

      {/* Keeps the headline legible over the brightest part of the sweep */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 -z-10 h-[520px] w-full max-w-[1100px] bg-[radial-gradient(ellipse_80%_90%_at_0%_100%,rgba(3,18,39,0.55)_0%,rgba(3,18,39,0)_70%)]"
      />

      <Reveal className="absolute inset-x-6 bottom-[56px] lg:inset-x-(--gutter) lg:bottom-[72px]">
        <h1 className="max-w-[340px] text-[38px] font-semibold leading-[0.98] tracking-[-0.035em] text-white lg:max-w-[760px] lg:text-[76px]">
          The global offshore mining company.
        </h1>
      </Reveal>
    </section>
  );
}
