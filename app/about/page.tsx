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
    photo: "/images/leader-graham.png",
    linkedin: "https://www.linkedin.com/in/grahamstalbot/",
    bio: "Graham co-founded Wetstone after 40 years in the energy and shipping industries. He was the CFO at Maersk Energy, Abu Dhabi Power, and Seaspan after two decades at Shell, working globally.",
  },
  {
    name: "Sahil Abbi",
    role: "Co-Chief Executive Officer",
    photo: "/images/leader-sahil.png",
    linkedin: "https://www.linkedin.com/in/sahilabbi/",
    bio: "Sahil co-founded Wetstone after starting his career at Jane Street Capital and Bridgewater Associates. Sahil holds an AB from Dartmouth College.",
  },
  {
    name: "Carl Nordberg",
    role: "Chief Financial Officer",
    photo: "/images/leader-carl.png",
    linkedin: "https://www.linkedin.com/in/carl-nordberg-99b40659/",
    bio: "Carl joined Wetstone after 23 years in Energy and Natural Resources investment banking at Morgan Stanley. He received an MBA from Duke’s Fuqua School of Business.",
  },
  {
    name: "Michael Lodge",
    role: "VP, Regulatory Affairs",
    photo: "/images/leader-michael.jpg",
    linkedin: undefined,
    bio: "Michael joined Wetstone after two terms as the Secretary General of the International Seabed Authority, from 2017 to 2024. Before that, he helped to establish the Western and Central Pacific Fisheries Commission and served as a Magistrate in the Solomon Islands and a lawyer in Kiribati.",
  },
  {
    name: "Josh Broussard",
    role: "VP, Exploration",
    photo: "/images/leader-josh.png",
    linkedin: "https://www.linkedin.com/in/josh-broussard-b0879113/",
    bio: "Before Wetstone, Josh was the co-founder and CTO of Ocean Infinity for 10 years. There, he built one of the largest fleets of autonomous oceangoing vessels in the world.",
  },
  {
    name: "Nick Murlo",
    role: "VP, Engineering",
    photo: "/images/leader-nick.png",
    linkedin: "https://www.linkedin.com/in/nick-murlo/",
    bio: "Nick Murlo spent years at ExxonMobil and XTO scaling new kinds of energy production, from deepwater wells off icebreakers in the Arctic to fracking. After 3 years at McKinsey, Nick joined Newmont Corporation. Nick holds an SB from MIT and an MBA from Harvard Business School.",
  },
  {
    name: "Kevin Benton",
    role: "VP, Software",
    photo: "/images/leader-kevin.png",
    linkedin: "https://www.linkedin.com/in/ktbenton/",
    bio: "Kevin Benton joined Wetstone from Anduril, where he was a Director, and SpaceX, where he was a Senior Manager. He holds a PhD from Indiana University.",
  },
  {
    name: "David Sacks",
    role: "VP, Software",
    photo: "/images/leader-david.jpg",
    linkedin: "https://www.linkedin.com/in/davidrsacks/",
    bio: "David Sacks joined Wetstone from Anduril, where he was a Senior Manager, and SpaceX, where he was a manager.",
  },
  {
    name: "Jen Dupont",
    role: "VP, Sustainability",
    photo: "/images/leader-jen.jpg",
    linkedin: "https://www.linkedin.com/in/jdupont15/",
    bio: "Jen is a marine scientist who started her career at NOAA before spending a decade as a researcher and sustainability advisor at ExxonMobil. She joined Wetstone from Equinor, where she was the Director of Permitting and Environmental Affairs, focused on developing a portfolio of offshore renewables. Jen holds a PhD in Marine Science from the University of South Florida and an MA from the Johns Hopkins School of Advanced International Studies.",
  },
  {
    name: "Dan Worrall",
    role: "VP, Corporate Affairs",
    photo: "/images/leader-dan.jpg",
    linkedin: "https://www.linkedin.com/in/danielworrall/",
    bio: "Dan served as Fortescue’s Global Head of Government Relations, Rio Tinto’s VP Commercial in Singapore, Rio Tinto’s CEO in Mongolia, ExxonMobil Chemical’s Group Head of Public Affairs, and ExxonMobil’s Head of Public Affairs for PNG LNG. He started his career at Shell and holds an MA in International Relations from Cambridge University.",
  },
  {
    name: "Lynda Nwike",
    role: "VP, Project Operations",
    photo: "/images/leader-lynda.png",
    linkedin: "https://www.linkedin.com/in/lyndanwike/",
    bio: "Lynda joined Wetstone from Tesla, where she led global cobalt and manganese strategy. Before that, she was an offshore engineer with Schlumberger and Shell. Lynda holds an MBA from Harvard Business School and an MPA from the Harvard Kennedy School where she was awarded a Fulbright Scholarship.",
  },
  {
    name: "Sumeet Trehan",
    role: "VP, AI and Applied Science",
    photo: "/images/leader-sumeet.jpg",
    linkedin: "https://www.linkedin.com/in/sumeettrehan/",
    bio: "Sumeet joined Wetstone from Vitol, where he led the trading firm’s AI efforts. Before that, he spent 9 years at ExxonMobil. He holds a PhD in Computational Energy Resource Engineering from Stanford University.",
  },
  {
    name: "Rich Frazier",
    role: "General Counsel",
    photo: "/images/leader-rich.png",
    linkedin: "https://www.linkedin.com/in/richard-frazier-01716092/",
    bio: "Rich was previously the deputy General Counsel at Total Energies. Rich holds a JD from the University of Chicago.",
  },
];

