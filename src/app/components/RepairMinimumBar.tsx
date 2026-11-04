import { BUSINESS, REPAIR_MINIMUM } from "../../config/business";

/* Fixed, high-visibility strip shown ONLY on siding-repair pages
   (/services/siding-repair-services and /{city}/siding-repair-services).
   Wolf's takes repair work above a minimum job size; the strip says so up
   front so small requests are sorted out on the first call. It stays pinned
   right under the fixed site header (40px top bar + 70px nav) while the page
   scrolls, and a spacer of the same height keeps it from covering content. */
export default function RepairMinimumBar() {
  const amount = REPAIR_MINIMUM ? ` of ${REPAIR_MINIMUM}` : "";
  return (
    <>
      <div
        role="note"
        aria-label="Minimum job size for repairs"
        className="fixed left-0 right-0 top-[110px] z-40 border-y-2 border-black bg-[#FFC400] shadow-lg"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-3 px-3 py-2.5 sm:gap-4 sm:py-3">
          <svg className="h-6 w-6 flex-shrink-0 text-black" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 2 1 21h22L12 2zm0 4.5L19.5 19h-15L12 6.5zM11 10v5h2v-5h-2zm0 6v2h2v-2h-2z" />
          </svg>
          <p className="text-[13px] font-extrabold uppercase leading-tight tracking-wide text-black sm:text-base">
            Repairs have a minimum job size{amount}
            <span className="block text-[11px] font-semibold normal-case tracking-normal sm:inline sm:text-sm">
              <span className="max-sm:hidden"> — </span>call first and we&apos;ll tell you right away if your repair qualifies
            </span>
          </p>
          <a
            href={`tel:${BUSINESS.phoneE164}`}
            className="flex-shrink-0 rounded-lg bg-black px-3 py-2 text-xs font-bold text-white hover:bg-[#222] sm:px-4 sm:text-sm"
          >
            <span className="max-sm:hidden">{BUSINESS.phone}</span>
            <span className="sm:hidden">Call</span>
          </a>
        </div>
      </div>
      <div aria-hidden="true" className="h-[68px] sm:h-[60px]" />
    </>
  );
}
