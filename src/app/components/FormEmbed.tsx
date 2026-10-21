import LazyIframe from "./LazyIframe";
import { BUSINESS } from "../../config/business";

/* The one GHL estimate form embed per page, shown as a white card with a red
   top edge (the hero card of the approved "Modelo A"). The embed itself is
   untouched — this wraps it with:
   - a server-rendered phone + e-mail line under the form that is ALWAYS in the
     HTML (the conversion path when the third-party script is slow, blocked,
     or down — and the client wants the e-mail wherever there is contact),
   - reserved height so the layout doesn't shift when the iframe loads,
   - a <noscript> phone CTA. */

const FORM_SRC = "https://api.leadconnectorhq.com/widget/form/altG7jV8Jt79wwRd8WbH";

export default function FormEmbed({
  id,
  className = "form-iframe-hero",
}: {
  id?: string;
  className?: string;
}) {
  return (
    <div
      id={id}
      className="scroll-mt-28 overflow-hidden rounded-2xl border-t-[6px] border-[#E00000] bg-white shadow-[0_30px_60px_-20px_rgba(0,0,0,0.45)]"
    >
      <LazyIframe src={FORM_SRC} className={className} title="Free estimate form" placeholderLabel="Loading form..." />
      <div className="form-fallback flex flex-wrap items-center justify-center gap-x-4 gap-y-1 border-t border-gray-100 px-5 py-3.5 text-sm text-[#333]">
        <span>Prefer to talk?</span>
        <a href={`tel:${BUSINESS.phoneE164}`} className="font-bold text-black hover:text-[#E00000]">
          {BUSINESS.phone}
        </a>
        <a href={`mailto:${BUSINESS.email}`} className="font-bold text-[#E00000] hover:underline">
          {BUSINESS.email}
        </a>
        <span className="basis-full text-center text-xs text-[#777]">Mon–Fri 7–6 · Sat 8–2</span>
      </div>
      <noscript>
        <p className="px-5 py-3 text-sm text-[#333]">
          Call{" "}
          <a href={`tel:${BUSINESS.phoneE164}`} className="font-bold text-[#E00000]">
            {BUSINESS.phone}
          </a>{" "}
          for a free estimate — Mon–Fri 7–6, Sat 8–2.
        </p>
      </noscript>
    </div>
  );
}
