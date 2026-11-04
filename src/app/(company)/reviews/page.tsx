import type { Metadata } from "next";
import Link from "next/link";
import { BUSINESS, REVIEW_RATING } from "../../../config/business";
import { businessRef } from "../../../config/schema";
import CustomerReviews from "../../components/CustomerReviews";

const URL = `${BUSINESS.url}/reviews`;
const TITLE = "Wolf's Siding Reviews | Google Reviews";
const DESC = `What homeowners say about Wolf's Siding Inc. — real Google reviews of our siding, trim and exterior work in Massachusetts. Rated ${REVIEW_RATING} on Google.`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: URL },
  openGraph: { title: TITLE, description: DESC, url: URL, type: "website", siteName: BUSINESS.legalName },
};

export default function ReviewsPage() {
  // No Review / AggregateRating markup: reviews of a business published on its
  // own site are "self-serving" for Google and never earn stars. The page is
  // here so people (and AI answer engines) can read the reviews as text.
  const ld = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${URL}#webpage`,
    url: URL,
    name: TITLE,
    about: businessRef,
  };

  return (
    <main className="bg-[#F5F5F5] pt-[110px]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <nav className="mb-4 text-sm text-[#666]" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-[#E00000]">Home</Link> <span className="mx-2">/</span> Reviews
        </nav>
        <h1 className="mb-3 text-4xl font-extrabold tracking-[-0.02em] text-black sm:text-5xl">Customer reviews</h1>
        <p className="mb-10 max-w-2xl text-lg text-[#333]">
          Reviews left by our customers on Google, copied here word for word. Rated {REVIEW_RATING} on Google.
        </p>

        <CustomerReviews />

        <iframe
          className="lc_reviews_widget reviews-widget"
          src="https://reputationhub.site/reputation/widgets/review_widget/BCczy6muFwhd63dPhKCC"
          frameBorder="0"
          scrolling="no"
          title="Live Google reviews"
          loading="lazy"
        />

        <div className="mt-10 flex flex-wrap gap-3">
          <a href={BUSINESS.social.googleMaps} target="_blank" rel="noopener noreferrer" className="rounded-lg bg-black px-6 py-3 font-bold text-white hover:bg-[#1A1A1A]">
            See all reviews on Google
          </a>
          <a href={`${BUSINESS.social.googleMaps}/review`} target="_blank" rel="noopener noreferrer" className="rounded-lg bg-[#E00000] px-6 py-3 font-bold text-white hover:bg-[#CC0000]">
            Leave us a review
          </a>
        </div>
      </section>
    </main>
  );
}
