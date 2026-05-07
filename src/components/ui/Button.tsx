"use client";

import { Link } from "@/i18n/navigation";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  variant?: "solid" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  href?: string;
  className?: string;
  onClick?: () => void;
}

const variantStyles: Record<string, string> = {
  solid: "bg-foreground text-background hover:bg-foreground/90",
  ghost: "text-foreground hover:bg-foreground/5",
  outline: "border border-border text-foreground hover:bg-foreground/5",
};

const sizeStyles: Record<string, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-3 text-sm",
  lg: "px-7 py-3 text-base",
};

export function Button({
  children,
  variant = "solid",
  size = "md",
  href,
  className = "",
  onClick,
}: ButtonProps) {
  const base =
    "rounded-lg font-medium transition-colors inline-flex items-center justify-center";
  const classes = `${base} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
