"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center border border-border bg-transparent text-foreground rounded-[2px]",
          "px-6 py-3 font-mono font-medium tracking-wide uppercase transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "hover:bg-accent hover:text-[#0A0A0A] hover:border-accent",
          "active:bg-accent active:text-[#0A0A0A] active:border-accent",
          "disabled:opacity-50 disabled:pointer-events-none",
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
