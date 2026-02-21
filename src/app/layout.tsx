import type { Metadata } from "next";
import { Inter } from "next/font/google";
import FloatingPhone from "./components/FloatingPhone";
import DeferredScripts from "./components/DeferredScripts";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Siding Contractor MA | Vinyl, Hardie Plank, Cedar & Clapboard Siding | Wolf's Siding Inc.",
  description:
    "Expert siding installation, replacement & repair in Massachusetts. Vinyl, Hardie Plank, Cedar & more. 18+ years experience. Free estimates. (774) 484-1895",
  keywords:
    "siding contractor Massachusetts, siding installation MA, vinyl siding contractor MA, Hardie Plank siding Massachusetts, cedar shingles MA, clapboard siding MA, siding contractor Hudson MA, siding Northborough MA, siding Marlborough MA, exterior trim Massachusetts, siding replacement Worcester MA, siding company near me",
  authors: [{ name: "Wolf's Siding Inc." }],
  openGraph: {
    title: "Siding Contractor MA | Vinyl, Hardie Plank, Cedar & Clapboard Siding | Wolf's Siding Inc.",
    description:
      "Expert siding installation, replacement & repair in Massachusetts. Vinyl, Hardie Plank, Cedar & more. 18+ years experience. Free estimates. (774) 484-1895",
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
    title: "Siding Contractor MA | Vinyl, Hardie Plank, Cedar & Clapboard Siding | Wolf's Siding Inc.",
    description:
      "Premium siding installation, replacement & repair across Massachusetts. 18+ years experience. Call (774) 484-1895 for a free estimate!",
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

/* Organization schema — lightweight, safe for all pages */
const orgLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Wolf's Siding Inc.",
  alternateName: "Wolf's Siding",
  url: "https://wolfs-siding.com",
  logo: "https://wolfs-siding.com/logo.png",
  telephone: "+17744841895",
  sameAs: [
    "https://www.instagram.com/wolfs_siding_inc/",
    "https://www.facebook.com/wolfsiding",
    "https://www.google.com/maps/place/Wolf's+Siding+Inc./@42.3195,-71.6412,15z",
    "https://g.page/r/CfACa1fxiHsqEAE",
  ],
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
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLM Information" />
        <meta name="geo.region" content="US-MA" />
        <meta name="geo.placename" content="Northborough, MA" />
        <meta name="geo.position" content="42.3195;-71.6412" />
        <meta name="ICBM" content="42.3195, -71.6412" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }}
        />
      </head>
      <body className={`${inter.variable} antialiased`}>
        {children}
        <FloatingPhone />
        <DeferredScripts />

      </body>
    </html>
  );
}
