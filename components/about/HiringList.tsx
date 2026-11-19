"use client";

import { useState } from "react";
import { Button } from "../Button";

const JOBS = [
  { title: "Geo-spatial Engineer", location: "Houston, TX" },
  { title: "Geologist", location: "Houston, TX" },
  { title: "Environmental Scientist", location: "Houston, TX | New York, NY" },
  { title: "Offshore Operations", location: "Houston, TX" },
];

/** "We are Hiring" accordion. Each row expands to a short summary and an apply link. */
export function HiringList() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <ul className="mt-10 border-b border-[#cdcdcd] lg:mt-[66px]">
      {JOBS.map((job, i) => {
        const expanded = open === i;
        const id = `job-${i}`;
        return (
          <li key={job.title} className="border-t border-[#cdcdcd]">
            <button
              type="button"
              aria-expanded={expanded}
              aria-controls={id}
              onClick={() => setOpen(expanded ? null : i)}
              className="group grid w-full grid-cols-[1fr_auto] items-start gap-x-4 py-6 text-left lg:grid-cols-[1fr_1fr_auto] lg:py-[50px]"
            >
              <span className="col-span-2 mb-3 text-[14px] text-black/45 lg:col-span-1 lg:mb-0 lg:text-[19px]">({String(i + 1).padStart(2, "0")})</span>
              <span>
                <span className="block text-[22px] font-medium leading-[1.1] tracking-[-0.02em] text-black lg:text-[30px]">{job.title}</span>
                <span className="mt-3 block font-mono text-[12px] uppercase tracking-[0.04em] text-black/50 lg:mt-5 lg:text-[13px]">{job.location}</span>
              </span>
              <span aria-hidden className="relative mt-2 size-[22px] text-ink lg:mt-4 lg:size-[32px]">
                <span className="absolute left-0 top-1/2 h-[5px] w-full -translate-y-1/2 bg-current lg:h-[7px]" />
                <span className={`absolute left-1/2 top-0 h-full w-[5px] -translate-x-1/2 bg-current transition-transform duration-300 lg:w-[7px] ${expanded ? "scale-y-0" : ""}`} />
              </span>
            </button>
            <div id={id} hidden={!expanded} className="pb-8 lg:grid lg:grid-cols-[1fr_1fr_auto] lg:pb-[50px]">
              <div className="lg:col-start-2">
                <p className="max-w-[520px] text-[16px] font-light leading-[1.47] text-black">
                  Join the team building the ocean mineral value chain. Tell us about your experience and why you want to work on one of the hardest problems in critical minerals.
                </p>
                <Button href="#contact" className="mt-6">
                  Apply
                </Button>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
