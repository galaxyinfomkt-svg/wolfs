import Link from "next/link";
import { SERVICE_CATALOG } from "../../config/schema";
import { SERVICES } from "../data/cities";

const CITY_LEVEL = new Set(SERVICES.map((s) => s.slug));

/** Where a catalog item should point: the town's own page when the service has
    city pages and we are inside a town, otherwise the statewide page. */
export function serviceHref(path: string, citySlug?: string) {
  const slug = path.split("/").pop()!;
  return citySlug && CITY_LEVEL.has(slug) ? `/${citySlug}/${slug}` : path;
}

/* Desktop "Services" dropdown: all 20 services, grouped. It used to list only
   the 8 city-level services, which left the 12 statewide service pages with
   no link from any menu. */
export default function ServicesMenu({ citySlug }: { citySlug?: string }) {
  return (
    <div className="grid w-[620px] grid-cols-2 gap-x-6 gap-y-4 rounded-xl border border-gray-100 bg-white p-5 shadow-xl">
      {SERVICE_CATALOG.map((g) => (
        <div key={g.group}>
          <p className="mb-1.5 text-xs font-bold uppercase tracking-wider text-[#C00000]">{g.group}</p>
          <ul className="space-y-0.5">
            {g.items.map((s) =>
              s.path ? (
                <li key={s.name}>
                  <Link href={serviceHref(s.path, citySlug)} className="block rounded-md px-2 py-1.5 text-sm font-medium text-[#333] hover:bg-[#E00000]/5 hover:text-[#E00000]">
                    {s.name}
                  </Link>
                </li>
              ) : null
            )}
          </ul>
        </div>
      ))}
      <Link href="/services" className="col-span-2 mt-1 rounded-lg bg-[#F5F5F5] px-3 py-2 text-center text-sm font-bold text-black hover:bg-[#EEE]">
        All services →
      </Link>
    </div>
  );
}
