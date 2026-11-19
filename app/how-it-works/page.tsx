import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { FullBleedImage } from "@/components/FullBleedImage";
import { PageHero } from "@/components/PageHero";
import { HowWeDoIt } from "@/components/how/HowWeDoIt";

export const metadata: Metadata = {
  title: "How it works",
  description: "Wetstone is building the operating system that scales undersea minerals.",
};

export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        eyebrow="How we work"
        title="Wetstone is building the operating system to scale seafloor mining"
        image={{ src: "/images/seafloor-grid.jpg", alt: "Polymetallic nodules on the seafloor under a survey grid", objectPosition: "50% 45%" }}
      />


      <HowWeDoIt />

      {/* Pulled up over the empty end of the pinned section: 88px above the photo, and 40px + the
          footer's 48px below it. */}
      <div className="relative bg-deep pb-10 lg:mt-[max(calc(761px-100svh),-59px)]">
        <FullBleedImage
          src="/images/nodules-tray.jpg"
          alt="Polymetallic nodules drying on a tray"
          objectPosition="50% 50%"
          heightClass="h-[210px] lg:h-[448px]"
          className="bg-deep"
          inset
        />
      </div>
      <Footer />
    </>
  );
}
