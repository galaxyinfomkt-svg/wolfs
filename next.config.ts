import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
      },
      {
        protocol: "https",
        hostname: "assets.cdn.filesafe.space",
      },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000,
    qualities: [40, 60, 75],
  },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  async redirects() {
    // Legacy /service/* URLs from the previous site (indexed as recently as Jan
    // 2025) now 404. 301 them to the closest current equivalent so their link
    // equity is recovered instead of dropped. Old slugs look like
    // /service/vinyl-siding-contractor-serving-northborough-ma — we match on the
    // leading service keyword and send them to the matching statewide service
    // page (the city tail can't be turned into /{city}/{service} in static
    // config). Anything unmatched falls through to the home page — never a 404.
    // NOTE: there is no /services index route, so destinations must be real
    // /services/{service} pages. Confirmed prefix: "vinyl-siding" (from the
    // known indexed URL); the rest are inferred and can be tuned once the full
    // legacy slug list is exported from Search Console.
    const svc = (kw: string, service: string) => ({
      source: `/service/:slug(${kw}[^/]*)`,
      destination: `/services/${service}`,
      permanent: true,
    });
    return [
      svc("vinyl-siding", "vinyl-siding-installation"),
      svc("clapboard", "clapboard-siding-installation"),
      svc("hardie", "hardie-plank-siding-installation"),
      svc("cedar", "cedar-shingle-siding"),
      svc("exterior-trim", "exterior-trim-work"),
      svc("siding-repair", "siding-repair-services"),
      svc("full-siding", "full-siding-replacement"),
      svc("gutter", "gutter-installation"),
      svc("roofing", "roofing-installation"),
      // Catch-all safety net: any other legacy /service/* URL → home (no 404).
      { source: "/service/:slug*", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
