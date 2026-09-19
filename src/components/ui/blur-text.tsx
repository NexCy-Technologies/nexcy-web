"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface BlurTextProps {
  text: string;
  className?: string;
  /** ms delay between each word/char */
  delay?: number;
  animateBy?: "words" | "chars";
  direction?: "top" | "bottom";
  threshold?: number;
  rootMargin?: string;
  onAnimationComplete?: () => void;
}

export function BlurText({
  text = "",
  className = "",
  delay = 80,
  animateBy = "words",
  direction = "bottom",
  threshold = 0.05,
  rootMargin = "0px",
  onAnimationComplete,
}: BlurTextProps) {
  const shouldReduceMotion = useReducedMotion();
  const elements = animateBy === "words" ? text.split(" ") : text.split("");
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const completedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Under reduced motion: immediately signal visible + call completion callback
    if (shouldReduceMotion) {
      setInView(true);
      if (!completedRef.current) {
        completedRef.current = true;
        onAnimationComplete?.();
      }
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, shouldReduceMotion, onAnimationComplete]);

  const fromY = direction === "top" ? -16 : 16;

  // Under reduced motion: render fully visible immediately, no per-element animation
  if (shouldReduceMotion) {
    return (
      <span ref={ref} className={`inline ${className}`} aria-label={text}>
        {text}
      </span>
    );
  }

  return (
    <span ref={ref} className={`inline ${className}`} aria-label={text}>
      {elements.map((el, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, filter: "blur(10px)", y: fromY }}
          animate={inView ? { opacity: 1, filter: "blur(0px)", y: 0 } : {}}
          transition={{
            delay: i * (delay / 1000),
            duration: 0.55,
            ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
          }}
          onAnimationComplete={
            i === elements.length - 1
              ? () => {
                  if (!completedRef.current) {
                    completedRef.current = true;
                    onAnimationComplete?.();
                  }
                }
              : undefined
          }
          style={{ display: "inline-block", whiteSpace: "pre" }}
          aria-hidden
        >
          {el}
          {animateBy === "words" && i < elements.length - 1 ? " " : ""}
        </motion.span>
      ))}
    </span>
  );
}
