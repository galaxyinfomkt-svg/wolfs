/* ════════════════════════════════════════════════════════════════════
   LOCAL CONTENT ENGINE — genuinely unique copy per city × service.

   The problem this solves: 110 cities × ~9 services = ~990 pages. If they
   only swap the city name into one template, Google treats them as thin,
   scaled, duplicate content (the March-2024 "scaled content abuse" policy)
   and can de-index or demote the whole domain.

   This engine composes each page's LOCAL layer from TRUTHFUL attributes
   (region, coastal vs inland, drive time from our Northborough HQ, the
   real housing character of the area) and selects among several truthful
   phrasings by a deterministic per-(city,service) seed — so two cities in
   the same region still read differently, and every material reads
   differently in the same city. Nothing here fabricates a statistic; it
   states things that are true of the place and varies HOW it says them.
   ════════════════════════════════════════════════════════════════════ */
import type { CityData, ServiceData } from "./cities";

/* deterministic hash → stable across builds (no Math.random) */
function seed(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
  return h >>> 0;
}
function pick<T>(arr: T[], s: number): T { return arr[s % arr.length]; }

type Climate = "inland" | "inland-cold" | "coastal";

/* ── Cities in the colder, higher, snowier interior (central MA / hill towns) ── */
const INLAND_COLD = new Set([
  "worcester", "auburn", "millbury", "sutton", "oxford", "webster",
  "fitchburg", "leominster", "lunenburg", "princeton", "sterling", "paxton",
  "rutland", "holden", "west-boylston", "boylston", "leicester", "spencer",
  "charlton", "dudley", "lancaster", "harvard",
]);

/* ── Genuinely coastal / salt-air-exposed towns ── */
const COASTAL = new Set([
  "quincy", "weymouth", "braintree", "milton",
  "lynn", "saugus", "salem", "beverly", "peabody", "danvers",
]);

/* ── Per-region defaults: drive time from Northborough HQ + character pool ── */
const REGION: Record<string, { drive: string; characters: string[] }> = {
  "Metro West": {
    drive: "a short 15-to-25-minute drive",
    characters: [
      "classic New England colonials, capes, and split-levels on wooded suburban lots",
      "well-kept colonials, garrisons, and ranches on established residential streets",
      "a mix of antique farmhouses, center-entrance colonials, and mid-century homes",
      "traditional capes and colonials, many built to weather decades of New England seasons",
      "spacious suburban colonials and expanded ranches on generous lots",
    ],
  },
  "Worcester Area": {
    drive: "about a 15-to-25-minute drive",
    characters: [
      "dense neighborhoods of triple-deckers, Victorians, and turn-of-the-century two-families",
      "hard-working neighborhoods of multi-families, colonials, and older single-family homes",
      "a mix of Victorian-era homes, three-deckers, and post-war capes and ranches",
      "close-set two- and three-family homes alongside classic New England colonials",
    ],
  },
  "Greater Boston": {
    drive: "roughly a 35-to-45-minute drive",
    characters: [
      "tightly-spaced Victorians, colonials, and multi-family homes close to the city",
      "older colonials, Tudors, and two-families on compact urban-edge lots",
      "a dense mix of historic single-families, triple-deckers, and renovated multis",
      "established colonials and Victorians on smaller, closely-built lots",
    ],
  },
  "South Shore": {
    drive: "about a 45-to-55-minute drive",
    characters: [
      "coastal capes, gambrels, and colonials built to face ocean weather",
      "shingled capes, colonials, and two-families near the water",
      "a mix of harbor-side colonials, ranches, and classic New England capes",
      "salt-exposed colonials and capes on the South Shore",
    ],
  },
  "North Shore": {
    drive: "roughly a 50-to-60-minute drive",
    characters: [
      "historic seaside colonials, Victorians, and shingle-style homes",
      "antique Federal and colonial homes, many close to the coast",
      "weathered Victorians and colonials that face salt air year-round",
      "classic North Shore colonials, capes, and multi-families near the water",
    ],
  },
};

