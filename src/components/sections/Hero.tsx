"use client";

import { useEffect, useState } from "react";
import { BlueprintGrid } from "@/components/ui/blueprint-grid";
import { SectionLabel } from "@/components/ui/section-label";
import { TerminalReveal } from "@/components/ui/terminal-reveal";
import { Button } from "@/components/ui/button";

export function Hero() {
  const [showHeadline, setShowHeadline] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHeadline(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      <BlueprintGrid />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="flex flex-col items-start max-w-4xl">
          <SectionLabel>// NEXCY TECHNOLOGIES</SectionLabel>
          
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-foreground mt-4 mb-6 min-h-[1.2em]">
            {showHeadline ? (
              <TerminalReveal text="Your vision, Our mission." typingSpeedMs={50} />
            ) : (
              <span className="opacity-0">Your vision, Our mission.</span>
            )}
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl text-muted max-w-2xl mb-10 font-[family-name:var(--font-inter)] leading-relaxed">
            Empower your business with cutting-edge web, mobile, and AI solutions — built for scalability, performance, and real impact.
          </p>

          <div className="flex flex-wrap gap-4 mb-12">
            <Button>Get Started</Button>
            <Button className="bg-[var(--surface)] border-[var(--border)] hover:bg-[var(--surface-hover)] hover:text-foreground active:bg-[var(--surface-hover)] active:text-foreground text-foreground hover:border-[var(--border)] active:border-[var(--border)]">
              View Our Work
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-8 font-mono text-sm tracking-wide text-muted">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
              <span>[RESPONSE: &lt;50ms]</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
              <span>[UPTIME: 99.9%]</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
              <span>[STATUS: OPERATIONAL]</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-6 font-mono text-xs tracking-wider text-[var(--border)] mt-6 pt-6 border-t border-[var(--border)] w-full max-w-2xl uppercase">
            <span>CMB, Sri Lanka</span>
            <span>&bull;</span>
            <span>100% Satisfaction</span>
            <span>&bull;</span>
            <span>24/7 Support</span>
          </div>
        </div>
      </div>
    </section>
  );
}
