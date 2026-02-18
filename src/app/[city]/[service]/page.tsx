import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCityBySlug, getServiceBySlug, generateAllParams, SERVICES } from "../../data/cities";

type Params = { city: string; service: string };

/* Static generation for ALL city × service combinations (~735 pages) */
export function generateStaticParams() {
  return generateAllParams();
}

/* Unique metadata per city+service */
export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { city: citySlug, service: serviceSlug } = await params;
  const city = getCityBySlug(citySlug);
  const service = getServiceBySlug(serviceSlug);
  if (!city || !service) return {};

  const title = `${service.name} ${city.name}, ${city.stateAbbr} | Wolf's Siding Inc.`;
  const description = `Professional ${service.shortName.toLowerCase()} in ${city.name}, ${city.stateAbbr}. ${service.priceRange}. ${service.lifespan} lifespan. 18+ years experience. Free estimates. Call (774) 484-1895!`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://wolfs-siding.com/${citySlug}/${serviceSlug}`,
      siteName: "Wolf's Siding Inc.",
      type: "website",
    },
    alternates: { canonical: `https://wolfs-siding.com/${citySlug}/${serviceSlug}` },
  };
}

export default async function CityServicePage({ params }: { params: Promise<Params> }) {
  const { city: citySlug, service: serviceSlug } = await params;
  const city = getCityBySlug(citySlug);
  const service = getServiceBySlug(serviceSlug);
  if (!city || !service) notFound();

  const otherServices = SERVICES.filter((s) => s.slug !== serviceSlug);

  /* JSON-LD for this city+service page */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${service.name} in ${city.name}, ${city.stateAbbr}`,
    description: `Professional ${service.material} installation, replacement and repair in ${city.name}, ${city.stateAbbr}. ${service.lifespan} lifespan. ${service.priceRange}.`,
    url: `https://wolfs-siding.com/${citySlug}/${serviceSlug}`,
    provider: {
      "@type": "HomeAndConstructionBusiness",
      name: "Wolf's Siding Inc.",
      telephone: "+17744841895",
      address: { "@type": "PostalAddress", streetAddress: "156 Washburn St", addressLocality: "Northborough", addressRegion: "MA", postalCode: "01532", addressCountry: "US" },
      aggregateRating: { "@type": "AggregateRating", ratingValue: "5.0", reviewCount: "22" },
    },
    areaServed: { "@type": "City", name: city.name, containedInPlace: { "@type": "State", name: city.state } },
    offers: { "@type": "Offer", priceRange: service.priceRange, priceCurrency: "USD" },
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
            <Link href={`/${citySlug}`} className="hover:text-[#E00000] transition-colors">{city.name}</Link>
            <span className="mx-2">/</span>
            <span className="text-white">{service.shortName}</span>
          </nav>

          <div className="max-w-4xl">
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="inline-flex items-center gap-2 bg-[#E00000] text-white text-xs font-bold px-4 py-2 rounded-full">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>
                {city.name}, {city.stateAbbr}
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white/10 text-white text-xs font-semibold px-4 py-2 rounded-full border border-white/20">
                <svg className="w-3.5 h-3.5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                5.0 (22 Reviews)
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-black text-white leading-tight mb-6">
              <span className="text-[#E00000]">{service.name}</span> in {city.name}, {city.stateAbbr}
            </h1>
            <p className="text-lg text-white/80 leading-relaxed mb-8 max-w-3xl">
              Looking for professional {service.material} in {city.name}? Wolf&apos;s Siding Inc. delivers expert installation with{" "}
              <strong className="text-white">18+ years of experience</strong>, premium materials, and a satisfaction-first approach.
              Ideal for {service.idealFor}. Typical investment: <strong className="text-white">{service.priceRange}</strong> with a{" "}
              <strong className="text-white">{service.lifespan}</strong> lifespan.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="tel:+17744841895" className="inline-flex items-center justify-center gap-2 bg-[#E00000] hover:bg-[#CC0000] text-white px-8 py-4 rounded-lg text-lg font-bold transition-all hover:scale-105">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
                Get {service.shortName} Quote
              </a>
              <Link href="/#contact" className="inline-flex items-center justify-center gap-2 border-2 border-white/30 text-white hover:bg-white hover:text-black px-8 py-4 rounded-lg text-lg font-bold transition-all">
                Free Estimate in {city.name}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Pain points + Benefits — unique per service */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Pain points */}
            <div>
              <h2 className="text-3xl font-black text-black mb-4">
                Common {service.shortName} Problems in <span className="text-[#E00000]">{city.name}</span>
              </h2>
              <div className="w-20 h-1 bg-[#E00000] rounded-full mb-8" />
              <p className="text-[#333333] text-base leading-relaxed mb-8">
                {city.name} homes face {city.climate}. These conditions create specific challenges for your exterior
                that require professional attention:
              </p>
              <div className="space-y-4">
                {service.painPoints.map((pain, i) => (
                  <div key={i} className="flex items-start gap-4 bg-red-50 rounded-xl p-5 border border-red-100">
                    <div className="w-8 h-8 bg-[#E00000] rounded-full flex items-center justify-center text-white flex-shrink-0 text-sm font-bold">
                      {i + 1}
                    </div>
                    <p className="text-[#333333] text-sm leading-relaxed">{pain}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Benefits */}
            <div>
              <h2 className="text-3xl font-black text-black mb-4">
                Why Choose <span className="text-[#E00000]">{service.shortName}</span>?
              </h2>
              <div className="w-20 h-1 bg-[#E00000] rounded-full mb-8" />
              <p className="text-[#333333] text-base leading-relaxed mb-8">
                {service.description} Here&apos;s why {city.name} homeowners choose {service.material} from Wolf&apos;s Siding:
              </p>
              <div className="space-y-4">
                {service.benefits.map((benefit, i) => (
                  <div key={i} className="flex items-start gap-4 bg-green-50 rounded-xl p-5 border border-green-100">
                    <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <p className="text-[#333333] text-sm leading-relaxed">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick specs bar */}
      <section className="py-12 bg-[#111111]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { label: "Typical Investment", value: service.priceRange },
              { label: "Expected Lifespan", value: service.lifespan },
              { label: "Our Experience", value: "18+ Years" },
              { label: "Google Rating", value: "5.0 ★" },
            ].map((spec) => (
              <div key={spec.label} className="bg-white/5 border border-white/10 rounded-xl p-5">
                <div className="text-xl sm:text-2xl font-black text-[#E00000]">{spec.value}</div>
                <div className="text-xs text-white/60 font-medium mt-1">{spec.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO content block — unique per city+service */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-black mb-4">
            {service.name} for {city.name}, {city.stateAbbr} Homes
          </h2>
          <div className="w-20 h-1 bg-[#E00000] rounded-full mb-8" />

          <div className="prose prose-lg max-w-none text-[#333333] leading-relaxed space-y-5">
            <p>
              When it comes to <strong>{service.material}</strong> in <strong>{city.name}, {city.stateAbbr}</strong>,
              Wolf&apos;s Siding Inc. is the contractor homeowners trust. Located in the {city.region} region of {city.state},
              {city.name} experiences {city.climate} — making the right siding choice critical for protecting your investment
              and maintaining your home&apos;s beauty.
            </p>
            <p>
              Our team specializes in {service.material} that&apos;s specifically engineered to handle the demanding conditions
              {city.name} throws at your home. With a typical investment of {service.priceRange} and an expected lifespan of{" "}
              {service.lifespan}, {service.material} delivers exceptional long-term value for {city.name} homeowners.
              This is an investment that protects your home while significantly boosting curb appeal and property value.
            </p>
            <p>
              Led by owner <strong>Ezequias Lobo</strong>, our crew has been serving {city.county} County communities like{" "}
              {city.name} for over 18 years. We understand the local architecture, the climate challenges, and what it takes
              to deliver a siding installation that lasts. Every project starts with a <strong>free on-site assessment</strong> where
              we evaluate your specific needs and provide a transparent, itemized estimate — no surprises, no pressure.
            </p>
            <p>
              Whether you&apos;re replacing damaged siding, upgrading from an outdated exterior, or building new in {city.name},
              Wolf&apos;s Siding Inc. delivers {service.material} installation with the precision, quality materials, and
              clean jobsite practices that {city.name} homeowners expect from a top-rated contractor.
            </p>
          </div>
        </div>
      </section>

      {/* Other services in this city */}
      <section className="py-20 bg-[#F5F5F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-black mb-4">
            Other Services in <span className="text-[#E00000]">{city.name}, {city.stateAbbr}</span>
          </h2>
          <div className="w-20 h-1 bg-[#E00000] rounded-full mb-8" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherServices.map((s) => (
              <Link
                key={s.slug}
                href={`/${citySlug}/${s.slug}`}
                className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 border border-[#A3B5A4]/20 hover:border-[#E00000]/30"
              >
                <h3 className="text-base font-bold text-black mb-2 group-hover:text-[#E00000] transition-colors">
                  {s.name}
                </h3>
                <p className="text-[#333333] text-sm leading-relaxed mb-3 line-clamp-2">{s.description}</p>
                <span className="inline-flex items-center gap-1 text-[#E00000] font-semibold text-sm">
                  Learn More
                  <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
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
            Get Your Free {service.shortName} Estimate in {city.name}
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Ready to upgrade your {city.name} home with premium {service.material}? Call now for a free,
            no-obligation assessment from Massachusetts&apos; trusted siding professionals.
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
