import * as React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  statusTag?: string;
}

export function Card({ className, statusTag, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "relative bg-[var(--surface)] border border-[var(--border)] rounded-[2px] p-6 sm:p-8 overflow-hidden",
        className
      )}
      {...props}
    >
      {statusTag && (
        <div className="mb-6">
          <span className="inline-block px-2 py-1 text-xs font-[family-name:var(--font-inter)] text-muted border border-[var(--border)] rounded-[2px]">
            {statusTag.replace(/_/g, " ")}
          </span>
        </div>
      )}
      {children}
    </div>
  );
}
