/* ═══════════════════════════════════════════════════════════════════════
   STRUCTURED DATA — one business entity, referenced everywhere by @id.

   Before: the layout emitted an Organization, the home page a second
   HomeAndConstructionBusiness, and every one of the 109 city pages a third,
   each with its own `url` (the city page) but the same Northborough address.
   Google had no @id to tie them together, so it saw up to three different
   "businesses" per page — and 109 look-alike local businesses across the
   site, which reads like a fake-location pattern.

   Now: the root layout emits ONE @graph (business + website). Every other
   page points at the business with { "@id": BUSINESS_ID } instead of
   re-declaring it.
   ═══════════════════════════════════════════════════════════════════════ */

import { BUSINESS, SINCE } from "./business";

export const BUSINESS_ID = `${BUSINESS.url}/#business`;
export const WEBSITE_ID = `${BUSINESS.url}/#website`;
export const businessRef = { "@id": BUSINESS_ID } as const;

/** Everything Wolf's Siding offers, as confirmed by the owner (Nov 2026). */
export const SERVICE_CATALOG: { group: string; items: { name: string; path?: string }[] }[] = [
  {
    group: "Siding",
    items: [
      { name: "Vinyl Siding", path: "/services/vinyl-siding-installation" },
      { name: "Everlast Composite Siding", path: "/services/everlast-siding" },
      { name: "Wood Clapboard Siding", path: "/services/clapboard-siding-installation" },
      { name: "James Hardie Plank Siding", path: "/services/hardie-plank-siding-installation" },
      { name: "James Hardie Panel Siding", path: "/services/james-hardie-panel-siding" },
      { name: "LP SmartSide Siding", path: "/services/lp-smartside-siding" },
      { name: "Board & Batten Siding", path: "/services/board-and-batten-siding" },
      { name: "Cedar Shingles", path: "/services/cedar-shingle-siding" },
      { name: "Cedar Impressions", path: "/services/cedar-impressions-siding" },
      { name: "CeraClad Fiber Cement Siding", path: "/services/ceraclad-fiber-cement-siding" },
      { name: "Siding Replacement", path: "/services/full-siding-replacement" },
    ],
  },
  {
    group: "Trim",
    items: [
      { name: "Exterior Trim", path: "/services/exterior-trim-work" },
      { name: "PVC Trim Installation", path: "/services/pvc-trim-installation" },
      { name: "Soffit & Fascia Installation", path: "/services/soffit-and-fascia" },
      { name: "Window & Door Exterior Trim", path: "/services/window-and-door-trim" },
    ],
  },
  {
    group: "Windows",
    items: [{ name: "Window Replacement", path: "/services/window-replacement" }],
  },
  {
    group: "Gutters",
    items: [
      { name: "Seamless Gutters & Downspouts", path: "/services/gutter-installation" },
      { name: "Gutter Guards", path: "/services/gutter-guards" },
    ],
  },
  {
    group: "Roofing & more",
    items: [
      { name: "Roofing", path: "/services/roofing-installation" },
      { name: "Custom Exterior Work", path: "/services/custom-exterior-work" },
    ],
  },
];

export function businessNode() {
  return {
    "@type": ["HomeAndConstructionBusiness", "GeneralContractor", "RoofingContractor"],
    "@id": BUSINESS_ID,
    name: BUSINESS.legalName,
    alternateName: ["Wolf's Siding", "Wolfs Siding", "Wolf Siding Inc"],
    description: `Siding, trim, windows, gutters and roofing contractor in Massachusetts, owner-run ${SINCE}. Licensed MA Home Improvement Contractor #${BUSINESS.hicLicense}.`,
    url: BUSINESS.url,
    telephone: BUSINESS.phoneE164,
    email: BUSINESS.email,
    logo: BUSINESS.logo,
    image: [
      `${BUSINESS.url}/projects/craftsman-home-grafton-ma/grafton-ma-craftsman-light-gray-lap-siding-01.jpg`,
      BUSINESS.logo,
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS.address.street,
      addressLocality: BUSINESS.address.city,
      addressRegion: BUSINESS.address.state,
      postalCode: BUSINESS.address.zip,
      addressCountry: "US",
    },
    geo: { "@type": "GeoCoordinates", latitude: 42.3195, longitude: -71.6412 },
    hasMap: BUSINESS.social.googleMaps,
    areaServed: { "@type": "State", name: "Massachusetts" },
    identifier: { "@type": "PropertyValue", name: "MA HIC License", value: BUSINESS.hicLicense },
    founder: { "@type": "Person", name: BUSINESS.owner, jobTitle: "Owner" },
    foundingDate: String(BUSINESS.foundedYear),
    priceRange: "$$",
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: BUSINESS.hours.weekday.opens, closes: BUSINESS.hours.weekday.closes },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: BUSINESS.hours.saturday.opens, closes: BUSINESS.hours.saturday.closes },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Exterior services",
      itemListElement: SERVICE_CATALOG.map((g) => ({
        "@type": "OfferCatalog",
        name: g.group,
        itemListElement: g.items.map((s) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: s.name, ...(s.path ? { url: `${BUSINESS.url}${s.path}` } : {}) },
        })),
      })),
    },
    // No self-declared aggregateRating: Google does not show stars for a
    // business's own rating and it can trigger a Search Console warning.
    sameAs: [
      BUSINESS.social.instagram,
      BUSINESS.social.facebook,
      BUSINESS.social.googleMaps,
      "https://www.google.com/maps/place/Wolf's+Siding+Inc./@42.3195,-71.6412,15z",
    ],
  };
}

export function siteGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      businessNode(),
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: BUSINESS.url,
        name: BUSINESS.legalName,
        publisher: businessRef,
        inLanguage: "en-US",
      },
    ],
  };
}
