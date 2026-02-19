"use client";

import { useState, useEffect, useRef } from "react";

export default function LazyIframe(
  props: React.IframeHTMLAttributes<HTMLIFrameElement> & {
    src: string;
    clickOnly?: boolean;
  }
) {
  const { src, clickOnly, ...rest } = props;
  const [loaded, setLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // clickOnly: only load when user clicks the container (handled by onClick)
    if (clickOnly) return;

    let cancelled = false;
    const activate = () => {
      if (cancelled) return;
      cancelled = true;
      setLoaded(true);
    };

    // IntersectionObserver only — no timers, no global event listeners
    const el = containerRef.current;
    const observer = el
      ? new IntersectionObserver(
          ([entry]) => { if (entry.isIntersecting) activate(); },
          { rootMargin: "100px" }
        )
      : null;
    if (el && observer) observer.observe(el);

    return () => {
      cancelled = true;
      if (observer) observer.disconnect();
    };
  }, [clickOnly]);

  const handleClick = () => {
    if (!loaded) setLoaded(true);
  };

  return (
    <div ref={containerRef} className="relative" onClick={clickOnly ? handleClick : undefined}>
      {!loaded && (
        clickOnly ? (
          /* Form facade — looks like a real form, loads iframe on click */
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white rounded-xl z-10 cursor-pointer border border-gray-200 shadow-sm">
            <div className="w-full max-w-xs px-4 space-y-2.5">
              <p className="text-sm font-bold text-black text-center mb-3">Get Your Free Estimate</p>
              <div className="h-9 bg-[#F5F5F5] rounded-lg border border-gray-200 flex items-center px-3"><span className="text-xs text-gray-400">Full Name</span></div>
              <div className="h-9 bg-[#F5F5F5] rounded-lg border border-gray-200 flex items-center px-3"><span className="text-xs text-gray-400">Email Address</span></div>
              <div className="h-9 bg-[#F5F5F5] rounded-lg border border-gray-200 flex items-center px-3"><span className="text-xs text-gray-400">Phone Number</span></div>
              <div className="h-10 bg-[#E00000] rounded-lg flex items-center justify-center text-white font-bold text-sm">
                Click to Start
              </div>
            </div>
            <a href="tel:+17744841895" onClick={(e) => e.stopPropagation()} className="mt-3 text-[#E00000] text-xs font-bold hover:underline">(774) 484-1895</a>
          </div>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#F5F5F5] rounded-xl animate-pulse z-10">
            <svg className="w-8 h-8 text-[#E00000] mb-3" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>
            <span className="text-sm text-[#333]/60 font-medium">Loading form...</span>
            <a href="tel:+17744841895" className="mt-3 text-[#E00000] text-sm font-bold hover:underline">(774) 484-1895</a>
          </div>
        )
      )}
      <iframe {...rest} src={loaded ? src : undefined} loading="lazy" />
    </div>
  );
}
