import Link from "next/link";
import { SERVICE_CATALOG } from "../../config/schema";
import { SERVICES } from "../data/cities";
import { VINYL_UPGRADES } from "../data/vinylUpgrades";

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
              s.path === "/services/vinyl-siding-installation" ? (
                /* Vinyl opens a side flyout with the upgrade options. */
                <li key={s.name} className="group/vinyl relative">
                  <Link href={serviceHref(s.path, citySlug)} className="flex items-center justify-between rounded-md px-2 py-1.5 text-sm font-medium text-[#333] hover:bg-[#E00000]/5 hover:text-[#E00000]">
                    {s.name}
                    <span className="ml-2 rounded bg-[#E00000]/10 px-1.5 py-0.5 text-[10px] font-bold uppercase text-[#C00000]">Upgrades ›</span>
                  </Link>
                  <div className="invisible absolute left-full top-0 z-50 pl-2 opacity-0 transition-all duration-150 group-hover/vinyl:visible group-hover/vinyl:opacity-100 group-focus-within/vinyl:visible group-focus-within/vinyl:opacity-100">
                    <div className="w-80 rounded-xl border border-gray-100 bg-white p-4 shadow-2xl">
                      <p className="mb-1 text-xs font-bold uppercase tracking-wider text-[#C00000]">Vinyl or an upgrade?</p>
                      <p className="mb-2 text-xs text-[#555]">Step up from vinyl to:</p>
                      <ul className="space-y-0.5">
                        {VINYL_UPGRADES.map((u) => (
                          <li key={u.path}>
                            <Link href={u.path} className="block rounded-md px-2 py-1.5 hover:bg-[#E00000]/5">
                              <span className="block text-sm font-semibold text-black">{u.name}</span>
                              <span className="block text-xs leading-snug text-[#555]">{u.note}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                      <Link href="/services/vinyl-siding-upgrades" className="mt-2 block rounded-md bg-[#F5F5F5] px-2 py-1.5 text-center text-xs font-bold text-black hover:bg-[#EEE]">
                        Compare vinyl and upgrades →
                      </Link>
                    </div>
                  </div>
                </li>
              ) : s.path ? (
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
