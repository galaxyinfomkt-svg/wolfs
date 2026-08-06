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
    <section className="relative w-full h-[92vh] min-h-[560px] overflow-hidden bg-black">
      {/* Slides — full-bleed, edge to edge (image runs under the fixed nav) */}
      {projects.map((p, idx) => (
        <Link
          key={p.id}
          href={`/projects/${p.id}`}
          aria-label={`View project: ${p.title}`}
          className={`absolute inset-0 transition-opacity duration-[1400ms] ease-[cubic-bezier(0.4,0,0.2,1)] ${idx === i ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"}`}
        >
          <Image
            src={p.images[0].src}
            alt={p.images[0].alt}
            fill
            priority={idx === 0}
            className={`object-cover transition-transform ease-out ${idx === i ? "scale-105 duration-[8000ms]" : "scale-100 duration-0"}`}
            sizes="100vw"
          />
          {/* only a soft bottom vignette so the caption reads — image stays bright */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
        </Link>
      ))}

      {/* Project name — small, thin, elegant serif, bottom-left */}
      <div className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none">
        <div className="px-6 sm:px-10 lg:px-16 pb-10 lg:pb-14">
          <h2 className="font-serif font-normal text-white text-2xl sm:text-3xl lg:text-[2.5rem] leading-tight tracking-wide drop-shadow-[0_2px_18px_rgba(0,0,0,0.85)]">
            {projects[i].title}
          </h2>
        </div>
      </div>

      {/* Counter + arrows — small, bottom-right */}
      <div className="absolute bottom-10 lg:bottom-14 right-6 sm:right-10 lg:right-16 z-20 flex items-center gap-4">
        <span className="text-white/85 text-xs sm:text-sm tracking-[0.2em] tabular-nums drop-shadow">
          {String(i + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
        </span>
        <div className="flex gap-2">
          <button type="button" onClick={() => go(-1)} aria-label="Previous project"
            className="w-9 h-9 rounded-full border border-white/50 text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors duration-300">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.6} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
          </button>
          <button type="button" onClick={() => go(1)} aria-label="Next project"
            className="w-9 h-9 rounded-full border border-white/50 text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors duration-300">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.6} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
          </button>
        </div>
      </div>
    </section>
  );
}
