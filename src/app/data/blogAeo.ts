import type { BlogPost } from "./blog";

/* ═══════════════════════════════════════════════════════════════════════
   AEO ARTICLES (Nov 2026) — written question-first: each section heading is
   the question a homeowner types or asks an assistant, and the first
   sentence under it is the direct answer.

   Every regulatory statement links to the rule or agency page it rests on.
   Deliberately NOT stated (could not be confirmed): the current Guaranty
   Fund cap (c.142A was amended in 2024), and any license Wolf's holds other
   than HIC #218835. author: "company" until the owner reviews the text.
   ═══════════════════════════════════════════════════════════════════════ */

const S = {
  cslReg: { label: "780 CMR 110.R5 — Construction supervisor licensing and registration (Cornell LII)", url: "https://www.law.cornell.edu/regulations/massachusetts/780-CMR-110-R5" },
  cslHandbook: { label: "Massachusetts DPS — Construction Supervisor License candidate handbook", url: "https://www.mass.gov/doc/csl-candidate-handbook/download" },
  hicTips: { label: "City of Boston — Home improvement and contracting tips", url: "https://www.boston.gov/departments/consumer-affairs/home-improvement-and-contracting-tips" },
  permitWarning: { label: "Mass. Office of Consumer Affairs — Building permit warning", url: "https://www.mass.gov/doc/building-permit-warning/download" },
  hicFund: { label: "201 CMR 14.00 — HIC Arbitration and Guaranty Fund", url: "https://www.mass.gov/regulations/201-CMR-1400-home-improvement-contractor-arbitration-and-guaranty-fund" },
  asbestosReg: { label: "310 CMR 7.15 — MassDEP asbestos regulation (Cornell LII)", url: "https://www.law.cornell.edu/regulations/massachusetts/310-CMR-7-15" },
  asbestosNotify: { label: "MassDEP — File an AQ 04 (ANF-001) asbestos removal notification", url: "https://www.mass.gov/how-to/file-an-aq-04-anf-001-asbestos-removal-notification" },
  leadReg: { label: "454 CMR 22.00 — Deleading and lead-safe renovation (Cornell LII)", url: "https://www.law.cornell.edu/regulations/massachusetts/department-454-CMR/title-454-CMR-22.00" },
  leadWork: { label: "454 CMR 22.11 — Work practices for renovation work", url: "https://www.law.cornell.edu/regulations/massachusetts/454-CMR-22-11" },
  hardieZones: { label: "James Hardie — Hardie Zone System", url: "https://www.jameshardie.com/hardie-zone-system" },
  hardieWarranty: { label: "James Hardie — Warranty information", url: "https://www.jameshardie.com/product-support/warranty-information" },
  hardiePlank: { label: "James Hardie — HardiePlank lap siding", url: "https://www.jameshardie.com/products/hardieplank-lap-siding" },
};

