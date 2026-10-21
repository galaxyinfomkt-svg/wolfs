import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getCityBySlug, getServiceBySlug, getNearbyCities, generateAllParams, SERVICES, getClimate, getRegionLabel, STATE_ABBR, REVIEW_RATING } from "../../data/cities";
import { getCoords } from "../../data/cityCoords";
import { getLocalContent, prioritiseByExposure, localPainPoint } from "../../data/localContent";
import { BUSINESS, SINCE, YEARS_IN_BUSINESS } from "../../../config/business";
import { cappedTitle, cappedDescription, assertMeta } from "../../../config/meta";
import LazyIframe from "../../components/LazyIframe";
import FormEmbed from "../../components/FormEmbed";
import HeroPhoto, { heroFor } from "../../components/HeroPhoto";
import CallCtaBlock from "../../components/CallCtaBlock";
import ReviewsSection from "../../components/ReviewsSection";
import { HeroStars, HeroCtas } from "../../components/HeroBits";

type Params = { city: string; service: string };

export function generateStaticParams() {
  return generateAllParams();
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { city: citySlug, service: serviceSlug } = await params;
  const city = getCityBySlug(citySlug);
  const service = getServiceBySlug(serviceSlug);
  if (!city || !service) return {};

  const coords = getCoords(citySlug);
  const local = getLocalContent(city, service);
  const title = cappedTitle(service.shortName, city.name);
  const description = cappedDescription(
    `${service.shortName} in ${city.name}, ${STATE_ABBR} — ${local.metaHook}. Wolf's Siding installs it with our own crew. Free written estimates.`
  );
  assertMeta(title, description, `/${citySlug}/${serviceSlug}`);

  return {
    title,
    description,
    keywords: `${service.shortName.toLowerCase()} ${city.name} MA, ${service.material} ${city.name}, ${service.shortName.toLowerCase()} contractor ${city.name} Massachusetts, ${service.name.toLowerCase()} near me, ${service.shortName.toLowerCase()} installation ${city.name}, siding company ${city.name} ${STATE_ABBR}`,
    openGraph: { title, description, url: `https://wolfs-siding.com/${citySlug}/${serviceSlug}`, siteName: "Wolf's Siding Inc.", type: "website", images: [{ url: service.heroImage.startsWith("/") ? `https://wolfs-siding.com${service.heroImage}` : service.heroImage, width: 1200, height: 630, alt: title }] },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [service.heroImage.startsWith("/") ? `https://wolfs-siding.com${service.heroImage}` : service.heroImage],
    },
    alternates: { canonical: `https://wolfs-siding.com/${citySlug}/${serviceSlug}` },
    ...(coords
      ? {
          other: {
            "geo.placename": `${city.name}, ${STATE_ABBR}`,
            "geo.position": `${coords[0]};${coords[1]}`,
            ICBM: `${coords[0]}, ${coords[1]}`,
          },
        }
      : {}),
  };
}

