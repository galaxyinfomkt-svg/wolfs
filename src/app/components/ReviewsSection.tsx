/* GHL reputation widget (live Google reviews). Rendered by each local page
   right before its closing CTA, so the visitor reads the reviews and the next
   thing they see is the phone number. */
export default function ReviewsSection() {
  return (
    <section id="reviews" className="scroll-mt-28 bg-[#F5F5F5] py-16 content-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-8 text-center text-3xl font-extrabold tracking-[-0.02em] text-black sm:text-4xl">
          What Our Customers Say
        </h2>
        <iframe
          className="lc_reviews_widget reviews-widget"
          src="https://reputationhub.site/reputation/widgets/review_widget/BCczy6muFwhd63dPhKCC"
          frameBorder="0"
          scrolling="no"
          title="Customer Reviews"
          loading="lazy"
        />
        <p className="mt-6 text-center">
          <a
            href="https://g.page/r/CfACa1fxiHsqEAE"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-bold text-[#E00000] hover:underline"
          >
            See all reviews on Google →
          </a>
        </p>
      </div>
    </section>
  );
}
