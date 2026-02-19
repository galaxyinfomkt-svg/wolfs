"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { CITIES as SERVICE_AREAS_ALL, SERVICES as SIDING_SERVICES } from "./data/cities";
import { BLOG_POSTS } from "./data/blog";
import LazyIframe from "./components/LazyIframe";

/* ════════════════════════════════════════════════════════════
   INLINE SVG ICON COMPONENTS
   ════════════════════════════════════════════════════════════ */

function PhoneIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
    </svg>
  );
}

function CheckCircleIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function StarIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function MapPinIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>
  );
}

function ChevronDownIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
  );
}

function MenuIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
  );
}

function XMarkIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function ShieldCheckIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  );
}

function ClockIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function CurrencyIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function ArrowRightIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
  );
}

function ExternalLinkIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
    </svg>
  );
}

function EnvelopeIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
  );
}

function SparklesIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
    </svg>
  );
}

function HomeModernIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819" />
    </svg>
  );
}

function WrenchScrewdriverIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.1 5.1a2.121 2.121 0 01-3-3l5.1-5.1m0 0L3.34 8.09a1.5 1.5 0 010-2.12l.88-.88a1.5 1.5 0 012.12 0l4.08 4.08m0 0l5.1-5.1a2.121 2.121 0 013 3l-5.1 5.1" />
    </svg>
  );
}

function SwatchIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z" />
    </svg>
  );
}

function BuildingIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
    </svg>
  );
}

function SquaresIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
    </svg>
  );
}

function TreeIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-6m0 0l-3-3m3 3l3-3m-3-3V3m0 6l3-3m-3 3L9 6" />
    </svg>
  );
}

function HandThumbUpIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75 2.25 2.25 0 012.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H3.75" />
    </svg>
  );
}

function UsersIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
    </svg>
  );
}

/* ════════════════════════════════════════════════════════════
   DATA ARRAYS
   ════════════════════════════════════════════════════════════ */

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "/projects" },
  { label: "Reviews", href: "#reviews" },
  { label: "FAQ", href: "#faq" },
  { label: "Areas", href: "#contact" },
  { label: "Contact", href: "#contact" },
];

const SERVICES = [
  {
    title: "Vinyl Siding Installation",
    slug: "vinyl-siding-installation",
    description: "Tired of constant repainting and peeling? Vinyl siding is a durable, cost-effective solution that resists fading, cracking, and peeling — keeping your Massachusetts home looking brand new for decades with minimal maintenance.",
    cta: "Get Vinyl Siding Estimate",
    image: "https://storage.googleapis.com/msgsndr/BCczy6muFwhd63dPhKCC/media/69309a3e4d01f353daa4a8f2.png",
    featured: true,
    icon: "squares",
  },
  {
    title: "Clapboard Siding Installation",
    slug: "clapboard-siding-installation",
    description: "Dealing with rotting wood or high maintenance costs? Clapboard mimics natural wood while offering easy maintenance and durability — a popular choice for Massachusetts homeowners seeking a traditional, elegant finish.",
    cta: "Explore Clapboard Options",
    image: "https://storage.googleapis.com/msgsndr/BCczy6muFwhd63dPhKCC/media/68caaa04357b4e5af271fea6.jpeg",
    featured: false,
    icon: "home",
  },
  {
    title: "Hardie Plank Siding Services",
    slug: "hardie-plank-siding-installation",
    description: "Worried about termites, moisture, or extreme New England winters? Hardie Plank offers superior durability and protection. Various textures and finishes make it the ultimate choice for a long-lasting, stylish exterior.",
    cta: "Request Hardie Plank Quote",
    image: "https://storage.googleapis.com/msgsndr/BCczy6muFwhd63dPhKCC/media/69309a3e0b0f9d5eef6c92ac.png",
    featured: false,
    icon: "shield",
  },
  {
    title: "Custom Exterior Trim Work",
    slug: "exterior-trim-work",
    description: "Does your home lack the finishing touches that make it stand out? Enhance elegance with custom trim — door and window frames, columns, friezes, skirting boards, and more. Expert craftsmanship for a flawless finish.",
    cta: "Get Trim Quote",
    image: "https://storage.googleapis.com/msgsndr/BCczy6muFwhd63dPhKCC/media/69309a3ee0f09220206bdb36.png",
    featured: false,
    icon: "wrench",
  },
  {
    title: "Cedar Shingle Siding",
    slug: "cedar-shingle-siding",
    description: "Love the natural warmth and character of cedar? Cedar shingles deliver unmatched beauty with natural insect resistance and exceptional insulation. They age gracefully to a stunning silver-gray patina.",
    cta: "Explore Cedar Shingles",
    image: "https://storage.googleapis.com/msgsndr/BCczy6muFwhd63dPhKCC/media/69309a3e8da9670893aa2a4e.png",
    featured: false,
    icon: "swatch",
  },
  {
    title: "Siding Repair Services",
    slug: "siding-repair-services",
    description: "Storm damage, cracks, or wear and tear? Our expert repair services restore your home's exterior quickly and affordably — matching existing materials for a seamless, invisible result.",
    cta: "Get Repair Estimate",
    image: "https://storage.googleapis.com/msgsndr/BCczy6muFwhd63dPhKCC/media/69309a3e7bbd8d15a40f7b92.png",
    featured: false,
    icon: "wrench",
  },
  {
    title: "Full Siding Replacement",
    slug: "full-siding-replacement",
    description: "Ready for a complete exterior transformation? Full siding replacement removes old, worn materials and installs premium new siding for decades of protection, beauty, and increased home value.",
    cta: "Get Replacement Quote",
    image: "https://storage.googleapis.com/msgsndr/BCczy6muFwhd63dPhKCC/media/69309a3e1d466e2aab7a9801.png",
    featured: false,
    icon: "sparkles",
  },
];

const CDN = "https://assets.cdn.filesafe.space/BCczy6muFwhd63dPhKCC/media";

