import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { BLOG_POSTS, getBlogPostBySlug, getRelatedPosts } from "../../data/blog";
import { getServiceBySlug } from "../../data/cities";
import LazyIframe from "../../components/LazyIframe";

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};

  return {
    title: `${post.title} | Wolf's Siding Inc. Blog`,
    description: post.excerpt,
    keywords: `${post.category.toLowerCase()}, siding tips Massachusetts, ${post.title.split(' ').slice(0, 3).join(' ').toLowerCase()}, siding guide, Wolf's Siding blog`,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://www.wolfs-siding.com/blog/${slug}`,
      siteName: "Wolf's Siding Inc.",
      type: "article",
      images: [{ url: post.heroImage, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.heroImage],
    },
    alternates: { canonical: `https://www.wolfs-siding.com/blog/${slug}` },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const relatedPosts = getRelatedPosts(slug, 3);
  const relatedService = getServiceBySlug(post.relatedService);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.heroImage,
    datePublished: post.date,
    author: { "@type": "Organization", name: "Wolf's Siding Inc." },
    publisher: {
      "@type": "Organization",
      name: "Wolf's Siding Inc.",
      logo: { "@type": "ImageObject", url: "https://www.wolfs-siding.com/logo.png" },
    },
    url: `https://www.wolfs-siding.com/blog/${slug}`,
    mainEntityOfPage: { "@type": "WebPage", "@id": `https://www.wolfs-siding.com/blog/${slug}` },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.wolfs-siding.com" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://www.wolfs-siding.com/blog" },
      { "@type": "ListItem", position: 3, name: post.title, item: `https://www.wolfs-siding.com/blog/${slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      {/* Hero */}
      <section className="relative pt-[80px]">
        <div className="absolute inset-0">
          <Image src={post.heroImage} alt={post.title} fill className="object-cover" priority sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/50" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <nav className="text-sm text-white/50 mb-6">
            <Link href="/" className="hover:text-[#E00000] transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/blog" className="hover:text-[#E00000] transition-colors">Blog</Link>
            <span className="mx-2">/</span>
            <span className="text-white">{post.category}</span>
          </nav>
          <div className="flex items-center gap-3 text-white/60 text-sm mb-6">
            <span className="bg-[#E00000] text-white text-xs font-bold px-3 py-1.5 rounded-full">{post.category}</span>
            <span>{new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
            <span>&middot;</span>
            <span>{post.readTime}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mb-6">
            {post.title}
          </h1>
          <p className="text-lg text-white/70 max-w-2xl">{post.excerpt}</p>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <article className="lg:col-span-2">
              <div className="prose prose-lg max-w-none">
                {post.content.map((block, i) => {
                  const parts = block.split("\n\n");
                  return (
                    <div key={i} className="mb-8">
                      {parts.map((part, j) => {
                        if (part.startsWith("## ")) {
                          return <h2 key={j} className="text-2xl font-black text-black mt-10 mb-4">{part.replace("## ", "")}</h2>;
                        }
                        if (part.startsWith("**") && part.includes("**\n")) {
                          return <div key={j} className="text-[#333] text-base leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: part.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br />') }} />;
                        }
                        if (part.startsWith("- ") || part.startsWith("1. ")) {
                          const items = part.split("\n").filter(Boolean);
                          const isOrdered = part.startsWith("1. ");
                          const Tag = isOrdered ? "ol" : "ul";
                          return (
                            <Tag key={j} className={`${isOrdered ? "list-decimal" : "list-disc"} pl-6 space-y-2 text-[#333] text-base leading-relaxed mb-4`}>
                              {items.map((item, k) => (
                                <li key={k} dangerouslySetInnerHTML={{ __html: item.replace(/^[-\d.]+\s*/, "").replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                              ))}
                            </Tag>
                          );
                        }
                        return <p key={j} className="text-[#333] text-base leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: part.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />;
                      })}
                    </div>
                  );
                })}
              </div>

              {/* CTA within article */}
              <div className="mt-12 bg-gradient-to-r from-[#E00000] to-[#CC0000] rounded-2xl p-8 text-center">
                <h3 className="text-2xl font-black text-white mb-3">Get Your Free Estimate</h3>
                <p className="text-white/90 mb-6">Ready to start your siding project? Contact us today for a no-obligation consultation.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a href="tel:+17744841895" className="inline-flex items-center justify-center gap-2 bg-black hover:bg-[#1A1A1A] text-white px-6 py-3 rounded-xl font-bold transition-all hover:scale-105">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
                    (774) 484-1895
                  </a>
                  <Link href="/#contact" className="inline-flex items-center justify-center bg-white text-black hover:bg-gray-100 px-6 py-3 rounded-xl font-bold transition-all">
                    Request Estimate
                  </Link>
                </div>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="hidden lg:block">
              <div className="sticky top-[90px] space-y-6">
                {/* Form */}
                <LazyIframe
                  src="https://api.leadconnectorhq.com/widget/form/altG7jV8Jt79wwRd8WbH"
                  className="form-iframe-sidebar"
                  title="Contact form"
                />

                {/* Related Service */}
                {relatedService && (
                  <div className="bg-[#F5F5F5] rounded-2xl p-6">
                    <h3 className="font-bold text-black mb-3">Related Service</h3>
                    <Link
                      href={`/services/${relatedService.slug}`}
                      className="flex items-center gap-3 py-3 text-sm text-[#333] hover:text-[#E00000] transition-colors group"
                    >
                      <div className="w-10 h-10 bg-[#E00000] rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>
                      </div>
                      <div>
                        <span className="font-semibold block">{relatedService.shortName}</span>
                        <span className="text-xs text-[#333]/60">Learn more about this service</span>
                      </div>
                    </Link>
                  </div>
                )}

                {/* Call CTA */}
                <div className="bg-black rounded-2xl p-6 text-center">
                  <p className="text-white/60 text-sm mb-2">Call Us Now</p>
                  <a href="tel:+17744841895" className="text-[#E00000] text-2xl font-black hover:text-white transition-colors">
                    (774) 484-1895
                  </a>
                </div>

                {/* Other Posts */}
                <div className="bg-[#F5F5F5] rounded-2xl p-6">
                  <h3 className="font-bold text-black mb-4">More Articles</h3>
                  <ul className="space-y-3">
                    {relatedPosts.map((p) => (
                      <li key={p.slug}>
                        <Link href={`/blog/${p.slug}`} className="flex items-start gap-3 group">
                          <div className="relative w-16 h-12 rounded-lg overflow-hidden flex-shrink-0">
                            <Image src={p.heroImage} alt={p.title} fill className="object-cover" sizes="80px" />
                          </div>
                          <div>
                            <span className="text-xs text-[#333]/50 block">{p.category}</span>
                            <span className="text-sm font-medium text-[#333] group-hover:text-[#E00000] transition-colors leading-snug line-clamp-2">{p.title}</span>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      <section className="py-16 bg-[#F5F5F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-black text-black mb-8">You Might Also Like</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedPosts.map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="group">
                <article className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-[#E00000]/20 hover:shadow-xl transition-all duration-300">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image src={p.heroImage} alt={p.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 640px) 100vw, 33vw" />
                    <div className="absolute top-3 left-3">
                      <span className="bg-black/70 backdrop-blur-sm text-white text-xs font-medium px-3 py-1 rounded-full">{p.category}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 text-[#333]/50 text-xs mb-3">
                      <span>{new Date(p.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
                      <span>&middot;</span>
                      <span>{p.readTime}</span>
                    </div>
                    <h3 className="text-lg font-bold text-black mb-3 group-hover:text-[#E00000] transition-colors leading-snug">{p.title}</h3>
                    <span className="inline-flex items-center gap-1.5 text-[#E00000] font-semibold text-sm">
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
    </>
  );
}