export default async function CityServicePage({ params }: { params: Promise<Params> }) {
  const { city: citySlug, service: serviceSlug } = await params;
  const city = getCityBySlug(citySlug);
  const service = getServiceBySlug(serviceSlug);
  if (!city || !service) notFound();

  const climate = getClimate(city.region);
  const regionLabel = getRegionLabel(city.region);
  const local = getLocalContent(city, service);
  const otherServices = SERVICES.filter((s) => s.slug !== serviceSlug && s.slug !== "siding-repair-services");
  const nearby = getNearbyCities(city, 6);

  const cityFaq = {
    q: `Why choose Wolf's Siding for ${service.shortName.toLowerCase()} in ${city.name}?`,
    a: `Wolf's Siding Inc. has served ${city.name} and ${regionLabel} ${SINCE} (${YEARS_IN_BUSINESS}+ years). We understand ${climate.faq} and select the best ${service.material} for your area. With a perfect ${REVIEW_RATING} Google rating, free estimates, and owner ${BUSINESS.owner} personally overseeing every project, we deliver the quality ${city.name} homeowners expect.`,
  };
  const allFaqs = [...service.faqs, local.faq, cityFaq];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${service.name} in ${city.name}, ${STATE_ABBR}`,
    alternateName: [
      `${service.shortName} ${city.name}`,
      `${service.shortName} Contractor ${city.name}`,
      `${service.shortName} Installation ${city.name} MA`,
    ],
    serviceType: [
      service.shortName,
      `${service.shortName} Installation`,
      `${service.shortName} Contractor`,
      service.material,
    ],
    description: `Professional ${service.material} in ${city.name}, ${STATE_ABBR}. ${service.lifespan} lifespan. Expert installation by Wolf's Siding Inc.`,
    url: `https://wolfs-siding.com/${citySlug}/${serviceSlug}`,
    provider: {
      "@type": "HomeAndConstructionBusiness",
      name: "Wolf's Siding Inc.",
      telephone: "+17744841895",
      image: "https://wolfs-siding.com/logo.png",
      address: { "@type": "PostalAddress", streetAddress: BUSINESS.address.street, addressLocality: BUSINESS.address.city, addressRegion: BUSINESS.address.state, postalCode: BUSINESS.address.zip, addressCountry: "US" },
      identifier: { "@type": "PropertyValue", name: "MA HIC License", value: BUSINESS.hicLicense },
      priceRange: "$$",
    },
    areaServed: { "@type": "City", name: city.name, containedInPlace: { "@type": "State", name: "Massachusetts" } },
    offers: { "@type": "Offer", priceCurrency: "USD", availability: "https://schema.org/InStock", description: "Free estimates available" },
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

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      {/* ═══ HERO — job-site photo, big headline, estimate form as a card ═══ */}
      <section className="relative bg-[#111] min-h-[100svh] pt-[110px] sm:min-h-0 lg:flex lg:min-h-[860px] lg:items-center lg:bg-transparent lg:pt-[110px]">
        <HeroPhoto image={heroFor(`${citySlug}/${serviceSlug}`)} />

        <div className="relative mx-auto w-full max-w-7xl px-4 pb-10 pt-8 sm:px-6 sm:pt-12 lg:px-8 lg:py-16">
          <div className="grid items-center gap-8 lg:grid-cols-[1.25fr_0.85fr] lg:gap-14">
            <div>
              <nav className="mb-4 text-sm text-white/70" aria-label="Breadcrumb">
                <Link href="/" className="hover:text-white">Home</Link>
                <span className="mx-2">/</span>
                <Link href={`/${citySlug}`} className="hover:text-white">{city.name}</Link>
                <span className="mx-2">/</span>
                <span className="text-white">{service.shortName}</span>
              </nav>

              <span className="inline-block rounded-full bg-[#E00000] px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.06em] text-white">
                Serving {city.name}, {STATE_ABBR} · HIC #{BUSINESS.hicLicense}
              </span>

              <h1 className="mb-5 mt-5 text-[clamp(1.85rem,8.4vw,2.5rem)] font-extrabold leading-[1.04] tracking-[-0.025em] text-white sm:text-5xl lg:text-[3.9rem] [text-shadow:0_2px_14px_rgba(0,0,0,.35)]">
                Professional <span className="text-[#E00000]">{service.shortName}</span> Contractor in {city.name}, {STATE_ABBR}
              </h1>

              <p className="mb-6 max-w-xl text-lg leading-relaxed text-white/90 lg:text-xl [text-shadow:0_2px_14px_rgba(0,0,0,.35)]">
                {service.shortName} for {city.name} homes, installed by our own crew. Owner-run {SINCE}, licensed and insured.
              </p>

              <HeroStars />
              <HeroCtas />
            </div>

            {/* The single GHL form embed (primary conversion slot) */}
            <FormEmbed id="contact-form" className="form-iframe-hero" />
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
                  <p>{local.intro}</p>
                  <p>
                    {local.climate} That is exactly why we help{" "}
                    <Link href={`/${citySlug}`} className="text-[#E00000] font-semibold hover:underline">{city.name}, {STATE_ABBR}</Link>{" "}
                    homeowners choose {service.material} that stands up to it.
                  </p>
                  <p>{local.architecture}</p>
                  {local.nearby.length > 0 && (
                    <p>
                      {city.name} borders{" "}
                      {local.nearby.slice(0, 4).map((n, i, arr) => (
                        <span key={n.slug}>
                          <Link
                            href={`/${n.slug}/${serviceSlug}`}
                            className="text-[#E00000] font-semibold hover:underline"
                          >
                            {n.name}
                          </Link>
                          {i < arr.length - 2 ? ", " : i === arr.length - 2 ? " and " : ""}
                        </span>
                      ))}
                      , and we run {service.shortName.toLowerCase()} jobs across all of them from the
                      same shop — so scheduling a {city.name} project rarely waits on crew
                      availability.
                    </p>
                  )}
                  <p>
                    With an expected lifespan of <strong>{service.lifespan}</strong>, {service.shortName.toLowerCase()} is a
                    long-term investment for {city.name} homeowners — ideal for {service.idealFor}. Owner{" "}
                    <strong>{BUSINESS.owner}</strong> personally oversees every job {SINCE}. Explore our{" "}
                    <Link href={`/services/${serviceSlug}`} className="text-[#E00000] font-semibold hover:underline">{service.shortName.toLowerCase()} across Massachusetts</Link>,
                    or pair it with{" "}
                    <Link href={`/${citySlug}/${otherServices[0].slug}`} className="text-[#E00000] font-semibold hover:underline">{otherServices[0].shortName.toLowerCase()}</Link>{" "}
                    and{" "}
                    <Link href={`/${citySlug}/${otherServices[1].slug}`} className="text-[#E00000] font-semibold hover:underline">{otherServices[1].shortName.toLowerCase()}</Link>.
                    Every job starts with a <strong>free on-site assessment</strong> — no surprises, no pressure.
                  </p>
                </div>
              </div>


              {/*
                TRES BLOCOS GENERICOS SAIRAM DAQUI: Process steps, Benefits e
                "Why <cidade> Chooses Wolf's".

                MOTIVO, MEDIDO. As 981 paginas cidade x servico foram medidas
                mascarando o nome da cidade e do servico - que e como o Google
                as le. Mediana de conteudo proprio: 3,5%, com 702 delas abaixo
                de 5% numa pagina de 10.883 caracteres.

                Os tres blocos eram prosa de SERVICO, identica nas 109 cidades
                daquele servico, ou prosa institucional identica em todas as
                981. Frase repetida em 109 URLs nao e conteudo proprio.

                O QUE FICOU: hero com formulario, avaliacoes, intro do
                especialista, o bloco CityServiceBrief (cidade x servico), os
                desafios locais, What we offer, as fotos de obra, o mapa, o FAQ,
                a barra lateral com CTA e o CTA final. O caminho de conversao
                inteiro continua na pagina.
              */}
              {/* Common challenges */}
              <div>
                <h3 className="text-2xl font-black text-black mb-3 flex items-center gap-2">
                  <svg className="w-6 h-6 text-[#E00000]" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.6-5.6a8 8 0 1111.31 0l-5.6 5.6a.25.25 0 01-.36.01z" /></svg>
                  Common {service.shortName} Challenges in {city.name}
                </h3>
                <div className="space-y-4">
                  {[...prioritiseByExposure(service.painPoints, citySlug), ...(localPainPoint(citySlug) ? [localPainPoint(citySlug)!] : [])].map((pain, i) => (
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
                      <strong>The Solution:</strong> Wolf&apos;s Siding Inc. addresses all of these challenges with professional {service.shortName.toLowerCase()} tailored specifically for {city.name}&apos;s conditions. Our local experience {SINCE} means we know exactly what works and what doesn&apos;t.
                    </p>
                  </div>
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
                  {(() => {
                    // Real Wolf's jobs, each captioned with the town it is actually
                    // in — never presented as a job in the page's own city.
                    return [
                      { src: "/projects/navy-lakeside-cottage-stoddard-nh/stoddard-nh-navy-lakeside-cottage-siding-01.jpg", alt: "Navy lakeside cottage by Wolf's Siding in Stoddard, NH" },
                      { src: "/projects/craftsman-ranch/lancaster-ma-craftsman-ranch-fiber-cement-siding-01.jpg", alt: "Craftsman ranch with fiber cement siding by Wolf's Siding in Lancaster, MA" },
                      { src: "/projects/navy-blue-colonial/grafton-ma-navy-blue-colonial-vinyl-siding-01.jpg", alt: "Navy blue vinyl colonial by Wolf's Siding in Grafton, MA" },
                      { src: "/projects/upscale-gray-colonial/milton-ma-gray-colonial-siding-01.jpg", alt: "Gray colonial with new siding by Wolf's Siding in Milton, MA" },
                    ];
                  })().map((img) => (
                    <div key={img.src} className="relative aspect-[4/3] rounded-xl overflow-hidden group">
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 50vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
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
                  placeholderLabel="Loading map..."
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

            </div>

            {/* ─── RIGHT: Sticky Sidebar ─── */}
            <div className="hidden lg:block">
              <div className="sticky top-[90px] space-y-6">
                {/* Static CTA (no second form iframe) — points to #contact-form */}
                <CallCtaBlock />

                {/* View statewide service page */}
                <div className="bg-[#F5F5F5] rounded-2xl p-6">
                  <Link
                    href={`/services/${serviceSlug}`}
                    className="flex items-center gap-3 text-sm text-[#333] hover:text-[#E00000] transition-colors group"
                  >
                    <div className="w-9 h-9 bg-[#E00000] rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>
                    </div>
                    <div>
                      <span className="font-semibold block">{service.shortName} — Statewide</span>
                      <span className="text-xs text-[#333]/60">View all MA service areas</span>
                    </div>
                  </Link>
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

      <ReviewsSection />

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
