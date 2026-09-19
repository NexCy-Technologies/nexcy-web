"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

interface CountUpProps {
  to: number;
  from?: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
  threshold?: number;
}

export function CountUp({
  to,
  from = 0,
  duration = 1.5,
  suffix = "",
  prefix = "",
  className = "",
  threshold = 0.3,
}: CountUpProps) {
  const shouldReduceMotion = useReducedMotion();
  const [count, setCount] = useState(from);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold, started]);

  useEffect(() => {
    if (!started) return;

    // Under reduced motion: jump straight to final number, no rAF loop
    if (shouldReduceMotion) {
      setCount(to);
      return;
    }

    const startTime = performance.now();
    const range = to - from;

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);
      // easeOutExpo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.round(from + range * eased));
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [started, from, to, duration, shouldReduceMotion]);

  return (
    <span ref={ref} className={className}>
      {prefix}{count}{suffix}
    </span>
  );
}
