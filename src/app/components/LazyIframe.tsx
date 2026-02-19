"use client";

import { useState, useEffect, useRef } from "react";

export default function LazyIframe(
  props: React.IframeHTMLAttributes<HTMLIFrameElement> & { src: string; eager?: boolean }
) {
  const { src, eager, ...rest } = props;
  const [loaded, setLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    const activate = () => {
      if (cancelled) return;
      cancelled = true;
      setLoaded(true);
    };

    if (eager) {
      // Load after first paint so it doesn't block FCP/LCP
      if ("requestIdleCallback" in window) {
        const id = (window as unknown as { requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => number }).requestIdleCallback(activate, { timeout: 300 });
        return () => { cancelled = true; (window as unknown as { cancelIdleCallback: (id: number) => void }).cancelIdleCallback(id); };
      }
      const t = setTimeout(activate, 100);
      return () => { cancelled = true; clearTimeout(t); };
    }

    // Non-eager: IntersectionObserver + scroll/click + 6s fallback
    const el = containerRef.current;
    const observer = el
      ? new IntersectionObserver(
          ([entry]) => { if (entry.isIntersecting) activate(); },
          { rootMargin: "200px" }
        )
      : null;
    if (el && observer) observer.observe(el);

    const events: string[] = ["scroll", "click", "touchstart", "keydown"];
    events.forEach((e) =>
      window.addEventListener(e, activate, { once: true, passive: true })
    );

    const timer = setTimeout(activate, 6000);

    return () => {
      cancelled = true;
      if (observer) observer.disconnect();
      events.forEach((e) => window.removeEventListener(e, activate));
      clearTimeout(timer);
    };
  }, [eager]);

  return (
    <div ref={containerRef} className="relative">
      {!loaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#F5F5F5] rounded-xl animate-pulse z-10">
          <svg className="w-8 h-8 text-[#E00000] mb-3" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>
          <span className="text-sm text-[#333]/60 font-medium">Loading form...</span>
          <a href="tel:+17744841895" className="mt-3 text-[#E00000] text-sm font-bold hover:underline">(774) 484-1895</a>
        </div>
      )}
      <iframe {...rest} src={loaded ? src : undefined} loading="lazy" />
    </div>
  );
}
