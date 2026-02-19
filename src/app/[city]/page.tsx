import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CITIES, SERVICES, getCityBySlug, getNearbyCities, generateCityParams, REGION_CLIMATE, STATE_ABBR } from "../data/cities";
import LazyIframe from "../components/LazyIframe";

export function generateStaticParams() {
  return generateCityParams();
}

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  const { city: slug } = await params;
  const city = getCityBySlug(slug);
  if (!city) return {};

  const title = `Siding Contractor ${city.name}, ${STATE_ABBR} | Wolf's Siding Inc.`;
  const description = `Expert siding installation, replacement & repair in ${city.name}, ${STATE_ABBR}. Vinyl, Hardie Plank, Cedar & more. 18+ years experience. Free estimates. Call (774) 484-1895!`;

  return {
    title,
    description,
    keywords: `siding contractor ${city.name} MA, siding installation ${city.name}, vinyl siding ${city.name} MA, Hardie Plank ${city.name}, cedar shingles ${city.name}, clapboard siding ${city.name}, exterior trim ${city.name}, siding repair ${city.name} Massachusetts`,
    openGraph: {
      title,
      description,
      url: `https://www.wolfs-siding.com/${slug}`,
      siteName: "Wolf's Siding Inc.",
      type: "website",
      images: [{ url: "https://storage.googleapis.com/msgsndr/BCczy6muFwhd63dPhKCC/media/69309a3e4d01f3e2eea4a8f1.png", width: 1200, height: 630, alt: `Siding Contractor ${city.name}, ${STATE_ABBR} | Wolf's Siding Inc.` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["https://storage.googleapis.com/msgsndr/BCczy6muFwhd63dPhKCC/media/69309a3e4d01f3e2eea4a8f1.png"],
    },
    alternates: { canonical: `https://www.wolfs-siding.com/${slug}` },
  };
}

export default async function CityPage({ params }: { params: Promise<{ city: string }> }) {
  const { city: slug } = await params;
  const city = getCityBySlug(slug);
  if (!city) notFound();

  const climate = REGION_CLIMATE[city.region] ?? "challenging New England weather conditions";
  const nearby = getNearbyCities(city, 6);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: "Wolf's Siding Inc.",
    description: `Professional siding contractor serving ${city.name}, ${STATE_ABBR}. Specializing in vinyl siding, Hardie Plank, cedar shingles, clapboard, and exterior trim work.`,
    url: `https://www.wolfs-siding.com/${slug}`,
    telephone: "+17744841895",
    image: "https://www.wolfs-siding.com/logo.png",
    logo: "https://www.wolfs-siding.com/logo.png",
    address: { "@type": "PostalAddress", streetAddress: "156 Washburn St", addressLocality: "Northborough", addressRegion: "MA", postalCode: "01532", addressCountry: "US" },
    geo: { "@type": "GeoCoordinates", latitude: 42.3195, longitude: -71.6412 },
    areaServed: { "@type": "City", name: city.name, containedInPlace: { "@type": "State", name: "Massachusetts" } },
    aggregateRating: { "@type": "AggregateRating", ratingValue: "5.0", bestRating: "5", worstRating: "1", ratingCount: "22", reviewCount: "22" },
    sameAs: ["https://www.instagram.com/wolfs_siding_inc/", "https://www.facebook.com/wolfsiding", "https://maps.app.goo.gl/ibPzjf7EWQ7aK1HYA"],
    priceRange: "$$",
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "07:00", closes: "18:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "08:00", closes: "14:00" },
    ],
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.wolfs-siding.com" },
      { "@type": "ListItem", position: 2, name: city.name, item: `https://www.wolfs-siding.com/${slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      {/* ═══ HERO with background image + form ═══ */}
      <section className="relative pt-[80px]">
        <div className="absolute inset-0">
          <Image
            src="https://storage.googleapis.com/msgsndr/BCczy6muFwhd63dPhKCC/media/69309a3e0b0f9d2be96c92ab.png"
            alt={`Siding project in ${city.name}`}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/75 to-black/60" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left: Content */}
            <div>
              <nav className="text-sm text-white/50 mb-6">
                <Link href="/" className="hover:text-[#E00000] transition-colors">Home</Link>
                <span className="mx-2">/</span>
                <Link href="/#service-area" className="hover:text-[#E00000] transition-colors">Service Areas</Link>
                <span className="mx-2">/</span>
                <span className="text-white">{city.name}, {STATE_ABBR}</span>
              </nav>

              <div className="flex flex-wrap gap-3 mb-6">
                <span className="inline-flex items-center gap-2 bg-[#E00000] text-white text-xs font-bold px-4 py-2 rounded-full">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>
                  Serving {city.name}, {STATE_ABBR}
                </span>
                <span className="inline-flex items-center gap-1.5 bg-white text-black text-xs font-bold px-4 py-2 rounded-full">
                  <span className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                    ))}
                  </span>
                  5 (22 reviews)
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
                Professional <span className="text-[#E00000]">Siding Contractor</span> in {city.name}, {STATE_ABBR}
              </h1>

              <p className="text-lg text-white/80 leading-relaxed mb-8 max-w-xl">
                Wolf&apos;s Siding Inc. provides expert siding installation, replacement, and repair services to homeowners in{" "}
                <strong className="text-white">{city.name}, Massachusetts</strong>. With {climate}, your home&apos;s exterior needs professional-grade protection from a contractor with{" "}
                <strong className="text-white">18+ years of experience</strong>.
              </p>

              {/* Trust badges */}
              <div className="flex flex-wrap gap-4">
                {[
                  { icon: "shield", text: "Licensed & Insured" },
                  { icon: "clock", text: "Same Day Response" },
                  { icon: "dollar", text: "Free Estimates" },
                ].map((b) => (
                  <div key={b.text} className="flex items-center gap-2 text-white/70 text-sm">
                    <div className="w-7 h-7 bg-[#E00000]/20 border border-[#E00000]/30 rounded-full flex items-center justify-center">
                      <svg className="w-3.5 h-3.5 text-[#E00000]" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        {b.icon === "shield" && <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />}
                        {b.icon === "clock" && <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />}
                        {b.icon === "dollar" && <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />}
                      </svg>
                    </div>
                    <span className="font-medium">{b.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Form */}
            <LazyIframe
              src="https://api.leadconnectorhq.com/widget/form/altG7jV8Jt79wwRd8WbH"
              className="form-iframe-hero"
              title="Contact form"
            />
          </div>
        </div>
      </section>

      {/* ═══ Google Reviews Bar ═══ */}
      <div className="bg-black border-y border-white/10 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center gap-4">
          <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
            ))}
          </div>
          <span className="text-white text-sm font-semibold">5.0</span>
          <span className="text-white/50 text-sm">(22 Reviews)</span>
        </div>
      </div>

      {/* ═══ MAIN CONTENT + SIDEBAR ═══ */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* ─── LEFT: Main Content ─── */}
            <div className="lg:col-span-2 space-y-16">
              {/* Expert intro */}
              <div>
                <h2 className="text-3xl sm:text-4xl font-black text-black mb-3">
                  Expert Siding Services in <span className="text-[#E00000]">{city.name}, {STATE_ABBR}</span>
                </h2>
                <div className="w-20 h-1 bg-[#E00000] rounded-full mb-6" />
                <div className="space-y-4 text-[#333] text-base leading-relaxed">
                  <p>
                    {city.name} homeowners face unique exterior challenges. Located in the <strong>{city.region}</strong> region of Massachusetts,
                    homes here endure {climate}. These conditions put tremendous stress on siding materials, leading to cracking,
                    warping, moisture infiltration, and energy loss if your exterior isn&apos;t properly protected.
                  </p>
                  <p>
                    At Wolf&apos;s Siding Inc., we understand the specific demands that {city.name}&apos;s climate places on your home.
                    That&apos;s why we offer a full range of siding solutions — from cost-effective <strong>vinyl siding</strong> to premium{" "}
                    <strong>Hardie Plank</strong> and <strong>cedar shingles</strong> — each selected for superior performance in New England conditions.
                    Our <strong>18+ years of experience</strong> means we know exactly which materials and installation techniques work best for {city.name} homes.
                  </p>
                  <p>
                    Whether you&apos;re protecting a historic colonial, updating a ranch, or finishing a new build,
                    Wolf&apos;s Siding delivers the craftsmanship and reliability that {city.name} families deserve. Every project
                    starts with a free on-site assessment and ends with a home that&apos;s beautiful, protected, and built to last.
                  </p>
                </div>
              </div>

              {/* Services grid */}
              <div>
                <h2 className="text-3xl font-black text-black mb-3">
                  Siding Services in <span className="text-[#E00000]">{city.name}</span>
                </h2>
                <div className="w-20 h-1 bg-[#E00000] rounded-full mb-8" />
                <div className="grid sm:grid-cols-2 gap-5">
                  {SERVICES.map((s) => (
                    <Link
                      key={s.slug}
                      href={`/${slug}/${s.slug}`}
                      className="group bg-[#F5F5F5] rounded-xl p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 border border-transparent hover:border-[#E00000]/20"
                    >
                      <div className="w-10 h-10 bg-[#E00000] rounded-lg flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>
                      </div>
                      <h3 className="text-base font-bold text-black mb-2 group-hover:text-[#E00000] transition-colors">{s.shortName}</h3>
                      <p className="text-[#333] text-sm leading-relaxed mb-3 line-clamp-2">{s.description}</p>
                      <span className="inline-flex items-center gap-1 text-[#E00000] font-semibold text-sm">
                        Learn More
                        <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Project Photos */}
              <div>
                <h2 className="text-3xl font-black text-black mb-3">
                  Our Work in <span className="text-[#E00000]">{city.region}</span>
                </h2>
                <div className="w-20 h-1 bg-[#E00000] rounded-full mb-8" />
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {[
                    { src: "https://storage.googleapis.com/msgsndr/BCczy6muFwhd63dPhKCC/media/68caaa042a25a1ad9516f03a.jpeg", alt: "Vinyl siding installation" },
                    { src: "https://storage.googleapis.com/msgsndr/BCczy6muFwhd63dPhKCC/media/68caaa04357b4e5af271fea6.jpeg", alt: "Clapboard siding project" },
                    { src: "https://storage.googleapis.com/msgsndr/BCczy6muFwhd63dPhKCC/media/69309a3e0b0f9d5eef6c92ac.png", alt: "Hardie Plank installation" },
                    { src: "https://storage.googleapis.com/msgsndr/BCczy6muFwhd63dPhKCC/media/69309a3e1d466eed197a9806.png", alt: "Cedar shingle siding" },
                    { src: "https://storage.googleapis.com/msgsndr/BCczy6muFwhd63dPhKCC/media/69309a3ee0f09220206bdb36.png", alt: "Exterior trim work" },
                    { src: "https://storage.googleapis.com/msgsndr/BCczy6muFwhd63dPhKCC/media/69309a3e0b0f9d2be96c92ab.png", alt: "Complete siding replacement" },
                  ].map((img) => (
                    <div key={img.src} className="relative aspect-[4/3] rounded-xl overflow-hidden group">
                      <Image
                        src={img.src}
                        alt={`${img.alt} near ${city.name}`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <span className="text-white text-xs font-semibold">{img.alt}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Why choose */}
              <div>
                <h2 className="text-3xl font-black text-black mb-3">
                  Why {city.name} Chooses <span className="text-[#E00000]">Wolf&apos;s Siding</span>
                </h2>
                <div className="w-20 h-1 bg-[#E00000] rounded-full mb-8" />
                <div className="grid sm:grid-cols-2 gap-5">
                  {[
                    { icon: "shield", title: "Licensed & Insured", desc: "Fully licensed and insured for your complete peace of mind. We carry comprehensive liability and workers' compensation coverage." },
                    { icon: "star", title: "5-Star Rated", desc: "Perfect 5.0 rating on Google with 22+ reviews from satisfied homeowners across Massachusetts. Our reputation speaks for itself." },
                    { icon: "clock", title: "On-Time Completion", desc: "We respect your schedule. Projects are completed on time, within budget, and with minimal disruption to your daily life." },
                    { icon: "dollar", title: "Free Estimates", desc: "No-obligation on-site assessments with transparent, itemized pricing. No hidden fees, no pressure — just honest expertise." },
                  ].map((item) => (
                    <div key={item.title} className="bg-[#F5F5F5] rounded-xl p-6 border border-gray-100">
                      <div className="w-10 h-10 bg-[#E00000]/10 rounded-lg flex items-center justify-center mb-4">
                        <svg className="w-5 h-5 text-[#E00000]" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                          {item.icon === "shield" && <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />}
                          {item.icon === "star" && <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />}
                          {item.icon === "clock" && <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />}
                          {item.icon === "dollar" && <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />}
                        </svg>
                      </div>
                      <h3 className="font-bold text-black mb-2">{item.title}</h3>
                      <p className="text-sm text-[#333] leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Map */}
              <div>
                <h3 className="text-2xl font-black text-black mb-3 flex items-center gap-2">
                  <svg className="w-6 h-6 text-[#E00000]" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>
                  Service Area: {city.name}, {STATE_ABBR}
                </h3>
                <iframe
                  src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(city.name + ", MA")}&zoom=12`}
                  className="w-full h-[300px] rounded-xl border-0"
                  loading="lazy"
                  title={`Map of ${city.name}`}
                />
                <p className="text-sm text-[#333]/60 mt-3 flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#E00000]" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" /></svg>
                  We serve {city.name} and all surrounding communities from our Northborough, MA headquarters.
                </p>
              </div>
            </div>

            {/* ─── RIGHT: Sticky Sidebar ─── */}
            <div className="hidden lg:block">
              <div className="sticky top-[90px] space-y-6">
                {/* Form CTA */}
                <LazyIframe
                  src="https://api.leadconnectorhq.com/widget/form/altG7jV8Jt79wwRd8WbH"
                  className="form-iframe-sidebar"
                  title="Contact form"
                />

                {/* Call CTA */}
                <div className="bg-black rounded-2xl p-6 text-center">
                  <p className="text-white/60 text-sm mb-2">Call Us Now</p>
                  <a href="tel:+17744841895" className="text-[#E00000] text-2xl font-black hover:text-white transition-colors">
                    (774) 484-1895
                  </a>
                </div>

                {/* Services links */}
                <div className="bg-[#F5F5F5] rounded-2xl p-6">
                  <h3 className="font-bold text-black mb-4">Our Services</h3>
                  <ul className="space-y-2">
                    {SERVICES.map((s) => (
                      <li key={s.slug}>
                        <Link
                          href={`/${slug}/${s.slug}`}
                          className="flex items-center gap-3 py-2 text-sm text-[#333] hover:text-[#E00000] transition-colors group"
                        >
                          <div className="w-7 h-7 bg-[#E00000]/10 rounded-md flex items-center justify-center group-hover:bg-[#E00000] transition-colors">
                            <svg className="w-3.5 h-3.5 text-[#E00000] group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>
                          </div>
                          {s.shortName}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Nearby cities */}
                {nearby.length > 0 && (
                  <div className="bg-[#F5F5F5] rounded-2xl p-6">
                    <h3 className="font-bold text-black mb-4">Nearby Service Areas</h3>
                    <ul className="space-y-2">
                      {nearby.map((c) => (
                        <li key={c.slug}>
                          <Link
                            href={`/${c.slug}`}
                            className="flex items-center gap-2 py-1.5 text-sm text-[#333] hover:text-[#E00000] transition-colors"
                          >
                            <svg className="w-3.5 h-3.5 text-[#E00000]" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
                            {c.name}, {STATE_ABBR}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="bg-gradient-to-r from-[#E00000] to-[#CC0000] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">
              Ready to Start Your Siding Project?
            </h2>
            <p className="text-white/90 text-lg">
              Get a free estimate today. No obligation, no pressure — just honest expertise for your {city.name} home.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="tel:+17744841895" className="inline-flex items-center justify-center gap-3 bg-black hover:bg-[#1A1A1A] text-white px-8 py-4 rounded-xl text-lg font-bold transition-all hover:scale-105">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
              (774) 484-1895
            </a>
            <Link href="/#contact" className="inline-flex items-center justify-center gap-2 bg-white text-black hover:bg-gray-100 px-8 py-4 rounded-xl text-lg font-bold transition-all">
              Request Estimate
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
