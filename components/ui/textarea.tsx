import { cn } from "@/lib/utils";
import type { TextareaHTMLAttributes } from "react";

export function Textarea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "min-h-[80px] w-full rounded-lg border border-[#2a2e42] bg-surface-light px-3 py-2 text-sm text-[#f1f3f7] outline-none transition-all duration-150",
        "placeholder:text-[#5c6070]",
        "focus:border-brand-500/50 focus:ring-2 focus:ring-brand-500/15",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
}
