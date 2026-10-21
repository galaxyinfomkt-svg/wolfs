import Image from "next/image";

/* The hero photo has one job: show the house, so the visitor sees the quality
   of the work before reading a word.
   - phone: the photo sits on its own, full and bright, above the text;
   - desktop: full-bleed, with the dark only behind the headline (left third),
     so the house stays visible.
   Photos are real Wolf's jobs with a full house and a clear sky. */

export interface HeroImage {
  src: string;
  alt: string;
  /** object-position on desktop, e.g. "object-[60%_55%]" */
  position?: string;
}

const G = "/projects/craftsman-home-grafton-ma/grafton-ma-craftsman-light-gray-lap-siding";

export const HERO_PHOTOS: HeroImage[] = [
  { src: `${G}-01.jpg`, alt: "Craftsman home with light gray lap siding, white trim and a stone base by Wolf's Siding in Grafton, MA", position: "lg:object-[70%_60%]" },
  { src: `${G}-02.jpg`, alt: "Front of a craftsman home with a triple garage, sided by Wolf's Siding in Grafton, MA", position: "lg:object-[62%_70%]" },
  { src: `${G}-03.jpg`, alt: "Craftsman home with front gables and a timber pergola, sided by Wolf's Siding in Grafton, MA", position: "lg:object-[70%_60%]" },
  { src: `${G}-05.jpg`, alt: "Rear porch with stone columns on a craftsman home sided by Wolf's Siding in Grafton, MA", position: "lg:object-[62%_55%]" },
];

/** Same photo for the same page on every build; different pages get different photos. */
export function heroFor(key: string): HeroImage {
  let h = 0;
  for (let i = 0; i < key.length; i++) h = (h * 31 + key.charCodeAt(i)) >>> 0;
  return HERO_PHOTOS[h % HERO_PHOTOS.length];
}

export default function HeroPhoto({ image }: { image: HeroImage }) {
  return (
    <div className="relative aspect-[4/3] sm:aspect-[16/9] lg:absolute lg:inset-0 lg:aspect-auto">
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority
        sizes="100vw"
        quality={70}
        className={`object-cover object-center ${image.position ?? ""}`}
      />
      <div className="absolute inset-0 hidden bg-[linear-gradient(90deg,rgba(10,10,10,.8)_0%,rgba(10,10,10,.55)_27%,rgba(10,10,10,.1)_45%,rgba(10,10,10,0)_56%)] lg:block" />
    </div>
  );
}
