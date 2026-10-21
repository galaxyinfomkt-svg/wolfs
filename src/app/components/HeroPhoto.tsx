import Image from "next/image";

/* The hero photo has one job: show the house, so the visitor sees the quality
   of the work before reading a word. The headline always sits ON the photo.
   - phone (4:5) and tablet (16:10): the house fills the top of the frame and
     stays clean; the text sits on the lower part, over a fade to black that
     only darkens the lawn and driveway;
   - desktop: full-bleed, with the dark only behind the headline (left side).
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
    <div className="absolute inset-x-0 top-[110px] aspect-[4/5] sm:aspect-[16/10] lg:inset-0 lg:top-0 lg:aspect-auto">
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority
        sizes="100vw"
        quality={70}
        className={`object-cover object-center ${image.position ?? ""}`}
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,17,17,0)_0%,rgba(17,17,17,0)_34%,rgba(17,17,17,.55)_56%,rgba(17,17,17,.88)_76%,#111_100%)] lg:hidden" />
      <div className="absolute inset-0 hidden bg-[linear-gradient(90deg,rgba(10,10,10,.8)_0%,rgba(10,10,10,.55)_27%,rgba(10,10,10,.1)_45%,rgba(10,10,10,0)_56%)] lg:block" />
    </div>
  );
}
