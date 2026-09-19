import { SectionLabel } from "@/components/ui/section-label";
import { BlurText } from "@/components/ui/blur-text";
import { supabase } from "@/lib/supabase";
import SpotlightCard from "@/components/ui/spotlight-card";

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
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mt-6 mb-8 max-w-4xl">
            <BlurText text="Technical solutions designed for precision and scale." animateBy="words" delay={70} />
          </h2>
          <p className="text-lg md:text-xl text-muted max-w-2xl font-[family-name:var(--font-inter)] leading-relaxed">
            From robust web infrastructure to intelligent automation systems, we engineer software that solves complex business challenges without unnecessary overhead.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-[var(--border)] bg-background">
          {safeServices.map((service) => {
            return (
              <SpotlightCard
                key={service.id}
                spotlightColor="rgba(0, 243, 255, 0.1)"
                className="group relative flex flex-col p-6 sm:p-8 rounded-none border-t-0 border-l-0 border-r border-b border-[var(--border)] bg-background transition-colors outline-none hover:ring-1 hover:ring-inset hover:ring-[var(--accent-cyan)] focus:ring-1 focus:ring-inset focus:ring-[var(--accent-cyan)] hover:z-10 focus:z-10"
              >
                <h3 className="font-mono uppercase text-xl font-bold mb-4 text-foreground relative z-10">
                  {service.title}
                </h3>
                
                <p className="font-[family-name:var(--font-inter)] text-muted leading-relaxed flex-grow relative z-10">
                  {service.description}
                </p>

                {service.features && service.features.length > 0 && (
                  <div className="mt-8 flex flex-wrap gap-2 relative z-10">
                    {service.features.map((feature: string, fIdx: number) => (
                      <span 
                        key={fIdx} 
                        className="border border-[var(--border)] px-2 py-1 text-xs font-[family-name:var(--font-inter)] text-muted bg-background/50 backdrop-blur-sm"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                )}
              </SpotlightCard>
            );
          })}
        </div>

      </div>
    </section>
  );
}
