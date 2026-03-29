import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

import { cn } from "../../lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";

type ButtonProps = PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> & {
  variant?: ButtonVariant;
};

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-ink text-white hover:bg-black/90 focus-visible:outline-ink shadow-[0_12px_30px_rgba(19,22,29,0.18)]",
  secondary:
    "bg-accent text-white hover:bg-accent/90 focus-visible:outline-accent shadow-[0_12px_24px_rgba(15,118,110,0.18)]",
  ghost: "bg-white text-ink hover:bg-black/5 focus-visible:outline-ink border border-line",
};

export function Button({ children, className, variant = "primary", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-2xl px-4 py-2.5 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60",
        variantStyles[variant],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