/** Investor logos: alpha masks displayed with bg-abyss fill. */
const INVESTORS = [
  { name: "Lightspeed", src: "/images/investor-2.png", w: 117, h: 59 },
  { name: "Lux Capital", src: "/images/investor-1.png", w: 53, h: 53 },
  { name: "StepStone", src: "/images/investor-4.png", w: 134, h: 27 },
  { name: "Trust Ventures", src: "/images/investor-5.png", w: 91, h: 53 },
  { name: "Lachy Groom", text: true },
  { name: "ICONIQ", src: "/images/investor-3.png", w: 110, h: 37 },
  { name: "Ravelin", src: "/images/investor-ravelin.svg", w: 110, h: 25 },
  { name: "Interlagos", src: "/images/investor-7.png", w: 140, h: 31 },
  { name: "8VC", src: "/images/investor-8vc.png", w: 76, h: 38, flat: true },
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
              Bringing together the best of technology, resource development, exploration, international governance, and environmental management
            </p>
          </div>
          <Button href="https://www.linkedin.com/company/wetstoneglobal/" className="shrink-0 self-start xl:mb-2 xl:self-end">
            Find us on LinkedIn
          </Button>
        </Reveal>

        <ul className="mt-[50px] grid gap-[50px] sm:grid-cols-2 lg:mt-5 lg:grid-cols-3 lg:gap-x-[59px] lg:gap-y-[42px] leaders-grid">
          {LEADERS.map((leader, i) => {
            const photoEl = (
              <div className="relative aspect-[392/445] overflow-hidden bg-[#c3c3c3]">
                {leader.photo && (
                  <Reveal variant="image" delay={(i % 3) * 120} className="absolute inset-0">
                    <ExportedImage placeholder="empty" src={leader.photo} alt={`Portrait of ${leader.name}`} fill sizes="(min-width: 1920px) 420px, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover object-top" />
                  </Reveal>
                )}
              </div>
            );
            return (
              <li key={leader.name} className="flex flex-col">
                {leader.linkedin ? (
                  <a href={leader.linkedin} target="_blank" rel="noreferrer" className="block">
                    {photoEl}
                  </a>
                ) : photoEl}
                <Reveal delay={(i % 3) * 120 + 150}>
                  {leader.linkedin ? (
                    <a href={leader.linkedin} target="_blank" rel="noreferrer" className="hover:underline decoration-black/40 underline-offset-2">
                      <h3 className="mt-[14px] text-[26px] font-semibold leading-[1.1] tracking-[-0.03em] text-black lg:text-[30px]">{leader.name}</h3>
                    </a>
                  ) : (
                    <h3 className="mt-[14px] text-[26px] font-semibold leading-[1.1] tracking-[-0.03em] text-black lg:text-[30px]">{leader.name}</h3>
                  )}
                  <p className="mt-[14px] text-[20px] font-normal leading-[1.1] tracking-[-0.03em] text-black">{leader.role}</p>
                  <p className="mt-[14px] text-[16px] font-light leading-[1.47] text-black">{leader.bio}</p>
                </Reveal>
              </li>
            );
          })}
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
              <li key={inv.name} className="flex h-[80px] w-1/3 items-center justify-center px-3 lg:w-1/5">
                {"text" in inv ? (
                  <span className="whitespace-nowrap text-[17px] font-medium leading-none tracking-[-0.02em] text-abyss">{inv.name}</span>
                ) : "flat" in inv ? (
                  <ExportedImage placeholder="empty" src={inv.src} alt={inv.name} width={inv.w} height={inv.h} className="max-w-full" />
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
