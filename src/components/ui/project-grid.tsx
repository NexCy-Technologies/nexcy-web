"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import SpotlightCard from "@/components/ui/spotlight-card";
import { ExternalLink, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { useReducedMotion } from "framer-motion";
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
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isManualPaused, setIsManualPaused] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [seqWidth, setSeqWidth] = useState<number>(0);

  const shouldReduceMotion = useReducedMotion();

  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const seqRef = useRef<HTMLDivElement>(null);

  const offsetRef = useRef<number>(0);
  const velocityRef = useRef<number>(0);
  const lastTimeRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);
  const stepRafRef = useRef<number | null>(null);

  // Dragging refs
  const pointerDownRef = useRef<boolean>(false);
  const startXRef = useRef<number>(0);
  const dragStartOffsetRef = useRef<number>(0);
  const hasDraggedRef = useRef<boolean>(false);

  const categories = useMemo(() => {
    return ["All", ...Array.from(new Set(projects.map((p) => p.category)))];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    return activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);
  }, [projects, activeCategory]);

  // Determine copy count to ensure the ribbon is seamlessly continuous
  const copyCount = useMemo(() => {
    if (filteredProjects.length === 0) return 0;
    if (filteredProjects.length === 1) return 8;
    if (filteredProjects.length === 2) return 5;
    if (filteredProjects.length <= 4) return 3;
    return 2;
  }, [filteredProjects.length]);

  // Measure the width of a single set of items
  const measureSequence = useCallback(() => {
    if (seqRef.current) {
      const rect = seqRef.current.getBoundingClientRect();
      if (rect.width > 0) {
        setSeqWidth(Math.ceil(rect.width));
      }
    }
  }, []);

  useEffect(() => {
    measureSequence();
    const handleResize = () => measureSequence();
    window.addEventListener("resize", handleResize);

    const observer = new ResizeObserver(() => {
      measureSequence();
    });

    if (seqRef.current) {
      observer.observe(seqRef.current);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
    };
  }, [measureSequence, filteredProjects]);

  // Reset offset smoothly when category changes
  useEffect(() => {
    offsetRef.current = 0;
    if (trackRef.current) {
      trackRef.current.style.transform = "translate3d(0, 0, 0)";
    }
    measureSequence();
  }, [activeCategory, measureSequence]);

  // Main animation loop
  useEffect(() => {
    const speed = 40; // Pixels per second
    const smoothTau = 0.25;

    const animate = (timestamp: number) => {
      if (lastTimeRef.current === null) {
        lastTimeRef.current = timestamp;
      }

      const deltaTime = Math.min(Math.max(0, timestamp - lastTimeRef.current) / 1000, 0.1);
      lastTimeRef.current = timestamp;

      const isStopped =
        isHovered ||
        isFocused ||
        isManualPaused ||
        isDragging ||
        pointerDownRef.current ||
        Boolean(shouldReduceMotion);

      const targetVelocity = isStopped ? 0 : speed;
      const easingFactor = 1 - Math.exp(-deltaTime / smoothTau);
      velocityRef.current += (targetVelocity - velocityRef.current) * easingFactor;

      if (seqWidth > 0 && Math.abs(velocityRef.current) > 0.01) {
        let nextOffset = offsetRef.current + velocityRef.current * deltaTime;
        nextOffset = ((nextOffset % seqWidth) + seqWidth) % seqWidth;
        offsetRef.current = nextOffset;

        if (trackRef.current) {
          trackRef.current.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      lastTimeRef.current = null;
    };
  }, [seqWidth, isHovered, isFocused, isManualPaused, isDragging, shouldReduceMotion]);

  // Smooth manual nudge for Next/Previous buttons
  const handleNudge = useCallback((direction: "next" | "prev") => {
    if (stepRafRef.current) {
      cancelAnimationFrame(stepRafRef.current);
      stepRafRef.current = null;
    }

    const step = 416 * (direction === "next" ? 1 : -1);
    const startOffset = offsetRef.current;
    const startTime = performance.now();
    const duration = 350;

    const animateStep = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      // easeOutCubic
      const ease = 1 - Math.pow(1 - progress, 3);

      let currentOffset = startOffset + step * ease;
      if (seqWidth > 0) {
        currentOffset = ((currentOffset % seqWidth) + seqWidth) % seqWidth;
      }
      offsetRef.current = currentOffset;

      if (trackRef.current) {
        trackRef.current.style.transform = `translate3d(${-currentOffset}px, 0, 0)`;
      }

      if (progress < 1) {
        stepRafRef.current = requestAnimationFrame(animateStep);
      } else {
        stepRafRef.current = null;
      }
    };

    stepRafRef.current = requestAnimationFrame(animateStep);
  }, [seqWidth]);

  // Drag handling
  const handlePointerDown = (clientX: number) => {
    pointerDownRef.current = true;
    startXRef.current = clientX;
    dragStartOffsetRef.current = offsetRef.current;
    hasDraggedRef.current = false;
    setIsDragging(true);

    if (stepRafRef.current) {
      cancelAnimationFrame(stepRafRef.current);
      stepRafRef.current = null;
    }
  };

  const handlePointerMove = (clientX: number) => {
    if (!pointerDownRef.current) return;
    const deltaX = clientX - startXRef.current;

    if (Math.abs(deltaX) > 6) {
      hasDraggedRef.current = true;
    }

    let nextOffset = dragStartOffsetRef.current - deltaX;
    if (seqWidth > 0) {
      nextOffset = ((nextOffset % seqWidth) + seqWidth) % seqWidth;
    }
    offsetRef.current = nextOffset;

    if (trackRef.current) {
      trackRef.current.style.transform = `translate3d(${-nextOffset}px, 0, 0)`;
    }
  };

  const handlePointerUp = () => {
    pointerDownRef.current = false;
    setIsDragging(false);
    setTimeout(() => {
      hasDraggedRef.current = false;
    }, 100);
  };

  // Wheel handling for trackpads
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const delta = e.deltaX || (e.shiftKey ? e.deltaY : 0);
    if (Math.abs(delta) > 1) {
      let nextOffset = offsetRef.current + delta;
      if (seqWidth > 0) {
        nextOffset = ((nextOffset % seqWidth) + seqWidth) % seqWidth;
      }
      offsetRef.current = nextOffset;

      if (trackRef.current) {
        trackRef.current.style.transform = `translate3d(${-nextOffset}px, 0, 0)`;
      }
    }
  };

  return (
    <div className="w-full flex flex-col gap-8">
      {/* Filter Bar & Controls Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[var(--border)] pb-4">
        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 md:gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-3.5 py-1.5 text-xs md:text-sm font-mono uppercase tracking-wider transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] cursor-pointer rounded-xs",
                activeCategory === category
                  ? "bg-[var(--foreground)] text-[var(--background)] font-bold shadow-sm"
                  : "bg-transparent text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--surface)] border border-transparent hover:border-[var(--border)]"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Carousel Interactive Controls */}
        <div className="flex items-center gap-2 self-end md:self-auto">
          {/* Autoplay Toggle Button */}
          <button
            type="button"
            onClick={() => setIsManualPaused((prev) => !prev)}
            aria-label={isManualPaused ? "Resume auto-scroll" : "Pause auto-scroll"}
            title={isManualPaused ? "Resume auto-scroll" : "Pause auto-scroll"}
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 text-xs font-mono uppercase tracking-wider border rounded-xs transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]",
              isManualPaused
                ? "border-[var(--border)] bg-[var(--surface)] text-[var(--muted)] hover:text-[var(--foreground)] hover:border-[var(--muted)]"
                : "border-[var(--accent)]/40 bg-[var(--accent)]/10 text-[var(--accent)] hover:bg-[var(--accent)]/20"
            )}
          >
            {isManualPaused ? (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span className="hidden sm:inline">Play</span>
              </>
            ) : (
              <>
                <Pause className="w-3.5 h-3.5 fill-current" />
                <span className="hidden sm:inline">Pause</span>
              </>
            )}
          </button>

          {/* Previous Arrow Button */}
          <button
            type="button"
            onClick={() => handleNudge("prev")}
            aria-label="Previous project"
            className="p-1.5 md:p-2 border border-[var(--border)] bg-[var(--surface)] text-[var(--muted)] hover:text-[var(--foreground)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors cursor-pointer rounded-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Next Arrow Button */}
          <button
            type="button"
            onClick={() => handleNudge("next")}
            aria-label="Next project"
            className="p-1.5 md:p-2 border border-[var(--border)] bg-[var(--surface)] text-[var(--muted)] hover:text-[var(--foreground)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors cursor-pointer rounded-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Auto-scrolling Carousel Container */}
      {filteredProjects.length > 0 ? (
        <div
          ref={containerRef}
          className="relative w-full overflow-hidden select-none py-2"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => {
            setIsHovered(false);
            if (pointerDownRef.current) handlePointerUp();
          }}
          onFocusCapture={() => setIsFocused(true)}
          onBlurCapture={(e) => {
            if (!containerRef.current?.contains(e.relatedTarget as Node)) {
              setIsFocused(false);
            }
          }}
          onWheel={handleWheel}
          onMouseDown={(e) => handlePointerDown(e.clientX)}
          onMouseMove={(e) => handlePointerMove(e.clientX)}
          onMouseUp={handlePointerUp}
          onTouchStart={(e) => handlePointerDown(e.touches[0].clientX)}
          onTouchMove={(e) => handlePointerMove(e.touches[0].clientX)}
          onTouchEnd={handlePointerUp}
          role="region"
          aria-label="Success Projects Carousel"
        >
          {/* Subtle Side Gradient Fade Edges */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 w-8 md:w-20 bg-gradient-to-r from-[var(--background)] to-transparent z-20"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 w-8 md:w-20 bg-gradient-to-l from-[var(--background)] to-transparent z-20"
          />

          {/* Sliding Track */}
          <div
            ref={trackRef}
            className={cn(
              "flex flex-row w-max will-change-transform",
              isDragging ? "cursor-grabbing" : "cursor-grab"
            )}
          >
            {Array.from({ length: copyCount }).map((_, copyIndex) => (
              <div
                key={`copy-${copyIndex}`}
                ref={copyIndex === 0 ? seqRef : undefined}
                className="flex flex-row"
                aria-hidden={copyIndex > 0}
              >
                {filteredProjects.map((project) => (
                  <div
                    key={`${project.slug}-${copyIndex}`}
                    className="h-[480px] flex-none w-80 md:w-96 max-w-[85vw] shrink-0 mr-6"
                  >
                    <Link
                      href={`/work/${project.slug}`}
                      onClick={(e) => {
                        if (hasDraggedRef.current) {
                          e.preventDefault();
                          e.stopPropagation();
                        }
                      }}
                      tabIndex={copyIndex > 0 ? -1 : 0}
                      className="block h-full group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                    >
                      <SpotlightCard
                        spotlightColor="rgba(0, 243, 255, 0.15)"
                        className="h-full flex flex-col overflow-hidden relative p-0 border border-[var(--border)] bg-[var(--card)]/20 hover:border-[var(--accent)] transition-colors rounded-none"
                      >
                        {/* TOP: Image Section */}
                        <div className="relative h-48 md:h-56 shrink-0 border-b border-[var(--border)] overflow-hidden bg-[var(--surface)]">
                          {project.image && (
                            <Image
                              src={project.image}
                              alt={project.title}
                              fill
                              sizes="(max-width: 768px) 85vw, 384px"
                              className="object-cover transition-transform duration-700 group-hover:scale-105 grayscale-[30%] group-hover:grayscale-0 pointer-events-none select-none"
                              draggable={false}
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
                            {project.technologies.slice(0, 4).map((tech) => (
                              <span
                                key={tech}
                                className="text-[10px] font-mono text-[var(--muted)] uppercase tracking-wider border border-[var(--border)] px-2 py-1 rounded-sm bg-[var(--surface)]/30"
                              >
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
                              {project.features.slice(0, 4).map((f) => (
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
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="py-24 text-center w-full border border-dashed border-[var(--border)]">
          <p className="text-[var(--muted)] font-mono uppercase tracking-widest">
            No projects found in this category.
          </p>
        </div>
      )}
    </div>
  );
}
