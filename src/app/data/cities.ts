/* ═══════════════════════════════════════════════════════════
   CITY + SERVICE DATA FOR DYNAMIC SEO PAGES
   ~105 cities × 7 services = ~735 unique pages
   ═══════════════════════════════════════════════════════════ */

export interface CityData {
  name: string;
  slug: string;
  state: string;
  stateAbbr: string;
  county: string;
  region: string;
  population: string;
  climate: string;
}

export interface ServiceData {
  name: string;
  slug: string;
  shortName: string;
  material: string;
  painPoints: string[];
  benefits: string[];
  description: string;
  priceRange: string;
  lifespan: string;
  idealFor: string;
}

/* ───────── 7 SERVICES ───────── */

export const SERVICES: ServiceData[] = [
  {
    name: "Vinyl Siding Installation",
    slug: "vinyl-siding-installation",
    shortName: "Vinyl Siding",
    material: "vinyl siding",
    painPoints: [
      "Peeling and fading paint that requires constant repainting",
      "High maintenance costs eating into your home improvement budget",
      "Cracked or warped siding exposing your home to moisture damage",
      "Outdated exterior dragging down your home's curb appeal and value",
    ],
    benefits: [
      "Virtually maintenance-free — no painting, staining, or sealing required",
      "Resists fading, cracking, and peeling for decades",
      "Wide range of colors, textures, and profiles to match any architectural style",
      "Cost-effective with one of the best ROI of any exterior upgrade",
      "Excellent moisture barrier protecting against New England rain and snow",
      "Energy-efficient insulated options available to reduce heating costs",
    ],
    description: "Vinyl siding is the most popular siding choice in New England for good reason. It delivers outstanding durability, minimal maintenance, and exceptional value.",
    priceRange: "$5,000 – $15,000",
    lifespan: "20–40 years",
    idealFor: "homeowners seeking a durable, low-maintenance, and cost-effective exterior solution",
  },
  {
    name: "Clapboard Siding Installation",
    slug: "clapboard-siding-installation",
    shortName: "Clapboard Siding",
    material: "clapboard siding",
    painPoints: [
      "Rotting wood planks letting moisture seep into your walls",
      "Constant scraping, priming, and repainting every few years",
      "Insect damage weakening your home's structural integrity",
      "Warped or buckled boards creating unsightly gaps and drafts",
    ],
    benefits: [
      "Classic New England aesthetic that adds timeless charm to any home",
      "Modern clapboard materials offer wood-look beauty with far less maintenance",
      "Horizontal overlapping design provides excellent weather protection",
      "Available in composite, fiber cement, and engineered wood options",
      "Increases property value with a traditional, elegant appearance",
      "Easy to repair — individual boards can be replaced without full teardown",
    ],
    description: "Clapboard siding brings the timeless charm of traditional New England homes with modern durability. Its horizontal, overlapping plank design delivers superior weather protection.",
    priceRange: "$7,000 – $20,000",
    lifespan: "25–50 years",
    idealFor: "homeowners wanting a classic, traditional New England look with modern durability",
  },
  {
    name: "Hardie Plank Siding Installation",
    slug: "hardie-plank-siding-installation",
    shortName: "Hardie Plank",
    material: "Hardie Plank fiber cement siding",
    painPoints: [
      "Termite and insect damage destroying your siding from the inside out",
      "Fire risk from combustible siding materials near grills or fire pits",
      "Extreme temperature swings causing cracking, warping, and buckling",
      "Moisture penetration leading to mold, mildew, and structural rot",
    ],
    benefits: [
      "Fireproof fiber cement composition — Class A fire rating",
      "Completely termite-proof and insect-resistant",
      "Withstands extreme New England weather from -20°F to 100°F+",
      "ColorPlus technology provides factory-baked color that resists fading",
      "50-year limited product warranty from James Hardie",
      "Highest resale value increase of any siding material",
    ],
    description: "Hardie Plank fiber cement siding is the premium choice for Massachusetts homeowners who demand the ultimate in durability, protection, and long-term value.",
    priceRange: "$10,000 – $25,000",
    lifespan: "30–50 years",
    idealFor: "homeowners seeking maximum protection against fire, insects, and extreme weather",
  },
  {
    name: "Exterior Trim Work",
    slug: "exterior-trim-work",
    shortName: "Exterior Trim",
    material: "exterior trim",
    painPoints: [
      "Rotting trim around windows and doors letting water into your walls",
      "Peeling and cracking trim making your entire exterior look neglected",
      "Missing or damaged trim pieces exposing vulnerable areas to the elements",
      "Poorly installed trim causing drafts and higher energy bills",
    ],
    benefits: [
      "Custom-fitted trim that perfectly frames doors, windows, and rooflines",
      "PVC, composite, and wood options to match any style and budget",
      "Seals critical gaps where water infiltration commonly occurs",
      "Dramatically improves curb appeal — the finishing touch that makes a home shine",
      "Increases energy efficiency by eliminating drafts at vulnerable junctions",
      "Protects structural elements from moisture, insects, and UV damage",
    ],
    description: "Professional exterior trim work is the finishing touch that transforms a good siding job into a great one. It protects vulnerable areas and dramatically enhances curb appeal.",
    priceRange: "$2,000 – $10,000",
    lifespan: "20–40 years",
    idealFor: "homeowners looking to enhance curb appeal and seal critical vulnerable areas",
  },
  {
    name: "Vinyl Cedar Shingles Installation",
    slug: "vinyl-cedar-shingles",
    shortName: "Vinyl Cedar Shingles",
    material: "vinyl cedar shingles",
    painPoints: [
      "Love the cedar shingle look but can't keep up with the maintenance",
      "Natural shingles splitting, curling, and falling off your walls",
      "Moss, mold, and algae growth staining your natural shingles",
      "Expensive cedar replacement costs adding up year after year",
    ],
    benefits: [
      "Authentic cedar wood-grain texture without any of the maintenance",
      "Completely resistant to moisture, insects, rot, and mold",
      "Never needs painting, staining, or sealing — just occasional cleaning",
      "Consistent color and texture that won't fade, warp, or split",
      "Lighter weight than natural cedar — easier and faster to install",
      "Eco-friendly — no trees harvested for your beautiful exterior",
    ],
    description: "Vinyl cedar shingles deliver the classic New England charm of real cedar with virtually zero maintenance. Perfect for homeowners who love the look but not the upkeep.",
    priceRange: "$8,000 – $18,000",
    lifespan: "25–40 years",
    idealFor: "homeowners who love the cedar shingle aesthetic but want zero-maintenance durability",
  },
  {
    name: "Wood Shingles Installation",
    slug: "wood-shingles-installation",
    shortName: "Wood Shingles",
    material: "wood shingles",
    painPoints: [
      "Existing wood shingles cracking, splitting, and losing their beauty",
      "Moisture damage causing rot and compromising your home's structure",
      "Inconsistent weathering creating a patchy, neglected appearance",
      "Difficulty finding craftsmen who know how to properly install wood shingles",
    ],
    benefits: [
      "Natural, authentic beauty that no synthetic material can truly replicate",
      "Premium-grade wood carefully selected for durability and grain quality",
      "Expert installation techniques ensure long-lasting performance",
      "Natural insulation properties help regulate indoor temperatures",
      "Graceful aging that develops a beautiful silver-gray patina over time",
      "Adds significant character and value to your home",
    ],
    description: "Wood shingles deliver unmatched natural beauty and authentic character. Our expert craftsmen select premium-grade wood and install with precision for lasting results.",
    priceRange: "$9,000 – $22,000",
    lifespan: "20–35 years",
    idealFor: "homeowners seeking authentic, natural beauty and timeless craftsmanship",
  },
  {
    name: "Cedar Shingles Installation",
    slug: "cedar-shingles-installation",
    shortName: "Cedar Shingles",
    material: "cedar shingles",
    painPoints: [
      "Aging cedar shingles losing their color and protective oils",
      "Moisture trapped behind shingles causing hidden rot and mold",
      "Improper installation leading to premature failure and costly repairs",
      "Difficulty maintaining the rich, warm color of natural cedar",
    ],
    benefits: [
      "Natural oils provide built-in resistance to insects and decay",
      "Superior insulation — R-value 40% higher than most siding materials",
      "Breathable material that naturally regulates moisture",
      "Rich, warm tones that add unparalleled warmth to any architectural style",
      "Sustainable and renewable — cedar forests are responsibly managed",
      "Ages beautifully into a sought-after silver-gray patina",
    ],
    description: "Premium cedar shingles offer unmatched warmth, natural insect resistance, and exceptional insulation. They represent the finest tradition of New England craftsmanship.",
    priceRange: "$12,000 – $28,000",
    lifespan: "25–40+ years",
    idealFor: "homeowners wanting the ultimate in natural beauty, insulation, and longevity",
  },
];

