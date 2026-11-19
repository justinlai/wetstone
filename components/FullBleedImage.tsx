import ExportedImage from "next-image-export-optimizer";
import { Parallax } from "./Parallax";
import { Reveal } from "./Reveal";

type Props = {
  src: string;
  alt: string;
  /** Tailwind height classes, e.g. "h-[280px] lg:h-[732px]". */
  heightClass: string;
  objectPosition?: string;
  className?: string;
  /** Inset the photo by the page gutter (matching the nav bar and footer) instead of running edge to edge. */
  inset?: boolean;
};

/** Full-bleed photo: reveal (fade + settle from zoom) plus desktop-only parallax. */
export function FullBleedImage({ src, alt, heightClass, objectPosition = "50% 50%", className = "", inset = false }: Props) {
  return (
    <section data-nav-theme="dark" className={`relative overflow-hidden ${inset ? "mx-5 lg:mx-(--gutter)" : ""} ${heightClass} ${className}`}>
      <Parallax>
        <Reveal variant="image" className="absolute inset-0">
          <ExportedImage placeholder="empty" src={src} alt={alt} fill sizes="100vw" className="object-cover" style={{ objectPosition }} />
        </Reveal>
      </Parallax>
    </section>
  );
}
