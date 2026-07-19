import { cn } from "@/lib/utils";
import { cloneElement, isValidElement, type ButtonHTMLAttributes, type ReactElement, type ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
  children: ReactNode;
};

const variants = {
  default: "bg-brand-500 text-white hover:bg-brand-600 shadow-xs shadow-brand-500/10",
  secondary: "bg-surface-light text-[#f1f3f7] border border-[#2a2e42] hover:bg-[#222639] hover:border-[#3a3f58] shadow-xs",
  ghost: "bg-transparent text-[#9498ab] hover:bg-[#1a1d2b] hover:text-[#f1f3f7]",
  danger: "bg-red-600 text-white hover:bg-red-700 shadow-xs"
};

const sizes = {
  sm: "h-8 px-3 text-xs",
  md: "h-9 px-4 text-sm",
  lg: "h-10 px-5 text-sm"
};

export function Button({
  className,
  variant = "default",
  size = "md",
  asChild = false,
  children,
  ...props
}: ButtonProps) {
  const buttonClassName = cn(
    "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-dark disabled:pointer-events-none disabled:opacity-50",
    variants[variant],
    sizes[size],
    className
  );

  if (asChild && isValidElement(children)) {
    const child = children as ReactElement<{ className?: string }>;
    return cloneElement(child, {
      className: cn(buttonClassName, child.props.className),
      ...props
    });
  }

  return (
    <button
      className={buttonClassName}
      {...props}
    >
      {children}
    </button>
  );
}
