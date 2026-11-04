import { BUSINESS, REPAIR_MINIMUM } from "../../config/business";

/* Fixed strip shown ONLY on siding-repair pages (/services/siding-repair-services
   and /{city}/siding-repair-services). Wolf's takes repair work above a
   minimum job size; the strip says so up front so small requests can be
   sorted out on the first call. It sits right under the fixed site header
   (40px top bar + 70px nav) and a spacer keeps it from covering the page. */
export default function RepairMinimumBar() {
  const amount = REPAIR_MINIMUM ? ` (${REPAIR_MINIMUM})` : "";
  return (
    <>
      <div
        role="note"
        className="fixed left-0 right-0 top-[110px] z-40 border-b border-[#E00000]/30 bg-[#FFF4F4] px-4 py-2 text-center text-sm text-[#1a1a1a] shadow-sm"
      >
        <strong>Repairs have a minimum job size{amount}.</strong>{" "}
        <span className="max-sm:hidden">Tell us what needs fixing and we&apos;ll let you know right away if it qualifies — </span>
        <a href={`tel:${BUSINESS.phoneE164}`} className="font-bold text-[#C00000] underline underline-offset-2">
          {BUSINESS.phone}
        </a>
      </div>
      <div aria-hidden="true" className="h-10" />
    </>
  );
}
