"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import ImageLightbox from "../components/ImageLightbox";
import LazyVideo from "../components/LazyVideo";
import type { Project, ProjectImage } from "../data/projects";

interface Props {
  projects: Project[];
  videos: string[];
  vanImage: { src: string; alt: string };
  crewProject: Project | undefined;
}

export default function ProjectsGallery({ projects, videos, vanImage, crewProject }: Props) {
  const [filter, setFilter] = useState("All");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [lightbox, setLightbox] = useState<{ images: ProjectImage[]; index: number } | null>(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    setAnimated(true);
  }, []);

  // Scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".scroll-animate-project").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [filter]);

  const serviceFilters = ["All", "Vinyl Siding", "Hardie Plank", "Clapboard Siding", "Full Siding Replacement"];

  const workProjects = projects.filter((p) => p.serviceType !== "Team");
  const filtered = filter === "All" ? workProjects : workProjects.filter((p) => p.serviceType === filter);

  function openLightbox(images: ProjectImage[], index: number) {
    setLightbox({ images, index });
  }

  return (
    <>
      {/* Filter Bar */}
      <div className={`flex flex-wrap justify-center gap-2 mb-12 transition-all duration-700 ${animated ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
        {serviceFilters.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => { setFilter(f); setExpandedId(null); }}
            className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
              filter === f
                ? "bg-[#E00000] text-white shadow-lg shadow-red-900/20"
                : "bg-[#F5F5F5] text-[#333333] hover:bg-[#E00000]/10 hover:text-[#E00000]"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Project count */}
      <p className="text-center text-[#333]/60 text-sm mb-8">
        Showing {filtered.length} project{filtered.length !== 1 ? "s" : ""}
      </p>

      {/* Projects Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {filtered.map((project) => {
          const isExpanded = expandedId === project.id;
          const heroImg = project.images[0];
          return (
            <div key={project.id} className={`scroll-animate-project opacity-0 ${isExpanded ? "sm:col-span-2 lg:col-span-3" : ""}`}>
              <div
                className={`bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 ${isExpanded ? "" : "hover:-translate-y-1 cursor-pointer"}`}
                onClick={() => !isExpanded && setExpandedId(project.id)}
              >
                {/* Hero image */}
                {!isExpanded && (
                  <div className="relative aspect-[4/3] overflow-hidden group">
                    <Image
                      src={heroImg.src}
                      alt={heroImg.alt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    {/* Service tag */}
                    <div className="absolute top-3 left-3 bg-[#E00000] text-white text-xs font-bold px-3 py-1 rounded-full">
                      {project.serviceType}
                    </div>
                    {/* Photo count */}
                    {project.images.length > 1 && (
                      <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z" />
                        </svg>
                        {project.images.length}
                      </div>
                    )}
                    {/* Bottom info */}
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-white font-bold text-lg">{project.title}</h3>
                      <p className="text-white/70 text-sm flex items-center gap-1">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 0 1 15 0Z" />
                        </svg>
                        {project.city}, {project.state}
                      </p>
                    </div>
                  </div>
                )}

                {/* Expanded content */}
                {isExpanded && (
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <span className="inline-block bg-[#E00000] text-white text-xs font-bold px-3 py-1 rounded-full mb-2">
                          {project.serviceType}
                        </span>
                        <h3 className="text-2xl font-black text-black">{project.title}</h3>
                        <p className="text-[#333]/60 text-sm flex items-center gap-1 mt-1">
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 0 1 15 0Z" />
                          </svg>
                          {project.city}, {project.state}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); setExpandedId(null); }}
                        className="w-10 h-10 bg-[#F5F5F5] hover:bg-[#E00000]/10 rounded-full flex items-center justify-center transition-colors"
                        aria-label="Close project"
                      >
                        <svg className="w-5 h-5 text-[#333]" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    <p className="text-[#333]/70 text-sm mb-6">{project.description}</p>

                    {/* Photo grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                      {project.images.map((img, i) => (
                        <div
                          key={img.src}
                          className="relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer group"
                          onClick={() => openLightbox(project.images, i)}
                        >
                          <Image
                            src={img.src}
                            alt={img.alt}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                            <svg className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607ZM10.5 7.5v6m3-3h-6" />
                            </svg>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Videos Section */}
      {videos.length > 0 && (
        <div className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-black text-black mb-3">
              Project <span className="text-[#E00000]">Videos</span>
            </h2>
            <div className="w-20 h-1 bg-[#E00000] mx-auto rounded-full mb-4" />
            <p className="text-[#333]/70 text-base max-w-xl mx-auto">
              Watch our team in action — real siding installation footage from Massachusetts job sites.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((url, i) => (
              <LazyVideo key={url} src={url} className="aspect-[9/16] sm:aspect-video" />
            ))}
          </div>
        </div>
      )}

      {/* Team Section */}
      {crewProject && (
        <div className="mb-16">
          <div className="bg-[#F5F5F5] rounded-3xl overflow-hidden">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="relative aspect-[4/3] md:aspect-auto">
                <Image
                  src={crewProject.images[0].src}
                  alt={crewProject.images[0].alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <h2 className="text-3xl font-black text-black mb-4">
                  Meet Our <span className="text-[#E00000]">Team</span>
                </h2>
                <p className="text-[#333]/70 text-base mb-6 leading-relaxed">
                  Wolf&apos;s Siding Inc. is owner-operated by Ezequias Lobo with 18+ years of experience.
                  Our professional crew brings dedication and craftsmanship to every project across Massachusetts.
                </p>
                <div className="flex items-center gap-4">
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                    <Image
                      src={vanImage.src}
                      alt={vanImage.alt}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                  <div>
                    <p className="font-bold text-black">Wolf&apos;s Siding Inc.</p>
                    <p className="text-sm text-[#333]/60">Licensed &amp; Insured</p>
                    <div className="flex items-center gap-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-3.5 h-3.5 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                        </svg>
                      ))}
                      <span className="text-xs text-[#333]/50 ml-1">5.0 (22+ reviews)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="text-center bg-gradient-to-r from-[#E00000] to-[#CC0000] rounded-3xl py-12 px-6">
        <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
          Ready to Transform Your Home?
        </h2>
        <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
          Get a free, no-obligation estimate for your siding project. 18+ years of experience across Massachusetts.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="tel:+17744841895"
            className="inline-flex items-center justify-center gap-2 bg-white text-[#E00000] hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-bold transition-all duration-300 hover:scale-105"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
            </svg>
            (774) 484-1895
          </a>
          <a
            href="/#contact"
            className="inline-flex items-center justify-center gap-2 border-2 border-white text-white hover:bg-white hover:text-[#E00000] px-8 py-4 rounded-lg text-lg font-bold transition-all duration-300"
          >
            Get Free Estimate
          </a>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <ImageLightbox
          images={lightbox.images}
          currentIndex={lightbox.index}
          onClose={() => setLightbox(null)}
          onNavigate={(i) => setLightbox({ ...lightbox, index: i })}
        />
      )}
    </>
  );
}
