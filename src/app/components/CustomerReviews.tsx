import reviewsData from "../../data/reviews.json";
import { BUSINESS } from "../../config/business";

/* Server-rendered Google reviews shown ABOVE the GHL reputation widget, so the
 * strongest trust asset is visible to Google and AI crawlers (the widget is an
 * iframe they can't read). Also emits Review schema for each one.
 *
 * Content comes from src/data/reviews.json — real GBP reviews pasted verbatim by
 * RHAI. While that file is empty this renders nothing (no fabricated reviews).
 * When a review's `city` matches the current page, it is surfaced first.
 */
interface Review {
  author: string;
  rating: number;
  date: string;
  text: string;
  city?: string;
}

export default function CustomerReviews({ city, schemaOnly = false }: { city?: string; schemaOnly?: boolean }) {
  const all = reviewsData as Review[];
  if (!all.length) return null;

  const sorted = city
    ? [...all].sort((a, b) => (b.city === city ? 1 : 0) - (a.city === city ? 1 : 0))
    : all;
  const shown = sorted.slice(0, 8);

  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: shown.map((r, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Review",
        author: { "@type": "Person", name: r.author },
        datePublished: r.date,
        reviewRating: { "@type": "Rating", ratingValue: String(r.rating), bestRating: "5", worstRating: "1" },
        reviewBody: r.text,
        itemReviewed: { "@type": "HomeAndConstructionBusiness", name: BUSINESS.legalName },
      },
    })),
  };

  const schemaScript = (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
  );

  // Keep the Review schema (crawler/AI SEO) but hide the visual cards — the live
  // GHL reputation widget already shows the reviews to users.
  if (schemaOnly) return schemaScript;

  return (
    <div className="mb-10">
      {schemaScript}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((r, i) => (
          <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex text-yellow-400 mb-3" aria-label={`${r.rating} out of 5 stars`}>
              {[...Array(r.rating)].map((_, s) => (
                <svg key={s} className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
              ))}
            </div>
            <p className="text-sm text-[#333] leading-relaxed mb-4">&ldquo;{r.text}&rdquo;</p>
            <p className="text-sm font-bold text-black">
              {r.author}
              {r.city ? <span className="font-normal text-[#333]/60"> · {r.city}, MA</span> : null}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
