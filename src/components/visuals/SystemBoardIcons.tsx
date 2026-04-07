"use client";

/* -----------------------------------------------------------------------
 * SystemBoardIcons – three 48×48 animated mechanical SVG icons inspired
 * by Arthur Ganson's kinetic sculptures.
 *
 * Pure SVG + CSS keyframe animation. No JS animation loop.
 * Designed for dark backgrounds: white strokes at 40% opacity, gold pivots.
 * ----------------------------------------------------------------------- */

const STROKE = "rgba(255,255,255,0.4)";
const GOLD = "#b98b55";

// ---------------------------------------------------------------------------
// 1. GearTrainIcon – three interlocking gears in a row
// ---------------------------------------------------------------------------

function gearPath(cx: number, cy: number, r: number, teeth: number): string {
  // Build a gear outline: a circle with rectangular teeth protruding outward.
  const inner = r - 1.2;
  const outer = r + 1.2;
  const segments: string[] = [];
  for (let i = 0; i < teeth; i++) {
    const a0 = (Math.PI * 2 * i) / teeth;
    const a1 = a0 + (Math.PI * 2) / teeth / 3;
    const a2 = a1 + (Math.PI * 2) / teeth / 3;
    const a3 = a2 + (Math.PI * 2) / teeth / 3;
    segments.push(
      `${i === 0 ? "M" : "L"} ${cx + inner * Math.cos(a0)} ${cy + inner * Math.sin(a0)}`,
      `L ${cx + outer * Math.cos(a1)} ${cy + outer * Math.sin(a1)}`,
      `L ${cx + outer * Math.cos(a2)} ${cy + outer * Math.sin(a2)}`,
      `L ${cx + inner * Math.cos(a3)} ${cy + inner * Math.sin(a3)}`,
    );
  }
  segments.push("Z");
  return segments.join(" ");
}

const GEAR_R = 7;
const GEAR_TEETH = 8;
const GEAR_SPACING = GEAR_R * 2 + 1.6; // slight overlap so teeth mesh

