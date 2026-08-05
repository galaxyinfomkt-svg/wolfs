"use client";

import { useState } from "react";
import Image from "next/image";
import ImageLightbox from "../components/ImageLightbox";
import type { ProjectImage } from "../data/projects";

export default function ProjectGallery({ images }: { images: ProjectImage[] }) {
  const [index, setIndex] = useState<number | null>(null);

  return (
    <>
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 [column-fill:_balance]">
        {images.map((img, i) => (
          <button
            key={img.src}
            type="button"
            onClick={() => setIndex(i)}
            className="mb-4 block w-full relative overflow-hidden rounded-2xl group break-inside-avoid shadow-md hover:shadow-2xl transition-shadow duration-300"
          >
            <Image
              src={img.src}
              alt={img.alt}
              width={900}
              height={675}
              className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-300 flex items-center justify-center">
              <span className="w-12 h-12 rounded-full bg-white/90 text-[#E00000] flex items-center justify-center opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-300">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2.2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607ZM10.5 7.5v6m3-3h-6" />
                </svg>
              </span>
            </div>
          </button>
        ))}
      </div>

      {index !== null && (
        <ImageLightbox
          images={images}
          currentIndex={index}
          onClose={() => setIndex(null)}
          onNavigate={(i) => setIndex(i)}
        />
      )}
    </>
  );
}
