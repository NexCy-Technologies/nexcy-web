"use client";

import { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Globe, Smartphone, Bot, BarChart3,
  Zap, Shield, CheckCircle2, ArrowRight, ChevronDown,
} from "lucide-react";
import { BlueprintGrid } from "@/components/ui/blueprint-grid";
import { SectionLabel } from "@/components/ui/section-label";
import { Button } from "@/components/ui/button";
import { CountUp } from "@/components/ui/count-up";
import TextType from "@/components/ui/text-type";
import ShinyText from "@/components/ui/shiny-text";

// Lazy-load PixelBlast as it uses three.js and is heavy.
const PixelBlast = dynamic(() => import("@/components/ui/pixel-blast"), { ssr: false });

/* ─── Typewriter Words ───────────────────────────────────────── */
const ROTATING_WORDS = ["Web Apps", "Mobile Apps", "AI Solutions", "ERP Systems", "IoT Products"];

/* ─── Floating service cards ────────────────────────────────── */
const services = [
  { icon: Globe,      label: "Web Development",     color: "text-blue-400" },
  { icon: Smartphone, label: "Mobile Apps",          color: "text-green-400" },
  { icon: Bot,        label: "AI / ML Solutions",    color: "text-purple-400" },
  { icon: BarChart3,  label: "ERP / POS Systems",    color: "text-orange-400" },
];

/* ─── Stats ─────────────────────────────────────────────────── */
const stats = [
  { to: 50,  suffix: "+",  label: "Projects shipped" },
  { to: 100, suffix: "%",  label: "Client satisfaction" },
  { to: 3,   suffix: "+",  label: "Years of experience" },
];

