import Link from "next/link";
import Image from "next/image";

/* Services as tall photo tiles with the name over the photo ("Modelo A").
   One real photo per service instead of eight cards with the same icon. */
export interface ServiceTile {
  href: string;
  title: string;
  image: string;
  blurb?: string;
}

export default function ServiceTiles({ items, columns = 4 }: { items: ServiceTile[]; columns?: 3 | 4 }) {
  return (
    <div className={`grid grid-cols-2 gap-2.5 sm:gap-4 ${columns === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}>
      {items.map((s) => (
        <Link
          key={s.href}
          href={s.href}
          className="group relative block aspect-[3/4] overflow-hidden rounded-xl text-white"
        >
          <Image
            src={s.image}
            alt=""
            fill
            sizes="(max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent px-3.5 pb-4 pt-16 sm:px-5 sm:pb-5">
            <h3 className="text-[1.02rem] font-extrabold leading-tight sm:text-xl">{s.title}</h3>
            {s.blurb ? (
              <p className="mt-2 text-sm leading-snug text-white/85 line-clamp-3 max-lg:hidden">{s.blurb}</p>
            ) : null}
            <span className="mt-3 inline-block border-b-2 border-[#E00000] pb-0.5 text-sm font-bold">
              Learn more →
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
