import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PROJECTS } from "../data/projects";
import { PORTFOLIO, RECENT_WORK } from "../data/portfolio";
import CaseGrid from "./CaseGrid";
import ReviewsSection from "../components/ReviewsSection";
import { BUSINESS } from "../../config/business";

const TITLE = "Siding Projects in MA & NH | Real Job-Site Photos | Wolf's Siding Inc.";
const DESC =
  "Real siding projects by Wolf's Siding Inc. in Grafton, Stoughton, Pelham, New Durham, Stoddard and more — every photo from our own job sites. Free estimates: (774) 484-1895.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESC,
  alternates: { canonical: "https://wolfs-siding.com/projects" },
  openGraph: {
    title: TITLE,
    description: DESC,
    url: "https://wolfs-siding.com/projects",
    siteName: "Wolf's Siding Inc.",
    type: "website",
    images: [{ url: `https://wolfs-siding.com${PORTFOLIO[0].photos[0].src}`, width: 1800, height: 1350, alt: PORTFOLIO[0].photos[0].alt }],
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESC, images: [`https://wolfs-siding.com${PORTFOLIO[0].photos[0].src}`] },
};

export default function ProjectsPage() {
  const featured = PORTFOLIO[0];
  const others = PORTFOLIO.slice(1);
  const earlier = PROJECTS.filter((p) => p.serviceType !== "Team");
  const projectCount = PORTFOLIO.length + RECENT_WORK.length + earlier.length;
  const photoCount =
    PORTFOLIO.reduce((n, c) => n + c.photos.length, 0) + RECENT_WORK.length + earlier.reduce((n, p) => n + p.images.length, 0);

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://wolfs-siding.com" },
      { "@type": "ListItem", position: 2, name: "Projects", item: "https://wolfs-siding.com/projects" },
    ],
  };
  const listLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Wolf's Siding Inc. — Projects",
    url: "https://wolfs-siding.com/projects",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: PORTFOLIO.map((c, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `https://wolfs-siding.com/projects/${c.slug}`,
        name: `${c.title} — ${c.city}, ${c.state}`,
      })),
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(listLd) }} />

      {/* ═══ INTRO ═══ */}
      <section className="bg-white pb-10 pt-[140px] lg:pb-14 lg:pt-[170px]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="mb-6 text-sm text-[#555]" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-[#E00000]">Home</Link>
            <span className="mx-2">/</span>
            <span className="font-semibold text-black">Projects</span>
          </nav>
          <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-end">
            <div>
              <h1 className="text-[2.6rem] font-extrabold leading-[1.02] tracking-[-0.03em] text-black sm:text-6xl lg:text-[4.6rem]">
                Homes we <span className="text-[#E00000]">sided</span>
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[#444] lg:text-xl">
                Real projects by our own crew across Massachusetts, New Hampshire and Rhode Island. Every photo is from the job site — no stock images.
              </p>
            </div>
            <dl className="grid grid-cols-3 gap-4 border-t border-black/10 pt-6 lg:border-0 lg:pt-0">
              <div><dt className="text-xs font-semibold uppercase tracking-[0.1em] text-[#666]">Projects</dt><dd className="mt-1 text-3xl font-extrabold text-black">{projectCount}</dd></div>
              <div><dt className="text-xs font-semibold uppercase tracking-[0.1em] text-[#666]">Photos</dt><dd className="mt-1 text-3xl font-extrabold text-black">{photoCount}</dd></div>
              <div><dt className="text-xs font-semibold uppercase tracking-[0.1em] text-[#666]">Since</dt><dd className="mt-1 text-3xl font-extrabold text-black">{BUSINESS.foundedYear}</dd></div>
            </dl>
          </div>
        </div>
      </section>

      {/* ═══ FEATURED ═══ */}
      <section className="bg-white pb-16 lg:pb-24" aria-label="Featured project">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link href={`/projects/${featured.slug}`} className="group grid overflow-hidden rounded-2xl bg-[#111] text-white lg:grid-cols-[1.6fr_1fr]">
            <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[560px]">
              <Image src={featured.photos[0].src} alt={featured.photos[0].alt} fill priority sizes="(max-width: 1024px) 100vw, 62vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.02]" />
            </div>
            <div className="flex flex-col justify-between gap-8 p-7 sm:p-10">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#FF4A4A]">Featured · {featured.city}, {featured.state}</p>
                <h2 className="mt-3 text-[2rem] font-extrabold leading-[1.08] tracking-[-0.02em] lg:text-[2.5rem]">{featured.title}</h2>
                <p className="mt-4 text-lg leading-relaxed text-white/80">{featured.thesis}</p>
              </div>
              <dl className="grid grid-cols-2 gap-x-4 gap-y-4 border-t border-white/15 pt-6">
                {featured.facts.slice(1).map((f) => (
                  <div key={f.label}>
                    <dt className="text-xs uppercase tracking-[0.1em] text-white/50">{f.label}</dt>
                    <dd className="mt-1 font-bold">{f.value}</dd>
                  </div>
                ))}
                <div>
                  <dt className="text-xs uppercase tracking-[0.1em] text-white/50">Photos</dt>
                  <dd className="mt-1 font-bold">{featured.photos.length}</dd>
                </div>
              </dl>
              <span className="inline-flex w-fit items-center gap-2 rounded-lg bg-[#E00000] px-6 py-3.5 font-bold group-hover:bg-[#CC0000]">
                See the project →
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* ═══ PROJECT STORIES ═══ */}
      <section className="bg-white pb-16 lg:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-6 text-[2rem] font-extrabold tracking-[-0.02em] text-black lg:text-[2.6rem]">Project stories</h2>
          <CaseGrid cases={others} />
        </div>
      </section>

      {/* ═══ CTA BAND ═══ */}
      <section className="bg-[#E00000] text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-12 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8 lg:py-14">
          <div>
            <h2 className="text-[1.9rem] font-extrabold leading-tight tracking-[-0.02em] lg:text-[2.4rem]">See a home like yours?</h2>
            <p className="mt-2 text-lg text-white/90">Get a free estimate from the crew that did these.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a href={`tel:${BUSINESS.phoneE164}`} className="inline-flex items-center justify-center rounded-lg bg-black px-7 py-4 text-lg font-bold hover:bg-[#1a1a1a]">{BUSINESS.phone}</a>
            <a href={`mailto:${BUSINESS.email}`} className="inline-flex items-center justify-center rounded-lg border-2 border-white px-7 py-4 text-lg font-bold hover:bg-white hover:text-[#E00000]">{BUSINESS.email}</a>
          </div>
        </div>
      </section>

      {/* ═══ RECENT WORK (one or two photos each — no page of their own) ═══ */}
      <section className="bg-[#F5F5F5] py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-[2rem] font-extrabold tracking-[-0.02em] text-black lg:text-[2.6rem]">More recent work</h2>
          <p className="mt-3 max-w-2xl text-lg text-[#444]">Single-family homes, multi-family buildings and jobs still in progress.</p>
          <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-4">
            {RECENT_WORK.map((w) => (
              <figure key={w.src} className="m-0">
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-[#e5e5e5]">
                  <Image src={w.src} alt={w.place ? `${w.caption}, ${w.place}` : w.caption} fill sizes="(max-width: 1024px) 50vw, 25vw" className="object-cover" />
                </div>
                <figcaption className="mt-2.5 text-[0.95rem] font-bold leading-snug text-black">
                  {w.caption}
                  {w.place ? <span className="block text-sm font-medium text-[#666]">{w.place}</span> : null}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ EARLIER PROJECTS (pages that already exist) ═══ */}
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-[2rem] font-extrabold tracking-[-0.02em] text-black lg:text-[2.6rem]">Earlier projects</h2>
          <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-4">
            {earlier.map((p) => (
              <Link key={p.id} href={`/projects/${p.id}`} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-[#eee]">
                  <Image src={p.images[0].src} alt={p.images[0].alt} fill sizes="(max-width: 1024px) 50vw, 25vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                </div>
                <h3 className="mt-2.5 text-[0.95rem] font-bold leading-snug text-black group-hover:text-[#E00000]">{p.title}</h3>
                <p className="text-sm text-[#666]">{p.serviceType} · {p.images.length} {p.images.length === 1 ? "photo" : "photos"}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ReviewsSection />
    </>
  );
}
