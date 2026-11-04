import ProjectsLayout from "../projects/layout";

/* About / Contact / Reviews share the projects chrome (ServiceNav + footer). */
export default function CompanyLayout({ children }: { children: React.ReactNode }) {
  return <ProjectsLayout>{children}</ProjectsLayout>;
}
