"use client";

export function WaveformMechanism({ className }: { className?: string }) {
  return (
    <svg
      width={80}
      height={80}
      viewBox="0 0 80 80"
      fill="none"
      className={className}
    >
      <style>{`
        @keyframes waveform-draw {
          0% { stroke-dashoffset: 200; }
          100% { stroke-dashoffset: 0; }
        }
        .waveform-line {
          stroke-dasharray: 200;
          animation: waveform-draw 2s linear infinite;
        }
      `}</style>
      <path
        className="waveform-line"
        d="M0 40 Q10 20 20 40 Q30 60 40 40 Q50 20 60 40 Q70 60 80 40"
        stroke="#e5e5e5"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    </svg>
  );
}

export function GearCaliperMechanism({ className }: { className?: string }) {
  return (
    <svg
      width={80}
      height={80}
      viewBox="0 0 80 80"
      fill="none"
      className={className}
    >
      <style>{`
        @keyframes gear-spin-cw {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes gear-spin-ccw {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        .gear-left {
          transform-origin: 30px 40px;
          animation: gear-spin-cw 4s linear infinite;
        }
        .gear-right {
          transform-origin: 52px 40px;
          animation: gear-spin-ccw 4s linear infinite;
        }
      `}</style>
      {/* Left gear */}
      <g className="gear-left">
        <circle cx={30} cy={40} r={12} stroke="#e5e5e5" strokeWidth={1.5} />
        {[
          { a: 0, x1: 40, y1: 40, x2: 44, y2: 40 },
          { a: 45, x1: 37.07, y1: 47.07, x2: 39.9, y2: 49.9 },
          { a: 90, x1: 30, y1: 50, x2: 30, y2: 54 },
          { a: 135, x1: 22.93, y1: 47.07, x2: 20.1, y2: 49.9 },
          { a: 180, x1: 20, y1: 40, x2: 16, y2: 40 },
          { a: 225, x1: 22.93, y1: 32.93, x2: 20.1, y2: 30.1 },
          { a: 270, x1: 30, y1: 30, x2: 30, y2: 26 },
          { a: 315, x1: 37.07, y1: 32.93, x2: 39.9, y2: 30.1 },
        ].map((t) => (
          <line key={t.a} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} stroke="#e5e5e5" strokeWidth={1.5} />
        ))}
        <circle cx={30} cy={40} r={2} fill="#b98b55" />
      </g>
      {/* Right gear */}
      <g className="gear-right">
        <circle cx={52} cy={40} r={10} stroke="#e5e5e5" strokeWidth={1.5} />
        {[
          { a: 0, x1: 60, y1: 40, x2: 64, y2: 40 },
          { a: 51.4, x1: 57.01, y1: 46.25, x2: 59.51, y2: 49.37 },
          { a: 102.9, x1: 50.22, y1: 47.8, x2: 49.33, y2: 51.7 },
          { a: 154.3, x1: 44.79, y1: 43.47, x2: 41.19, y2: 44.71 },
          { a: 205.7, x1: 44.79, y1: 36.53, x2: 41.19, y2: 35.29 },
          { a: 257.1, x1: 50.22, y1: 32.2, x2: 49.33, y2: 28.3 },
          { a: 308.6, x1: 57.01, y1: 33.75, x2: 59.51, y2: 30.63 },
        ].map((t) => (
          <line key={t.a} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} stroke="#e5e5e5" strokeWidth={1.5} />
        ))}
        <circle cx={52} cy={40} r={2} fill="#b98b55" />
      </g>
    </svg>
  );
}

export function SignalPulseMechanism({ className }: { className?: string }) {
  return (
    <svg
      width={80}
      height={80}
      viewBox="0 0 80 80"
      fill="none"
      className={className}
    >
      <style>{`
        @keyframes pulse-travel {
          0% { cx: 12; }
          25% { cx: 27; }
          50% { cx: 42; }
          75% { cx: 57; }
          100% { cx: 72; }
        }
        .pulse-dot {
          animation: pulse-travel 1.5s linear infinite;
        }
      `}</style>
      {/* Path line */}
      <line
        x1={12}
        y1={40}
        x2={72}
        y2={40}
        stroke="#e5e5e5"
        strokeWidth={1}
        strokeOpacity={0.4}
      />
      {/* Static dots */}
      {[12, 27, 42, 57, 72].map((cx) => (
        <circle key={cx} cx={cx} cy={40} r={3} fill="#e5e5e5" />
      ))}
      {/* Traveling pulse dot */}
      <circle className="pulse-dot" cy={40} r={4} fill="#b98b55" />
    </svg>
  );
}
