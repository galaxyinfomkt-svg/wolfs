"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { STATE_NAME, type PortfolioCase } from "../data/portfolio";

/* Project cards with state filter chips and a live count. */
export default function CaseGrid({ cases }: { cases: PortfolioCase[] }) {
  const states = Array.from(new Set(cases.map((c) => c.state)));
  const [filter, setFilter] = useState<string>("All");
  const shown = filter === "All" ? cases : cases.filter((c) => c.state === filter);

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center gap-2.5" role="group" aria-label="Filter projects by state">
        {["All", ...states].map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setFilter(s)}
            aria-pressed={filter === s}
            className={`rounded-full border px-4 py-2 text-sm font-bold transition-colors ${
              filter === s ? "border-black bg-black text-white" : "border-black/15 bg-white text-[#222] hover:border-black"
            }`}
          >
            {s === "All" ? "All projects" : STATE_NAME[s as keyof typeof STATE_NAME]}
          </button>
        ))}
        <span className="ml-auto text-sm text-[#555]" aria-live="polite">
          {shown.length} {shown.length === 1 ? "project" : "projects"}
        </span>
      </div>

      <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((c, i) => {
          // On a 3-column grid a count of 3k+1 leaves one card alone on the last
          // row (3k+2 leaves two). Widening the 1st (and 4th) card closes every row.
          const wide = (shown.length % 3 === 1 && (i === 0 || i === 3)) || (shown.length % 3 === 2 && i === 0);
          return (
          <Link key={c.slug} href={`/projects/${c.slug}`} className={`group block ${wide ? "lg:col-span-2" : ""}`}>
            <div className={`relative aspect-[4/3] overflow-hidden rounded-xl bg-[#eee] ${wide ? "lg:aspect-[11/4]" : ""}`}>
              <Image
                src={c.photos[0].src}
                alt={c.photos[0].alt}
                fill
                sizes={wide ? "(max-width: 1024px) 50vw, 66vw" : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"}
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-black">
                {c.photos.length} photos
              </span>
            </div>
            <p className="mt-4 text-xs font-bold uppercase tracking-[0.08em] text-[#E00000]">
              {c.city}, {c.state}
            </p>
            <h3 className="mt-1 text-xl font-extrabold leading-snug text-black group-hover:text-[#E00000]">{c.title}</h3>
            <p className="mt-1 text-[0.95rem] text-[#555]">{c.look}</p>
          </Link>
          );
        })}
      </div>
    </div>
  );
}
