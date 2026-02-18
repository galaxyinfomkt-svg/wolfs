import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CITIES, SERVICES, getCityBySlug, generateCityParams } from "../data/cities";

/* Static generation for all cities */
export function generateStaticParams() {
  return generateCityParams();
}

/* Unique metadata per city */
export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  const { city: slug } = await params;
  const city = getCityBySlug(slug);
  if (!city) return {};

  const title = `Siding Contractor ${city.name}, ${city.stateAbbr} | Wolf's Siding Inc.`;
  const description = `Expert siding installation, replacement & repair in ${city.name}, ${city.stateAbbr}. Vinyl, Hardie Plank, Cedar & more. 18+ years experience. Free estimates in ${city.name}. Call (774) 484-1895!`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://wolfs-siding.com/${slug}`,
      siteName: "Wolf's Siding Inc.",
      type: "website",
    },
    alternates: { canonical: `https://wolfs-siding.com/${slug}` },
  };
}

export default async function CityPage({ params }: { params: Promise<{ city: string }> }) {
  const { city: slug } = await params;
  const city = getCityBySlug(slug);
  if (!city) notFound();

  /* JSON-LD schema for this city */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: "Wolf's Siding Inc.",
    description: `Professional siding contractor serving ${city.name}, ${city.stateAbbr}. Specializing in vinyl siding, Hardie Plank, cedar shingles, clapboard, and exterior trim work.`,
    url: `https://wolfs-siding.com/${slug}`,
    telephone: "+17744841895",
    address: { "@type": "PostalAddress", streetAddress: "156 Washburn St", addressLocality: "Northborough", addressRegion: "MA", postalCode: "01532", addressCountry: "US" },
    areaServed: { "@type": "City", name: city.name, containedInPlace: { "@type": "State", name: city.state } },
    aggregateRating: { "@type": "AggregateRating", ratingValue: "5.0", reviewCount: "22" },
    sameAs: ["https://www.instagram.com/wolfs_siding_inc/", "https://www.facebook.com/wolfsiding"],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <section className="bg-[#111111] pt-[110px] pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-white/50 mb-8">
            <Link href="/" className="hover:text-[#E00000] transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/#service-area" className="hover:text-[#E00000] transition-colors">Service Areas</Link>
            <span className="mx-2">/</span>
            <span className="text-white">{city.name}, {city.stateAbbr}</span>
          </nav>

          <div className="max-w-4xl">
            <span className="inline-flex items-center gap-2 bg-[#E00000] text-white text-xs font-bold px-4 py-2 rounded-full mb-6">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>
              {city.region}
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
              Professional <span className="text-[#E00000]">Siding Contractor</span> in {city.name}, {city.stateAbbr}
            </h1>
            <p className="text-lg text-white/80 leading-relaxed mb-8 max-w-3xl">
              Wolf&apos;s Siding Inc. provides expert siding installation, replacement, and repair services to homeowners in{" "}
              <strong className="text-white">{city.name}, {city.state}</strong>. With {city.climate}, your home&apos;s exterior needs professional-grade protection.
              Our team brings <strong className="text-white">18+ years of experience</strong> and premium materials to every project.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="tel:+17744841895" className="inline-flex items-center justify-center gap-2 bg-[#E00000] hover:bg-[#CC0000] text-white px-8 py-4 rounded-lg text-lg font-bold transition-all hover:scale-105">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
                Call (774) 484-1895
              </a>
              <Link href="/#contact" className="inline-flex items-center justify-center gap-2 border-2 border-white/30 text-white hover:bg-white hover:text-black px-8 py-4 rounded-lg text-lg font-bold transition-all">
                Free Estimate in {city.name}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why city needs siding — unique SEO content */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-black text-black mb-4">
            Why {city.name} Homeowners Trust <span className="text-[#E00000]">Wolf&apos;s Siding</span>
          </h2>
          <div className="w-20 h-1 bg-[#E00000] rounded-full mb-8" />

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-5 text-[#333333] text-base leading-relaxed">
              <p>
                {city.name} homeowners face unique exterior challenges. Located in the {city.region} region of {city.state},
                homes here endure {city.climate}. These conditions put tremendous stress on siding materials, leading to cracking,
                warping, moisture infiltration, and energy loss if your exterior isn&apos;t properly protected.
              </p>
              <p>
                At Wolf&apos;s Siding Inc., we understand the specific demands that {city.name}&apos;s climate places on your home.
                That&apos;s why we offer a full range of siding solutions — from cost-effective <strong>vinyl siding</strong> to premium{" "}
                <strong>Hardie Plank</strong> and <strong>cedar shingles</strong> — each selected for superior performance in New England conditions.
                Our <strong>18+ years of experience</strong> means we know exactly which materials and installation techniques work best for {city.name} homes.
              </p>
              <p>
                With a population of approximately {city.population} residents, {city.name} is a vibrant {city.county} County community where homeowners
                take pride in their properties. Whether you&apos;re protecting a historic colonial, updating a ranch, or finishing a new build,
                Wolf&apos;s Siding delivers the craftsmanship and reliability that {city.name} families deserve.
              </p>
            </div>

            {/* Stats + trust */}
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { num: "18+", label: "Years Experience" },
                  { num: "5.0", label: "Google Rating" },
                  { num: "22+", label: "5-Star Reviews" },
                  { num: "24hr", label: "Response Time" },
                ].map((s) => (
                  <div key={s.label} className="bg-[#F5F5F5] rounded-xl p-5 text-center">
                    <div className="text-3xl font-black text-[#E00000]">{s.num}</div>
                    <div className="text-xs text-[#333333] font-medium mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
              <div className="bg-[#E00000]/5 rounded-xl p-6 border border-[#E00000]/10">
                <h3 className="font-bold text-black mb-3">Serving {city.name} &amp; Surrounding Areas</h3>
                <p className="text-sm text-[#333333]">
                  Based in Northborough, MA, we serve {city.name} and all of {city.county} County.
                  Free on-site assessments — we come to you, evaluate your needs, and provide a transparent estimate with zero pressure.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services grid for this city */}
      <section className="py-20 bg-[#F5F5F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-black text-black mb-4">
            Siding Services in <span className="text-[#E00000]">{city.name}, {city.stateAbbr}</span>
          </h2>
          <div className="w-20 h-1 bg-[#E00000] rounded-full mb-6" />
          <p className="text-[#333333] text-lg mb-12 max-w-3xl">
            We offer comprehensive siding and exterior services tailored to {city.name}&apos;s climate and architectural styles.
            Click any service below for detailed information specific to {city.name}.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((service) => (
              <Link
                key={service.slug}
                href={`/${slug}/${service.slug}`}
                className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-[#A3B5A4]/20 hover:border-[#E00000]/30"
              >
                <div className="w-12 h-12 bg-[#E00000] rounded-full flex items-center justify-center text-white mb-5 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>
                </div>
                <h3 className="text-lg font-bold text-black mb-2 group-hover:text-[#E00000] transition-colors">
                  {service.name} in {city.name}
                </h3>
                <p className="text-[#333333] text-sm leading-relaxed mb-4">{service.description}</p>
                <span className="inline-flex items-center gap-2 text-[#E00000] font-semibold text-sm">
                  Learn More
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#E00000] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
            Ready to Transform Your {city.name} Home?
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Get a free on-site assessment from {city.name}&apos;s trusted siding professionals. No pressure, no hidden fees — just honest expertise.
          </p>
          <a href="tel:+17744841895" className="inline-flex items-center gap-3 bg-black hover:bg-[#1A1A1A] text-white px-10 py-5 rounded-xl text-xl font-black transition-all hover:scale-105">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
            (774) 484-1895
          </a>
        </div>
      </section>
    </>
  );
}
