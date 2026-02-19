import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { SERVICES, CITIES, getServiceBySlug, STATE_ABBR, REGION_CLIMATE } from "../../data/cities";
import LazyIframe from "../../components/LazyIframe";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ service: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ service: string }> }): Promise<Metadata> {
  const { service: slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  const title = `${service.name} Massachusetts | Wolf's Siding Inc.`;
  const description = `Professional ${service.shortName.toLowerCase()} services across Massachusetts. ${service.description} 18+ years experience. Free estimates. Call (774) 484-1895!`;

  return {
    title,
    description,
    keywords: `${service.shortName.toLowerCase()} Massachusetts, ${service.material} MA, ${service.name.toLowerCase()} near me, ${service.shortName.toLowerCase()} contractor Massachusetts, siding company MA`,
    openGraph: { title, description, url: `https://www.wolfs-siding.com/services/${slug}`, siteName: "Wolf's Siding Inc.", type: "website", images: [{ url: service.heroImage, width: 1200, height: 630, alt: title }] },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [service.heroImage],
    },
    alternates: { canonical: `https://www.wolfs-siding.com/services/${slug}` },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ service: string }> }) {
  const { service: slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const otherServices = SERVICES.filter((s) => s.slug !== slug);
  const regions = Object.keys(REGION_CLIMATE);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    url: `https://www.wolfs-siding.com/services/${slug}`,
    provider: {
      "@type": "HomeAndConstructionBusiness",
      name: "Wolf's Siding Inc.",
      telephone: "+17744841895",
      address: { "@type": "PostalAddress", streetAddress: "156 Washburn St", addressLocality: "Northborough", addressRegion: "MA", postalCode: "01532", addressCountry: "US" },
      aggregateRating: { "@type": "AggregateRating", ratingValue: "5.0", reviewCount: "22" },
    },
    areaServed: { "@type": "State", name: "Massachusetts" },
    offers: { "@type": "Offer", priceCurrency: "USD" },
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faqs.map((faq: { q: string; a: string }) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.wolfs-siding.com" },
      { "@type": "ListItem", position: 2, name: service.shortName, item: `https://www.wolfs-siding.com/services/${slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      {/* ═══ HERO ═══ */}
      <section className="relative pt-[80px]">
        <div className="absolute inset-0">
          <Image src={service.heroImage} alt={service.shortName} fill className="object-cover" priority sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/80 to-black/60" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <nav className="text-sm text-white/50 mb-6">
                <Link href="/" className="hover:text-[#E00000] transition-colors">Home</Link>
                <span className="mx-2">/</span>
                <span className="text-white">{service.shortName}</span>
              </nav>

              <div className="flex flex-wrap gap-3 mb-6">
                <span className="inline-flex items-center gap-2 bg-[#E00000] text-white text-xs font-bold px-4 py-2 rounded-full">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>
                  {CITIES.length}+ Cities Served
                </span>
                <span className="inline-flex items-center gap-1.5 bg-white text-black text-xs font-bold px-4 py-2 rounded-full">
                  <span className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                    ))}
                  </span>
                  5.0 (22 reviews)
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
                Professional <span className="text-[#E00000]">{service.shortName}</span> in Massachusetts
              </h1>

              <p className="text-lg text-white/80 leading-relaxed mb-8 max-w-xl">
                {service.description} With <strong className="text-white">18+ years of experience</strong> serving{" "}
                {CITIES.length}+ cities across Massachusetts, Wolf&apos;s Siding Inc. is your trusted{" "}
                {service.shortName.toLowerCase()} contractor.
              </p>

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

            {/* Form */}
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

              {/* About this service */}
              <div>
                <h2 className="text-3xl sm:text-4xl font-black text-black mb-3">
                  About <span className="text-[#E00000]">{service.shortName}</span>
                </h2>
                <div className="w-20 h-1 bg-[#E00000] rounded-full mb-6" />
                <div className="space-y-4 text-[#333] text-base leading-relaxed">
                  <p>
                    {service.description} At Wolf&apos;s Siding Inc., we bring <strong>18+ years of hands-on experience</strong> in{" "}
                    {service.material} to every project across Massachusetts. Whether your home is in Metro West, Greater Boston,
                    the South Shore, North Shore, or Worcester Area, our team has the expertise to deliver exceptional results.
                  </p>
                  <p>
                    With an expected lifespan of{" "}
                    <strong>{service.lifespan}</strong>, {service.material} is {service.idealFor}. Led by owner{" "}
                    <strong>Ezequias Lobo</strong>, our crew understands the unique challenges Massachusetts weather presents
                    and selects materials and techniques proven to perform in our demanding climate.
                  </p>
                  <p>
                    Every project begins with a <strong>free on-site assessment</strong> where we evaluate your specific needs,
                    discuss your options, and provide a transparent, itemized estimate. No surprises, no pressure — just honest
                    expertise from a contractor with a <strong>perfect 5.0 Google rating</strong> and 22+ verified reviews.
                  </p>
                </div>
              </div>

              {/* Common challenges */}
              <div>
                <h3 className="text-2xl font-black text-black mb-3 flex items-center gap-2">
                  <svg className="w-6 h-6 text-[#E00000]" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126z" /></svg>
                  Common {service.shortName} Challenges
                </h3>
                <div className="space-y-4">
                  {service.painPoints.map((pain, i) => (
                    <div key={i} className="bg-red-50 rounded-xl p-5 border border-red-100">
                      <div className="flex items-start gap-4">
                        <div className="w-8 h-8 bg-[#E00000] rounded-full flex items-center justify-center text-white flex-shrink-0 text-sm font-bold mt-0.5">
                          {i + 1}
                        </div>
                        <p className="text-[#333] text-sm leading-relaxed">{pain}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="bg-green-50 rounded-xl p-5 border border-green-200 mt-4">
                  <div className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <p className="text-green-800 text-sm leading-relaxed">
                      <strong>The Solution:</strong> Wolf&apos;s Siding Inc. addresses all of these challenges with professional{" "}
                      {service.material} tailored specifically for Massachusetts conditions. Our 18+ years of local experience
                      means we know exactly what works and what doesn&apos;t.
                    </p>
                  </div>
                </div>
              </div>

              {/* Process steps */}
              <div>
                <h3 className="text-2xl font-black text-black mb-6">
                  Our {service.shortName} Process
                </h3>
                <div className="grid sm:grid-cols-2 gap-5">
                  {service.processSteps.map((step, i) => (
                    <div key={i} className="bg-[#F5F5F5] rounded-xl p-6 border border-gray-100 relative">
                      <div className="process-number">{i + 1}</div>
                      <div className="w-10 h-10 bg-[#E00000] rounded-full flex items-center justify-center text-white font-bold text-sm mb-4">
                        {i + 1}
                      </div>
                      <h4 className="font-bold text-black mb-2">{step.title}</h4>
                      <p className="text-sm text-[#333] leading-relaxed">{step.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* What we offer */}
              <div>
                <h3 className="text-2xl font-black text-black mb-6">What We Offer</h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {service.offerings.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 bg-[#F5F5F5] rounded-lg p-4">
                      <div className="w-7 h-7 bg-[#E00000] rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                      </div>
                      <span className="text-sm text-[#333] font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Project Photos */}
              <div>
                <h3 className="text-2xl font-black text-black mb-6">
                  {service.shortName} Projects
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {[
                    { src: service.heroImage, alt: `${service.shortName} project` },
                    { src: "https://storage.googleapis.com/msgsndr/BCczy6muFwhd63dPhKCC/media/68caaa042a25a1ad9516f03a.jpeg", alt: "Vinyl siding installation" },
                    { src: "https://storage.googleapis.com/msgsndr/BCczy6muFwhd63dPhKCC/media/68caaa04357b4e5af271fea6.jpeg", alt: "Clapboard siding project" },
                    { src: "https://storage.googleapis.com/msgsndr/BCczy6muFwhd63dPhKCC/media/69309a3e4d01f353daa4a8f2.png", alt: "Siding detail" },
                    { src: "https://storage.googleapis.com/msgsndr/BCczy6muFwhd63dPhKCC/media/69309a3e8da9670893aa2a4e.png", alt: "Completed project" },
                    { src: "https://storage.googleapis.com/msgsndr/BCczy6muFwhd63dPhKCC/media/69309a3e0b0f9d2be96c92ab.png", alt: "Exterior remodeling" },
                  ].map((img) => (
                    <div key={img.src} className="relative aspect-[4/3] rounded-xl overflow-hidden group">
                      <Image
                        src={img.src}
                        alt={img.alt}
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

              {/* Benefits */}
              <div>
                <h3 className="text-2xl font-black text-black mb-3">
                  Why Choose <span className="text-[#E00000]">{service.shortName}</span>?
                </h3>
                <div className="w-20 h-1 bg-[#E00000] rounded-full mb-6" />
                <div className="space-y-4">
                  {service.benefits.map((benefit, i) => (
                    <div key={i} className="flex items-start gap-4 bg-green-50 rounded-xl p-5 border border-green-100">
                      <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      <p className="text-[#333] text-sm leading-relaxed">{benefit}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Service areas by region */}
              <div>
                <h3 className="text-2xl font-black text-black mb-3">
                  {service.shortName} Service Areas
                </h3>
                <div className="w-20 h-1 bg-[#E00000] rounded-full mb-6" />
                <p className="text-[#333] text-sm mb-6">
                  We provide professional {service.shortName.toLowerCase()} services across {CITIES.length}+ cities in Massachusetts.
                  Click any city below to see local {service.shortName.toLowerCase()} information.
                </p>
                <div className="space-y-6">
                  {regions.map((region) => {
                    const regionCities = CITIES.filter((c) => c.region === region);
                    return (
                      <div key={region}>
                        <h4 className="text-sm font-bold text-[#E00000] uppercase tracking-wider mb-3">{region}</h4>
                        <div className="flex flex-wrap gap-2">
                          {regionCities.map((c) => (
                            <Link
                              key={c.slug}
                              href={`/${c.slug}/${slug}`}
                              className="inline-block bg-[#F5F5F5] hover:bg-[#E00000] hover:text-white text-[#333] text-xs font-medium px-3 py-1.5 rounded-full transition-colors"
                            >
                              {c.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* FAQ */}
              <div>
                <h3 className="text-2xl font-black text-black mb-6">Frequently Asked Questions</h3>
                <div className="space-y-4">
                  {service.faqs.map((faq, i) => (
                    <details key={i} className="group bg-[#F5F5F5] rounded-xl border border-gray-100 overflow-hidden">
                      <summary className="flex items-center justify-between p-5 cursor-pointer list-none">
                        <span className="font-semibold text-black text-sm pr-4">{faq.q}</span>
                        <svg className="w-5 h-5 text-[#E00000] flex-shrink-0 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
                      </summary>
                      <div className="px-5 pb-5 text-sm text-[#333] leading-relaxed border-t border-gray-200 pt-4">
                        {faq.a}
                      </div>
                    </details>
                  ))}
                </div>
              </div>

              {/* Why choose Wolf's */}
              <div>
                <h3 className="text-2xl font-black text-black mb-6">
                  Why Massachusetts Chooses Wolf&apos;s Siding
                </h3>
                <div className="grid sm:grid-cols-2 gap-5">
                  {[
                    { icon: "shield", title: "Licensed & Insured", desc: "Fully licensed and insured for your complete peace of mind on every project." },
                    { icon: "star", title: "5-Star Rated", desc: "Perfect 5.0 Google rating with 22+ reviews from satisfied Massachusetts homeowners." },
                    { icon: "clock", title: "On-Time Completion", desc: "Projects completed on time, within budget, with minimal disruption to your life." },
                    { icon: "dollar", title: "Free Estimates", desc: "No-obligation on-site assessments with transparent, itemized pricing — no hidden fees." },
                  ].map((item) => (
                    <div key={item.title} className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                      <div className="w-10 h-10 bg-[#E00000]/10 rounded-lg flex items-center justify-center mb-4">
                        <svg className="w-5 h-5 text-[#E00000]" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                          {item.icon === "shield" && <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />}
                          {item.icon === "star" && <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />}
                          {item.icon === "clock" && <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />}
                          {item.icon === "dollar" && <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />}
                        </svg>
                      </div>
                      <h4 className="font-bold text-black mb-2">{item.title}</h4>
                      <p className="text-sm text-[#333] leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
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

                {/* Other services */}
                <div className="bg-[#F5F5F5] rounded-2xl p-6">
                  <h3 className="font-bold text-black mb-4">Other Services</h3>
                  <ul className="space-y-2">
                    {otherServices.map((s) => (
                      <li key={s.slug}>
                        <Link
                          href={`/services/${s.slug}`}
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

                {/* Key specs */}
                <div className="bg-[#F5F5F5] rounded-2xl p-6">
                  <h3 className="font-bold text-black mb-4">Quick Facts</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <svg className="w-4 h-4 text-[#E00000] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      <div>
                        <span className="text-xs text-[#333]/60 block">Get a Quote</span>
                        <span className="text-sm text-black font-semibold">Free Estimate</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-4 h-4 text-[#E00000] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      <div>
                        <span className="text-xs text-[#333]/60 block">Expected Lifespan</span>
                        <span className="text-sm text-black font-semibold">{service.lifespan}</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-4 h-4 text-[#E00000] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>
                      <div>
                        <span className="text-xs text-[#333]/60 block">Best For</span>
                        <span className="text-sm text-black font-semibold capitalize">{service.idealFor}</span>
                      </div>
                    </li>
                  </ul>
                </div>
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
              Ready to Start Your {service.shortName} Project?
            </h2>
            <p className="text-white/90 text-lg">
              Get a free estimate today. No obligation, no pressure — just honest expertise for your Massachusetts home.
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