/* ── Truthful per-city overrides for the notable cities we know specifically ── */
const CITY: Record<string, { character?: string; note?: string; drive?: string; climate?: Climate }> = {
  worcester:    { character: "the iconic Worcester triple-decker, ornate Victorians, and dense two- and three-family homes", note: "the second-largest city in New England" },
  framingham:   { character: "a mix of dense in-town multi-families and mid-century colonials and ranches", note: "one of the largest communities in MetroWest" },
  marlborough:  { character: "a blend of downtown multi-families and suburban colonials, capes, and ranches" },
  northborough: { character: "classic colonials, capes, and split-levels on quiet residential streets", note: "the town Wolf’s Siding calls home", drive: "right here in our own home town" },
  westborough:  { character: "well-kept colonials and capes in a growing MetroWest town" },
  shrewsbury:   { character: "established colonials, garrisons, and lakeside homes near Lake Quinsigamond" },
  cambridge:    { character: "densely-packed Victorians, triple-deckers, and historic row homes", note: "one of the most historic, tightly-built cities in the state", climate: "inland" },
  somerville:   { character: "close-set triple-deckers and Victorian two- and three-families", climate: "inland" },
  newton:       { character: "large Victorian and colonial homes on established, tree-lined lots", note: "Boston’s affluent “Garden City”" },
  lexington:    { character: "historic colonials and stately center-entrance homes in a Revolutionary-era town" },
  concord:      { character: "antique colonials, farmhouses, and historic homes, some dating to the 1700s" },
  weston:       { character: "large custom colonials and estate homes on generous wooded lots", note: "one of the wealthiest towns in Massachusetts" },
  wellesley:    { character: "grand colonials, Tudors, and Victorians on established estate-sized lots" },
  needham:      { character: "spacious colonials and Tudors on well-established suburban streets" },
  quincy:       { character: "coastal colonials, capes, and dense two-families near the harbor", note: "the “City of Presidents” on Boston Harbor" },
  weymouth:     { character: "shingled capes, colonials, and multis close to the coast" },
  salem:        { character: "historic Federal and colonial homes, some dating to the 1600s, near the water" },
  beverly:      { character: "seaside Victorians, colonials, and shingle-style homes on the North Shore" },
  lynn:         { character: "dense Victorians, triple-deckers, and multi-families along the coast" },
  fitchburg:    { character: "hilly neighborhoods of Victorians, triple-deckers, and mill-era homes" },
  leominster:   { character: "a mix of Victorian-era homes, colonials, and post-war capes and ranches" },
  natick:       { character: "downtown multi-families alongside colonials and ranches on leafy streets" },
  waltham:      { character: "dense colonials, Victorians, and two-families near the Charles River" },
  arlington:    { character: "close-set colonials, Victorians, and two-families on compact lots" },
  sudbury:      { character: "large colonials and antique homes on wooded, low-density lots" },
};

/* ── Climate copy pools (all true of these Massachusetts zones) ── */
const CLIMATE: Record<Climate, string[]> = {
  "inland": [
    "Inland MetroWest homes take a beating from freeze-thaw cycles — water works into every seam, freezes, expands, and pries lesser siding loose winter after winter.",
    "Away from the coast the real enemy is the temperature swing: humid summers, hard freezes, and the freeze-thaw churn that splits and warps siding that can’t move with the seasons.",
    "This part of Massachusetts sees it all — summer humidity, driving nor’easters, and sub-zero snaps — so the siding here has to expand, contract, and shed water without cracking.",
    "Between wet springs and deep-freeze winters, moisture management is everything inland — the wrong siding traps water behind it and rots the sheathing you can’t see.",
    "Heavy snow, ice, and repeated freeze-thaw are what age an exterior here fastest, so we build for water to drain and dry rather than sit.",
    "Four hard seasons a year — humid summers and frozen winters — mean the exterior has to handle constant expansion and contraction without opening up seams.",
  ],
  "inland-cold": [
    "Up in the colder, higher interior of central Massachusetts, snow sits longer and freeze-thaw is relentless — the wrong siding traps moisture and fails early.",
    "Central Massachusetts winters run longer and colder, so ice damming and freeze-thaw are the failure points we build against on every job.",
    "The hillier, snowier interior piles on heavy snow load and hard freezes — siding here has to shed water fast and shrug off ice year after year.",
    "Long central-MA winters mean weeks of snow and ice against the wall, so we detail every course to drain and dry instead of holding water.",
    "Colder nights and deeper snow up here punish any siding that can’t breathe — trapped moisture behind the wall is the number-one killer of an exterior.",
    "With some of the coldest, snowiest weather in eastern Massachusetts, freeze-thaw and ice are the real test — and exactly what we install to beat.",
  ],
  "coastal": [
    "Coastal air carries salt and moisture that eat through paint and corrode fasteners — near the water, material choice and flashing detail matter even more.",
    "Ocean-side homes fight wind-driven rain and salt spray all year, so we spec siding and stainless-grade fasteners built to resist corrosion and moisture.",
    "Salt air, wind, and driving coastal storms punish an exterior fast — the siding here has to hold its color and seal out wind-driven water.",
    "Near the coast the combination of salt, humidity, and nor’easter winds is brutal on siding and trim, so corrosion-resistant details are non-negotiable.",
    "Wind-driven rain off the water finds every weak seam, so on coastal homes we obsess over overlap, flashing, and fasteners that won’t rust.",
    "Between salt spray and storm-force gusts, a coastal exterior takes more abuse than an inland one — we build it to take the hit and keep sealing out water.",
  ],
};

