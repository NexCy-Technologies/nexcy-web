"use client"

import type React from "react"

import { cn } from "@/lib/utils"
import { useGlassGlow } from "@/hooks/use-glass-glow"

interface GlassCardProps {
  children: React.ReactNode
  className?: string
  variant?: "default" | "hero" | "service" | "team"
}

export function GlassCard({ children, className, variant = "default" }: GlassCardProps) {
  const { glowIntensity } = useGlassGlow()

  const variants = {
    default: "backdrop-blur-2xl bg-white/8 border border-white/15 rounded-3xl",
    hero: "backdrop-blur-2xl bg-white/6 border border-white/12 rounded-tl-3xl rounded-tr-3xl rounded-bl-3xl rounded-br-[4rem]",
    service:
      "backdrop-blur-xl bg-white/6 border border-white/12 hover:bg-white/10 transition-all duration-300 rounded-3xl",
    team: "backdrop-blur-xl bg-white/8 border border-white/15 hover:bg-white/12 transition-all duration-300 rounded-3xl",
  }

  return (
    <div
      className={cn(variants[variant], "relative overflow-hidden", className)}
      style={{
        boxShadow: `0 12px 40px rgba(59, 130, 246, ${glowIntensity * 0.4}), 
                   0 0 0 1px rgba(255, 255, 255, ${glowIntensity * 0.25}) inset,
                   0 2px 0 rgba(255, 255, 255, ${glowIntensity * 0.5}) inset,
                   0 -1px 0 rgba(0, 0, 0, 0.1) inset`,
      }}
    >
      <div
        className="absolute inset-0 bg-gradient-to-br from-white/25 via-white/5 to-transparent opacity-40 pointer-events-none rounded-3xl"
        style={{ opacity: glowIntensity * 0.6 }}
      />
      <div
        className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/15 to-transparent opacity-30 pointer-events-none rounded-t-3xl"
        style={{ opacity: glowIntensity * 0.4 }}
      />
      {children}
    </div>
  )
}
