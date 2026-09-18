"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TerminalRevealProps {
  text: string;
  className?: string;
  typingSpeedMs?: number;
}

export function TerminalReveal({
  text,
  className,
  typingSpeedMs = 20,
}: TerminalRevealProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasCompleted, setHasCompleted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayedText(text);
      setHasCompleted(true);
      return;
    }

    if (isInView && !hasCompleted && !isTyping) {
      setIsTyping(true);
      let i = 0;
      
      const intervalId = setInterval(() => {
        setDisplayedText(text.slice(0, i + 1));
        i++;
        if (i === text.length) {
          clearInterval(intervalId);
          setIsTyping(false);
          // Keep cursor blinking for a moment before hiding it
          setTimeout(() => setHasCompleted(true), 1500);
        }
      }, typingSpeedMs);

      return () => clearInterval(intervalId);
    }
  }, [isInView, hasCompleted, isTyping, text, typingSpeedMs, prefersReducedMotion]);

  if (prefersReducedMotion) {
    return (
      <motion.span
        ref={ref}
        initial={{ opacity: 0 }}
        animate={{ opacity: isInView ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        className={className}
      >
        {text}
      </motion.span>
    );
  }

  return (
    <span ref={ref} className={cn("inline-flex items-center", className)}>
      <span>{displayedText}</span>
      {!hasCompleted && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear",
          }}
          className="inline-block w-[0.5em] h-[1em] bg-accent ml-[0.15em] align-middle"
        />
      )}
    </span>
  );
}