/* ── Intro pools (slot in city name + drive + optional note) ── */
interface Ctx { name: string; drive: string; character: string; climate: Climate; note?: string; }
const INTRO: ((c: Ctx) => string)[] = [
  (c) => `In ${c.name}${c.note ? `, ${c.note},` : ""} homeowners call Wolf’s Siding when they want the exterior done once and done right — ${c.drive} from our shop.`,
  (c) => `${c.name} is ${c.drive} from our Northborough headquarters — close enough that our own crew, never a subcontractor, is the one on your home.`,
  (c) => `We’ve built our name in ${c.name} one exterior at a time${c.note ? `, ${c.note},` : ""} and we’re ${c.drive} away when you need us.`,
  (c) => `Homeowners across ${c.name} trust Wolf’s Siding for exteriors built to last — our licensed crew works ${c.drive} from home base in Northborough.`,
  (c) => `From our shop in Northborough, ${c.name} is ${c.drive} away — and every ${c.name} project is run by our own crew and overseen by the owner personally.`,
];

/* Home-town special case for Northborough reads naturally */
const INTRO_HOMETOWN = (c: Ctx) =>
  `${c.name} is our home town — Wolf’s Siding is based right here, so your neighbors are our neighbors, and our crew is only minutes from your door.`;

export interface LocalContent {
  intro: string;
  climate: string;
  architecture: string;
  faq: { q: string; a: string };
  driveLabel: string;
  metaHook: string;
}

function resolveClimate(city: CityData): Climate {
  const ov = CITY[city.slug]?.climate;
  if (ov) return ov;
  if (COASTAL.has(city.slug)) return "coastal";
  if (INLAND_COLD.has(city.slug) || city.region === "Worcester Area") return "inland-cold";
  return "inland";
}

export function getLocalContent(city: CityData, service: ServiceData): LocalContent {
  const reg = REGION[city.region] ?? REGION["Metro West"];
  const ov = CITY[city.slug] ?? {};
  const s = seed(city.slug + "|" + service.slug);
  const character = ov.character ?? pick(reg.characters, seed(city.slug) >> 2);
  const drive = ov.drive ?? reg.drive;
  const climate = resolveClimate(city);
  const ctx: Ctx = { name: city.name, drive, character, climate, note: ov.note };

  const isHome = city.slug === "northborough";
  const intro = isHome ? INTRO_HOMETOWN(ctx) : pick(INTRO, s)(ctx);
  const climateCopy = pick(CLIMATE[climate], s >> 5);
  const short = service.shortName.toLowerCase();
  const architecture =
    `Around ${city.name} you’ll find ${character} — and ${short} is one of the exteriors that fits them best. We match the profile, exposure, and color to the home in front of us, not a one-size template.`;

  const faq = {
    q: `Do you install ${short} on older homes in ${city.name}?`,
    a: `Yes. Many ${city.name} homes are ${character}, and we tailor every ${short} job to the home’s age, framing, and exposure. We start with a full inspection — checking the sheathing and trim behind the old siding — before we ever hand you a written quote, so there are no surprises mid-project.`,
  };

  const hookByClimate: Record<Climate, string> = {
    "inland": `built for ${city.name}’s freeze-thaw winters`,
    "inland-cold": `built for central-MA snow and ice`,
    "coastal": `built to beat ${city.name}’s coastal salt air`,
  };
  const metaHook = hookByClimate[climate];

  return { intro, climate: climateCopy, architecture, faq, driveLabel: drive, metaHook };
}
