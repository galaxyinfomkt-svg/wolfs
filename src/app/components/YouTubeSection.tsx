import YouTubeEmbed from "./YouTubeEmbed";

const VIDEOS = [
  { id: "tl21LBICamw", title: "Wolf's Siding Inc. — Professional Siding Installation" },
  { id: "DNTRUljgsMc", title: "Wolf's Siding Inc. — Siding Transformation" },
];

export default function YouTubeSection() {
  return (
    <section className="py-16 lg:py-24 bg-[#F5F5F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-black text-black mb-3 leading-tight">
            Watch Us in <span className="text-[#E00000]">Action</span>
          </h2>
          <div className="w-16 h-1 bg-[#E00000] mx-auto mb-4 rounded-full" />
          <p className="text-[#333]/70 text-base max-w-xl mx-auto">
            See the quality and craftsmanship of Wolf&apos;s Siding Inc. on real Massachusetts projects.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {VIDEOS.map((v) => (
            <YouTubeEmbed key={v.id} videoId={v.id} title={v.title} />
          ))}
        </div>
      </div>
    </section>
  );
}
