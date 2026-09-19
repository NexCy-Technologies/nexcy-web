"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import SpotlightCard from "@/components/ui/spotlight-card";
import { FadeUpStagger } from "@/components/ui/fade-up-stagger";
import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Project {
  slug: string;
  title: string;
  description: string;
  url: string;
  image: string;
  category: string;
  technologies: string[];
  features: string[];
  display_order: number;
  published: boolean;
}

interface ProjectGridProps {
  projects: Project[];
}

export function ProjectGrid({ projects }: ProjectGridProps) {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];

  const filteredProjects = activeCategory === "All"
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <div className="w-full flex flex-col gap-12">
      {/* Filter Bar */}
      <div className="flex flex-wrap items-center gap-2 md:gap-4 border-b border-[var(--border)] pb-4">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={cn(
              "px-4 py-2 text-xs md:text-sm font-mono uppercase tracking-wider transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]",
              activeCategory === category
                ? "bg-[var(--foreground)] text-[var(--background)] font-bold"
                : "bg-transparent text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--surface)] border border-transparent hover:border-[var(--border)]"
            )}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Horizontal Carousel */}
      <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 pt-4 -mx-4 px-4 sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {filteredProjects.map((project, index) => {
          return (
            <FadeUpStagger 
              key={project.slug} 
              index={index} 
              className="h-[480px] flex-none w-80 md:w-96 max-w-[85vw] shrink-0 snap-start"
            >
              <Link href={`/work/${project.slug}`} className="block h-full group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]">
                <SpotlightCard 
                  spotlightColor="rgba(0, 243, 255, 0.15)"
                  className="h-full flex flex-col overflow-hidden relative p-0 border border-[var(--border)] bg-[var(--card)]/20 hover:border-[var(--accent)] transition-colors rounded-none"
                >
                  {/* TOP: Image Section */}
                  <div className="relative h-48 md:h-56 shrink-0 border-b border-[var(--border)] overflow-hidden bg-[var(--surface)]">
                    {project.image && (
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale-[30%] group-hover:grayscale-0"
                      />
                    )}
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4 z-10">
                      <span className="inline-block px-3 py-1 bg-[var(--background)]/90 backdrop-blur-md text-[var(--foreground)] text-[10px] font-mono font-bold uppercase tracking-widest border border-[var(--border)] rounded-sm">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  {/* BOTTOM: Content Section */}
                  <div className="p-6 md:p-8 flex flex-col flex-grow relative bg-[var(--background)]/40 overflow-hidden">
                    <h3 className="text-2xl font-bold font-mono uppercase text-[var(--foreground)] mb-3 line-clamp-1 group-hover:text-[var(--accent)] transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm font-sans text-[var(--muted)] mb-6 line-clamp-2">
                      {project.description}
                    </p>
                    
                    {/* Tech Stack */}
                    <div className="mt-auto flex flex-wrap gap-2">
                      {project.technologies.slice(0, 4).map(tech => (
                        <span key={tech} className="text-[10px] font-mono text-[var(--muted)] uppercase tracking-wider border border-[var(--border)] px-2 py-1 rounded-sm bg-[var(--surface)]/30">
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 4 && (
                        <span className="text-[10px] font-mono text-[var(--muted)] uppercase tracking-wider border border-[var(--border)] px-2 py-1 rounded-sm bg-[var(--surface)]/30">
                          +{project.technologies.length - 4}
                        </span>
                      )}
                    </div>

                    {/* Hover Reveal Panel */}
                    <div className="absolute inset-0 bg-[var(--background)]/95 backdrop-blur-md p-6 md:p-8 flex flex-col justify-center translate-y-[101%] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out border-t-2 border-t-[var(--accent)] z-20">
                      <h4 className="text-[10px] font-bold font-mono uppercase tracking-widest text-[var(--foreground)] mb-4">
                        Key Features
                      </h4>
                      <ul className="flex flex-col gap-3 mb-8">
                        {project.features.slice(0, 4).map(f => (
                          <li key={f} className="text-sm text-[var(--muted)] flex items-center gap-3">
                            <div className="w-1.5 h-1.5 bg-[var(--accent)] rounded-full shrink-0 shadow-[0_0_8px_var(--accent)]"></div>
                            <span className="font-sans line-clamp-1">{f}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-auto inline-flex items-center justify-between w-full text-sm font-mono font-bold tracking-widest text-[var(--background)] bg-[var(--accent)] px-5 py-3 hover:bg-[var(--accent)]/90 transition-colors uppercase rounded-sm">
                        View Case Study <ExternalLink className="w-4 h-4" />
                      </div>
                    </div>

                  </div>
                </SpotlightCard>
              </Link>
            </FadeUpStagger>
          );
        })}
      </div>

      {(!filteredProjects || filteredProjects.length === 0) && (
        <div className="py-24 text-center w-full border border-dashed border-[var(--border)]">
          <p className="text-[var(--muted)] font-mono uppercase tracking-widest">No projects found in this category.</p>
        </div>
      )}
    </div>
  );
}
