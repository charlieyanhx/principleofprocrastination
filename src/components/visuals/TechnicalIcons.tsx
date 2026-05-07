"use client";

export function BalanceIcon({ className }: { className?: string }) {
  return (
    <svg
      width={36}
      height={36}
      viewBox="0 0 36 36"
      fill="none"
      className={className}
    >
      {/* Base triangle */}
      <polygon
        points="18,30 12,34 24,34"
        stroke="#b98b55"
        strokeWidth={1.5}
        strokeLinejoin="round"
        fill="none"
      />
      {/* Vertical post */}
      <line
        x1={18}
        y1={10}
        x2={18}
        y2={30}
        stroke="#b98b55"
        strokeWidth={1.5}
      />
      {/* Horizontal beam */}
      <line
        x1={6}
        y1={10}
        x2={30}
        y2={10}
        stroke="#b98b55"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      {/* Left pan strings */}
      <line x1={6} y1={10} x2={4} y2={18} stroke="#b98b55" strokeWidth={1.5} />
      <line
        x1={6}
        y1={10}
        x2={12}
        y2={18}
        stroke="#b98b55"
        strokeWidth={1.5}
      />
      {/* Left pan */}
      <path
        d="M3 18 Q8 22 13 18"
        stroke="#b98b55"
        strokeWidth={1.5}
        fill="none"
        strokeLinecap="round"
      />
      {/* Right pan strings */}
      <line
        x1={30}
        y1={10}
        x2={24}
        y2={18}
        stroke="#b98b55"
        strokeWidth={1.5}
      />
      <line
        x1={30}
        y1={10}
        x2={32}
        y2={18}
        stroke="#b98b55"
        strokeWidth={1.5}
      />
      {/* Right pan */}
      <path
        d="M23 18 Q28 22 33 18"
        stroke="#b98b55"
        strokeWidth={1.5}
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function WrenchIcon({ className }: { className?: string }) {
  return (
    <svg
      width={36}
      height={36}
      viewBox="0 0 36 36"
      fill="none"
      className={className}
    >
      <path
        d="M25 5a8 8 0 0 0-7.5 5.2L10.2 17.5a3.5 3.5 0 1 0 4.9 4.9l7.4-7.4A8 8 0 0 0 25 5z"
        stroke="#b98b55"
        strokeWidth={1.5}
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M8 28l4.5-4.5"
        stroke="#b98b55"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    </svg>
  );
}

export function NetworkIcon({ className }: { className?: string }) {
  return (
    <svg
      width={36}
      height={36}
      viewBox="0 0 36 36"
      fill="none"
      className={className}
    >
      {/* Connecting lines */}
      <line
        x1={10}
        y1={28}
        x2={18}
        y2={8}
        stroke="#b98b55"
        strokeWidth={1.5}
      />
      <line
        x1={26}
        y1={28}
        x2={18}
        y2={8}
        stroke="#b98b55"
        strokeWidth={1.5}
      />
      <line
        x1={10}
        y1={28}
        x2={26}
        y2={28}
        stroke="#b98b55"
        strokeWidth={1.5}
      />
      {/* Nodes */}
      <circle cx={18} cy={8} r={3} stroke="#b98b55" strokeWidth={1.5} fill="none" />
      <circle cx={10} cy={28} r={3} stroke="#b98b55" strokeWidth={1.5} fill="none" />
      <circle cx={26} cy={28} r={3} stroke="#b98b55" strokeWidth={1.5} fill="none" />
    </svg>
  );
}

export function DiagnosticIcon({ className }: { className?: string }) {
  return (
    <svg
      width={36}
      height={36}
      viewBox="0 0 36 36"
      fill="none"
      className={className}
    >
      {/* Outer circle */}
      <circle
        cx={18}
        cy={18}
        r={12}
        stroke="#b98b55"
        strokeWidth={1.5}
        fill="none"
      />
      {/* Crosshair lines */}
      <line
        x1={18}
        y1={4}
        x2={18}
        y2={14}
        stroke="#b98b55"
        strokeWidth={1.5}
      />
      <line
        x1={18}
        y1={22}
        x2={18}
        y2={32}
        stroke="#b98b55"
        strokeWidth={1.5}
      />
      <line
        x1={4}
        y1={18}
        x2={14}
        y2={18}
        stroke="#b98b55"
        strokeWidth={1.5}
      />
      <line
        x1={22}
        y1={18}
        x2={32}
        y2={18}
        stroke="#b98b55"
        strokeWidth={1.5}
      />
      {/* Center dot */}
      <circle cx={18} cy={18} r={1.5} fill="#b98b55" />
    </svg>
  );
}

/** Pre-computed gear teeth to avoid hydration mismatch from floating-point Math.sin/cos */
const R = (v: number) => Math.round(v * 100) / 100;
const lgTeeth = [0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
  const rad = (angle * Math.PI) / 180;
  return { angle, x1: R(15 + 7 * Math.cos(rad)), y1: R(18 + 7 * Math.sin(rad)), x2: R(15 + 10 * Math.cos(rad)), y2: R(18 + 10 * Math.sin(rad)) };
});
const smTeeth = [0, 60, 120, 180, 240, 300].map((angle) => {
  const rad = (angle * Math.PI) / 180;
  return { angle, x1: R(26 + 4 * Math.cos(rad)), y1: R(12 + 4 * Math.sin(rad)), x2: R(26 + 7 * Math.cos(rad)), y2: R(12 + 7 * Math.sin(rad)) };
});

export function GearsIcon({ className }: { className?: string }) {
  return (
    <svg
      width={36}
      height={36}
      viewBox="0 0 36 36"
      fill="none"
      className={className}
    >
      {/* Large gear */}
      <circle cx={15} cy={18} r={8} stroke="#b98b55" strokeWidth={1.5} fill="none" />
      <circle cx={15} cy={18} r={3} stroke="#b98b55" strokeWidth={1.5} fill="none" />
      {/* Large gear teeth */}
      {lgTeeth.map((t) => (
        <line key={`lg-${t.angle}`} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} stroke="#b98b55" strokeWidth={1.5} />
      ))}
      {/* Small gear */}
      <circle cx={26} cy={12} r={5} stroke="#b98b55" strokeWidth={1.5} fill="none" />
      <circle cx={26} cy={12} r={2} stroke="#b98b55" strokeWidth={1.5} fill="none" />
      {/* Small gear teeth */}
      {smTeeth.map((t) => (
        <line key={`sm-${t.angle}`} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} stroke="#b98b55" strokeWidth={1.5} />
      ))}
    </svg>
  );
}

export function DraftingIcon({ className }: { className?: string }) {
  return (
    <svg
      width={36}
      height={36}
      viewBox="0 0 36 36"
      fill="none"
      className={className}
    >
      {/* Set square triangle */}
      <polygon
        points="6,32 6,8 30,32"
        stroke="#b98b55"
        strokeWidth={1.5}
        strokeLinejoin="round"
        fill="none"
      />
      {/* Inner right-angle mark */}
      <polyline
        points="6,26 12,26 12,32"
        stroke="#b98b55"
        strokeWidth={1}
        fill="none"
      />
    </svg>
  );
}
