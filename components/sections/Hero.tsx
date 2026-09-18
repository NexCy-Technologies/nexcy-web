"use client";

import React, { useEffect, useState, useRef } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import Link from "next/link";

// ── Types ────────────────────────────────────────────────────────────────────

type GlassButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "outline";
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

// ── GlassButton ───────────────────────────────────────────────────────────────

const GlassButton = ({
  children,
  variant = "primary",
  className = "",
  ...props
}: GlassButtonProps) => {
  const base =
    "px-5 py-2.5 text-sm sm:text-base font-medium transition-all duration-300 border flex items-center gap-2 justify-center rounded-full active:scale-95";
  const variants = {
    primary:
      "bg-primary hover:bg-primary/90 text-primary-foreground border-transparent shadow-lg shadow-primary/20",
    outline:
      "border-border text-foreground bg-background hover:bg-muted hover:text-foreground",
  };
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

// ── ScrambleText ──────────────────────────────────────────────────────────────

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

const ScrambleText = ({
  text,
  trigger,
  className = "",
  speed = 40,
}: {
  text: string;
  trigger: boolean;
  className?: string;
  speed?: number;
}) => {
  const [display, setDisplay] = useState("");

  useEffect(() => {
    if (!trigger) return;
    let i = 0;
    const iv = setInterval(() => {
      if (i >= text.length) { setDisplay(text); clearInterval(iv); return; }
      setDisplay(
        text.split("").map((c, idx) =>
          idx < i ? text[idx] : CHARS[Math.floor(Math.random() * CHARS.length)]
        ).join("")
      );
      i++;
    }, speed);
    return () => clearInterval(iv);
  }, [trigger, text, speed]);

  return <span className={className}>{display}</span>;
};

// ── Code lines shown in the editor card ──────────────────────────────────────

const CODE_LINES = [
  { tokens: [{ t: "const", c: "text-cyan-400 font-semibold" }, { t: " project ", c: "text-gray-200" }, { t: "=", c: "text-cyan-400" }, { t: " {", c: "text-gray-300" }] },
  { tokens: [{ t: "  client:", c: "text-blue-400" }, { t: " 'Your Business',", c: "text-emerald-400" }] },
  { tokens: [{ t: "  stack:", c: "text-blue-400" }, { t: " ['React', 'Node', 'AI'],", c: "text-emerald-400" }] },
  { tokens: [{ t: "  delivery:", c: "text-blue-400" }, { t: " 'on-time',", c: "text-emerald-400" }] },
  { tokens: [{ t: "  quality:", c: "text-blue-400" }, { t: " 'uncompromised',", c: "text-emerald-400" }] },
  { tokens: [{ t: "}", c: "text-gray-300" }] },
  { tokens: [] },
  { tokens: [{ t: "async function", c: "text-cyan-400 font-semibold" }, { t: " build", c: "text-blue-300" }, { t: "(project) {", c: "text-gray-300" }] },
  { tokens: [{ t: "  const", c: "text-cyan-400 font-semibold" }, { t: " result ", c: "text-gray-200" }, { t: "=", c: "text-cyan-400" }, { t: " await", c: "text-purple-400" }] },
  { tokens: [{ t: "    nexcy.ship(project);", c: "text-gray-300" }] },
  { tokens: [{ t: "  return", c: "text-cyan-400 font-semibold" }, { t: " result.success;", c: "text-gray-300" }] },
  { tokens: [{ t: "}", c: "text-gray-300" }] },
  { tokens: [] },
  { tokens: [{ t: "// ✓ ", c: "text-gray-500" }, { t: "Built & deployed", c: "text-emerald-400" }] },
];

// ── Live typing code editor ───────────────────────────────────────────────────

const EDITOR_HEIGHT = 320; // fixed px height for code area

const CodeEditor = () => {
  const [visibleLines, setVisibleLines] = useState(0);
  const [cursorLine, setCursorLine] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let line = 0;
    const next = () => {
      if (line >= CODE_LINES.length) {
        timerRef.current = setTimeout(() => {
          setVisibleLines(0);
          setCursorLine(0);
          line = 0;
          next();
        }, 3000);
        return;
      }
      setVisibleLines(line + 1);
      setCursorLine(line);
      line++;
      timerRef.current = setTimeout(next, CODE_LINES[line - 1].tokens.length === 0 ? 80 : 160);
    };
    timerRef.current = setTimeout(next, 800);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, []);

  // auto-scroll to bottom as lines appear, without resizing container
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [visibleLines]);

  return (
    <div className="w-full rounded-2xl overflow-hidden shadow-2xl shadow-gray-900/20 border border-gray-200/60">
      {/* Title bar */}
      <div className="bg-gray-800 px-4 py-3 flex items-center gap-2">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-400/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
          <div className="w-3 h-3 rounded-full bg-green-400/80" />
        </div>
        <span className="ml-2 text-xs text-gray-400 font-mono tracking-wide">
          nexcy.project.ts
        </span>
        <span className="ml-auto flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          <span className="text-[10px] text-green-400 font-mono">live</span>
        </span>
      </div>

      {/* Code area — fixed height, never reflows */}
      <div
        ref={containerRef}
        className="relative bg-gray-900 px-5 py-5 font-mono text-sm leading-7 overflow-hidden"
        style={{ height: EDITOR_HEIGHT }}
      >
        {/* subtle scanline glow */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            background:
              "repeating-linear-gradient(0deg, #fff 0px, transparent 1px, transparent 2px, #fff 3px)",
          }}
        />

        {CODE_LINES.slice(0, visibleLines).map((line, li) => (
          <motion.div
            key={li}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.15 }}
            className="flex items-center gap-4"
          >
            <span className="text-gray-600 text-xs w-4 text-right select-none flex-shrink-0">
              {li + 1}
            </span>
            <span>
              {line.tokens.map((tok, ti) => (
                <span key={ti} className={tok.c}>{tok.t}</span>
              ))}
              {li === cursorLine && li === visibleLines - 1 && (
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="inline-block w-2 h-4 bg-cyan-400 ml-0.5 align-middle"
                />
              )}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Status bar */}
      <div className="bg-gray-800 px-4 py-1.5 flex items-center gap-4 text-[10px] font-mono text-gray-500">
        <span className="text-blue-400">TypeScript</span>
        <span>·</span>
        <span>UTF-8</span>
        <span className="ml-auto text-green-400">● No errors</span>
      </div>
    </div>
  );
};

