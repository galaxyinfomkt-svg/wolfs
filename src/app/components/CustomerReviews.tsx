import reviewsData from "../../data/reviews.json";

/* Server-rendered Google reviews shown ABOVE the GHL reputation widget, so the
 * strongest trust asset is visible to Google and AI crawlers (the widget is an
 * iframe they can't read). No Review schema (see note below).
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

/* When count is set, show that many reviews, starting at a position derived
   from seedKey: each town page shows a different few instead of the same
   eight blocks of text on every URL. */
export default function CustomerReviews({ city, schemaOnly = false, seedKey, count }: { city?: string; schemaOnly?: boolean; seedKey?: string; count?: number }) {
  const all = reviewsData as Review[];
  if (!all.length) return null;

  const sorted = city
    ? [...all].sort((a, b) => (b.city === city ? 1 : 0) - (a.city === city ? 1 : 0))
    : all;
  let shown = sorted.slice(0, 8);
  if (count && seedKey) {
    let h = 0;
    for (let i = 0; i < seedKey.length; i++) h = (h * 31 + seedKey.charCodeAt(i)) >>> 0;
    const start = h % sorted.length;
    shown = Array.from({ length: Math.min(count, sorted.length) }, (_, k) => sorted[(start + k) % sorted.length]);
  }

  // No Review schema: these are reviews of Wolf's about itself, which Google
  // treats as "self-serving" (never shown as stars, and a manual-action risk
  // when the text isn't visible on the page). See
  // developers.google.com/search/docs/appearance/structured-data/review-snippet
  // — so the schema-only mode now renders nothing.
  if (schemaOnly) return null;

  return (
    <div className="mb-10">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((r, i) => (
          <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex text-yellow-400 mb-3" role="img" aria-label={`${r.rating} out of 5 stars`}>
              {[...Array(r.rating)].map((_, s) => (
                <svg key={s} className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
              ))}
            </div>
            <p className="text-sm text-[#333] leading-relaxed mb-4">&ldquo;{r.text}&rdquo;</p>
            <p className="text-sm font-bold text-black">
              {r.author}
              {r.city ? <span className="font-normal text-[#595959]"> · {r.city}, MA</span> : null}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
