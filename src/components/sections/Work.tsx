import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { SectionLabel } from '@/components/ui/section-label';

export async function Work() {
  const { data: projects, error } = await supabase
    .from('case_studies')
    .select('*')
    .eq('published', true)
    .order('display_order');

  if (error) {
    console.error('Error fetching case studies:', error);
  }

  return (
    <section id="work" className="w-full border-b border-border bg-background">
      <div className="container mx-auto px-4 md:px-8 lg:px-12 py-16 md:py-24">
        <SectionLabel>WORK</SectionLabel>
        
        <div className="mt-8 mb-16 md:mb-24 max-w-3xl">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-mono font-bold tracking-tight uppercase mb-6">
            Our Success Projects
          </h2>
          <p className="text-base md:text-lg text-muted-foreground font-sans">
            A selection of client projects, internal products, and technical solutions built by our team.
          </p>
        </div>

        <div className="flex flex-col border-t border-border">
          {projects?.map((project, index) => (
            <Link 
              key={project.id} 
              href={`/work/${project.slug}`}
              className="group flex flex-col md:flex-row md:items-center justify-between py-6 md:py-8 border-b border-border border-l-2 border-l-transparent hover:border-l-accent focus-visible:border-l-accent active:border-l-accent active:bg-surface-hover transition-colors pl-4 pr-4 -ml-[2px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-12 flex-1">
                <span className="text-2xl md:text-3xl font-mono text-muted-foreground/30 w-12 font-medium">
                  {(index + 1).toString().padStart(2, '0')}
                </span>
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl md:text-2xl font-mono font-bold uppercase group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground font-sans max-w-3xl line-clamp-1">
                    {project.description}
                  </p>
                </div>
              </div>
              
              <div className="mt-6 md:mt-0 shrink-0 md:pl-8">
                <div className="inline-flex items-center justify-center border border-border bg-transparent text-foreground rounded-[2px] px-6 py-2.5 text-sm font-mono font-medium tracking-wide uppercase transition-colors group-hover:bg-accent group-hover:text-[#0A0A0A] group-hover:border-accent group-focus-visible:bg-accent group-focus-visible:text-[#0A0A0A] group-focus-visible:border-accent group-active:bg-accent group-active:text-[#0A0A0A] group-active:border-accent">
                  VIEW &rarr;
                </div>
              </div>
            </Link>
          ))}
          {(!projects || projects.length === 0) && (
            <div className="py-12 border-b border-border text-center">
              <p className="text-muted-foreground font-mono">No projects found.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