export function GearTrainIcon({ className }: { className?: string }) {
  const cx = 24;
  const cy = 24;
  const leftCx = cx - GEAR_SPACING;
  const rightCx = cx + GEAR_SPACING;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      width={48}
      height={48}
      className={className}
      aria-label="Gear train icon"
    >
      <style>{`
        @keyframes gear-cw {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes gear-ccw {
          from { transform: rotate(0deg); }
          to   { transform: rotate(-360deg); }
        }
        .gear-mid  { animation: gear-cw  4s linear infinite; }
        .gear-side { animation: gear-ccw 4s linear infinite; }
      `}</style>

      {/* Middle gear */}
      <g className="gear-mid" style={{ transformOrigin: `${cx}px ${cy}px` }}>
        <path
          d={gearPath(cx, cy, GEAR_R, GEAR_TEETH)}
          fill="none"
          stroke={STROKE}
          strokeWidth={1}
        />
      </g>

      {/* Left gear */}
      <g className="gear-side" style={{ transformOrigin: `${leftCx}px ${cy}px` }}>
        <path
          d={gearPath(leftCx, cy, GEAR_R, GEAR_TEETH)}
          fill="none"
          stroke={STROKE}
          strokeWidth={1}
        />
      </g>

      {/* Right gear */}
      <g className="gear-side" style={{ transformOrigin: `${rightCx}px ${cy}px` }}>
        <path
          d={gearPath(rightCx, cy, GEAR_R, GEAR_TEETH)}
          fill="none"
          stroke={STROKE}
          strokeWidth={1}
        />
      </g>

      {/* Pivot dots */}
      <circle cx={leftCx} cy={cy} r={1.5} fill={GOLD} />
      <circle cx={cx} cy={cy} r={1.5} fill={GOLD} />
      <circle cx={rightCx} cy={cy} r={1.5} fill={GOLD} />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// 2. CamMechanismIcon – rotating egg-cam with vertical follower
// ---------------------------------------------------------------------------

export function CamMechanismIcon({ className }: { className?: string }) {
  const cx = 24;
  const cy = 28;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      width={48}
      height={48}
      className={className}
      aria-label="Cam mechanism icon"
    >
      <style>{`
        @keyframes cam-rotate {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes follower-bounce {
          0%   { transform: translateY(0); }
          25%  { transform: translateY(-7px); }
          50%  { transform: translateY(-3px); }
          75%  { transform: translateY(-8px); }
          100% { transform: translateY(0); }
        }
        .cam-body     { animation: cam-rotate 4s linear infinite; }
        .cam-follower { animation: follower-bounce 4s ease-in-out infinite; }
      `}</style>

      {/* Guide rail */}
      <line
        x1={cx}
        y1={4}
        x2={cx}
        y2={22}
        stroke={STROKE}
        strokeWidth={0.5}
        strokeDasharray="1.5 1.5"
      />

      {/* Rotating egg-shaped cam */}
      <g className="cam-body" style={{ transformOrigin: `${cx}px ${cy}px` }}>
        <ellipse
          cx={cx}
          cy={cy - 1.5}
          rx={6}
          ry={9}
          fill="none"
          stroke={STROKE}
          strokeWidth={1}
        />
      </g>

      {/* Follower assembly */}
      <g className="cam-follower">
        {/* Follower bar */}
        <rect
          x={cx - 4}
          y={14}
          width={8}
          height={2.5}
          rx={0.5}
          fill="none"
          stroke={STROKE}
          strokeWidth={1}
        />
        {/* Follower stem */}
        <line
          x1={cx}
          y1={8}
          x2={cx}
          y2={14}
          stroke={STROKE}
          strokeWidth={1}
        />
        {/* Top contact pad */}
        <rect
          x={cx - 2.5}
          y={6}
          width={5}
          height={2}
          rx={0.5}
          fill="none"
          stroke={STROKE}
          strokeWidth={1}
        />
      </g>

      {/* Cam pivot (gold, on top) */}
      <circle cx={cx} cy={cy} r={1.5} fill={GOLD} />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// 3. PistonIcon – slider-crank: rotating wheel + connecting rod + piston
// ---------------------------------------------------------------------------

export function PistonIcon({ className }: { className?: string }) {
  // Wheel center
  const wcx = 14;
  const wcy = 24;
  const wheelR = 7;
  // Crank pin offset from wheel center
  const crankR = 5;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      width={48}
      height={48}
      className={className}
      aria-label="Piston icon"
    >
      <style>{`
        @keyframes wheel-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes piston-slide {
          0%   { transform: translateX(5px); }
          50%  { transform: translateX(-5px); }
          100% { transform: translateX(5px); }
        }
        @keyframes rod-motion {
          0%   { transform: translateX(5px) rotate(-8deg); }
          25%  { transform: translateX(0px) rotate(4deg); }
          50%  { transform: translateX(-5px) rotate(8deg); }
          75%  { transform: translateX(0px) rotate(-4deg); }
          100% { transform: translateX(5px) rotate(-8deg); }
        }
        .piston-wheel  { animation: wheel-spin   4s linear infinite; }
        .piston-head   { animation: piston-slide  4s ease-in-out infinite; }
        .piston-rod    { animation: rod-motion    4s ease-in-out infinite; }
      `}</style>

      {/* Wheel */}
      <g className="piston-wheel" style={{ transformOrigin: `${wcx}px ${wcy}px` }}>
        <circle
          cx={wcx}
          cy={wcy}
          r={wheelR}
          fill="none"
          stroke={STROKE}
          strokeWidth={1}
        />
        {/* Spokes */}
        {[0, 60, 120].map((deg) => {
          const rad = (deg * Math.PI) / 180;
          return (
            <line
              key={deg}
              x1={wcx - (wheelR - 1) * Math.cos(rad)}
              y1={wcy - (wheelR - 1) * Math.sin(rad)}
              x2={wcx + (wheelR - 1) * Math.cos(rad)}
              y2={wcy + (wheelR - 1) * Math.sin(rad)}
              stroke={STROKE}
              strokeWidth={0.5}
            />
          );
        })}
        {/* Crank pin */}
        <circle
          cx={wcx + crankR}
          cy={wcy}
          r={1}
          fill={GOLD}
        />
      </g>

      {/* Connecting rod */}
      <g
        className="piston-rod"
        style={{ transformOrigin: `${wcx + crankR}px ${wcy}px` }}
      >
        <line
          x1={wcx + crankR}
          y1={wcy}
          x2={36}
          y2={wcy}
          stroke={STROKE}
          strokeWidth={1}
        />
      </g>

      {/* Piston head */}
      <g className="piston-head">
        <rect
          x={34}
          y={wcy - 4}
          width={8}
          height={8}
          rx={1}
          fill="none"
          stroke={STROKE}
          strokeWidth={1}
        />
        {/* Piston wrist pin */}
        <circle cx={34} cy={wcy} r={1} fill={GOLD} />
      </g>

      {/* Guide rails */}
      <line
        x1={30}
        y1={wcy - 6}
        x2={46}
        y2={wcy - 6}
        stroke={STROKE}
        strokeWidth={0.5}
      />
      <line
        x1={30}
        y1={wcy + 6}
        x2={46}
        y2={wcy + 6}
        stroke={STROKE}
        strokeWidth={0.5}
      />

      {/* Wheel pivot (gold, on top) */}
      <circle cx={wcx} cy={wcy} r={1.5} fill={GOLD} />
    </svg>
  );
}
