/* ═══════════════════════════════════════════════════════
   WOLF'S SIDING — CITY & SERVICE DATA
   110 cities × 7 services = 770 unique pages
   ═══════════════════════════════════════════════════════ */

export interface CityData {
  name: string;
  slug: string;
  region: string;
}

export interface ServiceData {
  name: string;
  slug: string;
  shortName: string;
  description: string;
  material: string;
  heroImage: string;
  painPoints: string[];
  benefits: string[];
  priceRange: string;
  lifespan: string;
  idealFor: string;
  processSteps: { title: string; desc: string }[];
  faqs: { q: string; a: string }[];
  offerings: string[];
}

export const STATE = "Massachusetts";
export const STATE_ABBR = "MA";
export const REVIEW_COUNT = "22";
export const REVIEW_RATING = "5.0";

/* ─── REGION CLIMATE DESCRIPTIONS ─── */
export const REGION_CLIMATE: Record<string, string> = {
  "Metro West": "harsh New England winters with heavy snowfall, ice storms, and hot humid summers that test every exterior surface",
  "Greater Boston": "coastal weather patterns including nor'easters, salt air exposure, and extreme temperature swings year-round",
  "South Shore": "coastal winds, salt spray, and severe winter storms that batter home exteriors along the South Shore",
  "North Shore": "intense coastal weather, salt air corrosion, and the full force of Atlantic nor'easters throughout the year",
  "Worcester Area": "some of the harshest winters in Massachusetts with heavy snow loads, bitter cold, and significant freeze-thaw cycles",
};

