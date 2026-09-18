import { cn } from "@/lib/utils";

export function BlueprintGrid({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "fixed inset-0 z-[-1] pointer-events-none opacity-[0.03] sm:opacity-[0.04]",
        className
      )}
      style={{
        backgroundImage: `
          linear-gradient(to right, var(--color-border) 1px, transparent 1px),
          linear-gradient(to bottom, var(--color-border) 1px, transparent 1px)
        `,
        backgroundSize: "40px 40px",
      }}
    />
  );
}
