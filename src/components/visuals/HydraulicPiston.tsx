"use client";

export function HydraulicPiston({ className }: { className?: string }) {
  return (
    <svg
      width={24}
      height={48}
      viewBox="0 0 24 48"
      fill="none"
      className={className}
    >
      <style>{`
        @keyframes piston-stroke {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(14px); }
        }
        .piston-rod {
          animation: piston-stroke 2s ease-in-out infinite;
        }
      `}</style>
      {/* Outer cylinder */}
      <rect
        x={4}
        y={16}
        width={16}
        height={28}
        rx={2}
        stroke="#e5e5e5"
        strokeWidth={1.5}
        fill="none"
      />
      {/* Inner rod */}
      <g className="piston-rod">
        <rect
          x={8}
          y={2}
          width={8}
          height={24}
          rx={1}
          stroke="#b98b55"
          strokeWidth={1.5}
          fill="none"
        />
      </g>
    </svg>
  );
}
