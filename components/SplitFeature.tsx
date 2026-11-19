import ExportedImage from "next-image-export-optimizer";
import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

type Props = {
  heading: ReactNode;
  headingClassName?: string;
  image: { src: string; alt: string; objectPosition?: string };
  /** Desktop image width in the 1440 artboard (742 on Home, 842 on Why Wetstone). */
  imageWidth: 742 | 842;
  imageHeightClass: string;
  children: ReactNode;
  bodyClassName?: string;
  /** Desktop gap between headline and the photo row. */
  rowGapClass?: string;
};

/**
 * Headline over a photo/text split (Home "A team built for a hard problem",
 * Why Wetstone "17 years / 5 years"). Image uses the standard reveal, text fades up staggered.
 * The photo sits inside the page gutter so its left edge lines up with the headline.
 * On mobile the text comes first and the photo sits underneath.
 */
export function SplitFeature({ heading, headingClassName = "", image, imageWidth, imageHeightClass, children, bodyClassName = "", rowGapClass = "lg:mt-[74px]" }: Props) {
  return (
    <section className="bg-white pt-[50px] pb-[50px] lg:pt-[96px] lg:pb-0">
      <div className="flex flex-col lg:block">
        <Reveal className="px-[25px] lg:px-(--gutter)">
          <h2 className={headingClassName}>{heading}</h2>
        </Reveal>

        <div className={`mt-[27px] flex flex-col-reverse lg:flex-row ${rowGapClass} lg:items-center lg:justify-between`}>
          <div
            data-nav-theme="dark"
            className={`relative mx-[25px] mt-[50px] shrink-0 overflow-hidden bg-[#767676] lg:mt-0 lg:ml-(--gutter) lg:mr-0 ${imageHeightClass} ${imageWidth === 742 ? "lg:w-[calc(51.5%-var(--gutter))]" : "lg:w-[calc(58.5%-var(--gutter))]"}`}
          >
            <Reveal variant="image" className="absolute inset-0">
              <ExportedImage placeholder="empty" src={image.src} alt={image.alt} fill sizes={`(min-width: 1024px) ${imageWidth}px, 100vw`} className="object-cover" style={{ objectPosition: image.objectPosition }} />
            </Reveal>
          </div>
          <Reveal delay={150} className={`px-[25px] lg:flex lg:h-[600px] lg:flex-1 lg:flex-col lg:justify-center lg:pr-(--gutter) ${bodyClassName}`}>
            {children}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
