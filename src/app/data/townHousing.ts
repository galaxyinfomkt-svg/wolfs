/* ═══════════════════════════════════════════════════════════════════════
   TOWN HOUSING FACTS — U.S. Census Bureau, American Community Survey,
   2020–2024 5-year estimates (release acs2024_5yr), county-subdivision level.

   Tables: B25035 (median year structure built), B25034 (year structure
   built), B25003 (tenure), B25024 (units in structure). Pulled through the
   Census Reporter API, which republishes the ACS tables unchanged.

   These are the only per-town numbers on the site that are not computed from
   coordinates. They are estimates with margins of error, so the copy rounds
   them and always says "about" — never presents them as a count.
   Raw snapshot: scripts/town-housing.acs2024.json (refresh when ACS updates).
   ═══════════════════════════════════════════════════════════════════════ */

export interface TownHousing {
  /** Census geo id, for traceability */
  geoId: string;
  medianYearBuilt: number;
  housingUnits: number;
  /** % of housing units built 1939 or earlier */
  pctPre1940: number;
  /** % of housing units built before 1980 (ACS bins end at 1979) */
  pctPre1980: number;
  /** % of occupied units that are owner-occupied */
  pctOwner: number;
  /** % of structures-by-unit that are single-family detached */
  pctSingleDetached: number;
  /** % in 2–4 unit buildings (two-families, three-deckers) */
  pct2to4: number;
}

export const HOUSING_SOURCE =
  "U.S. Census Bureau, American Community Survey 2020–2024 5-year estimates";

