/* ═══════════════════════════════════════════════════════════════════════
   LOCAL CONTENT ENGINE — genuinely different copy per city × service.

   What went wrong before: this engine varied phrasing only. With
   { name, slug, region } as its entire input it could reword the same
   sentences, but it could not say anything different, so 981 pages came out
   ~97% identical — 45 of 49 text blocks byte-for-byte the same between two
   cities. That is scaled content, and Google reads it as such.

   What changed: the engine now composes from measured facts in cityGeo.ts —
   the town's county, its real distance from the Northborough shop, its
   distance from salt water, and the towns that genuinely border it. Those
   are different for all 109 towns, so the sentences built from them are
   different too, without a thesaurus anywhere in the pipeline.

   Two rules this file obeys:

   1. Nothing is fabricated. Every number is computed from the coordinates;
      no invented statistics, no invented history, no "trusted by 500 local
      families". If we cannot compute or verify it, it is not written.

   2. Shared facts stay shared. Warranty length, licence number, review
      count and material specifications are identical on every page BECAUSE
      THEY ARE IDENTICAL IN REAL LIFE. Varying them to dodge a duplicate
      content check would be lying to homeowners. Uniqueness is earned in
      the local layer, not by corrupting the brand layer.
   ═══════════════════════════════════════════════════════════════════════ */

import type { CityData, ServiceData } from "./cities";
import { CITY_FACTS } from "./cityFacts";
import { cityGeo, type Exposure } from "./cityGeo";

/* deterministic hash → stable across builds (no Math.random) */
function seed(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}
/* Guard the index: seed() returns a full uint32, and `>>` in JS operates on a
   SIGNED int32, so any hash above 2^31 shifted right stays negative and
   arr[-1] silently yields undefined — which rendered as the literal string
   "undefined" on coastal city pages. Normalise before indexing. */
function pick<T>(arr: T[], s: number): T {
  const i = Math.abs(Math.trunc(s)) % arr.length;
  return arr[i];
}

