/* Upgrades from vinyl siding — requested by the owner (Nov 2026): homeowners who
   ask for vinyl should see, right in the menu and on the vinyl page, that there
   are step-up materials. One short, factual line per option (see the service
   pages for the manufacturer sources). */
/* `short` is the one-line tag used in the menu flyout (it must fit one line in
   a 2-column grid); `note` is the fuller line used on the vinyl page. */
export const VINYL_UPGRADES: { name: string; path: string; short: string; note: string }[] = [
  { name: "James Hardie Plank", path: "/services/hardie-plank-siding-installation", short: "Fiber cement", note: "Fiber cement lap siding — noncombustible, 30-year substrate warranty" },
  { name: "Everlast Composite", path: "/services/everlast-siding", short: "No painting needed", note: "Thicker, stiffer than vinyl; color built in, no painting" },
  { name: "LP SmartSide", path: "/services/lp-smartside-siding", short: "Engineered wood", note: "Engineered wood — the look of wood, lighter than fiber cement" },
  { name: "James Hardie Panel", path: "/services/james-hardie-panel-siding", short: "Board & batten", note: "Vertical fiber cement for board & batten looks" },
  { name: "Cedar Impressions", path: "/services/cedar-impressions-siding", short: "Cedar look, no stain", note: "Polymer shakes and shingles with a cedar look" },
  { name: "Wood Clapboard", path: "/services/clapboard-siding-installation", short: "Real wood", note: "Real wood lap siding — the traditional New England wall" },
  { name: "Cedar Shingles", path: "/services/cedar-shingle-siding", short: "Natural cedar", note: "Natural cedar shingles" },
  { name: "CeraClad", path: "/services/ceraclad-fiber-cement-siding", short: "Rainscreen panels", note: "Fiber cement rainscreen panels for modern exteriors" },
];
