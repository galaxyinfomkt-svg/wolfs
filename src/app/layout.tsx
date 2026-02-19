import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import FloatingPhone from "./components/FloatingPhone";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Siding Installation Massachusetts | Wolf's Siding Inc. | 18+ Years Experience",
  description:
    "Wolf's Siding Inc. — Expert siding installation, replacement & repair in Massachusetts. Vinyl, Hardie Plank, Cedar, Clapboard & more. 18+ years experience. Free estimates. Call (774) 484-1895!",
  keywords:
    "siding installation Massachusetts, vinyl siding contractor MA, Hardie Plank siding Massachusetts, cedar shingles MA, siding contractor Hudson MA, siding Northborough MA, siding Marlborough MA, exterior trim Massachusetts, clapboard siding MA, siding replacement Worcester MA",
  authors: [{ name: "Wolf's Siding Inc." }],
  openGraph: {
    title: "Expert Siding Installation in Massachusetts | Wolf's Siding Inc.",
    description:
      "Transform your home with premium siding installation by Wolf's Siding Inc. Vinyl, Hardie Plank, Cedar & more. 18+ years of experience across Massachusetts. Free assessment!",
    url: "https://www.wolfs-siding.com",
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
    title: "Expert Siding Installation Massachusetts | Wolf's Siding Inc.",
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
  alternates: { canonical: "https://www.wolfs-siding.com" },
};

/* JSON-LD structured data for LocalBusiness / Contractor */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["HomeAndConstructionBusiness", "GeneralContractor"],
  name: "Wolf's Siding Inc.",
  alternateName: "Wolf's Siding",
  description:
    "Expert siding installation, replacement and repair company serving Massachusetts. Specializing in Vinyl, Hardie Plank, Cedar, Clapboard siding and exterior trim work with 18+ years of industry experience.",
  url: "https://www.wolfs-siding.com",
  telephone: "+17744841895",
  image: "https://www.wolfs-siding.com/logo.png",
  logo: "https://www.wolfs-siding.com/logo.png",
  founder: {
    "@type": "Person",
    name: "Ezequias Lobo",
    jobTitle: "Owner",
    image:
      "https://storage.googleapis.com/msgsndr/BCczy6muFwhd63dPhKCC/media/68e581d6416ab711d774e6cf.jpeg",
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "156 Washburn St",
    addressLocality: "Northborough",
    addressRegion: "MA",
    postalCode: "01532",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 42.3195,
    longitude: -71.6412,
  },
  areaServed: [
    { "@type": "City", name: "Hudson", containedInPlace: { "@type": "State", name: "Massachusetts" } },
    { "@type": "City", name: "Northborough", containedInPlace: { "@type": "State", name: "Massachusetts" } },
    { "@type": "City", name: "Marlborough", containedInPlace: { "@type": "State", name: "Massachusetts" } },
    { "@type": "City", name: "Sudbury", containedInPlace: { "@type": "State", name: "Massachusetts" } },
    { "@type": "City", name: "Worcester", containedInPlace: { "@type": "State", name: "Massachusetts" } },
    { "@type": "City", name: "Framingham", containedInPlace: { "@type": "State", name: "Massachusetts" } },
    { "@type": "City", name: "Shrewsbury", containedInPlace: { "@type": "State", name: "Massachusetts" } },
    { "@type": "City", name: "Westborough", containedInPlace: { "@type": "State", name: "Massachusetts" } },
    { "@type": "City", name: "Berlin", containedInPlace: { "@type": "State", name: "Massachusetts" } },
    { "@type": "City", name: "Boston", containedInPlace: { "@type": "State", name: "Massachusetts" } },
    { "@type": "City", name: "Holden", containedInPlace: { "@type": "State", name: "Massachusetts" } },
    { "@type": "City", name: "Rutland", containedInPlace: { "@type": "State", name: "Massachusetts" } },
    { "@type": "City", name: "Boylston", containedInPlace: { "@type": "State", name: "Massachusetts" } },
    { "@type": "City", name: "Millbury", containedInPlace: { "@type": "State", name: "Massachusetts" } },
    { "@type": "City", name: "Leicester", containedInPlace: { "@type": "State", name: "Massachusetts" } },
    { "@type": "City", name: "Millis", containedInPlace: { "@type": "State", name: "Massachusetts" } },
    { "@type": "City", name: "Weston", containedInPlace: { "@type": "State", name: "Massachusetts" } },
    { "@type": "City", name: "West Boylston", containedInPlace: { "@type": "State", name: "Massachusetts" } },
    { "@type": "City", name: "Nashua", containedInPlace: { "@type": "State", name: "New Hampshire" } },
    { "@type": "State", name: "Rhode Island" },
  ],
  sameAs: [
    "https://www.instagram.com/wolfs_siding_inc/",
    "https://www.facebook.com/wolfsiding",
    "https://maps.app.goo.gl/ibPzjf7EWQ7aK1HYA",
    "https://g.page/r/CfACa1fxiHsqEAE/review",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Siding & Exterior Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Vinyl Siding Installation" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Clapboard Siding Installation" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Hardie Plank Siding Installation" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Exterior Trim Work" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Vinyl Cedar Shingles" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Wood Shingles Installation" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Cedar Shingles Installation" } },
    ],
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    bestRating: "5",
    worstRating: "1",
    ratingCount: "22",
    reviewCount: "22",
  },
  review: [
    {
      "@type": "Review",
      author: { "@type": "Person", name: "Michael T." },
      datePublished: "2024-09-15",
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
      reviewBody:
        "Wolf's Siding did an amazing job on our vinyl siding installation. Professional, clean work and great communication throughout the project. Highly recommend!",
    },
    {
      "@type": "Review",
      author: { "@type": "Person", name: "Sarah K." },
      datePublished: "2024-11-02",
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
      reviewBody:
        "Ezequias and his team replaced all the siding on our home in Northborough. The attention to detail was incredible. Our house looks brand new!",
    },
    {
      "@type": "Review",
      author: { "@type": "Person", name: "David R." },
      datePublished: "2025-01-20",
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
      reviewBody:
        "Best siding contractor in Massachusetts. Fair pricing, quality materials and the crew was respectful and professional. Will use again for our trim work.",
    },
  ],
  priceRange: "$$",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "07:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "08:00",
      closes: "14:00",
    },
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
        <link rel="preconnect" href="https://storage.googleapis.com" />
        <link rel="preconnect" href="https://api.leadconnectorhq.com" />
        <link rel="preconnect" href="https://widgets.leadconnectorhq.com" />
        <link rel="dns-prefetch" href="https://services.leadconnectorhq.com" />
        <link rel="dns-prefetch" href="https://appcdn.leadconnectorhq.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} antialiased`}>
        {children}
        <FloatingPhone />
        <Script
          src="https://widgets.leadconnectorhq.com/loader.js"
          data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js"
          data-widget-id="66999080b120684ccf0d5c5f"
          strategy="lazyOnload"
        />
        <Script
          src="https://reputationhub.site/reputation/assets/review-widget.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
