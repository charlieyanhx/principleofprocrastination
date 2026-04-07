import { ReactNode } from "react";

interface CardProps {
  title?: string;
  body?: string;
  label?: string;
  className?: string;
  children?: ReactNode;
}

export function Card({
  title,
  body,
  label,
  className = "",
  children,
}: CardProps) {
  return (
    <div
      className={`border border-border rounded-xl p-6 md:p-8 hover:border-accent/30 transition-colors ${className}`}
    >
      {children ? (
        children
      ) : (
        <>
          {label && (
            <p className="text-xs uppercase tracking-[0.15em] text-accent font-medium mb-3">
              {label}
            </p>
          )}
          {title && <h3 className="text-lg font-semibold mb-2">{title}</h3>}
          {body && (
            <p className="text-muted text-sm leading-relaxed">{body}</p>
          )}
        </>
      )}
    </div>
  );
}
