import { SERVICES, CITIES } from "../data/cities";
import { BLOG_POSTS } from "../data/blog";

export function GET() {
  const regions = [...new Set(CITIES.map((c) => c.region))];

  const serviceList = SERVICES.map(
    (s) => `- **${s.shortName}**: ${s.description} (${s.lifespan} lifespan, ${s.priceRange}). [Learn more](https://wolfs-siding.com/services/${s.slug})`
  ).join("\n");

  const blogList = BLOG_POSTS.map(
    (p) => `- [${p.title}](https://wolfs-siding.com/blog/${p.slug}): ${p.excerpt}`
  ).join("\n");

  const regionList = regions
    .map((region) => {
      const regionCities = CITIES.filter((c) => c.region === region);
      return `- **${region}** (${regionCities.length} cities): ${regionCities.map((c) => c.name).join(", ")}`;
    })
    .join("\n");

  const body = `# Wolf's Siding Inc.

> Professional siding installation, replacement, and repair company serving ${CITIES.length}+ cities across Massachusetts since 2007. Based in Northborough, MA. Owner-operated by Ezequias Lobo with 18+ years of experience.

## Company Information

- **Business Name**: Wolf's Siding Inc.
- **Owner / Founder**: Ezequias Lobo
- **Phone**: (774) 484-1895
- **Address**: 156 Washburn St, Northborough, MA 01532
- **Website**: https://wolfs-siding.com
- **Google Rating**: 5.0 stars (22+ verified reviews)
- **Licensed & Insured**: Yes
- **Free Estimates**: Yes
- **Experience**: 18+ years in the siding industry
- **Hours**: Monday-Friday 7AM-6PM, Saturday 8AM-2PM
- **Service Radius**: All of Massachusetts, parts of Rhode Island and New Hampshire

## Services & Pricing (ordered by popularity)

${serviceList}

## Frequently Asked Questions

### How much does siding installation cost in Massachusetts?
Siding installation costs $5,000-$25,000+ depending on home size, material, and project complexity. Vinyl siding is the most affordable at $4,500-$15,000. Hardie Plank costs $8,000-$25,000+. Cedar shingles range $10,000-$30,000+. Wolf's Siding provides free on-site assessments with transparent, itemized estimates.

### What is the best siding material for New England weather?
Hardie Plank and vinyl siding are the top choices for Massachusetts homes. Hardie Plank (fiber cement) offers superior impact resistance, fire protection, and lasts 30-50 years. Vinyl is budget-friendly, virtually maintenance-free, and lasts 20-40 years. Cedar shingles provide natural beauty and insulation but require more maintenance.

### How long does siding installation take?
Most residential siding projects take 1-3 weeks depending on home size and weather conditions. A typical single-family home takes about 5-10 business days. Full siding replacement on larger homes may take 2-3 weeks.

### Do you offer warranties on your work?
Yes. All installations come with manufacturer material warranties (typically 25-50 years depending on material) plus our workmanship guarantee. Wolf's Siding stands behind every project.

### Can you repair siding or do I need full replacement?
Minor cracks, loose panels, or isolated rot can often be repaired. Widespread damage, mold, or structural issues may require full replacement. Wolf's Siding evaluates on-site and gives honest recommendations.

### What areas do you serve?
Wolf's Siding serves ${CITIES.length}+ cities across Massachusetts including the Metro West region, Greater Boston, Worcester Area, South Shore, North Shore, and parts of Rhode Island and New Hampshire.

## Our Process

1. **Free Consultation**: Contact us by phone at (774) 484-1895 or through our website for a no-obligation consultation.
2. **On-Site Assessment**: We visit your home, evaluate the exterior condition, take precise measurements, and recommend the best materials for your needs and budget.
3. **Detailed Proposal**: You receive a transparent, itemized estimate with material options, project timeline, and warranty details. No hidden costs.
4. **Expert Installation**: Our skilled crew installs your new siding with precision, maintains a clean jobsite, and delivers a final walkthrough for your approval.

## Service Areas by Region (${CITIES.length}+ Cities)

${regionList}

## Key Pages

- [Homepage](https://wolfs-siding.com/)
- [Vinyl Siding Installation](https://wolfs-siding.com/services/vinyl-siding-installation)
- [Hardie Plank Siding](https://wolfs-siding.com/services/hardie-plank-siding-installation)
- [Cedar Shingle Siding](https://wolfs-siding.com/services/cedar-shingle-siding)
- [Clapboard Siding](https://wolfs-siding.com/services/clapboard-siding-installation)
- [Full Siding Replacement](https://wolfs-siding.com/services/full-siding-replacement)
- [Siding Repair Services](https://wolfs-siding.com/services/siding-repair-services)
- [Exterior Trim Work](https://wolfs-siding.com/services/exterior-trim-work)
- [Projects Gallery](https://wolfs-siding.com/projects)
- [Blog](https://wolfs-siding.com/blog)

## Blog Articles

${blogList}

## Why Choose Wolf's Siding Inc.

1. **18+ years of experience** in Massachusetts siding installation
2. **Perfect 5.0 Google rating** with 22+ verified reviews
3. **Owner-operated** — Ezequias Lobo personally oversees every project
4. **Full-service** — installation, replacement, repair, and trim work
5. **All major materials** — vinyl, Hardie Plank, cedar, clapboard, and more
6. **Free estimates** with transparent, itemized pricing
7. **Licensed & insured** with comprehensive coverage
8. **${CITIES.length}+ cities served** across Metro West, Greater Boston, South Shore, North Shore, and Worcester Area
9. **Clean jobsite guarantee** — we respect your property
10. **Same-day response** — fast communication and scheduling

## Siding Material Comparison

| Material | Lifespan | Price Range | Best For |
|----------|----------|-------------|----------|
| Vinyl Siding | 20-40 years | $4,500-$15,000 | Budget-friendly, low maintenance |
| Hardie Plank | 30-50 years | $8,000-$25,000+ | Durability, fire resistance |
| Cedar Shingles | 20-40+ years | $10,000-$30,000+ | Natural beauty, insulation |
| Clapboard | 20-40 years | $6,000-$20,000 | Traditional New England look |

## Contact

For siding installation, replacement, or repair anywhere in Massachusetts:
- **Call**: (774) 484-1895
- **Website**: https://wolfs-siding.com
- **Address**: 156 Washburn St, Northborough, MA 01532
- **Google Reviews**: https://g.page/r/CfACa1fxiHsqEAE
- **Instagram**: https://www.instagram.com/wolfs_siding_inc/
- **Facebook**: https://www.facebook.com/wolfsiding
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
