import type { Metadata } from "next";
import Link from "next/link";
import { BUSINESS } from "../../../config/business";
import { businessRef } from "../../../config/schema";
import { CITIES, getRegionLabel } from "../../data/cities";
import { milesFromHQ } from "../../data/cityGeo";
import { regionSlug } from "../../components/FooterAreas";

const URL = `${BUSINESS.url}/service-areas`;
const TITLE = "Service Areas: 109 Massachusetts Towns | Wolf's Siding";
const DESC = `Every Massachusetts town Wolf's Siding works in, by region, with the distance from our Northborough shop. Siding, trim, windows, gutters and roofing.`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: URL },
  openGraph: { title: TITLE, description: DESC, url: URL, type: "website", siteName: BUSINESS.legalName },
};

export default function ServiceAreasPage() {
  const regions = Array.from(new Set(CITIES.map((c) => c.region)));
  const ld = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${URL}#webpage`,
    url: URL,
    name: TITLE,
    about: businessRef,
    hasPart: CITIES.map((c) => ({ "@type": "WebPage", name: `${c.name}, MA`, url: `${BUSINESS.url}/${c.slug}` })),
  };

  return (
    <main className="bg-white pt-[110px]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <nav className="mb-4 text-sm text-[#666]" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-[#E00000]">Home</Link> <span className="mx-2">/</span> Service areas
        </nav>
        <h1 className="mb-4 text-4xl font-extrabold tracking-[-0.02em] text-black sm:text-5xl">Where we work</h1>
        <p className="mb-10 max-w-2xl text-lg text-[#333]">
          Wolf&apos;s Siding works across {CITIES.length} Massachusetts towns from its shop in {BUSINESS.address.city}. Each town page
          has the local housing numbers, rules worth knowing and our nearest jobs.
        </p>
        <div className="space-y-12">
          {regions.map((r) => {
            const towns = CITIES.filter((c) => c.region === r).sort((a, b) => a.name.localeCompare(b.name));
            return (
              <section key={r} id={regionSlug(r)} className="scroll-mt-32">
                <h2 className="mb-4 text-2xl font-extrabold text-black">
                  {getRegionLabel(r)} <span className="text-base font-normal text-[#666]">({towns.length} towns)</span>
                </h2>
                <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
                  {towns.map((c) => {
                    const mi = milesFromHQ(c.slug);
                    return (
                      <li key={c.slug}>
                        <Link href={`/${c.slug}`} className="block rounded-lg border border-gray-200 px-4 py-3 hover:border-[#E00000]">
                          <span className="font-semibold text-black">{c.name}</span>
                          {mi !== null && <span className="block text-xs text-[#666]">{mi} mi from the shop</span>}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </section>
            );
          })}
        </div>
      </section>
    </main>
  );
}