/* ─── 7 SIDING SERVICES ─── */
export const SERVICES: ServiceData[] = [
  {
    name: "Vinyl Siding Installation",
    slug: "vinyl-siding-installation",
    shortName: "Vinyl Siding",
    material: "vinyl siding",
    description: "Premium vinyl siding delivers unbeatable value with low maintenance, superior durability, and a wide range of colors and styles to match any home.",
    heroImage: "https://storage.googleapis.com/msgsndr/BCczy6muFwhd63dPhKCC/media/68caaa042a25a1ad9516f03a.jpeg",
    priceRange: "$6,000 – $16,000",
    lifespan: "30–50 years",
    idealFor: "homeowners seeking low-maintenance, cost-effective exterior protection",
    painPoints: [
      "Faded, chalky siding that makes your home look dated and reduces curb appeal — a common issue after years of UV exposure in Massachusetts",
      "Cracked or warped panels from freeze-thaw cycles that allow moisture infiltration behind the siding, leading to mold and structural damage",
      "Skyrocketing energy bills due to poor insulation behind old, deteriorating siding that lets cold air penetrate your walls",
      "Persistent mold, mildew, and algae growth on aging siding surfaces that never fully cleans away and keeps coming back each season",
    ],
    benefits: [
      "Virtually maintenance-free — no painting, staining, or sealing required. Just an occasional rinse with a garden hose to keep it looking new",
      "Engineered to withstand New England's extreme weather: wind-resistant up to 110 mph, impact-resistant, and UV-protected against fading",
      "Insulated vinyl options can reduce energy costs by up to 20%, keeping your home warmer in winter and cooler in summer",
      "Available in 40+ colors and realistic wood-grain textures that replicate the look of natural wood without any of the upkeep",
      "Industry-leading manufacturer warranties up to 50 years that transfer to future homeowners, protecting your investment",
      "Most cost-effective siding option with the best long-term ROI — typically recoups 70-80% of project cost at resale",
    ],
    processSteps: [
      { title: "Free Consultation", desc: "We discuss your goals, preferences, and budget. We'll help you choose the perfect vinyl style and color for your home." },
      { title: "On-Site Assessment", desc: "Our team inspects your current exterior, checks for damage or moisture issues, takes precise measurements, and identifies any prep work needed." },
      { title: "Detailed Proposal", desc: "You receive a transparent, itemized estimate with material options, project timeline, and warranty details — no hidden costs, no surprises." },
      { title: "Expert Installation", desc: "Our experienced crew removes old siding, addresses any underlying issues, installs premium vinyl with precision, and leaves your property spotless." },
    ],
    faqs: [
      { q: "How long does vinyl siding installation take?", a: "Most homes are completed in 3-5 days depending on size and complexity. We work efficiently while maintaining our high quality standards, and we'll give you a specific timeline during your free estimate." },
      { q: "Is vinyl siding a good choice for New England weather?", a: "Absolutely. Modern vinyl siding is engineered to handle extreme temperatures, high winds, and heavy precipitation. It won't rot, warp, or attract insects like wood, making it ideal for Massachusetts homes." },
      { q: "Can vinyl siding be installed over existing siding?", a: "In many cases, yes. We can install vinyl over existing wood or vinyl siding if the underlying surface is sound. However, we always recommend a thorough inspection first to ensure there are no hidden moisture or structural issues." },
    ],
    offerings: [
      "New vinyl siding installation on existing homes",
      "Vinyl siding replacement and removal of old materials",
      "Insulated vinyl siding upgrades for energy efficiency",
      "Vinyl soffit and fascia installation",
      "Custom color matching and style consultation",
      "Storm damage vinyl siding repair and replacement",
    ],
  },
  {
    name: "Clapboard Siding Installation",
    slug: "clapboard-siding-installation",
    shortName: "Clapboard Siding",
    material: "clapboard siding",
    description: "Classic New England clapboard siding brings timeless charm and proven durability to your home, with horizontal overlapping boards that have protected homes for centuries.",
    heroImage: "https://storage.googleapis.com/msgsndr/BCczy6muFwhd63dPhKCC/media/68caaa04357b4e5af271fea6.jpeg",
    priceRange: "$8,000 – $20,000",
    lifespan: "40–60 years",
    idealFor: "historic homes and homeowners who want authentic New England character",
    painPoints: [
      "Peeling, cracking paint on existing clapboards that requires constant scraping, priming, and repainting every few years at significant cost",
      "Rotting wood at the bottom courses and around windows where moisture collects, creating soft spots that compromise your home's envelope",
      "Gaps between aging boards that allow drafts, insects, and moisture to penetrate behind the siding, causing hidden damage to sheathing and framing",
      "Outdated or damaged clapboards that drag down your home's curb appeal and property value, making it look neglected despite your maintenance efforts",
    ],
    benefits: [
      "Authentic New England aesthetic that honors the architectural heritage of Massachusetts homes while adding genuine character and charm",
      "Excellent structural protection with overlapping horizontal boards that create a natural rain screen, shedding water away from your home",
      "Premium fiber cement clapboard options that replicate the look of real wood with zero rot risk and minimal maintenance requirements",
      "Dramatically increases property value — homes with quality clapboard siding consistently appraise higher in Massachusetts real estate markets",
      "Highly customizable with any paint color, allowing you to match historic color schemes or create a fresh, modern look",
      "Superior wind resistance when properly installed, with each board mechanically fastened and lapped to resist uplift forces",
    ],
    processSteps: [
      { title: "Free Consultation", desc: "We evaluate your home's architectural style, discuss clapboard material options (wood, fiber cement, composite), and help you select the perfect profile and color." },
      { title: "On-Site Assessment", desc: "Our crew inspects the existing exterior for rot, moisture damage, and structural issues. We take precise measurements and plan the installation approach." },
      { title: "Detailed Proposal", desc: "You receive a comprehensive estimate covering materials, labor, prep work, painting, and trim — all clearly itemized with no hidden fees." },
      { title: "Expert Installation", desc: "We carefully remove old siding, repair any sheathing damage, install weather barrier, and apply new clapboards with precision cuts and uniform spacing." },
    ],
    faqs: [
      { q: "What's the difference between wood and fiber cement clapboard?", a: "Wood clapboard offers the most authentic look but requires regular painting and is susceptible to rot. Fiber cement (like Hardie) looks nearly identical to wood but is fireproof, rot-proof, and needs paint only every 15+ years. We install both and can help you decide." },
      { q: "Does clapboard siding work on modern homes?", a: "Absolutely. While clapboard is a traditional style, it works beautifully on modern and contemporary homes. The clean horizontal lines complement many architectural styles, and modern materials make it a practical choice for any home." },
      { q: "How often does clapboard siding need to be repainted?", a: "Wood clapboard typically needs repainting every 5-7 years. Fiber cement clapboard holds paint much longer — usually 12-15 years before a repaint is needed. We use premium exterior paints that maximize longevity." },
    ],
    offerings: [
      "Traditional wood clapboard installation",
      "Fiber cement clapboard (Hardie Plank lap) installation",
      "Historic clapboard restoration and replacement",
      "Full exterior clapboard re-siding",
      "Clapboard repair and partial replacement",
      "Custom profile matching for additions and renovations",
    ],
  },
  {
    name: "Hardie Plank Siding Installation",
    slug: "hardie-plank-siding-installation",
    shortName: "Hardie Plank",
    material: "Hardie Plank fiber cement siding",
    description: "James Hardie fiber cement siding is the premium choice for Massachusetts homes — fireproof, rot-proof, and engineered to withstand the harshest New England conditions.",
    heroImage: "https://storage.googleapis.com/msgsndr/BCczy6muFwhd63dPhKCC/media/69309a3e0b0f9d5eef6c92ac.png",
    priceRange: "$12,000 – $30,000",
    lifespan: "50+ years",
    idealFor: "homeowners seeking premium, low-maintenance siding with the look of real wood",
    painPoints: [
      "Wood siding that requires constant upkeep — scraping, sanding, priming, and painting every few years costs thousands and never seems to end",
      "Rot and termite damage eating away at your existing siding, creating structural vulnerabilities and costly repairs that keep multiplying",
      "Fire safety concerns with current wood or vinyl siding, especially in areas where homes are close together or near wooded lots",
      "Fading and color degradation on existing siding that makes your home look worn out despite regular maintenance and care",
    ],
    benefits: [
      "James Hardie's ColorPlus® Technology bakes color through multiple coats at the factory, resisting fading for 15+ years without repainting",
      "Non-combustible fiber cement construction provides superior fire protection — won't ignite, melt, or contribute to flame spread like vinyl or wood",
      "Completely resistant to rot, termites, woodpeckers, and moisture damage — engineered specifically for the harsh climate zone of New England",
      "HardiePlank HZ10® is specifically formulated for climate zones with freeze-thaw cycles, preventing moisture-related cracking and delamination",
      "Backed by a 30-year non-prorated transferable warranty from James Hardie — one of the strongest warranties in the siding industry",
      "Increases home value by an average of $15,000+ and recoups over 75% of project cost at resale according to Remodeling Magazine data",
    ],
    processSteps: [
      { title: "Free Consultation", desc: "We guide you through Hardie's extensive style and color options, including HardiePlank lap, HardieShingle, and HardiePanel vertical siding." },
      { title: "On-Site Assessment", desc: "We evaluate your current exterior, check for moisture or structural issues, and design a custom installation plan optimized for your home." },
      { title: "Detailed Proposal", desc: "Your estimate includes all materials, HardieWrap weather barrier, trim, labor, and cleanup — fully itemized and transparent." },
      { title: "Expert Installation", desc: "As trained Hardie professionals, we follow James Hardie's Best Practices installation guide to ensure your warranty is fully valid and your siding performs for decades." },
    ],
    faqs: [
      { q: "Why is Hardie Plank more expensive than vinyl?", a: "Hardie Plank costs more upfront because it's a premium cement-based product that's fireproof, rot-proof, and lasts 50+ years with minimal maintenance. When you factor in the lifespan, reduced maintenance costs, and home value increase, Hardie Plank is actually the better long-term investment." },
      { q: "Is Hardie Plank good for cold climates?", a: "James Hardie specifically manufactures HZ10® products for cold climate zones like Massachusetts. This formulation is engineered to resist moisture penetration and freeze-thaw damage, making it one of the best siding choices for New England homes." },
      { q: "Do I need a special contractor for Hardie Plank?", a: "While not required, using a contractor experienced with fiber cement is critical. Hardie Plank requires different tools and techniques than vinyl or wood. Our crew is trained in James Hardie's Best Practices, ensuring proper installation and full warranty coverage." },
    ],
    offerings: [
      "HardiePlank® horizontal lap siding installation",
      "HardieShingle® half-round and staggered edge panels",
      "HardiePanel® vertical siding for modern aesthetics",
      "HardieTrim® boards for window, door, and corner finishing",
      "HardieSoffit® panels for eave and porch ceilings",
      "ColorPlus® factory-finished color matching",
    ],
  },
  {
    name: "Cedar Shingle Siding",
    slug: "cedar-shingle-siding",
    shortName: "Cedar Shingles",
    material: "cedar shingle siding",
    description: "Natural cedar shingles deliver unmatched warmth and character, with a rich texture that weathers beautifully over time and provides excellent natural insulation.",
    heroImage: "https://storage.googleapis.com/msgsndr/BCczy6muFwhd63dPhKCC/media/69309a3e1d466eed197a9806.png",
    priceRange: "$14,000 – $35,000",
    lifespan: "40–60 years",
    idealFor: "Cape Cod, Colonial, and Craftsman-style homes seeking natural beauty",
    painPoints: [
      "Existing cedar shingles that have split, curled, or blown off during storms, leaving exposed areas vulnerable to water infiltration and damage",
      "Moss, lichen, and mildew growth turning your once-beautiful cedar exterior into a green, stained mess that's nearly impossible to clean properly",
      "Individual shingles rotting from trapped moisture behind them, creating soft spots and allowing water to reach your sheathing and framing",
      "Inconsistent weathering creating a patchy, uneven appearance instead of the uniform silver-gray patina that well-maintained cedar should develop",
    ],
    benefits: [
      "Natural cedar contains oils that resist insects, rot, and decay — it's nature's own preservative that has protected New England homes for centuries",
      "Superior natural insulation value — cedar's cellular structure provides better R-value per inch than most other siding materials, reducing energy costs",
      "Ages gracefully to a beautiful silver-gray patina, or can be stained in any color to maintain a rich, warm wood appearance year after year",
      "Each installation is truly unique — the natural variation in cedar grain and texture creates a one-of-a-kind exterior that can't be replicated",
      "Environmentally sustainable and biodegradable — cedar is a renewable resource that requires minimal energy to produce compared to manufactured materials",
      "Exceptional performance in coastal environments — cedar naturally resists salt air corrosion that damages metal and deteriorates other materials",
    ],
    processSteps: [
      { title: "Free Consultation", desc: "We discuss cedar grades (clear vs. knotty), shingle profiles (round, square, staggered), and finishing options (natural, stained, or painted)." },
      { title: "On-Site Assessment", desc: "We inspect your existing exterior, evaluate ventilation behind the siding, check for moisture issues, and plan a proper cedar installation with adequate airflow." },
      { title: "Detailed Proposal", desc: "Your estimate covers cedar grade selection, prep work, installation, finishing, and trim — with clear pricing and a realistic project timeline." },
      { title: "Expert Installation", desc: "We hand-select and individually nail each shingle with proper exposure and spacing, ensuring a tight, beautiful installation that weathers evenly." },
    ],
    faqs: [
      { q: "How long do cedar shingles last in Massachusetts?", a: "With proper installation and maintenance, cedar shingles last 40-60 years in Massachusetts. Key factors include proper ventilation behind the shingles, quality flashing at transitions, and periodic cleaning. Some historic New England homes have cedar shingles that are 80+ years old." },
      { q: "Do cedar shingles need a lot of maintenance?", a: "Cedar is moderate-maintenance. If left natural, it requires cleaning every 2-3 years to prevent moss/mildew. If stained, expect to re-stain every 4-6 years. Compared to painted clapboard, cedar actually requires less maintenance overall." },
      { q: "Can cedar shingles be installed over existing siding?", a: "Generally, we recommend removing old siding before installing cedar shingles. Cedar needs proper ventilation behind it to prevent moisture buildup. Installing over old siding can trap moisture and significantly reduce the lifespan of your new cedar." },
    ],
    offerings: [
      "Full cedar shingle siding installation",
      "Cedar shake siding (thicker, more rustic profile)",
      "Decorative cedar shingle patterns and designs",
      "Cedar shingle replacement and repair",
      "Cedar staining and finishing services",
      "Cedar accent walls and gable treatments",
    ],
  },
  {
    name: "Exterior Trim Work",
    slug: "exterior-trim-work",
    shortName: "Exterior Trim",
    material: "exterior trim and finish carpentry",
    description: "Professional trim work frames your home's exterior with clean lines and polished details — from window and door casings to corner boards, fascia, and decorative elements.",
    heroImage: "https://storage.googleapis.com/msgsndr/BCczy6muFwhd63dPhKCC/media/69309a3ee0f09220206bdb36.png",
    priceRange: "$2,500 – $12,000",
    lifespan: "30–50 years",
    idealFor: "completing any siding project or refreshing your home's architectural details",
    painPoints: [
      "Rotting window and door trim that allows water to seep behind your siding, causing hidden damage to wall framing and insulation",
      "Peeling, cracked corner boards and fascia that ruin your home's finished appearance and expose vulnerable edges to weather damage",
      "Mismatched or deteriorating trim from previous patchy repairs that make your exterior look inconsistent and poorly maintained",
      "Gaps between trim boards and siding creating entry points for insects, rodents, drafts, and moisture that damage your home from the inside out",
    ],
    benefits: [
      "PVC and composite trim options that never rot, split, or need painting — engineered for permanent weather resistance in New England conditions",
      "Clean, precise joints and transitions that give your home a professionally finished look and dramatically boost curb appeal",
      "Proper trim installation creates a continuous weather seal around windows, doors, and corners, preventing costly water infiltration",
      "Custom trim profiles available to match historic architectural details or create modern, clean-lined designs unique to your home",
      "Cellular PVC trim can be worked like wood (cut, routed, shaped) but will never rot, swell, or attract insects",
      "Perfectly complements any siding type — vinyl, Hardie Plank, cedar, or clapboard — for a cohesive, polished exterior",
    ],
    processSteps: [
      { title: "Free Consultation", desc: "We evaluate your existing trim, discuss material options (PVC, composite, wood), and recommend profiles that match your home's architectural style." },
      { title: "On-Site Assessment", desc: "We measure all trim areas — windows, doors, corners, fascia, soffits, rake boards — and check for underlying damage that needs repair." },
      { title: "Detailed Proposal", desc: "Your estimate covers all trim materials, profiles, installation, and any necessary repair work — clearly itemized with no hidden costs." },
      { title: "Expert Installation", desc: "Our finish carpenters install each trim piece with precision miters, tight joints, and proper caulking for a flawless, weather-tight result." },
    ],
    faqs: [
      { q: "Should I replace trim at the same time as siding?", a: "Yes, absolutely. Replacing trim during a siding project is more cost-effective because the siding is already removed, giving full access to trim areas. New trim with new siding creates a cohesive, finished look and ensures all weather barriers are properly integrated." },
      { q: "What trim material is best for Massachusetts homes?", a: "We recommend cellular PVC (like AZEK or Versatex) for Massachusetts homes. It's completely waterproof, won't rot or attract insects, holds paint beautifully, and handles freeze-thaw cycles without cracking. It costs more than wood but lasts significantly longer with zero maintenance." },
      { q: "Can you match my home's existing trim profile?", a: "Yes. Our trim carpenters can replicate virtually any existing trim profile, including historic molding patterns found on older Massachusetts homes. We have access to hundreds of stock profiles and can custom-mill unique shapes when needed." },
    ],
    offerings: [
      "Window and door casing installation",
      "Corner board replacement and installation",
      "Fascia and soffit trim work",
      "Rake and gable trim installation",
      "Decorative trim and architectural details",
      "PVC/composite rot-proof trim upgrades",
    ],
  },
  {
    name: "Siding Repair Services",
    slug: "siding-repair-services",
    shortName: "Siding Repair",
    material: "siding repair and restoration",
    description: "From storm damage to wear and tear, our repair services restore your home's exterior quickly and affordably — matching existing materials for a seamless result.",
    heroImage: "https://storage.googleapis.com/msgsndr/BCczy6muFwhd63dPhKCC/media/69309a3e8da9674305aa2a4d.png",
    priceRange: "$500 – $5,000",
    lifespan: "Extends existing siding 10–20 years",
    idealFor: "targeted repairs, storm damage, and extending the life of your current siding",
    painPoints: [
      "Storm-damaged siding panels (cracks, holes, missing pieces) leaving your home's sheathing and insulation exposed to the elements",
      "Localized rot or water damage on a few sections that doesn't justify a full replacement but needs professional attention before it spreads",
      "Loose or buckled siding panels that rattle in the wind, allow moisture behind them, and make your home look neglected",
      "Insurance claim damage that needs professional repair documentation and quality workmanship to restore your home properly",
    ],
    benefits: [
      "Save thousands compared to full replacement — targeted repairs address specific problem areas without the cost of re-siding your entire home",
      "Expert color and material matching ensures repair sections blend seamlessly with your existing siding for an invisible repair",
      "Fast turnaround — most repairs are completed in 1-2 days, getting your home protected and looking great quickly",
      "We provide detailed documentation and photos for insurance claims, making the process smooth and maximizing your coverage",
      "Extends the life of your existing siding by 10-20 years when repairs are done properly and underlying issues are addressed",
      "Emergency repair service available for storm damage — we respond quickly to prevent further damage to your home's interior",
    ],
    processSteps: [
      { title: "Damage Assessment", desc: "We inspect the damaged area, identify the root cause, check for hidden damage behind the siding, and determine the best repair approach." },
      { title: "Material Matching", desc: "We source matching siding materials — same profile, texture, and color — to ensure your repair blends seamlessly with existing siding." },
      { title: "Professional Repair", desc: "Our crew carefully removes damaged sections, addresses any underlying water or structural damage, and installs replacement pieces with precision." },
      { title: "Final Inspection", desc: "We verify the repair is watertight, visually seamless, and structurally sound. We document everything for your records or insurance claim." },
    ],
    faqs: [
      { q: "Can you match my existing siding for a repair?", a: "In most cases, yes. We maintain relationships with all major siding manufacturers and distributors. For older or discontinued siding profiles, we'll find the closest match available and may use transition pieces to create a seamless look." },
      { q: "Should I repair or replace my siding?", a: "If damage is limited to a small area (under 30% of your home), repair is usually the best value. If damage is widespread, you're seeing recurring issues, or your siding is nearing end of life, full replacement is often more cost-effective long-term. We'll give you an honest recommendation." },
      { q: "Do you help with insurance claims for storm damage?", a: "Yes. We provide detailed damage assessments, photo documentation, and written estimates that insurance companies require. We work with your adjuster to ensure all damage is accounted for and you receive fair compensation for repairs." },
    ],
    offerings: [
      "Storm damage siding repair",
      "Partial siding replacement and matching",
      "Water damage repair and moisture remediation",
      "Loose or buckled panel re-securing",
      "Impact damage repair (hail, debris, fallen branches)",
      "Insurance claim documentation and support",
    ],
  },
  {
    name: "Full Siding Replacement",
    slug: "full-siding-replacement",
    shortName: "Siding Replacement",
    material: "complete siding replacement",
    description: "Transform your home's entire exterior with a full siding replacement — removing old, worn materials and installing premium new siding for decades of protection and beauty.",
    heroImage: "https://storage.googleapis.com/msgsndr/BCczy6muFwhd63dPhKCC/media/69309a3e0b0f9d2be96c92ab.png",
    priceRange: "$10,000 – $35,000",
    lifespan: "30–50+ years",
    idealFor: "homes with aging, damaged, or outdated siding that need a complete exterior transformation",
    painPoints: [
      "Multiple areas of damage, rot, or deterioration that make piece-by-piece repairs impractical and more expensive than starting fresh",
      "Severely outdated siding (aluminum, asbestos, old wood) that's dragging down your property value and making your home look decades behind",
      "Chronic moisture problems behind existing siding causing mold, mildew, and ongoing damage to your home's wall structure and insulation",
      "Energy inefficiency from old siding with no house wrap or insulation, resulting in drafty rooms and heating/cooling bills that keep climbing",
    ],
    benefits: [
      "Complete exterior transformation — new siding, new weather barrier, new trim — your home will look and perform like new construction",
      "Opportunity to upgrade insulation and air sealing during the project, dramatically improving energy efficiency and comfort",
      "Discover and address hidden issues (rot, mold, pest damage, missing insulation) that are impossible to fix without removing old siding",
      "Choose from any siding material — vinyl, Hardie Plank, cedar, clapboard — with full design flexibility for your home's new look",
      "Maximum ROI on investment — full siding replacement is consistently ranked among the top home improvements for resale value",
      "All-new manufacturer warranty coverage from day one, giving you decades of worry-free protection for your home's exterior",
    ],
    processSteps: [
      { title: "Free Consultation", desc: "We discuss your vision, material preferences, budget, and timeline. We'll show you samples and help you design your home's new exterior." },
      { title: "On-Site Assessment", desc: "We inspect your entire exterior, identify any structural concerns, take comprehensive measurements, and plan the removal and installation sequence." },
      { title: "Detailed Proposal", desc: "Your estimate covers complete tear-off, disposal, weather barrier, new siding, trim, and all finishing details — fully transparent and itemized." },
      { title: "Expert Installation", desc: "We strip old siding, inspect and repair sheathing, install premium house wrap, apply new siding and trim, and leave your property immaculate." },
    ],
    faqs: [
      { q: "How long does a full siding replacement take?", a: "A complete siding replacement typically takes 1-3 weeks depending on your home's size, the material chosen, and any repair work needed once old siding is removed. We'll provide a specific timeline after your on-site assessment." },
      { q: "What happens if you find damage under my old siding?", a: "This is actually one of the biggest benefits of full replacement. If we find rot, mold, pest damage, or other issues, we address them during the project. We'll discuss any additional work needed and provide fair pricing before proceeding." },
      { q: "Can I stay in my home during siding replacement?", a: "Yes, absolutely. While there will be noise and activity outside, the interior of your home is not affected. We work section by section and ensure your home is weather-protected at the end of each workday." },
    ],
    offerings: [
      "Complete old siding removal and disposal",
      "House wrap / weather barrier installation",
      "New siding installation (all material types)",
      "Full exterior trim replacement",
      "Insulation upgrades during re-siding",
      "Structural sheathing repair if needed",
    ],
  },
];

