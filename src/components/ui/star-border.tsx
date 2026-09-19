"use client";

import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface StarBorderProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: string;
  speed?: string;
}

export function StarBorder({
  className,
  children,
  color = "#00F3FF",
  speed = "6s",
  ...props
}: StarBorderProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <button
      className={cn(
        "relative inline-block overflow-hidden rounded-sm p-[1px] group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--accent)]",
        className
      )}
      {...props}
    >
      {!shouldReduceMotion && (
        <span
          className="absolute inset-[-1000%] animate-[spin_var(--speed)_linear_infinite] opacity-70 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `conic-gradient(from 90deg at 50% 50%, transparent 0%, ${color} 50%, transparent 100%)`,
            "--speed": speed,
          } as React.CSSProperties}
        />
      )}
      {shouldReduceMotion && (
        <span
          className="absolute inset-0 border border-solid opacity-50 group-hover:opacity-100 transition-opacity duration-300 rounded-sm"
          style={{ borderColor: color }}
        />
      )}
      <div className="relative h-full w-full bg-background rounded-[1px] z-10 transition-colors group-hover:bg-surface flex items-center justify-center">
        {children}
      </div>
    </button>
  );
}