const PROJECT_IMAGES = [
  { src: `${CDN}/69975cfb2a2f15796c002376.jpg`, alt: "Navy blue vinyl siding installation on lakefront cottage, Massachusetts", label: "Vinyl Siding", city: "Massachusetts" },
  { src: `${CDN}/69975e32181715caeea6e9c1.jpg`, alt: "Hardie Plank siding on craftsman ranch home, Massachusetts", label: "Hardie Plank", city: "Massachusetts" },
  { src: `${CDN}/69975e328d5b5a3f718385bf.jpg`, alt: "Gray vinyl siding on Cape Cod home by Wolf's Siding, MA", label: "Vinyl Siding", city: "Massachusetts" },
  { src: `${CDN}/69975e324c2502c5f69917b6.jpg`, alt: "Navy blue vinyl siding on colonial home, Massachusetts", label: "Vinyl Siding", city: "Massachusetts" },
  { src: `${CDN}/69975e328523c5f2c4d090c0.jpg`, alt: "Upscale gray colonial siding installation, Massachusetts", label: "Vinyl Siding", city: "Massachusetts" },
  { src: `${CDN}/69975e3220c0353f100e2671.jpg`, alt: "Burgundy board and batten siding on barn, Massachusetts", label: "Clapboard Siding", city: "Massachusetts" },
  { src: `${CDN}/69975e328523c5721bd090c1.jpg`, alt: "Hardie Plank mixed profile detail on ranch, MA", label: "Hardie Plank", city: "Massachusetts" },
  { src: `${CDN}/69975e323873af74c39f00be.jpg`, alt: "Subdivision vinyl siding installation by Wolf's Siding crew, MA", label: "Vinyl Siding", city: "Massachusetts" },
  { src: `${CDN}/69975e328d5b5a152d8385ef.jpg`, alt: "Commercial multi-family sheathing installation, Massachusetts", label: "Full Siding Replacement", city: "Massachusetts" },
  { src: `${CDN}/69975e323873af3bda9f00d3.jpg`, alt: "Ranch vinyl siding with brick accent, Massachusetts", label: "Vinyl Siding", city: "Massachusetts" },
  { src: `${CDN}/69975cfb4c25023cb798a266.jpg`, alt: "Completed vinyl siding back view lakefront property, MA", label: "Vinyl Siding", city: "Massachusetts" },
  { src: `${CDN}/69975e328d5b5ade738385b5.jpg`, alt: "A-frame chalet exterior sheathing preparation, Massachusetts", label: "Full Siding Replacement", city: "Massachusetts" },
];

const GALLERY_FILTERS = ["All", "Vinyl Siding", "Hardie Plank", "Clapboard Siding", "Full Siding Replacement"];

const FAQS = [
  { q: "How much does siding installation cost in Massachusetts?", a: "Siding installation costs in Massachusetts typically range from $5,000 to $25,000+ depending on the size of your home, material chosen, and project complexity. We provide free on-site assessments with transparent, itemized estimates — no hidden fees or surprises." },
  { q: "How long does siding typically last?", a: "It depends on the material: vinyl siding lasts 20–40 years, Hardie Plank 30–50 years, and cedar shingles 20–40+ years with proper maintenance. With our expert installation and premium materials, your siding will provide decades of protection." },
  { q: "What is the best siding material for New England weather?", a: "For Massachusetts' harsh winters, rain, and summer heat, Hardie Plank and vinyl siding are top choices. Hardie Plank offers superior impact resistance and fire protection. Vinyl is budget-friendly and virtually maintenance-free. We'll help you choose during your free assessment." },
  { q: "Can you repair my existing siding or do I need full replacement?", a: "It depends on the damage extent. Minor cracks, loose panels, or isolated rot can often be repaired. Widespread damage, mold, or structural issues may warrant full replacement. We'll evaluate on-site and give you an honest recommendation." },
  { q: "Do you offer warranties on your work?", a: "Yes. All installations come with manufacturer material warranties plus our workmanship guarantee. We stand behind every project because our reputation depends on your satisfaction." },
  { q: "How long does a siding installation project take?", a: "Most residential projects take 1–3 weeks depending on home size and weather conditions. We work efficiently while maintaining the highest quality standards and will provide a realistic timeline during your free assessment." },
];

const SERVICE_AREAS = [
  { name: "Marlborough, MA", slug: "marlborough" },
  { name: "Hudson, MA", slug: "hudson" },
  { name: "Framingham, MA", slug: "framingham" },
  { name: "Westborough, MA", slug: "westborough" },
  { name: "Northborough, MA", slug: "northborough" },
  { name: "Shrewsbury, MA", slug: "shrewsbury" },
  { name: "Natick, MA", slug: "natick" },
  { name: "Sudbury, MA", slug: "sudbury" },
  { name: "Hopkinton, MA", slug: "hopkinton" },
  { name: "Milford, MA", slug: "milford" },
  { name: "Grafton, MA", slug: "grafton" },
  { name: "Concord, MA", slug: "concord" },
  { name: "Wellesley, MA", slug: "wellesley" },
  { name: "Needham, MA", slug: "needham" },
  { name: "Worcester, MA", slug: "worcester" },
  { name: "Holden, MA", slug: "holden" },
  { name: "Lexington, MA", slug: "lexington" },
  { name: "Newton, MA", slug: "newton" },
  { name: "Quincy, MA", slug: "quincy" },
  { name: "Cambridge, MA", slug: "cambridge" },
];

const REVIEWS = [
  { name: "Michael T.", location: "Hudson, MA", text: "Wolf's Siding did an amazing job on our vinyl siding installation. The crew was professional, kept the site clean, and communicated at every step. Our neighbors keep complimenting the transformation. Ezequias truly cares about quality!", rating: 5 },
  { name: "Sarah K.", location: "Northborough, MA", text: "Ezequias and his team replaced all the cedar siding on our colonial home. The attention to detail was incredible — every corner, every trim piece was perfect. Our house looks brand new and we feel confident it's protected for years.", rating: 5 },
  { name: "David R.", location: "Marlborough, MA", text: "Best siding contractor in Massachusetts, hands down. Fair pricing, quality Hardie Plank materials, and the crew was respectful and efficient. They finished ahead of schedule and the result exceeded our expectations!", rating: 5 },
];

const PROCESS_STEPS = [
  { num: "01", title: "Free Consultation", desc: "Contact us for a no-obligation consultation. We'll discuss your goals, budget, and timeline for your siding project.", icon: <PhoneIcon className="w-6 h-6" /> },
  { num: "02", title: "On-Site Assessment", desc: "We visit your home, evaluate the current exterior condition, take precise measurements, and recommend the best materials.", icon: <HomeModernIcon className="w-6 h-6" /> },
  { num: "03", title: "Detailed Proposal", desc: "Receive a transparent, itemized estimate with material options, project timeline, and warranty details — no hidden costs.", icon: <CurrencyIcon className="w-6 h-6" /> },
  { num: "04", title: "Expert Installation", desc: "Our skilled crew installs your new siding with precision, keeps a clean jobsite, and delivers a final walkthrough for your approval.", icon: <WrenchScrewdriverIcon className="w-6 h-6" /> },
];

/* ════════════════════════════════════════════════════════════
   SERVICE ICON RESOLVER
   ════════════════════════════════════════════════════════════ */
function ServiceIcon({ name, className = "w-6 h-6" }: { name: string; className?: string }) {
  switch (name) {
    case "squares": return <SquaresIcon className={className} />;
    case "home": return <HomeModernIcon className={className} />;
    case "shield": return <ShieldCheckIcon className={className} />;
    case "wrench": return <WrenchScrewdriverIcon className={className} />;
    case "swatch": return <SwatchIcon className={className} />;
    case "tree": return <TreeIcon className={className} />;
    case "sparkles": return <SparklesIcon className={className} />;
    default: return <SquaresIcon className={className} />;
  }
}

