"use client"

import { forwardRef } from "react"
import { cn } from "@/lib/utils"
import { Button, type ButtonProps } from "@/components/ui/button"

interface GlassButtonProps extends ButtonProps {
  variant?: "primary" | "secondary" | "outline"
}

const GlassButton = forwardRef<HTMLButtonElement, GlassButtonProps>(
  ({ className, variant = "primary", children, ...props }, ref) => {
    const variants = {
      primary:
        "glass bg-primary/20 hover:bg-primary/30 text-primary border-primary/30 hover:border-primary/50 hover:scale-105 transition-all duration-300",
      secondary:
        "glass bg-secondary/20 hover:bg-secondary/30 text-secondary border-secondary/30 hover:border-secondary/50 hover:scale-105 transition-all duration-300",
      outline:
        "glass bg-white/5 hover:bg-white/10 text-foreground border-white/20 hover:border-white/40 hover:scale-105 transition-all duration-300",
    }

    return (
      <Button
        ref={ref}
        className={cn(
          "relative overflow-hidden rounded-2xl shadow-2xl",
          "px-4 py-3 text-sm sm:px-6 sm:py-4 sm:text-base lg:px-8 lg:py-6 lg:text-lg",
          "min-h-[2.75rem] sm:min-h-[3rem] lg:min-h-[3.5rem]",
          "font-semibold tracking-wide",
          "before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/10 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300",
          "after:absolute after:inset-0 after:bg-gradient-to-r after:from-primary/20 after:via-transparent after:to-primary/20 after:opacity-0 hover:after:opacity-100 after:transition-all after:duration-200 after:animate-pulse",
          variants[variant],
          className,
        )}
        {...props}
      >
        <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>
      </Button>
    )
  },
)

GlassButton.displayName = "GlassButton"

export { GlassButton }
