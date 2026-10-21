const CDN = "https://assets.cdn.filesafe.space/BCczy6muFwhd63dPhKCC/media";

export interface ProjectImage {
  src: string;
  alt: string;
}

export interface ProjectPhase {
  label: string;
  images: ProjectImage[];
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
  heroVideo?: string;
  phases?: ProjectPhase[];
  featured?: boolean;
}

export const PROJECTS: Project[] = [
  {
    id: "navy-colonial-transformation",
    title: "Navy Colonial — Full Transformation",
    city: "Massachusetts",
    state: "MA",
    serviceType: "Full Siding Replacement",
    serviceSlug: "full-siding-replacement",
    description:
      "A brand-new colonial taken from bare ZIP System sheathing to a finished navy-blue exterior with crisp white trim — every board measured, cut, and installed by hand by the Wolf's Siding crew. Watch the full before-during-after transformation below.",
    featured: true,
    heroVideo: "/videos/wolfs-reel.mp4",
    phases: [
      { label: "Before", images: [
        { src: "/projects/navy-transformation/before-1.jpg", alt: "Home wrapped in green ZIP System sheathing before siding, Massachusetts" },
        { src: "/projects/navy-transformation/before-2.jpg", alt: "Bare sheathing on new colonial before Wolf's Siding installation, MA" },
      ] },
      { label: "During", images: [
        { src: "/projects/navy-transformation/during-1.jpg", alt: "Wolf's Siding crew cutting siding boards on site with a miter saw, Massachusetts" },
        { src: "/projects/navy-transformation/during-2.jpg", alt: "Navy siding going up during installation by Wolf's Siding, MA" },
      ] },
      { label: "After", images: [
        { src: "/projects/navy-transformation/after-1.jpg", alt: "Finished navy-blue siding on colonial front with white trim, Massachusetts" },
        { src: "/projects/navy-transformation/after-2.jpg", alt: "Completed navy siding side view with white trim by Wolf's Siding, MA" },
      ] },
    ],
    images: [
      { src: "/projects/navy-transformation/after-1.jpg", alt: "Finished navy-blue siding on colonial front with white trim, Massachusetts" },
      { src: "/projects/navy-transformation/before-1.jpg", alt: "Home wrapped in green ZIP System sheathing before siding, MA" },
      { src: "/projects/navy-transformation/during-1.jpg", alt: "Wolf's Siding crew cutting siding boards on site, MA" },
      { src: "/projects/navy-transformation/during-2.jpg", alt: "Navy siding going up during installation, MA" },
      { src: "/projects/navy-transformation/after-2.jpg", alt: "Completed navy siding side view with white trim, MA" },
      { src: "/projects/navy-transformation/before-2.jpg", alt: "Bare sheathing on new colonial before installation, MA" },
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

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.id === slug);
}

export function getPortfolioProjects(): Project[] {
  return PROJECTS.filter((p) => p.serviceType !== "Team");
}

export function generateProjectParams() {
  return getPortfolioProjects().map((p) => ({ slug: p.id }));
}

export function getRelatedProjects(project: Project, limit = 3): Project[] {
  const same = PROJECTS.filter(
    (p) => p.id !== project.id && p.serviceType !== "Team" && p.serviceType === project.serviceType
  );
  const rest = PROJECTS.filter(
    (p) => p.id !== project.id && p.serviceType !== "Team" && p.serviceType !== project.serviceType
  );
  return [...same, ...rest].slice(0, limit);
}