// ── Subtle dot-grid background ────────────────────────────────────────────────

const Background = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {/* Radial glow */}
    <div
      className="absolute top-0 right-0 w-[600px] h-[600px] opacity-20 dark:opacity-30"
      style={{
        background: "radial-gradient(circle at 70% 20%, hsl(var(--primary) / 0.15) 0%, transparent 65%)",
      }}
    />
    <div
      className="absolute bottom-0 left-0 w-[500px] h-[500px] opacity-10 dark:opacity-20"
      style={{
        background: "radial-gradient(circle at 30% 80%, hsl(var(--primary) / 0.1) 0%, transparent 65%)",
      }}
    />
    {/* Dot grid */}
    <div
      className="absolute inset-0 opacity-[0.035]"
      style={{
        backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }}
    />
  </div>
);

// ── Floating pill stat ────────────────────────────────────────────────────────

const FloatPill = ({
  label,
  value,
  delay,
  className,
}: {
  label: string;
  value: string;
  delay: number;
  className?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: [0, -6, 0] }}
    transition={{
      opacity: { duration: 0.5, delay },
      y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay },
    }}
    className={`absolute bg-card border border-border rounded-xl px-3.5 py-2.5 shadow-lg shadow-black/5 flex items-center gap-2.5 ${className}`}
  >
    <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
    <div>
      <p className="text-xs font-bold text-card-foreground leading-none mb-0.5">{value}</p>
      <p className="text-[10px] text-gray-400 leading-none">{label}</p>
    </div>
  </motion.div>
);

// ── Hero ──────────────────────────────────────────────────────────────────────

