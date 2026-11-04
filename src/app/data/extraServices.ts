/* ═══════════════════════════════════════════════════════════════════════
   STATEWIDE-ONLY SERVICES — added Nov 2026 from the owner's service list.

   These get ONE page each under /services/{slug} and deliberately NO
   city × service combinations: multiplying them across 109 towns is exactly
   the scaled-content pattern the August 2026 spam update punished.

   Product facts (warranties, materials, profiles) were checked against the
   manufacturers' own sites in Nov 2026; the source URL sits next to each
   claim. Warranty terms change — re-check before quoting a customer.
   We do not claim any manufacturer certification here: add one only when
   the owner confirms it and it is verifiable.
   ═══════════════════════════════════════════════════════════════════════ */

export interface ExtraService {
  slug: string;
  name: string;
  title: string; // ≤ 60 chars
  description: string; // ≤ 158 chars
  image: string;
  imageAlt: string;
  lead: string;
  sections: { h: string; p: string[] }[];
  facts?: { label: string; value: string; source?: string }[];
  faqs: { q: string; a: string }[];
  related: { label: string; href: string }[];
}

const HARDIE_WARRANTY = "https://www.jameshardie.com/product-support/warranty-information";

export const EXTRA_SERVICES: ExtraService[] = [
  {
    slug: "everlast-siding",
    name: "Everlast Composite Siding",
    title: "Everlast Composite Siding in MA | Wolf's Siding",
    description: "Everlast advanced composite siding installed by Wolf's Siding across Massachusetts — lap and board & batten profiles. Free written estimates.",
    image: "/services/siding-replacement-2.jpg",
    imageAlt: "House re-sided by Wolf's Siding in Massachusetts",
    lead: "Everlast is a composite lap and board & batten siding made by Chelsea Building Products. It sits between vinyl and fiber cement: thicker and stiffer than vinyl, lighter to handle than fiber cement, and it does not need painting.",
    sections: [
      {
        h: "What Everlast is made of",
        p: [
          "Everlast is co-extruded: a mineral-filled composite core with a 100% acrylic cap on the face. The manufacturer's spec sheet lists the lap profile at 0.225\" thick and the board & batten at 0.325\" — noticeably more rigid than standard vinyl, which is why it lies flatter on an uneven older wall.",
          "The CedarTouch surface is imprinted from real rough-sawn cedar, so it reads as painted wood from the street.",
        ],
      },
      {
        h: "Where it makes sense in Massachusetts",
        p: [
          "Everlast is a good fit when you want the low upkeep of vinyl but a heavier, more solid-looking board — on colonials and capes where the siding is the whole look of the house, and on modern farmhouse exteriors using the vertical board & batten profile.",
          "Freeze-thaw is the main stress on siding here. The manufacturer publishes freeze-thaw strength retention and low water absorption figures for the product; we still install it with the same attention to housewrap, flashing and fastening that any cladding needs.",
        ],
      },
    ],
    facts: [
      { label: "Manufacturer", value: "Chelsea Building Products (Oakmont, PA)", source: "https://www.everlastsiding.com/warranty" },
      { label: "Profiles", value: "7\" and 4½\" lap; vertical board & batten", source: "https://www.everlastsiding.com/products" },
      { label: "Warranty", value: "Limited lifetime for the original owner; 50-year prorated after a change of ownership", source: "https://www.everlastsiding.com/warranty" },
    ],
    faqs: [
      { q: "Is Everlast the same as vinyl siding?", a: "No. It contains PVC, but the core is mineral-filled and it has an acrylic cap, and it is roughly twice as thick as typical vinyl lap. It installs more like a premium vinyl than like fiber cement — no painting, lighter than Hardie." },
      { q: "Does Everlast need to be painted?", a: "No. The color is part of the material and the cap layer, and the manufacturer's warranty covers fading under its terms." },
    ],
    related: [
      { label: "Vinyl siding", href: "/services/vinyl-siding-installation" },
      { label: "Board & batten siding", href: "/services/board-and-batten-siding" },
      { label: "Siding replacement", href: "/services/full-siding-replacement" },
    ],
  },
  {
    slug: "james-hardie-panel-siding",
    name: "James Hardie Panel Siding",
    title: "James Hardie Panel Siding in MA | Wolf's Siding",
    description: "HardiePanel vertical fiber cement siding installed by Wolf's Siding in Massachusetts — board & batten looks, noncombustible, low upkeep. Free estimates.",
    image: "/services/hardie-plank-siding.jpg",
    imageAlt: "Fiber cement siding installed by Wolf's Siding",
    lead: "HardiePanel is James Hardie's vertical fiber cement siding. Paired with Hardie trim battens it gives the board & batten look of a modern farmhouse; on its own it covers gables, accent walls and whole elevations in a flat, clean panel.",
    sections: [
      {
        h: "Why fiber cement panel",
        p: [
          "Fiber cement is noncombustible and, in James Hardie's words, holds no appeal for woodpeckers or termites — two things that matter on wooded lots in Massachusetts.",
          "Panels come in several textures (smooth, cedarmill, stucco and others, depending on availability). With ColorPlus the color is factory-applied and baked on, so the house does not need painting on day one.",
        ],
      },
      {
        h: "Installing it well",
        p: [
          "Vertical panels show every flaw in the wall behind them and every misaligned batten. Most of the work is in the layout: batten spacing that lands evenly at the corners and windows, sealed and flashed horizontal joints, and trim details that let water out instead of trapping it.",
        ],
      },
    ],
    facts: [
      { label: "Material", value: "Fiber cement, noncombustible", source: "https://www.jameshardie.com/products/hardiepanel-vertical-siding" },
      { label: "Substrate warranty", value: "30-year non-prorated, transferable limited", source: "https://www.jameshardie.com/products/hardiepanel-vertical-siding" },
      { label: "ColorPlus finish warranty", value: "15-year limited, covers paint and labor", source: HARDIE_WARRANTY },
    ],
    faqs: [
      { q: "What is the difference between HardiePanel and HardiePlank?", a: "HardiePlank is horizontal lap siding; HardiePanel is a vertical sheet. Panel is what you use for board & batten and for flat, modern elevations; plank gives the traditional clapboard line." },
      { q: "Can HardiePanel be combined with lap siding?", a: "Yes — a common New England detail is lap siding on the main walls and panel with battens in the gables or on an addition." },
    ],
    related: [
      { label: "James Hardie Plank siding", href: "/services/hardie-plank-siding-installation" },
      { label: "Board & batten siding", href: "/services/board-and-batten-siding" },
      { label: "Exterior trim", href: "/services/exterior-trim-work" },
    ],
  },
  {
    slug: "lp-smartside-siding",
    name: "LP SmartSide Siding",
    title: "LP SmartSide Siding in Massachusetts | Wolf's Siding",
    description: "LP SmartSide engineered wood lap and panel siding installed by Wolf's Siding across Massachusetts. Lighter than fiber cement, wood look. Free estimates.",
    image: "/services/siding-replacement-3.jpg",
    imageAlt: "Siding installation by Wolf's Siding crew",
    lead: "LP SmartSide is engineered wood siding from LP Building Solutions. It looks and cuts like wood, weighs much less than fiber cement, and is treated through the core to resist moisture, fungal decay and termites.",
    sections: [
      {
        h: "How SmartSide is made",
        p: [
          "LP treats wood strands with waxes, resins and zinc borate (its SmartGuard process) and bonds them under a resin-saturated overlay. The result comes in long lengths — fewer butt joints on a long wall — and in lap, panel and vertical profiles, including a board & batten look.",
          "It can be bought primed for painting or prefinished (ExpertFinish), which carries its own finish warranty.",
        ],
      },
      {
        h: "What matters on the install",
        p: [
          "Engineered wood is durable when its edges and cut ends are sealed and when it is kept the right distance off roofs, decks and grade. Those clearances are where SmartSide jobs succeed or fail, so they are the first thing we check on a wall.",
        ],
      },
    ],
    facts: [
      { label: "Manufacturer", value: "LP Building Solutions (Louisiana-Pacific)", source: "https://www.lpcorp.com/products/siding-trim/panel-vertical-siding" },
      { label: "Warranty", value: "5/50-year prorated limited (labor and material in years 1–5)", source: "https://www.lpcorp.com/products/siding-trim/panel-vertical-siding" },
      { label: "Prefinished option", value: "ExpertFinish, with a 15-year finish warranty", source: "https://www.lpcorp.com/resources/product-literature/smartside/warranties/lp-smartside-expertfinish-limited-warranty" },
    ],
    faqs: [
      { q: "Is LP SmartSide real wood?", a: "It is engineered wood — real wood strands, treated and bonded with resins under a protective overlay. It machines and nails like wood but is more stable." },
      { q: "Does the LP warranty transfer when I sell the house?", a: "Per LP's warranty text, coverage extends to the original owner and the next owner of the structure, and not beyond that. Read the current warranty before relying on it." },
    ],
    related: [
      { label: "Board & batten siding", href: "/services/board-and-batten-siding" },
      { label: "Wood clapboard siding", href: "/services/clapboard-siding-installation" },
      { label: "Exterior trim", href: "/services/exterior-trim-work" },
    ],
  },
  {
    slug: "board-and-batten-siding",
    name: "Board & Batten Siding",
    title: "Board & Batten Siding in Massachusetts | Wolf's Siding",
    description: "Board & batten siding in fiber cement, engineered wood or composite, installed by Wolf's Siding across Massachusetts. See real jobs. Free estimates.",
    image: "/projects/obras/washington-nh-charcoal-board-and-batten.jpg",
    imageAlt: "Charcoal board and batten cabin sided by Wolf's Siding",
    lead: "Board & batten is vertical siding with narrow battens covering the seams. It is the defining look of barns and the modern farmhouse, and we have installed it on cabins, barns and new homes — see our projects page.",
    sections: [
      {
        h: "Which material",
        p: [
          "Board & batten is a look, not a product, and three of the lines we install offer it: James Hardie (HardiePanel with trim battens), LP SmartSide (panel and vertical siding) and Everlast (a vertical profile with an integral batten). Each trades off weight, finish and price differently — fiber cement is the heaviest and noncombustible, engineered wood is lightest and most wood-like, composite needs no paint.",
        ],
      },
      {
        h: "Getting the spacing right",
        p: [
          "The eye catches uneven batten spacing immediately. We lay battens out from the center of each wall so they land evenly at corners, windows and doors, and detail the horizontal joints so water is shed rather than held.",
        ],
      },
    ],
    faqs: [
      { q: "Can I mix board & batten with lap siding?", a: "Yes. Board & batten in the gables or on one wing with lap siding on the rest is a common, well-proportioned combination on New England homes." },
      { q: "Have you done board & batten jobs?", a: "Yes — see the charcoal board & batten cabin and the burgundy board & batten barn on our projects page." },
    ],
    related: [
      { label: "James Hardie Panel", href: "/services/james-hardie-panel-siding" },
      { label: "LP SmartSide", href: "/services/lp-smartside-siding" },
      { label: "Our projects", href: "/projects" },
    ],
  },
  {
    slug: "cedar-impressions-siding",
    name: "Cedar Impressions",
    title: "Cedar Impressions Siding in MA | Wolf's Siding",
    description: "CertainTeed Cedar Impressions polymer shake and shingle siding installed by Wolf's Siding in Massachusetts — the cedar look without the upkeep.",
    image: "/services/cedar-shingle-siding.jpg",
    imageAlt: "Shingle-style siding on a New England home",
    lead: "Cedar Impressions is CertainTeed's polymer shake and shingle siding. It is molded from real cedar so it reads as shingles from the street, but it does not need staining, does not split and does not hold moisture the way wood does.",
    sections: [
      {
        h: "Profiles",
        p: [
          "CertainTeed offers it as individual-look sawmill shingles, straight-edge perfection shingles and rough-split shakes, with molded locks and reinforced nail slots on the panels.",
          "It is often used in gables and on dormers above lap siding, or over a whole Cape for the classic shingle look.",
        ],
      },
      {
        h: "Cedar Impressions or real cedar?",
        p: [
          "Real cedar shingles weather naturally and suit historic houses and districts that require wood. Cedar Impressions suits owners who want the look without restaining every few years. If your house is in a local historic district, check with the commission first — some do not allow synthetic materials.",
        ],
      },
    ],
    facts: [
      { label: "Manufacturer", value: "CertainTeed", source: "https://www.certainteed.com/siding/cedar-impressions" },
      { label: "Warranty", value: "Lifetime limited", source: "https://www.certainteed.com/learn-more-about-cedar-impressions-quality" },
    ],
    faqs: [
      { q: "Is Cedar Impressions vinyl?", a: "It is a molded polymer siding — CertainTeed classes it with its vinyl siding products — formed from real cedar shingles for texture." },
    ],
    related: [
      { label: "Cedar shingles", href: "/services/cedar-shingle-siding" },
      { label: "Vinyl siding", href: "/services/vinyl-siding-installation" },
    ],
  },
  {
    slug: "ceraclad-fiber-cement-siding",
    name: "CeraClad Fiber Cement Siding",
    title: "CeraClad Fiber Cement Siding in MA | Wolf's Siding",
    description: "CeraClad fiber cement rainscreen panels installed by Wolf's Siding in Massachusetts — factory-coated, self-cleaning finish, built-in rainscreen.",
    image: "/services/specialty-section.jpg",
    imageAlt: "Modern panel siding",
    lead: "CeraClad is a fiber cement wall panel system made in Japan by KMEW. Each panel has a built-in rainscreen and a factory coating with ceramic and photocatalytic layers that the manufacturer describes as self-cleaning. It is a choice for modern exteriors and commercial or multi-family work.",
    sections: [
      {
        h: "What is different about it",
        p: [
          "The panels are 5/8\" thick and hang on a clip system with a ventilated gap behind them — a rainscreen — so water that gets past the face drains and the wall dries. The factory finish carries a separate color-fade warranty.",
          "CeraClad is sold through KMEW USA. Lead times and availability are different from the lap sidings stocked locally, so we plan the order early in the project.",
        ],
      },
    ],
    facts: [
      { label: "Manufacturer", value: "KMEW (US arm: KMEW USA Inc.)", source: "https://ceraclad.com/about-us" },
      { label: "Product warranty", value: "30 years", source: "https://ceraclad.com/" },
      { label: "Finish warranty", value: "20 years, color-fade", source: "https://ceraclad.com/" },
    ],
    faqs: [
      { q: "Is CeraClad the same as Hardie siding?", a: "Both are fiber cement, but CeraClad is a large-format panel with an integrated rainscreen and clip installation and a factory ceramic coating, while HardiePlank is lap siding nailed to the wall." },
    ],
    related: [
      { label: "James Hardie Panel", href: "/services/james-hardie-panel-siding" },
      { label: "James Hardie Plank", href: "/services/hardie-plank-siding-installation" },
    ],
  },
  {
    slug: "pvc-trim-installation",
    name: "PVC Trim Installation",
    title: "PVC Trim Installation in Massachusetts | Wolf's Siding",
    description: "Cellular PVC exterior trim installed by Wolf's Siding in Massachusetts — corner boards, casings, fascia and rake boards that will not rot.",
    image: "/services/trim-gallery.jpg",
    imageAlt: "White exterior trim detail",
    lead: "Cellular PVC trim (brands such as AZEK and VERSATEX) replaces wood corner boards, window and door casings, fascia, rake boards and frieze boards with a material that does not absorb water and does not rot.",
    sections: [
      {
        h: "Why PVC for trim",
        p: [
          "Trim is where an older house rots first: end grain at the bottom of corner boards, the sill under a window, the fascia behind a gutter. Cellular PVC has no wood fibers to absorb water, so those spots stop being a maintenance item. It comes white through and can be painted, and VERSATEX notes painting is not required to keep its warranty.",
          "PVC expands and contracts more than wood with temperature, so long runs need the right fasteners, glued and fastened joints, and room to move. That detailing is what keeps the joints tight through a Massachusetts winter.",
        ],
      },
    ],
    facts: [
      { label: "AZEK trim warranty", value: "Lifetime limited", source: "https://spec.azek.com/products/trim/" },
      { label: "VERSATEX warranty", value: "Limited lifetime, transferable", source: "https://www.versatex.com" },
    ],
    faqs: [
      { q: "Can PVC trim be painted?", a: "Yes, with paints rated for PVC (lighter colors are recommended by most manufacturers because dark colors absorb more heat). It also works unpainted." },
    ],
    related: [
      { label: "Exterior trim", href: "/services/exterior-trim-work" },
      { label: "Soffit & fascia", href: "/services/soffit-and-fascia" },
      { label: "Window & door trim", href: "/services/window-and-door-trim" },
    ],
  },
  {
    slug: "soffit-and-fascia",
    name: "Soffit & Fascia Installation",
    title: "Soffit & Fascia Installation in MA | Wolf's Siding",
    description: "Soffit and fascia replacement by Wolf's Siding in Massachusetts — vented soffit, rot-free fascia, done with the siding or on its own. Free estimates.",
    image: "/services/exterior-trim.jpg",
    imageAlt: "Roof edge with new fascia and soffit",
    lead: "The fascia is the board along the roof edge that the gutters hang on; the soffit closes the underside of the overhang. Together they keep water, birds and insects out of the roof framing — and vented soffit is where most homes draw air into the attic.",
    sections: [
      {
        h: "Signs it is time",
        p: [
          "Peeling paint and soft spots on the fascia, gutters pulling away, stains on the soffit, or animals getting into the attic. Rot usually starts behind the gutter, where water sits against the fascia board.",
        ],
      },
      {
        h: "How we do it",
        p: [
          "Done right, rotted wood comes out, the rafter tails are checked, and the new fascia goes in PVC or aluminum-wrapped wood. Vented soffit is matched to the attic's ridge or roof vents so the attic can breathe — that airflow matters for ice dams in a New England winter. It is usually done together with new siding or gutters, but can be its own job.",
        ],
      },
    ],
    faqs: [
      { q: "Should soffit and fascia be replaced with the siding?", a: "If the siding is coming off anyway it is the cheapest time to do it — the staging is already up and the trim details tie together." },
    ],
    related: [
      { label: "PVC trim", href: "/services/pvc-trim-installation" },
      { label: "Seamless gutters", href: "/services/gutter-installation" },
      { label: "Roofing", href: "/services/roofing-installation" },
    ],
  },
  {
    slug: "window-and-door-trim",
    name: "Window & Door Exterior Trim",
    title: "Window & Door Exterior Trim in MA | Wolf's Siding",
    description: "Exterior window and door casings, sills and headers rebuilt by Wolf's Siding in Massachusetts — properly flashed, in PVC or wood.",
    image: "/services/trim-gallery.jpg",
    imageAlt: "Window casing and trim detail",
    lead: "The trim around windows and doors is both the most visible detail on a facade and the most common place for water to get into a wall. We rebuild casings, sills and head trim and flash them properly — on their own or as part of new siding.",
    sections: [
      {
        h: "Detail and water",
        p: [
          "A good casing has a head flashing or drip cap that throws water past the trim, a sill that slopes away from the window, and sealant only where it belongs. On older homes we match the casing width and profile so the house keeps its character; on newer ones we usually upgrade first-generation pine trim to PVC.",
        ],
      },
    ],
    faqs: [
      { q: "Can you trim new windows that someone else installed?", a: "Yes. Trimming out and flashing windows is part of our siding work, and we can also do it on its own." },
    ],
    related: [
      { label: "Window replacement", href: "/services/window-replacement" },
      { label: "PVC trim", href: "/services/pvc-trim-installation" },
      { label: "Exterior trim", href: "/services/exterior-trim-work" },
    ],
  },
  {
    slug: "window-replacement",
    name: "Window Replacement",
    title: "Window Replacement in Massachusetts | Wolf's Siding",
    description: "Window replacement by Wolf's Siding in Massachusetts — insert or full-frame, flashed and trimmed with the siding. Free written estimates.",
    image: "/services/siding-replacement-1.jpg",
    imageAlt: "Home exterior with new windows and siding",
    lead: "We replace windows on their own or together with new siding, when the walls are open and the flashing and trim can be done right around every opening.",
    sections: [
      {
        h: "Insert or full-frame",
        p: [
          "An insert (pocket) window fits inside the existing frame — less disruption, but a slightly smaller glass area and it relies on the old frame being sound. A full-frame replacement removes everything down to the rough opening, so the opening can be inspected, re-flashed and insulated. When the siding is coming off anyway, full-frame is usually the better choice.",
        ],
      },
      {
        h: "Older homes",
        p: [
          "On homes built before 1978, replacing windows disturbs painted surfaces, and federal EPA lead-safe (RRP) work practices apply. Ask any contractor how they handle it before work starts.",
        ],
      },
    ],
    faqs: [
      { q: "Should I replace windows before or after new siding?", a: "Ideally at the same time, or windows first. Doing windows after the siding means cutting back new siding and trim around every opening." },
    ],
    related: [
      { label: "Window & door trim", href: "/services/window-and-door-trim" },
      { label: "Siding replacement", href: "/services/full-siding-replacement" },
    ],
  },
  {
    slug: "gutter-guards",
    name: "Gutter Guards",
    title: "Gutter Guards in Massachusetts | Wolf's Siding",
    description: "Gutter guards installed by Wolf's Siding in Massachusetts — keep leaves and pine needles out of the gutters and downspouts. Free estimates.",
    image: "/services/gutter-black.jpg",
    imageAlt: "Black seamless gutter on a house",
    lead: "Gutter guards keep leaves, pine needles and shingle grit out of the gutters so water actually reaches the downspouts. On wooded Massachusetts lots they turn twice-a-year gutter cleaning into an occasional check.",
    sections: [
      {
        h: "Types",
        p: [
          "Screens and perforated covers stop leaves but let fine debris through. Micro-mesh guards stop pine needles and grit as well, which matters under white pines. Reverse-curve (hood) guards shed debris over the edge and work best on simpler rooflines.",
          "No guard is maintenance-free: debris can sit on top and needs brushing off now and then. What a guard removes is the clogged downspout and the overflowing gutter in a heavy rain.",
        ],
      },
    ],
    faqs: [
      { q: "Can guards go on my existing gutters?", a: "Usually, if the gutters are sound, properly pitched and securely hung. If they are not, it is better to replace the gutters and add guards at the same time." },
    ],
    related: [
      { label: "Seamless gutters & downspouts", href: "/services/gutter-installation" },
      { label: "Soffit & fascia", href: "/services/soffit-and-fascia" },
    ],
  },
  {
    slug: "custom-exterior-work",
    name: "Custom Exterior Work",
    title: "Custom Exterior Work in Massachusetts | Wolf's Siding",
    description: "Exterior projects that don't fit one category — mixed materials, matching existing details, additions and builder work — by Wolf's Siding in MA.",
    image: "/projects/obras/grafton-ma-craftsman-rear-porch.jpg",
    imageAlt: "Craftsman home with two-level porch, Grafton, MA",
    lead: "Some exteriors are not one product on four walls: lap siding with shingle gables and board & batten on an addition, new siding that has to meet existing stone and porch columns, or a builder's new construction with its own spec. That is the custom work we take on.",
    sections: [
      {
        h: "Typical projects",
        p: [
          "Mixed-material facades; additions matched to the existing house; trim and siding details around porches, columns and stone; and exterior packages for builders on new homes. The Grafton craftsman on our projects page — lap siding meeting a stone base and a two-level porch — is a good example.",
        ],
      },
    ],
    faqs: [
      { q: "Do you work with builders and general contractors?", a: "Yes. We do the siding and exterior trim package on new construction and additions for builders, as well as work directly for homeowners." },
    ],
    related: [
      { label: "Our projects", href: "/projects" },
      { label: "Board & batten siding", href: "/services/board-and-batten-siding" },
      { label: "Exterior trim", href: "/services/exterior-trim-work" },
    ],
  },
];

export function getExtraService(slug: string): ExtraService | undefined {
  return EXTRA_SERVICES.find((s) => s.slug === slug);
}
