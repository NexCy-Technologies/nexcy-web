"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ScrollRevealProps {
  text: string;
  className?: string;
  /** ms delay before animation starts */
  delay?: number;
  /** Enable word-by-word stagger */
  stagger?: boolean;
}

export function ScrollReveal({ text, className, delay = 0, stagger = false }: ScrollRevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-5% 0px" });

  // Under reduced motion: render fully visible immediately with no transition
  if (shouldReduceMotion) {
    return (
      <span ref={ref} className={cn("inline-block", className)}>
        {text}
      </span>
    );
  }

  if (stagger) {
    const words = text.split(" ");
    return (
      <span ref={ref} className={cn("inline-block", className)} aria-label={text}>
        {words.map((word, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
            animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{
              delay: delay / 1000 + i * 0.06,
              duration: 0.5,
              ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
            }}
            style={{ display: "inline-block", marginRight: "0.25em" }}
            aria-hidden
          >
            {word}
          </motion.span>
        ))}
      </span>
    );
  }

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
      animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ delay: delay / 1000, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
      className={cn("inline-block", className)}
    >
      {text}
    </motion.span>
  );
}
