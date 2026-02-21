import { MetadataRoute } from "next";
import { CITIES, SERVICES } from "./data/cities";
import { BLOG_POSTS } from "./data/blog";

const BASE_URL = "https://wolfs-siding.com";
const SITE_UPDATED = "2026-02-21";

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
    "full-siding-replacement": 0.85,
    "siding-repair-services": 0.8,
    "exterior-trim-work": 0.8,
  };

  // Service pages: /services/{service-slug}
  const servicePages: MetadataRoute.Sitemap = SERVICES.map((service) => ({
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
  const cityServicePages: MetadataRoute.Sitemap = CITIES.flatMap((city) =>
    SERVICES.map((service) => ({
      url: `${BASE_URL}/${city.slug}/${service.slug}`,
      lastModified: SITE_UPDATED,
      changeFrequency: "monthly" as const,
      priority: Math.max((servicePriority[service.slug] ?? 0.7) - 0.1, 0.7),
    }))
  );

  // Projects page: /projects
  const projectsPage: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/projects`,
      lastModified: SITE_UPDATED,
      changeFrequency: "monthly",
      priority: 0.8,
    },
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
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // LLMs.txt for AI Engine Optimization
  const llmsTxt: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/llms.txt`,
      lastModified: SITE_UPDATED,
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];

  return [
    ...homepage,
    ...servicePages,
    ...projectsPage,
    ...cityPages,
    ...cityServicePages,
    ...blogIndex,
    ...blogPostPages,
    ...llmsTxt,
  ];
}
