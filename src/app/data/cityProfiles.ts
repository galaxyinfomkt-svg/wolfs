/* ═══════════════════════════════════════════════════════════════════════
   CITY PROFILES — researched, sourced local facts, one entry per town.

   This is the layer that makes a city page about THAT city. Every entry
   below was taken from an official page (town website, mass.gov, MACRIS)
   and carries the URL it came from, so any line can be re-checked.

   Rules:
   - No source URL, no sentence. A field we could not verify is omitted,
     and the page simply does not render that block.
   - Owner notes (ownerNotes) are Ezequias's own words about work in the
     town. They are the most valuable field on the page and the one Google
     cannot get anywhere else — fill them as the owner supplies them.
   - `ready: true` releases the town's city × service pages for indexing
     (see src/config/indexing.ts). Only set it after the profile is filled
     and `npm run check:uniqueness` passes.
   ═══════════════════════════════════════════════════════════════════════ */

export interface SourcedText {
  text: string;
  url: string;
}

export interface CityProfile {
  ready: boolean;
  /** Building / inspectional services department */
  buildingDept?: {
    name: string;
    url: string;
    /** What the official page says about permits for siding / roofing work */
    permitNote?: SourcedText;
  };
  /** Local historic district commission that reviews exterior changes */
  historic?: SourcedText;
  /** One verified fact about the town's built environment */
  localFact?: SourcedText;
  /** First-hand notes from the owner about jobs in this town */
  ownerNotes?: string[];
  /** Researched, written-for-this-town narrative (2–3 paragraphs). Every
      factual claim in it must be backed by an entry in `sources`. */
  story?: string[];
  /** One paragraph per service, specific to this town (keyed by service slug). */
  serviceNotes?: Partial<Record<string, string>>;
  /** Sources the story and notes were written from. */
  sources?: { label: string; url: string }[];
}

