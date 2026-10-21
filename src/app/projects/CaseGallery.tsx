"use client";

import { useState } from "react";
import Image from "next/image";
import ImageLightbox from "../components/ImageLightbox";
import type { CasePhoto } from "../data/portfolio";

/* Gallery in a 1-2-1-3 rhythm (one wide photo, a pair, one wide, a trio),
   so a long set never turns into a wall of identical tiles. Every photo
   opens the full-screen lightbox. */
const RHYTHM = [1, 2, 1, 3];

function rows(photos: CasePhoto[]): CasePhoto[][] {
  const out: CasePhoto[][] = [];
  let i = 0;
  let r = 0;
  while (i < photos.length) {
    let size = RHYTHM[r % RHYTHM.length];
    const left = photos.length - i;
    // never leave a lonely photo for the last row: fold it into this one
    if (left - size === 1) size = Math.min(left, size + 1 > 3 ? 2 : size + 1);
    out.push(photos.slice(i, i + size));
    i += size;
    r++;
  }
  return out;
}

export default function CaseGallery({ photos }: { photos: CasePhoto[] }) {
  const [index, setIndex] = useState<number | null>(null);
  let n = -1;

  return (
    <>
      <div className="space-y-3 sm:space-y-4">
        {rows(photos).map((row, ri) => (
          <div
            key={ri}
            className={`grid gap-3 sm:gap-4 ${row.length === 2 ? "sm:grid-cols-2" : row.length === 3 ? "sm:grid-cols-3" : ""}`}
          >
            {row.map((ph) => {
              n++;
              const i = n;
              return (
                <button
                  key={ph.src}
                  type="button"
                  onClick={() => setIndex(i)}
                  className={`group relative block w-full overflow-hidden rounded-xl bg-[#eee] ${row.length === 1 ? "aspect-[4/3] sm:aspect-[16/9]" : "aspect-[4/3]"}`}
                  aria-label={`Open photo ${i + 1} of ${photos.length}: ${ph.alt}`}
                >
                  <Image
                    src={ph.src}
                    alt={ph.alt}
                    fill
                    sizes={row.length === 1 ? "(max-width: 1280px) 100vw, 1216px" : row.length === 2 ? "(max-width: 640px) 100vw, 50vw" : "(max-width: 640px) 100vw, 33vw"}
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <span className="absolute bottom-3 right-3 rounded-full bg-black/60 px-2.5 py-1 text-xs font-semibold text-white">
                    {i + 1}/{photos.length}
                  </span>
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {index !== null && (
        <ImageLightbox images={photos} currentIndex={index} onClose={() => setIndex(null)} onNavigate={(i) => setIndex(i)} />
      )}
    </>
  );
}
