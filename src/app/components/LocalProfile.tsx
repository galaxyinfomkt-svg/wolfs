import type { CityData, ServiceData } from "../data/cities";
import { townHousing, HOUSING_SOURCE, type TownHousing } from "../data/townHousing";
import { cityProfile } from "../data/cityProfiles";
import { exposure } from "../data/cityGeo";

/**
 * LocalProfile — what is measurably true about THIS town's houses, and what
 * that means for THIS service.
 *
 * Why: the earlier copy engine could only vary phrasing, and the computed
 * geography (distance, county, coast) still left city pages ~50% identical.
 * The housing stock is what actually differs between towns and what actually
 * changes the job: a town where 40% of homes predate 1940 is a clapboard,
 * cedar and trim-restoration market; a town built out in the 1980s is a
 * vinyl-over-original replacement market. So the numbers lead, the service
 * reading of them follows, and both come from the Census, not a copywriter.
 *
 * Sourced municipal facts (building department, historic commission) render
 * only when cityProfiles.ts has a verified entry with a URL.
 */

const r = (n: number) => Math.round(n);

function decadeOf(year: number): string {
  return `${Math.floor(year / 10) * 10}s`;
}

/** The service-specific reading of the town's housing numbers. */
function serviceReading(service: ServiceData | undefined, h: TownHousing, city: string, coastal: boolean): string {
  const pre40 = r(h.pctPre1940);
  const pre80 = r(h.pctPre1980);
  const multi = r(h.pct2to4);
  const median = h.medianYearBuilt;

  switch (service?.slug) {
    case "vinyl-siding-installation":
      return pre80 >= 60
        ? `With about ${pre80}% of ${city}'s homes built before 1980, most vinyl jobs here are a second or third skin on the house. What is under the old cladding — original boards, felt, sometimes a layer of asbestos-cement shingle — decides the prep, which is why the old cladding should come off and the sheathing should be checked before any new panel goes up.`
        : `${city}'s housing is comparatively young (median year built ${median}), so a vinyl job here is usually replacing the first factory siding the house ever had. That is good news for cost: the sheathing is typically sound, and the work is mostly about better panels, better trim and proper housewrap.`;
    case "clapboard-siding-installation":
      return pre40 >= 25
        ? `About ${pre40}% of ${city}'s homes were built before 1940, when wood clapboard was the default New England wall. Matching the original exposure and corner details is what keeps a re-sided older house from looking re-sided.`
        : `Only about ${pre40}% of ${city}'s homes predate 1940, so clapboard here is more often a deliberate upgrade on a newer colonial than a restoration — usually fiber-cement or primed wood lap chosen for the traditional look with less upkeep.`;
    case "hardie-plank-siding-installation":
      return `${city}'s homes have a median build year of ${median}${pre80 >= 60 ? `, and about ${pre80}% went up before 1980` : ""}. Fiber cement is heavier than vinyl and needs a flat, sound wall, so on ${pre80 >= 60 ? "older" : "these"} houses the sheathing and the window flashing get as much attention as the boards themselves${coastal ? " — and near salt water, the fasteners do too" : ""}.`;
    case "cedar-shingle-siding":
      return pre40 >= 25
        ? `With about ${pre40}% of homes built before 1940, ${city} still has a good stock of original shingle and shingle-style houses. Re-shingling one is as much about the courses lining up with the original windows and trim as it is about the cedar.`
        : `${city}'s median home was built around ${median}, so cedar shingles here are usually a style choice for a newer home rather than a like-for-like replacement — which makes ventilation behind the shingles and a good finish plan the main decisions.`;
    case "full-siding-replacement":
      return `About ${pre80}% of ${city}'s homes were built before 1980${pre40 >= 20 ? ` and about ${pre40}% before 1940` : ""}. Federal EPA lead-safe (RRP) rules apply when work disturbs paint on homes built before 1978, so on many ${city} tear-offs the containment and clean-up plan should be part of any quote you get, not an afterthought.`;
    case "exterior-trim-work":
      return pre40 >= 25
        ? `With about ${pre40}% of homes built before 1940, ${city} has a lot of original wood trim — wide casings, rake boards, porch details — that has outlived several paint jobs. Replacing rotted sections in PVC or primed wood while keeping the original profiles is most of the trim work here.`
        : `${city}'s homes have a median build year of ${median}, so trim work here is mostly replacing first-generation pine casings and fascia that have started to rot at the joints, usually in low-maintenance PVC.`;
    case "gutter-installation":
      return `About ${r(h.pctSingleDetached)}% of ${city}'s housing is single-family detached${multi >= 15 ? `, and about ${multi}% sits in two- to four-unit buildings, where long rooflines and shared downspouts need more capacity` : ""}. Sizing the gutter and placing the downspouts so water lands away from the foundation matters more than the gutter colour.`;
    case "roofing-installation":
      return `${city}'s homes have a median build year of ${median}. An asphalt roof typically lasts a few decades, so a house that age is usually on at least its second roof — and tearing off old layers, checking the decking and flashing the chimneys and walls properly is where a roof here earns its lifespan.`;
    case "siding-repair-services":
      return `About ${pre80}% of ${city}'s homes were built before 1980. On a wall that age, a repair starts by finding where the water got in, because the visible damage is rarely where the leak begins.`;
    default:
      return `${city}'s homes have a median build year of ${median}; about ${pre40}% were built before 1940 and about ${pre80}% before 1980${multi >= 15 ? `, and about ${multi}% are in two- to four-unit buildings` : ""}. That mix decides which materials make sense — older walls usually need more prep and more careful trim matching, newer ones are mostly a straight upgrade.`;
  }
}