export const CITY_PROFILES: Record<string, CityProfile> = {
  /* Research: Nov 2026. Several town websites refused automated access, so
     fields with no opened source are simply absent. Fill them by hand from
     the town site (building-department pages especially). */
  northborough: {
    ready: false,
    historic: {
      text: "Northborough has a Historic District Commission, but according to its own June 2021 minutes, attempts in the late 1970s to create a local historic district near the town center failed — so most Northborough homes are not under historic-district review for siding or roofing.",
      url: "https://www.northboroughma.gov/sites/g/files/vyhlif12221/f/minutes/june_16_2021_nhdc_meeting_minutes_-_final.pdf",
    },
  },
  westborough: {
    ready: false,
    localFact: {
      text: "Westborough's West Main Street Historic District — roughly Milk, Main, Blake and Fay Streets — is listed on the National Register for its Greek Revival and Late Victorian houses. A National Register listing by itself does not restrict what an owner does to the exterior.",
      url: "https://npgallery.nps.gov/AssetDetail/NRIS/87000884",
    },
  },
  shrewsbury: {
    ready: false,
    historic: {
      text: "The area around Shrewsbury's Town Common has been a local historic district since October 1972, per its National Register nomination, with external changes reviewed by a Historic District Commission. If your house is near the Common, check with the commission before choosing materials.",
      url: "https://npgallery.nps.gov/GetAsset/9f066784-4b5d-469a-b05c-08a87a1555ac",
    },
    localFact: {
      text: "The Common-area buildings, including the 1797 Sumner House and the 1806 Slocum House, are described in that nomination as the most important grouping of buildings reflecting Shrewsbury's origins.",
      url: "https://npgallery.nps.gov/GetAsset/9f066784-4b5d-469a-b05c-08a87a1555ac",
    },
  },
  marlborough: {
    ready: false,
    localFact: {
      text: "The Marlborough Center Historic District, roughly bounded by Route 85, Granger Boulevard, Mechanic, Central and Washington Streets, is on the National Register, with mid-19th-century, Late Victorian and early-20th-century revival houses. National Register listing alone does not restrict owners.",
      url: "https://npgallery.nps.gov/AssetDetail/NRIS/98000992",
    },
  },
  worcester: {
    ready: false,
    buildingDept: {
      name: "Inspectional Services, Building & Zoning Division",
      url: "https://www.worcesterma.gov/inspections",
      permitNote: {
        text: "The Building and Zoning Division issues permits for new construction as well as repairs, additions, alterations",
        url: "https://www.worcesterma.gov/inspections",
      },
    },
    historic: {
      text: "Worcester has three local historic districts — Crown Hill, Massachusetts Avenue and Montvale — where the Worcester Historical Commission reviews proposed exterior alterations.",
      url: "https://www.worcesterma.gov/boards-commissions/historical-commission",
    },
    localFact: {
      text: "Worcester homeowners aged 62 or older who own and live in a 1–4 unit home may qualify for the city's CDBG Elder Home Repair grant, which can cover major systems including roof, siding and windows (income limits apply).",
      url: "https://www.worcesterma.gov/housing-neighborhood-development/document-center/housing-programs-overview-presentation.pdf",
    },
  },
  grafton: {
    ready: false,
    historic: {
      text: "Grafton has a Historic District Commission (town minutes record appointments to it), and Grafton Common is a National Register historic district. If your home is around the Common, check with the commission before changing siding or trim.",
      url: "https://cmsarchive.civicplus.com/GraftonMA/Board%20of%20Selectmen%20Meeting%20Minutes/2014/Board%20of%20Selectman%20Minutes%2001-07-2014.pdf",
    },
    localFact: {
      text: "Grafton Common is a well-preserved 19th-century crossroads village with Federal, Greek Revival, Italianate, Second Empire, Queen Anne and Georgian Revival buildings — wide trim, clapboard and detailed cornices are the norm there.",
      url: "https://npgallery.nps.gov/GetAsset/d4c93ba4-ddb2-4b34-80e9-8de668a947d8",
    },
  },
  hudson: {
    ready: false,
    historic: {
      text: "Hudson's Silas Felton Historic District Commission reviews exterior work on Main Street properties in its district through Certificates of Appropriateness, as its minutes show. Check with it before re-siding a downtown house.",
      url: "https://cmsarchive.civicplus.com/Hudson%20MA/HudsonMA_HistDistMin/3.18.09.pdf",
    },
    localFact: {
      text: "Hudson grew as a 19th-century shoe-manufacturing town, with nine major factories by 1870, which is why much of its older housing near the center is worker housing and two-families.",
      url: "https://npgallery.nps.gov/GetAsset/68cae881-7d5e-424c-994e-c5bae6766ec3/",
    },
  },
  framingham: {
    ready: false,
    historic: {
      text: "Much of Framingham Centre became a local historic district under Massachusetts General Law Chapter 40C in 1978, so exterior changes there go through historic-district review.",
      url: "https://npgallery.nps.gov/GetAsset/380597f1-d8d2-4e00-b932-735028c93a9b",
    },
    localFact: {
      text: "Framingham Centre was the town's religious, civic and commercial focus through the 18th and 19th centuries and still keeps its New England village scale, much of it clapboard.",
      url: "https://npgallery.nps.gov/GetAsset/380597f1-d8d2-4e00-b932-735028c93a9b",
    },
  },
  boylston: {
    ready: false,
    buildingDept: {
      name: "Boylston Building Department (221 Main St.)",
      url: "https://cms3.revize.com/revize/boylstonma/Documents/Community/building_permit.pdf",
      permitNote: {
        text: "The town's building permit application lists roofing and siding as permit work types.",
        url: "https://cms3.revize.com/revize/boylstonma/Documents/Community/building_permit.pdf",
      },
    },
    historic: {
      text: "Boylston's General By-Laws (Section 4.9, May 2024) create a local historic district: inside it, no building permit for exterior alterations is issued until the Historic District Commission grants a certificate. Roof colors and materials are exempt from that review; siding is not.",
      url: "https://cms3.revize.com/revize/boylstonma/General%20By-Laws%20Revised%20May%202024_.pdf",
    },
  },
  "west-boylston": {
    ready: false,
    localFact: {
      text: "About 60% of West Boylston's land was flooded for the Wachusett Reservoir; the granite Old Stone Church (1891) is the only building of the old town center still on its original site.",
      url: "https://npgallery.nps.gov/GetAsset/7295adb2-cb71-4893-8bf8-17618e1e2307",
    },
  },
  sudbury: {
    ready: false,
    buildingDept: {
      name: "Sudbury Building Department",
      url: "https://sudbury.ma.us/building/",
      permitNote: {
        text: "Building Permits are required for all construction that is not an ordinary repair as defined by the latest edition of the Massachusetts State Building Code.",
        url: "https://sudbury.ma.us/building/",
      },
    },
    historic: {
      text: "Sudbury has four local historic districts under MGL Ch. 40C (Town Center, Wayside Inn, King Philip and George Pitts Tavern). The Historic Districts Commission reviews alterations visible from the street, and work there needs a Certificate of Appropriateness before the building permit.",
      url: "https://sudbury.ma.us/historicdistricts/faq/1-what-is-the-sudbury-historic-district-commission-hdc/",
    },
    localFact: {
      text: "Outside the historic districts, Sudbury's Demolition Delay Bylaw generally is not triggered by roofing, window, door or siding replacement.",
      url: "https://sudbury.ma.us/historicalcommission/demolition-delay-bylaw-faqs/",
    },
  },
  stow: {
    ready: false,
    buildingDept: {
      name: "Stow Building Department",
      url: "https://www.stow-ma.gov/294/Building-Department",
    },
    localFact: {
      text: "Stow's Building Department issued 911 permits in 2024 and reported an increase in permits for additions, renovations and new roofs.",
      url: "https://www.stow-ma.gov/ArchiveCenter/ViewFile/Item/113",
    },
  },
  peabody: {
    ready: false,
    buildingDept: {
      name: "Peabody Inspectional Services Department",
      url: "https://www.peabody-ma.gov/inspectors.html",
      permitNote: {
        text: "Anyone seeking to construct, alter, or demolish a structure or install a sign must first obtain a building permit",
        url: "https://www.peabody-ma.gov/inspectors.html",
      },
    },
    historic: {
      text: "Peabody has two National Register districts, the Civic Center (1980) and Washington Street (1985), and its Historical Commission reviews re-siding plans on historic houses it is consulted on.",
      url: "https://peabody-ma.gov/historical_commission.html",
    },
    localFact: {
      text: "Peabody's Historical Commission publishes a homeowner guide, \"The Do's and Don'ts of Re-Siding a Historic Home,\" which advises against vinyl or aluminum on historic houses and points to paintable wood clapboard, engineered wood or fiber cement instead.",
      url: "https://peabody-ma.gov/historical_comm/The%20Dos%20and%20Don%27ts%20of%20re-siding%20Update%202%2006182026.pdf",
    },
  },
};

/* Researched town copy (story, per-service notes, sources) lives in
   src/data/cityStories.json, one entry per town, merged in here. A town's
   `ready` flag there releases its city × service pages for indexing. */
import storiesJson from "../../data/cityStories.json";
type StoryEntry = Pick<CityProfile, "story" | "serviceNotes" | "sources"> & { ready?: boolean };
const STORIES = storiesJson as Record<string, StoryEntry>;

for (const [slug, st] of Object.entries(STORIES)) {
  const base = CITY_PROFILES[slug] ?? { ready: false };
  CITY_PROFILES[slug] = {
    ...base,
    story: st.story,
    serviceNotes: st.serviceNotes,
    sources: [...(st.sources ?? [])],
    ready: Boolean(st.ready),
  };
}

export function cityProfile(slug: string): CityProfile | null {
  return CITY_PROFILES[slug] ?? null;
}
