import type { Metadata } from "next";
import ExportedImage from "next-image-export-optimizer";
import { Button } from "@/components/Button";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "About us",
  description: "Built by people who know the ocean.",
};

// Leadership as it appears in the Figma file. Photos are the Figma crops (392 × 445 at 2x).
const LEADERS = [
  {
    name: "Graham Talbot",
    role: "Co-Chief Executive Officer",
    photo: "/images/leader-graham.jpg",
    bio: "Graham co-founded Wetstone after 40 years as a senior leader in the oil and gas, power and shipping industries. He has served as CFO at Maersk, Shell and BG Group, and has worked in the United States, United Kingdom, Netherlands, Canada, UAE, Denmark, Kazakhstan and Australia.",
  },
  {
    name: "Sahil Abbi",
    role: "Co-Chief Executive Officer",
    photo: "/images/leader-sahil.jpg",
    bio: "Sahil co-founded Wetstone after building commodities businesses at Jane Street, the quantitative trading firm. Before that, he was an Investment Associate at Bridgewater Associates.",
  },
  {
    name: "Carl Nordberg",
    role: "Chief Financial Officer",
    photo: "/images/leader-carl.jpg",
    bio: "Carl brings nearly three decades in investment banking and corporate finance, including 22 years at Morgan Stanley, the last 12 as a Managing Director advising natural resources clients on M&A, capital raising and financings. He leads Wetstone’s financial strategy, operations and corporate development. MBA, Duke Fuqua.",
  },
  {
    name: "Michael Lodge",
    role: "VP, Regulatory Affairs",
    photo: "/images/leader-michael.jpg",
    bio: "Michael has dedicated his career to international maritime law. He served as Secretary-General of the International Seabed Authority, at the rank of UN Under-Secretary-General, from 2017 to 2024. He guides regulatory decision-making at Wetstone.",
  },
  {
    name: "Josh Broussard",
    role: "VP, Exploration",
    photo: "/images/leader-josh.jpg",
    bio: "Josh has spent 20+ years building deep-sea and autonomous systems. As Group CTO of Ocean Infinity, he helped grow the company from under 10 to 600+ employees and directed technology for a $1.2B+ fleet of autonomous underwater and surface vehicles.",
  },
  {
    name: "Nick Murlo",
    role: "VP, Engineering",
    photo: "/images/leader-nick.jpg",
    bio: "Nick is an engineer and operator with 20 years in minerals and energy. He was previously Director of Business Improvement at Newmont, an Engagement Manager at McKinsey, and an engineer at ExxonMobil and XTO, where his work included Arctic fleet operations. MBA, Harvard; S.B., MIT.",
  },
  {
    name: "Dr. Jen Dupont",
    role: "VP, Sustainability",
    photo: "/images/leader-jen.jpg",
    bio: "Jen is a marine scientist with 16+ years at NOAA, ExxonMobil and Equinor. As Director of Permitting & Environmental Affairs at Equinor, she secured the federal and New York approvals that moved the $6B Empire Offshore Wind project into construction. Ph.D., Marine Science, University of South Florida.",
  },
  {
    name: "Kevin Benton",
    role: "VP, Software",
    photo: "/images/leader-kevin.jpg",
    bio: "Kevin is a software engineer whose background spans SpaceX, Anduril, IBM and several startups, most recently as a Director at Anduril. He specializes in distributed systems and networking, and has led large-scale infrastructure projects.",
  },
  {
    name: "David Sacks",
    role: "VP, Software",
    photo: "/images/leader-david.jpg",
    bio: "David is a software engineer with experience at SpaceX, Anduril and Microsoft, most recently as a Senior Manager at Anduril. He has led teams building large-scale global systems, including Starlink’s control and data plane infrastructure.",
  },
  {
    name: "Dan Worrall",
    role: "VP, Corporate Affairs",
    photo: "/images/leader-dan.jpg",
    bio: "Dan has spent 25 years in corporate affairs and country leadership for natural resources companies. Before Wetstone, he was a senior leader at ExxonMobil, Shell, Rio Tinto and Fortescue, where he was Global Head of Government Relations. He spent much of that time on the ground leading country-level projects.",
  },
  {
    name: "Lynda Nwike",
    role: "VP, Project Operations",
    photo: "/images/leader-lynda.jpg",
    bio: "Lynda leads Wetstone’s Project Operations team. She joins from Tesla, where she led its global cobalt and manganese supply chain strategy. Before Tesla, she earned joint degrees from Harvard Business School and Harvard Kennedy School as a Fulbright Scholar. She began her career offshore with Shell, ExxonMobil and Schlumberger, developing new projects and leading subsea drilling and decommissioning operations.",
  },
  {
    name: "Sumeet Trehan",
    role: "VP, AI + Applied Science",
    photo: "/images/leader-sumeet.jpg",
    bio: "Sumeet leads Wetstone’s AI and Applied Science team, which includes the exploration geology and geophysics teams. He joins from Vitol, where he led the team building AI and machine learning tools. Before that, he spent nearly nine years at ExxonMobil. Ph.D., Energy Resources Engineering, Stanford University.",
  },
];