export default function LocalProfile({ city, service, hideServiceNote = false }: { city: CityData; service?: ServiceData; hideServiceNote?: boolean }) {
  const h = townHousing(city.slug);
  const p = cityProfile(city.slug);
  const exp = exposure(city.slug);
  const coastal = exp === "coastal" || exp === "near-coastal";
  if (!h && !p) return null;

  const trade = service ? service.shortName.toLowerCase() : "an exterior project";

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-6 md:p-8" aria-labelledby="local-profile">
      {service && !hideServiceNote && p?.serviceNotes?.[service.slug] && (
        <div className="mb-6">
          <h2 className="mb-3 text-xl font-bold text-black md:text-2xl">
            {service.shortName} on {city.name} houses
          </h2>
          <p className="leading-relaxed text-[#333]">{p.serviceNotes[service.slug]}</p>
        </div>
      )}

      {!service && p?.story && p.story.length > 0 && (
        <div className="mb-6 space-y-3">
          <h2 className="mb-1 text-xl font-bold text-black md:text-2xl">Working on {city.name} homes</h2>
          {p.story.map((t, i) => (
            <p key={i} className="leading-relaxed text-[#333]">{t}</p>
          ))}
        </div>
      )}

      <h2 id="local-profile" className="mb-4 text-xl font-bold text-black md:text-2xl">
        {city.name} homes, by the numbers
      </h2>

      {h && (
        <>
          <dl className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-lg bg-[#F5F5F5] p-3">
              <dt className="text-xs text-[#555]">Median year built</dt>
              <dd className="text-xl font-extrabold text-black">{h.medianYearBuilt}</dd>
            </div>
            <div className="rounded-lg bg-[#F5F5F5] p-3">
              <dt className="text-xs text-[#555]">Built before 1940</dt>
              <dd className="text-xl font-extrabold text-black">~{r(h.pctPre1940)}%</dd>
            </div>
            <div className="rounded-lg bg-[#F5F5F5] p-3">
              <dt className="text-xs text-[#555]">Built before 1980</dt>
              <dd className="text-xl font-extrabold text-black">~{r(h.pctPre1980)}%</dd>
            </div>
            <div className="rounded-lg bg-[#F5F5F5] p-3">
              <dt className="text-xs text-[#555]">Owner-occupied</dt>
              <dd className="text-xl font-extrabold text-black">~{r(h.pctOwner)}%</dd>
            </div>
          </dl>
          <p className="mb-2 leading-relaxed text-[#333]">
            {serviceReading(service, h, city.name, coastal)}
          </p>
          <p className="mb-5 text-xs text-[#666]">
            Source: {HOUSING_SOURCE}, {city.name} ({h.housingUnits.toLocaleString("en-US")} housing units, built in the {decadeOf(h.medianYearBuilt)} at the median). Figures are survey estimates, rounded.
          </p>
        </>
      )}

      {p?.ownerNotes && p.ownerNotes.length > 0 && (
        <div className="mb-5 border-l-4 border-[#E00000] pl-4">
          <h3 className="mb-2 font-bold text-black">From the owner</h3>
          {p.ownerNotes.map((n, i) => (
            <p key={i} className="mb-2 italic leading-relaxed text-[#333]">
              {n}
            </p>
          ))}
        </div>
      )}

      {(p?.buildingDept || p?.historic || p?.localFact) && (
        <div className="space-y-3">
          <h3 className="font-bold text-black">Permits and local rules in {city.name}</h3>
          {p?.buildingDept && (
            <p className="leading-relaxed text-[#333]">
              Building permits for {trade} in {city.name} go through the{" "}
              <a href={p.buildingDept.url} className="text-[#E00000] underline underline-offset-2" rel="noopener" target="_blank">
                {p.buildingDept.name}
              </a>
              .{" "}
              {p.buildingDept.permitNote && (
                <>
                  The town&apos;s own guidance:{" "}
                  <q>{p.buildingDept.permitNote.text}</q>{" "}
                  <a href={p.buildingDept.permitNote.url} className="text-xs text-[#666] underline" rel="noopener" target="_blank">
                    (source)
                  </a>
                  .{" "}
                </>
              )}
            </p>
          )}
          {p?.historic && (
            <p className="leading-relaxed text-[#333]">
              {p.historic.text}{" "}
              <a href={p.historic.url} className="text-xs text-[#666] underline" rel="noopener" target="_blank">
                (source)
              </a>
            </p>
          )}
          {p?.localFact && (
            <p className="leading-relaxed text-[#333]">
              {p.localFact.text}{" "}
              <a href={p.localFact.url} className="text-xs text-[#666] underline" rel="noopener" target="_blank">
                (source)
              </a>
            </p>
          )}
        </div>
      )}
      {p?.sources && p.sources.length > 0 && (
        <details className="mt-5 text-xs text-[#666]">
          <summary className="cursor-pointer">Sources for this page</summary>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            {p.sources.map((src) => (
              <li key={src.url}>
                <a href={src.url} target="_blank" rel="noopener" className="underline">{src.label}</a>
              </li>
            ))}
          </ul>
        </details>
      )}
    </section>
  );
}
