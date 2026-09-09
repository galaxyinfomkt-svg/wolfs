/* ═══════════════════════════════════════════════════════════════════════
   PER-CITY FACTS — the factual foundation the local copy is built from.

   Why this file exists: CityData carried only { name, slug, region }. Three
   fields cannot differentiate 981 city × service pages, so the copy engine
   could only reword the same sentences — which is how the site ended up with
   ~1,300-word pages that were 97% identical and read as scaled content.

   Everything here is a stable public-domain fact:
     county — the Massachusetts county the municipality belongs to
     coords — municipal centroid (town centre), 4dp

   NOTHING derived is stored. Distance from the Northborough HQ, neighbouring
   towns and coastal exposure are COMPUTED from these coordinates in
   cityGeo.ts, so they cannot drift out of sync with the data and cannot be
   quietly invented by a copywriter.

   Accuracy note: coordinates are town centroids, good to roughly a kilometre
   — the right precision for "about 12 miles from our shop" and for picking
   genuine neighbours. They are not survey points.
   ═══════════════════════════════════════════════════════════════════════ */

export type County = "Middlesex" | "Worcester" | "Norfolk" | "Essex";

export interface CityFacts {
  county: County;
  /** Municipal centroid [lat, lng]. */
  coords: [number, number];
}

export const CITY_FACTS: Record<string, CityFacts> = {
  /* ── Worcester County ─────────────────────────────────────────── */
  westborough:      { county: "Worcester", coords: [42.2695, -71.6162] },
  northborough:     { county: "Worcester", coords: [42.3195, -71.6412] },  // HQ
  southborough:     { county: "Worcester", coords: [42.3057, -71.5245] },
  shrewsbury:       { county: "Worcester", coords: [42.2959, -71.7128] },
  milford:          { county: "Worcester", coords: [42.1398, -71.5162] },
  grafton:          { county: "Worcester", coords: [42.207, -71.6856] },
  clinton:          { county: "Worcester", coords: [42.4167, -71.6828] },
  berlin:           { county: "Worcester", coords: [42.3812, -71.637] },
  bolton:           { county: "Worcester", coords: [42.4334, -71.6078] },
  boylston:         { county: "Worcester", coords: [42.3959, -71.7034] },
  "west-boylston":  { county: "Worcester", coords: [42.3665, -71.7856] },
  holden:           { county: "Worcester", coords: [42.3515, -71.862] },
  sterling:         { county: "Worcester", coords: [42.4384, -71.7595] },
  lancaster:        { county: "Worcester", coords: [42.4562, -71.6734] },
  harvard:          { county: "Worcester", coords: [42.5001, -71.5826] },
  upton:            { county: "Worcester", coords: [42.1745, -71.6023] },
  mendon:           { county: "Worcester", coords: [42.1051, -71.5525] },
  hopedale:         { county: "Worcester", coords: [42.129, -71.537] },
  lunenburg:        { county: "Worcester", coords: [42.5945, -71.7245] },
  leominster:       { county: "Worcester", coords: [42.5251, -71.7598] },
  fitchburg:        { county: "Worcester", coords: [42.5834, -71.8023] },
  princeton:        { county: "Worcester", coords: [42.4487, -71.877] },
  paxton:           { county: "Worcester", coords: [42.3112, -71.9284] },
  rutland:          { county: "Worcester", coords: [42.3695, -71.9481] },
  leicester:        { county: "Worcester", coords: [42.2459, -71.9084] },
  spencer:          { county: "Worcester", coords: [42.2445, -71.9926] },
  charlton:         { county: "Worcester", coords: [42.1362, -71.9698] },
  dudley:           { county: "Worcester", coords: [42.0459, -71.9273] },
  northbridge:      { county: "Worcester", coords: [42.1487, -71.6495] },
  uxbridge:         { county: "Worcester", coords: [42.077, -71.6301] },
  douglas:          { county: "Worcester", coords: [42.0473, -71.7448] },
  blackstone:       { county: "Worcester", coords: [42.0181, -71.5412] },
  worcester:        { county: "Worcester", coords: [42.2626, -71.8023] },
  auburn:           { county: "Worcester", coords: [42.1948, -71.8356] },
  millbury:         { county: "Worcester", coords: [42.1943, -71.7603] },
  sutton:           { county: "Worcester", coords: [42.1501, -71.7648] },
  oxford:           { county: "Worcester", coords: [42.1173, -71.8645] },
  webster:          { county: "Worcester", coords: [42.0501, -71.88] },

  /* ── Middlesex County ─────────────────────────────────────────── */
  marlborough:      { county: "Middlesex", coords: [42.3459, -71.5523] },
  hudson:           { county: "Middlesex", coords: [42.3918, -71.5662] },
  framingham:       { county: "Middlesex", coords: [42.2793, -71.4162] },
  natick:           { county: "Middlesex", coords: [42.2835, -71.3495] },
  ashland:          { county: "Middlesex", coords: [42.2612, -71.4634] },
  sudbury:          { county: "Middlesex", coords: [42.3834, -71.4162] },
  hopkinton:        { county: "Middlesex", coords: [42.2287, -71.5228] },
  wayland:          { county: "Middlesex", coords: [42.3626, -71.3612] },
  holliston:        { county: "Middlesex", coords: [42.2001, -71.4245] },
  maynard:          { county: "Middlesex", coords: [42.4334, -71.4495] },
  stow:             { county: "Middlesex", coords: [42.4376, -71.5051] },
  acton:            { county: "Middlesex", coords: [42.4851, -71.4328] },
  concord:          { county: "Middlesex", coords: [42.4604, -71.3489] },
  lincoln:          { county: "Middlesex", coords: [42.4259, -71.3034] },
  weston:           { county: "Middlesex", coords: [42.3668, -71.3034] },
  sherborn:         { county: "Middlesex", coords: [42.239, -71.3701] },
  boxborough:       { county: "Middlesex", coords: [42.489, -71.5184] },
  littleton:        { county: "Middlesex", coords: [42.5362, -71.4884] },
  westford:         { county: "Middlesex", coords: [42.5793, -71.4376] },
  carlisle:         { county: "Middlesex", coords: [42.5292, -71.3495] },
  chelmsford:       { county: "Middlesex", coords: [42.5998, -71.3673] },
  groton:           { county: "Middlesex", coords: [42.6112, -71.5745] },
  ayer:             { county: "Middlesex", coords: [42.5601, -71.5895] },
  shirley:          { county: "Middlesex", coords: [42.5423, -71.6495] },
  lexington:        { county: "Middlesex", coords: [42.443, -71.229] },
  bedford:          { county: "Middlesex", coords: [42.4906, -71.2762] },
  burlington:       { county: "Middlesex", coords: [42.5048, -71.1956] },
  waltham:          { county: "Middlesex", coords: [42.3765, -71.2356] },
  newton:           { county: "Middlesex", coords: [42.337, -71.2092] },
  cambridge:        { county: "Middlesex", coords: [42.3736, -71.1097] },
  somerville:       { county: "Middlesex", coords: [42.3876, -71.0995] },
  medford:          { county: "Middlesex", coords: [42.4184, -71.1062] },
  malden:           { county: "Middlesex", coords: [42.4251, -71.0662] },
  melrose:          { county: "Middlesex", coords: [42.4584, -71.0662] },
  wakefield:        { county: "Middlesex", coords: [42.5065, -71.0723] },
  reading:          { county: "Middlesex", coords: [42.5254, -71.0956] },
  stoneham:         { county: "Middlesex", coords: [42.4801, -71.0995] },
  woburn:           { county: "Middlesex", coords: [42.4793, -71.1523] },
  winchester:       { county: "Middlesex", coords: [42.4523, -71.137] },
  arlington:        { county: "Middlesex", coords: [42.4154, -71.1565] },
  belmont:          { county: "Middlesex", coords: [42.3959, -71.1786] },
  watertown:        { county: "Middlesex", coords: [42.3709, -71.1828] },

  /* ── Norfolk County ───────────────────────────────────────────── */
  wellesley:        { county: "Norfolk", coords: [42.2968, -71.2924] },
  needham:          { county: "Norfolk", coords: [42.2809, -71.2378] },
  dover:            { county: "Norfolk", coords: [42.2459, -71.2828] },
  medfield:         { county: "Norfolk", coords: [42.1876, -71.3062] },
  millis:           { county: "Norfolk", coords: [42.1668, -71.3573] },
  medway:           { county: "Norfolk", coords: [42.1418, -71.3962] },
  norfolk:          { county: "Norfolk", coords: [42.1195, -71.3251] },
  wrentham:         { county: "Norfolk", coords: [42.0668, -71.3287] },
  brookline:        { county: "Norfolk", coords: [42.3318, -71.1212] },
  dedham:           { county: "Norfolk", coords: [42.2418, -71.1662] },
  norwood:          { county: "Norfolk", coords: [42.1945, -71.1995] },
  franklin:         { county: "Norfolk", coords: [42.0834, -71.3967] },
  bellingham:       { county: "Norfolk", coords: [42.0862, -71.4745] },
  quincy:           { county: "Norfolk", coords: [42.2529, -71.0023] },
  braintree:        { county: "Norfolk", coords: [42.2223, -71.0023] },
  weymouth:         { county: "Norfolk", coords: [42.2181, -70.9398] },
  milton:           { county: "Norfolk", coords: [42.2495, -71.0662] },
  canton:           { county: "Norfolk", coords: [42.1584, -71.1448] },
  randolph:         { county: "Norfolk", coords: [42.1626, -71.0412] },
  stoughton:        { county: "Norfolk", coords: [42.1251, -71.1023] },
  sharon:           { county: "Norfolk", coords: [42.1234, -71.1786] },
  walpole:          { county: "Norfolk", coords: [42.1418, -71.2495] },
  foxborough:       { county: "Norfolk", coords: [42.0654, -71.2478] },

  /* ── Essex County ─────────────────────────────────────────────── */
  lynn:             { county: "Essex", coords: [42.4668, -70.9495] },
  saugus:           { county: "Essex", coords: [42.464, -71.0101] },
  peabody:          { county: "Essex", coords: [42.5279, -70.9287] },
  salem:            { county: "Essex", coords: [42.5195, -70.8967] },
  beverly:          { county: "Essex", coords: [42.5584, -70.8801] },
  danvers:          { county: "Essex", coords: [42.5751, -70.9301] },

};
