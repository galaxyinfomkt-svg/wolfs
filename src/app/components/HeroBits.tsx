import { BUSINESS, REVIEW_RATING } from "../../config/business";

/* Pieces shared by the "Modelo A" heroes (home, city, city × service, service). */

/** Google G + five stars, phone-only: on desktop the black Google bar sits right
 *  under the hero, but on a phone that bar is three screens down. No review
 *  count — it changes every week and the GHL widget already shows it. */
export function HeroStars() {
  return (
    <p className="-mt-1 mb-6 flex items-center gap-2 text-[0.95rem] font-bold text-white lg:hidden">
      <svg className="h-[18px] w-[18px]" viewBox="0 0 48 48" aria-hidden="true">
        <path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 13 4 4 13 4 24s9 20 20 20 20-9 20-20c0-1.3-.1-2.6-.4-3.9z" />
        <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
        <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z" />
        <path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.6-.4-3.9z" />
      </svg>
      <span className="tracking-[2px] text-[#FBBC05]" aria-label="5 out of 5 stars">★★★★★</span>
      <span>{REVIEW_RATING} on Google</span>
      <span aria-hidden="true">·</span>
      <a href="#reviews" className="font-semibold underline underline-offset-4">Read reviews</a>
    </p>
  );
}

/** Call button + estimate button + three short trust facts. */
export function HeroCtas({ formHref = "#contact-form" }: { formHref?: string }) {
  return (
    <>
      <div className="flex flex-col gap-3 sm:flex-row">
        <a
          href={`tel:${BUSINESS.phoneE164}`}
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-[#E00000] px-7 py-4 text-lg font-bold text-white hover:bg-[#CC0000]"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
          </svg>
          {BUSINESS.phone}
        </a>
        <a
          href={formHref}
          className="inline-flex items-center justify-center whitespace-nowrap rounded-lg border-2 border-white px-7 py-4 text-lg font-bold text-white hover:bg-white hover:text-black"
        >
          Get Your Free Estimate
        </a>
      </div>
      <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[0.95rem] font-semibold text-white">
        {["Licensed & Insured", `Since ${BUSINESS.foundedYear}`, "Free Estimates"].map((t) => (
          <li key={t}>
            <span className="mr-1.5 font-extrabold text-[#E00000]" aria-hidden="true">✓</span>
            {t}
          </li>
        ))}
      </ul>
    </>
  );
}
