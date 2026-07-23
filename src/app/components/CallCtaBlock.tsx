import { BUSINESS } from "../../config/business";

/* Static conversion block used in the secondary form positions (sidebar) so the
   page carries ONE real GHL form embed, not three. Phone-first, with an anchor
   to the primary embed at #contact-form. */
export default function CallCtaBlock() {
  return (
    <div className="bg-black rounded-2xl p-6 text-center">
      <p className="text-white font-bold text-lg mb-1">Get Your Free Estimate</p>
      <p className="text-white/60 text-sm mb-4">No obligation — same-day response.</p>
      <a
        href={`tel:${BUSINESS.phoneE164}`}
        className="flex items-center justify-center gap-2 bg-[#E00000] hover:bg-[#CC0000] text-white px-5 py-3 rounded-lg font-bold mb-2 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
        Call {BUSINESS.phone}
      </a>
      <a href="#contact-form" className="block text-white/80 hover:text-white text-sm font-semibold">
        or request your estimate online →
      </a>
    </div>
  );
}
