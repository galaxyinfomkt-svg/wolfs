/* ═══════════════════════════════════════════════════════════════════════
   NEAREST REAL WORK — the Wolf's jobs closest to a given town.

   Replaces the fixed "Our Work in {region}" photo set, which showed the same
   Lancaster / Boston / Grafton / Milton jobs on every city page — including
   North Shore pages, where none of those towns are. Here every photo is a
   real portfolio job, captioned with the town it is actually in and its
   measured distance from the page's town. Nothing is presented as a job in
   the page's own town unless it is one.
   ═══════════════════════════════════════════════════════════════════════ */

import { PORTFOLIO } from "./portfolio";
import { milesBetween } from "./cityGeo";
import type { BentoPhoto } from "../components/ProjectBento";

export interface NearbyJob extends BentoPhoto {
  miles: number;
  citySlug: string;
}

export function nearestWork(citySlug: string, count = 5): NearbyJob[] {
  return PORTFOLIO.filter((c) => c.state === "MA" && c.citySlug && c.photos.length > 0)
    .map((c): NearbyJob | null => {
      const miles = milesBetween(citySlug, c.citySlug!);
      return miles === null
        ? null
        : {
            src: c.photos[0].src,
            caption: c.title,
            place:
              c.citySlug === citySlug
                ? `${c.city}, MA`
                : `${c.city}, MA · ${miles} mi away`,
            href: `/projects/${c.slug}`,
            miles,
            citySlug: c.citySlug!,
          };
    })
    .filter((x): x is NearbyJob => x !== null)
    .sort((a, b) => a.miles - b.miles)
    .slice(0, count);
}
