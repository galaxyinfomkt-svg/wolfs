import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getProjectBySlug, generateProjectParams, getRelatedProjects } from "../../data/projects";
import ProjectGallery from "../ProjectGallery";
import LazyVideo from "../../components/LazyVideo";
import { cappedDescription } from "../../../config/meta";

type Params = { slug: string };

const abs = (src: string) => (src.startsWith("/") ? `https://wolfs-siding.com${src}` : src);

export function generateStaticParams() {
  return generateProjectParams();
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProjectBySlug(slug);
  if (!p) return {};
  const title = `${p.title} — ${p.serviceType} Project | Wolf's Siding Inc.`;
  const description = cappedDescription(p.description);
  const url = `https://wolfs-siding.com/projects/${p.id}`;
  const image = abs(p.images[0]?.src ?? "");
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title, description, url, siteName: "Wolf's Siding Inc.", type: "article",
      images: [{ url: image, width: 1200, height: 630, alt: p.images[0]?.alt ?? p.title }],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

const PHASE_STYLE: Record<string, string> = {
  Before: "bg-[#3a3f47]",
  During: "bg-[#E00000]",
  After: "bg-[#18a24a]",
};

export default async function ProjectDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const related = getRelatedProjects(project, 3);
  const hero = project.images[0];
  const url = `https://wolfs-siding.com/projects/${project.id}`;

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://wolfs-siding.com" },
      { "@type": "ListItem", position: 2, name: "Projects", item: "https://wolfs-siding.com/projects" },
      { "@type": "ListItem", position: 3, name: project.title, item: url },
    ],
  };
  const galleryLd = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: `${project.title} — Wolf's Siding Inc.`,
    description: project.description,
    url,
    image: project.images.map((i) => abs(i.src)),
    creator: { "@type": "Organization", name: "Wolf's Siding Inc." },
    about: { "@type": "Service", name: `${project.serviceType} in Massachusetts`, provider: { "@type": "Organization", name: "Wolf's Siding Inc." } },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(galleryLd) }} />

      {/* Hero */}
      <section className="relative pt-[110px] pb-14 lg:pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image src={hero.src} alt={hero.alt} fill priority className="object-cover object-[center_35%]" sizes="100vw" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/80 to-black/55" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
          <nav className="text-sm text-white/50 mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-[#E00000] transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/projects" className="hover:text-[#E00000] transition-colors">Projects</Link>
            <span className="mx-2">/</span>
            <span className="text-white font-medium">{project.title}</span>
          </nav>
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="inline-block bg-[#E00000] text-white text-xs font-bold px-4 py-2 rounded-full">{project.serviceType}</span>
              <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm text-white text-xs font-semibold px-4 py-2 rounded-full border border-white/20">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z" /></svg>
                {project.images.length} Photos
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight mb-5">
              {project.title}
            </h1>
            <p className="text-lg text-white/80 leading-relaxed max-w-2xl">
              {project.serviceType} in {project.city}, {project.state} by Wolf&apos;s Siding Inc.
            </p>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-lg text-[#333] leading-relaxed max-w-3xl mb-14">{project.description}</p>

          {/* Video */}
          {project.heroVideo && (
            <div className="mb-16 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center bg-[#111111] rounded-3xl p-8 lg:p-12">
              <div>
                <span className="inline-block text-[#E00000] text-sm font-bold tracking-[0.2em] uppercase mb-4">See It Happen</span>
                <h2 className="text-3xl sm:text-4xl font-black text-white mb-4 leading-tight">
                  Watch the <span className="text-[#E00000]">Transformation</span>
                </h2>
                <p className="text-white/70 text-base leading-relaxed">
                  From bare sheathing to a finished exterior — every board measured, cut, and installed by hand by our own crew. This is the real project, start to finish.
                </p>
              </div>
              <div className="mx-auto max-w-[320px] sm:max-w-[340px] w-full">
                <LazyVideo src={project.heroVideo} title="Watch the transformation" className="aspect-[9/16] ring-1 ring-white/10" />
              </div>
            </div>
          )}

          {/* Before / During / After */}
          {project.phases ? (
            <div className="space-y-14">
              {project.phases.map((phase) => (
                <div key={phase.label}>
                  <div className="flex items-center gap-3 mb-6">
                    <span className={`inline-block text-white text-sm font-black uppercase tracking-wider px-4 py-1.5 rounded-lg ${PHASE_STYLE[phase.label] ?? "bg-black"}`}>
                      {phase.label}
                    </span>
                    <div className="h-px flex-1 bg-gray-200" />
                  </div>
                  <ProjectGallery images={phase.images} />
                </div>
              ))}
            </div>
          ) : (
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-black mb-6">
                Project <span className="text-[#E00000]">Gallery</span>
              </h2>
              <ProjectGallery images={project.images} />
            </div>
          )}
        </div>
      </section>

      {/* Related projects */}
      {related.length > 0 && (
        <section className="py-14 lg:py-20 bg-[#F5F5F5]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-black text-black mb-8">
              More <span className="text-[#E00000]">Projects</span>
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((r) => (
                <Link key={r.id} href={`/projects/${r.id}`} className="group block bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image src={r.images[0].src} alt={r.images[0].alt} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 640px) 100vw, 33vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <span className="absolute top-3 left-3 bg-[#E00000] text-white text-xs font-bold px-3 py-1 rounded-full">{r.serviceType}</span>
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-white font-bold text-base">{r.title}</h3>
                      <p className="text-white/70 text-sm">{r.city}, {r.state}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link href="/projects" className="inline-flex items-center gap-2 bg-white border border-gray-200 hover:border-[#E00000] text-[#333] hover:text-[#E00000] px-8 py-3.5 rounded-lg text-sm font-bold transition-all duration-300">
                View All Projects
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-gradient-to-r from-[#E00000] to-[#CC0000] py-14 lg:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">Want results like this on your home?</h2>
          <p className="text-white/80 text-lg mb-8">Get a free, no-obligation estimate from Wolf&apos;s Siding — our own crew, since 2007, across Massachusetts.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+17744841895" className="inline-flex items-center justify-center gap-2 bg-white text-[#E00000] hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-bold transition-all duration-300 hover:scale-105">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
              (774) 484-1895
            </a>
            <a href="/#contact" className="inline-flex items-center justify-center gap-2 border-2 border-white text-white hover:bg-white hover:text-[#E00000] px-8 py-4 rounded-lg text-lg font-bold transition-all duration-300">
              Get Free Estimate
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
