import ExportedImage from "next-image-export-optimizer";
import Link from "next/link";
import { Reveal } from "./Reveal";

const SITE_LINKS = [
  { href: "/", label: "Home" },
  { href: "/why-wetstone", label: "Our Mission" },
  { href: "/how-we-work", label: "How We Work" },
  { href: "/who-we-are", label: "Who We Are" },
];
const EMAILS = ["media@wetstone.co", "info@wetstone.co"];

const FAN =
  "M877.499 196.518C858.656 175.103 838 154.925 816.08 136.475C711.451 48.4706 577.651 0 439.382 0C301.114 0 167.313 48.4706 62.6845 136.475C40.8061 154.883 20.1079 175.062 1.26463 196.518L0 197.959L309.629 500.437L310.936 497.925C324.341 472.557 344.997 452.007 370.711 438.418C391.663 427.34 415.396 421.492 439.382 421.492C463.368 421.492 487.102 427.34 508.053 438.418C533.767 452.007 554.423 472.557 567.829 497.925L569.135 500.437L878.764 197.959L877.499 196.518Z";

// The fan's bearings meet here (below the shape), so the sweep pivots around it.
const PIVOT = { x: 440, y: 601 };
const R = 640;

// The sweep is drawn pointing straight up and built from 1° slices whose opacity follows a smooth
// angular falloff: a soft leading edge (+4° → 0°) and a long fading trail behind it (0° → −36°).
// Thin slices give a true angular gradient, so the beam has no hard sides at any angle.
const SWEEP_SLICES = (() => {
  const at = (deg: number) => {
    const a = (deg * Math.PI) / 180;
    return `${(PIVOT.x + R * Math.sin(a)).toFixed(1)} ${(PIVOT.y - R * Math.cos(a)).toFixed(1)}`;
  };
  const slices: { d: string; o: number }[] = [];
  for (let deg = -36; deg < 4; deg++) {
    const mid = deg + 0.5;
    const o = mid >= 0 ? 1 - mid / 4 : Math.pow(1 + mid / 36, 2);
    // Slices overlap by a hair so no seams show between them.
    slices.push({ d: `M${PIVOT.x} ${PIVOT.y}L${at(deg - 0.05)}L${at(deg + 1.05)}Z`, o: Number((o * 0.34).toFixed(3)) });
  }
  return slices;
})();

/** The radar fan (Radar.svg from design): arc outline and three bearings, lit only by the animated sweep. */
function RadarGraphic({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 879 501" fill="none" className={className}>
      <defs>
        <path id="footer-fan" fillRule="evenodd" clipRule="evenodd" d={FAN} />
        <mask id="footer-fan-inside" fill="white">
          <use href="#footer-fan" />
        </mask>
        <clipPath id="footer-fan-clip">
          <path d={FAN} />
        </clipPath>
        {/* Beam line fades in and out along its length, so its ends are soft too. */}
        <linearGradient id="footer-beam-line" gradientUnits="userSpaceOnUse" x1={PIVOT.x} y1={PIVOT.y} x2={PIVOT.x} y2={PIVOT.y - R}>
          <stop offset="0.25" stopColor="#8FB8FF" stopOpacity="0" />
          <stop offset="0.45" stopColor="#8FB8FF" stopOpacity="0.5" />
          <stop offset="0.9" stopColor="#8FB8FF" stopOpacity="0.5" />
          <stop offset="1" stopColor="#8FB8FF" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Radar sweep: enters from beyond the left edge, crosses the fan and leaves off the right, then
          waits hidden before the next pass. Left to right only (see .footer-sweep in effects.css). */}
      <g clipPath="url(#footer-fan-clip)">
        <g className="footer-sweep">
          {SWEEP_SLICES.map((slice, i) => (
            <path key={i} d={slice.d} fill="#4D8DFF" fillOpacity={slice.o} />
          ))}
          <line x1={PIVOT.x} y1={PIVOT.y} x2={PIVOT.x} y2={PIVOT.y - R} stroke="url(#footer-beam-line)" strokeWidth="1.2" />
        </g>
      </g>
      {/* Stroke drawn on the inside only (masked by the shape), as in the source file. */}
      <path d={FAN} strokeWidth="2.6" stroke="#0039AF" mask="url(#footer-fan-inside)" />
      <g strokeWidth="1.4" stroke="#0039AF">
        <line x1="168.574" y1="65.652" x2="360.328" y2="443.834" />
        <line x1="712.319" y1="69.1831" x2="502.319" y2="435.183" />
        <line x1="440.118" y1="0" x2="440.118" y2="419.484" />
      </g>
    </svg>
  );
}

/**
 * Footer from "Footer (updated)" in Figma: seafloor background, one frosted panel with the
 * wordmark, contact emails and LinkedIn on the left, page links on the right and the radar fan
 * in the middle. The "Dive in" block is hidden for now.
 */
export function Footer() {
  return (
    <footer id="contact" data-nav-theme="dark" className="relative isolate overflow-hidden bg-abyss text-white">
      {/* Seafloor still (poster for the looping footer video). */}
      <ExportedImage placeholder="empty" src="/images/footer-seafloor.jpg" alt="" fill sizes="100vw" className="-z-10 object-cover" />

      <div className="px-5 py-[48px] lg:px-(--gutter) lg:py-[48px]">
        <Reveal className="relative overflow-hidden bg-white/[0.03] px-6 pt-[43px] pb-[34px] backdrop-blur-[10px] lg:h-[388px] lg:px-[60px] lg:pt-[60px] lg:pb-0 lg:backdrop-blur-[37px]">
          <RadarGraphic className="pointer-events-none absolute left-1/2 top-[150px] w-[300px] -translate-x-1/2 lg:top-[81px] lg:w-[427px]" />

          <div className="relative flex flex-col gap-[48px] lg:h-full lg:flex-row lg:justify-between lg:gap-0">
            <div className="flex flex-col items-start gap-6">
              <ExportedImage placeholder="empty" src="/icons/footer-wordmark.svg" alt="Wetstone" width={224} height={29} className="h-[22px] w-[172px] lg:h-[28.8px] lg:w-[224.5px]" />
              <ul className="flex flex-col gap-2 text-[17px] font-medium uppercase leading-none tracking-[0.02em] text-white/70 md:text-[15px] lg:text-[14.3px]">
                {EMAILS.map((email) => (
                  <li key={email}>
                    <a href={`mailto:${email}`} className="transition-colors hover:text-white">
                      {email}
                    </a>
                  </li>
                ))}
              </ul>
              <a href="https://www.linkedin.com/company/wetstoneglobal/" target="_blank" rel="noreferrer" aria-label="Wetstone on LinkedIn" className="max-lg:absolute max-lg:bottom-[38px] max-lg:right-6 lg:static">
                <ExportedImage placeholder="empty" src="/icons/linkedin.svg" alt="" width={20} height={20} />
              </a>
            </div>

            <ul className="mt-[120px] flex flex-col gap-[14.6px] text-[18px] font-medium uppercase leading-none tracking-[0.02em] text-white/70 md:text-[16px] lg:mt-0 lg:w-[125px] lg:gap-[17.7px] lg:text-[14.3px]">
              {SITE_LINKS.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <p className="text-[16px] uppercase leading-[1.3] tracking-[0.05em] text-white/50 lg:absolute lg:bottom-[60px] lg:left-0 lg:text-[15.8px]">
              Wetstone Global Inc
            </p>
          </div>
        </Reveal>
      </div>
    </footer>
  );
}