/* ─── 110 CITIES (same as RS Development Group) ─── */
export const CITIES: CityData[] = [
  /* ── Metro West ── */
  { name: "Marlborough", slug: "marlborough", region: "Metro West" },
  { name: "Hudson", slug: "hudson", region: "Metro West" },
  { name: "Framingham", slug: "framingham", region: "Metro West" },
  { name: "Westborough", slug: "westborough", region: "Metro West" },
  { name: "Northborough", slug: "northborough", region: "Metro West" },
  { name: "Southborough", slug: "southborough", region: "Metro West" },
  { name: "Shrewsbury", slug: "shrewsbury", region: "Metro West" },
  { name: "Natick", slug: "natick", region: "Metro West" },
  { name: "Ashland", slug: "ashland", region: "Metro West" },
  { name: "Sudbury", slug: "sudbury", region: "Metro West" },
  { name: "Hopkinton", slug: "hopkinton", region: "Metro West" },
  { name: "Milford", slug: "milford", region: "Metro West" },
  { name: "Wayland", slug: "wayland", region: "Metro West" },
  { name: "Holliston", slug: "holliston", region: "Metro West" },
  { name: "Grafton", slug: "grafton", region: "Metro West" },
  { name: "Clinton", slug: "clinton", region: "Metro West" },
  { name: "Maynard", slug: "maynard", region: "Metro West" },
  { name: "Stow", slug: "stow", region: "Metro West" },
  { name: "Acton", slug: "acton", region: "Metro West" },
  { name: "Concord", slug: "concord", region: "Metro West" },
  { name: "Berlin", slug: "berlin", region: "Metro West" },
  { name: "Bolton", slug: "bolton", region: "Metro West" },
  { name: "Lincoln", slug: "lincoln", region: "Metro West" },
  { name: "Weston", slug: "weston", region: "Metro West" },
  { name: "Wellesley", slug: "wellesley", region: "Metro West" },
  { name: "Needham", slug: "needham", region: "Metro West" },
  { name: "Dover", slug: "dover", region: "Metro West" },
  { name: "Medfield", slug: "medfield", region: "Metro West" },
  { name: "Millis", slug: "millis", region: "Metro West" },
  { name: "Sherborn", slug: "sherborn", region: "Metro West" },
  { name: "Boxborough", slug: "boxborough", region: "Metro West" },
  { name: "Boylston", slug: "boylston", region: "Metro West" },
  { name: "West Boylston", slug: "west-boylston", region: "Metro West" },
  { name: "Holden", slug: "holden", region: "Metro West" },
  { name: "Sterling", slug: "sterling", region: "Metro West" },
  { name: "Lancaster", slug: "lancaster", region: "Metro West" },
  { name: "Harvard", slug: "harvard", region: "Metro West" },
  { name: "Upton", slug: "upton", region: "Metro West" },
  { name: "Mendon", slug: "mendon", region: "Metro West" },
  { name: "Hopedale", slug: "hopedale", region: "Metro West" },
  { name: "Littleton", slug: "littleton", region: "Metro West" },
  { name: "Westford", slug: "westford", region: "Metro West" },
  { name: "Carlisle", slug: "carlisle", region: "Metro West" },
  { name: "Chelmsford", slug: "chelmsford", region: "Metro West" },
  { name: "Groton", slug: "groton", region: "Metro West" },
  { name: "Ayer", slug: "ayer", region: "Metro West" },
  { name: "Shirley", slug: "shirley", region: "Metro West" },
  { name: "Lunenburg", slug: "lunenburg", region: "Metro West" },
  { name: "Leominster", slug: "leominster", region: "Metro West" },
  { name: "Fitchburg", slug: "fitchburg", region: "Metro West" },
  { name: "Princeton", slug: "princeton", region: "Metro West" },
  { name: "Paxton", slug: "paxton", region: "Metro West" },
  { name: "Rutland", slug: "rutland", region: "Metro West" },
  { name: "Leicester", slug: "leicester", region: "Metro West" },
  { name: "Spencer", slug: "spencer", region: "Metro West" },
  { name: "Charlton", slug: "charlton", region: "Metro West" },
  { name: "Dudley", slug: "dudley", region: "Metro West" },
  { name: "Northbridge", slug: "northbridge", region: "Metro West" },
  { name: "Uxbridge", slug: "uxbridge", region: "Metro West" },
  { name: "Douglas", slug: "douglas", region: "Metro West" },
  { name: "Blackstone", slug: "blackstone", region: "Metro West" },
  { name: "Medway", slug: "medway", region: "Metro West" },
  { name: "Norfolk", slug: "norfolk", region: "Metro West" },
  { name: "Wrentham", slug: "wrentham", region: "Metro West" },

  /* ── Greater Boston ── */
  { name: "Lexington", slug: "lexington", region: "Greater Boston" },
  { name: "Bedford", slug: "bedford", region: "Greater Boston" },
  { name: "Burlington", slug: "burlington", region: "Greater Boston" },
  { name: "Waltham", slug: "waltham", region: "Greater Boston" },
  { name: "Newton", slug: "newton", region: "Greater Boston" },
  { name: "Brookline", slug: "brookline", region: "Greater Boston" },
  { name: "Dedham", slug: "dedham", region: "Greater Boston" },
  { name: "Norwood", slug: "norwood", region: "Greater Boston" },
  { name: "Franklin", slug: "franklin", region: "Greater Boston" },
  { name: "Bellingham", slug: "bellingham", region: "Greater Boston" },
  { name: "Cambridge", slug: "cambridge", region: "Greater Boston" },
  { name: "Somerville", slug: "somerville", region: "Greater Boston" },
  { name: "Medford", slug: "medford", region: "Greater Boston" },
  { name: "Malden", slug: "malden", region: "Greater Boston" },
  { name: "Melrose", slug: "melrose", region: "Greater Boston" },
  { name: "Wakefield", slug: "wakefield", region: "Greater Boston" },
  { name: "Reading", slug: "reading", region: "Greater Boston" },
  { name: "Stoneham", slug: "stoneham", region: "Greater Boston" },
  { name: "Woburn", slug: "woburn", region: "Greater Boston" },
  { name: "Winchester", slug: "winchester", region: "Greater Boston" },
  { name: "Arlington", slug: "arlington", region: "Greater Boston" },
  { name: "Belmont", slug: "belmont", region: "Greater Boston" },
  { name: "Watertown", slug: "watertown", region: "Greater Boston" },

  /* ── South Shore ── */
  { name: "Quincy", slug: "quincy", region: "South Shore" },
  { name: "Braintree", slug: "braintree", region: "South Shore" },
  { name: "Weymouth", slug: "weymouth", region: "South Shore" },
  { name: "Milton", slug: "milton", region: "South Shore" },
  { name: "Canton", slug: "canton", region: "South Shore" },
  { name: "Randolph", slug: "randolph", region: "South Shore" },
  { name: "Stoughton", slug: "stoughton", region: "South Shore" },
  { name: "Sharon", slug: "sharon", region: "South Shore" },
  { name: "Walpole", slug: "walpole", region: "South Shore" },
  { name: "Foxborough", slug: "foxborough", region: "South Shore" },

  /* ── North Shore ── */
  { name: "Lynn", slug: "lynn", region: "North Shore" },
  { name: "Saugus", slug: "saugus", region: "North Shore" },
  { name: "Peabody", slug: "peabody", region: "North Shore" },
  { name: "Salem", slug: "salem", region: "North Shore" },
  { name: "Beverly", slug: "beverly", region: "North Shore" },
  { name: "Danvers", slug: "danvers", region: "North Shore" },

  /* ── Worcester Area ── */
  { name: "Worcester", slug: "worcester", region: "Worcester Area" },
  { name: "Auburn", slug: "auburn", region: "Worcester Area" },
  { name: "Millbury", slug: "millbury", region: "Worcester Area" },
  { name: "Sutton", slug: "sutton", region: "Worcester Area" },
  { name: "Oxford", slug: "oxford", region: "Worcester Area" },
  { name: "Webster", slug: "webster", region: "Worcester Area" },
];

/* ─── HELPER FUNCTIONS ─── */

export function getCityBySlug(slug: string): CityData | undefined {
  return CITIES.find((c) => c.slug === slug);
}

export function getServiceBySlug(slug: string): ServiceData | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

export function getNearbyCities(city: CityData, limit = 6): CityData[] {
  return CITIES.filter((c) => c.region === city.region && c.slug !== city.slug).slice(0, limit);
}

export function getRegionCities(region: string): CityData[] {
  return CITIES.filter((c) => c.region === region);
}

export function generateCityParams() {
  return CITIES.map((c) => ({ city: c.slug }));
}

export function generateAllParams() {
  return CITIES.flatMap((c) => SERVICES.map((s) => ({ city: c.slug, service: s.slug })));
}

export function getAllCitySlugs() {
  return CITIES.map((c) => c.slug);
}

export function getAllServiceSlugs() {
  return SERVICES.map((s) => s.slug);
}
