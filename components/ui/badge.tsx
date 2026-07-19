import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

export function Badge({
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-[#2a2e42] bg-surface-light px-2.5 py-0.5 text-[11px] font-medium text-[#9498ab]",
        className
      )}
      {...props}
    />
  );
}
