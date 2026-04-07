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
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
          const rad = (angle * Math.PI) / 180;
          const x1 = 30 + 10 * Math.cos(rad);
          const y1 = 40 + 10 * Math.sin(rad);
          const x2 = 30 + 14 * Math.cos(rad);
          const y2 = 40 + 14 * Math.sin(rad);
          return (
            <line
              key={angle}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#e5e5e5"
              strokeWidth={1.5}
            />
          );
        })}
        <circle cx={30} cy={40} r={2} fill="#b98b55" />
      </g>
      {/* Right gear */}
      <g className="gear-right">
        <circle cx={52} cy={40} r={10} stroke="#e5e5e5" strokeWidth={1.5} />
        {[0, 51.4, 102.9, 154.3, 205.7, 257.1, 308.6].map((angle) => {
          const rad = (angle * Math.PI) / 180;
          const x1 = 52 + 8 * Math.cos(rad);
          const y1 = 40 + 8 * Math.sin(rad);
          const x2 = 52 + 12 * Math.cos(rad);
          const y2 = 40 + 12 * Math.sin(rad);
          return (
            <line
              key={angle}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#e5e5e5"
              strokeWidth={1.5}
            />
          );
        })}
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
