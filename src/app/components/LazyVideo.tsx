"use client";

import { useRef, useState, useEffect } from "react";

interface LazyVideoProps {
  src: string;
  poster?: string;
  className?: string;
}

export default function LazyVideo({ src, poster, className = "" }: LazyVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && playing && videoRef.current) {
          videoRef.current.pause();
          setPlaying(false);
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [playing]);

  function handlePlay() {
    if (!loaded) setLoaded(true);
    setTimeout(() => {
      const v = videoRef.current;
      if (!v) return;
      if (playing) {
        v.pause();
        setPlaying(false);
      } else {
        v.play().then(() => setPlaying(true)).catch(() => {});
      }
    }, 0);
  }

  return (
    <div
      ref={containerRef}
      className={`relative rounded-2xl overflow-hidden bg-black cursor-pointer group ${className}`}
      onClick={handlePlay}
    >
      {loaded ? (
        <video
          ref={videoRef}
          src={src}
          playsInline
          muted
          loop
          preload="metadata"
          className="w-full h-full object-cover"
          onEnded={() => setPlaying(false)}
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center min-h-[300px]">
          <div className="text-center">
            <svg className="w-10 h-10 text-white/40 mx-auto mb-2" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
            </svg>
            <p className="text-white/30 text-xs">Tap to play</p>
          </div>
        </div>
      )}

      {/* Play/Pause overlay */}
      <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${playing ? "opacity-0 group-hover:opacity-100" : "opacity-100"}`}>
        <div className="w-16 h-16 bg-[#E00000]/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-xl transition-transform duration-300 group-hover:scale-110">
          {playing ? (
            <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
            </svg>
          ) : (
            <svg className="w-7 h-7 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </div>
      </div>

      {/* Video badge */}
      <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1.5">
        <span className={`w-2 h-2 rounded-full ${playing ? "bg-[#E00000] animate-pulse" : "bg-white/50"}`} />
        {playing ? "Playing" : "Video"}
      </div>
    </div>
  );
}