/* ════════════════════════════════════════════════════════════
   MAIN PAGE COMPONENT
   ════════════════════════════════════════════════════════════ */

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [galleryFilter, setGalleryFilter] = useState("All");

  /* Scroll listener for header */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = useCallback(() => setMobileMenuOpen(false), []);

  /* Intersection observer for scroll animations */
  const observerRef = useRef<IntersectionObserver | null>(null);
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up");
            entry.target.classList.remove("opacity-0");
            observerRef.current?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    const els = document.querySelectorAll(".scroll-animate");
    els.forEach((el) => observerRef.current?.observe(el));
    return () => observerRef.current?.disconnect();
  }, [galleryFilter]);

  /* Filtered gallery images */
  const filteredImages =
    galleryFilter === "All"
      ? PROJECT_IMAGES
      : PROJECT_IMAGES.filter((img) => img.label === galleryFilter);

  return (
    <>
      {/* ═══════════════════════════════════════════════════════
          1. HEADER — Two-tier (RS model: top bar + main nav)
          ═══════════════════════════════════════════════════════ */}

      {/* TOP BAR — info strip (RS model: gold bar → our red bar) */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-[#E00000] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-10 text-sm">
            {/* Left — location */}
            <div className="hidden sm:flex items-center gap-4">
              <span className="flex items-center gap-1.5 font-medium">
                <MapPinIcon className="w-3.5 h-3.5" />
                Serving Northborough, Massachusetts
              </span>
              <span className="hidden md:flex items-center gap-1.5">
                <EnvelopeIcon className="w-3.5 h-3.5" />
                info@wolfs-siding.com
              </span>
            </div>
            {/* Mobile left — compact */}
            <span className="flex sm:hidden items-center gap-1.5 text-xs font-medium">
              <MapPinIcon className="w-3 h-3" />
              Northborough, MA
            </span>
            {/* Right — phone */}
            <a href="tel:+17744841895" className="flex items-center gap-1.5 font-bold hover:text-white/90 transition-colors">
              <PhoneIcon className="w-3.5 h-3.5" />
              (774) 484-1895
            </a>
          </div>
        </div>
      </div>

      {/* MAIN NAV — white/light bg so logo is visible (RS model) */}
      <header
        className={`fixed top-10 left-0 right-0 z-50 transition-all duration-300 bg-white ${
          scrolled ? "shadow-xl" : "shadow-md"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[70px]">
            {/* Logo */}
            <a href="#home" className="flex-shrink-0" title="Wolf's Siding Inc. - Home">
              <Image
                src="/logo.png"
                alt="Wolf's Siding Inc. Logo — Siding Contractor Massachusetts"
                width={160}
                height={50}
                className="h-12 w-auto"
              />
            </a>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-6">
              <a href="#home" className="text-sm font-semibold text-[#333] hover:text-[#E00000] transition-colors">Home</a>

              {/* Services dropdown */}
              <div className="relative group">
                <button type="button" className="flex items-center gap-1 text-sm font-semibold text-[#333] hover:text-[#E00000] transition-colors">
                  Services
                  <svg className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
                </button>
                <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="bg-white rounded-xl shadow-xl border border-gray-100 py-2 w-64">
                    {SIDING_SERVICES.map((s) => (
                      <Link
                        key={s.slug}
                        href={`/services/${s.slug}`}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-[#E00000]/5 transition-colors"
                      >
                        <div className="w-8 h-8 bg-[#E00000]/10 rounded-lg flex items-center justify-center">
                          <svg className="w-4 h-4 text-[#E00000]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>
                        </div>
                        <span className="text-sm font-semibold text-[#333]">{s.shortName}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <a href="/projects" className="text-sm font-semibold text-[#333] hover:text-[#E00000] transition-colors">Projects</a>
              <a href="#service-area" className="text-sm font-semibold text-[#333] hover:text-[#E00000] transition-colors">Areas</a>
              <Link href="/blog" className="text-sm font-semibold text-[#333] hover:text-[#E00000] transition-colors">Blog</Link>
              <a href="#contact" className="text-sm font-semibold text-[#333] hover:text-[#E00000] transition-colors">Contact</a>
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href="tel:+17744841895"
                className="flex items-center gap-2 text-sm font-semibold text-[#333333] hover:text-[#E00000] transition-colors"
              >
                <PhoneIcon className="w-4 h-4 text-[#E00000]" />
                (774) 484-1895
              </a>
              <a
                href="#contact"
                className="bg-[#E00000] hover:bg-[#CC0000] text-white px-6 py-2.5 rounded-lg text-sm font-bold transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-red-900/30"
              >
                Free Estimate
              </a>
            </div>

            {/* Mobile */}
            <div className="flex lg:hidden items-center gap-3">
              <a
                href="tel:+17744841895"
                className="inline-flex items-center gap-1.5 bg-[#E00000] hover:bg-[#CC0000] text-white px-3 py-2 rounded-lg text-xs font-bold transition-all"
              >
                <PhoneIcon className="w-3.5 h-3.5" />
                Call Now
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-[#333333]"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <XMarkIcon /> : <MenuIcon />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 bg-white mobile-menu-enter">
            <div className="px-4 py-4 space-y-1">
              <a href="#home" onClick={handleNavClick} className="block px-4 py-3 rounded-lg text-sm font-semibold text-[#333] hover:bg-[#E00000]/5">Home</a>
              <div className="px-4 py-2 text-xs font-bold text-[#E00000] uppercase tracking-wider">Services</div>
              {SIDING_SERVICES.map((s) => (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  onClick={handleNavClick}
                  className="block px-6 py-2.5 rounded-lg text-sm text-[#333] hover:bg-[#E00000]/5"
                >
                  {s.shortName}
                </Link>
              ))}
              <a href="/projects" onClick={handleNavClick} className="block px-4 py-3 rounded-lg text-sm font-semibold text-[#333] hover:bg-[#E00000]/5">Projects</a>
              <a href="#service-area" onClick={handleNavClick} className="block px-4 py-3 rounded-lg text-sm font-semibold text-[#333] hover:bg-[#E00000]/5">Areas</a>
              <Link href="/blog" onClick={handleNavClick} className="block px-4 py-3 rounded-lg text-sm font-semibold text-[#333] hover:bg-[#E00000]/5">Blog</Link>
              <a href="#contact" onClick={handleNavClick} className="block px-4 py-3 rounded-lg text-sm font-semibold text-[#333] hover:bg-[#E00000]/5">Contact</a>
              <a href="tel:+17744841895" className="flex items-center justify-center gap-2 mt-3 bg-[#E00000] text-white px-6 py-3 rounded-lg text-sm font-bold">
                <PhoneIcon className="w-4 h-4" />
                Call (774) 484-1895
              </a>
            </div>
          </div>
        )}
      </header>

      <main>
        {/* ═══════════════════════════════════════════════════════
            2. HERO — Full-screen, 2 columns (RS model)
            ═══════════════════════════════════════════════════════ */}
        <section id="home" className="relative min-h-[70vh] lg:min-h-screen flex items-center pt-[110px]">
          {/* BG image + overlay */}
          <div className="absolute inset-0 z-0">
            <Image
              src="https://storage.googleapis.com/msgsndr/BCczy6muFwhd63dPhKCC/media/69309a3e4d01f3e2eea4a8f1.png"
              alt="Professional siding installation on Massachusetts home by Wolf's Siding Inc."
              fill
              className="object-cover object-[center_30%]"
              priority
              sizes="100vw"
              quality={60}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/85 to-black/70" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 w-full">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left — Content */}
              <div>
                {/* Badges row (RS pattern) */}
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <span className="inline-flex items-center gap-2 bg-[#E00000] text-white text-xs font-bold px-4 py-2 rounded-full">
                    <MapPinIcon className="w-3.5 h-3.5" />
                    Serving 20+ MA Cities
                  </span>
                  <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm text-white text-xs font-semibold px-4 py-2 rounded-full border border-white/20">
                    <StarIcon className="w-3.5 h-3.5 text-yellow-400" />
                    5.0 (22 Reviews)
                  </span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-black text-white leading-[1.1] tracking-tight mb-6">
                  Professional{" "}
                  <span className="text-[#E00000]">Siding Installation</span>{" "}
                  &amp; Exterior Contractor in Massachusetts
                </h1>

                <p className="text-lg text-[#F5F5F5]/85 mb-8 leading-relaxed max-w-xl">
                  Is your home showing <strong className="text-white">water stains</strong>,{" "}
                  <strong className="text-white">peeling paint</strong>,{" "}
                  <strong className="text-white">rotting wood</strong>, or{" "}
                  <strong className="text-white">rising energy bills</strong>? Wolf&apos;s Siding Inc.
                  delivers premium siding solutions with <strong className="text-white">18+ years of expert craftsmanship</strong> across
                  Massachusetts.
                </p>

                {/* CTAs (RS pattern: primary + outline) */}
                <div className="flex flex-col sm:flex-row gap-4 mb-10">
                  <a
                    href="tel:+17744841895"
                    className="inline-flex items-center justify-center gap-2 bg-[#E00000] hover:bg-[#CC0000] text-white px-8 py-4 rounded-lg text-lg font-bold transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-red-900/40"
                  >
                    <PhoneIcon className="w-5 h-5" />
                    (774) 484-1895
                  </a>
                  <a
                    href="#contact"
                    className="inline-flex items-center justify-center gap-2 border-2 border-white/30 text-white hover:bg-white hover:text-black px-8 py-4 rounded-lg text-lg font-bold transition-all duration-300"
                  >
                    Get Free Estimate
                  </a>
                </div>

                {/* Trust badges row (RS pattern) */}
                <div className="flex flex-wrap gap-6">
                  {[
                    { icon: <ShieldCheckIcon className="w-5 h-5" />, text: "Licensed & Insured" },
                    { icon: <ClockIcon className="w-5 h-5" />, text: "Same Day Response" },
                    { icon: <CurrencyIcon className="w-5 h-5" />, text: "Free Estimates" },
                  ].map((badge) => (
                    <div key={badge.text} className="flex items-center gap-2 text-white/80 text-sm">
                      <span className="text-[#E00000]">{badge.icon}</span>
                      <span className="font-medium">{badge.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right — GHL form iframe only, no wrapper */}
              <div>
                <LazyIframe
                  src="https://api.leadconnectorhq.com/widget/form/altG7jV8Jt79wwRd8WbH"
                  className="form-iframe"
                  id="inline-altG7jV8Jt79wwRd8WbH"
                  data-form-name="FORMULARIO WEBSITE"
                  data-height="558"
                  title="Wolf's Siding Free Quote Form"
                  eager
                />
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            3. GOOGLE REVIEWS BAR (RS model)
            ═══════════════════════════════════════════════════════ */}
        <div className="bg-black border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <a
              href="https://g.page/r/CfACa1fxiHsqEAE/review"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 py-4 group"
            >
              {/* Google "G" */}
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              <span className="text-white/90 text-sm font-medium">Google Reviews</span>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="w-4 h-4 text-yellow-400" />
                ))}
              </div>
              <span className="text-white font-bold text-sm">5.0</span>
              <span className="text-white/70 text-sm">(22 reviews)</span>
              <span className="text-[#FF4444] text-sm font-semibold group-hover:underline flex items-center gap-1">
                See Our Reviews <ExternalLinkIcon className="w-3.5 h-3.5" />
              </span>
            </a>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════
            4. SERVICES SECTION (RS model: image cards + featured)
            ═══════════════════════════════════════════════════════ */}
        <section id="services" className="py-20 lg:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section header */}
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-black mb-4 leading-tight">
                Our <span className="text-[#E00000]">Services</span>
              </h2>
              <div className="w-20 h-1 bg-[#E00000] mx-auto mb-6 rounded-full" />
              <p className="text-[#333333] text-lg max-w-2xl mx-auto">
                From vinyl siding to premium cedar shingles, we deliver expert installation
                tailored to your home, budget, and the demanding Massachusetts climate.
              </p>
            </div>

            {/* Service cards grid (RS model: 3 cols with image, overlay, icon circle) */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {SERVICES.map((service) => (
                <div
                  key={service.slug}
                  className={`service-card group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 scroll-animate opacity-0 ${
                    service.featured ? "ring-2 ring-[#E00000]" : ""
                  } ${SERVICES.indexOf(service) === 6 ? "md:col-span-2 lg:col-span-1" : ""}`}
                >
                  {/* Featured badge */}
                  {service.featured && (
                    <div className="absolute top-4 right-4 z-10 bg-[#E00000] text-white text-xs font-bold px-3 py-1 rounded-full">
                      Featured Service
                    </div>
                  )}

                  {/* Image with gradient overlay */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={service.image}
                      alt={`${service.title} in Massachusetts — Wolf's Siding Inc.`}
                      fill
                      className="object-cover service-img transition-transform duration-500"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  </div>

                  {/* Icon circle (overlapping image boundary — RS pattern) */}
                  <div className="relative px-6 pb-6">
                    <div className="w-14 h-14 bg-[#E00000] rounded-full flex items-center justify-center text-white shadow-lg -mt-7 mb-4 relative z-10">
                      <ServiceIcon name={service.icon} />
                    </div>
                    <h3 className={`text-xl font-bold mb-3 ${service.featured ? "text-[#E00000]" : "text-black"}`}>
                      {service.title}
                    </h3>
                    <p className="text-[#333333] text-sm leading-relaxed mb-5">
                      {service.description}
                    </p>
                    <Link
                      href={`/services/${service.slug}`}
                      className="inline-flex items-center gap-2 text-[#E00000] font-semibold text-sm group/link"
                    >
                      {service.cta}
                      <ArrowRightIcon className="w-4 h-4 transition-transform duration-200 group-hover/link:translate-x-1" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            5. ABOUT — Dark bg (RS model)
            ═══════════════════════════════════════════════════════ */}
        <section id="about" className="py-20 lg:py-28 bg-[#111111]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Text column */}
              <div className="scroll-animate opacity-0">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4 leading-tight">
                  About <span className="text-[#E00000]">Wolf&apos;s Siding Inc.</span>
                </h2>
                <div className="w-20 h-1 bg-[#E00000] rounded-full mb-8" />

                <div className="space-y-5 text-white/80 text-base leading-relaxed">
                  <p>
                    Founded by <strong className="text-[#E00000]">Ezequias Lobo</strong>,
                    Wolf&apos;s Siding Inc. has been transforming homes across Massachusetts with
                    premium <strong className="text-white">siding installation</strong>,{" "}
                    <strong className="text-white">replacement</strong>, and{" "}
                    <strong className="text-white">exterior remodeling</strong> services.
                  </p>
                  <p>
                    With <strong className="text-white">18+ years of industry experience</strong>,
                    Ezequias personally oversees every project — from the initial assessment to the
                    final walkthrough. He believes that great work starts with listening to the
                    homeowner and delivering solutions that exceed expectations.
                  </p>
                  <p>
                    Based in <strong className="text-white">Northborough, MA</strong>, our skilled
                    crew serves homeowners across the MetroWest region, Worcester County, and beyond.
                    Whether it&apos;s a small trim repair or a full siding replacement, you get the same
                    dedication, transparency, and craftsmanship on every job.
                  </p>
                </div>

                {/* Stats grid (RS pattern: 2x2) */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10">
                  {[
                    { number: "20+", label: "MA Cities Served" },
                    { number: "22+", label: "5-Star Reviews" },
                    { number: "100%", label: "Licensed & Insured" },
                    { number: "24hr", label: "Response Time" },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                      <div className="text-3xl font-black text-[#E00000]">{stat.number}</div>
                      <div className="text-xs text-white/60 font-medium mt-1">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Image column (RS pattern: photo with floating badge) */}
              <div className="relative scroll-animate opacity-0">
                <div className="rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="https://storage.googleapis.com/msgsndr/BCczy6muFwhd63dPhKCC/media/68e581d6416ab711d774e6cf.jpeg"
                    alt="Ezequias Lobo — Owner of Wolf's Siding Inc., Massachusetts siding contractor with 18+ years experience"
                    width={600}
                    height={750}
                    className="w-full h-auto object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                {/* Floating badge (RS pattern) */}
                <div className="absolute -bottom-6 -left-4 sm:left-6 bg-[#E00000] text-white rounded-2xl px-6 py-4 shadow-xl">
                  <div className="flex items-center gap-3">
                    <ShieldCheckIcon className="w-8 h-8" />
                    <div>
                      <p className="font-bold text-sm">Trusted Contractor</p>
                      <p className="text-xs text-white/80">18+ Years Experience</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            6. OUR PROCESS (RS model: 4 numbered steps)
            ═══════════════════════════════════════════════════════ */}
        <section className="py-20 lg:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 scroll-animate opacity-0">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-black mb-4 leading-tight">
                Our <span className="text-[#E00000]">Process</span>
              </h2>
              <div className="w-20 h-1 bg-[#E00000] mx-auto mb-6 rounded-full" />
              <p className="text-[#333333] text-lg max-w-2xl mx-auto">
                From your first call to the final walkthrough, here&apos;s how we deliver a seamless siding experience.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {PROCESS_STEPS.map((step, i) => (
                <div
                  key={step.num}
                  className={`relative bg-[#F5F5F5] rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 scroll-animate opacity-0 delay-${(i + 1) * 100}`}
                >
                  {/* Watermark number (RS pattern) */}
                  <span className="process-number">{step.num}</span>

                  {/* Icon circle */}
                  <div className="w-14 h-14 bg-[#E00000] rounded-full flex items-center justify-center text-white mb-5 relative z-10">
                    {step.icon}
                  </div>

                  <h3 className="text-lg font-bold text-black mb-3">{step.title}</h3>
                  <p className="text-[#333333] text-sm leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            7. SIDING IN MASSACHUSETTS — SEO content + Why Choose
            ═══════════════════════════════════════════════════════ */}
        <section className="py-20 lg:py-28 bg-[#F5F5F5]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 scroll-animate opacity-0">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-black mb-4 leading-tight">
                Expert <span className="text-[#E00000]">Siding</span> in Massachusetts
              </h2>
              <div className="w-20 h-1 bg-[#E00000] mx-auto mb-6 rounded-full" />
            </div>

            {/* SEO content (RS pattern: featured block + grid) */}
            <div className="grid lg:grid-cols-5 gap-8 mb-16">
              {/* Featured block */}
              <div className="lg:col-span-3 bg-white rounded-2xl shadow-lg overflow-hidden scroll-animate opacity-0">
                <div className="grid md:grid-cols-2">
                  <div className="relative h-64 md:h-auto">
                    <Image
                      src="https://storage.googleapis.com/msgsndr/BCczy6muFwhd63dPhKCC/media/69309a3e0b0f9d2be96c92ab.png"
                      alt="Premium siding installation project in Massachusetts by Wolf's Siding Inc."
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-8">
                    <span className="inline-block bg-[#E00000]/10 text-[#E00000] text-xs font-bold px-3 py-1 rounded-full mb-4">
                      Our Specialty
                    </span>
                    <h3 className="text-xl font-bold text-black mb-4">
                      Why Massachusetts Homes Need Quality Siding
                    </h3>
                    <p className="text-[#333333] text-sm leading-relaxed mb-4">
                      New England&apos;s brutal winters, driving rain, and intense summer heat can wreak
                      havoc on unprotected exteriors — leading to water infiltration, mold growth,
                      energy loss, and plummeting property values.
                    </p>
                    <p className="text-[#333333] text-sm leading-relaxed">
                      Wolf&apos;s Siding Inc. delivers customized solutions with <strong>premium materials</strong> engineered
                      to withstand the toughest conditions, backed by <strong>18+ years of expert craftsmanship</strong>.
                    </p>
                  </div>
                </div>
              </div>

              {/* Why Choose grid (RS pattern: stacked cards) */}
              <div className="lg:col-span-2 grid gap-4 scroll-animate opacity-0">
                {[
                  { icon: <ClockIcon className="w-6 h-6" />, title: "18+ Years Experience", desc: "Nearly two decades of siding expertise across Massachusetts." },
                  { icon: <SparklesIcon className="w-6 h-6" />, title: "Premium Materials", desc: "Weather-tested materials from trusted manufacturers." },
                  { icon: <HandThumbUpIcon className="w-6 h-6" />, title: "Free On-Site Assessment", desc: "No-pressure evaluation and honest estimate." },
                  { icon: <UsersIcon className="w-6 h-6" />, title: "Clean Jobsite Guarantee", desc: "We respect your property — spotless when done." },
                ].map((card) => (
                  <div key={card.title} className="bg-white rounded-xl p-5 flex items-start gap-4 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
                    <div className="w-12 h-12 bg-[#E00000] rounded-full flex items-center justify-center text-white flex-shrink-0">
                      {card.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-black text-sm mb-1">{card.title}</h4>
                      <p className="text-[#333333] text-xs leading-relaxed">{card.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            7b. TRUSTED BRANDS
            ═══════════════════════════════════════════════════════ */}
        <section className="py-16 lg:py-20 bg-white border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 scroll-animate opacity-0">
              <h2 className="text-2xl sm:text-3xl font-black text-black mb-3 leading-tight">
                Trusted <span className="text-[#E00000]">Brands</span> We Work With
              </h2>
              <div className="w-16 h-1 bg-[#E00000] mx-auto mb-4 rounded-full" />
              <p className="text-[#333]/70 text-sm max-w-xl mx-auto">
                We install and service products from the industry&apos;s leading manufacturers.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 items-center scroll-animate opacity-0">
              {[
                { src: `${CDN}/689a45c288c2d695b1b12618.webp`, alt: "James Hardie siding products" },
                { src: `${CDN}/689a45c288c2d63dfcb125e1.webp`, alt: "CertainTeed siding by Saint-Gobain" },
                { src: `${CDN}/689a45c26bdead1e8a0135f4.webp`, alt: "Pella windows and doors" },
                { src: `${CDN}/689a45c26bdeadd6b40135f3.webp`, alt: "Ply Gem windows" },
                { src: `${CDN}/689a45c2924ed980d5157631.webp`, alt: "Andersen windows and doors" },
                { src: `${CDN}/689a45c2924ed967cd157632.webp`, alt: "ProVia entry doors and siding" },
                { src: `${CDN}/689a45c2924ed90be6157633.webp`, alt: "Harvey windows and doors" },
                { src: `${CDN}/689a45c28192733045c0173e.webp`, alt: "AZEK Building Products" },
                { src: `${CDN}/689a45c206592d8e44ebceb9.webp`, alt: "Simonton windows and doors" },
                { src: `${CDN}/689a45c206592d0462ebceba.webp`, alt: "Alside siding and windows" },
              ].map((brand) => (
                <div key={brand.alt} className="flex items-center justify-center p-4 bg-[#F5F5F5] rounded-xl hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 h-20">
                  <Image
                    src={brand.src}
                    alt={brand.alt}
                    width={140}
                    height={50}
                    className="max-h-10 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            8. PROJECTS GALLERY (RS model: filter tabs)
            ═══════════════════════════════════════════════════════ */}
        <section id="projects" className="py-20 lg:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 scroll-animate opacity-0">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-black mb-4 leading-tight">
                Our Work <span className="text-[#E00000]">Gallery</span>
              </h2>
              <div className="w-20 h-1 bg-[#E00000] mx-auto mb-6 rounded-full" />
              <p className="text-[#333333] text-lg max-w-2xl mx-auto">
                Browse our recent siding installations and exterior transformations across Massachusetts.
              </p>
            </div>

            {/* Filter buttons (RS pattern) */}
            <div className="flex flex-wrap justify-center gap-2 mb-10 scroll-animate opacity-0">
              {GALLERY_FILTERS.map((filter) => (
                <button
                  type="button"
                  key={filter}
                  onClick={() => setGalleryFilter(filter)}
                  className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                    galleryFilter === filter
                      ? "bg-[#E00000] text-white shadow-lg shadow-red-900/20"
                      : "bg-[#F5F5F5] text-[#333333] hover:bg-[#E00000]/10 hover:text-[#E00000]"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            {/* Gallery grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredImages.map((img) => (
                <div
                  key={img.src}
                  className="gallery-item group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 scroll-animate opacity-0"
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={600}
                    height={450}
                    className="w-full h-64 sm:h-72 object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                  {/* Gradient overlay (RS pattern) */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  {/* Bottom label */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <p className="text-white font-bold text-base">{img.label}</p>
                    <p className="text-white/70 text-sm">{img.city}</p>
                  </div>
                  {/* Hover full overlay */}
                  <div className="gallery-overlay absolute inset-0 bg-[#E00000]/85 flex items-center justify-center opacity-0 transition-opacity duration-300">
                    <div className="text-center text-white px-4">
                      <p className="text-xl font-bold">{img.label}</p>
                      <p className="text-sm mt-1 text-white/80">{img.city}</p>
                      <div className="w-10 h-0.5 bg-white mx-auto mt-3 mb-2 rounded-full" />
                      <p className="text-xs text-white/70">Wolf&apos;s Siding Inc.</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* View All Projects button */}
            <div className="text-center mt-10 scroll-animate opacity-0">
              <a
                href="/projects"
                className="inline-flex items-center gap-2 bg-[#E00000] hover:bg-[#CC0000] text-white px-8 py-3.5 rounded-lg text-sm font-bold transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-red-900/30"
              >
                View All Projects
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
              </a>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            9. REVIEWS (RS model: dark bg + google badge)
            ═══════════════════════════════════════════════════════ */}
        <section id="reviews" className="py-20 lg:py-28 bg-[#111111]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 scroll-animate opacity-0">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4 leading-tight">
                What Our <span className="text-[#E00000]">Customers</span> Say
              </h2>
              <div className="w-20 h-1 bg-[#E00000] mx-auto mb-8 rounded-full" />

              {/* Google badge (RS pattern) */}
              <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/10">
                <svg className="w-6 h-6" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} className="w-5 h-5 text-yellow-400" />
                  ))}
                </div>
                <span className="text-white font-bold">5.0</span>
                <span className="text-white/50 text-sm">(22 Reviews)</span>
              </div>
            </div>

            {/* Review cards */}
            <div className="grid md:grid-cols-3 gap-6">
              {REVIEWS.map((review, i) => (
                <div
                  key={review.name}
                  className={`bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1 scroll-animate opacity-0 delay-${(i + 1) * 100}`}
                >
                  <div className="flex mb-4">
                    {[...Array(review.rating)].map((_, j) => (
                      <StarIcon key={j} className="w-5 h-5 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-white/90 text-base leading-relaxed mb-6">
                    &ldquo;{review.text}&rdquo;
                  </p>
                  <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                    <div className="w-10 h-10 rounded-full bg-[#E00000] flex items-center justify-center text-white font-bold text-sm">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm">{review.name}</p>
                      <p className="text-white/50 text-xs">{review.location}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12 scroll-animate opacity-0">
              <a
                href="https://g.page/r/CfACa1fxiHsqEAE/review"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#E00000] hover:bg-[#CC0000] text-white px-8 py-4 rounded-lg text-lg font-bold transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-red-900/30"
              >
                Read All Reviews on Google
                <ExternalLinkIcon className="w-5 h-5" />
              </a>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            10. FAQ ACCORDION
            ═══════════════════════════════════════════════════════ */}
        <section id="faq" className="py-20 lg:py-28 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 scroll-animate opacity-0">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-black mb-4 leading-tight">
                Frequently Asked <span className="text-[#E00000]">Questions</span>
              </h2>
              <div className="w-20 h-1 bg-[#E00000] mx-auto mb-6 rounded-full" />
            </div>

            <div className="space-y-4">
              {FAQS.map((faq, i) => (
                <div
                  key={i}
                  className="bg-[#F5F5F5] rounded-2xl overflow-hidden border border-transparent hover:border-[#E00000]/20 transition-colors scroll-animate opacity-0"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="flex items-center justify-between w-full p-6 text-left"
                  >
                    <span className="text-base sm:text-lg font-bold text-black pr-4">{faq.q}</span>
                    <ChevronDownIcon
                      className={`w-6 h-6 text-[#E00000] flex-shrink-0 transition-transform duration-300 ${
                        openFaq === i ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <div className={`faq-content ${openFaq === i ? "open" : ""}`}>
                    <div className="px-6 pb-6">
                      <p className="text-[#333333] leading-relaxed">{faq.a}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            11. SERVICE AREAS — Internal backlinks
            ═══════════════════════════════════════════════════════ */}
        <section id="service-area" className="py-20 lg:py-28 bg-[#F5F5F5]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 scroll-animate opacity-0">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-black mb-4 leading-tight">
                Serving <span className="text-[#E00000]">110+ Cities</span> Across Massachusetts
              </h2>
              <div className="w-20 h-1 bg-[#E00000] mx-auto mb-6 rounded-full" />
              <p className="text-[#333333] text-lg max-w-2xl mx-auto">
                Wolf&apos;s Siding Inc. provides expert siding installation, repair, and replacement services
                throughout Massachusetts. Find siding services near you.
              </p>
            </div>

            {/* Featured cities grid */}
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-10">
              {SERVICE_AREAS_ALL.slice(0, 20).map((city) => (
                <Link
                  key={city.slug}
                  href={`/${city.slug}`}
                  className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 scroll-animate opacity-0 group"
                >
                  <div className="w-8 h-8 bg-[#E00000]/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-[#E00000] transition-colors">
                    <MapPinIcon className="w-4 h-4 text-[#E00000] group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-black group-hover:text-[#E00000] transition-colors">{city.name}</span>
                    <span className="block text-[10px] text-[#333]/50">Siding Services</span>
                  </div>
                </Link>
              ))}
            </div>

            {/* All cities expandable */}
            <div className="bg-white rounded-2xl p-6 shadow-sm scroll-animate opacity-0">
              <h3 className="text-sm font-bold text-[#333] mb-4 flex items-center gap-2">
                <MapPinIcon className="w-4 h-4 text-[#E00000]" />
                All {SERVICE_AREAS_ALL.length}+ Service Areas
              </h3>
              <div className="flex flex-wrap gap-x-1 gap-y-1">
                {SERVICE_AREAS_ALL.map((c, i) => (
                  <span key={c.slug} className="text-xs">
                    <Link href={`/${c.slug}`} className="text-[#333]/70 hover:text-[#E00000] transition-colors">{c.name}</Link>
                    {i < SERVICE_AREAS_ALL.length - 1 && <span className="mx-1 text-[#333]/30">&middot;</span>}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            11b. BLOG / SIDING TIPS
            ═══════════════════════════════════════════════════════ */}
        <section className="py-20 lg:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 scroll-animate opacity-0">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-black mb-4 leading-tight">
                Siding Tips & <span className="text-[#E00000]">Guides</span>
              </h2>
              <div className="w-20 h-1 bg-[#E00000] mx-auto mb-6 rounded-full" />
              <p className="text-[#333]/70 max-w-2xl mx-auto">
                Expert advice to help Massachusetts homeowners make informed decisions about their home&apos;s exterior.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {BLOG_POSTS.slice(0, 6).map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 scroll-animate opacity-0">
                  <div className="relative aspect-[16/9]">
                    <Image src={post.heroImage} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 640px) 100vw, 33vw" />
                    <div className="absolute top-3 left-3">
                      <span className="bg-[#E00000] text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">{post.category}</span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-black text-sm mb-2 group-hover:text-[#E00000] transition-colors line-clamp-2">{post.title}</h3>
                    <p className="text-xs text-[#333]/70 line-clamp-2 mb-3">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-[#333]/50 font-medium">{post.readTime}</span>
                      <span className="inline-flex items-center gap-1 text-[#E00000] text-xs font-semibold">
                        Read More
                        <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="text-center mt-10 scroll-animate opacity-0">
              <Link href="/blog" className="inline-flex items-center gap-2 bg-black hover:bg-[#1A1A1A] text-white px-8 py-4 rounded-xl font-bold transition-all hover:scale-105">
                View All Articles
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
              </Link>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            12. CONTACT + MAP (RS model: colored form bg + info boxes)
            ═══════════════════════════════════════════════════════ */}
        <section id="contact" className="py-20 lg:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 scroll-animate opacity-0">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-black mb-4 leading-tight">
                Get Your <span className="text-[#E00000]">Free Estimate</span> Today
              </h2>
              <div className="w-20 h-1 bg-[#E00000] mx-auto mb-6 rounded-full" />
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Left — Form with red bg (RS pattern: gold bg form) */}
              <div className="scroll-animate opacity-0">
                <LazyIframe
                  src="https://api.leadconnectorhq.com/widget/form/altG7jV8Jt79wwRd8WbH"
                  className="form-iframe"
                  id="inline-altG7jV8Jt79wwRd8WbH-2"
                  data-form-name="FORMULARIO WEBSITE"
                  data-height="558"
                  title="Wolf's Siding Contact Form"
                />
              </div>

              {/* Right — Contact info blocks (RS pattern: stacked boxes) */}
              <div className="space-y-6 scroll-animate opacity-0">
                {/* Direct contact box */}
                <div className="bg-black rounded-2xl p-8 text-white">
                  <h3 className="font-bold text-lg mb-6">Direct Contact</h3>
                  <div className="space-y-5">
                    {/* Phone */}
                    <a href="tel:+17744841895" className="flex items-center gap-4 group">
                      <div className="w-12 h-12 bg-[#E00000] rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <PhoneIcon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-white/60 text-xs">Phone</p>
                        <p className="text-white font-bold text-lg">(774) 484-1895</p>
                      </div>
                    </a>
                    {/* Address */}
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#E00000] rounded-full flex items-center justify-center flex-shrink-0">
                        <MapPinIcon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-white/60 text-xs">Address</p>
                        <p className="text-white font-semibold">156 Washburn St, Northborough, MA 01532</p>
                      </div>
                    </div>
                    {/* Hours */}
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#E00000] rounded-full flex items-center justify-center flex-shrink-0">
                        <ClockIcon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-white/60 text-xs">Business Hours</p>
                        <p className="text-white font-semibold">Mon–Fri 7AM–6PM | Sat 8AM–2PM</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Trust badges grid (RS pattern: 2x2 trust icons) */}
                <div className="bg-[#F5F5F5] rounded-2xl p-6">
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { icon: <ShieldCheckIcon className="w-6 h-6" />, text: "Licensed & Insured" },
                      { icon: <ClockIcon className="w-6 h-6" />, text: "24hr Response" },
                      { icon: <CurrencyIcon className="w-6 h-6" />, text: "Free Estimates" },
                      { icon: <HandThumbUpIcon className="w-6 h-6" />, text: "5-Star Rated" },
                    ].map((badge) => (
                      <div key={badge.text} className="flex items-center gap-3 bg-white rounded-xl p-4">
                        <div className="w-10 h-10 bg-[#E00000] rounded-full flex items-center justify-center text-white flex-shrink-0">
                          {badge.icon}
                        </div>
                        <span className="text-sm font-semibold text-black">{badge.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Social links (RS pattern) */}
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-[#333333]">Follow Us:</span>
                  <a
                    href="https://www.instagram.com/wolfs_siding_inc/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-[#E00000] rounded-full flex items-center justify-center text-white hover:bg-black transition-colors"
                    aria-label="Instagram"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
                  </a>
                  <a
                    href="https://www.facebook.com/wolfsiding"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-[#E00000] rounded-full flex items-center justify-center text-white hover:bg-black transition-colors"
                    aria-label="Facebook"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                  </a>
                  <a
                    href="https://g.page/r/CfACa1fxiHsqEAE/review"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-[#E00000] rounded-full flex items-center justify-center text-white hover:bg-black transition-colors"
                    aria-label="Google Reviews"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" /><path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Google Maps (RS pattern: below contact with accent border) */}
            <div className="mt-12 rounded-2xl overflow-hidden shadow-xl border-4 border-[#E00000]/20 scroll-animate opacity-0">
              <iframe
                src="https://maps.google.com/maps?cid=3061190941863510768&output=embed"
                loading="lazy"
                width="100%"
                height="400"
                title="Wolf's Siding Inc. Location — Northborough, Massachusetts"
                className="map-iframe"
              />
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            13. CTA BANNER (RS model: accent bg full-width)
            ═══════════════════════════════════════════════════════ */}
        <section className="bg-[#E00000] py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              <div>
                <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">
                  Ready to Transform Your Home&apos;s Exterior?
                </h2>
                <p className="text-white text-lg max-w-xl">
                  Get a free on-site assessment and transparent estimate from Massachusetts&apos; trusted
                  siding professionals. No pressure, no hidden fees.
                </p>
              </div>
              <a
                href="tel:+17744841895"
                className="inline-flex items-center gap-3 bg-black hover:bg-[#1A1A1A] text-white px-10 py-5 rounded-xl text-xl font-black transition-all duration-300 hover:scale-105 hover:shadow-2xl flex-shrink-0"
              >
                <PhoneIcon className="w-6 h-6" />
                (774) 484-1895
              </a>
            </div>
          </div>
        </section>

        {/* Reviews Widget */}
        <section className="py-16 bg-[#F5F5F5]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-black text-black text-center mb-8">
              What Our Customers Say
            </h2>
            <iframe
              className="lc_reviews_widget reviews-widget"
              src="https://reputationhub.site/reputation/widgets/review_widget/BCczy6muFwhd63dPhKCC"
              frameBorder="0"
              scrolling="no"
              title="Customer Reviews"
              loading="lazy"
            />
          </div>
        </section>
      </main>

      {/* ═══════════════════════════════════════════════════════
          14. FOOTER (RS model: 4 columns, black bg)
          ═══════════════════════════════════════════════════════ */}
      <footer className="bg-black pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
            {/* Col 1: Logo + desc */}
            <div>
              <Image
                src="/logo.png"
                alt="Wolf's Siding Inc. Logo"
                width={140}
                height={44}
                className="h-10 w-auto mb-5"
              />
              <p className="text-white/70 text-sm leading-relaxed mb-5">
                Quality, Durability, and Impeccable Craftsmanship for Your Home&apos;s Exterior.
                Proudly serving Massachusetts homeowners with 18+ years of experience.
              </p>
              {/* Social */}
              <div className="flex gap-3">
                <a href="https://www.instagram.com/wolfs_siding_inc/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:bg-[#E00000] hover:text-white transition-all" aria-label="Instagram">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
                </a>
                <a href="https://www.facebook.com/wolfsiding" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:bg-[#E00000] hover:text-white transition-all" aria-label="Facebook">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                </a>
              </div>
            </div>

            {/* Col 2: Services */}
            <div>
              <h3 className="text-[#FF4444] font-bold text-sm uppercase tracking-wider mb-5">Our Services</h3>
              <ul className="space-y-3">
                {SERVICES.map((s) => (
                  <li key={s.slug}>
                    <Link href={`/services/${s.slug}`} className={`text-sm transition-colors duration-200 ${s.featured ? "text-[#FF4444] font-semibold" : "text-white/70 hover:text-[#FF4444]"}`}>
                      {s.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3: Contact */}
            <div>
              <h3 className="text-[#FF4444] font-bold text-sm uppercase tracking-wider mb-5">Contact Us</h3>
              <div className="space-y-4">
                <a href="tel:+17744841895" className="flex items-center gap-3 text-white/80 hover:text-[#E00000] transition-colors">
                  <div className="w-8 h-8 bg-[#E00000] rounded-full flex items-center justify-center flex-shrink-0">
                    <PhoneIcon className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-semibold">(774) 484-1895</span>
                </a>
                <div className="flex items-start gap-3 text-white/70">
                  <div className="w-8 h-8 bg-[#E00000] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPinIcon className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm">156 Washburn St<br />Northborough, MA 01532</span>
                </div>
                <div className="flex items-center gap-3 text-white/70">
                  <div className="w-8 h-8 bg-[#E00000] rounded-full flex items-center justify-center flex-shrink-0">
                    <ClockIcon className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm">Mon–Fri 7–6 | Sat 8–2</span>
                </div>
              </div>
            </div>

            {/* Col 4: Service Areas */}
            <div>
              <h3 className="text-[#FF4444] font-bold text-sm uppercase tracking-wider mb-5">Service Areas</h3>
              <ul className="space-y-2">
                {SERVICE_AREAS.slice(0, 12).map((city) => (
                  <li key={city.slug}>
                    <Link href={`/${city.slug}`} className="text-white/70 hover:text-[#E00000] text-sm transition-colors duration-200">
                      {city.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/marlborough" className="text-[#FF4444] text-sm font-semibold">
                    + {SERVICE_AREAS_ALL.length - 12} more cities →
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* All cities band — RS style */}
          <div className="border-t border-white/10 mt-10 pt-8">
            <h3 className="text-center mb-4 flex items-center justify-center gap-2">
              <MapPinIcon className="w-5 h-5 text-[#E00000]" />
              <span className="text-[#FF4444] font-bold text-sm uppercase tracking-wider">
                Service Areas – {SERVICE_AREAS_ALL.length}+ Cities Across Massachusetts
              </span>
            </h3>
            <div className="flex flex-wrap justify-center gap-x-1 gap-y-1 max-w-6xl mx-auto">
              {SERVICE_AREAS_ALL.map((c, i) => (
                <span key={c.slug} className="text-white/70 text-xs">
                  <Link href={`/${c.slug}`} className="hover:text-[#E00000] transition-colors">{c.name}</Link>
                  {i < SERVICE_AREAS_ALL.length - 1 && <span className="mx-1">·</span>}
                </span>
              ))}
            </div>
          </div>

          {/* Copyright */}
          <div className="pt-8 text-center">
            <p className="text-white/70 text-sm">
              &copy; {new Date().getFullYear()} Wolf&apos;s Siding Inc. All rights reserved. |
              Licensed Siding Contractor | Serving Massachusetts.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
