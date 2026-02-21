import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { BLOG_POSTS } from "../data/blog";

export const metadata: Metadata = {
  title: "Siding Blog MA | Tips, Guides & Expert Advice | Wolf's Siding Inc.",
  description: "Siding tips, guides & expert advice for Massachusetts homeowners. Vinyl siding, Hardie Plank, cedar shingles, clapboard installation, repair & maintenance guides. Wolf's Siding Inc.",
  keywords: "siding blog, siding tips Massachusetts, vinyl siding guide, Hardie Plank guide, cedar shingles guide, siding repair tips, home exterior blog",
  openGraph: {
    title: "Siding Blog MA | Tips, Guides & Expert Advice | Wolf's Siding Inc.",
    description: "Expert siding tips, guides & advice for Massachusetts homeowners.",
    url: "https://wolfs-siding.com/blog",
    siteName: "Wolf's Siding Inc.",
    type: "website",
    images: [{ url: "https://storage.googleapis.com/msgsndr/BCczy6muFwhd63dPhKCC/media/69309a3e4d01f3e2eea4a8f1.png", width: 1200, height: 630, alt: "Wolf's Siding Inc. Blog" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Siding Blog MA | Tips, Guides & Expert Advice | Wolf's Siding Inc.",
    description: "Expert siding tips, guides & advice for Massachusetts homeowners.",
    images: ["https://storage.googleapis.com/msgsndr/BCczy6muFwhd63dPhKCC/media/69309a3e4d01f3e2eea4a8f1.png"],
  },
  alternates: { canonical: "https://wolfs-siding.com/blog" },
};

export default function BlogIndexPage() {
  const featured = BLOG_POSTS[0];
  const rest = BLOG_POSTS.slice(1);

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://wolfs-siding.com" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://wolfs-siding.com/blog" },
    ],
  };

  const blogLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Siding Blog | Expert Tips & Guides",
    description: "Expert siding tips, guides, and advice for Massachusetts homeowners from Wolf's Siding Inc.",
    url: "https://wolfs-siding.com/blog",
    publisher: {
      "@type": "Organization",
      name: "Wolf's Siding Inc.",
      url: "https://wolfs-siding.com",
      logo: { "@type": "ImageObject", url: "https://wolfs-siding.com/logo.png" },
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: BLOG_POSTS.map((post, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `https://wolfs-siding.com/blog/${post.slug}`,
        name: post.title,
      })),
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogLd) }} />

      {/* Hero */}
      <section className="pt-[80px] bg-gradient-to-b from-black to-[#1A1A1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 bg-[#E00000] text-white text-xs font-bold px-4 py-2 rounded-full mb-6">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg>
              Siding Expert Blog
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-4">
              Siding Tips, Guides &<br /><span className="text-[#E00000]">Expert Advice</span>
            </h1>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Everything Massachusetts homeowners need to know about siding installation, repair, and maintenance — from the experts at Wolf&apos;s Siding Inc.
            </p>
          </div>

          {/* Featured Post */}
          <Link href={`/blog/${featured.slug}`} className="group block">
            <div className="grid lg:grid-cols-2 gap-8 bg-white/5 rounded-2xl overflow-hidden border border-white/10 hover:border-[#E00000]/30 transition-colors">
              <div className="relative aspect-[16/10] lg:aspect-auto">
                <Image
                  src={featured.heroImage}
                  alt={featured.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-[#E00000] text-white text-xs font-bold px-3 py-1.5 rounded-full">Featured</span>
                </div>
              </div>
              <div className="p-6 lg:p-10 flex flex-col justify-center">
                <div className="flex items-center gap-3 text-white/50 text-sm mb-4">
                  <span className="bg-white/10 px-3 py-1 rounded-full text-xs font-medium">{featured.category}</span>
                  <span>{featured.readTime}</span>
                </div>
                <h2 className="text-2xl lg:text-3xl font-black text-white mb-4 group-hover:text-[#E00000] transition-colors">
                  {featured.title}
                </h2>
                <p className="text-white/60 text-sm leading-relaxed mb-6">{featured.excerpt}</p>
                <span className="inline-flex items-center gap-2 text-[#E00000] font-bold text-sm group-hover:gap-3 transition-all">
                  Read Article
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                </span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-black text-black mb-8">Latest Articles</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {rest.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
                <article className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-[#E00000]/20 hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={post.heroImage}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="bg-black/70 backdrop-blur-sm text-white text-xs font-medium px-3 py-1 rounded-full">{post.category}</span>
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-3 text-[#333]/50 text-xs mb-3">
                      <span>{new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
                      <span>&middot;</span>
                      <span>{post.readTime}</span>
                    </div>
                    <h3 className="text-lg font-bold text-black mb-3 group-hover:text-[#E00000] transition-colors leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-[#333] text-sm leading-relaxed mb-4 flex-1 line-clamp-3">{post.excerpt}</p>
                    <span className="inline-flex items-center gap-1.5 text-[#E00000] font-semibold text-sm group-hover:gap-2.5 transition-all">
                      Read More
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-[#E00000] to-[#CC0000] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">
              Ready to Start Your Siding Project?
            </h2>
            <p className="text-white/90 text-lg">
              Get a free estimate today. No obligation, no pressure — just honest expertise.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="tel:+17744841895" className="inline-flex items-center justify-center gap-3 bg-black hover:bg-[#1A1A1A] text-white px-8 py-4 rounded-xl text-lg font-bold transition-all hover:scale-105">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
              (774) 484-1895
            </a>
            <Link href="/#contact" className="inline-flex items-center justify-center gap-2 bg-white text-black hover:bg-gray-100 px-8 py-4 rounded-xl text-lg font-bold transition-all">
              Free Estimate
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