export const AEO_POSTS: BlogPost[] = [
  {
    slug: "siding-permit-massachusetts",
    title: "Do You Need a Permit to Replace Siding in Massachusetts?",
    excerpt:
      "Usually yes. What the building code says, who should pull the permit, which licenses a siding contractor needs, and what changes in a historic district.",
    heroImage: "/services/siding-replacement-1.jpg",
    category: "Permits & Rules",
    date: "2026-11-04",
    readTime: "6 min read",
    relatedService: "full-siding-replacement",
    author: "company",
    content: [
      "## Do you need a building permit to replace siding in Massachusetts?\n\nIn most cases, yes. The Massachusetts building code requires a permit to construct, alter, repair or remove part of a building, and only ordinary repairs are exempt. Whether a re-side counts as an ordinary repair is the building official's call, and many towns require a permit for it. Some towns go further and list siding and roofing as their own permit types; [Boylston's permit application](/boylston), for example, has separate boxes for both. The building department in your town has the final word, so ask before work starts.",

      "## Who should pull the permit — you or the contractor?\n\nThe contractor. When you hire someone, the state's Office of Consumer Affairs advises that the contractor obtain the permit, and it warns that a homeowner who pulls the permit for work done by a hired contractor gives up access to the state's Home Improvement Contractor Guaranty Fund. Many towns make you sign an affidavit acknowledging that waiver if you apply yourself. If a contractor asks you to pull the permit \"to save time,\" treat it as a red flag.",

      "## What licenses does a siding contractor need in Massachusetts?\n\nTwo different things, and it is fair to ask for both numbers:\n\n- **Home Improvement Contractor (HIC) registration** — required for contractors doing residential work worth more than $1,000 on an existing one-to-four family home where the owner lives. Only work by a registered contractor can be covered by the Guaranty Fund.\n- **Construction Supervisor License (CSL)** — since 2008 the building code has a specialty CSL category for windows, doors and siding on one- and two-family homes and small buildings. Towns apply the licensing rules to siding permits differently, so ask who on the job holds the license your building department expects.\n\nYou can look up both on the state's license-check site. Wolf's Siding Inc. is registered as HIC #218835.",

      "## What if your house is in a historic district?\n\nIf your property is inside a local historic district created under Massachusetts General Law Chapter 40C, exterior changes visible from the street usually need a certificate from the town's historic district commission before the building permit is issued. That is the case in [Sudbury's four districts](/sudbury) and in [Boylston's district](/boylston), where siding is reviewed but roof color and material are exempt. A National Register listing on its own does not add this step — the local district does.",

      "## Do you also need an electrical permit?\n\nSometimes. Taking siding off exposes outdoor outlets, lights and service entrances, and some towns ask whether electrical work is involved on the siding permit application. If fixtures have to be moved or replaced, a licensed electrician pulls that permit.",

      "## Does the house's age change anything?\n\nYes. Homes built before 1978 may have lead paint, which brings state lead-safe renovation rules, and older siding can contain asbestos, which has its own MassDEP rules. Both are covered in our guide to [re-siding a house built before 1978](/blog/re-siding-pre-1978-house-massachusetts).",

      "## How long does a permit take?\n\nIt varies by town and by season, and historic-district review adds a commission meeting. Build that time into the schedule before ordering materials.",
    ],
    faq: [
      { q: "Is a permit required to replace siding in Massachusetts?", a: "Generally yes. The state building code requires a permit for alterations and removals except ordinary repairs, and a full re-side is usually not an ordinary repair. Your town's building department makes the final call." },
      { q: "Should the homeowner or the contractor pull the siding permit?", a: "The contractor. The Massachusetts Office of Consumer Affairs warns that a homeowner who pulls the permit for a hired contractor's work waives access to the Home Improvement Contractor Guaranty Fund." },
      { q: "What license does a siding contractor need in Massachusetts?", a: "Home Improvement Contractor registration for residential work over $1,000 on owner-occupied one-to-four family homes, and a Construction Supervisor License that covers siding for the person who pulls the permit." },
      { q: "Do historic districts affect siding permits?", a: "Yes, local historic districts created under Chapter 40C usually require a certificate from the historic district commission for visible exterior changes before the building permit is issued." },
    ],
    sources: [S.cslReg, S.cslHandbook, S.hicTips, S.permitWarning, S.hicFund],
  },
  {
    slug: "re-siding-pre-1978-house-massachusetts",
    title: "Re-Siding a House Built Before 1978 in Massachusetts",
    excerpt:
      "Lead paint and asbestos siding are the two rules that change an older-home siding job. What Massachusetts requires, what to ask your contractor, and what it means for the schedule.",
    heroImage: "/services/exterior-trim.jpg",
    category: "Older Homes",
    date: "2026-11-04",
    readTime: "7 min read",
    relatedService: "full-siding-replacement",
    author: "company",
    content: [
      "## Why does 1978 matter for a siding job?\n\nLead-based paint for homes was banned in 1978, so a house built before then is presumed to have lead paint on its trim, old clapboards or shingles unless testing shows otherwise. Tearing off siding means cutting, scraping and breaking painted surfaces, which is exactly the kind of work that releases lead dust. In much of Massachusetts this is most homes: in many towns more than half the housing was built before 1980 (see the numbers on each [town page](/service-areas)).",

      "## Who regulates lead-safe renovation in Massachusetts?\n\nThe state, not the EPA. Since 2010 the Massachusetts Department of Labor Standards (DLS) has run its own lead-safe renovation program under 454 CMR 22.00, in place of the federal RRP rule. Anyone paid to do work that disturbs paint in a pre-1978 home must hold a Lead-Safe Renovation Contractor license from DLS, and a trained Lead-Safe Renovator Supervisor must be on site while that work is going on.",

      "## What should happen before work starts?\n\nThe contractor must give the owner (and any tenants) the EPA pamphlet *Renovate Right* no more than 60 days before the work begins and get a signed acknowledgment that it was received. Ask for the contractor's DLS license number at the same time as their HIC registration.",

      "## What does lead-safe work look like on a siding job?\n\n- The work area is set off and the ground is covered with plastic sheeting to catch chips and dust.\n- Windows and doors near the work are closed and covered.\n- Painted surfaces are not dry-scraped or power-sanded without proper dust controls, and paint is not burned off with an open flame.\n- Debris is bagged, the area is cleaned up each day, and the cleanup is checked when the job is done.\n\nThe details are in the work-practice section of the regulation (454 CMR 22.11).",

      "## Could your old siding contain asbestos?\n\nPossibly. Many mid-century homes were covered in asbestos-cement shingles — hard, brittle, often gray or white shingles with a slightly textured face. You can't tell for sure by looking; a lab test of a sample can.",

      "## What does MassDEP require for asbestos siding?\n\nMassDEP regulates asbestos-cement siding under 310 CMR 7.15. Removing **more than 100 square feet** of exterior asbestos-cement shingles, siding or panels requires an asbestos notification (form ANF-001) filed with MassDEP at least **10 working days** before work begins. Removing 100 square feet or less is exempt from notification, but the work practices still apply: each shingle has to be wetted before removal and taken off without breaking it. Owner-occupied homes with four or fewer units are exempt from MassDEP's notification fee, not from the rules.",

      "## How does this affect cost and schedule?\n\nIt adds steps: testing, a notification period of at least two weeks when asbestos siding is involved, containment, careful removal and disposal. A written estimate for an older home should say how lead and asbestos will be handled. If it doesn't mention either, ask.",

      "## Can you cover old siding instead of removing it?\n\nSometimes new siding is installed over old, but it hides the condition of the sheathing and flashing, and in a historic district the commission may weigh in. On many older Massachusetts homes, removal is the only way to find and fix rot around windows and sills before closing the wall up again.",
    ],
    faq: [
      { q: "Do lead-safe rules apply to siding replacement in Massachusetts?", a: "Yes, for homes built before 1978. Paid work that disturbs paint must be done by a contractor licensed by the Massachusetts Department of Labor Standards, with a Lead-Safe Renovator Supervisor on site." },
      { q: "What is the Renovate Right pamphlet?", a: "An EPA lead-safety pamphlet the contractor must give the owner and occupants no more than 60 days before work starts on a pre-1978 home, with a signed acknowledgment." },
      { q: "Do I need to notify MassDEP to remove asbestos siding?", a: "If you remove more than 100 square feet of exterior asbestos-cement siding, an ANF-001 notification must be filed at least 10 working days before work starts. Smaller jobs are exempt from notification but must still follow the work practices." },
      { q: "How do I know if my siding contains asbestos?", a: "Only a lab test of a sample can confirm it. Asbestos-cement shingles were common on mid-century homes and are hard, brittle and usually gray or white." },
    ],
    sources: [S.leadReg, S.leadWork, S.asbestosReg, S.asbestosNotify],
  },
];

