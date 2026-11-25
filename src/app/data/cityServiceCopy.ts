/* ═══════════════════════════════════════════════════════════════════════
   CITY × SERVICE COPY — the body written for ONE town and ONE service.

   Why (Search Console, Nov 2026): ~840 of the 981 city × service pages were
   "Crawled / Discovered - currently not indexed". Measured on the live site,
   only ~19% of each page's text was its own: the rest repeated the town page
   (one rotated paragraph of the town story, the housing profile, photos,
   the permit FAQ) or the town's other eight service pages. Google kept the
   town page and the statewide service page and dropped the rest.

   Each entry here is written from that town's sourced research
   (src/data/cityStories.json, cityProfiles.ts, Census housing numbers) for
   that service only, and replaces the copied story paragraph on the page.
   Rules the copy was checked against: no number that is not in the town's
   research, no 6-word run copied from the town story, and little shared
   phrasing with the town's other services or with other towns.
   ═══════════════════════════════════════════════════════════════════════ */

import copyJson from "../../data/cityServiceCopy.json";

export interface CityServiceCopy {
  body: string[];
  faq: { q: string; a: string };
}

const COPY = copyJson as Record<string, Record<string, CityServiceCopy>>;

export function cityServiceCopy(citySlug: string, serviceSlug: string): CityServiceCopy | null {
  return COPY[citySlug]?.[serviceSlug] ?? null;
}
