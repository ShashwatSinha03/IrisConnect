import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

export function Table({ className, ...props }: HTMLAttributes<HTMLTableElement>) {
  return <table className={cn("w-full border-collapse text-left text-sm", className)} {...props} />;
}

export function Th({ className, ...props }: HTMLAttributes<HTMLTableCellElement>) {
  return (
    <th
      className={cn(
        "border-b border-[#1e2235] px-4 py-3 text-xs font-medium uppercase tracking-wider text-[#9498ab]",
        className
      )}
      {...props}
    />
  );
}

export function Td({ className, ...props }: HTMLAttributes<HTMLTableCellElement>) {
  return (
    <td
      className={cn(
        "border-b border-[#1a1d2b] px-4 py-3 text-sm text-[#c8cbd8]",
        className
      )}
      {...props}
    />
  );
}
