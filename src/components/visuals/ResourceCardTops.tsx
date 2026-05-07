"use client";

export function TypewriterDecor({ className }: { className?: string }) {
  return (
    <svg
      width="100%"
      height={96}
      viewBox="0 0 400 96"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      className={className}
    >
      <style>{`
        @keyframes typewriter-arm {
          0%, 20% { transform: rotate(0deg); }
          30%, 50% { transform: rotate(-35deg); }
          60%, 100% { transform: rotate(0deg); }
        }
        .tw-arm-0 { transform-origin: 120px 20px; animation: typewriter-arm 2.4s ease-in-out 0s infinite; }
        .tw-arm-1 { transform-origin: 155px 20px; animation: typewriter-arm 2.4s ease-in-out 0.15s infinite; }
        .tw-arm-2 { transform-origin: 190px 20px; animation: typewriter-arm 2.4s ease-in-out 0.3s infinite; }
        .tw-arm-3 { transform-origin: 225px 20px; animation: typewriter-arm 2.4s ease-in-out 0.45s infinite; }
        .tw-arm-4 { transform-origin: 260px 20px; animation: typewriter-arm 2.4s ease-in-out 0.6s infinite; }
        .tw-arm-5 { transform-origin: 295px 20px; animation: typewriter-arm 2.4s ease-in-out 0.75s infinite; }
      `}</style>
      {/* Platen line */}
      <line
        x1={80}
        y1={70}
        x2={320}
        y2={70}
        stroke="#e5e5e5"
        strokeWidth={1.5}
        strokeOpacity={0.3}
      />
      {/* Typewriter arms */}
      {[120, 155, 190, 225, 260, 295].map((x, i) => (
        <line
          key={x}
          className={`tw-arm-${i}`}
          x1={x}
          y1={20}
          x2={x}
          y2={68}
          stroke="#e5e5e5"
          strokeWidth={1.5}
          strokeOpacity={0.3}
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
}

export function SeismographDecor({ className }: { className?: string }) {
  return (
    <svg
      width="100%"
      height={96}
      viewBox="0 0 400 96"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      className={className}
    >
      <style>{`
        @keyframes seis-pendulum {
          0%, 100% { transform: rotate(-8deg); }
          50% { transform: rotate(8deg); }
        }
        @keyframes seis-wave {
          from { transform: translateX(0); }
          to { transform: translateX(-80px); }
        }
        .seis-pendulum {
          transform-origin: 200px 8px;
          animation: seis-pendulum 2s ease-in-out infinite;
        }
        .seis-wave-group {
          animation: seis-wave 2s linear infinite;
        }
      `}</style>
      {/* Pendulum */}
      <g className="seis-pendulum">
        <line
          x1={200}
          y1={8}
          x2={200}
          y2={44}
          stroke="#e5e5e5"
          strokeWidth={1.5}
          strokeOpacity={0.3}
        />
        <circle
          cx={200}
          cy={46}
          r={3}
          stroke="#e5e5e5"
          strokeWidth={1}
          strokeOpacity={0.3}
          fill="none"
        />
      </g>
      {/* Paper strip */}
      <line
        x1={60}
        y1={72}
        x2={340}
        y2={72}
        stroke="#e5e5e5"
        strokeWidth={1}
        strokeOpacity={0.15}
      />
      {/* Waveform on strip */}
      <clipPath id="seis-clip">
        <rect x={60} y={52} width={280} height={40} />
      </clipPath>
      <g clipPath="url(#seis-clip)">
        <g className="seis-wave-group">
          <path
            d="M40 72 Q60 58 80 72 Q100 86 120 72 Q140 58 160 72 Q180 86 200 72 Q220 58 240 72 Q260 86 280 72 Q300 58 320 72 Q340 86 360 72 Q380 58 400 72 Q420 86 440 72"
            stroke="#e5e5e5"
            strokeWidth={1.5}
            strokeOpacity={0.3}
            fill="none"
          />
        </g>
      </g>
    </svg>
  );
}

export function FilmReelDecor({ className }: { className?: string }) {
  return (
    <svg
      width="100%"
      height={96}
      viewBox="0 0 400 96"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      className={className}
    >
      <style>{`
        @keyframes reel-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes film-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-24px); }
        }
        .reel-left {
          transform-origin: 110px 48px;
          animation: reel-spin 3s linear infinite;
        }
        .reel-right {
          transform-origin: 290px 48px;
          animation: reel-spin 3s linear infinite;
        }
        .film-frames {
          animation: film-scroll 0.5s linear infinite;
        }
      `}</style>
      {/* Left reel */}
      <g className="reel-left">
        <circle
          cx={110}
          cy={48}
          r={22}
          stroke="#e5e5e5"
          strokeWidth={1.5}
          strokeOpacity={0.3}
          fill="none"
        />
        <circle
          cx={110}
          cy={48}
          r={6}
          stroke="#e5e5e5"
          strokeWidth={1}
          strokeOpacity={0.3}
          fill="none"
        />
        {[
          { a: 0, x1: 116, y1: 48, x2: 132, y2: 48 },
          { a: 120, x1: 107, y1: 53.2, x2: 99, y2: 67.05 },
          { a: 240, x1: 107, y1: 42.8, x2: 99, y2: 28.95 },
        ].map((t) => (
          <line key={t.a} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} stroke="#e5e5e5" strokeWidth={1} strokeOpacity={0.3} />
        ))}
      </g>
      {/* Right reel */}
      <g className="reel-right">
        <circle
          cx={290}
          cy={48}
          r={22}
          stroke="#e5e5e5"
          strokeWidth={1.5}
          strokeOpacity={0.3}
          fill="none"
        />
        <circle
          cx={290}
          cy={48}
          r={6}
          stroke="#e5e5e5"
          strokeWidth={1}
          strokeOpacity={0.3}
          fill="none"
        />
        {[
          { a: 0, x1: 296, y1: 48, x2: 312, y2: 48 },
          { a: 120, x1: 287, y1: 53.2, x2: 279, y2: 67.05 },
          { a: 240, x1: 287, y1: 42.8, x2: 279, y2: 28.95 },
        ].map((t) => (
          <line key={t.a} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} stroke="#e5e5e5" strokeWidth={1} strokeOpacity={0.3} />
        ))}
      </g>
      {/* Film strip between reels */}
      <line
        x1={132}
        y1={38}
        x2={268}
        y2={38}
        stroke="#e5e5e5"
        strokeWidth={1}
        strokeOpacity={0.15}
      />
      <line
        x1={132}
        y1={58}
        x2={268}
        y2={58}
        stroke="#e5e5e5"
        strokeWidth={1}
        strokeOpacity={0.15}
      />
      {/* Film frames */}
      <clipPath id="film-clip">
        <rect x={132} y={36} width={136} height={24} />
      </clipPath>
      <g clipPath="url(#film-clip)">
        <g className="film-frames">
          {Array.from({ length: 9 }).map((_, i) => (
            <rect
              key={i}
              x={132 + i * 24 - 4}
              y={40}
              width={16}
              height={16}
              rx={1}
              stroke="#e5e5e5"
              strokeWidth={1}
              strokeOpacity={0.3}
              fill="none"
            />
          ))}
        </g>
      </g>
    </svg>
  );
}
