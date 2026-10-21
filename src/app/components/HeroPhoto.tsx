import { getImageProps } from "next/image";

/* The hero photo fills the whole hero and the headline sits on top of it.
   - phone / tablet: a dedicated 2:3 portrait crop centred on the house, so the
     full-height background shows the house instead of a zoomed-in corner; an
     even dark wash keeps the text readable;
   - desktop: the full photo, with the dark only behind the headline (left side).
   Art direction is done with <picture>, so each device downloads one image. */

export interface HeroImage {
  /** desktop, full frame (4:3, 1800px) */
  src: string;
  /** phone/tablet portrait crop (2:3, 1000x1500) */
  mobileSrc: string;
  alt: string;
  /** desktop object-position as a Tailwind lg: class */
  desktopPosition: string;
}

export const HERO_PHOTOS: HeroImage[] = [
  {
    src: "/projects/board-and-batten-cabin-washington-nh/washington-nh-charcoal-board-and-batten-cabin-01.jpg",
    mobileSrc: "/hero/washington-nh-charcoal-cabin-red-roof-mobile.jpg",
    alt: "Charcoal board and batten cabin with a red roof and covered porch, sided by Wolf's Siding in Washington, NH",
    desktopPosition: "lg:object-[50%_8%]",
  },
  {
    src: "/projects/craftsman-home-grafton-ma/grafton-ma-craftsman-light-gray-lap-siding-05.jpg",
    mobileSrc: "/hero/grafton-ma-craftsman-stone-column-porch-mobile.jpg",
    alt: "Craftsman home with a two-level porch and stone columns, sided by Wolf's Siding in Grafton, MA",
    desktopPosition: "lg:object-[50%_8%]",
  },
  {
    src: "/projects/board-and-batten-cabin-washington-nh/washington-nh-charcoal-board-and-batten-cabin-02.jpg",
    mobileSrc: "/hero/washington-nh-charcoal-cabin-deck-mobile.jpg",
    alt: "Charcoal board and batten cabin with a raised deck, sided by Wolf's Siding in Washington, NH",
    desktopPosition: "lg:object-[50%_8%]",
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
    <div className="absolute inset-x-0 top-[110px] h-[calc(100svh-110px)] max-h-[860px] lg:inset-0 lg:top-0 lg:h-auto lg:max-h-none">
      <picture>
        <source media="(min-width: 1024px)" srcSet={desktop} />
        <source media="(max-width: 1023px)" srcSet={mobile} />
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <img {...rest} className={`object-cover object-[50%_30%] ${image.desktopPosition}`} style={{ ...rest.style }} />
      </picture>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,10,.58)_0%,rgba(10,10,10,.55)_40%,rgba(10,10,10,.72)_72%,#111_100%)] lg:hidden" />
      <div className="absolute inset-0 hidden bg-[linear-gradient(90deg,rgba(10,10,10,.8)_0%,rgba(10,10,10,.55)_27%,rgba(10,10,10,.1)_45%,rgba(10,10,10,0)_56%)] lg:block" />
    </div>
  );
}
