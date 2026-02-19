import { MetadataRoute } from "next";
import { CITIES, SERVICES } from "./data/cities";
import { BLOG_POSTS } from "./data/blog";

const BASE_URL = "https://wolfs-siding.com";

export default function sitemap(): MetadataRoute.Sitemap {
  // Homepage
  const homepage: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
  ];

  // Service pages: /services/{service-slug}
  const servicePages: MetadataRoute.Sitemap = SERVICES.map((service) => ({
    url: `${BASE_URL}/services/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  // City pages: /{city-slug}
  const cityPages: MetadataRoute.Sitemap = CITIES.map((city) => ({
    url: `${BASE_URL}/${city.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // City + Service pages: /{city-slug}/{service-slug}
  const cityServicePages: MetadataRoute.Sitemap = CITIES.flatMap((city) =>
    SERVICES.map((service) => ({
      url: `${BASE_URL}/${city.slug}/${service.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }))
  );

  // Blog index: /blog
  const blogIndex: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
    },
  ];

  // Blog posts: /blog/{post-slug}
  const blogPostPages: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [
    ...homepage,
    ...servicePages,
    ...cityPages,
    ...cityServicePages,
    ...blogIndex,
    ...blogPostPages,
  ];
}
