import type { Metadata } from "next";
import Link from "next/link";
import { BUSINESS } from "../../config/business";
import { SERVICE_CATALOG, businessRef } from "../../config/schema";
import { SERVICES } from "../data/cities";
import { EXTRA_SERVICES } from "../data/extraServices";

const URL = `${BUSINESS.url}/services`;
const TITLE = "Exterior Services: Siding, Trim, Windows | Wolf's Siding";
const DESC = "All 20 exterior services Wolf's Siding offers in Massachusetts: siding in every major material, trim, soffit and fascia, windows, gutters and roofing.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: URL },
  openGraph: { title: TITLE, description: DESC, url: URL, type: "website", siteName: BUSINESS.legalName },
};

/** One-line description per service, from the service data itself. */
function blurb(slug: string): string | undefined {
  const core = SERVICES.find((s) => s.slug === slug);
  if (core) return core.description;
  return EXTRA_SERVICES.find((s) => s.slug === slug)?.lead;
}

export default function ServicesHub() {
  const ld = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${URL}#webpage`,
    url: URL,
    name: TITLE,
    about: businessRef,
    hasPart: SERVICE_CATALOG.flatMap((g) => g.items.filter((s) => s.path).map((s) => ({ "@type": "Service", name: s.name, url: `${BUSINESS.url}${s.path}`, provider: businessRef }))),
  };
  return (
    <main className="bg-white pt-[110px]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <nav className="mb-4 text-sm text-[#666]" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-[#E00000]">Home</Link> <span className="mx-2">/</span> Services
        </nav>
        <h1 className="mb-4 text-4xl font-extrabold tracking-[-0.02em] text-black sm:text-5xl">Exterior services</h1>
        <p className="mb-10 max-w-2xl text-lg text-[#333]">
          Everything Wolf&apos;s Siding does on the outside of a house, from the siding itself to the trim, windows, gutters and roof.
          Every job starts with a free on-site assessment and a written estimate.
        </p>
        <div className="space-y-12">
          {SERVICE_CATALOG.map((g) => (
            <section key={g.group}>
              <h2 className="mb-4 text-2xl font-extrabold text-black">{g.group}</h2>
              <ul className="grid gap-4 sm:grid-cols-2">
                {g.items.map((s) => {
                  const slug = s.path?.split("/").pop() ?? "";
                  const text = blurb(slug);
                  return (
                    <li key={s.name}>
                      <Link href={s.path ?? "#"} className="block h-full rounded-xl border border-gray-200 p-5 hover:border-[#E00000]">
                        <span className="text-lg font-bold text-black">{s.name}</span>
                        {text && <span className="mt-1 block text-sm leading-relaxed text-[#555] line-clamp-3">{text}</span>}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>
      </section>
    </main>
  );
}
