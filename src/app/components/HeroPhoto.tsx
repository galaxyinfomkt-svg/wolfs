import { getImageProps } from "next/image";

/* The hero photo has one job: show the house, so the visitor sees the quality
   of the work before reading a word. The headline always sits ON the photo.
   - phone / tablet: a dedicated 5:4 crop where the house fills the frame (no
     band of empty sky); the text sits on the lower third, over a fade to black
     that only darkens the ground;
   - desktop: the full photo, with the dark only behind the headline (left side).
   Art direction is done with <picture>, so each device downloads one image. */

export interface HeroImage {
  /** desktop, full frame (4:3, 1800px) */
  src: string;
  /** phone/tablet crop (5:4, 1100px) */
  mobileSrc: string;
  alt: string;
  /** desktop object-position, e.g. "50% 55%" */
  position?: string;
}

export const HERO_PHOTOS: HeroImage[] = [
  {
    src: "/projects/board-and-batten-cabin-washington-nh/washington-nh-charcoal-board-and-batten-cabin-01.jpg",
    mobileSrc: "/hero/washington-nh-charcoal-cabin-red-roof-mobile.jpg",
    alt: "Charcoal board and batten cabin with a red roof and covered porch, sided by Wolf's Siding in Washington, NH",
    position: "50% 8%",
  },
  {
    src: "/projects/craftsman-home-grafton-ma/grafton-ma-craftsman-light-gray-lap-siding-05.jpg",
    mobileSrc: "/hero/grafton-ma-craftsman-stone-column-porch-mobile.jpg",
    alt: "Craftsman home with a two-level porch and stone columns, sided by Wolf's Siding in Grafton, MA",
    position: "50% 8%",
  },
  {
    src: "/projects/board-and-batten-cabin-washington-nh/washington-nh-charcoal-board-and-batten-cabin-02.jpg",
    mobileSrc: "/hero/washington-nh-charcoal-cabin-deck-mobile.jpg",
    alt: "Charcoal board and batten cabin with a raised deck, sided by Wolf's Siding in Washington, NH",
    position: "50% 8%",
  },
];

/** Same photo for the same page on every build; different pages get different photos. */
export function heroFor(key: string): HeroImage {
  let h = 0;
  for (let i = 0; i < key.length; i++) h = (h * 31 + key.charCodeAt(i)) >>> 0;
  return HERO_PHOTOS[h % HERO_PHOTOS.length];
}

export default function HeroPhoto({ image }: { image: HeroImage }) {
  const common = { alt: image.alt, fill: true, priority: true, quality: 72 } as const;
  const {
    props: { srcSet: desktop },
  } = getImageProps({ ...common, src: image.src, sizes: "100vw" });
  const {
    props: { srcSet: mobile, ...rest },
  } = getImageProps({ ...common, src: image.mobileSrc, sizes: "100vw" });

  return (
    <div className="absolute inset-x-0 top-[110px] h-[80vw] sm:h-[62.5vw] lg:inset-0 lg:top-0 lg:h-auto">
      <picture>
        <source media="(min-width: 1024px)" srcSet={desktop} />
        <source media="(max-width: 1023px)" srcSet={mobile} />
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <img {...rest} className="object-cover" style={{ ...rest.style, objectPosition: image.position ?? "50% 50%" }} />
      </picture>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,17,17,0)_0%,rgba(17,17,17,.12)_20%,rgba(17,17,17,.5)_38%,rgba(17,17,17,.72)_62%,rgba(17,17,17,.92)_85%,#111_100%)] sm:bg-[linear-gradient(180deg,rgba(17,17,17,0)_0%,rgba(17,17,17,0)_42%,rgba(17,17,17,.6)_64%,rgba(17,17,17,.92)_84%,#111_100%)] lg:hidden" />
      <div className="absolute inset-0 hidden bg-[linear-gradient(90deg,rgba(10,10,10,.8)_0%,rgba(10,10,10,.55)_27%,rgba(10,10,10,.1)_45%,rgba(10,10,10,0)_56%)] lg:block" />
    </div>
  );
}
