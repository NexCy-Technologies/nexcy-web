"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface FadeUpStaggerProps {
  children: ReactNode;
  index: number;
  delay?: number;
  className?: string;
}

export function FadeUpStagger({ children, index, delay = 0.1, className }: FadeUpStaggerProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      whileInView={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={
        shouldReduceMotion
          ? { duration: 0 }
          : { delay: index * delay, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }
      }
      className={cn("h-full flex flex-col", className)}
    >
      {children}
    </motion.div>
  );
}
