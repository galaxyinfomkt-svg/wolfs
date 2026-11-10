import type { Metadata } from "next";
import Link from "next/link";
import { BUSINESS } from "../../../config/business";
import { businessRef } from "../../../config/schema";
import FormEmbed from "../../components/FormEmbed";
import LazyIframe from "../../components/LazyIframe";

const URL = `${BUSINESS.url}/contact`;
const TITLE = "Contact Wolf's Siding | Free Estimates";
const DESC = `Call ${BUSINESS.phone} or request a free written estimate. Wolf's Siding Inc., ${BUSINESS.address.street}, ${BUSINESS.address.city}, MA ${BUSINESS.address.zip}. Mon–Sat 8am–7pm.`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: URL },
  openGraph: { title: TITLE, description: DESC, url: URL, type: "website", siteName: BUSINESS.legalName },
};

const MAP_SRC = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(
  `${BUSINESS.legalName}, ${BUSINESS.address.street}, ${BUSINESS.address.city}, MA ${BUSINESS.address.zip}`
)}&zoom=13`;

export default function ContactPage() {
  const ld = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${URL}#webpage`,
    url: URL,
    name: TITLE,
    about: businessRef,
    mainEntity: businessRef,
  };

  return (
    <main className="bg-white pt-[110px]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <nav className="mb-4 text-sm text-[#666]" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-[#E00000]">Home</Link> <span className="mx-2">/</span> Contact
        </nav>
        <h1 className="mb-8 text-4xl font-extrabold tracking-[-0.02em] text-black sm:text-5xl">Contact Wolf&apos;s Siding</h1>

        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div className="space-y-6 text-[#333]">
            <div>
              <h2 className="mb-1 text-sm font-bold uppercase tracking-wider text-[#E00000]">Phone</h2>
              <a href={`tel:${BUSINESS.phoneE164}`} className="text-2xl font-extrabold text-black hover:text-[#E00000]">{BUSINESS.phone}</a>
            </div>
            <div>
              <h2 className="mb-1 text-sm font-bold uppercase tracking-wider text-[#E00000]">Email</h2>
              <a href={`mailto:${BUSINESS.email}`} className="text-lg hover:text-[#E00000]">{BUSINESS.email}</a>
            </div>
            <div>
              <h2 className="mb-1 text-sm font-bold uppercase tracking-wider text-[#E00000]">Address</h2>
              <address className="not-italic text-lg">
                {BUSINESS.legalName}<br />
                {BUSINESS.address.street}<br />
                {BUSINESS.address.city}, {BUSINESS.address.state} {BUSINESS.address.zip}
              </address>
            </div>
            <div>
              <h2 className="mb-1 text-sm font-bold uppercase tracking-wider text-[#E00000]">Hours</h2>
              <p className="text-lg">Monday–Saturday 8am–7pm<br />Sunday closed</p>
            </div>
            <p className="text-sm text-[#555]">Massachusetts HIC #{BUSINESS.hicLicense}</p>
            <LazyIframe src={MAP_SRC} className="h-[300px] w-full rounded-xl border-0" title="Map to Wolf's Siding in Marlborough, MA" placeholderLabel="Loading map..." />
          </div>

          <div>
            <h2 className="mb-4 text-2xl font-bold text-black">Request a free estimate</h2>
            <FormEmbed id="contact-form" />
            <p className="mt-4 text-sm text-[#555]">
              Prefer to talk? Call <a href={`tel:${BUSINESS.phoneE164}`} className="font-semibold text-[#E00000]">{BUSINESS.phone}</a>.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
