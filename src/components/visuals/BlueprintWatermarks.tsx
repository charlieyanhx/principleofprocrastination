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
      style={{ opacity: 0.12 }}
    >
      <style>{`
        @keyframes crosshair-spin {
          0% { transform: rotate(0deg); transform-origin: 32px 32px; }
          100% { transform: rotate(360deg); transform-origin: 32px 32px; }
        }
        @keyframes crosshair-pulse {
          0%, 100% { opacity: 0.12; }
          50% { opacity: 0.25; }
        }
        .crosshair-ring { animation: crosshair-spin 20s linear infinite; }
        .crosshair-lines { animation: crosshair-spin 30s linear infinite reverse; }
        .crosshair-center { animation: crosshair-pulse 3s ease-in-out infinite; }
      `}</style>
      <g className="crosshair-ring">
        <circle cx={32} cy={32} r={20} stroke="#b98b55" strokeWidth={1} />
      </g>
      <g className="crosshair-lines">
        <line x1={32} y1={4} x2={32} y2={60} stroke="#e5e5e5" strokeWidth={1} />
        <line x1={4} y1={32} x2={60} y2={32} stroke="#e5e5e5" strokeWidth={1} />
      </g>
      <circle className="crosshair-center" cx={32} cy={32} r={3} fill="#b98b55" opacity={0.3} />
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
      style={{ opacity: 0.12 }}
    >
      <style>{`
        @keyframes concentric-expand {
          0%, 100% { r: 8; opacity: 0.5; }
          50% { r: 10; opacity: 0.2; }
        }
        @keyframes concentric-mid {
          0%, 100% { r: 16; opacity: 0.35; }
          50% { r: 18; opacity: 0.15; }
        }
        @keyframes concentric-outer {
          0%, 100% { r: 24; opacity: 0.2; }
          50% { r: 26; opacity: 0.08; }
        }
        .ring-inner { animation: concentric-expand 3s ease-in-out infinite; }
        .ring-mid { animation: concentric-mid 3s ease-in-out 0.5s infinite; }
        .ring-outer { animation: concentric-outer 3s ease-in-out 1s infinite; }
      `}</style>
      <circle className="ring-inner" cx={32} cy={32} r={8} stroke="#b98b55" strokeWidth={1} />
      <circle className="ring-mid" cx={32} cy={32} r={16} stroke="#e5e5e5" strokeWidth={1} />
      <circle className="ring-outer" cx={32} cy={32} r={24} stroke="#e5e5e5" strokeWidth={1} />
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
      style={{ opacity: 0.12 }}
    >
      <style>{`
        @keyframes cut-pulse-up {
          0%, 100% { transform: translateY(0); opacity: 0.4; }
          50% { transform: translateY(-3px); opacity: 0.8; }
        }
        @keyframes cut-pulse-down {
          0%, 100% { transform: translateY(0); opacity: 0.4; }
          50% { transform: translateY(3px); opacity: 0.8; }
        }
        @keyframes cut-ring-rotate {
          0% { transform: rotate(0deg); transform-origin: 32px 32px; }
          100% { transform: rotate(360deg); transform-origin: 32px 32px; }
        }
        .cut-ring { animation: cut-ring-rotate 25s linear infinite; }
        .cut-arrow-up { animation: cut-pulse-up 2.5s ease-in-out infinite; }
        .cut-arrow-down { animation: cut-pulse-down 2.5s ease-in-out infinite; }
      `}</style>
      <g className="cut-ring">
        <circle cx={32} cy={32} r={14} stroke="#e5e5e5" strokeWidth={1} />
        <circle cx={32} cy={32} r={14} stroke="#b98b55" strokeWidth={1} strokeDasharray="4 8" />
      </g>
      <g className="cut-arrow-up">
        <line x1={32} y1={18} x2={32} y2={4} stroke="#b98b55" strokeWidth={1.5} />
        <polyline points="27,9 32,4 37,9" stroke="#b98b55" strokeWidth={1.5} fill="none" strokeLinejoin="round" />
      </g>
      <g className="cut-arrow-down">
        <line x1={32} y1={46} x2={32} y2={60} stroke="#b98b55" strokeWidth={1.5} />
        <polyline points="27,55 32,60 37,55" stroke="#b98b55" strokeWidth={1.5} fill="none" strokeLinejoin="round" />
      </g>
    </svg>
  );
}
