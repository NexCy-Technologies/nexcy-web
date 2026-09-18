import * as React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  indexPrefix?: string;
  statusTag?: string;
}

export function Card({ className, indexPrefix, statusTag, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "relative bg-surface border border-border rounded-[2px] p-6 sm:p-8 overflow-hidden",
        className
      )}
      {...props}
    >
      {(indexPrefix || statusTag) && (
        <div className="flex items-start justify-between mb-8 text-muted font-mono text-xs tracking-wider uppercase">
          {indexPrefix && <span>[{indexPrefix}]</span>}
          {statusTag && <span>{statusTag}</span>}
        </div>
      )}
      {children}
    </div>
  );
}
