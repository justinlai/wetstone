import ExportedImage from "next-image-export-optimizer";
import { Button } from "@/components/Button";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { DepthIntro } from "@/components/home/DepthIntro";
import { HeroSweep } from "@/components/home/HeroSweep";
import { ValueChain } from "@/components/home/ValueChain";

export default function HomePage() {
  return (
    <>
      <HeroSweep />
      <DepthIntro />
      <ValueChain />

      {/* "A team built for a hard problem": headline + button on the left, photo on the right (Figma 539:48120). */}
      <section className="bg-white px-[25px] py-[50px] lg:flex lg:items-center lg:justify-end lg:gap-[88px] lg:px-(--gutter) lg:py-[102px]">
        <Reveal className="flex flex-col items-start gap-[27px] lg:gap-[19px]">
          <h2 className="max-w-[408px] text-[34px] lg:max-w-[560px] font-medium leading-[1.1] tracking-[-0.03em] text-navy lg:text-[64px]">
            Deep experience, dynamically harnessed.
          </h2>
          <Button href="/about#leadership">Explore the team</Button>
        </Reveal>
        <div data-nav-theme="dark" className="relative mt-[50px] aspect-[699/528] overflow-hidden bg-[#767676] lg:mt-0 lg:w-[48.5vw] lg:shrink-0">
          <Reveal variant="image" className="absolute inset-0">
            <ExportedImage
              placeholder="empty"
              src="/images/team-control-room.jpg"
              alt="Operators at the controls of a remotely operated vehicle"
              fill
              sizes="(min-width: 1024px) 49vw, 100vw"
              className="object-cover"
              style={{ objectPosition: "50% 60%" }}
            />
          </Reveal>
        </div>
      </section>

      <Footer />
    </>
  );
}
