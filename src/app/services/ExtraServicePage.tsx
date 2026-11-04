import Link from "next/link";
import Image from "next/image";
import type { ExtraService } from "../data/extraServices";
import { BUSINESS } from "../../config/business";
import { businessRef } from "../../config/schema";
import FormEmbed from "../components/FormEmbed";

/* Statewide-only service page (no city × service variants). */
export default function ExtraServicePage({ service }: { service: ExtraService }) {
  const url = `${BUSINESS.url}/services/${service.slug}`;
  const ld = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: service.name,
      url,
      description: service.description,
      provider: businessRef,
      areaServed: { "@type": "State", name: "Massachusetts" },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: service.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: BUSINESS.url },
        { "@type": "ListItem", position: 2, name: service.name, item: url },
      ],
    },
  ];

  return (
    <main className="bg-white pt-[110px]">
      {ld.map((x, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(x) }} />
      ))}

      <section className="relative bg-black">
        <Image src={service.image} alt={service.imageAlt} fill priority sizes="100vw" className="object-cover opacity-45" />
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <nav className="mb-4 text-sm text-white/70" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white">Home</Link> <span className="mx-2">/</span>
            <span className="text-white">{service.name}</span>
          </nav>
          <h1 className="max-w-3xl text-4xl font-extrabold leading-tight tracking-[-0.02em] text-white sm:text-5xl">
            {service.name} in Massachusetts
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/90">{service.lead}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href={`tel:${BUSINESS.phoneE164}`} className="rounded-lg bg-[#E00000] px-6 py-3 font-bold text-white hover:bg-[#CC0000]">{BUSINESS.phone}</a>
            <a href="#contact-form" className="rounded-lg bg-white px-6 py-3 font-bold text-black hover:bg-gray-100">Free estimate</a>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-12 px-4 py-14 sm:px-6 lg:grid-cols-[1.5fr_1fr] lg:px-8">
        <div className="space-y-10">
          {service.sections.map((s) => (
            <div key={s.h}>
              <h2 className="mb-3 text-2xl font-extrabold text-black">{s.h}</h2>
              <div className="space-y-3 leading-relaxed text-[#333]">
                {s.p.map((t, i) => <p key={i}>{t}</p>)}
              </div>
            </div>
          ))}

          {service.facts && service.facts.length > 0 && (
            <div>
              <h2 className="mb-3 text-2xl font-extrabold text-black">Quick facts</h2>
              <dl className="divide-y divide-gray-200 rounded-xl border border-gray-200">
                {service.facts.map((f) => (
                  <div key={f.label} className="grid gap-1 p-4 sm:grid-cols-[180px_1fr]">
                    <dt className="font-semibold text-black">{f.label}</dt>
                    <dd className="text-[#333]">
                      {f.value}
                      {f.source && (
                        <a href={f.source} target="_blank" rel="noopener" className="ml-2 text-xs text-[#666] underline">manufacturer</a>
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="mt-2 text-xs text-[#666]">Warranty terms are the manufacturer&apos;s and can change; we confirm the current terms in writing with every estimate.</p>
            </div>
          )}

          <div>
            <h2 className="mb-3 text-2xl font-extrabold text-black">Questions we get</h2>
            <div className="space-y-3">
              {service.faqs.map((f) => (
                <details key={f.q} className="rounded-xl bg-[#F5F5F5] p-5">
                  <summary className="cursor-pointer font-semibold text-black">{f.q}</summary>
                  <p className="mt-3 leading-relaxed text-[#333]">{f.a}</p>
                </details>
              ))}
            </div>
          </div>

          <div>
            <h2 className="mb-3 text-xl font-bold text-black">Related</h2>
            <ul className="flex flex-wrap gap-2">
              {service.related.map((r) => (
                <li key={r.href}>
                  <Link href={r.href} className="inline-block rounded-full border border-gray-300 px-4 py-2 text-sm font-semibold text-black hover:border-[#E00000] hover:text-[#E00000]">{r.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <aside>
          <div className="sticky top-[120px]">
            <h2 className="mb-3 text-xl font-bold text-black">Get a free written estimate</h2>
            <FormEmbed id="contact-form" />
          </div>
        </aside>
      </section>
    </main>
  );
}
