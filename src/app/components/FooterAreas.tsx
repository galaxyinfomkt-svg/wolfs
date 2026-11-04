import Link from "next/link";
import { CITIES, getRegionLabel } from "../data/cities";

export const regionSlug = (r: string) => r.toLowerCase().replace(/[^a-z]+/g, "-");

/* Footer service-area strip. It used to list all 109 towns on every page —
   ~30 KB of HTML + RSC payload per URL, 109 tiny tap targets, and a
   sitewide block of town links that reads like a doorway index. Now it
   links the regions to the /service-areas hub, which lists every town. */
export default function FooterAreas() {
  const regions = Array.from(new Set(CITIES.map((c) => c.region)));
  return (
    <div className="border-t border-white/10">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <h3 className="mb-4 text-center text-sm font-bold uppercase tracking-wider text-[#FF6B6B]">
          Service areas — {CITIES.length} Massachusetts towns
        </h3>
        <ul className="flex flex-wrap justify-center gap-x-2 gap-y-2">
          {regions.map((r) => (
            <li key={r}>
              <Link
                href={`/service-areas#${regionSlug(r)}`}
                className="inline-block rounded-full border border-white/20 px-4 py-2 text-sm text-white/80 transition-colors hover:border-[#FF6B6B] hover:text-white"
              >
                {getRegionLabel(r)} ({CITIES.filter((c) => c.region === r).length})
              </Link>
            </li>
          ))}
          <li>
            <Link href="/service-areas" className="inline-block rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/20">
              All towns →
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
