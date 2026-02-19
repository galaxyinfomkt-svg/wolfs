import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-6 py-24">
      <div className="text-center max-w-md mx-auto">
        {/* 404 number */}
        <p className="text-[#E00000] text-9xl font-extrabold tracking-tight">
          404
        </p>

        {/* Heading */}
        <h1 className="mt-4 text-3xl font-bold text-[#1A1A1A] sm:text-4xl">
          Page Not Found
        </h1>

        {/* Helpful message */}
        <p className="mt-4 text-base leading-7 text-gray-600">
          Sorry, the page you are looking for doesn&apos;t exist or has been
          moved. Let&apos;s get you back on track.
        </p>

        {/* Company name */}
        <p className="mt-6 text-sm font-semibold text-[#1A1A1A]">
          Wolf&apos;s Siding Inc.
        </p>

        {/* CTA buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-block rounded-md bg-[#E00000] px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-red-700 transition-colors"
          >
            Back to Home
          </Link>
          <Link
            href="tel:+17744841895"
            className="inline-block rounded-md border-2 border-[#1A1A1A] bg-white px-6 py-3 text-sm font-semibold text-[#1A1A1A] hover:bg-[#F5F5F5] transition-colors"
          >
            Call Us: (774) 484-1895
          </Link>
        </div>
      </div>
    </main>
  );
}
