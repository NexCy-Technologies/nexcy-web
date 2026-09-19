"use client";
import { SectionLabel } from "@/components/ui/section-label";
import LogoLoop, { LogoItem } from "@/components/ui/logo-loop";
import {
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiFlutter,
  SiAndroid,
  SiNodedotjs,
  SiTypescript,
  SiPostgresql,
  SiSupabase,
  SiFirebase,
  SiGraphql,
  SiDocker,
} from "react-icons/si";
import { useReducedMotion } from "framer-motion";

export function Technologies() {
  const shouldReduceMotion = useReducedMotion();

  const technologies = [
    { icon: <SiReact size={32} />, name: "React" },
    { icon: <SiNextdotjs size={32} />, name: "Next.js" },
    { icon: <SiTailwindcss size={32} />, name: "TailwindCSS" },
    { icon: <SiFlutter size={32} />, name: "Flutter" },
    { icon: <SiAndroid size={32} />, name: "Android" },
    { icon: <SiNodedotjs size={32} />, name: "Node.js" },
    { icon: <SiTypescript size={32} />, name: "TypeScript" },
    { icon: <SiPostgresql size={32} />, name: "PostgreSQL" },
    { icon: <SiSupabase size={32} />, name: "Supabase" },
    { icon: <SiFirebase size={32} />, name: "Firebase" },
    { icon: <SiGraphql size={32} />, name: "GraphQL" },
    { icon: <SiDocker size={32} />, name: "Docker" },
  ];

  const logos: LogoItem[] = technologies.map((tech) => ({
    node: (
      <div className="text-foreground flex flex-col items-center justify-center gap-2">
        {tech.icon}
        <span className="text-xs font-mono tracking-wide">{tech.name}</span>
      </div>
    ),
    title: tech.name,
  }));

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
        
        <div className="relative w-full overflow-hidden">
          {shouldReduceMotion ? (
            <div className="flex flex-wrap justify-center gap-8 py-8">
              {technologies.map((tech, i) => (
                <div key={i} className="flex-shrink-0">
                  <div className="text-foreground flex flex-col items-center justify-center gap-2">
                    {tech.icon}
                    <span className="text-xs font-mono tracking-wide">{tech.name}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <LogoLoop 
              logos={logos}
              direction="left"
              speed={65}
              logoHeight={64}
              gap={64}
              scaleOnHover={true}
              fadeOut={true}
              fadeOutColor="var(--background)"
              ariaLabel="Technologies we use"
            />
          )}
        </div>
      </div>
    </section>
  );
}
