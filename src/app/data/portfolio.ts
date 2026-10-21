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
  state: "MA" | "NH" | "RI";
  /** slug of the matching /[city] page, when we have one */
  citySlug?: string;
  style: string;
  look: string;
  facts: CaseFact[];
  story: string[];
  highlights: string[];
  photos: CasePhoto[];
}

const p = (slug: string, n: number, alt: string): CasePhoto => ({
  src: `/projects/${slug}/${String(n).padStart(2, "0")}.jpg`,
  alt,
  width: 1800,
  height: 1350,
});

export const STATE_NAME = { MA: "Massachusetts", NH: "New Hampshire", RI: "Rhode Island" } as const;

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
];

/* Jobs with one or two good photos, or a city not yet confirmed: shown as
   cards on /projects only. */
export interface RecentWork {
  src: string;
  caption: string;
  place?: string;
}

export const RECENT_WORK: RecentWork[] = [
  { src: "/projects/obras-recentes/projeto-07.jpg", caption: "Four-story apartment building", place: "Boston, MA" },
  { src: "/projects/obras-recentes/projeto-18.jpg", caption: "Three-story home, gray and blue", place: "Norwood, MA" },
  { src: "/projects/obras-recentes/projeto-24.jpg", caption: "Blue-gray siding with stone accents", place: "Rhode Island" },
  { src: "/projects/obras-recentes/projeto-26.jpg", caption: "Modern home with black windows", place: "Sandown, NH" },
  { src: "/projects/obras-recentes/projeto-21.jpg", caption: "White Cape with dormers" },
  { src: "/projects/obras-recentes/projeto-23.jpg", caption: "Craftsman bungalow with front porch" },
  { src: "/projects/obras-recentes/projeto-22.jpg", caption: "Gray colonial with cupola" },
  { src: "/projects/obras-recentes/projeto-34.jpg", caption: "Light gray colonial with garage" },
  { src: "/projects/obras-recentes/projeto-08.jpg", caption: "Two-family home with new porch" },
  { src: "/projects/obras-recentes/projeto-16.jpg", caption: "Gray three-story home" },
  { src: "/projects/obras-recentes/projeto-10.jpg", caption: "Gray building with exterior stairs" },
  { src: "/projects/obras-recentes/projeto-36.jpg", caption: "White home with exterior stairs" },
  { src: "/projects/obras-recentes/projeto-13.jpg", caption: "Crew at work on a three-story build" },
  { src: "/projects/obras-recentes/projeto-31.jpg", caption: "Crew finishing a gable on site" },
];

export function getCase(slug: string): PortfolioCase | undefined {
  return PORTFOLIO.find((c) => c.slug === slug);
}

export function relatedCases(c: PortfolioCase, n = 3): PortfolioCase[] {
  const sameState = PORTFOLIO.filter((x) => x.slug !== c.slug && x.state === c.state);
  const rest = PORTFOLIO.filter((x) => x.slug !== c.slug && x.state !== c.state);
  return [...sameState, ...rest].slice(0, n);
}
