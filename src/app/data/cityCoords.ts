/* Per-city coordinates for geo meta tags (geo.placename / geo.position / ICBM).
 *
 * These tags are emitted per page ONLY for cities present in this map. A city
 * that is absent ships NO geo.placename/position/ICBM at all — never a fallback
 * to another city's coordinates (that was the bug: every page shipped
 * Northborough's coordinates, including Salem, Quincy, Lynn, Fitchburg).
 *
 * Only verified coordinates belong here:
 *   - northborough: Wolf's Siding HQ / business address of record
 *   - marlborough:  verified municipal coordinates
 *
 * TODO (RHAI): extend this map with the remaining towns' lat/lng (they are
 * stable public-domain facts) to re-enable per-city geo tags site-wide. Until a
 * town is added here, its geo tags are correctly omitted rather than faked.
 */
export const CITY_COORDS: Record<string, [number, number]> = {
  northborough: [42.3195, -71.6412],
  marlborough: [42.3459, -71.5523],
};

export function getCoords(slug: string): [number, number] | undefined {
  return CITY_COORDS[slug];
}