/* ───────── ~105 CITIES ───────── */

export const CITIES: CityData[] = [
  // MetroWest / Core
  { name: "Marlborough", slug: "marlborough", state: "Massachusetts", stateAbbr: "MA", county: "Middlesex", region: "MetroWest", population: "41,700", climate: "harsh winters with heavy snowfall and freezing temperatures, hot humid summers" },
  { name: "Hudson", slug: "hudson", state: "Massachusetts", stateAbbr: "MA", county: "Middlesex", region: "MetroWest", population: "20,500", climate: "cold snowy winters with nor'easters, warm humid summers with occasional storms" },
  { name: "Framingham", slug: "framingham", state: "Massachusetts", stateAbbr: "MA", county: "Middlesex", region: "MetroWest", population: "72,800", climate: "variable New England weather with freezing winters and humid summers" },
  { name: "Westborough", slug: "westborough", state: "Massachusetts", stateAbbr: "MA", county: "Worcester", region: "MetroWest", population: "19,200", climate: "cold winters with significant snowfall, warm summers with moderate humidity" },
  { name: "Northborough", slug: "northborough", state: "Massachusetts", stateAbbr: "MA", county: "Worcester", region: "MetroWest", population: "15,700", climate: "classic New England climate with harsh winters and hot summers" },
  { name: "Southborough", slug: "southborough", state: "Massachusetts", stateAbbr: "MA", county: "Worcester", region: "MetroWest", population: "10,500", climate: "cold winters with ice and snow, warm humid summers" },
  { name: "Shrewsbury", slug: "shrewsbury", state: "Massachusetts", stateAbbr: "MA", county: "Worcester", region: "Central MA", population: "38,500", climate: "inland continental climate with cold winters and warm summers" },
  { name: "Natick", slug: "natick", state: "Massachusetts", stateAbbr: "MA", county: "Middlesex", region: "MetroWest", population: "36,000", climate: "four-season climate with freezing winters and humid summers" },
  { name: "Ashland", slug: "ashland", state: "Massachusetts", stateAbbr: "MA", county: "Middlesex", region: "MetroWest", population: "18,000", climate: "typical New England weather with cold winters and warm summers" },
  { name: "Sudbury", slug: "sudbury", state: "Massachusetts", stateAbbr: "MA", county: "Middlesex", region: "MetroWest", population: "19,900", climate: "cold winters with heavy snowfall, warm summers with moderate rainfall" },
  { name: "Hopkinton", slug: "hopkinton", state: "Massachusetts", stateAbbr: "MA", county: "Middlesex", region: "MetroWest", population: "18,700", climate: "cold snowy winters, warm humid summers typical of inland New England" },
  { name: "Milford", slug: "milford", state: "Massachusetts", stateAbbr: "MA", county: "Worcester", region: "MetroWest", population: "30,100", climate: "harsh New England winters with ice storms, hot humid summers" },
  { name: "Wayland", slug: "wayland", state: "Massachusetts", stateAbbr: "MA", county: "Middlesex", region: "MetroWest", population: "14,400", climate: "variable weather with cold winters, warm summers, and significant precipitation" },
  { name: "Holliston", slug: "holliston", state: "Massachusetts", stateAbbr: "MA", county: "Middlesex", region: "MetroWest", population: "15,000", climate: "four distinct seasons with cold winters and warm, humid summers" },
  { name: "Grafton", slug: "grafton", state: "Massachusetts", stateAbbr: "MA", county: "Worcester", region: "Central MA", population: "19,500", climate: "inland climate with cold winters, significant snowfall, and warm summers" },
  // Central MA / Worcester County
  { name: "Worcester", slug: "worcester", state: "Massachusetts", stateAbbr: "MA", county: "Worcester", region: "Central MA", population: "206,500", climate: "cold continental winters with heavy snow, warm humid summers" },
  { name: "Clinton", slug: "clinton", state: "Massachusetts", stateAbbr: "MA", county: "Worcester", region: "Central MA", population: "14,000", climate: "harsh New England winters with snow and ice, moderate summers" },
  { name: "Boylston", slug: "boylston", state: "Massachusetts", stateAbbr: "MA", county: "Worcester", region: "Central MA", population: "4,800", climate: "rural New England climate with heavy snow and cold winters" },
  { name: "West Boylston", slug: "west-boylston", state: "Massachusetts", stateAbbr: "MA", county: "Worcester", region: "Central MA", population: "8,200", climate: "cold inland winters with significant snowfall, warm humid summers" },
  { name: "Holden", slug: "holden", state: "Massachusetts", stateAbbr: "MA", county: "Worcester", region: "Central MA", population: "19,500", climate: "elevated terrain brings extra snow and wind exposure in winter" },
  { name: "Sterling", slug: "sterling", state: "Massachusetts", stateAbbr: "MA", county: "Worcester", region: "Central MA", population: "8,300", climate: "cold winters with heavy snowfall and wind, moderate summers" },
  { name: "Lancaster", slug: "lancaster", state: "Massachusetts", stateAbbr: "MA", county: "Worcester", region: "Central MA", population: "8,600", climate: "inland New England climate with harsh winters and pleasant summers" },
  { name: "Harvard", slug: "harvard", state: "Massachusetts", stateAbbr: "MA", county: "Worcester", region: "Central MA", population: "6,700", climate: "rural setting with cold snowy winters and warm summers" },
  { name: "Berlin", slug: "berlin", state: "Massachusetts", stateAbbr: "MA", county: "Worcester", region: "Central MA", population: "3,200", climate: "small-town New England climate with cold winters and moderate summers" },
  { name: "Bolton", slug: "bolton", state: "Massachusetts", stateAbbr: "MA", county: "Worcester", region: "Central MA", population: "5,300", climate: "four-season climate with cold winters and warm, humid summers" },
  { name: "Auburn", slug: "auburn", state: "Massachusetts", stateAbbr: "MA", county: "Worcester", region: "Central MA", population: "16,800", climate: "inland Worcester County climate with cold winters and warm summers" },
  { name: "Millbury", slug: "millbury", state: "Massachusetts", stateAbbr: "MA", county: "Worcester", region: "Central MA", population: "14,100", climate: "classic New England four-season climate with winter snow and summer heat" },
  { name: "Sutton", slug: "sutton", state: "Massachusetts", stateAbbr: "MA", county: "Worcester", region: "Central MA", population: "9,800", climate: "rural climate with cold winters, moderate snowfall, and warm summers" },
  { name: "Oxford", slug: "oxford", state: "Massachusetts", stateAbbr: "MA", county: "Worcester", region: "Central MA", population: "14,100", climate: "inland New England climate with harsh winters and warm summers" },
  { name: "Webster", slug: "webster", state: "Massachusetts", stateAbbr: "MA", county: "Worcester", region: "Central MA", population: "17,200", climate: "lakeside climate with cold winters, lake-effect snow, and humid summers" },
  { name: "Paxton", slug: "paxton", state: "Massachusetts", stateAbbr: "MA", county: "Worcester", region: "Central MA", population: "5,000", climate: "elevated terrain with colder winters and extra snowfall" },
  { name: "Rutland", slug: "rutland", state: "Massachusetts", stateAbbr: "MA", county: "Worcester", region: "Central MA", population: "9,200", climate: "rural hilltop climate with heavy winter snowfall and wind exposure" },
  { name: "Leicester", slug: "leicester", state: "Massachusetts", stateAbbr: "MA", county: "Worcester", region: "Central MA", population: "11,500", climate: "inland climate with harsh New England winters and moderate summers" },
  { name: "Spencer", slug: "spencer", state: "Massachusetts", stateAbbr: "MA", county: "Worcester", region: "Central MA", population: "12,200", climate: "cold inland winters with significant snowfall, warm humid summers" },
  { name: "Charlton", slug: "charlton", state: "Massachusetts", stateAbbr: "MA", county: "Worcester", region: "Central MA", population: "14,000", climate: "rural New England climate with cold winters and warm summers" },
  { name: "Dudley", slug: "dudley", state: "Massachusetts", stateAbbr: "MA", county: "Worcester", region: "Central MA", population: "12,300", climate: "four-season climate with cold snowy winters and moderate summers" },
  { name: "Princeton", slug: "princeton", state: "Massachusetts", stateAbbr: "MA", county: "Worcester", region: "Central MA", population: "3,500", climate: "elevated terrain with extra snow, wind, and colder temperatures" },
  { name: "Upton", slug: "upton", state: "Massachusetts", stateAbbr: "MA", county: "Worcester", region: "Central MA", population: "8,200", climate: "typical inland New England weather with four distinct seasons" },
  { name: "Mendon", slug: "mendon", state: "Massachusetts", stateAbbr: "MA", county: "Worcester", region: "Central MA", population: "6,400", climate: "rural climate with cold winters, moderate snowfall, and warm summers" },
  { name: "Hopedale", slug: "hopedale", state: "Massachusetts", stateAbbr: "MA", county: "Worcester", region: "Central MA", population: "6,000", climate: "four-season climate with freezing winters and humid summers" },
  { name: "Northbridge", slug: "northbridge", state: "Massachusetts", stateAbbr: "MA", county: "Worcester", region: "Central MA", population: "17,000", climate: "inland New England weather with cold winters and warm summers" },
  { name: "Uxbridge", slug: "uxbridge", state: "Massachusetts", stateAbbr: "MA", county: "Worcester", region: "Central MA", population: "14,200", climate: "valley climate with cold winters, ice storms, and humid summers" },
  { name: "Douglas", slug: "douglas", state: "Massachusetts", stateAbbr: "MA", county: "Worcester", region: "Central MA", population: "9,100", climate: "border-region climate with cold winters and warm humid summers" },
  { name: "Blackstone", slug: "blackstone", state: "Massachusetts", stateAbbr: "MA", county: "Worcester", region: "Central MA", population: "9,500", climate: "valley climate with cold winters, significant precipitation, and warm summers" },
  { name: "Leominster", slug: "leominster", state: "Massachusetts", stateAbbr: "MA", county: "Worcester", region: "North Central MA", population: "43,500", climate: "northern inland climate with harsh winters, heavy snow, and warm summers" },
  { name: "Fitchburg", slug: "fitchburg", state: "Massachusetts", stateAbbr: "MA", county: "Worcester", region: "North Central MA", population: "41,100", climate: "elevated northern climate with heavy snowfall and cold winter winds" },
  { name: "Lunenburg", slug: "lunenburg", state: "Massachusetts", stateAbbr: "MA", county: "Worcester", region: "North Central MA", population: "11,800", climate: "northern inland climate with cold winters and significant snowfall" },
  // I-495 Corridor / Middlesex
  { name: "Maynard", slug: "maynard", state: "Massachusetts", stateAbbr: "MA", county: "Middlesex", region: "I-495 Corridor", population: "11,100", climate: "riverside climate with cold winters and warm, humid summers" },
  { name: "Stow", slug: "stow", state: "Massachusetts", stateAbbr: "MA", county: "Middlesex", region: "I-495 Corridor", population: "7,200", climate: "rural New England climate with cold winters and warm summers" },
  { name: "Acton", slug: "acton", state: "Massachusetts", stateAbbr: "MA", county: "Middlesex", region: "I-495 Corridor", population: "24,200", climate: "four-season climate with cold winters and warm, humid summers" },
  { name: "Concord", slug: "concord", state: "Massachusetts", stateAbbr: "MA", county: "Middlesex", region: "I-495 Corridor", population: "18,500", climate: "historic New England climate with cold winters and warm summers" },
  { name: "Lincoln", slug: "lincoln", state: "Massachusetts", stateAbbr: "MA", county: "Middlesex", region: "I-495 Corridor", population: "7,000", climate: "suburban New England climate with cold winters and temperate summers" },
  { name: "Boxborough", slug: "boxborough", state: "Massachusetts", stateAbbr: "MA", county: "Middlesex", region: "I-495 Corridor", population: "6,300", climate: "inland climate with cold winters and warm summers" },
  { name: "Littleton", slug: "littleton", state: "Massachusetts", stateAbbr: "MA", county: "Middlesex", region: "I-495 Corridor", population: "10,600", climate: "four-season climate with cold winters and moderate summers" },
  { name: "Westford", slug: "westford", state: "Massachusetts", stateAbbr: "MA", county: "Middlesex", region: "I-495 Corridor", population: "25,000", climate: "northern Middlesex climate with cold winters and warm summers" },
  { name: "Carlisle", slug: "carlisle", state: "Massachusetts", stateAbbr: "MA", county: "Middlesex", region: "I-495 Corridor", population: "5,400", climate: "rural setting with cold snowy winters and pleasant summers" },
  { name: "Chelmsford", slug: "chelmsford", state: "Massachusetts", stateAbbr: "MA", county: "Middlesex", region: "I-495 Corridor", population: "35,500", climate: "Merrimack Valley climate with cold winters and warm summers" },
  { name: "Groton", slug: "groton", state: "Massachusetts", stateAbbr: "MA", county: "Middlesex", region: "I-495 Corridor", population: "11,800", climate: "northern rural climate with heavy winter snowfall and warm summers" },
  { name: "Ayer", slug: "ayer", state: "Massachusetts", stateAbbr: "MA", county: "Middlesex", region: "I-495 Corridor", population: "8,600", climate: "inland climate with cold winters and moderate summers" },
  { name: "Shirley", slug: "shirley", state: "Massachusetts", stateAbbr: "MA", county: "Middlesex", region: "I-495 Corridor", population: "7,800", climate: "northern climate with cold snowy winters and warm summers" },
  // Greater Boston West
  { name: "Weston", slug: "weston", state: "Massachusetts", stateAbbr: "MA", county: "Middlesex", region: "Greater Boston", population: "12,100", climate: "suburban Boston climate with cold winters and warm humid summers" },
  { name: "Wellesley", slug: "wellesley", state: "Massachusetts", stateAbbr: "MA", county: "Norfolk", region: "Greater Boston", population: "29,700", climate: "suburban climate with cold winters, moderate snowfall, and warm summers" },
  { name: "Needham", slug: "needham", state: "Massachusetts", stateAbbr: "MA", county: "Norfolk", region: "Greater Boston", population: "32,000", climate: "suburban New England climate with four distinct seasons" },
  { name: "Dover", slug: "dover", state: "Massachusetts", stateAbbr: "MA", county: "Norfolk", region: "Greater Boston", population: "6,200", climate: "wooded suburban climate with cold winters and warm summers" },
  { name: "Medfield", slug: "medfield", state: "Massachusetts", stateAbbr: "MA", county: "Norfolk", region: "Greater Boston", population: "13,000", climate: "suburban climate with freezing winters and warm humid summers" },
  { name: "Millis", slug: "millis", state: "Massachusetts", stateAbbr: "MA", county: "Norfolk", region: "Greater Boston", population: "8,500", climate: "four-season climate with cold winters and moderate summers" },
  { name: "Sherborn", slug: "sherborn", state: "Massachusetts", stateAbbr: "MA", county: "Middlesex", region: "Greater Boston", population: "4,300", climate: "rural-suburban climate with cold winters and warm summers" },
  { name: "Medway", slug: "medway", state: "Massachusetts", stateAbbr: "MA", county: "Norfolk", region: "Greater Boston", population: "13,600", climate: "typical New England climate with cold winters and moderate summers" },
  { name: "Norfolk", slug: "norfolk", state: "Massachusetts", stateAbbr: "MA", county: "Norfolk", region: "Greater Boston", population: "11,800", climate: "suburban climate with freezing winters and warm summers" },
  { name: "Wrentham", slug: "wrentham", state: "Massachusetts", stateAbbr: "MA", county: "Norfolk", region: "Greater Boston", population: "12,300", climate: "four-season climate with cold winters and warm, humid summers" },
  // Greater Boston North/Inner
  { name: "Lexington", slug: "lexington", state: "Massachusetts", stateAbbr: "MA", county: "Middlesex", region: "Greater Boston", population: "34,400", climate: "suburban Boston climate with cold winters and warm summers" },
  { name: "Bedford", slug: "bedford", state: "Massachusetts", stateAbbr: "MA", county: "Middlesex", region: "Greater Boston", population: "14,300", climate: "suburban climate with cold snowy winters and warm summers" },
  { name: "Burlington", slug: "burlington", state: "Massachusetts", stateAbbr: "MA", county: "Middlesex", region: "Greater Boston", population: "28,600", climate: "suburban climate with cold winters, moderate snow, and warm summers" },
  { name: "Waltham", slug: "waltham", state: "Massachusetts", stateAbbr: "MA", county: "Middlesex", region: "Greater Boston", population: "65,000", climate: "Charles River valley climate with cold winters and warm summers" },
  { name: "Newton", slug: "newton", state: "Massachusetts", stateAbbr: "MA", county: "Middlesex", region: "Greater Boston", population: "88,900", climate: "suburban Boston climate with cold winters and warm humid summers" },
  { name: "Brookline", slug: "brookline", state: "Massachusetts", stateAbbr: "MA", county: "Norfolk", region: "Greater Boston", population: "63,000", climate: "urban-suburban climate with cold winters and warm summers" },
  { name: "Dedham", slug: "dedham", state: "Massachusetts", stateAbbr: "MA", county: "Norfolk", region: "Greater Boston", population: "25,700", climate: "suburban Boston climate with four distinct seasons" },
  { name: "Norwood", slug: "norwood", state: "Massachusetts", stateAbbr: "MA", county: "Norfolk", region: "Greater Boston", population: "31,000", climate: "suburban climate with cold winters and moderate summers" },
  { name: "Franklin", slug: "franklin", state: "Massachusetts", stateAbbr: "MA", county: "Norfolk", region: "Greater Boston", population: "34,100", climate: "inland suburban climate with cold winters and warm summers" },
  { name: "Bellingham", slug: "bellingham", state: "Massachusetts", stateAbbr: "MA", county: "Norfolk", region: "Greater Boston", population: "17,200", climate: "border-region climate with cold winters and warm summers" },
  { name: "Cambridge", slug: "cambridge", state: "Massachusetts", stateAbbr: "MA", county: "Middlesex", region: "Greater Boston", population: "118,400", climate: "urban Charles River climate with cold winters and warm summers" },
  { name: "Somerville", slug: "somerville", state: "Massachusetts", stateAbbr: "MA", county: "Middlesex", region: "Greater Boston", population: "81,000", climate: "dense urban climate with cold winters and warm humid summers" },
  { name: "Medford", slug: "medford", state: "Massachusetts", stateAbbr: "MA", county: "Middlesex", region: "Greater Boston", population: "59,500", climate: "urban-suburban climate near Boston with cold winters and warm summers" },
  { name: "Malden", slug: "malden", state: "Massachusetts", stateAbbr: "MA", county: "Middlesex", region: "Greater Boston", population: "66,000", climate: "urban climate with cold winters and warm humid summers" },
  { name: "Melrose", slug: "melrose", state: "Massachusetts", stateAbbr: "MA", county: "Middlesex", region: "Greater Boston", population: "28,700", climate: "suburban climate with cold winters and warm summers" },
  { name: "Wakefield", slug: "wakefield", state: "Massachusetts", stateAbbr: "MA", county: "Middlesex", region: "Greater Boston", population: "27,000", climate: "lakeside suburban climate with cold winters and warm summers" },
  { name: "Reading", slug: "reading", state: "Massachusetts", stateAbbr: "MA", county: "Middlesex", region: "Greater Boston", population: "25,700", climate: "suburban climate with cold winters and moderate summers" },
  { name: "Stoneham", slug: "stoneham", state: "Massachusetts", stateAbbr: "MA", county: "Middlesex", region: "Greater Boston", population: "24,100", climate: "suburban Boston climate with cold winters and warm summers" },
  { name: "Woburn", slug: "woburn", state: "Massachusetts", stateAbbr: "MA", county: "Middlesex", region: "Greater Boston", population: "40,900", climate: "suburban climate with cold winters and warm humid summers" },
  { name: "Winchester", slug: "winchester", state: "Massachusetts", stateAbbr: "MA", county: "Middlesex", region: "Greater Boston", population: "22,800", climate: "suburban climate with cold winters and warm summers" },
  { name: "Arlington", slug: "arlington", state: "Massachusetts", stateAbbr: "MA", county: "Middlesex", region: "Greater Boston", population: "46,300", climate: "inner-suburban Boston climate with cold winters and warm summers" },
  { name: "Belmont", slug: "belmont", state: "Massachusetts", stateAbbr: "MA", county: "Middlesex", region: "Greater Boston", population: "27,000", climate: "suburban climate near Boston with cold winters and warm summers" },
  { name: "Watertown", slug: "watertown", state: "Massachusetts", stateAbbr: "MA", county: "Middlesex", region: "Greater Boston", population: "35,800", climate: "urban-suburban Charles River climate with four distinct seasons" },
  // South Shore / South
  { name: "Quincy", slug: "quincy", state: "Massachusetts", stateAbbr: "MA", county: "Norfolk", region: "South Shore", population: "101,600", climate: "coastal climate with cold winters, ocean winds, and warm summers" },
  { name: "Braintree", slug: "braintree", state: "Massachusetts", stateAbbr: "MA", county: "Norfolk", region: "South Shore", population: "39,200", climate: "coastal-suburban climate with cold winters and warm summers" },
  { name: "Weymouth", slug: "weymouth", state: "Massachusetts", stateAbbr: "MA", county: "Norfolk", region: "South Shore", population: "57,700", climate: "coastal New England climate with cold winters and mild summers" },
  { name: "Milton", slug: "milton", state: "Massachusetts", stateAbbr: "MA", county: "Norfolk", region: "South Shore", population: "28,600", climate: "suburban climate with coastal influence, cold winters, warm summers" },
  { name: "Canton", slug: "canton", state: "Massachusetts", stateAbbr: "MA", county: "Norfolk", region: "South Shore", population: "24,500", climate: "suburban climate with four distinct New England seasons" },
  { name: "Randolph", slug: "randolph", state: "Massachusetts", stateAbbr: "MA", county: "Norfolk", region: "South Shore", population: "34,800", climate: "suburban climate with cold winters and warm humid summers" },
  { name: "Stoughton", slug: "stoughton", state: "Massachusetts", stateAbbr: "MA", county: "Norfolk", region: "South Shore", population: "29,200", climate: "inland suburban climate with cold winters and warm summers" },
  { name: "Sharon", slug: "sharon", state: "Massachusetts", stateAbbr: "MA", county: "Norfolk", region: "South Shore", population: "18,600", climate: "suburban climate with cold winters and moderate summers" },
  { name: "Walpole", slug: "walpole", state: "Massachusetts", stateAbbr: "MA", county: "Norfolk", region: "South Shore", population: "25,700", climate: "suburban New England climate with four distinct seasons" },
  { name: "Foxborough", slug: "foxborough", state: "Massachusetts", stateAbbr: "MA", county: "Norfolk", region: "South Shore", population: "18,600", climate: "inland suburban climate with cold winters and warm summers" },
  // North Shore
  { name: "Lynn", slug: "lynn", state: "Massachusetts", stateAbbr: "MA", county: "Essex", region: "North Shore", population: "101,200", climate: "coastal climate with cold ocean winds in winter and cooler summers" },
  { name: "Saugus", slug: "saugus", state: "Massachusetts", stateAbbr: "MA", county: "Essex", region: "North Shore", population: "28,300", climate: "coastal-suburban climate with cold winters and warm summers" },
  { name: "Peabody", slug: "peabody", state: "Massachusetts", stateAbbr: "MA", county: "Essex", region: "North Shore", population: "54,500", climate: "North Shore climate with cold winters, ocean influence, and warm summers" },
  { name: "Salem", slug: "salem", state: "Massachusetts", stateAbbr: "MA", county: "Essex", region: "North Shore", population: "44,500", climate: "coastal climate with cold ocean winds, salt air exposure, and warm summers" },
  { name: "Beverly", slug: "beverly", state: "Massachusetts", stateAbbr: "MA", county: "Essex", region: "North Shore", population: "42,600", climate: "North Shore coastal climate with cold winters and temperate summers" },
  { name: "Danvers", slug: "danvers", state: "Massachusetts", stateAbbr: "MA", county: "Essex", region: "North Shore", population: "28,400", climate: "coastal suburban climate with cold winters and warm summers" },
];

/* ───────── HELPER FUNCTIONS ───────── */

export function getCityBySlug(slug: string): CityData | undefined {
  return CITIES.find((c) => c.slug === slug);
}

export function getServiceBySlug(slug: string): ServiceData | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

export function getAllCitySlugs(): string[] {
  return CITIES.map((c) => c.slug);
}

export function getAllServiceSlugs(): string[] {
  return SERVICES.map((s) => s.slug);
}

export function generateAllParams(): { city: string; service: string }[] {
  const params: { city: string; service: string }[] = [];
  for (const city of CITIES) {
    for (const service of SERVICES) {
      params.push({ city: city.slug, service: service.slug });
    }
  }
  return params;
}

export function generateCityParams(): { city: string }[] {
  return CITIES.map((c) => ({ city: c.slug }));
}
