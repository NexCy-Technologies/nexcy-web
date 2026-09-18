import { cn } from "@/lib/utils";

export function SectionLabel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "font-mono text-sm uppercase tracking-widest text-muted mb-4 flex items-center",
        className
      )}
    >
      <span className="text-accent mr-3 select-none">{"//"}</span>
      {children}
    </p>
  );
}