export default function HeroSection({ headline = "Your vision,\nOur mission.", introText = "Empower your business with cutting-edge web, mobile, and AI solutions — built for scalability, performance, and real impact." }: { headline?: string, introText?: string }) {
  const [scramble, setScramble] = useState(false);
  const { scrollY } = useScroll();
  const smooth = useSpring(scrollY, { stiffness: 50, damping: 25 });
  const textY = useTransform(smooth, [0, 500], [0, -80]);
  const textOpacity = useTransform(smooth, [0, 350], [1, 0]);

  useEffect(() => {
    const t = setTimeout(() => setScramble(true), 300);
    return () => clearTimeout(t);
  }, []);

  // Split headline into two parts for the design (if it has a comma or newline, we can split it, otherwise just use it)
  // But let's just make the whole headline scramble for simplicity if it's dynamic, 
  // or we can split it by the first comma or newline.
  const headlineParts = headline.includes(",") ? headline.split(/(,)/) : [headline];

  return (
    <section className="relative min-h-screen bg-background overflow-hidden flex items-center">
      <Background />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-0 lg:min-h-screen lg:flex lg:items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full">

          {/* ── Left: copy ── */}
          <motion.div
            style={{ y: textY, opacity: textOpacity }}
            className="flex flex-col gap-5 sm:gap-6 text-center lg:text-left"
          >
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex items-center gap-2 justify-center lg:justify-start"
            >
              <div className="h-px w-6 bg-primary" />
              <span className="text-xs font-semibold tracking-widest uppercase text-primary">
                Nexcy Technologies
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-[clamp(2.2rem,6vw,4.5rem)] font-heading font-bold leading-[1.08] text-foreground tracking-tight"
            >
              <ScrambleText
                text={headlineParts[0] + (headlineParts[1] || "")}
                trigger={scramble}
                speed={38}
                className="block"
              />
              {headlineParts[2] && (
                <ScrambleText
                  text={headlineParts.slice(2).join("")}
                  trigger={scramble}
                  speed={38}
                  className="block text-primary"
                />
              )}
            </motion.h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="text-muted-foreground text-sm sm:text-base lg:text-lg leading-relaxed max-w-lg mx-auto lg:mx-0"
            >
              {introText}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1 }}
              className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start"
            >
              <Link href="/#contact">
                <GlassButton variant="primary" className="w-full sm:w-auto">
                  <span>Get Started</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </GlassButton>
              </Link>
              <Link href="/#services">
                <GlassButton variant="outline" className="w-full sm:w-auto">
                  Explore Solutions
                </GlassButton>
              </Link>
            </motion.div>

            {/* Inline trust bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.4 }}
              className="flex items-center gap-5 justify-center lg:justify-start pt-2"
            >
              {[
                { v: "CMB", l: "Sri Lanka" },
                { v: "100%", l: "Satisfaction" },
                { v: "24/7", l: "Support" },
              ].map((s, i) => (
                <React.Fragment key={s.l}>
                  {i > 0 && <div className="w-px h-6 bg-border" />}
                  <div className="text-center lg:text-left">
                    <p className="text-sm font-bold text-foreground leading-none mb-0.5">{s.v}</p>
                    <p className="text-[10px] text-gray-400 uppercase tracking-wide">{s.l}</p>
                  </div>
                </React.Fragment>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Right: code editor + floating pills ── */}
          <motion.div
            initial={{ opacity: 0, x: 30, scale: 0.97 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            className="relative flex items-center justify-center px-4 sm:px-8 lg:px-0"
          >
            {/* Floating pills — positioned relative to editor */}
            <div className="relative w-full max-w-md lg:max-w-none">
              <FloatPill
                value="< 50ms"
                label="Response time"
                delay={1.6}
                className="-top-4 -right-2 sm:-right-6 z-10"
              />
              <FloatPill
                value="99.9%"
                label="Uptime SLA"
                delay={2.0}
                className="-bottom-4 -left-2 sm:-left-6 z-10"
              />

              <CodeEditor />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
      >
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5 text-gray-300" />
        </motion.div>
      </motion.div>
    </section>
  );
}
