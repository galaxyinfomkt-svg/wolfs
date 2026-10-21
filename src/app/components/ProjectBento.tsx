import Image from "next/image";

/* Real job-site photos in a bento: one large photo and four smaller ones
   ("Modelo A"). Captions describe the work only — no city is claimed for a
   photo unless the owner has confirmed where the job was. */
export interface BentoPhoto {
  src: string;
  caption: string;
  place?: string;
}

/* Job-site photos already published on the site (GHL media library). */
export const LOCAL_WORK_PHOTOS: BentoPhoto[] = [
  { src: "https://assets.cdn.filesafe.space/BCczy6muFwhd63dPhKCC/media/69975e32181715caeea6e9c1.jpg", caption: "Hardie Plank siding project" },
  { src: "https://assets.cdn.filesafe.space/BCczy6muFwhd63dPhKCC/media/69975e328d5b5a3f718385bf.jpg", caption: "Gray vinyl siding on a Cape" },
  { src: "https://assets.cdn.filesafe.space/BCczy6muFwhd63dPhKCC/media/69975e324c2502c5f69917b6.jpg", caption: "Navy blue colonial" },
  { src: "https://assets.cdn.filesafe.space/BCczy6muFwhd63dPhKCC/media/69975e328523c5f2c4d090c0.jpg", caption: "Gray colonial re-side" },
  { src: "https://assets.cdn.filesafe.space/BCczy6muFwhd63dPhKCC/media/69975e3220c0353f100e2671.jpg", caption: "Board and batten siding" },
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
          <Image
            src={p.src}
            alt={p.caption}
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
