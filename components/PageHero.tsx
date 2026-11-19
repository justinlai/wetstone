import ExportedImage from "next-image-export-optimizer";
import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

type Props = {
  eyebrow: string;
  /** Optional: About shows the eyebrow alone. */
  title?: ReactNode;
  titleClassName?: string;
  image: { src: string; alt: string; objectPosition?: string };
  /** Mobile image is always full-bleed; desktop sits inside the page gutter. */
  imageHeightClass?: string;
};

/** Inner-page hero: eyebrow + headline, then a wide image with the standard reveal (no parallax). */
export function PageHero({ eyebrow, title, titleClassName = "lg:max-w-[890px]", image, imageHeightClass = "h-[339px] lg:h-[569px]" }: Props) {
  return (
    <section className="bg-white pt-[144px] lg:pt-[200px]">
      <Reveal className="px-[25px] lg:px-(--gutter)">
        <p className="text-[19px] font-medium uppercase leading-[30px] tracking-[-0.01em] text-navy lg:text-[24px] lg:leading-[1.1] lg:tracking-[-0.03em]">
          {eyebrow}
        </p>
        {title && (
          <h1
            className={`mt-4 text-[40px] font-semibold leading-[1.1] tracking-[-0.03em] text-navy lg:mt-[23px] lg:text-[64px] ${titleClassName}`}
          >
            {title}
          </h1>
        )}
      </Reveal>
      <div data-nav-theme="dark" className={`relative mt-[30px] overflow-hidden bg-[#002247] lg:mx-(--gutter) lg:mt-[52px] ${imageHeightClass}`}>
        <Reveal variant="image" delay={150} className="absolute inset-0">
          <ExportedImage placeholder="empty" src={image.src} alt={image.alt} fill preload sizes="(min-width: 1024px) 1394px, 100vw" className="object-cover" style={{ objectPosition: image.objectPosition }} />
        </Reveal>
      </div>
    </section>
  );
}
