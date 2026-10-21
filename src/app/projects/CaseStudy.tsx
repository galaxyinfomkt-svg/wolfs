import Link from "next/link";
import Image from "next/image";
import CaseGallery from "./CaseGallery";
import FormEmbed from "../components/FormEmbed";
import LazyIframe from "../components/LazyIframe";
import ReviewsSection from "../components/ReviewsSection";
import { BUSINESS } from "../../config/business";
import { STATE_NAME, TOWN_GEO, relatedCases, type PortfolioCase } from "../data/portfolio";

const SITE = "https://wolfs-siding.com";

/* One real job, told the way the best portfolio pages do it (Olson Kundig,
   Snøhetta, Neil Kelly — see auditoria-wolfs/projetos-estudo): the photo
   first, the facts in one strip, a short honest story, the full gallery,
   then the way to get the same result at home. */
export default function CaseStudy({ c }: { c: PortfolioCase }) {
  const url = `${SITE}/projects/${c.slug}`;
  const place = `${c.city}, ${c.state}`;
  const related = relatedCases(c, 3);
  const cover = c.photos[0];
  const geo = TOWN_GEO[place];
  const placeLd = {
    "@type": "Place",
    name: place,
    address: { "@type": "PostalAddress", addressLocality: c.city, addressRegion: c.state, addressCountry: "US" },
    ...(geo ? { geo: { "@type": "GeoCoordinates", latitude: geo[0], longitude: geo[1] } } : {}),
  };

  const pageLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: `${c.title} in ${place}`,
    description: c.thesis,
    primaryImageOfPage: { "@id": `${SITE}${cover.src}#image` },
    contentLocation: placeLd,
    about: { "@type": "Service", name: "Siding installation", provider: { "@type": "HomeAndConstructionBusiness", name: BUSINESS.legalName, url: SITE } },
    image: c.photos.map((ph) => ({
      "@type": "ImageObject",
      "@id": `${SITE}${ph.src}#image`,
      contentUrl: `${SITE}${ph.src}`,
      caption: ph.alt,
      contentLocation: placeLd,
      creator: { "@type": "Organization", name: BUSINESS.legalName },
      copyrightHolder: { "@type": "Organization", name: BUSINESS.legalName },
    })),
  };
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "Projects", item: `${SITE}/projects` },
      { "@type": "ListItem", position: 3, name: c.title, item: url },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      {/* ═══ HERO — the house, full width ═══ */}
      {/* phone: photo first, text below on black (title never sits on a bright sky);
          desktop: full-bleed photo with the text over a bottom gradient */}
      <section className="relative bg-[#111] pt-[110px] lg:flex lg:h-[86vh] lg:max-h-[900px] lg:items-end lg:bg-transparent">
        <div className="relative aspect-[4/3] lg:absolute lg:inset-0 lg:aspect-auto">
          <Image src={cover.src} alt={cover.alt} fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 hidden bg-[linear-gradient(180deg,rgba(0,0,0,.15)_0%,rgba(0,0,0,.05)_35%,rgba(0,0,0,.82)_100%)] lg:block" />
        </div>
        <div className="relative mx-auto w-full max-w-7xl px-4 pb-10 pt-6 sm:px-6 lg:px-8 lg:pb-14 lg:pt-0">
          <nav className="mb-4 text-sm text-white/75" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/projects" className="hover:text-white">Projects</Link>
            <span className="mx-2">/</span>
            <span className="text-white">{c.city}</span>
          </nav>
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.08em] text-white">
            <span className="mr-2 inline-block h-2.5 w-2.5 rounded-full bg-[#E00000] align-middle" aria-hidden="true" />
            {place} · {c.style}
          </p>
          <h1 className="max-w-4xl text-[2.3rem] font-extrabold leading-[1.04] tracking-[-0.025em] text-white sm:text-5xl lg:text-[4rem]">
            {c.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/90 lg:text-xl">{c.thesis}</p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a href="#estimate" className="inline-flex items-center justify-center rounded-lg bg-[#E00000] px-7 py-4 text-lg font-bold text-white hover:bg-[#CC0000]">
              Get a Free Estimate
            </a>
            <a href="#gallery" className="inline-flex items-center justify-center rounded-lg border-2 border-white px-7 py-4 text-lg font-bold text-white hover:bg-white hover:text-black">
              View all {c.photos.length} photos
            </a>
          </div>
        </div>
      </section>

      {/* ═══ FACTS — one strip, label / value ═══ */}
      <section className="bg-[#111] text-white" aria-label="Project facts">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px px-4 sm:px-6 lg:grid-cols-[repeat(4,1fr)_auto] lg:items-center lg:px-8">
          {c.facts.map((f) => (
            <div key={f.label} className="py-5 pr-4 lg:py-7">
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-white/55">{f.label}</p>
              <p className="mt-1.5 text-[1.02rem] font-bold leading-snug">{f.value}</p>
            </div>
          ))}
          <div className="col-span-2 border-t border-white/10 py-5 lg:col-span-1 lg:border-0 lg:py-0">
            <a href={`tel:${BUSINESS.phoneE164}`} className="inline-flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-[#E00000] px-6 py-3.5 font-bold hover:bg-[#CC0000] lg:w-auto">
              Call {BUSINESS.phone}
            </a>
          </div>
        </div>
      </section>

      {/* ═══ STORY ═══ */}
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20 lg:px-8">
          <div>
            <h2 className="text-[2rem] font-extrabold leading-tight tracking-[-0.02em] text-black lg:text-[2.6rem]">The project</h2>
            <div className="mt-6 space-y-5 text-lg leading-relaxed text-[#333]">
              {c.story.map((t) => (
                <p key={t.slice(0, 24)}>{t}</p>
              ))}
            </div>
          </div>
          <aside className="self-start rounded-2xl bg-[#F5F5F5] p-7 lg:p-8">
            <h2 className="text-xl font-extrabold text-black">What we did</h2>
            <ul className="mt-5 space-y-3.5">
              {c.highlights.map((h) => (
                <li key={h} className="flex gap-3 text-[1.02rem] leading-snug text-[#222]">
                  <span className="mt-0.5 font-extrabold text-[#E00000]" aria-hidden="true">✓</span>
                  {h}
                </li>
              ))}
            </ul>
            <p className="mt-6 border-t border-black/10 pt-5 text-sm text-[#555]">
              {c.look}
            </p>
            {c.citySlug ? (
              <Link href={`/${c.citySlug}`} className="mt-4 inline-block font-bold text-[#E00000] hover:underline">
                Siding in {c.city}, {c.state} →
              </Link>
            ) : null}
            <div className="mt-6 overflow-hidden rounded-xl">
              <LazyIframe
                src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(`${c.city}, ${STATE_NAME[c.state]}`)}&zoom=11`}
                className="h-[220px] w-full border-0"
                title={`Map of ${place}`}
                placeholderLabel="Loading map..."
              />
            </div>
            <p className="mt-2 text-xs text-[#777]">Map shows the town, not the home — we never publish a client&apos;s address.</p>
          </aside>
        </div>
      </section>

      {/* ═══ GALLERY ═══ */}
      <section id="gallery" className="scroll-mt-28 bg-white pb-16 lg:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-end justify-between gap-4">
            <h2 className="text-[2rem] font-extrabold tracking-[-0.02em] text-black lg:text-[2.6rem]">Photos</h2>
            <p className="text-sm text-[#555]">{c.photos.length} photos from the job site · tap to enlarge</p>
          </div>
          <CaseGallery photos={c.photos} />
        </div>
      </section>

      <ReviewsSection />

      {/* ═══ ESTIMATE — same result at home ═══ */}
      <section id="estimate" className="scroll-mt-28 bg-[#111] py-16 text-white lg:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_0.85fr] lg:gap-16 lg:px-8">
          <div>
            <h2 className="text-[2.2rem] font-extrabold leading-[1.05] tracking-[-0.02em] lg:text-[3.2rem]">
              Want a result like this in <span className="text-[#E00000]">{c.city}</span>?
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/80">
              Tell us about your home and we&apos;ll come out, measure and give you a written estimate. Free, no pressure.
              We work across {STATE_NAME[c.state]} and the rest of New England.
            </p>
            <div className="mt-8 space-y-3 text-lg">
              <a href={`tel:${BUSINESS.phoneE164}`} className="block font-bold hover:text-[#E00000]">{BUSINESS.phone}</a>
              <a href={`mailto:${BUSINESS.email}`} className="block font-bold text-[#FF4A4A] hover:underline">{BUSINESS.email}</a>
              <p className="text-sm text-white/60">Mon–Fri 7–6 · Sat 8–2 · HIC #{BUSINESS.hicLicense}</p>
            </div>
          </div>
          <FormEmbed id="contact-form" className="form-iframe-hero" />
        </div>
      </section>

      {/* ═══ MORE PROJECTS ═══ */}
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-end justify-between gap-4">
            <h2 className="text-[2rem] font-extrabold tracking-[-0.02em] text-black lg:text-[2.6rem]">More projects</h2>
            <Link href="/projects" className="whitespace-nowrap font-bold text-[#E00000] hover:underline">All projects →</Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <Link key={r.slug} href={`/projects/${r.slug}`} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                  <Image src={r.photos[0].src} alt={r.photos[0].alt} fill sizes="(max-width: 1024px) 50vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                </div>
                <h3 className="mt-3 text-lg font-extrabold text-black group-hover:text-[#E00000]">{r.title}</h3>
                <p className="text-sm text-[#555]">{r.city}, {r.state} · {r.photos.length} photos</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
