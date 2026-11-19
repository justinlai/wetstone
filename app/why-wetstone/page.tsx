import type { Metadata } from "next";
import ExportedImage from "next-image-export-optimizer";
import { Button } from "@/components/Button";
import { Footer } from "@/components/Footer";
import { FullBleedImage } from "@/components/FullBleedImage";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { SplitFeature } from "@/components/SplitFeature";

export const metadata: Metadata = {
  title: "Why Wetstone",
  description: "The world needs more rocks. The ocean is the best source.",
};

const CASES = [
  {
    title: "The ocean is inevitable",
    body: "Long timelines and high CapEx costs have caused structural underinvestment in new land mines. Rocks under the ocean are higher grade, easier to find, and cheaper to develop into producing assets.",
    image: { src: "/images/case-inevitable.jpg", alt: "Surf breaking over deep blue water", position: "50% 40%" },
  },
  {
    title: "The ocean is scalable",
    body: "Because our operations float, Wetstone can run environmental baselining, exploration, and development across many sites at once, rather than doing each step incrementally to dig a giant, immovable hole in the ground.",
    image: { src: "/images/case-scalable.jpg", alt: "Survey monitors in a vessel control room", position: "50% 50%" },
  },
  {
    title: "The ocean is sustainable",
    body: "Targeting specific areas with higher metal grades means a much smaller footprint than traditional metals and mining operations. Floating operations allow for dynamic response to environmental stress.",
    image: { src: "/images/case-sustainable.jpg", alt: "Polymetallic nodules resting on the seafloor", position: "45% 50%" },
  },
];

export default function WhyWetstonePage() {
  return (
    <>
      <PageHero
        eyebrow="Our mission"
        title="The world needs more minerals, the seafloor is the best source"
        image={{ src: "/images/why-map-2x.jpg", alt: "Relief map of the world’s ocean floor", objectPosition: "50% 50%" }}
        imageHeightClass="h-[339px] lg:h-[484px]"
      />

      {/* The case for the ocean: three cards reveal with a stagger. */}
      <section className="bg-white px-[25px] pt-[60px] pb-[60px] lg:px-(--gutter) lg:pt-[95px] lg:pb-[100px]">
        <ul className="grid gap-[50px] lg:grid-cols-3 lg:gap-[40px] lg:px-0">
          {CASES.map((item, i) => (
            <li key={item.title} className="flex flex-col">
              <div data-nav-theme="dark" className="relative h-[260px] overflow-hidden lg:h-[362px]">
                <Reveal variant="image" delay={i * 150} className="absolute inset-0">
                  <ExportedImage placeholder="empty" src={item.image.src} alt={item.image.alt} fill sizes="(min-width: 1024px) 424px, 100vw" className="object-cover" style={{ objectPosition: item.image.position }} />
                </Reveal>
              </div>
              <Reveal delay={i * 150 + 200}>
                <h3 className="mt-[18px] text-[22px] font-semibold leading-[1.1] tracking-[-0.03em] text-black lg:mt-[22px] lg:text-[30px]">{item.title}</h3>
                <p className="mt-3 text-[15px] font-light leading-[1.5] tracking-[-0.01em] text-black lg:mt-[22px] lg:text-[18px] lg:tracking-[-0.03em]">
                  {item.body}
                </p>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      <FullBleedImage
        src="/images/copper-2x.jpg"
        alt="Close-up of polished copper ribbons"
        heightClass="h-[201px] lg:h-[448px]"
        className="bg-[#555]"
      />

      <SplitFeature
        heading="A new terrestrial mine takes 20 years to build. Wetstone is building bigger, better mines in 5."
        headingClassName="text-[34px] leading-[1.1] tracking-[-0.03em] text-black lg:max-w-[1124px] lg:text-[64px]"
        image={{ src: "/images/boat-deck.jpg", alt: "Crew on deck of a research vessel at sea", objectPosition: "50% 50%" }}
        imageWidth={842}
        imageHeightClass="h-[278px] lg:h-[600px]"
        rowGapClass="lg:mt-[134px]"
        bodyClassName="lg:pl-[61px]"
      >
        <div className="space-y-[30px] text-[19px] font-light leading-[30px] tracking-[-0.01em] text-black lg:text-[18px]">
          <p>
            The IEA’s 2025 outlook projects a 30% copper shortfall by 2035, and other metals are similarly stretched. New mines add supply but don’t scale the industry. Wetstone’s floating mines do both
          </p>
        </div>
        <Button href="/who-we-are" className="mt-[27px] self-start">
          About Us
        </Button>
      </SplitFeature>
      <div className="lg:h-[36px]" />
      <Footer />
    </>
  );
}
