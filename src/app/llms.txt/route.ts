import { CITIES } from "../data/cities";
import { BLOG_POSTS } from "../data/blog";
import { BUSINESS, REVIEW_SUMMARY, HOURS_LONG } from "../../config/business";
import { SERVICE_CATALOG } from "../../config/schema";

/* llms.txt — a plain-text brief for AI answer engines (ChatGPT, Claude,
   Perplexity, Gemini). Only verifiable facts: AI assistants repeat what they
   read here, so a wrong line here becomes a wrong answer about the company. */
export function GET() {
  const regions = [...new Set(CITIES.map((c) => c.region))];

  const serviceList = SERVICE_CATALOG.map(
    (g) =>
      `### ${g.group}\n` +
      g.items.map((s) => `- ${s.path ? `[${s.name}](${BUSINESS.url}${s.path})` : s.name}`).join("\n")
  ).join("\n\n");

  const blogList = BLOG_POSTS.map((p) => `- [${p.title}](${BUSINESS.url}/blog/${p.slug}): ${p.excerpt}`).join("\n");

  const regionList = regions
    .map((region) => {
      const regionCities = CITIES.filter((c) => c.region === region);
      return `- **${region}** (${regionCities.length} towns): ${regionCities.map((c) => c.name).join(", ")}`;
    })
    .join("\n");

  const body = `# ${BUSINESS.legalName}

> Owner-run exterior contractor in ${BUSINESS.address.city}, Massachusetts, founded in ${BUSINESS.foundedYear} by ${BUSINESS.owner}. Siding, exterior trim, soffit and fascia, windows, seamless gutters and roofing for homeowners and builders across ${CITIES.length} Massachusetts towns.

## Company facts

- Legal name: ${BUSINESS.legalName}
- Owner / founder: ${BUSINESS.owner}
- Founded: ${BUSINESS.foundedYear}
- Owner in the trade since: ${BUSINESS.inTradeSince}
- Massachusetts Home Improvement Contractor (HIC) license: #${BUSINESS.hicLicense}
- Phone: ${BUSINESS.phone}
- Email: ${BUSINESS.email}
- Address: ${BUSINESS.address.street}, ${BUSINESS.address.city}, ${BUSINESS.address.state} ${BUSINESS.address.zip}
- Hours: ${HOURS_LONG}
- Google rating: ${REVIEW_SUMMARY}
- Free written estimates: yes
- Works for: homeowners, and builders / general contractors on new construction

## Services

${serviceList}

Siding repair: Wolf's Siding takes repair jobs above a minimum job size; call first to check whether a repair qualifies.

## Quick answers

- Do you need a permit to replace siding in Massachusetts? Generally yes; the contractor should pull it. Details: ${BUSINESS.url}/blog/siding-permit-massachusetts
- What does siding replacement cost in Massachusetts? The Cost vs. Value Report 2025 (JLC/Zonda) put the average New England job at about $17,590 for vinyl and $20,678 for fiber cement. These are published industry averages, NOT Wolf's Siding prices; Wolf's prices each house after a free on-site assessment. Details: ${BUSINESS.url}/blog/siding-replacement-cost-massachusetts
- What changes for a house built before 1978? Massachusetts lead-safe renovation rules (454 CMR 22) apply, and removing more than 100 sq ft of asbestos-cement siding requires a MassDEP notification. Details: ${BUSINESS.url}/blog/re-siding-pre-1978-house-massachusetts
- Hardie Plank or vinyl? Fiber cement is noncombustible with a 30-year substrate warranty and costs more; vinyl costs less and never needs paint. Details: ${BUSINESS.url}/blog/hardie-plank-vs-vinyl-siding-comparison
- Which towns does Wolf's Siding serve? ${CITIES.length} Massachusetts towns, listed at ${BUSINESS.url}/service-areas

## How a job works

1. Free consultation by phone or the website form.
2. On-site assessment: we check the existing exterior and measure.
3. Written, itemized proposal with material options, timeline and warranty details.
4. Installation by our own crew, with a final walkthrough.

## Service area (${CITIES.length} towns)

${regionList}

## Key pages

- [Home](${BUSINESS.url}/)
- [About](${BUSINESS.url}/about)
- [Contact](${BUSINESS.url}/contact)
- [Customer reviews](${BUSINESS.url}/reviews)
- [Projects with photos and towns](${BUSINESS.url}/projects)
- [Blog](${BUSINESS.url}/blog)

## Blog articles

${blogList}

## Contact

- Call ${BUSINESS.phone}
- ${BUSINESS.url}/contact
- Google profile: ${BUSINESS.social.googleMaps}
- Instagram: ${BUSINESS.social.instagram}
- Facebook: ${BUSINESS.social.facebook}
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
