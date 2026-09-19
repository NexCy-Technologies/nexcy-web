import { SectionLabel } from '@/components/ui/section-label';
import projectsData from '@/data/success_projects.json';
import { ProjectGrid, Project } from '@/components/ui/project-grid';

export async function Work() {
  const projects = projectsData.filter(p => p.published).sort((a, b) => a.display_order - b.display_order);

  return (
    <section id="work" className="py-24 md:py-32 relative border-t border-[var(--border)] bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 md:mb-24 max-w-3xl">
          <SectionLabel>WORK</SectionLabel>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-mono font-bold tracking-tight uppercase mt-6 mb-6">
            Our Success Projects
          </h2>
          <p className="text-base md:text-lg text-muted-foreground font-sans">
            A selection of client projects, internal products, and technical solutions built by our team.
          </p>
        </div>

        <ProjectGrid projects={projects as Project[]} />
      </div>
    </section>
  );
}
