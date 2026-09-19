"use client";

import { useEffect, useRef, useCallback } from "react";
import { useReducedMotion } from "framer-motion";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
}

interface ParticlesProps {
  count?: number;
  colors?: string[];
  speed?: number;
  size?: number;
  className?: string;
  connectDistance?: number;
  mouseInteraction?: boolean;
}

export function Particles({
  count = 20,
  colors = ["#00F3FF", "#FAFAFA", "#262626"],
  speed = 0.3,
  size = 1.5,
  className = "",
  connectDistance = 100,
  mouseInteraction = true,
}: ParticlesProps) {
  const shouldReduceMotion = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef<number>(0);

  // All hooks must be called unconditionally (Rules of Hooks)
  // connectDistSq is pre-computed for the draw loop
  const connectDistSq = connectDistance * connectDistance;

  const init = useCallback((canvas: HTMLCanvasElement) => {
    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;
    canvas.width = w;
    canvas.height = h;
    particlesRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * speed,
      vy: (Math.random() - 0.5) * speed,
      size: Math.random() * size + 0.5,
      opacity: Math.random() * 0.5 + 0.2,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
  }, [count, colors, speed, size]);

  useEffect(() => {
    // Under reduced motion: skip the canvas loop entirely — return null is handled below
    if (shouldReduceMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    init(canvas);

    const onMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onLeave = () => { mouseRef.current = { x: -9999, y: -9999 }; };
    if (mouseInteraction) {
      canvas.addEventListener("mousemove", onMouse);
      canvas.addEventListener("mouseleave", onLeave);
    }

    const onResize = () => init(canvas);
    window.addEventListener("resize", onResize);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const particles = particlesRef.current;
      const mouse = mouseRef.current;

      particles.forEach((p) => {
        // Mouse repulsion
        if (mouseInteraction) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 80) {
            const force = (80 - dist) / 80;
            p.vx += (dx / dist) * force * 0.3;
            p.vy += (dy / dist) * force * 0.3;
          }
        }

        // Speed cap
        const spd = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (spd > speed * 3) { p.vx *= 0.98; p.vy *= 0.98; }

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();
      });

      // Connect nearby particles — O(n²) with squared-distance early-exit
      // Avoids Math.sqrt for ~80% of pairs (fast x-axis reject first)
      ctx.globalAlpha = 1;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dxSq = dx * dx;
          if (dxSq > connectDistSq) continue; // Fast x-axis reject
          const dy = particles[i].y - particles[j].y;
          const distSq = dxSq + dy * dy;
          if (distSq > connectDistSq) continue;
          const dist = Math.sqrt(distSq);
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = "#00F3FF";
          ctx.globalAlpha = (1 - dist / connectDistance) * 0.08;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
      if (mouseInteraction) {
        canvas.removeEventListener("mousemove", onMouse);
        canvas.removeEventListener("mouseleave", onLeave);
      }
    };
  }, [init, mouseInteraction, connectDistance, speed, connectDistSq, shouldReduceMotion]);

  // Under reduced motion: render nothing (canvas will not be initialized by the effect)
  if (shouldReduceMotion) {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-auto ${className}`}
      style={{ opacity: 0.4 }}
    />
  );
}
