import type { Metadata } from "next";
import { Inter } from "next/font/google";
import FloatingPhone from "./components/FloatingPhone";
import DeferredScripts from "./components/DeferredScripts";
import { Analytics } from "@vercel/analytics/next";
import { BUSINESS, SINCE } from "../config/business";
import { siteGraph } from "../config/schema";
import "./globals.css";

const META_DESC = `Siding, trim, windows, gutters & roofing across Massachusetts by Wolf's Siding, owner-run ${SINCE}. Free estimates. ${BUSINESS.phone}`;

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Siding Contractor in Massachusetts | Wolf's Siding Inc.",
  description:
    META_DESC,
  keywords:
    "siding contractor Massachusetts, siding installation MA, vinyl siding contractor MA, Hardie Plank siding Massachusetts, cedar shingles MA, clapboard siding MA, siding contractor Hudson MA, siding Northborough MA, siding Marlborough MA, exterior trim Massachusetts, siding replacement Worcester MA, siding company near me",
  authors: [{ name: "Wolf's Siding Inc." }],
  openGraph: {
    title: "Siding Contractor in Massachusetts | Wolf's Siding Inc.",
    description:
      META_DESC,
    url: "https://wolfs-siding.com",
    siteName: "Wolf's Siding Inc.",
    images: [
      {
        url: "https://storage.googleapis.com/msgsndr/BCczy6muFwhd63dPhKCC/media/69309a3e4d01f3e2eea4a8f1.png",
        width: 1200,
        height: 630,
        alt: "Wolf's Siding Inc. - Expert Siding Installation Massachusetts",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Siding Contractor in Massachusetts | Wolf's Siding Inc.",
    description:
      META_DESC,
    images: [
      "https://storage.googleapis.com/msgsndr/BCczy6muFwhd63dPhKCC/media/69309a3e4d01f3e2eea4a8f1.png",
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: { canonical: "https://wolfs-siding.com" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://assets.cdn.filesafe.space" />
        <link rel="preconnect" href="https://storage.googleapis.com" />
        <link rel="preconnect" href="https://api.leadconnectorhq.com" />
        <link rel="preconnect" href="https://beta.leadconnectorhq.com" />
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLM Information" />
        {/* State-level geo only. Per-city geo.placename/position/ICBM are emitted
            per page (city templates) when that city has coordinates — never a
            single hardcoded location shipped on every page. */}
        <meta name="geo.region" content="US-MA" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteGraph()) }}
        />
      </head>
      <body className={`${inter.variable} antialiased`}>
        {children}
        <FloatingPhone />
        <DeferredScripts />
        {/*
          Vercel Web Analytics. O projeto nao tinha NENHUMA medicao de trafego:
          a API respondia "Web Analytics not found" porque o pacote nunca foi
          instalado. Nao existe historico, e o log de runtime da Vercel guarda
          so 24 horas - entao ate agora nao havia como responder "o trafego
          caiu?" com dado, so com opiniao.

          E first-party (/_vercel/insights/script.js, do proprio dominio), por
          isso passa na CSP com `script-src 'self'` e nao entra no
          DeferredScripts: adiar significaria perder justamente a visita de quem
          abre a pagina, le e sai sem interagir.
        */}
        <Analytics />
      </body>
    </html>
  );
}
