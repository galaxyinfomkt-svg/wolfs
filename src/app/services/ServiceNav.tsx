"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { SERVICES } from "../data/cities";

export default function ServiceNav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Top bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-[#E00000] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-10 text-sm">
            <span className="hidden sm:flex items-center gap-1.5 font-medium">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>
              Serving All of Massachusetts
            </span>
            <span className="flex sm:hidden items-center gap-1.5 text-xs font-medium">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>
              Massachusetts
            </span>
            <a href="tel:+17744841895" className="flex items-center gap-1.5 font-bold">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
              (774) 484-1895
            </a>
          </div>
        </div>
      </div>

      {/* Nav */}
      <header className="fixed top-10 left-0 right-0 z-50 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[70px]">
            <Link href="/" className="flex-shrink-0" title="Wolf's Siding Inc. - Home">
              <Image
                src="https://i0.wp.com/wolfs-siding.com/wp-content/uploads/2019/01/lOGO_wOLF_S__3_-removebg-preview-1.png?w=594&ssl=1"
                alt="Wolf's Siding Inc. Logo"
                width={160}
                height={50}
                className="h-12 w-auto"
                unoptimized
              />
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              <Link href="/" className="text-sm font-semibold text-[#333] hover:text-[#E00000] transition-colors">Home</Link>
              <div className="relative group">
                <button type="button" className="flex items-center gap-1 text-sm font-semibold text-[#333] hover:text-[#E00000] transition-colors">
                  Services
                  <svg className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
                </button>
                <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="bg-white rounded-xl shadow-xl border border-gray-100 py-2 w-72">
                    {SERVICES.map((s) => (
                      <Link
                        key={s.slug}
                        href={`/services/${s.slug}`}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-[#E00000]/5 transition-colors"
                      >
                        <div className="w-8 h-8 bg-[#E00000]/10 rounded-lg flex items-center justify-center">
                          <svg className="w-4 h-4 text-[#E00000]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>
                        </div>
                        <span className="text-sm font-semibold text-[#333]">{s.shortName}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <Link href="/#projects" className="text-sm font-semibold text-[#333] hover:text-[#E00000] transition-colors">Projects</Link>
              <Link href="/#contact" className="text-sm font-semibold text-[#333] hover:text-[#E00000] transition-colors">Contact</Link>
            </nav>

            <div className="flex items-center gap-3">
              <a href="tel:+17744841895" className="hidden sm:flex items-center gap-2 text-sm font-semibold text-[#333] hover:text-[#E00000] transition-colors">
                <svg className="w-4 h-4 text-[#E00000]" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
                (774) 484-1895
              </a>
              <Link href="/#contact" className="hidden sm:inline-flex bg-[#E00000] hover:bg-[#CC0000] text-white px-5 py-2.5 rounded-lg text-sm font-bold transition-all hover:scale-105">
                Free Estimate
              </Link>
              <button
                type="button"
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden w-10 h-10 flex items-center justify-center text-[#333]"
                aria-label="Toggle menu"
              >
                {mobileOpen ? (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 shadow-lg animate-slide-down">
            <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
              <Link href="/" onClick={() => setMobileOpen(false)} className="block px-4 py-3 rounded-lg text-sm font-semibold text-[#333] hover:bg-[#E00000]/5">Home</Link>
              <div className="px-4 py-2 text-xs font-bold text-[#E00000] uppercase tracking-wider">Our Services</div>
              {SERVICES.map((s) => (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  onClick={() => setMobileOpen(false)}
                  className="block px-6 py-2.5 rounded-lg text-sm text-[#333] hover:bg-[#E00000]/5"
                >
                  {s.shortName}
                </Link>
              ))}
              <Link href="/#projects" onClick={() => setMobileOpen(false)} className="block px-4 py-3 rounded-lg text-sm font-semibold text-[#333] hover:bg-[#E00000]/5">Projects</Link>
              <Link href="/#contact" onClick={() => setMobileOpen(false)} className="block px-4 py-3 rounded-lg text-sm font-semibold text-[#333] hover:bg-[#E00000]/5">Contact</Link>
              <a href="tel:+17744841895" className="flex items-center justify-center gap-2 mt-3 bg-[#E00000] text-white px-6 py-3 rounded-lg text-sm font-bold">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
                Call (774) 484-1895
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