function titleCase(slug: string): string {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

/* ── The housing character of each county, in the terms a siding crew
      actually thinks in. True of the county, and different per county. ── */
const COUNTY_CHARACTER: Record<string, string[]> = {
  Worcester: [
    "three-deckers and turn-of-the-century two-families in the older village centres, with post-war capes and ranches on the roads out of town",
    "mill-era two- and three-families close to the centre, giving way to capes, ranches and split-levels along the routes built up after the war",
    "dense older housing around the former mill villages and a looser mix of mid-century single-families beyond it",
  ],
  Middlesex: [
    "centre-entrance colonials, garrisons and expanded capes on established suburban streets, with antique farmhouses still standing on the older routes",
    "colonials and garrisons on mature suburban lots, interleaved with capes that have been extended once or twice and the occasional pre-1900 farmhouse",
    "a suburban spread of colonials, split-levels and enlarged capes, with older centre-village housing nearer the town commons",
  ],
  Norfolk: [
    "well-kept colonials and garrison-style homes on mature lots, with a good share of mid-century ranches and split-levels",
    "colonials and garrisons on settled streets, mixed with ranches and raised ranches from the post-war building years",
    "traditional colonials on generous lots alongside mid-century single-families, most of them now on their second or third exterior",
  ],
  Essex: [
    "close-set older housing near the harbours — gambrels, Victorians and two-families — mixed with post-war neighbourhoods further inland",
    "harbour-side Victorians and two-families packed tight to the street, with later single-family neighbourhoods spreading inland",
    "older coastal housing stock — gambrels, mansards and two-families — beside twentieth-century streets built further from the water",
  ],
};

/* ── What the weather actually does to an exterior, by exposure band.
      These are physical mechanisms, not adjectives, and they differ
      because the exposure differs. ── */
const EXPOSURE_STORY: Record<Exposure, string[]> = {
  coastal: [
    "Salt air is the deciding factor this close to the water. Airborne salt settles into seams and reaches fasteners long before it marks the panel face, so corrosion-resistant fixings and properly lapped flashing matter more here than the panel colour ever will.",
    "Within sight of salt water an exterior ages from the fasteners outward. Salt-laden air works into laps and joints, attacks anything that can rust, and turns a small flashing gap into a stained wall — which is why we spec stainless-grade fixings and detail the laps tightly.",
  ],
  "near-coastal": [
    "Close enough to the coast to catch salt on an onshore wind, and far enough inland to take a hard freeze — this band gets both. The combination is harder on an exterior than either alone, because salt keeps working at the fixings while freeze-thaw keeps opening the seams they hold shut.",
    "Onshore wind carries salt further than most homeowners expect, and it lands on walls that still see a full freeze-thaw winter. We detail for both: fixings that will not corrode, and laps that stay closed when the wall cycles above and below freezing.",
  ],
  inland: [
    "Freeze-thaw is what takes an exterior apart here. Water finds a seam, freezes, expands, and levers the joint a little wider — then does it again on the next cold night. Over a winter that is hundreds of cycles, and it is why a tight, correctly lapped install outlasts a fast one by years.",
    "The damage pattern inland is patient rather than dramatic: moisture works into a seam, freezes overnight, expands, and prises the joint open a fraction at a time. Do that from November through March and a poorly detailed wall starts letting water behind the cladding.",
    "Inland walls fail at the joints, not in the middle of a panel. Every wet night that drops below freezing turns trapped moisture into a small wedge, and a season of those wedges is what separates a wall that lasts thirty years from one that needs attention in eight.",
    "Nothing dramatic happens to an exterior here in any single week — the wear is cumulative. Water sits in a lap, the temperature crosses freezing, the ice takes up more room than the water did, and the joint gives a fraction. Repeat that all winter and the wall loses its seal from the seams outward.",
  ],
  upland: [
    "Up in the higher interior the winter is simply longer and heavier. More snow sits against the lower courses, the freeze-thaw season runs weeks longer at both ends, and drifting piles hold meltwater against the wall — so the bottom two feet of an exterior take punishment the rest of the wall never sees.",
    "Elevation buys you a colder, snowier winter than the coastal towns get. Snow banks against the lower courses and stays there, meltwater soaks the base of the wall by day and refreezes at night, and any weakness in the starter course shows up fast.",
    "The higher ground west of Worcester keeps its snow. Where a coastal town sheds a storm in two days, a wall up here can carry a drift against its base for a fortnight, and that standing snow is what finds a weak starter course or an under-flashed sill.",
    "Winter arrives earlier and leaves later at this elevation, which means more crossings of the freezing point, not merely colder ones. Each crossing is another chance for water held in a lap to expand — so up here the detailing at the bottom of the wall matters more than anywhere else on it.",
  ],
};

const EXPOSURE_HOOK: Record<Exposure, string> = {
  coastal: "detailed for salt air",
  "near-coastal": "built for salt air and hard freezes",
  inland: "built for freeze-thaw winters",
  upland: "built for a longer, snowier winter",
};

export interface LocalContent {
  intro: string;
  climate: string;
  architecture: string;
  faq: { q: string; a: string };
  driveLabel: string;
  metaHook: string;
  /** Neighbouring towns we also serve — real adjacency, for copy and links. */
  nearby: { slug: string; name: string }[];
  /** One line placing the town: county, distance, coast. */
  placement: string;
}

function buildPlacement(cityName: string, slug: string): string {
  const g = cityGeo(slug);
  if (!g) return "";
  const coast =
    g.exposure === "coastal"
      ? `roughly ${g.milesFromCoast} miles from open salt water`
      : g.exposure === "near-coastal"
        ? `about ${g.milesFromCoast} miles inland from the coast`
        : `about ${g.milesFromCoast} miles from the coast`;
  return `${cityName} sits in ${g.county} County, ${g.drive}, and ${coast}.`;
}

export function getLocalContent(
  city: CityData,
  service: ServiceData
): LocalContent {
  const g = cityGeo(city.slug);
  const short = service.shortName.toLowerCase();
  const s = seed(city.slug + "|" + service.slug);

  /* A town with no coordinates yet gets honest generic copy rather than
     a guess — the same principle cityCoords.ts already established. */
  if (!g) {
    return {
      intro: `Wolf's Siding installs ${short} across ${city.name} and the surrounding ${city.region} towns, with our own crew rather than subcontractors.`,
      climate: EXPOSURE_STORY.inland[0],
      architecture: `We match ${short} to the age, framing and exposure of the home rather than to a catalogue page.`,
      faq: {
        q: `Do you install ${short} on older homes in ${city.name}?`,
        a: `Yes. We survey the wall before quoting, because an older home usually needs prep a newer one does not.`,
      },
      driveLabel: "",
      metaHook: EXPOSURE_HOOK.inland,
      nearby: [],
      placement: "",
    };
  }

  const character = pick(COUNTY_CHARACTER[g.county], seed(city.slug + "|county"));
  const nearby = g.neighbours.map((n) => ({
    slug: n,
    name: CITY_FACTS[n] ? titleCase(n) : titleCase(n),
  }));
  const nearNames = nearby.slice(0, 3).map((n) => n.name);

  const placement = buildPlacement(city.name, city.slug);

  const isHome = city.slug === "northborough";
  const intro = isHome
    ? `${city.name} is home. Our shop is here, our crew lives here, and a good share of the ${short} we install goes on streets we drive every day — which is a strong incentive to leave a wall we would be happy to pass again.`
    : `${placement} That puts a ${short} job here inside our normal working radius, so the crew arrives with the right materials on the first morning instead of making a supply run mid-job. We also work regularly in ${nearNames.join(", ")}, so the drive is routine rather than an excursion.`;

  /* The exposure paragraph explains a mechanism that is shared by every town
     in the band — which is honest, but on its own it makes two inland towns
     read identically. So it is anchored to this town's measured numbers: the
     distance to salt water and the distance from the shop are continuous
     values, different for essentially every town, and they change what the
     sentence actually claims rather than merely how it is worded. */
  const anchor =
    g.exposure === "coastal"
      ? `At ${g.milesFromCoast} miles from open water ${city.name} is inside the band where that shows up on a wall within a decade.`
      : g.exposure === "near-coastal"
        ? `${city.name} sits ${g.milesFromCoast} miles in from the water — far enough that homeowners here rarely expect salt damage, close enough that we still detail for it.`
        : g.exposure === "upland"
          ? `${city.name} is ${g.milesFromHQ} miles out from the shop and well into that higher ground, so we schedule its winter work around the snow rather than through it.`
          : `${city.name} is ${g.milesFromCoast} miles from the coast, so salt is not the issue here — the freeze-thaw cycle is, and it runs all winter.`;
  const climate = `${pick(EXPOSURE_STORY[g.exposure], s >> 5)} ${anchor}`;

  const architecture = `The housing stock across ${g.county} County runs to ${character}. Between ${nearNames[0]}, ${nearNames[1]} and ${city.name} itself we see that whole range in a single working week, which is why a ${short} quote here starts with a survey of the wall rather than a price per square.`;

  const faq = {
    q: `Is ${short} a good choice for a ${city.name} home?`,
    a: `For most of them, yes — but the reason is local. At ${g.milesFromCoast} miles from salt water and ${g.milesFromHQ} from our shop, ${city.name} is ${g.exposure === "coastal" || g.exposure === "near-coastal" ? "close enough to the coast that salt reaches the fasteners, so the fixings and flashing matter as much as the panel" : g.exposure === "upland" ? "high enough inland that snow sits against the lower courses for weeks, so the starter course and base detailing carry the load" : "inland enough that freeze-thaw is the main enemy, so tight laps and correct fastening decide how long the wall lasts"}. We survey the wall, tell you what it needs, and quote that — not a package.`,
  };

  return {
    intro,
    climate,
    architecture,
    faq,
    driveLabel: g.drive,
    metaHook: EXPOSURE_HOOK[g.exposure],
    nearby,
    placement,
  };
}


/* ── Exposure-led prioritisation ──────────────────────────────────────────
   A homeowner in Quincy and one in Princeton do not have the same first
   problem. Salt reaches the fixings on the coast; snow sits against the
   starter course up-country. Both pain points are true of the material
   everywhere — what differs is which one you lead with.

   So the shared service copy is REORDERED, not rewritten: the item that
   matches this town's measured exposure moves to the top, and the rest keep
   their order. Nothing is invented and nothing is contradicted; the page
   simply opens on the failure this town actually sees first. ────────────── */

const EXPOSURE_KEYWORDS: Record<Exposure, string[]> = {
  coastal: ["mold", "mildew", "algae", "moisture", "corros"],
  "near-coastal": ["moisture", "mold", "wind"],
  inland: ["freeze", "crack", "warp", "moisture"],
  upland: ["freeze", "crack", "energy", "insulat", "cold"],
};

/** Move the items that match this town's exposure to the front, stably. */
export function prioritiseByExposure(items: string[], slug: string): string[] {
  const g = cityGeo(slug);
  if (!g || items.length < 2) return items;
  const keys = EXPOSURE_KEYWORDS[g.exposure];
  const hit: string[] = [];
  const rest: string[] = [];
  for (const it of items) {
    const low = it.toLowerCase();
    (keys.some((k) => low.includes(k)) ? hit : rest).push(it);
  }
  return [...hit, ...rest];
}

/** One extra pain point that is true of this exposure band specifically. */
export function localPainPoint(slug: string): string | null {
  const g = cityGeo(slug);
  if (!g) return null;
  const byExposure: Record<Exposure, string> = {
    coastal:
      "Rust bleeding from fasteners and stained streaks below trim — the signature of salt air working on fixings that were never specified for a coastal wall",
    "near-coastal":
      "Fixings that corrode faster than the panels weather, because the wall catches salt on an onshore wind but was detailed as if it were inland",
    inland:
      "Seams that have crept open over successive winters, letting water behind the cladding where freeze-thaw keeps prising them a little wider",
    upland:
      "Damage concentrated in the bottom courses, where snow banks against the wall for weeks and meltwater soaks the base by day and refreezes at night",
  };
  return byExposure[g.exposure];
}

/* ── City-level (service-agnostic) copy for the /{city} landing pages ── */
export interface CityLocal {
  intro: string;
  climate: string;
  architecture: string;
  driveLabel: string;
  metaHook: string;
  nearby: { slug: string; name: string }[];
  placement: string;
}

export function getCityLocal(city: CityData): CityLocal {
  const g = cityGeo(city.slug);
  if (!g) {
    return {
      intro: `Wolf's Siding works throughout ${city.name} and the surrounding ${city.region} towns.`,
      climate: EXPOSURE_STORY.inland[0],
      architecture: "",
      driveLabel: "",
      metaHook: EXPOSURE_HOOK.inland,
      nearby: [],
      placement: "",
    };
  }
  const s = seed(city.slug);
  const nearby = g.neighbours.map((n) => ({ slug: n, name: titleCase(n) }));
  const placement = buildPlacement(city.name, city.slug);
  const isHome = city.slug === "northborough";

  return {
    intro: isHome
      ? `${city.name} is home — our shop, our crew, and a fair number of the walls we have re-clad over the years.`
      : `${placement} We work across ${nearby.slice(0, 3).map((n) => n.name).join(", ")} and the rest of ${g.county} County from that shop, with our own crew on every job.`,
    climate: pick(EXPOSURE_STORY[g.exposure], s >> 5),
    architecture: `Homes here sit among ${pick(COUNTY_CHARACTER[g.county], seed(city.slug + "|county"))}, and the exterior that suits one of those is not automatically the one that suits the next.`,
    driveLabel: g.drive,
    metaHook: EXPOSURE_HOOK[g.exposure],
    nearby,
    placement,
  };
}
