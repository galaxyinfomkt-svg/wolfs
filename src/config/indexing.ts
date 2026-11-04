/* ═══════════════════════════════════════════════════════════════════════
   INDEXING POLICY — which city × service pages Google is asked to index.

   Context (auditoria 2026-11): the site lost ~91% of its Google impressions
   on 20–21 Aug 2026, inside Google's August 2026 spam update, two weeks after
   ~980 templated city × service URLs went live. The decision was to KEEP the
   pages online and rewrite them with genuinely local content, in waves.

   Until a city has been rewritten, its city × service pages stay live for
   visitors but carry `noindex, follow` and are left out of the sitemap, so
   they stop counting against the site while the good pages are built.

   To release a city: add its slug to READY_CITIES once its CITY_PROFILES
   entry (src/app/data/cityProfiles.ts) is filled and has passed
   `npm run check:uniqueness`.
   ═══════════════════════════════════════════════════════════════════════ */

import { CITY_PROFILES } from "../app/data/cityProfiles";

/** Wave 1 — the cities with researched, sourced local profiles. */
export const READY_CITIES: ReadonlySet<string> = new Set(
  Object.entries(CITY_PROFILES)
    .filter(([, p]) => p.ready)
    .map(([slug]) => slug)
);

/** Services the owner does not want promoted city by city. */
export const LOW_KEY_SERVICES: ReadonlySet<string> = new Set(["siding-repair-services"]);

export function isCityServiceIndexable(citySlug: string, serviceSlug: string): boolean {
  return READY_CITIES.has(citySlug) && !LOW_KEY_SERVICES.has(serviceSlug);
}