/** Investor logos from the Wetstone Working File (Figma 294:213): alpha masks filled with abyss, each sized as in the 193 × 93 cells. */
const INVESTORS = [
  { name: "Lux Capital", src: "/images/investor-1.png", w: 62, h: 62 },
  // No logo yet: set as a wordmark in TWK Lausanne 500, sized like the other logos.
  { name: "Lachy Groom", text: true },
  { name: "Lightspeed", src: "/images/investor-2.png", w: 138, h: 69 },
  { name: "ICONIQ", src: "/images/investor-3.png", w: 130, h: 43 },
  { name: "StepStone", src: "/images/investor-4.png", w: 158, h: 32 },
  { name: "Trust Ventures", src: "/images/investor-5.png", w: 107, h: 62 },
  { name: "Ravelin", src: "/images/investor-6.png", w: 121, h: 31 },
  { name: "Interlagos", src: "/images/investor-7.png", w: 165, h: 36 },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Who We Are"
        image={{ src: "/images/about-hero-2.jpg", alt: "Crew in coveralls working at the rail of a survey vessel", objectPosition: "50% 50%" }}
      />

      {/* Leadership: the LinkedIn button sits under the intro until there is room for it beside the
          text (≥1280px), where it lines up with the bottom of the paragraph. */}
      <section id="leadership" className="scroll-mt-28 px-[25px] pt-[60px] lg:px-(--gutter) lg:pt-[89px]">
        <Reveal className="flex flex-col gap-6 lg:gap-8 xl:flex-row xl:items-end xl:justify-between xl:gap-16">
          <div className="xl:max-w-[1165px]">
            <h2 className="text-[40px] font-medium leading-none tracking-[-0.05em] text-black lg:text-[64px]">Leadership</h2>
            <p className="mt-4 text-[18px] leading-[1.3] text-black lg:mt-5 lg:max-w-[1063px] lg:text-[28px] lg:leading-[normal]">
              Bringing together the best of technology, resource development, exploration, international governance, and environmental management.
            </p>
          </div>
          <Button href="https://www.linkedin.com/company/wetstoneglobal/" className="shrink-0 self-start xl:mb-2 xl:self-end">
            Find us on LinkedIn
          </Button>
        </Reveal>

        <ul className="mt-[50px] grid gap-[50px] sm:grid-cols-2 lg:mt-5 lg:grid-cols-3 lg:gap-x-[59px] lg:gap-y-[42px] leaders-grid">
          {LEADERS.map((leader, i) => (
            <li key={leader.name} className="flex flex-col">
              <div className="relative aspect-[392/445] overflow-hidden bg-[#c3c3c3]">
                {leader.photo && (
                  <Reveal variant="image" delay={(i % 3) * 120} className="absolute inset-0">
                    <ExportedImage placeholder="empty" src={leader.photo} alt={`Portrait of ${leader.name}`} fill sizes="(min-width: 1920px) 420px, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover object-top" />
                  </Reveal>
                )}
              </div>
              <Reveal delay={(i % 3) * 120 + 150}>
                <h3 className="mt-[14px] text-[26px] font-semibold leading-[1.1] tracking-[-0.03em] text-black lg:text-[30px]">{leader.name}</h3>
                <p className="mt-[14px] text-[20px] font-normal leading-[1.1] tracking-[-0.03em] text-black">{leader.role}</p>
                <p className="mt-[14px] text-[16px] font-light leading-[1.47] text-black">{leader.bio}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      {/* Investors */}
      <section className="px-[25px] pt-[80px] pb-[90px] lg:px-(--gutter) lg:pt-[100px] lg:pb-[120px]">
        <Reveal>
          <h2 className="text-[40px] font-medium leading-none tracking-[-0.05em] text-black lg:text-[64px]">Our Investors</h2>
        </Reveal>
        <Reveal delay={150}>
          {/* No divider lines: the logos wrap into centred rows (2 on mobile, 4 on tablet/laptop, all 7 in one row from 1400px). */}
          <ul className="investors-row mt-8 flex flex-wrap justify-center gap-y-2 lg:mt-10">
            {INVESTORS.map((inv) => (
              <li key={inv.name} className="flex h-[93px] w-1/2 items-center justify-center px-3 sm:w-1/4">
                {"text" in inv ? (
                  <span className="whitespace-nowrap text-[20px] font-medium leading-none tracking-[-0.02em] text-abyss lg:text-[22px]">{inv.name}</span>
                ) : (
                  <span
                    role="img"
                    aria-label={inv.name}
                    className="block max-w-full bg-abyss"
                    style={{
                      width: inv.w,
                      aspectRatio: `${inv.w} / ${inv.h}`,
                      maskImage: `url(${inv.src})`,
                      maskSize: "100% 100%",
                      WebkitMaskImage: `url(${inv.src})`,
                      WebkitMaskSize: "100% 100%",
                    }}
                  />
                )}
              </li>
            ))}
          </ul>
        </Reveal>
      </section>


      <Footer />
    </>
  );
}
