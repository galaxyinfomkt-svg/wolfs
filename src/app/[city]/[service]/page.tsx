import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getCityBySlug, getServiceBySlug, getNearbyCities, generateAllParams, SERVICES, REGION_CLIMATE, STATE_ABBR, REVIEW_COUNT, REVIEW_RATING } from "../../data/cities";
import { BLOG_POSTS } from "../../data/blog";
import LazyIframe from "../../components/LazyIframe";
import YouTubeSection from "../../components/YouTubeSection";

type Params = { city: string; service: string };

export function generateStaticParams() {
  return generateAllParams();
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { city: citySlug, service: serviceSlug } = await params;
  const city = getCityBySlug(citySlug);
  const service = getServiceBySlug(serviceSlug);
  if (!city || !service) return {};

  const title = `${service.name} ${city.name}, ${STATE_ABBR} | Wolf's Siding Inc.`;
  const description = `Professional ${service.shortName.toLowerCase()} in ${city.name}, ${STATE_ABBR}. ${service.lifespan} lifespan. 18+ years experience. Free estimates. Call (774) 484-1895!`;

  return {
    title,
    description,
    keywords: `${service.shortName.toLowerCase()} ${city.name} MA, ${service.material} ${city.name}, siding contractor ${city.name} Massachusetts, ${service.name.toLowerCase()} near me, ${service.shortName.toLowerCase()} contractor ${city.name}`,
    openGraph: { title, description, url: `https://wolfs-siding.com/${citySlug}/${serviceSlug}`, siteName: "Wolf's Siding Inc.", type: "website", images: [{ url: service.heroImage, width: 1200, height: 630, alt: title }] },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [service.heroImage],
    },
    alternates: { canonical: `https://wolfs-siding.com/${citySlug}/${serviceSlug}` },
  };
}

