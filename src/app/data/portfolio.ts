/* ═══════════════════════════════════════════════════════════════════════
   PORTFOLIO — one page per real Wolf's Siding job.

   Rules this file follows (see auditoria-wolfs/projetos-estudo/):
   - Photos come from the owner's Drive, exported without EXIF/GPS.
   - A job gets its own page only with 3+ distinct photos and a city the
     owner wrote on the files himself. Everything else is a "recent work"
     card on /projects — no thin pages.
   - Copy states only what the photos show (house style, colour, siding
     profile, trim, porch, garage). Material brand, year and scope details
     are added when the owner confirms them — never guessed.
   ═══════════════════════════════════════════════════════════════════════ */

export interface CasePhoto {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface CaseFact {
  label: string;
  value: string;
}

export interface PortfolioCase {
  slug: string;
  title: string;
  /** one-line thesis under the title */
  thesis: string;
  city: string;
  state: "MA" | "NH" | "RI" | "CT";
  /** slug of the matching /[city] page, when we have one */
  citySlug?: string;
  style: string;
  look: string;
  facts: CaseFact[];
  story: string[];
  highlights: string[];
  photos: CasePhoto[];
}

/* File names carry the town and what the photo shows; every file is
   geotagged (EXIF GPS) to the TOWN CENTRE — never the client's house — and
   signed with author and copyright. */
const FILE: Record<string, string> = {
  "craftsman-home-grafton-ma": "grafton-ma-craftsman-light-gray-lap-siding",
  "board-and-batten-cabin-washington-nh": "washington-nh-charcoal-board-and-batten-cabin",
  "sage-colonial-new-durham-nh": "new-durham-nh-sage-green-colonial-siding",
  "navy-lakeside-cottage-stoddard-nh": "stoddard-nh-navy-lakeside-cottage-siding",
  "modern-farmhouse-pelham-nh": "pelham-nh-white-modern-farmhouse-siding",
  "white-gambrel-laconia-nh": "laconia-nh-white-gambrel-vertical-siding",
  "two-family-seabrook-nh": "seabrook-nh-gray-two-family-siding",
  "raised-ranch-stoughton-ma": "stoughton-ma-cream-raised-ranch-siding",
  "craftsman-ranch": "lancaster-ma-craftsman-ranch-fiber-cement-siding",
  "gray-cape-cod": "boston-ma-gray-cape-cod-vinyl-siding",
  "navy-blue-colonial": "grafton-ma-navy-blue-colonial-vinyl-siding",
  "upscale-gray-colonial": "milton-ma-gray-colonial-siding",
  "burgundy-barn": "grafton-ma-burgundy-board-and-batten-barn",
  "ranch-with-brick": "medford-ma-ranch-vinyl-siding-brick-front",
  "new-construction-subdivision": "stoughton-ma-new-construction-blue-gray-vinyl",
  "commercial-multi-family": "newington-ct-multi-family-sheathing-wrap",
};

const p = (slug: string, n: number, alt: string, width = 1800, height = 1350): CasePhoto => ({
  src: `/projects/${slug}/${FILE[slug]}-${String(n).padStart(2, "0")}.jpg`,
  alt,
  width,
  height,
});

export const STATE_NAME = { MA: "Massachusetts", NH: "New Hampshire", RI: "Rhode Island", CT: "Connecticut" } as const;

/** Town-centre coordinates (approximate) — the same point written into the photos' GPS. */
export const TOWN_GEO: Record<string, [number, number]> = {
  "Grafton, MA": [42.207, -71.6856], "Stoughton, MA": [42.1251, -71.1023], "Lancaster, MA": [42.4559, -71.6731],
  "Medford, MA": [42.4184, -71.1062], "Milton, MA": [42.2495, -71.0662], "Boston, MA": [42.3601, -71.0589],
  "Woburn, MA": [42.4793, -71.1523], "Edgartown, MA": [41.389, -70.5134], "Norwood, MA": [42.1945, -71.1995],
  "Newington, CT": [41.6979, -72.7237], "Washington, NH": [43.1748, -72.0995], "New Durham, NH": [43.4373, -71.172],
  "Stoddard, NH": [43.0786, -72.1145], "Pelham, NH": [42.7345, -71.3245], "Laconia, NH": [43.5279, -71.4704],
  "Seabrook, NH": [42.8948, -70.8712], "Sandown, NH": [42.9287, -71.187],
};

export const PORTFOLIO: PortfolioCase[] = [
  {
    slug: "craftsman-home-grafton-ma",
    title: "Craftsman Home with a Triple Garage",
    thesis: "Light gray lap siding, crisp white trim and a stone base on a wide craftsman in Grafton.",
    city: "Grafton",
    state: "MA",
    citySlug: "grafton",
    style: "Craftsman",
    look: "Light gray lap siding · white trim",
    facts: [
      { label: "Location", value: "Grafton, MA" },
      { label: "Home", value: "Craftsman, triple garage" },
      { label: "Siding", value: "Light gray horizontal lap" },
      { label: "Trim", value: "White" },
    ],
    story: [
      "A long, low craftsman with three garage bays, a timber pergola over the doors and a two-level covered porch on the back. Every wall is finished in light gray lap siding, with white corner boards, window casings and fascia tying the gables together.",
      "A stone base runs along the garage side and up the rear porch columns, and the siding stops clean against it at every corner. The rear elevation, which faces the yard, has the same trim detailing as the street side.",
    ],
    highlights: [
      "Full exterior in light gray lap siding",
      "White trim on corners, windows, gables and fascia",
      "Clean transitions to the stone base and porch columns",
      "Front gables, garage wing and two-level rear porch",
    ],
    photos: [
      p("craftsman-home-grafton-ma", 1, "Craftsman home in Grafton, MA with light gray lap siding, white trim and a triple garage"),
      p("craftsman-home-grafton-ma", 2, "Street view of the Grafton craftsman with its long driveway and three garage doors"),
      p("craftsman-home-grafton-ma", 3, "Front gables and timber pergola over the garage doors"),
      p("craftsman-home-grafton-ma", 4, "Front elevation of the Grafton home from the lawn"),
      p("craftsman-home-grafton-ma", 5, "Rear of the home with a two-level covered porch and stone columns"),
      p("craftsman-home-grafton-ma", 6, "Back elevation with the porch, deck stairs and walk-out level"),
      p("craftsman-home-grafton-ma", 7, "Side gable with lap siding meeting the stone base"),
      p("craftsman-home-grafton-ma", 8, "Garage wing and rear porch seen from the side yard"),
    ],
  },
  {
    slug: "board-and-batten-cabin-washington-nh",
    title: "Charcoal Board & Batten Cabin",
    thesis: "Vertical charcoal siding under a red roof, with a covered porch on posts, in Washington, NH.",
    city: "Washington",
    state: "NH",
    style: "Cabin / barn style",
    look: "Charcoal vertical board & batten · white window trim",
    facts: [
      { label: "Location", value: "Washington, NH" },
      { label: "Home", value: "Barn-style cabin with dormer" },
      { label: "Siding", value: "Charcoal vertical board & batten" },
      { label: "Trim", value: "White windows and casings" },
    ],
    story: [
      "A steep barn-style cabin with a red roof, a shed dormer and a raised porch that wraps the front and side on wooden posts. The walls are done in charcoal vertical board and batten, which makes the tall gables read as one clean shape.",
      "On a house this tall the vertical boards run from the foundation to the peak, and the battens stay plumb across every wall. The white window casings sit on the dark siding without breaking the lines.",
    ],
    highlights: [
      "Charcoal vertical board & batten on every wall",
      "Tall gables and shed dormer kept straight and plumb",
      "White window casings against the dark siding",
      "Covered porch and side deck on posts",
    ],
    photos: [
      p("board-and-batten-cabin-washington-nh", 1, "Charcoal board and batten cabin with a red roof and covered porch in Washington, NH"),
      p("board-and-batten-cabin-washington-nh", 2, "Front of the cabin with the raised porch on wooden posts"),
      p("board-and-batten-cabin-washington-nh", 3, "Side wall of vertical charcoal siding with white windows"),
      p("board-and-batten-cabin-washington-nh", 4, "Gable end and deck seen from below"),
      p("board-and-batten-cabin-washington-nh", 5, "Rear of the cabin with deck stairs and the shed dormer"),
      p("board-and-batten-cabin-washington-nh", 6, "Dormer side of the cabin under the red roof"),
      p("board-and-batten-cabin-washington-nh", 7, "Wolf's Siding crew and company truck at the finished cabin"),
    ],
  },
  {
    slug: "sage-colonial-new-durham-nh",
    title: "Sage Green Colonial",
    thesis: "Sage lap siding, black shutters and a new deck on a two-story colonial in New Durham, NH.",
    city: "New Durham",
    state: "NH",
    style: "Colonial",
    look: "Sage green lap siding · black shutters · white trim",
    facts: [
      { label: "Location", value: "New Durham, NH" },
      { label: "Home", value: "Two-story colonial, two-car garage" },
      { label: "Siding", value: "Sage green horizontal lap" },
      { label: "Trim", value: "White trim, black shutters" },
    ],
    story: [
      "A classic two-story colonial with an attached two-car garage, finished in sage green lap siding with white trim and black shutters on the front windows.",
      "On the back, a raised deck with white posts, black balusters and wood decking sits against the siding.",
    ],
    highlights: [
      "Sage green lap siding on the house and garage",
      "White corner boards, casings and fascia",
      "Black shutters on the front elevation",
      "Siding finished around the new rear deck",
    ],
    photos: [
      p("sage-colonial-new-durham-nh", 1, "Sage green colonial with black shutters and an attached garage in New Durham, NH"),
      p("sage-colonial-new-durham-nh", 2, "Front and garage side of the sage colonial"),
      p("sage-colonial-new-durham-nh", 3, "Garage wing with sage lap siding and white trim"),
      p("sage-colonial-new-durham-nh", 4, "Tall side wall and raised rear deck"),
      p("sage-colonial-new-durham-nh", 5, "Rear corner of the colonial with the deck railing"),
      p("sage-colonial-new-durham-nh", 6, "Back elevation and garage roofline"),
      p("sage-colonial-new-durham-nh", 7, "Deck detail with white posts, black balusters and wood decking"),
    ],
  },
  {
    slug: "navy-lakeside-cottage-stoddard-nh",
    title: "Navy Lakeside Cottage",
    thesis: "Navy lap siding and white trim on a cottage with a long lakeside deck in Stoddard, NH.",
    city: "Stoddard",
    state: "NH",
    style: "Lakeside cottage",
    look: "Navy lap siding · white trim",
    facts: [
      { label: "Location", value: "Stoddard, NH" },
      { label: "Home", value: "Lakeside cottage with deck" },
      { label: "Siding", value: "Navy horizontal lap" },
      { label: "Trim", value: "White" },
    ],
    story: [
      "A one-story cottage set in the trees above the water, with a long deck and white railings facing the lake. The whole exterior is navy lap siding with white window and corner trim.",
      "The cottage sits on a slope, and the siding follows the grade down the side walls to the foundation on the lake side, under the deck.",
    ],
    highlights: [
      "Navy lap siding on every elevation",
      "White trim on windows, corners and fascia",
      "Siding follows the sloped lot down to the foundation",
      "Finished around the lakeside deck and stairs",
    ],
    photos: [
      p("navy-lakeside-cottage-stoddard-nh", 1, "Navy lakeside cottage with a long deck and white railings in Stoddard, NH"),
      p("navy-lakeside-cottage-stoddard-nh", 2, "Entry side of the cottage with deck stairs"),
      p("navy-lakeside-cottage-stoddard-nh", 3, "Navy lap siding and white windows on the side wall"),
      p("navy-lakeside-cottage-stoddard-nh", 4, "Gable end of the cottage among the trees"),
      p("navy-lakeside-cottage-stoddard-nh", 5, "Lake-facing deck and windows"),
    ],
  },
  {
    slug: "modern-farmhouse-pelham-nh",
    title: "White Modern Farmhouse",
    thesis: "White siding, black windows and black garage doors on a new farmhouse in Pelham, NH.",
    city: "Pelham",
    state: "NH",
    style: "Modern farmhouse",
    look: "White siding · black windows and garage doors",
    facts: [
      { label: "Location", value: "Pelham, NH" },
      { label: "Home", value: "Modern farmhouse, two garages" },
      { label: "Siding", value: "White horizontal lap" },
      { label: "Accents", value: "Black windows and doors" },
    ],
    story: [
      "A modern farmhouse with steep gables, a covered front porch and two black garage doors. White siding covers the whole house, so the black window frames and doors do all the contrast.",
      "On an all-white exterior every corner and window return shows from the street, and here they line up across all the gables.",
    ],
    highlights: [
      "White siding on the full exterior",
      "Steep gables with clean corners and returns",
      "Black windows and garage doors as the only accent",
    ],
    photos: [
      p("modern-farmhouse-pelham-nh", 1, "White modern farmhouse with black garage doors in Pelham, NH"),
      p("modern-farmhouse-pelham-nh", 2, "Front gables and covered porch of the farmhouse"),
      p("modern-farmhouse-pelham-nh", 3, "Side of the farmhouse with the garage wing"),
    ],
  },
  {
    slug: "white-gambrel-laconia-nh",
    title: "White Gambrel with Black Trim",
    thesis: "White vertical siding and black fascia on a gambrel with garage bays in Laconia, NH.",
    city: "Laconia",
    state: "NH",
    style: "Gambrel / barn",
    look: "White vertical siding · black fascia and windows",
    facts: [
      { label: "Location", value: "Laconia, NH" },
      { label: "Building", value: "Gambrel with garage bays" },
      { label: "Siding", value: "White vertical" },
      { label: "Trim", value: "Black fascia and windows" },
    ],
    story: [
      "A gambrel-roof building with a dormer level and garage bays underneath, finished in white vertical siding. Black fascia outlines the roofline and the black windows match it.",
      "This one was finished in winter — the photos were taken with snow on the ground.",
    ],
    highlights: [
      "White vertical siding on all four walls",
      "Black fascia along the gambrel roofline",
      "Black windows on the dormer level",
    ],
    photos: [
      p("white-gambrel-laconia-nh", 1, "White gambrel with black fascia and dormers in Laconia, NH"),
      p("white-gambrel-laconia-nh", 2, "Gable end of the gambrel in winter"),
      p("white-gambrel-laconia-nh", 3, "Garage bays under the gambrel roof"),
      p("white-gambrel-laconia-nh", 4, "Corner view of the white vertical siding and black trim"),
    ],
  },
  {
    slug: "two-family-seabrook-nh",
    title: "Gray Two-Family Home",
    thesis: "Gray lap siding and white dormers on a new two-family home in Seabrook, NH.",
    city: "Seabrook",
    state: "NH",
    style: "Two-family",
    look: "Gray lap siding · white trim and dormers",
    facts: [
      { label: "Location", value: "Seabrook, NH" },
      { label: "Home", value: "Two-family with two garages" },
      { label: "Siding", value: "Gray horizontal lap" },
      { label: "Trim", value: "White" },
    ],
    story: [
      "A three-level two-family home with a garage for each unit, a center entry and big white dormers on the roof. The walls are gray lap siding; the dormers and trim are white.",
    ],
    highlights: [
      "Gray lap siding on three levels",
      "White dormers, corner boards and window trim",
      "Two garage bays and a shared front entry",
    ],
    photos: [
      p("two-family-seabrook-nh", 1, "Gray two-family home with white dormers in Seabrook, NH"),
      p("two-family-seabrook-nh", 2, "Tall side wall of the two-family home"),
      p("two-family-seabrook-nh", 3, "Corner view with both garage bays"),
    ],
  },
  {
    slug: "raised-ranch-stoughton-ma",
    title: "Cream Raised Ranch",
    thesis: "Cream lap siding and black shutters on a raised ranch in Stoughton, MA.",
    city: "Stoughton",
    state: "MA",
    citySlug: "stoughton",
    style: "Raised ranch",
    look: "Cream lap siding · black shutters",
    facts: [
      { label: "Location", value: "Stoughton, MA" },
      { label: "Home", value: "Raised ranch" },
      { label: "Siding", value: "Cream horizontal lap" },
      { label: "Trim", value: "White, black shutters" },
    ],
    story: [
      "A split-entry raised ranch finished in cream lap siding, with white trim and black shutters on the front windows.",
    ],
    highlights: [
      "Cream lap siding on both levels",
      "White trim and black shutters on the front",
      "Side walls finished to the same line as the front",
    ],
    photos: [
      p("raised-ranch-stoughton-ma", 1, "Cream raised ranch with black shutters in Stoughton, MA"),
      p("raised-ranch-stoughton-ma", 2, "Side view of the raised ranch and driveway"),
      p("raised-ranch-stoughton-ma", 3, "Front corner of the Stoughton raised ranch"),
    ],
  },
  /* ── Earlier projects already on the site (same URLs). Their photos used to
        be served from the GHL CDN with the exact GPS of the client's house;
        they are now local, cleaned, and geotagged to the town centre. The
        town comes from that original GPS. ── */
  {
    slug: "craftsman-ranch",
    title: "Craftsman Ranch in Fiber Cement",
    thesis: "Hardie Plank fiber cement with lap siding and shake accents on a craftsman-style ranch in Lancaster.",
    city: "Lancaster",
    state: "MA",
    citySlug: "lancaster",
    style: "Craftsman ranch",
    look: "Fiber cement lap siding · shake accents",
    facts: [
      { label: "Location", value: "Lancaster, MA" },
      { label: "Home", value: "Craftsman-style ranch" },
      { label: "Siding", value: "Hardie Plank fiber cement" },
      { label: "Profiles", value: "Lap siding + shake accents" },
    ],
    story: [
      "Hardie Plank fiber cement siding with mixed profiles on a craftsman-style ranch — lap siding on the walls and shake accents in the gables.",
    ],
    highlights: ["Fiber cement lap siding on the main walls", "Shake profile in the gables", "Craftsman gable trim"],
    photos: [
      p("craftsman-ranch", 1, "Craftsman-style ranch with fiber cement lap siding and shake gables in Lancaster, MA"),
      p("craftsman-ranch", 2, "Gable detail with shake accents on the Lancaster ranch"),
    ],
  },
  {
    slug: "navy-blue-colonial",
    title: "Navy Blue Colonial",
    thesis: "Navy blue vinyl siding with crisp white trim on a new colonial in Grafton.",
    city: "Grafton",
    state: "MA",
    citySlug: "grafton",
    style: "Colonial",
    look: "Navy blue vinyl · white trim",
    facts: [
      { label: "Location", value: "Grafton, MA" },
      { label: "Home", value: "New colonial" },
      { label: "Siding", value: "Navy blue vinyl" },
      { label: "Trim", value: "White" },
    ],
    story: ["New construction navy blue vinyl siding on a colonial-style home with crisp white trim details."],
    highlights: ["Navy blue vinyl siding", "White trim details"],
    photos: [p("navy-blue-colonial", 1, "Navy blue vinyl siding with white trim on a colonial in Grafton, MA")],
  },
  {
    slug: "burgundy-barn",
    title: "Burgundy Board & Batten Barn",
    thesis: "Board and batten siding in a rich burgundy on a barn-style building in Grafton.",
    city: "Grafton",
    state: "MA",
    citySlug: "grafton",
    style: "Barn",
    look: "Burgundy board & batten",
    facts: [
      { label: "Location", value: "Grafton, MA" },
      { label: "Building", value: "Barn-style structure" },
      { label: "Siding", value: "Burgundy board & batten" },
      { label: "Trim", value: "White" },
    ],
    story: ["Board and batten siding in a rich burgundy tone on a barn-style structure — traditional style with modern materials."],
    highlights: ["Vertical board & batten in burgundy", "Barn-style gables and trim"],
    photos: [p("burgundy-barn", 1, "Burgundy board and batten siding on a barn-style building in Grafton, MA")],
  },
  {
    slug: "new-construction-subdivision",
    title: "New Construction in a Subdivision",
    thesis: "Blue-gray vinyl on a new home in a Stoughton subdivision.",
    city: "Stoughton",
    state: "MA",
    citySlug: "stoughton",
    style: "New construction",
    look: "Blue-gray vinyl siding",
    facts: [
      { label: "Location", value: "Stoughton, MA" },
      { label: "Home", value: "New construction" },
      { label: "Siding", value: "Blue-gray vinyl" },
      { label: "Setting", value: "Residential subdivision" },
    ],
    story: ["New construction siding installation in a residential subdivision — blue-gray vinyl panels."],
    highlights: ["Blue-gray vinyl siding", "New-construction install"],
    photos: [p("new-construction-subdivision", 1, "New home with blue-gray vinyl siding in a Stoughton, MA subdivision")],
  },
  {
    slug: "upscale-gray-colonial",
    title: "Gray Colonial in Winter",
    thesis: "Gray siding on a colonial in Milton, finished and photographed in winter.",
    city: "Milton",
    state: "MA",
    citySlug: "milton",
    style: "Colonial",
    look: "Gray siding · white trim",
    facts: [
      { label: "Location", value: "Milton, MA" },
      { label: "Home", value: "Colonial" },
      { label: "Siding", value: "Gray" },
      { label: "Season", value: "Finished in winter" },
    ],
    story: ["Gray siding installation on a colonial home in Milton, finished in the winter."],
    highlights: ["Gray siding on a colonial", "Winter installation"],
    photos: [p("upscale-gray-colonial", 1, "Gray colonial with new siding in winter in Milton, MA")],
  },
  {
    slug: "gray-cape-cod",
    title: "Gray Cape Cod",
    thesis: "Gray vinyl siding on a classic Cape Cod in Boston.",
    city: "Boston",
    state: "MA",
    style: "Cape Cod",
    look: "Gray vinyl siding",
    facts: [
      { label: "Location", value: "Boston, MA" },
      { label: "Home", value: "Cape Cod" },
      { label: "Siding", value: "Gray vinyl" },
      { label: "Trim", value: "White" },
    ],
    story: ["Completed gray vinyl siding on a classic Cape Cod home in Boston."],
    highlights: ["Gray vinyl siding", "Cape Cod roofline and dormers"],
    photos: [p("gray-cape-cod", 1, "Gray vinyl siding on a Cape Cod home in Boston, MA")],
  },
  {
    slug: "ranch-with-brick",
    title: "Ranch with a Brick Front",
    thesis: "Vinyl siding blended with a brick front on a ranch in Medford.",
    city: "Medford",
    state: "MA",
    citySlug: "medford",
    style: "Ranch",
    look: "Vinyl siding · brick front",
    facts: [
      { label: "Location", value: "Medford, MA" },
      { label: "Home", value: "Ranch with brick front" },
      { label: "Siding", value: "Vinyl" },
      { label: "Scope", value: "Siding meets the brick front" },
    ],
    story: ["Vinyl siding installation on a ranch home with a brick front accent — partial siding that blends the two materials."],
    highlights: ["Vinyl siding on the sides and gables", "Clean transition to the brick front"],
    photos: [p("ranch-with-brick", 1, "Ranch home in Medford, MA with vinyl siding and a brick front")],
  },
  {
    slug: "commercial-multi-family",
    title: "Multi-Family Building, Sheathing & Wrap",
    thesis: "Sheathing and house wrap on a multi-family building in Newington, CT, ready for siding.",
    city: "Newington",
    state: "CT",
    style: "Multi-family",
    look: "Sheathing · house wrap",
    facts: [
      { label: "Location", value: "Newington, CT" },
      { label: "Building", value: "Multi-family" },
      { label: "Stage", value: "Sheathing & wrap" },
      { label: "Next", value: "Siding installation" },
    ],
    story: ["Large-scale sheathing and insulation wrap on a multi-family building — the preparation stage before the siding goes on."],
    highlights: ["Sheathing on a multi-story building", "Weather-resistant wrap before siding"],
    photos: [
      p("commercial-multi-family", 1, "Multi-family building with sheathing and house wrap in Newington, CT"),
      p("commercial-multi-family", 2, "Close-up of sheathing and wrap on the Newington building", 1800, 2400),
    ],
  },
];

/* Jobs with one or two good photos, or a city not yet confirmed: shown as
   cards on /projects only. */
export interface RecentWork {
  src: string;
  caption: string;
  place?: string;
}

export const RECENT_WORK: RecentWork[] = [
  { src: "/projects/obras-recentes/boston-ma-four-story-apartment-siding.jpg", caption: "Four-story apartment building", place: "Boston, MA" },
  { src: "/projects/obras-recentes/norwood-ma-three-story-gray-blue-siding.jpg", caption: "Three-story home, gray and blue", place: "Norwood, MA" },
  { src: "/projects/obras-recentes/woburn-ma-multi-family-house-wrap.jpg", caption: "Multi-family house wrap", place: "Woburn, MA" },
  { src: "/projects/obras-recentes/edgartown-ma-new-construction-crew.jpg", caption: "Crew on a new build", place: "Edgartown, MA" },
  { src: "/projects/obras-recentes/sandown-nh-modern-home-siding.jpg", caption: "Modern home with black windows", place: "Sandown, NH" },
  { src: "/projects/obras-recentes/rhode-island-blue-gray-siding-stone.jpg", caption: "Blue-gray siding with stone accents", place: "Rhode Island" },
  { src: "/projects/obras-recentes/white-cape-dormers-siding.jpg", caption: "White Cape with dormers" },
  { src: "/projects/obras-recentes/craftsman-bungalow-porch-siding.jpg", caption: "Craftsman bungalow with front porch" },
  { src: "/projects/obras-recentes/gray-colonial-cupola-siding.jpg", caption: "Gray colonial with cupola" },
  { src: "/projects/obras-recentes/light-gray-colonial-garage-siding.jpg", caption: "Light gray colonial with garage" },
  { src: "/projects/obras-recentes/two-family-new-porch-siding.jpg", caption: "Two-family home with new porch" },
  { src: "/projects/obras-recentes/gray-three-story-home-siding.jpg", caption: "Gray three-story home" },
  { src: "/projects/obras-recentes/gray-building-exterior-stairs-siding.jpg", caption: "Gray building with exterior stairs" },
  { src: "/projects/obras-recentes/white-home-exterior-stairs-siding.jpg", caption: "White home with exterior stairs" },
  { src: "/projects/obras-recentes/crew-three-story-build-house-wrap.jpg", caption: "Crew at work on a three-story build" },
  { src: "/projects/obras-recentes/crew-finishing-gable-siding.jpg", caption: "Crew finishing a gable on site" },
];

export function getCase(slug: string): PortfolioCase | undefined {
  return PORTFOLIO.find((c) => c.slug === slug);
}

export function relatedCases(c: PortfolioCase, n = 3): PortfolioCase[] {
  const sameState = PORTFOLIO.filter((x) => x.slug !== c.slug && x.state === c.state);
  const rest = PORTFOLIO.filter((x) => x.slug !== c.slug && x.state !== c.state);
  return [...sameState, ...rest].slice(0, n);
}
