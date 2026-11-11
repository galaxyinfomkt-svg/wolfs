/* Services that have /{city}/{service} pages. Kept apart from cities.ts so
   client components (the menus) do not ship the whole cities dataset to the
   browser. cities.ts checks at build time that this list matches SERVICES. */
export const CITY_SERVICE_SLUGS = [
  "vinyl-siding-installation",
  "clapboard-siding-installation",
  "hardie-plank-siding-installation",
  "cedar-shingle-siding",
  "exterior-trim-work",
  "siding-repair-services",
  "full-siding-replacement",
  "gutter-installation",
  "roofing-installation",
] as const;
