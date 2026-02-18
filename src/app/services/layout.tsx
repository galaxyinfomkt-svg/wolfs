import Link from "next/link";
import Image from "next/image";
import { SERVICES, CITIES } from "../data/cities";
import ServiceNav from "./ServiceNav";

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ServiceNav />

      {children}

      {/* Reviews Widget */}
      <section className="py-16 bg-[#F5F5F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-black text-center mb-8">
            What Our Customers Say
          </h2>
          <iframe
            className="lc_reviews_widget reviews-widget"
            src="https://reputationhub.site/reputation/widgets/review_widget/BCczy6muFwhd63dPhKCC"
            frameBorder="0"
            scrolling="no"
            title="Customer Reviews"
            loading="lazy"
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black">
        {/* Service areas footer band */}
        <div className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <h4 className="text-center mb-6 flex items-center justify-center gap-2">
              <svg className="w-5 h-5 text-[#E00000]" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>
              <span className="text-[#E00000] font-bold text-sm uppercase tracking-wider">
                Service Areas – {CITIES.length}+ Cities Across Massachusetts
              </span>
            </h4>
            <div className="flex flex-wrap justify-center gap-x-1 gap-y-1 max-w-6xl mx-auto">
              {CITIES.map((c, i) => (
                <span key={c.slug} className="text-white/40 text-xs">
                  <Link href={`/${c.slug}`} className="hover:text-[#E00000] transition-colors">{c.name}</Link>
                  {i < CITIES.length - 1 && <span className="mx-1">&middot;</span>}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Main footer */}
        <div className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid md:grid-cols-4 gap-10">
              <div>
                <Image
                  src="https://i0.wp.com/wolfs-siding.com/wp-content/uploads/2019/01/lOGO_wOLF_S__3_-removebg-preview-1.png?w=594&ssl=1"
                  alt="Wolf's Siding Inc. Logo"
                  width={150}
                  height={48}
                  className="h-10 w-auto mb-4"
                  unoptimized
                />
                <p className="text-white/40 text-sm leading-relaxed">
                  Professional siding contractor serving 110+ cities across Massachusetts. 18+ years of experience in vinyl, Hardie Plank, cedar, and clapboard siding.
                </p>
              </div>

              <div>
                <h4 className="text-[#E00000] font-bold text-sm uppercase tracking-wider mb-5">Services</h4>
                <ul className="space-y-2">
                  {SERVICES.map((s) => (
                    <li key={s.slug}>
                      <Link href={`/services/${s.slug}`} className="text-white/60 hover:text-[#E00000] text-sm transition-colors">
                        {s.shortName}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-[#E00000] font-bold text-sm uppercase tracking-wider mb-5">Contact Us</h4>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-[#E00000] rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
                    </div>
                    <div>
                      <a href="tel:+17744841895" className="text-white text-sm font-semibold hover:text-[#E00000] transition-colors">(774) 484-1895</a>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-[#E00000] rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>
                    </div>
                    <div className="text-white/60 text-sm">156 Washburn St<br />Northborough, MA 01532</div>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-[#E00000] font-bold text-sm uppercase tracking-wider mb-5">Follow Us</h4>
                <div className="flex gap-3 mb-6">
                  <a href="https://www.facebook.com/wolfsiding" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-[#E00000] rounded-full flex items-center justify-center text-white hover:bg-white hover:text-[#E00000] transition-all" aria-label="Facebook">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                  </a>
                  <a href="https://www.instagram.com/wolfs_siding_inc/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-[#E00000] rounded-full flex items-center justify-center text-white hover:bg-white hover:text-[#E00000] transition-all" aria-label="Instagram">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
                  </a>
                </div>
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                      ))}
                    </div>
                    <span className="text-white font-bold text-sm">5.0</span>
                  </div>
                  <span className="text-white/50 text-xs">22 reviews on Google</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
            <p className="text-white/30 text-xs text-center">
              &copy; {new Date().getFullYear()} Wolf&apos;s Siding Inc. All Rights Reserved. | Licensed Siding Contractor | Serving Massachusetts
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
