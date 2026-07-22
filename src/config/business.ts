/* ═══════════════════════════════════════════════════════
   WOLF'S SIDING — SINGLE SOURCE OF TRUTH
   Every business fact lives here. Never hardcode these
   values in a template — import from BUSINESS instead.
   ═══════════════════════════════════════════════════════ */

export const BUSINESS = {
  legalName: "Wolf's Siding Inc.",
  shortName: "Wolf's Siding",
  owner: "Ezequias Lobo",
  foundedYear: 2007, // render as "since 2007" — never a fixed years-count phrase
  citiesServed: 110, // ONE number, used everywhere
  hicLicense: "218835",
  phone: "(774) 484-1895",
  phoneE164: "+17744841895",
  email: "info@wolfs-siding.com",
  url: "https://wolfs-siding.com",
  logo: "https://wolfs-siding.com/logo.png",
  address: {
    street: "156 Washburn St",
    city: "Northborough",
    state: "MA",
    zip: "01532",
  },
  hours: {
    weekday: { opens: "07:00", closes: "18:00" },
    saturday: { opens: "08:00", closes: "14:00" },
  },
  // TODO: wire to the Google Business Profile API so this updates automatically.
  // Until then this is the ONE place the review count/rating is edited — the GHL
  // reputation widget keeps showing live reviews independently of this constant.
  reviews: { rating: 5.0, count: 22 },
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

/* Derived, ready-to-render strings */
export const REVIEW_COUNT = String(BUSINESS.reviews.count);
export const REVIEW_RATING = BUSINESS.reviews.rating.toFixed(1);
export const CITIES_SERVED = String(BUSINESS.citiesServed);
export const SINCE = `since ${BUSINESS.foundedYear}`;
export const YEARS_IN_BUSINESS = new Date().getFullYear() - BUSINESS.foundedYear;
