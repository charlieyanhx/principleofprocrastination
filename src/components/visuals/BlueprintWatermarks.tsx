"use client";

export function CrosshairMark({ className }: { className?: string }) {
  return (
    <svg
      width={64}
      height={64}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ opacity: 0.08 }}
    >
      <circle cx={32} cy={32} r={20} stroke="#e5e5e5" strokeWidth={1.5} />
      <line x1={32} y1={4} x2={32} y2={60} stroke="#e5e5e5" strokeWidth={1.5} />
      <line x1={4} y1={32} x2={60} y2={32} stroke="#e5e5e5" strokeWidth={1.5} />
    </svg>
  );
}

export function ConcentricMark({ className }: { className?: string }) {
  return (
    <svg
      width={64}
      height={64}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ opacity: 0.08 }}
    >
      <circle cx={32} cy={32} r={8} stroke="#e5e5e5" strokeWidth={1.5} />
      <circle cx={32} cy={32} r={16} stroke="#e5e5e5" strokeWidth={1.5} />
      <circle cx={32} cy={32} r={24} stroke="#e5e5e5" strokeWidth={1.5} />
    </svg>
  );
}

export function SectionCutMark({ className }: { className?: string }) {
  return (
    <svg
      width={64}
      height={64}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ opacity: 0.1 }}
    >
      <circle cx={32} cy={32} r={14} stroke="#e5e5e5" strokeWidth={1.5} />
      {/* Top arrow pointing outward */}
      <line x1={32} y1={18} x2={32} y2={4} stroke="#e5e5e5" strokeWidth={1.5} />
      <polyline points="27,9 32,4 37,9" stroke="#e5e5e5" strokeWidth={1.5} fill="none" strokeLinejoin="round" />
      {/* Bottom arrow pointing outward */}
      <line x1={32} y1={46} x2={32} y2={60} stroke="#e5e5e5" strokeWidth={1.5} />
      <polyline points="27,55 32,60 37,55" stroke="#e5e5e5" strokeWidth={1.5} fill="none" strokeLinejoin="round" />
    </svg>
  );
}
