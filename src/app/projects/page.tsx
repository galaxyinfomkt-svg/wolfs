import { Metadata } from "next";
import Link from "next/link";
import { PROJECTS, COMPANY_VAN_IMAGE } from "../data/projects";
import ProjectsGallery from "./ProjectsGallery";
import ProjectsHero from "./ProjectsHero";
import YouTubeSection from "../components/YouTubeSection";

export const metadata: Metadata = {
  title: "Siding Projects MA | Installation Gallery & Photos | Wolf's Siding Inc.",
  description:
    "Real siding installation projects by Wolf's Siding Inc. across Massachusetts — vinyl, Hardie Plank, cedar & clapboard. Serving MA since 2007. (774) 484-1895",
  keywords: "siding projects Massachusetts, siding gallery, siding installation photos, siding before after, vinyl siding projects MA, Hardie Plank projects",
  openGraph: {
    title: "Siding Projects MA | Installation Gallery & Photos | Wolf's Siding Inc.",
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
  twitter: {
    card: "summary_large_image",
    title: "Siding Projects MA | Installation Gallery & Photos | Wolf's Siding Inc.",
    description: "Browse real siding installation projects across Massachusetts by Wolf's Siding Inc.",
    images: [PROJECTS[0]?.images[0]?.src ?? ""],
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

  const galleryLd = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: "Wolf's Siding Inc. — Project Gallery",
    description: `${totalPhotos} photos of real siding installation projects across Massachusetts by Wolf's Siding Inc.`,
    url: "https://wolfs-siding.com/projects",
    creator: { "@type": "Organization", name: "Wolf's Siding Inc." },
    about: { "@type": "Service", name: "Siding Installation", provider: { "@type": "Organization", name: "Wolf's Siding Inc." } },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(galleryLd) }} />

      {/* Full-width project carousel (Cleiton-style) */}
      <ProjectsHero projects={workProjects} />

      {/* Intro band */}
      <section className="py-12 lg:py-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-[#333]/50 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-[#E00000] transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-[#333] font-medium">Projects</span>
          </nav>
          <div className="grid lg:grid-cols-[1fr_auto] gap-8 lg:items-end">
            <div>
              <h1 className="text-4xl sm:text-5xl font-black text-black leading-tight mb-4">
                Our <span className="text-[#E00000]">Projects</span>
              </h1>
              <p className="text-lg text-[#333]/70 leading-relaxed max-w-2xl">
                Real siding installations by Wolf&apos;s Siding Inc. across Massachusetts — every photo from an
                actual jobsite, no stock images. Expert craftsmanship since 2007.
              </p>
            </div>
            <div className="flex gap-10">
              <div><p className="text-4xl font-black text-[#E00000]">{workProjects.length}</p><p className="text-xs text-[#333]/50 font-semibold mt-1 uppercase tracking-wider">Projects</p></div>
              <div><p className="text-4xl font-black text-[#E00000]">{totalPhotos}</p><p className="text-xs text-[#333]/50 font-semibold mt-1 uppercase tracking-wider">Photos</p></div>
              <div><p className="text-4xl font-black text-[#E00000]">18+</p><p className="text-xs text-[#333]/50 font-semibold mt-1 uppercase tracking-wider">Years</p></div>
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
