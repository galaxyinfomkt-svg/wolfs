import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { BUSINESS, SINCE } from "../../../config/business";
import { SERVICE_CATALOG, businessRef } from "../../../config/schema";
import { CITIES, getRegionLabel } from "../../data/cities";
import { PORTFOLIO } from "../../data/portfolio";

const URL = `${BUSINESS.url}/about`;
const TITLE = "About Wolf's Siding | Owner-Run Since 2018";
const DESC = `Wolf's Siding Inc. is an owner-run siding, trim, gutter and roofing contractor in Marlborough, MA. Founded in ${BUSINESS.foundedYear} by ${BUSINESS.owner}. MA HIC #${BUSINESS.hicLicense}.`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: URL },
  openGraph: { title: TITLE, description: DESC, url: URL, type: "website", siteName: BUSINESS.legalName },
};

const OWNER_PHOTO = "https://storage.googleapis.com/msgsndr/BCczy6muFwhd63dPhKCC/media/68e581d6416ab711d774e6cf.jpeg";

const STEPS = [
  { t: "Free consultation", d: "A call or form request. We talk through the house, the goal and the budget." },
  { t: "On-site assessment", d: "We visit, check the condition of the existing exterior and measure." },
  { t: "Written proposal", d: "An itemized estimate with material options, timeline and warranty details." },
  { t: "Installation", d: "Our own crew does the work, keeps the site clean and walks it with you at the end." },
];

export default function AboutPage() {
  const regions = Array.from(new Set(CITIES.map((c) => c.region)));
  const maJobs = PORTFOLIO.filter((p) => p.state === "MA").length;

  const ld = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${URL}#webpage`,
    url: URL,
    name: TITLE,
    about: businessRef,
    mainEntity: businessRef,
  };

  return (
    <main className="bg-white pt-[110px]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />

      <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
        <nav className="mb-4 text-sm text-[#666]" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-[#E00000]">Home</Link> <span className="mx-2">/</span> About
        </nav>
        <h1 className="mb-6 text-4xl font-extrabold tracking-[-0.02em] text-black sm:text-5xl">
          About Wolf&apos;s Siding
        </h1>
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr] md:items-start">
          <div className="space-y-4 text-lg leading-relaxed text-[#333]">
            <p>
              Wolf&apos;s Siding Inc. is an owner-run exterior contractor based at {BUSINESS.address.street} in{" "}
              {BUSINESS.address.city}, Massachusetts. {BUSINESS.owner} founded the company in {BUSINESS.foundedYear} and still
              runs it day to day; he has been in the trade since {BUSINESS.inTradeSince}.
            </p>
            <p>
              We are a licensed Massachusetts Home Improvement Contractor (HIC #{BUSINESS.hicLicense}). Our work is the outside
              of the house: siding, trim, soffit and fascia, windows, gutters and roofing — on single-family homes, two-families
              and new construction for builders.
            </p>
            <p>
              We work across {CITIES.length} towns from our Marlborough office, in {regions.map(getRegionLabel).join(", ")}.
              {maJobs > 0 && (
                <>
                  {" "}You can see {maJobs} of our Massachusetts jobs, with photos and the town each one is in, on our{" "}
                  <Link href="/projects" className="font-semibold text-[#E00000] hover:underline">projects page</Link>.
                </>
              )}
            </p>
          </div>
          <figure className="overflow-hidden rounded-2xl bg-[#F5F5F5]">
            <Image src={OWNER_PHOTO} alt={`${BUSINESS.owner}, owner of Wolf's Siding Inc.`} width={600} height={600} className="h-auto w-full object-cover" sizes="(max-width: 768px) 100vw, 40vw" />
            <figcaption className="p-4 text-sm text-[#555]">
              <strong className="text-black">{BUSINESS.owner}</strong> — Owner, {SINCE}
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="bg-[#F5F5F5]">
        <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
          <h2 className="mb-6 text-3xl font-extrabold text-black">How a job works</h2>
          <ol className="grid gap-4 sm:grid-cols-2">
            {STEPS.map((s, i) => (
              <li key={s.t} className="rounded-xl bg-white p-5">
                <span className="text-sm font-bold text-[#E00000]">Step {i + 1}</span>
                <h3 className="mt-1 text-lg font-bold text-black">{s.t}</h3>
                <p className="mt-1 text-[#333]">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
        <h2 className="mb-6 text-3xl font-extrabold text-black">What we do</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICE_CATALOG.map((g) => (
            <div key={g.group}>
              <h3 className="mb-2 font-bold text-black">{g.group}</h3>
              <ul className="space-y-1 text-[#333]">
                {g.items.map((s) => (
                  <li key={s.name}>
                    {s.path ? (
                      <Link href={s.path} className="hover:text-[#E00000] hover:underline">{s.name}</Link>
                    ) : (
                      s.name
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-black">
        <div className="mx-auto flex max-w-5xl flex-col items-start gap-4 px-4 py-12 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p className="text-xl font-bold text-white">Talk to us about your house.</p>
          <div className="flex gap-3">
            <a href={`tel:${BUSINESS.phoneE164}`} className="rounded-lg bg-[#E00000] px-6 py-3 font-bold text-white hover:bg-[#CC0000]">{BUSINESS.phone}</a>
            <Link href="/contact" className="rounded-lg bg-white px-6 py-3 font-bold text-black hover:bg-gray-100">Contact us</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