export const TOWN_HOUSING: Record<string, TownHousing> = {
  "acton": { geoId: "06000US2501700380", medianYearBuilt: 1974, housingUnits: 9575, pctPre1940: 8.8, pctPre1980: 60.7, pctOwner: 74.9, pctSingleDetached: 63.3, pct2to4: 4.4 },
  "arlington": { geoId: "06000US2501701605", medianYearBuilt: 1945, housingUnits: 20746, pctPre1940: 47.1, pctPre1980: 85.8, pctOwner: 61.6, pctSingleDetached: 37.9, pct2to4: 29.4 },
  "ashland": { geoId: "06000US2501702130", medianYearBuilt: 1984, housingUnits: 8094, pctPre1940: 12.5, pctPre1980: 42.3, pctOwner: 75.3, pctSingleDetached: 55.6, pct2to4: 13.1 },
  "auburn": { geoId: "06000US2502702760", medianYearBuilt: 1963, housingUnits: 7029, pctPre1940: 20.1, pctPre1980: 70.0, pctOwner: 79.6, pctSingleDetached: 73.3, pct2to4: 9.2 },
  "ayer": { geoId: "06000US2501703005", medianYearBuilt: 1977, housingUnits: 3891, pctPre1940: 20.7, pctPre1980: 53.9, pctOwner: 69.2, pctSingleDetached: 51.1, pct2to4: 20.0 },
  "bedford": { geoId: "06000US2501704615", medianYearBuilt: 1976, housingUnits: 5970, pctPre1940: 9.4, pctPre1980: 54.1, pctOwner: 68.8, pctSingleDetached: 63.8, pct2to4: 8.3 },
  "bellingham": { geoId: "06000US2502104930", medianYearBuilt: 1973, housingUnits: 6691, pctPre1940: 12.0, pctPre1980: 61.9, pctOwner: 78.9, pctSingleDetached: 73.9, pct2to4: 7.5 },
  "belmont": { geoId: "06000US2501705070", medianYearBuilt: 1938, housingUnits: 10881, pctPre1940: 57.1, pctPre1980: 87.3, pctOwner: 64.7, pctSingleDetached: 45.4, pct2to4: 38.3 },
  "berlin": { geoId: "06000US2502705490", medianYearBuilt: 1992, housingUnits: 1495, pctPre1940: 22.3, pctPre1980: 42.7, pctOwner: 77.3, pctSingleDetached: 52.6, pct2to4: 12.6 },
  "beverly": { geoId: "06000US2500905595", medianYearBuilt: 1956, housingUnits: 17630, pctPre1940: 35.4, pctPre1980: 72.0, pctOwner: 60.1, pctSingleDetached: 50.5, pct2to4: 18.6 },
  "blackstone": { geoId: "06000US2502706015", medianYearBuilt: 1967, housingUnits: 4013, pctPre1940: 22.4, pctPre1980: 62.1, pctOwner: 73.2, pctSingleDetached: 61.5, pct2to4: 21.0 },
  "bolton": { geoId: "06000US2502706365", medianYearBuilt: 1988, housingUnits: 2084, pctPre1940: 12.1, pctPre1980: 39.7, pctOwner: 94.7, pctSingleDetached: 91.6, pct2to4: 0.9 },
  "boxborough": { geoId: "06000US2501707350", medianYearBuilt: 1989, housingUnits: 2353, pctPre1940: 1.3, pctPre1980: 45.8, pctOwner: 73.4, pctSingleDetached: 59.3, pct2to4: 0.7 },
  "boylston": { geoId: "06000US2502707525", medianYearBuilt: 1977, housingUnits: 1998, pctPre1940: 10.5, pctPre1980: 56.3, pctOwner: 79.2, pctSingleDetached: 85.1, pct2to4: 4.4 },
  "braintree": { geoId: "06000US2502107740", medianYearBuilt: 1957, housingUnits: 15163, pctPre1940: 27.5, pctPre1980: 74.7, pctOwner: 77.6, pctSingleDetached: 65.1, pct2to4: 9.1 },
  "brookline": { geoId: "06000US2502109175", medianYearBuilt: 1938, housingUnits: 28873, pctPre1940: 51.7, pctPre1980: 86.0, pctOwner: 46.9, pctSingleDetached: 18.3, pct2to4: 25.7 },
  "burlington": { geoId: "06000US2501709840", medianYearBuilt: 1972, housingUnits: 10371, pctPre1940: 5.9, pctPre1980: 62.2, pctOwner: 74.2, pctSingleDetached: 70.5, pct2to4: 3.6 },
  "cambridge": { geoId: "06000US2501711000", medianYearBuilt: 1950, housingUnits: 54840, pctPre1940: 47.0, pctPre1980: 67.9, pctOwner: 33.5, pctSingleDetached: 9.9, pct2to4: 29.1 },
  "canton": { geoId: "06000US2502111315", medianYearBuilt: 1980, housingUnits: 9866, pctPre1940: 11.2, pctPre1980: 50.3, pctOwner: 73.6, pctSingleDetached: 55.9, pct2to4: 5.9 },
  "carlisle": { geoId: "06000US2501711525", medianYearBuilt: 1976, housingUnits: 1805, pctPre1940: 13.0, pctPre1980: 57.6, pctOwner: 93.6, pctSingleDetached: 93.2, pct2to4: 1.9 },
  "charlton": { geoId: "06000US2502712715", medianYearBuilt: 1985, housingUnits: 5197, pctPre1940: 7.7, pctPre1980: 40.0, pctOwner: 84.9, pctSingleDetached: 82.5, pct2to4: 8.7 },
  "chelmsford": { geoId: "06000US2501713135", medianYearBuilt: 1967, housingUnits: 13942, pctPre1940: 15.0, pctPre1980: 67.8, pctOwner: 82.1, pctSingleDetached: 66.7, pct2to4: 4.3 },
  "clinton": { geoId: "06000US2502714395", medianYearBuilt: 1956, housingUnits: 6977, pctPre1940: 37.3, pctPre1980: 71.6, pctOwner: 54.7, pctSingleDetached: 40.4, pct2to4: 23.9 },
  "concord": { geoId: "06000US2501715060", medianYearBuilt: 1969, housingUnits: 6984, pctPre1940: 22.6, pctPre1980: 64.7, pctOwner: 75.7, pctSingleDetached: 68.6, pct2to4: 8.1 },
  "danvers": { geoId: "06000US2500916250", medianYearBuilt: 1963, housingUnits: 11536, pctPre1940: 25.4, pctPre1980: 69.5, pctOwner: 69.2, pctSingleDetached: 57.6, pct2to4: 11.2 },
  "dedham": { geoId: "06000US2502116495", medianYearBuilt: 1956, housingUnits: 10828, pctPre1940: 29.7, pctPre1980: 75.7, pctOwner: 73.4, pctSingleDetached: 65.3, pct2to4: 10.2 },
  "douglas": { geoId: "06000US2502717300", medianYearBuilt: 1986, housingUnits: 3497, pctPre1940: 21.8, pctPre1980: 41.4, pctOwner: 83.8, pctSingleDetached: 82.6, pct2to4: 7.2 },
  "dover": { geoId: "06000US2502117405", medianYearBuilt: 1970, housingUnits: 1998, pctPre1940: 10.2, pctPre1980: 61.1, pctOwner: 97.9, pctSingleDetached: 95.8, pct2to4: 0.5 },
  "dudley": { geoId: "06000US2502717685", medianYearBuilt: 1967, housingUnits: 4474, pctPre1940: 24.1, pctPre1980: 66.6, pctOwner: 73.1, pctSingleDetached: 69.9, pct2to4: 21.1 },
  "fitchburg": { geoId: "06000US2502723875", medianYearBuilt: 1950, housingUnits: 17744, pctPre1940: 42.8, pctPre1980: 78.7, pctOwner: 54.1, pctSingleDetached: 42.4, pct2to4: 31.1 },
  "foxborough": { geoId: "06000US2502124820", medianYearBuilt: 1976, housingUnits: 7394, pctPre1940: 14.7, pctPre1980: 54.7, pctOwner: 73.7, pctSingleDetached: 61.0, pct2to4: 11.1 },
  "framingham": { geoId: "06000US2501724960", medianYearBuilt: 1966, housingUnits: 27918, pctPre1940: 16.9, pctPre1980: 72.6, pctOwner: 54.8, pctSingleDetached: 52.1, pct2to4: 11.4 },
  "franklin": { geoId: "06000US2502125172", medianYearBuilt: 1985, housingUnits: 13011, pctPre1940: 13.8, pctPre1980: 41.2, pctOwner: 78.2, pctSingleDetached: 62.5, pct2to4: 9.4 },
  "grafton": { geoId: "06000US2502726430", medianYearBuilt: 1977, housingUnits: 7826, pctPre1940: 13.7, pctPre1980: 53.6, pctOwner: 73.2, pctSingleDetached: 63.4, pct2to4: 9.7 },
  "groton": { geoId: "06000US2501727480", medianYearBuilt: 1988, housingUnits: 3818, pctPre1940: 16.9, pctPre1980: 36.4, pctOwner: 88.8, pctSingleDetached: 79.9, pct2to4: 7.2 },
  "harvard": { geoId: "06000US2502728950", medianYearBuilt: 1975, housingUnits: 2256, pctPre1940: 15.7, pctPre1980: 59.0, pctOwner: 89.4, pctSingleDetached: 85.6, pct2to4: 2.7 },
  "holden": { geoId: "06000US2502730560", medianYearBuilt: 1971, housingUnits: 7188, pctPre1940: 9.9, pctPre1980: 59.9, pctOwner: 85.3, pctSingleDetached: 81.6, pct2to4: 3.1 },
  "holliston": { geoId: "06000US2501730700", medianYearBuilt: 1966, housingUnits: 5884, pctPre1940: 18.2, pctPre1980: 71.9, pctOwner: 87.4, pctSingleDetached: 80.0, pct2to4: 6.4 },
  "hopedale": { geoId: "06000US2502730945", medianYearBuilt: 1959, housingUnits: 2336, pctPre1940: 35.3, pctPre1980: 59.2, pctOwner: 79.5, pctSingleDetached: 54.9, pct2to4: 8.0 },
  "hopkinton": { geoId: "06000US2501731085", medianYearBuilt: 1990, housingUnits: 6936, pctPre1940: 9.8, pctPre1980: 35.5, pctOwner: 86.7, pctSingleDetached: 70.2, pct2to4: 4.4 },
  "hudson": { geoId: "06000US2501731540", medianYearBuilt: 1970, housingUnits: 8858, pctPre1940: 23.4, pctPre1980: 60.0, pctOwner: 73.2, pctSingleDetached: 53.8, pct2to4: 14.0 },
  "lancaster": { geoId: "06000US2502734165", medianYearBuilt: 1971, housingUnits: 3025, pctPre1940: 19.5, pctPre1980: 54.7, pctOwner: 85.1, pctSingleDetached: 81.9, pct2to4: 7.2 },
  "leicester": { geoId: "06000US2502734795", medianYearBuilt: 1965, housingUnits: 4296, pctPre1940: 25.7, pctPre1980: 66.9, pctOwner: 88.5, pctSingleDetached: 84.5, pct2to4: 6.4 },
  "leominster": { geoId: "06000US2502735075", medianYearBuilt: 1967, housingUnits: 19255, pctPre1940: 22.9, pctPre1980: 64.4, pctOwner: 62.3, pctSingleDetached: 46.7, pct2to4: 20.4 },
  "lexington": { geoId: "06000US2501735215", medianYearBuilt: 1965, housingUnits: 12754, pctPre1940: 21.2, pctPre1980: 64.7, pctOwner: 80.5, pctSingleDetached: 73.7, pct2to4: 4.6 },
  "lincoln": { geoId: "06000US2501735425", medianYearBuilt: 1972, housingUnits: 2880, pctPre1940: 14.3, pctPre1980: 64.1, pctOwner: 57.3, pctSingleDetached: 57.2, pct2to4: 14.1 },
  "littleton": { geoId: "06000US2501735950", medianYearBuilt: 1977, housingUnits: 3975, pctPre1940: 16.1, pctPre1980: 52.4, pctOwner: 83.6, pctSingleDetached: 83.8, pct2to4: 2.5 },
  "lunenburg": { geoId: "06000US2502737420", medianYearBuilt: 1972, housingUnits: 4876, pctPre1940: 12.5, pctPre1980: 59.8, pctOwner: 80.7, pctSingleDetached: 78.2, pct2to4: 9.0 },
  "lynn": { geoId: "06000US2500937490", medianYearBuilt: 1946, housingUnits: 37960, pctPre1940: 45.7, pctPre1980: 78.1, pctOwner: 48.1, pctSingleDetached: 35.0, pct2to4: 32.5 },
  "malden": { geoId: "06000US2501737875", medianYearBuilt: 1950, housingUnits: 27876, pctPre1940: 45.1, pctPre1980: 70.9, pctOwner: 41.3, pctSingleDetached: 23.8, pct2to4: 33.6 },
  "marlborough": { geoId: "06000US2501738715", medianYearBuilt: 1974, housingUnits: 17247, pctPre1940: 20.8, pctPre1980: 56.5, pctOwner: 56.0, pctSingleDetached: 43.6, pct2to4: 17.2 },
  "maynard": { geoId: "06000US2501739625", medianYearBuilt: 1963, housingUnits: 4956, pctPre1940: 34.0, pctPre1980: 68.7, pctOwner: 75.0, pctSingleDetached: 61.6, pct2to4: 12.4 },
  "medfield": { geoId: "06000US2502139765", medianYearBuilt: 1970, housingUnits: 4820, pctPre1940: 12.6, pctPre1980: 64.0, pctOwner: 86.1, pctSingleDetached: 81.2, pct2to4: 5.1 },
  "medford": { geoId: "06000US2501739835", medianYearBuilt: 1942, housingUnits: 25587, pctPre1940: 48.8, pctPre1980: 75.9, pctOwner: 54.1, pctSingleDetached: 33.8, pct2to4: 34.2 },
  "medway": { geoId: "06000US2502139975", medianYearBuilt: 1976, housingUnits: 4768, pctPre1940: 19.4, pctPre1980: 54.0, pctOwner: 85.9, pctSingleDetached: 80.8, pct2to4: 7.2 },
  "melrose": { geoId: "06000US2501740115", medianYearBuilt: 1938, housingUnits: 12771, pctPre1940: 52.2, pctPre1980: 84.0, pctOwner: 67.2, pctSingleDetached: 53.0, pct2to4: 14.2 },
  "mendon": { geoId: "06000US2502740255", medianYearBuilt: 1985, housingUnits: 2240, pctPre1940: 9.1, pctPre1980: 36.3, pctOwner: 86.9, pctSingleDetached: 91.8, pct2to4: 3.9 },
  "milford": { geoId: "06000US2502741165", medianYearBuilt: 1971, housingUnits: 11627, pctPre1940: 22.6, pctPre1980: 63.8, pctOwner: 65.2, pctSingleDetached: 55.5, pct2to4: 21.8 },
  "millbury": { geoId: "06000US2502741340", medianYearBuilt: 1965, housingUnits: 5819, pctPre1940: 26.1, pctPre1980: 64.6, pctOwner: 75.4, pctSingleDetached: 67.2, pct2to4: 17.5 },
  "millis": { geoId: "06000US2502141515", medianYearBuilt: 1974, housingUnits: 3471, pctPre1940: 12.6, pctPre1980: 60.6, pctOwner: 83.2, pctSingleDetached: 67.8, pct2to4: 14.1 },
  "milton": { geoId: "06000US2502141690", medianYearBuilt: 1945, housingUnits: 9335, pctPre1940: 45.8, pctPre1980: 81.5, pctOwner: 85.2, pctSingleDetached: 75.4, pct2to4: 12.3 },
  "natick": { geoId: "06000US2501743895", medianYearBuilt: 1968, housingUnits: 15777, pctPre1940: 22.1, pctPre1980: 60.7, pctOwner: 68.2, pctSingleDetached: 57.1, pct2to4: 10.8 },
  "needham": { geoId: "06000US2502144105", medianYearBuilt: 1965, housingUnits: 11929, pctPre1940: 18.0, pctPre1980: 63.9, pctOwner: 83.1, pctSingleDetached: 74.3, pct2to4: 3.6 },
  "newton": { geoId: "06000US2501745560", medianYearBuilt: 1942, housingUnits: 33959, pctPre1940: 48.8, pctPre1980: 79.9, pctOwner: 70.0, pctSingleDetached: 54.8, pct2to4: 20.6 },
  "norfolk": { geoId: "06000US2502146050", medianYearBuilt: 1984, housingUnits: 3557, pctPre1940: 7.8, pctPre1980: 41.2, pctOwner: 94.9, pctSingleDetached: 90.8, pct2to4: 2.6 },
  "northborough": { geoId: "06000US2502746820", medianYearBuilt: 1980, housingUnits: 6108, pctPre1940: 11.3, pctPre1980: 49.3, pctOwner: 83.1, pctSingleDetached: 74.8, pct2to4: 7.7 },
  "northbridge": { geoId: "06000US2502746925", medianYearBuilt: 1973, housingUnits: 7173, pctPre1940: 24.7, pctPre1980: 55.9, pctOwner: 70.5, pctSingleDetached: 56.4, pct2to4: 16.9 },
  "norwood": { geoId: "06000US2502150250", medianYearBuilt: 1960, housingUnits: 13815, pctPre1940: 24.9, pctPre1980: 71.5, pctOwner: 54.0, pctSingleDetached: 46.8, pct2to4: 19.3 },
  "oxford": { geoId: "06000US2502751825", medianYearBuilt: 1972, housingUnits: 5160, pctPre1940: 19.2, pctPre1980: 61.0, pctOwner: 82.8, pctSingleDetached: 71.7, pct2to4: 11.6 },
  "paxton": { geoId: "06000US2502752420", medianYearBuilt: 1967, housingUnits: 1753, pctPre1940: 9.8, pctPre1980: 67.2, pctOwner: 91.8, pctSingleDetached: 89.0, pct2to4: 6.7 },
  "peabody": { geoId: "06000US2500952490", medianYearBuilt: 1966, housingUnits: 23081, pctPre1940: 21.8, pctPre1980: 64.4, pctOwner: 65.6, pctSingleDetached: 50.7, pct2to4: 13.8 },
  "princeton": { geoId: "06000US2502755395", medianYearBuilt: 1975, housingUnits: 1417, pctPre1940: 28.9, pctPre1980: 57.7, pctOwner: 94.3, pctSingleDetached: 93.5, pct2to4: 5.0 },
  "quincy": { geoId: "06000US2502155745", medianYearBuilt: 1958, housingUnits: 48072, pctPre1940: 37.1, pctPre1980: 68.5, pctOwner: 45.2, pctSingleDetached: 32.7, pct2to4: 21.3 },
  "randolph": { geoId: "06000US2502156000", medianYearBuilt: 1966, housingUnits: 13080, pctPre1940: 14.3, pctPre1980: 69.6, pctOwner: 71.3, pctSingleDetached: 62.9, pct2to4: 8.0 },
  "reading": { geoId: "06000US2501756130", medianYearBuilt: 1960, housingUnits: 9951, pctPre1940: 26.9, pctPre1980: 74.7, pctOwner: 82.4, pctSingleDetached: 71.2, pct2to4: 7.0 },
  "rutland": { geoId: "06000US2502758825", medianYearBuilt: 1990, housingUnits: 3392, pctPre1940: 9.3, pctPre1980: 44.2, pctOwner: 89.4, pctSingleDetached: 80.9, pct2to4: 4.3 },
  "salem": { geoId: "06000US2500959105", medianYearBuilt: 1938, housingUnits: 21492, pctPre1940: 51.0, pctPre1980: 76.4, pctOwner: 49.7, pctSingleDetached: 23.9, pct2to4: 38.0 },
  "saugus": { geoId: "06000US2500960015", medianYearBuilt: 1962, housingUnits: 11402, pctPre1940: 29.4, pctPre1980: 71.9, pctOwner: 71.5, pctSingleDetached: 65.6, pct2to4: 11.6 },
  "sharon": { geoId: "06000US2502160785", medianYearBuilt: 1970, housingUnits: 6612, pctPre1940: 14.7, pctPre1980: 62.7, pctOwner: 87.7, pctSingleDetached: 82.7, pct2to4: 5.0 },
  "sherborn": { geoId: "06000US2501761380", medianYearBuilt: 1968, housingUnits: 1588, pctPre1940: 20.1, pctPre1980: 72.9, pctOwner: 89.2, pctSingleDetached: 89.2, pct2to4: 3.5 },
  "shirley": { geoId: "06000US2501761590", medianYearBuilt: 1984, housingUnits: 2413, pctPre1940: 19.7, pctPre1980: 43.8, pctOwner: 77.4, pctSingleDetached: 68.4, pct2to4: 3.8 },
  "shrewsbury": { geoId: "06000US2502761800", medianYearBuilt: 1979, housingUnits: 15393, pctPre1940: 11.4, pctPre1980: 51.0, pctOwner: 72.2, pctSingleDetached: 65.1, pct2to4: 5.9 },
  "somerville": { geoId: "06000US2501762535", medianYearBuilt: 1938, housingUnits: 37756, pctPre1940: 59.0, pctPre1980: 79.8, pctOwner: 34.2, pctSingleDetached: 10.5, pct2to4: 55.2 },
  "southborough": { geoId: "06000US2502763165", medianYearBuilt: 1981, housingUnits: 3908, pctPre1940: 11.5, pctPre1980: 48.7, pctOwner: 88.2, pctSingleDetached: 84.9, pct2to4: 4.4 },
  "spencer": { geoId: "06000US2502766105", medianYearBuilt: 1968, housingUnits: 5695, pctPre1940: 29.4, pctPre1980: 68.4, pctOwner: 63.0, pctSingleDetached: 58.7, pct2to4: 25.1 },
  "sterling": { geoId: "06000US2502767385", medianYearBuilt: 1980, housingUnits: 3309, pctPre1940: 13.3, pctPre1980: 49.8, pctOwner: 86.3, pctSingleDetached: 81.7, pct2to4: 6.2 },
  "stoneham": { geoId: "06000US2501767665", medianYearBuilt: 1964, housingUnits: 10196, pctPre1940: 24.6, pctPre1980: 70.3, pctOwner: 71.0, pctSingleDetached: 54.2, pct2to4: 11.7 },
  "stoughton": { geoId: "06000US2502167945", medianYearBuilt: 1969, housingUnits: 11742, pctPre1940: 16.7, pctPre1980: 71.2, pctOwner: 74.1, pctSingleDetached: 62.5, pct2to4: 10.3 },
  "stow": { geoId: "06000US2501768050", medianYearBuilt: 1974, housingUnits: 2820, pctPre1940: 21.9, pctPre1980: 59.7, pctOwner: 85.4, pctSingleDetached: 79.7, pct2to4: 5.8 },
  "sudbury": { geoId: "06000US2501768260", medianYearBuilt: 1977, housingUnits: 6497, pctPre1940: 5.7, pctPre1980: 53.7, pctOwner: 89.9, pctSingleDetached: 83.8, pct2to4: 1.5 },
  "sutton": { geoId: "06000US2502768610", medianYearBuilt: 1981, housingUnits: 3600, pctPre1940: 12.8, pctPre1980: 46.9, pctOwner: 89.7, pctSingleDetached: 83.8, pct2to4: 6.6 },
  "upton": { geoId: "06000US2502771480", medianYearBuilt: 1981, housingUnits: 3055, pctPre1940: 18.5, pctPre1980: 48.0, pctOwner: 86.7, pctSingleDetached: 82.1, pct2to4: 8.4 },
  "uxbridge": { geoId: "06000US2502771620", medianYearBuilt: 1976, housingUnits: 5588, pctPre1940: 30.7, pctPre1980: 53.6, pctOwner: 79.9, pctSingleDetached: 62.4, pct2to4: 17.7 },
  "wakefield": { geoId: "06000US2501772215", medianYearBuilt: 1956, housingUnits: 11750, pctPre1940: 31.8, pctPre1980: 70.8, pctOwner: 70.7, pctSingleDetached: 53.8, pct2to4: 21.0 },
  "walpole": { geoId: "06000US2502172495", medianYearBuilt: 1977, housingUnits: 9801, pctPre1940: 13.4, pctPre1980: 52.6, pctOwner: 83.5, pctSingleDetached: 72.2, pct2to4: 5.6 },
  "waltham": { geoId: "06000US2501772600", medianYearBuilt: 1961, housingUnits: 26728, pctPre1940: 28.3, pctPre1980: 69.0, pctOwner: 49.7, pctSingleDetached: 37.0, pct2to4: 23.0 },
  "watertown": { geoId: "06000US2501773405", medianYearBuilt: 1947, housingUnits: 17206, pctPre1940: 44.4, pctPre1980: 77.7, pctOwner: 47.7, pctSingleDetached: 17.2, pct2to4: 42.6 },
  "wayland": { geoId: "06000US2501773790", medianYearBuilt: 1962, housingUnits: 5245, pctPre1940: 19.2, pctPre1980: 69.2, pctOwner: 87.6, pctSingleDetached: 78.8, pct2to4: 4.6 },
  "webster": { geoId: "06000US2502773895", medianYearBuilt: 1962, housingUnits: 8229, pctPre1940: 29.7, pctPre1980: 66.1, pctOwner: 59.8, pctSingleDetached: 52.6, pct2to4: 30.7 },
  "wellesley": { geoId: "06000US2502174175", medianYearBuilt: 1955, housingUnits: 9400, pctPre1940: 33.7, pctPre1980: 71.6, pctOwner: 84.4, pctSingleDetached: 82.4, pct2to4: 4.4 },
  "west-boylston": { geoId: "06000US2502775155", medianYearBuilt: 1967, housingUnits: 2982, pctPre1940: 14.8, pctPre1980: 67.1, pctOwner: 77.9, pctSingleDetached: 67.5, pct2to4: 8.6 },
  "westborough": { geoId: "06000US2502775015", medianYearBuilt: 1976, housingUnits: 8342, pctPre1940: 12.9, pctPre1980: 56.6, pctOwner: 61.8, pctSingleDetached: 50.3, pct2to4: 10.3 },
  "westford": { geoId: "06000US2501776135", medianYearBuilt: 1983, housingUnits: 9241, pctPre1940: 15.8, pctPre1980: 45.2, pctOwner: 85.9, pctSingleDetached: 79.2, pct2to4: 2.5 },
  "weston": { geoId: "06000US2501777255", medianYearBuilt: 1964, housingUnits: 3969, pctPre1940: 22.9, pctPre1980: 65.0, pctOwner: 87.5, pctSingleDetached: 88.4, pct2to4: 2.5 },
  "weymouth": { geoId: "06000US2502178972", medianYearBuilt: 1964, housingUnits: 26733, pctPre1940: 21.7, pctPre1980: 70.8, pctOwner: 67.4, pctSingleDetached: 55.5, pct2to4: 6.8 },
  "winchester": { geoId: "06000US2501780510", medianYearBuilt: 1954, housingUnits: 8521, pctPre1940: 39.4, pctPre1980: 77.8, pctOwner: 81.7, pctSingleDetached: 68.9, pct2to4: 8.0 },
  "woburn": { geoId: "06000US2501781035", medianYearBuilt: 1968, housingUnits: 17045, pctPre1940: 18.7, pctPre1980: 62.5, pctOwner: 55.7, pctSingleDetached: 46.5, pct2to4: 19.3 },
  "worcester": { geoId: "06000US2502782000", medianYearBuilt: 1951, housingUnits: 85876, pctPre1940: 40.8, pctPre1980: 75.1, pctOwner: 42.8, pctSingleDetached: 31.6, pct2to4: 33.5 },
  "wrentham": { geoId: "06000US2502182315", medianYearBuilt: 1984, housingUnits: 4636, pctPre1940: 16.1, pctPre1980: 43.8, pctOwner: 82.0, pctSingleDetached: 75.2, pct2to4: 7.8 },
};

export function townHousing(slug: string): TownHousing | null {
  return TOWN_HOUSING[slug] ?? null;
}
