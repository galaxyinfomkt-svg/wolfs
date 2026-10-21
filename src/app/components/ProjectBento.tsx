import Image from "next/image";
import Link from "next/link";

/* Real job-site photos in a bento: one large photo and four smaller ones
   ("Modelo A"). Captions describe the work only — no city is claimed for a
   photo unless the owner has confirmed where the job was. */
export interface BentoPhoto {
  src: string;
  caption: string;
  place?: string;
  href?: string;
}

/* Job-site photos (cleaned of the original house GPS, geotagged to the town centre). */
export const LOCAL_WORK_PHOTOS: BentoPhoto[] = [
  { src: "/projects/craftsman-ranch/lancaster-ma-craftsman-ranch-fiber-cement-siding-01.jpg", caption: "Fiber cement craftsman ranch", place: "Lancaster, MA", href: "/projects/craftsman-ranch" },
  { src: "/projects/gray-cape-cod/boston-ma-gray-cape-cod-vinyl-siding-01.jpg", caption: "Gray vinyl Cape Cod", place: "Boston, MA", href: "/projects/gray-cape-cod" },
  { src: "/projects/navy-blue-colonial/grafton-ma-navy-blue-colonial-vinyl-siding-01.jpg", caption: "Navy blue colonial", place: "Grafton, MA", href: "/projects/navy-blue-colonial" },
  { src: "/projects/upscale-gray-colonial/milton-ma-gray-colonial-siding-01.jpg", caption: "Gray colonial", place: "Milton, MA", href: "/projects/upscale-gray-colonial" },
  { src: "/projects/burgundy-barn/grafton-ma-burgundy-board-and-batten-barn-01.jpg", caption: "Burgundy board & batten", place: "Grafton, MA", href: "/projects/burgundy-barn" },
];

export default function ProjectBento({ photos }: { photos: BentoPhoto[] }) {
  return (
    <div className="grid grid-cols-2 gap-2.5 sm:gap-4 lg:grid-cols-[2fr_1fr_1fr] lg:grid-rows-[230px_230px]">
      {photos.slice(0, 5).map((p, i) => (
        <figure
          key={p.src}
          className={`relative m-0 overflow-hidden rounded-xl ${
            i === 0 ? "col-span-2 aspect-[4/3] lg:col-span-1 lg:row-span-2 lg:aspect-auto" : "aspect-square lg:aspect-auto"
          }`}
        >
          {p.href ? <Link href={p.href} className="absolute inset-0 z-10" aria-label={`${p.caption}${p.place ? `, ${p.place}` : ""} — see the project`} /> : null}
          <Image
            src={p.src}
            alt={p.place ? `${p.caption}, ${p.place}` : p.caption}
            fill
            sizes={i === 0 ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 1024px) 50vw, 25vw"}
            className="object-cover"
          />
          <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent px-4 pb-3 pt-10 text-sm font-bold text-white">
            {p.caption}
            {p.place ? <span className="block text-xs font-medium text-white/80">{p.place}</span> : null}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
