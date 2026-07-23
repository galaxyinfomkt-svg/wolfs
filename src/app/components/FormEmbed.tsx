import LazyIframe from "./LazyIframe";
import { BUSINESS } from "../../config/business";

/* The one GHL estimate form embed per page. The embed itself is untouched — this
   wraps it with:
   - a server-rendered phone fallback that is ALWAYS in the HTML (the conversion
     path when the third-party script is slow, blocked, or down),
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
    <div id={id} className="scroll-mt-28">
      <div className="form-fallback mb-3 rounded-lg bg-white/95 px-4 py-2.5 text-sm text-[#333] shadow-sm">
        <p>
          Prefer to talk? Call{" "}
          <a href={`tel:${BUSINESS.phoneE164}`} className="font-bold text-[#E00000] hover:underline">
            {BUSINESS.phone}
          </a>{" "}
          — Mon–Fri 7–6, Sat 8–2.
        </p>
      </div>
      <LazyIframe src={FORM_SRC} className={className} title="Free estimate form" placeholderLabel="Loading form..." />
      <noscript>
        <p className="mt-3 rounded-lg bg-white px-4 py-3 text-sm text-[#333]">
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
