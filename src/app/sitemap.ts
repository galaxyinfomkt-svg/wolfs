import { MetadataRoute } from "next";
import { CITIES, SERVICES } from "./data/cities";
import { BLOG_POSTS } from "./data/blog";
import { getPortfolioProjects } from "./data/projects";
import { PORTFOLIO } from "./data/portfolio";
import { isCityServiceIndexable } from "../config/indexing";
import { EXTRA_SERVICES } from "./data/extraServices";

const BASE_URL = "https://wolfs-siding.com";
// Date of the last real content change. Do not bump it without a change —
// a lastmod Google learns to distrust is worse than none.
const SITE_UPDATED = "2026-11-04";

export default function sitemap(): MetadataRoute.Sitemap {
  // Homepage
  const homepage: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: SITE_UPDATED,
      changeFrequency: "weekly",
      priority: 1.0,
    },
  ];

  // Service priority map (RS strategy: primary services get higher weight)
  const servicePriority: Record<string, number> = {
    "vinyl-siding-installation": 0.95,
    "hardie-plank-siding-installation": 0.9,
    "cedar-shingle-siding": 0.85,
    "clapboard-siding-installation": 0.85,
    "full-siding-replacement": 0.9,
    "siding-repair-services": 0.6,
    "exterior-trim-work": 0.8,
    "gutter-installation": 0.85,
    "roofing-installation": 0.85,
  };

  // Service pages: /services/{service-slug} (city-level services + statewide-only ones)
  const servicePages: MetadataRoute.Sitemap = [...SERVICES, ...EXTRA_SERVICES].map((service) => ({
    url: `${BASE_URL}/services/${service.slug}`,
    lastModified: SITE_UPDATED,
    changeFrequency: "monthly" as const,
    priority: servicePriority[service.slug] ?? 0.8,
  }));

  // City pages: /{city-slug}
  const cityPages: MetadataRoute.Sitemap = CITIES.map((city) => ({
    url: `${BASE_URL}/${city.slug}`,
    lastModified: SITE_UPDATED,
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  // City + Service pages: /{city-slug}/{service-slug} — primary services get higher priority
  // Only the combinations released for indexing (config/indexing.ts). The rest
  // are live but noindex, and a sitemap must not list noindex URLs.
  const cityServicePages: MetadataRoute.Sitemap = CITIES.flatMap((city) =>
    SERVICES.filter((service) => isCityServiceIndexable(city.slug, service.slug)).map((service) => ({
      url: `${BASE_URL}/${city.slug}/${service.slug}`,
      lastModified: SITE_UPDATED,
      changeFrequency: "monthly" as const,
      priority: Math.max((servicePriority[service.slug] ?? 0.7) - 0.1, 0.7),
    }))
  );

  // Company pages
  const companyPages: MetadataRoute.Sitemap = ["about", "contact", "reviews", "service-areas", "services", "services/vinyl-siding-upgrades"].map((p) => ({
    url: `${BASE_URL}/${p}`,
    lastModified: SITE_UPDATED,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Projects page: /projects
  const projectsPage: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/projects`,
      lastModified: SITE_UPDATED,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  // Individual project pages: /projects/{slug}
  const caseSlugs = new Set(PORTFOLIO.map((c) => c.slug));
  const projectDetailPages: MetadataRoute.Sitemap = [
    // One page per real job, with every job-site photo listed for Google Images.
    ...PORTFOLIO.map((c) => ({
      url: `${BASE_URL}/projects/${c.slug}`,
      lastModified: SITE_UPDATED,
      changeFrequency: "monthly" as const,
      priority: 0.7,
      images: c.photos.map((ph) => `${BASE_URL}${ph.src}`),
    })),
    ...getPortfolioProjects()
      .filter((p) => !caseSlugs.has(p.id))
      .map((p) => ({
        url: `${BASE_URL}/projects/${p.id}`,
        lastModified: SITE_UPDATED,
        changeFrequency: "monthly" as const,
        priority: 0.5,
      })),
  ];

  // Blog index: /blog
  const blogIndex: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/blog`,
      lastModified: SITE_UPDATED,
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];

  // Blog posts: /blog/{post-slug}
  const blogPostPages: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.updated ?? post.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    ...homepage,
    ...companyPages,
    ...servicePages,
    ...projectsPage,
    ...projectDetailPages,
    ...cityPages,
    ...cityServicePages,
    ...blogIndex,
    ...blogPostPages,
  ];
}
