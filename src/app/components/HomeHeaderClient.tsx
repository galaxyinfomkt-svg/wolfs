"use client";

import { createContext, useContext, useEffect, useState } from "react";

/* Client islands for the home page header. The home used to be one 1,350-line
   client component, so the whole page was hydrated just to run a menu toggle,
   a scroll shadow and an FAQ accordion (Lighthouse mobile: ~1.5 s blocking
   time). Now the page is a server component and only these pieces hydrate. */

const Ctx = createContext<{ open: boolean; setOpen: (v: boolean) => void }>({ open: false, setOpen: () => {} });

export function HeaderShell({ className, children }: { className: string; children: React.ReactNode }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <Ctx.Provider value={{ open, setOpen }}>
      <header className={`${className} ${scrolled ? "shadow-xl" : "shadow-md"}`}>{children}</header>
    </Ctx.Provider>
  );
}

export function MenuButton({ openIcon, closedIcon }: { openIcon: React.ReactNode; closedIcon: React.ReactNode }) {
  const { open, setOpen } = useContext(Ctx);
  return (
    <button type="button" onClick={() => setOpen(!open)} className="p-2 text-[#333333]" aria-label="Toggle menu" aria-expanded={open}>
      {open ? openIcon : closedIcon}
    </button>
  );
}

export function MobileDropdown({ children }: { children: React.ReactNode }) {
  const { open, setOpen } = useContext(Ctx);
  if (!open) return null;
  return (
    <div
      className="lg:hidden border-t border-gray-200 bg-white mobile-menu-enter max-h-[calc(100dvh-110px)] overflow-y-auto overscroll-contain pb-24"
      onClick={(e) => {
        if ((e.target as HTMLElement).closest("a")) setOpen(false);
      }}
    >
      {children}
    </div>
  );
}

/* Fade-in-on-scroll for elements with .scroll-animate. opacity-0 is added by
   JS only, so the server HTML (what crawlers read) is fully visible. */
export function ScrollAnimate() {
  useEffect(() => {
    const els = document.querySelectorAll(".scroll-animate");
    els.forEach((el) => el.classList.add("opacity-0"));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up");
            entry.target.classList.remove("opacity-0");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return null;
}
