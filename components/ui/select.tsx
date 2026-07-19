import { cn } from "@/lib/utils";
import type { SelectHTMLAttributes } from "react";

export function Select({ className, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={cn(
        "h-9 w-full rounded-lg border border-[#2a2e42] bg-surface-light px-3 text-sm text-[#f1f3f7] outline-none transition-all duration-150",
        "focus:border-brand-500/50 focus:ring-2 focus:ring-brand-500/15",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
}