/* Rewritten Nov 2026 in question-first form; replaces the 2025 version at
   the same URL. Fixes a factual error in the old text, which said James
   Hardie's HZ10 line is for cold climates like Massachusetts — per James
   Hardie, HZ5 is the cold-climate product and HZ10 is for hot, humid and
   coastal climates. */
export const HARDIE_VS_VINYL: Pick<BlogPost, "title" | "excerpt" | "readTime" | "content" | "faq" | "sources" | "updated" | "author"> = {
  title: "Hardie Plank vs Vinyl Siding in Massachusetts",
  excerpt:
    "Fiber cement or vinyl for a New England house? A straight comparison of durability, cold weather, fire, upkeep, warranty and cost — and when each one is the better call.",
  readTime: "8 min read",
  updated: "2026-11-04",
  author: "company",
  content: [
    "## Which is better for a Massachusetts home, Hardie Plank or vinyl?\n\nNeither wins everywhere. Hardie Plank (James Hardie fiber cement) is the better fit when you want the look of painted wood, a noncombustible wall and a long substrate warranty, and you're willing to pay more for it. Vinyl is the better fit when budget and low upkeep come first and the house doesn't need the heavier, crisper look of fiber cement.",

    "## What are they made of?\n\nVinyl siding is PVC with color added through the material, so it never needs paint. HardiePlank is fiber cement — cement, sand and cellulose fiber — which makes it much heavier and more rigid than vinyl and gives it deeper, sharper shadow lines.",

    "## Which handles New England winters better?\n\nBoth work in Massachusetts when installed correctly; they fail in different ways. Fiber cement doesn't move much with temperature, so joints stay tight, but the boards have to be kept the clearances from roofs, decks and grade that the manufacturer's instructions call for, or they can wick water. Vinyl expands and contracts more, so it has to hang loosely with room to move, and it becomes more brittle in deep cold, when a hard knock can crack it.\n\nOne detail to check on a Hardie quote: James Hardie makes two climate versions. **HZ5** is the one engineered for freezing temperatures, big seasonal swings, snow and ice; HZ10 is for hot, humid and coastal climates. James Hardie assigns the zone by zip code.",

    "## Is fiber cement fire-resistant?\n\nYes. James Hardie lists HardiePlank as noncombustible. Vinyl is a plastic: it softens, warps and can melt near high heat — a grill set too close to the wall is a common cause.",

    "## Which needs less maintenance?\n\nVinyl. It needs an occasional wash and never needs painting. Hardie with the factory ColorPlus finish holds color well for years, but fiber cement is a painted product, so at some point it will be repainted; field-painted Hardie gets there sooner. Caulked joints and trim on either material should be checked every few years.",

    "## How do the warranties compare?\n\nJames Hardie's fiber cement carries a **30-year non-prorated, transferable limited substrate warranty**, and its ColorPlus finishes carry a separate **15-year limited warranty covering paint and labor**. Vinyl warranties vary a lot by manufacturer and product line — read the terms, including what happens when the house is sold.",

    "## Which costs more?\n\nFiber cement generally costs more installed than standard vinyl: the material costs more and the heavier boards take more labor to cut and hang. Premium and insulated vinyl narrow the gap. The only reliable comparison is two written estimates for the same house with the same trim scope.",

    "## Are there options in between?\n\nYes. [Everlast composite siding](/services/everlast-siding) is thicker and stiffer than vinyl and doesn't need paint; [LP SmartSide](/services/lp-smartside-siding) is engineered wood that is lighter than fiber cement. Both are worth pricing if neither standard vinyl nor Hardie feels right.",

    "## Does a historic district change the answer?\n\nIt can. Some Massachusetts commissions discourage vinyl on historic houses — Peabody's Historical Commission, for example, advises against covering a historic home with vinyl or aluminum and points to paintable wood, engineered wood or fiber cement instead (see our [Peabody page](/peabody)). Check before choosing.",
  ],
  faq: [
    { q: "Is Hardie Plank better than vinyl in Massachusetts?", a: "It depends on priorities. Hardie fiber cement looks more like painted wood, is noncombustible and has a 30-year substrate warranty, but costs more. Vinyl costs less and never needs painting." },
    { q: "Which James Hardie product is for cold climates?", a: "HZ5. James Hardie engineers HZ5 for freezing temperatures, seasonal swings, snow and ice; HZ10 is for hot, humid and coastal climates. The zone is assigned by zip code." },
    { q: "Does Hardie siding need painting?", a: "Eventually. ColorPlus factory finishes carry a 15-year limited warranty on paint and labor, but fiber cement is a painted product and will need repainting over its life. Vinyl never needs paint." },
    { q: "Does vinyl siding crack in the cold?", a: "Vinyl becomes more brittle in deep cold, so a hard impact can crack it. Correct installation that lets panels move with temperature prevents most other cold-weather problems." },
  ],
  sources: [S.hardieZones, S.hardieWarranty, S.hardiePlank],
};
