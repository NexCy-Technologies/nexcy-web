import { SectionLabel } from "@/components/ui/section-label";

const technologies = [
  "React",
  "Next.js",
  "TailwindCSS",
  "Flutter",
  "Android",
  "Node.js",
  "TypeScript",
  "PostgreSQL",
  "Supabase",
  "Firebase",
  "GraphQL",
  "Docker",
];

export function Technologies() {
  return (
    <section className="py-24 md:py-32 relative border-t border-[var(--border)] bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 md:mb-24">
          <SectionLabel>TECHNOLOGIES</SectionLabel>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mt-6 mb-8 max-w-4xl">
            Tools of the trade
          </h2>
          <p className="text-lg md:text-xl text-muted max-w-2xl font-[family-name:var(--font-inter)] leading-relaxed">
            We leverage a modern, scalable tech stack to build resilient applications across web and mobile platforms.
          </p>
        </div>
        
        <div className="flex flex-wrap gap-4">
          {technologies.map((tech) => (
            <div 
              key={tech} 
              className="px-6 py-3 border border-[var(--border)] bg-transparent font-mono text-sm uppercase tracking-widest text-foreground hover:bg-[var(--surface)] transition-colors select-none"
            >
              {tech}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
