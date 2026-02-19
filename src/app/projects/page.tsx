import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PROJECTS, COMPANY_VAN_IMAGE } from "../data/projects";
import ServiceNav from "../services/ServiceNav";
import ProjectsGallery from "./ProjectsGallery";
import YouTubeSection from "../components/YouTubeSection";

export const metadata: Metadata = {
  title: "Our Projects | Wolf's Siding Inc. | Siding Installation Gallery Massachusetts",
  description:
    "Browse real siding installation projects by Wolf's Siding Inc. across Massachusetts. Vinyl siding, Hardie Plank, cedar shingles, clapboard & more. 18+ years of expert craftsmanship.",
  openGraph: {
    title: "Our Projects | Wolf's Siding Inc.",
    description:
      "Browse real siding installation projects across Massachusetts. Vinyl, Hardie Plank, cedar, clapboard & more.",
    url: "https://wolfs-siding.com/projects",
    siteName: "Wolf's Siding Inc.",
    type: "website",
    images: [
      {
        url: PROJECTS[0]?.images[0]?.src ?? "",
        width: 1200,
        height: 630,
        alt: "Wolf's Siding Inc. Project Gallery — Massachusetts Siding Installation",
      },
    ],
  },
  alternates: { canonical: "https://wolfs-siding.com/projects" },
};

export default function ProjectsPage() {
  const workProjects = PROJECTS.filter((p) => p.serviceType !== "Team");
  const totalPhotos = workProjects.reduce((sum, p) => sum + p.images.length, 0);
  const crewProject = PROJECTS.find((p) => p.id === "winter-crew");

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://wolfs-siding.com" },
      { "@type": "ListItem", position: 2, name: "Projects", item: "https://wolfs-siding.com/projects" },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <ServiceNav />

      {/* Hero Banner */}
      <section className="relative pt-[110px] pb-16 lg:pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={PROJECTS[0]?.images[0]?.src ?? ""}
            alt="Wolf's Siding Inc. project gallery background"
            fill
            className="object-cover object-[center_30%]"
            priority
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/80 to-black/60" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
          <nav className="text-sm text-white/50 mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-[#E00000] transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white font-medium">Projects</span>
          </nav>

          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="inline-flex items-center gap-2 bg-[#E00000] text-white text-xs font-bold px-4 py-2 rounded-full">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z" />
                </svg>
                {totalPhotos} Photos
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm text-white text-xs font-semibold px-4 py-2 rounded-full border border-white/20">
                <svg className="w-3.5 h-3.5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                5.0 (22 Reviews)
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight mb-6">
              Our <span className="text-[#E00000]">Projects</span>
            </h1>
            <p className="text-lg text-white/80 leading-relaxed max-w-2xl">
              Browse real siding installations by Wolf&apos;s Siding Inc. across Massachusetts.
              Every photo is from an actual project — no stock images, just 18+ years of expert craftsmanship.
            </p>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-4 mt-10 max-w-lg">
            <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center">
              <p className="text-3xl font-black text-[#E00000]">{workProjects.length}</p>
              <p className="text-xs text-white/60 font-medium mt-1">Projects</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center">
              <p className="text-3xl font-black text-[#E00000]">{totalPhotos}</p>
              <p className="text-xs text-white/60 font-medium mt-1">Photos</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center">
              <p className="text-3xl font-black text-[#E00000]">18+</p>
              <p className="text-xs text-white/60 font-medium mt-1">Years</p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ProjectsGallery
            projects={PROJECTS}
            vanImage={COMPANY_VAN_IMAGE}
            crewProject={crewProject}
          />
        </div>
      </section>

      {/* YouTube Videos */}
      <YouTubeSection />
    </>
  );
}
