import type { Metadata } from "next";
import { Inter } from "next/font/google";
import FloatingPhone from "./components/FloatingPhone";
import DeferredScripts from "./components/DeferredScripts";
import { BUSINESS, CITIES_SERVED, SINCE } from "../config/business";
import "./globals.css";

const META_DESC = `Expert siding installation & replacement across Massachusetts — vinyl, Hardie Plank, cedar & clapboard by Wolf's Siding. Serving ${SINCE}. Free estimates. ${BUSINESS.phone}`;

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Siding Contractor MA | Vinyl, Hardie Plank, Cedar & Clapboard Siding | Wolf's Siding Inc.",
  description:
    META_DESC,
  keywords:
    "siding contractor Massachusetts, siding installation MA, vinyl siding contractor MA, Hardie Plank siding Massachusetts, cedar shingles MA, clapboard siding MA, siding contractor Hudson MA, siding Northborough MA, siding Marlborough MA, exterior trim Massachusetts, siding replacement Worcester MA, siding company near me",
  authors: [{ name: "Wolf's Siding Inc." }],
  openGraph: {
    title: "Siding Contractor MA | Vinyl, Hardie Plank, Cedar & Clapboard Siding | Wolf's Siding Inc.",
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
    title: "Siding Contractor MA | Vinyl, Hardie Plank, Cedar & Clapboard Siding | Wolf's Siding Inc.",
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

/* Organization schema — enhanced with RS-strategy elements for all pages */
const orgLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Wolf's Siding Inc.",
  alternateName: ["Wolf's Siding", "Wolfs Siding", "Wolf Siding Inc"],
  url: "https://wolfs-siding.com",
  logo: "https://wolfs-siding.com/logo.png",
  image: "https://wolfs-siding.com/logo.png",
  description: `Siding contractor in Massachusetts. Vinyl siding, Hardie Plank, cedar shingles, clapboard installation & replacement. Serving ${CITIES_SERVED}+ MA cities ${SINCE}.`,
  telephone: BUSINESS.phoneE164,
  email: BUSINESS.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: BUSINESS.address.street,
    addressLocality: BUSINESS.address.city,
    addressRegion: BUSINESS.address.state,
    postalCode: BUSINESS.address.zip,
    addressCountry: "US",
  },
  identifier: { "@type": "PropertyValue", name: "MA HIC License", value: BUSINESS.hicLicense },
  founder: { "@type": "Person", name: BUSINESS.owner, jobTitle: "Owner" },
  foundingDate: String(BUSINESS.foundedYear),
  knowsAbout: [
    "siding installation",
    "vinyl siding",
    "Hardie Plank siding",
    "fiber cement siding",
    "cedar shingle siding",
    "clapboard siding",
    "exterior trim work",
    "siding replacement",
    "full siding replacement",
    "gutter installation",
    "roofing installation",
    "Massachusetts siding contractor",
    "Massachusetts exterior contractor",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Exterior Services",
    itemListElement: [
      { "@type": "OfferCatalog", name: "Vinyl Siding Installation", position: 1 },
      { "@type": "OfferCatalog", name: "Hardie Plank Siding Installation", position: 2 },
      { "@type": "OfferCatalog", name: "Cedar Shingle Siding", position: 3 },
      { "@type": "OfferCatalog", name: "Clapboard Siding Installation", position: 4 },
      { "@type": "OfferCatalog", name: "Full Siding Replacement", position: 5 },
      { "@type": "OfferCatalog", name: "Siding Assessment & Consultation", position: 6 },
      { "@type": "OfferCatalog", name: "Exterior Trim Work", position: 7 },
      { "@type": "OfferCatalog", name: "Gutter Installation", position: 8 },
      { "@type": "OfferCatalog", name: "Roofing Installation", position: 9 },
    ],
  },
  // No self-declared aggregateRating on the business node — Google does not
  // generate rich results for a business rating itself and it can trigger a
  // Search Console warning. Individual Review items (with real author +
  // datePublished) are emitted on the home/city/service pages instead.
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
