import type { Metadata } from "next";
import Link from "next/link";
import { BUSINESS } from "../../../config/business";
import { businessRef, faqLd } from "../../../config/schema";
import FormEmbed from "../../components/FormEmbed";

const URL = `${BUSINESS.url}/services/vinyl-siding-upgrades`;
const TITLE = "Vinyl Siding or an Upgrade? Options in MA | Wolf's Siding";
const DESC = "Vinyl compared with Hardie Plank, Everlast, LP SmartSide, Cedar Impressions, wood and cedar: material, warranty and upkeep, for Massachusetts homes.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: URL },
  openGraph: { title: TITLE, description: DESC, url: URL, type: "website", siteName: BUSINESS.legalName },
};

/* Manufacturer facts as verified on their own sites (Nov 2026) — the same
   sources cited on each service page. Warranty terms change; the estimate
   states the current terms in writing. */
const ROWS: { name: string; path: string; material: string; warranty: string; upkeep: string; bestFor: string }[] = [
  { name: "Vinyl siding", path: "/services/vinyl-siding-installation", material: "PVC, color through the panel", warranty: "Varies by manufacturer and product line", upkeep: "No painting; occasional wash", bestFor: "The lowest-cost, low-upkeep option" },
  { name: "Everlast Composite", path: "/services/everlast-siding", material: "Mineral-filled composite core with an acrylic cap; 0.225\" lap", warranty: "Limited lifetime (original owner); 50-year prorated after a sale", upkeep: "No painting", bestFor: "A thicker, stiffer board than vinyl without paint" },
  { name: "James Hardie Plank", path: "/services/hardie-plank-siding-installation", material: "Fiber cement lap siding, noncombustible; HZ5 line for cold climates", warranty: "30-year non-prorated, transferable substrate; ColorPlus finish 15 years (paint and labor)", upkeep: "Painted product; repaint over its life", bestFor: "The look of painted wood with a noncombustible wall" },
  { name: "James Hardie Panel", path: "/services/james-hardie-panel-siding", material: "Vertical fiber cement panels, with battens for board & batten", warranty: "Same as HardiePlank (30-year substrate; ColorPlus 15-year)", upkeep: "Painted product", bestFor: "Board & batten and modern farmhouse looks" },
  { name: "LP SmartSide", path: "/services/lp-smartside-siding", material: "Engineered wood treated with the SmartGuard process", warranty: "5/50-year prorated limited (labor and material in years 1–5)", upkeep: "Painted or prefinished; keep clearances from roof and grade", bestFor: "A wood look that is lighter to handle than fiber cement" },
  { name: "Cedar Impressions", path: "/services/cedar-impressions-siding", material: "Polymer shakes and shingles molded from real cedar", warranty: "Lifetime limited (CertainTeed)", upkeep: "No staining", bestFor: "The cedar-shingle look without restaining" },
  { name: "Wood clapboard", path: "/services/clapboard-siding-installation", material: "Real wood lap boards", warranty: "Material-dependent", upkeep: "Regular painting", bestFor: "Older and historic houses where real wood matters" },
  { name: "Cedar shingles", path: "/services/cedar-shingle-siding", material: "Natural cedar", warranty: "Material-dependent", upkeep: "Weathers naturally or is stained", bestFor: "Shingle-style and coastal homes" },
  { name: "CeraClad", path: "/services/ceraclad-fiber-cement-siding", material: "5/8\" fiber cement panels with a built-in rainscreen", warranty: "30-year product; 20-year finish (color fade)", upkeep: "Factory coating", bestFor: "Modern exteriors and multi-family buildings" },
];

const FAQS = [
  { q: "Is it worth upgrading from vinyl siding?", a: "It depends on the house and the budget. Vinyl is the lowest-cost option and never needs paint. Upgrades such as fiber cement, composite or engineered wood cost more but give a heavier, more wood-like board, and fiber cement adds a noncombustible wall. In the Cost vs. Value Report 2025 for New England, fiber-cement siding replacement recouped more of its cost at resale than vinyl." },
  { q: "Which upgrade is closest to vinyl in upkeep?", a: "Everlast composite: like vinyl, the color is built in and it does not need painting, but the board is thicker and stiffer. Cedar Impressions is the no-staining option for a shingle look." },
  { q: "Which option looks most like painted wood?", a: "James Hardie fiber cement and LP SmartSide engineered wood. Both are painted products, so they read as painted wood from the street." },
  { q: "Can I get prices for vinyl and an upgrade in one estimate?", a: "Ask for it at the free on-site assessment. Pricing vinyl and an upgrade for the same walls and trim is the only way to compare them like for like." },
];

