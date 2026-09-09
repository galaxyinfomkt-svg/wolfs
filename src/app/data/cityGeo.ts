/* ═══════════════════════════════════════════════════════════════════════
   DERIVED GEOGRAPHY — everything the copy needs that can be COMPUTED.

   The rule this file enforces: a fact that can be calculated is never typed
   by hand. Distance from the shop, which towns are genuinely next door, and
   whether a town takes salt air all fall out of the coordinates in
   cityFacts.ts. That means they cannot contradict each other, cannot go
   stale when a town is added, and cannot be invented by a copywriter who
   needs one more sentence.

   Everything here is deterministic — no Math.random, no Date — so a page
   renders identically on every build.
   ═══════════════════════════════════════════════════════════════════════ */

import { CITY_FACTS, type County } from "./cityFacts";

const HQ_SLUG = "northborough";

/* Anchor points on the Massachusetts shoreline inside (or just beyond) the
   service area. Distance to the nearest one is what "salt air" means here —
   a real material consideration: airborne salt attacks fasteners and finish
   long before it touches the panel face. */
const COAST_ANCHORS: [number, number][] = [
  [42.34, -70.96], // Boston Harbor
  [42.28, -70.90], // Quincy Bay / Hull
  [42.25, -70.92], // Hingham / Weymouth Back River
  [42.44, -70.92], // Lynn Harbor / Nahant
  [42.53, -70.87], // Salem & Beverly harbours
];

const R_MILES = 3958.7613;

function haversineMiles(a: [number, number], b: [number, number]): number {
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(b[0] - a[0]);
  const dLng = toRad(b[1] - a[1]);
  const s =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(a[0])) * Math.cos(toRad(b[0])) * Math.sin(dLng / 2) ** 2;
  return 2 * R_MILES * Math.asin(Math.sqrt(s));
}

/** Miles from the Northborough shop, rounded to the nearest mile. */
export function milesFromHQ(slug: string): number | null {
  const c = CITY_FACTS[slug];
  const hq = CITY_FACTS[HQ_SLUG];
  if (!c || !hq) return null;
  return Math.round(haversineMiles(hq.coords, c.coords));
}

/** Miles to the nearest stretch of coast, rounded. */
export function milesFromCoast(slug: string): number | null {
  const c = CITY_FACTS[slug];
  if (!c) return null;
  return Math.round(
    Math.min(...COAST_ANCHORS.map((a) => haversineMiles(a, c.coords)))
  );
}

export type Exposure = "coastal" | "near-coastal" | "inland" | "upland";

/* Upland = the higher, colder interior west and north-west of Worcester,
   where snow load and a longer freeze-thaw season are the real story. Using
   latitude+longitude rather than a hand-kept list means a town added later
   is classified by where it actually is. */
export function exposure(slug: string): Exposure | null {
  const c = CITY_FACTS[slug];
  if (!c) return null;
  const coast = milesFromCoast(slug)!;
  if (coast <= 6) return "coastal";
  if (coast <= 14) return "near-coastal";
  const [lat, lng] = c.coords;
  if (lng <= -71.75 && lat >= 42.2) return "upland";
  return "inland";
}

/** Neighbouring towns we also serve, nearest first. Real adjacency, computed. */
export function neighbours(slug: string, count = 5): string[] {
  const c = CITY_FACTS[slug];
  if (!c) return [];
  return Object.keys(CITY_FACTS)
    .filter((s) => s !== slug)
    .map((s) => ({ s, d: haversineMiles(c.coords, CITY_FACTS[s].coords) }))
    .sort((a, b) => a.d - b.d)
    .slice(0, count)
    .map((x) => x.s);
}

export function county(slug: string): County | null {
  return CITY_FACTS[slug]?.county ?? null;
}

/** How we describe the trip, in plain words a homeowner would use. */
export function driveDescription(slug: string): string | null {
  const mi = milesFromHQ(slug);
  if (mi === null) return null;
  if (mi <= 6) return "practically next door to our Northborough shop";
  if (mi <= 15) return `about ${mi} miles from our Northborough shop`;
  if (mi <= 30) return `roughly ${mi} miles east of our Northborough shop`;
  return `about ${mi} miles from the shop — a drive our crews make regularly`;
}

/** Everything a page needs, resolved once. */
export interface CityGeo {
  slug: string;
  county: County;
  milesFromHQ: number;
  milesFromCoast: number;
  exposure: Exposure;
  neighbours: string[];
  drive: string;
}

export function cityGeo(slug: string): CityGeo | null {
  const f = CITY_FACTS[slug];
  if (!f) return null;
  return {
    slug,
    county: f.county,
    milesFromHQ: milesFromHQ(slug)!,
    milesFromCoast: milesFromCoast(slug)!,
    exposure: exposure(slug)!,
    neighbours: neighbours(slug),
    drive: driveDescription(slug)!,
  };
}
