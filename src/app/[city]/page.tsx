import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CITIES, SERVICES, getCityBySlug, getNearbyCities, generateCityParams, getClimate, getRegionLabel, STATE_ABBR, REVIEW_RATING } from "../data/cities";
import { getCoords } from "../data/cityCoords";
import { getCityLocal } from "../data/localContent";
import { BUSINESS, SINCE, YEARS_IN_BUSINESS, CITIES_SERVED } from "../../config/business";
import { cappedTitle, cappedDescription, assertMeta } from "../../config/meta";
import LazyIframe from "../components/LazyIframe";
import FormEmbed from "../components/FormEmbed";
import HeroPhoto, { heroFor } from "../components/HeroPhoto";
import CallCtaBlock from "../components/CallCtaBlock";
import ServiceTiles from "../components/ServiceTiles";
import ProjectBento, { LOCAL_WORK_PHOTOS } from "../components/ProjectBento";
import ReviewsSection from "../components/ReviewsSection";
import { HeroStars, HeroCtas } from "../components/HeroBits";
import CityServiceBrief from "../components/CityServiceBrief";

export function generateStaticParams() {
  return generateCityParams();
}

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  const { city: slug } = await params;
  const city = getCityBySlug(slug);
  if (!city) return {};

  const coords = getCoords(slug);
  const cityLocalMeta = getCityLocal(city);
  const hook = cityLocalMeta.metaHook.replace(/^siding /, "");
  const title = cappedTitle("Siding Contractor", city.name);
  const description = cappedDescription(
    `Siding in ${city.name}, ${STATE_ABBR} — ${hook}. Vinyl, Hardie, cedar & clapboard by Wolf's Siding. Free estimates.`
  );
  assertMeta(title, description, `/${slug}`);

  return {
    title,
    description,
    keywords: `siding contractor ${city.name} MA, siding installation ${city.name}, vinyl siding ${city.name} MA, Hardie Plank siding ${city.name}, cedar shingles ${city.name}, clapboard siding ${city.name}, exterior trim ${city.name}, siding repair ${city.name} Massachusetts, siding company ${city.name}`,
    openGraph: {
      title,
      description,
      url: `https://wolfs-siding.com/${slug}`,
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
    alternates: { canonical: `https://wolfs-siding.com/${slug}` },
    // Per-city geo tags only when this city has verified coordinates — never a
    // hardcoded fallback to another city (see data/cityCoords.ts).
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

export default async function CityPage({ params }: { params: Promise<{ city: string }> }) {
  const { city: slug } = await params;
  const city = getCityBySlug(slug);
  if (!city) notFound();

  const climate = getClimate(city.region);
  const regionLabel = getRegionLabel(city.region);
  const cityLocal = getCityLocal(city);
  const nearby = getNearbyCities(city, 6);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: "Wolf's Siding Inc.",
    alternateName: ["Wolf's Siding", "Wolfs Siding"],
    description: `Professional siding contractor serving ${city.name}, ${STATE_ABBR}. Specializing in vinyl siding, Hardie Plank, cedar shingles, clapboard, and exterior trim work. Established ${SINCE}.`,
    url: `https://wolfs-siding.com/${slug}`,
    telephone: "+17744841895",
    image: "https://wolfs-siding.com/logo.png",
    logo: "https://wolfs-siding.com/logo.png",
    address: { "@type": "PostalAddress", streetAddress: "156 Washburn St", addressLocality: "Northborough", addressRegion: "MA", postalCode: "01532", addressCountry: "US" },
    geo: { "@type": "GeoCoordinates", latitude: 42.3195, longitude: -71.6412 },
    areaServed: { "@type": "City", name: city.name, containedInPlace: { "@type": "State", name: "Massachusetts" } },
    identifier: { "@type": "PropertyValue", name: "MA HIC License", value: BUSINESS.hicLicense },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Siding Services",
      itemListElement: SERVICES.map((s, i) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.name, url: `https://wolfs-siding.com/${slug}/${s.slug}` },
        position: i + 1,
      })),
    },
    sameAs: ["https://www.instagram.com/wolfs_siding_inc/", "https://www.facebook.com/wolfsiding", "https://g.page/r/CfACa1fxiHsqEAE"],
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
      { "@type": "ListItem", position: 1, name: "Home", item: "https://wolfs-siding.com" },
      { "@type": "ListItem", position: 2, name: city.name, item: `https://wolfs-siding.com/${slug}` },
    ],
  };


  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      {/* ═══ HERO — job-site photo, big headline, estimate form as a card ═══ */}
      <section className="relative bg-[#111] min-h-[100svh] pt-[110px] sm:min-h-0 lg:flex lg:min-h-[860px] lg:items-center lg:bg-transparent lg:pt-[110px]">
        <HeroPhoto image={heroFor(slug)} />

        <div className="relative mx-auto w-full max-w-7xl px-4 pb-10 pt-8 sm:px-6 sm:pt-12 lg:px-8 lg:py-16">
          <div className="grid items-center gap-8 lg:grid-cols-[1.25fr_0.85fr] lg:gap-14">
            <div>
              <nav className="mb-4 text-sm text-white/70" aria-label="Breadcrumb">
                <Link href="/" className="hover:text-white">Home</Link>
                <span className="mx-2">/</span>
                <span className="text-white">{city.name}, {STATE_ABBR}</span>
              </nav>

              <span className="inline-block rounded-full bg-[#E00000] px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.06em] text-white">
                Serving {city.name}, {STATE_ABBR} · HIC #{BUSINESS.hicLicense}
              </span>

              <h1 className="mb-5 mt-5 text-[clamp(1.85rem,8.4vw,2.5rem)] font-extrabold leading-[1.03] tracking-[-0.025em] text-white sm:text-5xl lg:text-[4.3rem] [text-shadow:0_2px_14px_rgba(0,0,0,.35)]">
                Professional <span className="text-[#E00000]">Siding Contractor</span> in {city.name}, {STATE_ABBR}
              </h1>

              <p className="mb-6 max-w-xl text-lg leading-relaxed text-white/90 lg:text-xl [text-shadow:0_2px_14px_rgba(0,0,0,.35)]">
                Siding, trim, gutters and roofing for {city.name} homes. Owner-run {SINCE}, licensed and insured.
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
                  Expert Siding Services in <span className="text-[#E00000]">{city.name}, {STATE_ABBR}</span>
                </h2>
                <div className="w-20 h-1 bg-[#E00000] rounded-full mb-6" />
                <div className="space-y-4 text-[#333] text-base leading-relaxed">
                  <p>{cityLocal.intro}</p>
                  <p>
                    {cityLocal.climate} These conditions put real stress on an exterior — cracking, warping,
                    moisture infiltration, and energy loss when the siding isn&apos;t right for the home.
                  </p>
                  <p>{cityLocal.architecture}</p>
                  <p>
                    At Wolf&apos;s Siding Inc., we understand the specific demands that {city.name}&apos;s climate places on your home.
                    That&apos;s why we offer a full range of siding solutions — from cost-effective{" "}
                    <Link href={`/${slug}/vinyl-siding-installation`} className="text-[#E00000] font-semibold hover:underline">vinyl siding</Link> to premium{" "}
                    <Link href={`/${slug}/hardie-plank-siding-installation`} className="text-[#E00000] font-semibold hover:underline">Hardie Plank</Link> and{" "}
                    <Link href={`/${slug}/cedar-shingle-siding`} className="text-[#E00000] font-semibold hover:underline">cedar shingles</Link> — each selected for superior performance in New England conditions.
                    Our <strong>experience {SINCE}</strong> means we know exactly which materials and installation techniques work best for {city.name} homes.
                  </p>
                  <p>
                    Whether you need{" "}
                    <Link href={`/${slug}/clapboard-siding-installation`} className="text-[#E00000] font-semibold hover:underline">clapboard siding</Link>,{" "}
                    <Link href={`/${slug}/exterior-trim-work`} className="text-[#E00000] font-semibold hover:underline">exterior trim work</Link>, or a{" "}
                    <Link href={`/${slug}/full-siding-replacement`} className="text-[#E00000] font-semibold hover:underline">full siding replacement</Link>,
                    Wolf&apos;s Siding delivers the craftsmanship and reliability that {city.name} families deserve. Every project
                    starts with a free on-site assessment and ends with a home that&apos;s beautiful, protected, and built to last.
                  </p>
                </div>
              </div>

              {/* Fatos calculados desta cidade - condado, exposicao, distancia
                  da oficina e as vizinhas reais de neighbours(). Ver
                  CityServiceBrief.tsx. */}
              <CityServiceBrief city={city} />

              {/* Services as photo tiles */}
              <div>
                <h2 className="mb-6 text-3xl font-extrabold tracking-[-0.02em] text-black sm:text-4xl">
                  Siding Services in <span className="text-[#E00000]">{city.name}</span>
                </h2>
                <ServiceTiles
                  items={SERVICES.filter((s) => s.slug !== "siding-repair-services").map((s) => ({
                    href: `/${slug}/${s.slug}`,
                    title: s.shortName,
                    image: s.heroImage,
                  }))}
                />
              </div>

              {/* Real job-site photos */}
              <div>
                <h2 className="mb-6 text-3xl font-extrabold tracking-[-0.02em] text-black sm:text-4xl">
                  Our Work in <span className="text-[#E00000]">{city.region}</span>
                </h2>
                <ProjectBento photos={LOCAL_WORK_PHOTOS} />
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
                <p className="text-sm text-[#333]/60 mt-3 flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#E00000]" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" /></svg>
                  We serve {city.name} and all surrounding communities from our Northborough, MA headquarters.
                </p>
              </div>
            </div>

            {/* ─── RIGHT: Sticky Sidebar ─── */}
            <div className="hidden lg:block">
              <div className="sticky top-[90px] space-y-6">
                {/* Static CTA (no second form iframe) — points to #contact-form */}
                <CallCtaBlock />

                {/* Services links */}
                <div className="bg-[#F5F5F5] rounded-2xl p-6">
                  <h3 className="font-bold text-black mb-4">Our Services</h3>
                  <ul className="space-y-2">
                    {SERVICES.filter((s) => s.slug !== "siding-repair-services").map((s) => (
                      <li key={s.slug}>
                        <Link
                          href={`/${slug}/${s.slug}`}
                          className="flex items-center gap-3 py-2 text-sm text-[#333] hover:text-[#E00000] group"
                        >
                          <div className="w-7 h-7 bg-[#E00000]/10 rounded-md flex items-center justify-center group-hover:bg-[#E00000]">
                            <svg className="w-3.5 h-3.5 text-[#E00000] group-hover:text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>
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
                            className="flex items-center gap-2 py-1.5 text-sm text-[#333] hover:text-[#E00000]"
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
      <section className="bg-gradient-to-r from-[#E00000] to-[#CC0000] py-16 content-auto">
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
            <a href="tel:+17744841895" className="inline-flex items-center justify-center gap-3 bg-black hover:bg-[#1A1A1A] text-white px-8 py-4 rounded-xl text-lg font-bold hover:scale-105 transition-transform">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
              (774) 484-1895
            </a>
            <a href="#contact-form" className="inline-flex items-center justify-center gap-2 bg-white text-black hover:bg-gray-100 px-8 py-4 rounded-xl text-lg font-bold">
              Request Estimate
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
