/* Reusable in-section CTA band — drop one at the end of any section to keep a
   conversion path in view everywhere. Links to the on-page form (#contact-form)
   and the phone. No client JS. */
export default function SectionCta({
  label = "Ready to transform your home's exterior?",
  variant = "light",
}: {
  label?: string;
  variant?: "light" | "dark";
}) {
  const dark = variant === "dark";
  return (
    <div
      className={`mt-14 rounded-2xl px-6 py-7 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-5 ${
        dark ? "bg-white/5 border border-white/10" : "bg-[#F5F5F5] border border-gray-100"
      }`}
    >
      <p className={`text-lg font-bold text-center sm:text-left ${dark ? "text-white" : "text-black"}`}>
        {label}
      </p>
      <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0 w-full sm:w-auto">
        <a
          href="#contact-form"
          className="inline-flex items-center justify-center gap-2 bg-[#E00000] hover:bg-[#CC0000] text-white px-7 py-3.5 rounded-lg text-sm font-bold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-900/25"
        >
          Get Your Free Estimate
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
        </a>
        <a
          href="tel:+17744841895"
          className={`inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg text-sm font-bold border-2 transition-all duration-300 ${
            dark ? "border-white/30 text-white hover:bg-white hover:text-black" : "border-gray-300 text-[#333] hover:border-[#E00000] hover:text-[#E00000]"
          }`}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
          (774) 484-1895
        </a>
      </div>
    </div>
  );
}
