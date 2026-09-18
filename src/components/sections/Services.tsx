import { SectionLabel } from "@/components/ui/section-label";
import { TerminalReveal } from "@/components/ui/terminal-reveal";
import { supabase } from "@/lib/supabase";

export const revalidate = 3600; // Revalidate every hour (optional, since it's a server component)

export async function Services() {
  const { data: services } = await supabase
    .from("services")
    .select("*")
    .order("display_order", { ascending: true });

  const safeServices = services || [];

  return (
    <section className="py-24 md:py-32 relative border-t border-[var(--border)] bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="mb-16 md:mb-24">
          <SectionLabel>OUR SERVICES</SectionLabel>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mt-6 mb-8 max-w-4xl min-h-[1.5em] md:min-h-[1.2em]">
            <TerminalReveal text="Technical solutions designed for precision and scale." />
          </h2>
          <p className="text-lg md:text-xl text-muted max-w-2xl font-[family-name:var(--font-inter)] leading-relaxed">
            From robust web infrastructure to intelligent automation systems, we engineer software that solves complex business challenges without unnecessary overhead.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-[var(--border)] bg-background">
          {safeServices.map((service, index) => {
            const indexPrefix = `0${index + 1}`.slice(-2);
            return (
              <div
                key={service.id}
                tabIndex={0}
                className="group relative flex flex-col p-6 sm:p-8 border-r border-b border-[var(--border)] bg-background transition-colors outline-none hover:ring-1 hover:ring-inset hover:ring-[var(--accent-cyan)] focus:ring-1 focus:ring-inset focus:ring-[var(--accent-cyan)] hover:z-10 focus:z-10"
              >
                <div className="flex items-start justify-between mb-8 text-muted font-mono text-xs tracking-wider uppercase group-hover:text-[var(--accent-cyan)] group-focus:text-[var(--accent-cyan)] transition-colors">
                  <span>[{indexPrefix}]</span>
                </div>
                
                <h3 className="font-mono uppercase text-xl font-bold mb-4 text-foreground">
                  {service.title}
                </h3>
                
                <p className="font-[family-name:var(--font-inter)] text-muted leading-relaxed flex-grow">
                  {service.description}
                </p>

                {service.features && service.features.length > 0 && (
                  <div className="mt-8 flex flex-wrap gap-2">
                    {service.features.map((feature: string, fIdx: number) => (
                      <span 
                        key={fIdx} 
                        className="border border-[var(--border)] px-2 py-1 text-[10px] font-mono uppercase text-muted"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