/* ─── Motion variants ────────────────────────────────────────── */
const fadeUp = (delay = 0, reduce = false) => ({
  initial: reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: reduce
    ? { duration: 0 }
    : { delay, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
});

/* ─── Hero ───────────────────────────────────────────────────── */
export function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Small delay to let text content render first before initializing WebGL
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const scrollToWork = () =>
    document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
  const scrollToContact = () =>
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 pb-16 overflow-hidden">
      <BlueprintGrid />
      
      {!shouldReduceMotion && mounted && (
        <div className="absolute inset-0 z-0">
          <PixelBlast
            variant="square"
            pixelSize={6}
            color="#00F3FF"
            patternDensity={0.5}
            speed={0.25}
            transparent={true}
            edgeFade={0.3}
          />
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* ── LEFT: Copy ── */}
          <div className="flex flex-col items-start">
            <motion.div {...fadeUp(0.1, !!shouldReduceMotion)}>
              <SectionLabel>// Nexcy Technologies — CMB, Sri Lanka</SectionLabel>
            </motion.div>

            {/* Main headline */}
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl font-mono font-bold tracking-tight text-foreground mt-6 mb-3 leading-[1.08]"
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.2, duration: 0.4 }}
            >
              We build
            </motion.h1>

            {/* Typewriter word */}
            <motion.div
              className="text-4xl sm:text-5xl md:text-6xl font-mono font-bold tracking-tight mb-3 leading-[1.08] min-h-[1.2em]"
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.5, duration: 0.4 }}
            >
              {shouldReduceMotion ? (
                <span className="text-[var(--accent)]">{ROTATING_WORDS[0]}</span>
              ) : (
                <TextType
                  text={ROTATING_WORDS}
                  typingSpeed={70}
                  deletingSpeed={40}
                  pauseDuration={1800}
                  showCursor={true}
                  cursorCharacter="_"
                  className="text-[var(--accent)]"
                />
              )}
            </motion.div>

            <motion.p
              className="text-lg sm:text-xl text-[var(--muted)] max-w-lg mb-8 font-[family-name:var(--font-inter)] leading-relaxed"
              {...fadeUp(0.8, !!shouldReduceMotion)}
            >
              Cutting-edge software solutions built for{" "}
              <span className="text-foreground font-medium">scalability</span>,{" "}
              <span className="text-foreground font-medium">performance</span>, and real-world impact.
            </motion.p>

            {/* CTA buttons */}
            <motion.div className="flex flex-wrap gap-4 mb-12" {...fadeUp(1, !!shouldReduceMotion)}>
              <Button
                onClick={scrollToContact}
                className="gap-2 group px-6 py-3 text-sm flex items-center"
              >
                {shouldReduceMotion ? (
                  <span>Start</span>
                ) : (
                  <ShinyText text="Start" speed={3} className="text-[#0A0A0A]" shineColor="#00F3FF" />
                )}{" "}
                a Project
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                onClick={scrollToWork}
                className="bg-transparent border border-[var(--border)] text-foreground hover:bg-[var(--surface)] hover:border-[var(--accent)] transition-colors px-6 py-3 text-sm gap-2"
              >
                View Our Work
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-3 gap-6 py-6 border-t border-[var(--border)] w-full max-w-md"
              {...fadeUp(1.1, !!shouldReduceMotion)}
            >
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="text-2xl sm:text-3xl font-bold font-mono text-foreground">
                    <CountUp to={s.to} suffix={s.suffix} duration={1.6} />
                  </div>
                  <div className="text-xs text-[var(--muted)] mt-1 font-[family-name:var(--font-inter)]">
                    {s.label}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Trust line */}
            <motion.div
              className="flex flex-wrap items-center gap-4 mt-6 text-xs text-[var(--muted)] font-[family-name:var(--font-inter)]"
              {...fadeUp(1.3, !!shouldReduceMotion)}
            >
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[var(--accent)]" />
                100% Client Satisfaction
              </span>
              <span className="w-1 h-1 rounded-full bg-[var(--border)]" />
              <span className="flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-[var(--accent)]" />
                Quality Guaranteed
              </span>
              <span className="w-1 h-1 rounded-full bg-[var(--border)]" />
              <span className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-[var(--accent)]" />
                Fast Delivery
              </span>
            </motion.div>
          </div>

          {/* ── RIGHT: Service Cards Grid ── */}
          <div className="hidden lg:grid grid-cols-2 gap-4">
            {services.map(({ icon: Icon, label, color }, i) => (
              <motion.div
                key={label}
                initial={shouldReduceMotion ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={
                  shouldReduceMotion
                    ? { duration: 0 }
                    : {
                        delay: 0.4 + i * 0.12,
                        duration: 0.55,
                        ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
                      }
                }
                whileHover={shouldReduceMotion ? {} : { y: -4, transition: { duration: 0.2 } }}
                className="group border border-[var(--border)] bg-[var(--surface)]/60 backdrop-blur-sm p-6 rounded-sm hover:border-[var(--accent)]/40 transition-colors cursor-default"
              >
                <div className={`mb-3 ${color}`}>
                  <Icon className="w-7 h-7" />
                </div>
                <div className="font-mono text-sm font-semibold text-foreground tracking-wide">
                  {label}
                </div>
                <div className="mt-2 h-[1px] w-0 group-hover:w-full bg-[var(--accent)]/30 transition-all duration-500" />
              </motion.div>
            ))}

            {/* Wide bottom card */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : { delay: 0.88, duration: 0.55, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }
              }
              className="col-span-2 border border-[var(--border)] bg-[var(--surface)]/40 backdrop-blur-sm p-5 rounded-sm flex items-center justify-between"
            >
              <div>
                <div className="text-xs font-mono text-[var(--muted)] uppercase tracking-widest mb-1">Also Available</div>
                <div className="font-mono text-sm font-semibold text-foreground">IoT Development · Software Engineering · Consulting</div>
              </div>
              <ArrowRight className="w-5 h-5 text-[var(--accent)] flex-shrink-0" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator — disabled infinite loop under reduced motion */}
      <motion.button
        onClick={scrollToWork}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-[var(--muted)] text-xs font-mono tracking-widest uppercase hover:text-[var(--accent)] transition-colors"
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={shouldReduceMotion ? { duration: 0 } : { delay: 1.6 }}
      >
        <motion.div
          animate={shouldReduceMotion ? {} : { y: [0, 6, 0] }}
          transition={shouldReduceMotion ? {} : { repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
        Scroll
      </motion.button>
    </section>
  );
}
