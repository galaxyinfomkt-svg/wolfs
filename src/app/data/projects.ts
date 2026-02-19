const CDN = "https://assets.cdn.filesafe.space/BCczy6muFwhd63dPhKCC/media";

export interface ProjectImage {
  src: string;
  alt: string;
}

export interface Project {
  id: string;
  title: string;
  city: string;
  state: string;
  serviceType: string;
  serviceSlug: string;
  description: string;
  images: ProjectImage[];
  videos?: string[];
  featured?: boolean;
}

export const PROJECTS: Project[] = [
  {
    id: "lakefront-cottage",
    title: "Lakefront Cottage Complete Siding",
    city: "Massachusetts",
    state: "MA",
    serviceType: "Vinyl Siding",
    serviceSlug: "vinyl-siding-installation",
    description:
      "Full vinyl siding installation on a lakefront property — navy blue horizontal panels with white trim across the main cottage, ranch building, and outbuildings.",
    featured: true,
    images: [
      { src: `${CDN}/69975cfb2a2f15796c002376.jpg`, alt: "Navy blue vinyl siding installation on lakefront cottage front view, Massachusetts" },
      { src: `${CDN}/69975cfb3873af15f39e9465.jpg`, alt: "Vinyl siding installation deck and side view on lakefront cottage, MA" },
      { src: `${CDN}/69975cfb4c25023cb798a266.jpg`, alt: "Completed vinyl siding back view lakefront property, Massachusetts" },
      { src: `${CDN}/69975cfbdf9bdf3fea129568.jpg`, alt: "Navy blue siding side angle on lakefront cottage by Wolf's Siding, MA" },
      { src: `${CDN}/69975cfb8d5b5a00c0830e92.jpg`, alt: "Vinyl siding on lakefront outbuilding, Massachusetts" },
      { src: `${CDN}/69975cfb8d5b5aa2ca830e93.jpg`, alt: "Ranch cottage vinyl siding installation lakefront property, MA" },
      { src: `${CDN}/69975cfb8523c556b1d00e93.jpg`, alt: "Outbuilding siding installation at lakefront property, Massachusetts" },
    ],
  },
  {
    id: "commercial-multi-family",
    title: "Commercial Multi-Family Sheathing",
    city: "Massachusetts",
    state: "MA",
    serviceType: "Full Siding Replacement",
    serviceSlug: "full-siding-replacement",
    description:
      "Large-scale commercial sheathing and insulation wrap on a multi-family building — preparation stage before siding installation.",
    images: [
      { src: `${CDN}/69975e328d5b5a152d8385ef.jpg`, alt: "Commercial multi-family building sheathing installation by Wolf's Siding, MA" },
      { src: `${CDN}/69975e328d5b5a70138385be.jpg`, alt: "Insulation wrap on multi-family building exterior, Massachusetts" },
      { src: `${CDN}/69975e323ff516f398546699.jpg`, alt: "Close-up sheathing detail on commercial building by Wolf's Siding, MA" },
    ],
  },
  {
    id: "a-frame-chalet",
    title: "A-Frame Chalet Preparation",
    city: "Massachusetts",
    state: "MA",
    serviceType: "Full Siding Replacement",
    serviceSlug: "full-siding-replacement",
    description:
      "Full exterior sheathing and preparation on an A-frame chalet-style home before new siding installation.",
    images: [
      { src: `${CDN}/69975e328d5b5ade738385b5.jpg`, alt: "A-frame chalet sheathing preparation by Wolf's Siding, Massachusetts" },
      { src: `${CDN}/69975e3218171550c0a6e9c2.jpg`, alt: "A-frame chalet front view exterior preparation, MA" },
    ],
  },
  {
    id: "craftsman-ranch",
    title: "Craftsman Ranch Hardie Plank",
    city: "Massachusetts",
    state: "MA",
    serviceType: "Hardie Plank",
    serviceSlug: "hardie-plank-siding-installation",
    description:
      "Hardie Plank fiber cement siding with mixed profiles on a craftsman-style ranch home — combining lap siding and shake accents.",
    featured: true,
    images: [
      { src: `${CDN}/69975e32181715caeea6e9c1.jpg`, alt: "Hardie Plank siding installation on craftsman ranch home, Massachusetts" },
      { src: `${CDN}/69975e328523c5721bd090c1.jpg`, alt: "Close-up Hardie Plank mixed profile detail on ranch home, MA" },
    ],
  },
  {
    id: "gray-cape-cod",
    title: "Gray Cape Cod Showcase",
    city: "Massachusetts",
    state: "MA",
    serviceType: "Vinyl Siding",
    serviceSlug: "vinyl-siding-installation",
    description:
      "Completed gray vinyl siding on a classic Cape Cod home — showcased with Wolf's Siding yard sign.",
    featured: true,
    images: [
      { src: `${CDN}/69975e328d5b5a3f718385bf.jpg`, alt: "Gray vinyl siding on Cape Cod home with Wolf's Siding sign, Massachusetts" },
    ],
  },
  {
    id: "new-construction-subdivision",
    title: "New Construction Subdivision",
    city: "Massachusetts",
    state: "MA",
    serviceType: "Vinyl Siding",
    serviceSlug: "vinyl-siding-installation",
    description:
      "New construction siding installation in a residential subdivision — blue-gray vinyl panels with professional crew on site.",
    images: [
      { src: `${CDN}/69975e324c2502ee8b9917b7.jpg`, alt: "New construction siding installation with Wolf's Siding crew, Massachusetts" },
      { src: `${CDN}/69975e323873af74c39f00be.jpg`, alt: "Subdivision home blue-gray vinyl siding installation, MA" },
    ],
  },
  {
    id: "navy-blue-colonial",
    title: "Navy Blue Colonial",
    city: "Massachusetts",
    state: "MA",
    serviceType: "Vinyl Siding",
    serviceSlug: "vinyl-siding-installation",
    description:
      "New construction navy blue vinyl siding on a colonial-style home with crisp white trim details.",
    featured: true,
    images: [
      { src: `${CDN}/69975e324c2502c5f69917b6.jpg`, alt: "Navy blue vinyl siding on colonial home, Massachusetts" },
    ],
  },
  {
    id: "upscale-gray-colonial",
    title: "Upscale Gray Colonial",
    city: "Massachusetts",
    state: "MA",
    serviceType: "Vinyl Siding",
    serviceSlug: "vinyl-siding-installation",
    description:
      "Premium gray siding installation on an upscale colonial home — winter showcase demonstrating year-round quality.",
    images: [
      { src: `${CDN}/69975e328523c5f2c4d090c0.jpg`, alt: "Upscale gray colonial siding installation winter showcase, Massachusetts" },
    ],
  },
  {
    id: "burgundy-barn",
    title: "Burgundy Barn Board & Batten",
    city: "Massachusetts",
    state: "MA",
    serviceType: "Clapboard Siding",
    serviceSlug: "clapboard-siding-installation",
    description:
      "Board and batten siding in a rich burgundy tone on a barn-style structure — combining traditional style with modern materials.",
    images: [
      { src: `${CDN}/69975e3220c0353f100e2671.jpg`, alt: "Burgundy board and batten siding on barn structure, Massachusetts" },
    ],
  },
  {
    id: "ranch-with-brick",
    title: "Ranch with Brick Accent",
    city: "Massachusetts",
    state: "MA",
    serviceType: "Vinyl Siding",
    serviceSlug: "vinyl-siding-installation",
    description:
      "Vinyl siding installation on a ranch home with brick front accent — partial siding blending materials seamlessly.",
    images: [
      { src: `${CDN}/69975e323873af3bda9f00d3.jpg`, alt: "Vinyl siding on ranch home with brick accent, Massachusetts" },
    ],
  },
  {
    id: "winter-crew",
    title: "Wolf's Siding Crew",
    city: "Massachusetts",
    state: "MA",
    serviceType: "Team",
    serviceSlug: "vinyl-siding-installation",
    description:
      "The Wolf's Siding Inc. team on the job — professional crew with company van, ready for any siding project in Massachusetts.",
    images: [
      { src: `${CDN}/69975cfb1817156bc8a665f3.jpg`, alt: "Wolf's Siding Inc. crew and company van, Massachusetts" },
    ],
  },
];

export const COMPANY_VAN_IMAGE = {
  src: `${CDN}/69975cfbf83453316334c59e.png`,
  alt: "Wolf's Siding Inc. branded company van, Massachusetts",
};

export const PROJECT_VIDEOS = [
  `${CDN}/69975cfb4c25025a9698a268.mp4`,
  `${CDN}/69975cfb3ff51648e253e637.mov`,
  `${CDN}/69975cfb20c035425f0dae1b.mov`,
];

export const SERVICE_FILTERS = [
  "All",
  "Vinyl Siding",
  "Hardie Plank",
  "Clapboard Siding",
  "Full Siding Replacement",
];

export function getProjectsByService(serviceSlug: string): Project[] {
  return PROJECTS.filter((p) => p.serviceSlug === serviceSlug && p.serviceType !== "Team");
}

export function getFeaturedProjects(): Project[] {
  return PROJECTS.filter((p) => p.featured);
}

export function getAllProjectImages(): { src: string; alt: string; label: string; project: string }[] {
  return PROJECTS.filter((p) => p.serviceType !== "Team").flatMap((p) =>
    p.images.map((img) => ({
      src: img.src,
      alt: img.alt,
      label: p.serviceType,
      project: p.title,
    }))
  );
}
