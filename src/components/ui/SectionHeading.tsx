interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  body?: string;
  className?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  eyebrow,
  title,
  body,
  className = "",
  align = "left",
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <div className={`${centered ? "text-center" : ""} ${className}`}>
      {eyebrow && (
        <p className="text-xs uppercase tracking-[0.2em] text-accent font-medium mb-3">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight leading-tight">
        {title}
      </h2>
      {body && (
        <p
          className={`text-lg text-muted mt-6 max-w-2xl ${centered ? "mx-auto" : ""}`}
        >
          {body}
        </p>
      )}
    </div>
  );
}