export default function VinylUpgradesPage() {
  const ld = [
    { "@context": "https://schema.org", "@type": "WebPage", "@id": `${URL}#webpage`, url: URL, name: TITLE, about: businessRef },
    faqLd(FAQS),
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: BUSINESS.url },
        { "@type": "ListItem", position: 2, name: "Services", item: `${BUSINESS.url}/services` },
        { "@type": "ListItem", position: 3, name: "Vinyl or an upgrade?", item: URL },
      ],
    },
  ];
  return (
    <main className="bg-white pt-[110px]">
      {ld.map((x, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(x) }} />
      ))}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <nav className="mb-4 text-sm text-[#666]" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-[#E00000]">Home</Link> <span className="mx-2">/</span>
          <Link href="/services" className="hover:text-[#E00000]">Services</Link> <span className="mx-2">/</span> Vinyl or an upgrade?
        </nav>
        <h1 className="mb-4 text-4xl font-extrabold tracking-[-0.02em] text-black sm:text-5xl">Vinyl siding or an upgrade?</h1>
        <p className="mb-4 max-w-3xl text-lg leading-relaxed text-[#333]">
          Most homeowners ask about vinyl first — and vinyl is a good, low-cost, low-upkeep choice. But it is not the only option.
          If you want a heavier board, the look of painted wood or cedar, or a noncombustible wall, there are step-up materials.
          Here is how they compare.
        </p>
        <p className="mb-10 max-w-3xl text-sm text-[#555]">
          Warranty details are the manufacturers&apos; and can change; your written estimate lists the current terms.
        </p>

        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="min-w-[860px] w-full text-left text-sm">
            <thead className="bg-[#14263f] text-white">
              <tr>
                <th className="p-3">Material</th>
                <th className="p-3">What it is</th>
                <th className="p-3">Manufacturer warranty</th>
                <th className="p-3">Upkeep</th>
                <th className="p-3">Best for</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r, i) => (
                <tr key={r.path} className={i === 0 ? "bg-[#FFF8E1]" : i % 2 ? "bg-[#F5F5F5]" : "bg-white"}>
                  <td className="p-3 font-bold">
                    <Link href={r.path} className="text-black underline underline-offset-2 hover:text-[#E00000]">{r.name}</Link>
                  </td>
                  <td className="p-3 text-[#333]">{r.material}</td>
                  <td className="p-3 text-[#333]">{r.warranty}</td>
                  <td className="p-3 text-[#333]">{r.upkeep}</td>
                  <td className="p-3 text-[#333]">{r.bestFor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <h2 className="mb-4 text-2xl font-extrabold text-black">How to choose</h2>
            <ul className="space-y-3 leading-relaxed text-[#333]">
              <li><strong>Lowest cost and upkeep:</strong> <Link href="/services/vinyl-siding-installation" className="font-semibold text-[#C00000] underline">vinyl</Link>.</li>
              <li><strong>Vinyl-like upkeep, more solid board:</strong> <Link href="/services/everlast-siding" className="font-semibold text-[#C00000] underline">Everlast composite</Link>.</li>
              <li><strong>Painted-wood look, noncombustible:</strong> <Link href="/services/hardie-plank-siding-installation" className="font-semibold text-[#C00000] underline">James Hardie Plank</Link>, or <Link href="/services/james-hardie-panel-siding" className="font-semibold text-[#C00000] underline">Hardie Panel</Link> for board &amp; batten.</li>
              <li><strong>Wood look, lighter install:</strong> <Link href="/services/lp-smartside-siding" className="font-semibold text-[#C00000] underline">LP SmartSide</Link>.</li>
              <li><strong>Cedar look:</strong> <Link href="/services/cedar-impressions-siding" className="font-semibold text-[#C00000] underline">Cedar Impressions</Link> (no staining) or real <Link href="/services/cedar-shingle-siding" className="font-semibold text-[#C00000] underline">cedar shingles</Link>.</li>
              <li><strong>Historic house:</strong> <Link href="/services/clapboard-siding-installation" className="font-semibold text-[#C00000] underline">wood clapboard</Link> — and check with the town if the house is in a local historic district.</li>
            </ul>
            <p className="mt-6 leading-relaxed text-[#333]">
              For the cost side, see <Link href="/blog/siding-replacement-cost-massachusetts" className="font-semibold text-[#C00000] underline">what siding replacement costs in Massachusetts</Link> and
              our <Link href="/blog/hardie-plank-vs-vinyl-siding-comparison" className="font-semibold text-[#C00000] underline">Hardie Plank vs vinyl comparison</Link>.
            </p>

            <h2 className="mb-4 mt-10 text-2xl font-extrabold text-black">Questions we get</h2>
            <div className="space-y-3">
              {FAQS.map((f) => (
                <details key={f.q} className="rounded-xl bg-[#F5F5F5] p-5">
                  <summary className="cursor-pointer font-semibold text-black">{f.q}</summary>
                  <p className="mt-3 leading-relaxed text-[#333]">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
          <aside>
            <div className="sticky top-[120px]">
              <h2 className="mb-3 text-xl font-bold text-black">Price vinyl and an upgrade together</h2>
              <p className="mb-4 text-sm text-[#555]">Ask for both at the free on-site assessment — one written estimate, same walls and trim.</p>
              <FormEmbed id="contact-form" />
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
