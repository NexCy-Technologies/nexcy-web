import { notFound } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { TerminalReveal } from '@/components/ui/terminal-reveal';
import { SectionLabel } from '@/components/ui/section-label';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const { data: project } = await supabase
    .from('case_studies')
    .select('*')
    .eq('slug', slug)
    .single();

  if (!project) {
    return { title: 'Project Not Found' };
  }

  return {
    title: `${project.title} | Nexcy Technologies`,
    description: project.description,
  };
}

export async function generateStaticParams() {
  const { data: projects } = await supabase
    .from('case_studies')
    .select('slug')
    .eq('published', true);

  return projects?.map((project) => ({
    slug: project.slug,
  })) || [];
}

export default async function WorkDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const { data: project } = await supabase
    .from('case_studies')
    .select('*')
    .eq('slug', slug)
    .single();

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background pt-32 pb-16 md:pt-40 md:pb-24">
      <div className="container mx-auto px-4 md:px-8 lg:px-12">
        <Link 
          href="/#work" 
          className="inline-flex items-center text-sm font-mono text-muted-foreground hover:text-accent transition-colors mb-12"
        >
          &larr; BACK TO WORK
        </Link>
        
        <header className="mb-16 md:mb-24">
          <SectionLabel>PROJECT</SectionLabel>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-mono font-bold uppercase tracking-tighter mb-8 max-w-4xl">
            <TerminalReveal text={project.title} />
          </h1>
          
          <div className="flex flex-wrap gap-4 mt-8">
            {project.category && (
              <div className="border border-border text-foreground px-4 py-1.5 font-mono text-sm uppercase bg-card/50">
                TYPE: {project.category}
              </div>
            )}
            <div className="border border-border text-foreground px-4 py-1.5 font-mono text-sm uppercase bg-card/50">
              STATUS: {project.published ? 'LIVE' : 'ARCHIVED'}
            </div>
            {project.url && (
              <a 
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-accent text-accent px-4 py-1.5 font-mono text-sm uppercase hover:bg-accent hover:text-[#0A0A0A] transition-colors"
              >
                VIEW LIVE SITE &rarr;
              </a>
            )}
          </div>
        </header>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-24">
          <div className="lg:col-span-2">
            <div className="prose prose-invert prose-p:font-sans prose-p:text-muted-foreground prose-p:text-lg prose-p:leading-relaxed max-w-none">
              <p>{project.description}</p>
            </div>
            
            {project.features && project.features.length > 0 && (
              <div className="mt-16">
                <h3 className="text-2xl font-mono font-bold uppercase mb-8 border-b border-border pb-4">Key Features</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.features.map((feature: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-accent font-mono mt-1">{"//"}</span>
                      <span className="font-sans text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          
          <div className="lg:col-span-1">
            {project.technologies && project.technologies.length > 0 && (
              <div className="border border-border p-6 bg-card/20">
                <h3 className="text-lg font-mono font-bold uppercase mb-6 text-accent">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech: string, idx: number) => (
                    <span 
                      key={idx}
                      className="border border-border/50 text-muted-foreground px-3 py-1 font-mono text-xs uppercase"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
