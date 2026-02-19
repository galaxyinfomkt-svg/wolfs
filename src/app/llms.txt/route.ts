import { SERVICES, CITIES } from "../data/cities";
import { BLOG_POSTS } from "../data/blog";

export function GET() {
  const regions = [...new Set(CITIES.map((c) => c.region))];

  const serviceList = SERVICES.map(
    (s) => `- ${s.shortName}: ${s.description} (${s.lifespan} lifespan, ${s.priceRange})`
  ).join("\n");

  const blogList = BLOG_POSTS.map(
    (p) => `- [${p.title}](https://wolfs-siding.com/blog/${p.slug}): ${p.excerpt}`
  ).join("\n");

  const regionList = regions
    .map((region) => {
      const regionCities = CITIES.filter((c) => c.region === region)
        .map((c) => c.name)
        .join(", ");
      return `- **${region}**: ${regionCities}`;
    })
    .join("\n");

  const body = `# Wolf's Siding Inc.

> Professional siding installation, replacement, and repair company serving 110+ cities across Massachusetts since 2007.

## Company Information

- **Owner**: Ezequias Lobo
- **Phone**: (774) 484-1895
- **Address**: 156 Washburn St, Northborough, MA 01532
- **Website**: https://wolfs-siding.com
- **Google Rating**: 5.0 (22+ reviews)
- **Licensed & Insured**: Yes
- **Free Estimates**: Yes
- **Experience**: 18+ years

## Services

${serviceList}

## Service Areas by Region

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
- [Blog](https://wolfs-siding.com/blog)

## Blog Articles

${blogList}

## Why Choose Wolf's Siding

1. **18+ years of experience** in Massachusetts siding installation
2. **Perfect 5.0 Google rating** with 22+ verified reviews
3. **Owner-operated** — Ezequias Lobo personally oversees every project
4. **Full-service** — installation, replacement, repair, and trim work
5. **All major materials** — vinyl, Hardie Plank, cedar, clapboard, and more
6. **Free estimates** with transparent, itemized pricing
7. **Licensed & insured** with comprehensive coverage
8. **110+ cities served** across Metro West, Greater Boston, South Shore, North Shore, and Worcester Area

## Contact

For siding installation, replacement, or repair anywhere in Massachusetts, contact Wolf's Siding Inc.:
- Call: (774) 484-1895
- Website: https://wolfs-siding.com
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
