/* ═══════════════════════════════════════════════════════
   WOLF'S SIDING — SINGLE SOURCE OF TRUTH
   Every business fact lives here. Never hardcode these
   values in a template — import from BUSINESS instead.
   ═══════════════════════════════════════════════════════ */

export const BUSINESS = {
  legalName: "Wolf's Siding Inc.",
  shortName: "Wolf's Siding",
  owner: "Ezequias Lobo",
  foundedYear: 2018, // the company (confirmed by the owner, Nov 2026)
  inTradeSince: 2007, // the owner's own experience in the trade — NOT the company's age
  citiesServed: 110, // ONE number, used everywhere
  hicLicense: "218835",
  phone: "(774) 484-1895",
  phoneE164: "+17744841895",
  email: "info@wolfs-siding.com",
  url: "https://wolfs-siding.com",
  logo: "https://wolfs-siding.com/logo.png",
  address: {
    street: "449 Boston Post Rd E",
    city: "Marlborough",
    state: "MA",
    zip: "01752",
  },
  // Same as the Google Business Profile (confirmed 2026-11-10): Mon–Sat 8am–7pm, Sun closed.
  hours: {
    weekday: { opens: "08:00", closes: "19:00" },
    saturday: { opens: "08:00", closes: "19:00" },
  },
  // TODO: wire to the Google Business Profile API so this updates automatically.
  // Until then this is the ONE place the review count/rating is edited — the GHL
  // reputation widget keeps showing live reviews independently of this constant.
  // Read from the Google Business Profile on 2026-11-10. Update rating, count
  // AND asOf together — the site prints them as a dated snapshot.
  reviews: { rating: 5.0, count: 36, asOf: "Nov 2026" },
  social: {
    instagram: "https://www.instagram.com/wolfs_siding_inc/",
    facebook: "https://www.facebook.com/wolfsiding",
    googleMaps: "https://g.page/r/CfACa1fxiHsqEAE",
  },
} as const;

/* Canonical material lifespans — every material-lifespan claim on every service
   page reads from here. Resolves the vinyl (20–40) vs Hardie (30–50) mix-up. */
export const MATERIAL_LIFESPAN = {
  vinyl: "20–40 years",
  hardie: "30–50 years",
  cedar: "20–40 years",
  clapboard: "25–40 years",
} as const;

/* Repair work has a minimum job size. Set the amount the owner confirms
   (e.g. "$1,500") to show it in the repair-page strip; null shows the notice
   without a number. Never guess this value. */
export const REPAIR_MINIMUM: string | null = null;

/* Derived, ready-to-render strings */
export const REVIEW_COUNT = String(BUSINESS.reviews.count);
/** Business hours as text — keep in sync with BUSINESS.hours and the Google profile. */
export const HOURS_SHORT = "Mon–Sat 8am–7pm";
export const HOURS_LONG = "Monday–Saturday 8am–7pm · Sunday closed";
/** e.g. "5.0 from 36 Google reviews (Nov 2026)" — always dated, never a live claim. */
export const REVIEW_SUMMARY = `${BUSINESS.reviews.rating.toFixed(1)} from ${BUSINESS.reviews.count} Google reviews (${BUSINESS.reviews.asOf})`;
export const REVIEW_RATING = BUSINESS.reviews.rating.toFixed(1);
export const CITIES_SERVED = String(BUSINESS.citiesServed);
export const SINCE = `since ${BUSINESS.foundedYear}`;
export const YEARS_IN_BUSINESS = new Date().getFullYear() - BUSINESS.foundedYear;
/* The owner's experience, distinct from the company's founding year. */
export const IN_TRADE_SINCE = `in the trade since ${BUSINESS.inTradeSince}`;
export const YEARS_EXPERIENCE = new Date().getFullYear() - BUSINESS.inTradeSince;
/* Office location (US Census geocoder, 449 Boston Post Rd E, Marlborough MA 01752). */
export const HQ_COORDS: [number, number] = [42.3475, -71.5135];
