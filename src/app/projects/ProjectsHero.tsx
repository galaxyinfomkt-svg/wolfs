"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Project } from "../data/projects";

export default function ProjectsHero({ projects }: { projects: Project[] }) {
  const [i, setI] = useState(0);
  const n = projects.length;
  const go = useCallback((d: number) => setI((p) => (p + d + n) % n), [n]);

  useEffect(() => {
    if (n <= 1) return;
    const t = setInterval(() => setI((p) => (p + 1) % n), 6000);
    return () => clearInterval(t);
  }, [n]);

  if (n === 0) return null;

  return (
    <section className="relative w-full h-[62vh] min-h-[460px] lg:h-[78vh] overflow-hidden bg-black pt-[110px]">
      {projects.map((p, idx) => (
        <Link
          key={p.id}
          href={`/projects/${p.id}`}
          aria-label={`View project: ${p.title}`}
          className={`absolute inset-0 transition-opacity duration-[1200ms] ease-[cubic-bezier(0.4,0,0.2,1)] ${idx === i ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"}`}
        >
          <Image
            src={p.images[0].src}
            alt={p.images[0].alt}
            fill
            priority={idx === 0}
            className={`object-cover transition-transform duration-[7000ms] ease-out ${idx === i ? "scale-105" : "scale-100"}`}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40" />
        </Link>
      ))}

      {/* Caption */}
      <div className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 lg:pb-14">
          <span className="inline-block bg-[#E00000] text-white text-[11px] font-bold uppercase tracking-[0.18em] px-3 py-1.5 rounded mb-4">
            {projects[i].serviceType}
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.05] tracking-tight drop-shadow-[0_2px_24px_rgba(0,0,0,0.7)] max-w-3xl">
            {projects[i].title}
          </h2>
          <Link
            href={`/projects/${projects[i].id}`}
            className="pointer-events-auto inline-flex items-center gap-2 mt-6 text-white font-semibold text-sm border-b-2 border-[#E00000] pb-1 hover:gap-3 transition-all"
          >
            View project
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
          </Link>
        </div>
      </div>

      {/* Counter + arrows */}
      <div className="absolute top-[130px] right-4 sm:right-6 lg:right-10 z-20 flex items-center gap-4">
        <span className="text-white/80 text-sm font-medium tabular-nums tracking-widest">
          {String(i + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
        </span>
        <div className="flex gap-2">
          <button type="button" onClick={() => go(-1)} aria-label="Previous project"
            className="w-11 h-11 rounded-full border border-white/40 text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
          </button>
          <button type="button" onClick={() => go(1)} aria-label="Next project"
            className="w-11 h-11 rounded-full border border-white/40 text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
          </button>
        </div>
      </div>

      {/* Progress dots */}
      <div className="absolute bottom-4 right-4 sm:right-6 lg:right-10 z-20 hidden sm:flex gap-1.5">
        {projects.map((p, idx) => (
          <button key={p.id} type="button" onClick={() => setI(idx)} aria-label={`Go to slide ${idx + 1}`}
            className={`h-1 rounded-full transition-all duration-300 ${idx === i ? "w-8 bg-[#E00000]" : "w-4 bg-white/40 hover:bg-white/70"}`} />
        ))}
      </div>
    </section>
  );
}