export default async function CityServicePage({ params }: { params: Promise<Params> }) {
  const { city: citySlug, service: serviceSlug } = await params;
  const city = getCityBySlug(citySlug);
  const service = getServiceBySlug(serviceSlug);
  if (!city || !service) notFound();

  const climate = REGION_CLIMATE[city.region] ?? "challenging New England weather conditions";
  const otherServices = SERVICES.filter((s) => s.slug !== serviceSlug);
  const nearby = getNearbyCities(city, 6);
  const relatedPosts = BLOG_POSTS.filter((p) => p.relatedService === serviceSlug).slice(0, 2);
  if (relatedPosts.length < 2) {
    const remaining = BLOG_POSTS.filter((p) => p.relatedService !== serviceSlug).slice(0, 2 - relatedPosts.length);
    relatedPosts.push(...remaining);
  }

  const cityFaq = {
    q: `Why choose Wolf's Siding for ${service.shortName.toLowerCase()} in ${city.name}?`,
    a: `Wolf's Siding Inc. has served ${city.name} and the ${city.region} region for over 18 years. We understand ${climate} and select the best ${service.material} materials for your area. With a perfect ${REVIEW_RATING} Google rating, free estimates, and owner Ezequias Lobo personally overseeing every project, we deliver the quality ${city.name} homeowners expect.`,
  };
  const allFaqs = [...service.faqs, cityFaq];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${service.name} in ${city.name}, ${STATE_ABBR}`,
    description: `Professional ${service.material} in ${city.name}, ${STATE_ABBR}. ${service.lifespan} lifespan. Expert installation by Wolf's Siding Inc.`,
    url: `https://wolfs-siding.com/${citySlug}/${serviceSlug}`,
    provider: {
      "@type": "HomeAndConstructionBusiness",
      name: "Wolf's Siding Inc.",
      telephone: "+17744841895",
      image: "https://wolfs-siding.com/logo.png",
      address: { "@type": "PostalAddress", streetAddress: "156 Washburn St", addressLocality: "Northborough", addressRegion: "MA", postalCode: "01532", addressCountry: "US" },
      aggregateRating: { "@type": "AggregateRating", ratingValue: REVIEW_RATING, bestRating: "5", worstRating: "1", ratingCount: REVIEW_COUNT, reviewCount: REVIEW_COUNT },
      priceRange: "$$",
    },
    areaServed: { "@type": "City", name: city.name, containedInPlace: { "@type": "State", name: "Massachusetts" } },
    offers: { "@type": "Offer", priceCurrency: "USD", priceSpecification: { "@type": "PriceSpecification", priceCurrency: "USD", price: service.priceRange } },
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: allFaqs.map((faq: { q: string; a: string }) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://wolfs-siding.com" },
      { "@type": "ListItem", position: 2, name: city.name, item: `https://wolfs-siding.com/${citySlug}` },
      { "@type": "ListItem", position: 3, name: service.shortName, item: `https://wolfs-siding.com/${citySlug}/${serviceSlug}` },
    ],
  };

  const howToLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `How We Install ${service.shortName} in ${city.name}, ${STATE_ABBR}`,
    description: `Professional ${service.shortName.toLowerCase()} installation process in ${city.name} by Wolf's Siding Inc.`,
    step: service.processSteps.map((step, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: step.title,
      text: step.desc,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToLd) }} />

      {/* ═══ HERO with background image + form ═══ */}
      <section className="relative pt-[80px]">
        <div className="absolute inset-0">
          <Image
            src={service.heroImage}
            alt={`${service.shortName} installation by Wolf's Siding in ${city.name}, MA`}
            fill
            className="object-cover object-[center_30%]"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/80 to-black/60" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left: Content */}
            <div>
              <nav className="text-sm text-white/50 mb-6">
                <Link href="/" className="hover:text-[#E00000] transition-colors">Home</Link>
                <span className="mx-2">/</span>
                <Link href={`/${citySlug}`} className="hover:text-[#E00000] transition-colors">{city.name}</Link>
                <span className="mx-2">/</span>
                <span className="text-white">{service.shortName}</span>
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
                  {REVIEW_RATING} ({REVIEW_COUNT} reviews)
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-black text-white leading-tight mb-6">
                Professional <span className="text-[#E00000]">{service.shortName}</span> Contractor in {city.name}, {STATE_ABBR}
              </h1>

              <p className="text-lg text-white/80 leading-relaxed mb-8 max-w-xl">
                {service.description} Our skilled crew provides precision {service.material} for homes across {city.name}.
                We bring <strong className="text-white">18+ years of experience</strong> and a{" "}
                <strong className="text-white">perfect 5.0 Google rating</strong> to every project.
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
            <div id="contact-form">
              <LazyIframe
                src="https://api.leadconnectorhq.com/widget/form/altG7jV8Jt79wwRd8WbH"
                className="form-iframe-hero"
                title="Contact form"
              />
            </div>
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
          <span className="text-white text-sm font-semibold">{REVIEW_RATING}</span>
          <span className="text-white/50 text-sm">({REVIEW_COUNT} Reviews)</span>
        </div>
      </div>

      {/* ═══ MAIN CONTENT + SIDEBAR ═══ */}
      <section className="py-16 bg-white content-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* ─── LEFT: Main Content ─── */}
            <div className="lg:col-span-2 space-y-16">

              {/* Expert intro */}
              <div>
                <h2 className="text-3xl sm:text-4xl font-black text-black mb-3">
                  Expert {service.shortName} in <span className="text-[#E00000]">{city.name}, {STATE_ABBR}</span>
                </h2>
                <div className="w-20 h-1 bg-[#E00000] rounded-full mb-6" />
                <div className="space-y-4 text-[#333] text-base leading-relaxed">
                  <p>
                    When it comes to <strong>{service.material}</strong> in{" "}
                    <Link href={`/${citySlug}`} className="text-[#E00000] font-semibold hover:underline">{city.name}, {STATE_ABBR}</Link>,
                    Wolf&apos;s Siding Inc. is the contractor homeowners trust. Located in the {city.region} region of Massachusetts,
                    {city.name} experiences {climate} — making the right siding choice critical for protecting your investment
                    and maintaining your home&apos;s beauty.
                  </p>
                  <p>
                    Our team specializes in {service.material} that&apos;s specifically selected to handle the demanding conditions
                    {city.name} throws at your home. With an expected lifespan of{" "}
                    <strong>{service.lifespan}</strong>, {service.material} delivers exceptional long-term value for {city.name} homeowners
                    — ideal for {service.idealFor}.
                  </p>
                  <p>
                    Led by owner <strong>Ezequias Lobo</strong>, our crew has been serving {city.region} communities like{" "}
                    {city.name} for over 18 years. We also offer{" "}
                    <Link href={`/${citySlug}/${otherServices[0].slug}`} className="text-[#E00000] font-semibold hover:underline">{otherServices[0].shortName.toLowerCase()}</Link>{" "}
                    and{" "}
                    <Link href={`/${citySlug}/${otherServices[1].slug}`} className="text-[#E00000] font-semibold hover:underline">{otherServices[1].shortName.toLowerCase()}</Link>{" "}
                    to complement your project. Every job starts with a{" "}
                    <strong>free on-site assessment</strong> where we evaluate your specific needs and provide a transparent,
                    itemized estimate — no surprises, no pressure.
                  </p>
                </div>
              </div>

              {/* Common challenges */}
              <div>
                <h3 className="text-2xl font-black text-black mb-3 flex items-center gap-2">
                  <svg className="w-6 h-6 text-[#E00000]" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.6-5.6a8 8 0 1111.31 0l-5.6 5.6a.25.25 0 01-.36.01z" /></svg>
                  Common {service.shortName} Challenges in {city.name}
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
                {/* Solution card */}
                <div className="bg-green-50 rounded-xl p-5 border border-green-200 mt-4">
                  <div className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <p className="text-green-800 text-sm leading-relaxed">
                      <strong>The Solution:</strong> Wolf&apos;s Siding Inc. addresses all of these challenges with professional {service.material} tailored specifically for {city.name}&apos;s conditions. Our 18+ years of local experience means we know exactly what works and what doesn&apos;t.
                    </p>
                  </div>
                </div>
              </div>

              {/* Process steps */}
              <div>
                <h3 className="text-2xl font-black text-black mb-6">
                  Our {service.shortName} Process in {city.name}
                </h3>
                <div className="grid sm:grid-cols-2 gap-5">
                  {service.processSteps.map((step, i) => (
                    <div key={i} className="bg-[#F5F5F5] rounded-xl p-6 border border-gray-100 relative">
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
                  {service.shortName} Projects Near {city.name}
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { src: "https://assets.cdn.filesafe.space/BCczy6muFwhd63dPhKCC/media/69975cfb2a2f15796c002376.jpg", alt: `${service.shortName} project by Wolf's Siding near ${city.name}, MA` },
                    { src: "https://assets.cdn.filesafe.space/BCczy6muFwhd63dPhKCC/media/69975e32181715caeea6e9c1.jpg", alt: `${service.shortName} installation detail near ${city.name}, MA` },
                    { src: "https://assets.cdn.filesafe.space/BCczy6muFwhd63dPhKCC/media/69975e324c2502c5f69917b6.jpg", alt: `Completed siding project by Wolf's Siding near ${city.name}, MA` },
                    { src: "https://assets.cdn.filesafe.space/BCczy6muFwhd63dPhKCC/media/69975e328523c5f2c4d090c0.jpg", alt: `Siding installation by Wolf's Siding near ${city.name}, MA` },
                  ].map((img) => (
                    <div key={img.src} className="relative aspect-[4/3] rounded-xl overflow-hidden group">
                      <Image
                        src={img.src}
                        alt={`${img.alt} near ${city.name}`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 50vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Benefits */}
              <div>
                <h3 className="text-2xl font-black text-black mb-3">
                  Why Choose {service.shortName} for Your {city.name} Home?
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

              {/* Map */}
              <div>
                <h3 className="text-2xl font-black text-black mb-3 flex items-center gap-2">
                  <svg className="w-6 h-6 text-[#E00000]" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>
                  Service Area: {city.name}, {STATE_ABBR}
                </h3>
                <LazyIframe
                  src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(city.name + ", MA")}&zoom=12`}
                  className="w-full h-[300px] rounded-xl border-0"
                  title={`Map of ${city.name}`}
                />
              </div>

              {/* FAQ */}
              <div>
                <h3 className="text-2xl font-black text-black mb-6">Frequently Asked Questions</h3>
                <div className="space-y-4">
                  {allFaqs.map((faq, i) => (
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
                  Why {city.name} Chooses Wolf&apos;s Siding
                </h3>
                <div className="grid sm:grid-cols-2 gap-5">
                  {[
                    { icon: "shield", title: "Licensed & Insured", desc: "Fully licensed and insured for your complete peace of mind on every project." },
                    { icon: "star", title: "5-Star Rated", desc: `Perfect ${REVIEW_RATING} Google rating with ${REVIEW_COUNT}+ reviews from satisfied Massachusetts homeowners.` },
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
                  <h3 className="font-bold text-black mb-4">Other Services in {city.name}</h3>
                  <ul className="space-y-2">
                    {otherServices.map((s) => (
                      <li key={s.slug}>
                        <Link
                          href={`/${citySlug}/${s.slug}`}
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
                    <h3 className="font-bold text-black mb-4">{service.shortName} Nearby</h3>
                    <ul className="space-y-2">
                      {nearby.map((c) => (
                        <li key={c.slug}>
                          <Link
                            href={`/${c.slug}/${serviceSlug}`}
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

      {/* ═══ Related Blog Posts ═══ */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-[#F5F5F5] content-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-black text-black mb-3">
              Siding Tips for <span className="text-[#E00000]">{city.name}</span> Homeowners
            </h2>
            <div className="w-20 h-1 bg-[#E00000] rounded-full mb-8" />
            <div className="grid sm:grid-cols-2 gap-6">
              {relatedPosts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all hover:-translate-y-0.5">
                  <div className="relative aspect-[16/9]">
                    <Image src={post.heroImage} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 640px) 100vw, 50vw" />
                    <div className="absolute top-3 left-3">
                      <span className="bg-[#E00000] text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">{post.category}</span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-black text-sm mb-2 group-hover:text-[#E00000] transition-colors line-clamp-2">{post.title}</h3>
                    <p className="text-xs text-[#333]/70 line-clamp-2">{post.excerpt}</p>
                    <span className="inline-flex items-center gap-1 text-[#E00000] text-xs font-semibold mt-3">
                      Read Article
                      <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══ YOUTUBE VIDEOS ═══ */}
      <YouTubeSection />

      {/* ═══ CTA ═══ */}
      <section className="bg-gradient-to-r from-[#E00000] to-[#CC0000] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">
              Ready to Start Your {service.shortName} Project?
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
            <a href="#contact-form" className="inline-flex items-center justify-center gap-2 bg-white text-black hover:bg-gray-100 px-8 py-4 rounded-xl text-lg font-bold transition-all">
              Request Estimate
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
