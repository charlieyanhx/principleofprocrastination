"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { useInView } from "framer-motion";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function easeInOut(t: number): number {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function clamp01(t: number): number {
  return Math.max(0, Math.min(1, t));
}

/** Progress of a stage (0..1) given elapsed ms and stage window. */
function stageProgress(elapsed: number, start: number, end: number): number {
  if (elapsed < start) return 0;
  if (elapsed >= end) return 1;
  return easeInOut(clamp01((elapsed - start) / (end - start)));
}

// ---------------------------------------------------------------------------
// Gear tooth path helper
// ---------------------------------------------------------------------------

function gearPath(cx: number, cy: number, r: number, teeth: number): string {
  const toothDepth = r * 0.22;
  const toothHalf = Math.PI / teeth / 2;
  const parts: string[] = [];

  for (let i = 0; i < teeth; i++) {
    const angle = (2 * Math.PI * i) / teeth;
    // base start
    const a0 = angle - toothHalf * 1.4;
    // tooth outer start
    const a1 = angle - toothHalf * 0.6;
    // tooth outer end
    const a2 = angle + toothHalf * 0.6;
    // base end
    const a3 = angle + toothHalf * 1.4;

    const rOuter = r + toothDepth;

    if (i === 0) {
      parts.push(
        `M ${cx + r * Math.cos(a0)} ${cy + r * Math.sin(a0)}`
      );
    }
    parts.push(`L ${cx + rOuter * Math.cos(a1)} ${cy + rOuter * Math.sin(a1)}`);
    parts.push(`L ${cx + rOuter * Math.cos(a2)} ${cy + rOuter * Math.sin(a2)}`);
    parts.push(`L ${cx + r * Math.cos(a3)} ${cy + r * Math.sin(a3)}`);

    // arc along base circle to next tooth
    const nextIdx = (i + 1) % teeth;
    const nextAngle = (2 * Math.PI * nextIdx) / teeth;
    const nextA0 = nextAngle - toothHalf * 1.4;
    parts.push(
      `A ${r} ${r} 0 0 1 ${cx + r * Math.cos(nextA0)} ${cy + r * Math.sin(nextA0)}`
    );
  }
  parts.push("Z");
  return parts.join(" ");
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function ChainReaction({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, amount: 0.4 });
  const hasPlayedRef = useRef(false);
  const rafRef = useRef<number>(0);

  // Elapsed time drives the entire animation
  const [elapsed, setElapsed] = useState(-1); // -1 = not started

  const tick = useCallback((startTime: number) => {
    const now = performance.now();
    const dt = now - startTime;
    setElapsed(dt);
    if (dt < 3200) {
      rafRef.current = requestAnimationFrame(() => tick(startTime));
    }
  }, []);

  useEffect(() => {
    if (inView && !hasPlayedRef.current) {
      hasPlayedRef.current = true;
      const start = performance.now();
      rafRef.current = requestAnimationFrame(() => tick(start));
    }
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [inView, tick]);

  // ----- derived values -----
  const t = Math.max(0, elapsed);

  // Stage 1: ball rolls (0-600)
  const s1 = stageProgress(t, 0, 600);
  const ballX = lerp(80, 250, s1);

  // Stage 2: lever rotates (600-1200)
  const s2 = stageProgress(t, 600, 1200);
  const leverAngle = lerp(0, 30, s2);

  // Stage 3: gears rotate (1200-2000)
  const s3 = stageProgress(t, 1200, 2000);
  const gearRotation = lerp(0, 360, s3);

  // Stage 4: counterweight drops (2000-2600)
  const s4 = stageProgress(t, 2000, 2600);
  const weightY = lerp(0, 40, s4);

  // Stage 5: final lever + gold dot (2600-3000)
  const s5 = stageProgress(t, 2600, 3200);
  const finalLeverAngle = lerp(0, 35, s5);
  const dotOpacity = clamp01(stageProgress(t, 2900, 3200));

  // Colors
  const rest = "#e5e5e5";
  const gold = "#b98b55";
  const sw = 1.5;

  const activeColor = (stage: number) => {
    if (stage === 1 && s1 > 0) return gold;
    if (stage === 2 && s2 > 0) return gold;
    if (stage === 3 && s3 > 0) return gold;
    if (stage === 4 && s4 > 0) return gold;
    if (stage === 5 && s5 > 0) return gold;
    return rest;
  };

  // Gear centres
  const gear1Cx = 430;
  const gear1Cy = 70;
  const gear1R = 20;
  const gear2Cx = gear1Cx + gear1R + 14 - 2; // meshing overlap
  const gear2Cy = 70;
  const gear2R = 14;

  // Lever 1 pivot
  const lever1Px = 250;
  const lever1Py = 95;

  // Final lever pivot
  const finalPx = 900;
  const finalPy = 95;

  return (
    <div ref={containerRef} className={className}>
      {/* Mobile: show simplified static version */}
      <svg
        viewBox="0 0 1152 140"
        xmlns="http://www.w3.org/2000/svg"
        className="hidden w-full md:block"
        aria-label="Mechanical chain reaction animation"
        role="img"
      >
        {/* ============ STATIC ELEMENTS ============ */}

        {/* Track / rail line */}
        <line
          x1={40} y1={101} x2={270} y2={101}
          stroke={rest} strokeWidth={sw} fill="none"
        />

        {/* Support tick marks for track */}
        <line x1={60} y1={101} x2={60} y2={110} stroke={rest} strokeWidth={sw} />
        <line x1={160} y1={101} x2={160} y2={110} stroke={rest} strokeWidth={sw} />
        <line x1={260} y1={101} x2={260} y2={110} stroke={rest} strokeWidth={sw} />

        {/* Gear mounting rail */}
        <line
          x1={400} y1={105} x2={500} y2={105}
          stroke={rest} strokeWidth={sw} fill="none"
        />

        {/* Chain/cable from gears to counterweight */}
        <line
          x1={gear2Cx + gear2R} y1={gear2Cy}
          x2={700} y2={55 + weightY}
          stroke={activeColor(4)}
          strokeWidth={sw}
          fill="none"
        />

        {/* Counterweight rail */}
        <line
          x1={690} y1={45} x2={690} y2={110}
          stroke={rest} strokeWidth={sw} fill="none"
          strokeDasharray="3 3"
        />
        <line
          x1={710} y1={45} x2={710} y2={110}
          stroke={rest} strokeWidth={sw} fill="none"
          strokeDasharray="3 3"
        />

        {/* Cable from counterweight to final lever */}
        <line
          x1={710} y1={65 + weightY}
          x2={finalPx - 40} y2={finalPy - 15}
          stroke={activeColor(5)}
          strokeWidth={sw}
          fill="none"
        />

        {/* Final lever base */}
        <circle
          cx={finalPx} cy={finalPy}
          r={3}
          stroke={rest} strokeWidth={sw} fill="none"
        />

        {/* Endpoint platform */}
        <line
          x1={1020} y1={95} x2={1080} y2={95}
          stroke={rest} strokeWidth={sw} fill="none"
        />

        {/* ============ ANIMATED ELEMENTS ============ */}

        {/* Stage 1: Rolling ball */}
        <circle
          cx={ballX}
          cy={95}
          r={6}
          stroke={activeColor(1)}
          strokeWidth={sw}
          fill={s1 > 0 && s1 < 1 ? gold : "none"}
          opacity={s1 > 0 ? 1 : 0.6}
        />

        {/* Stage 2: Lever arm */}
        <g transform={`rotate(${-leverAngle} ${lever1Px} ${lever1Py})`}>
          <line
            x1={lever1Px - 15}
            y1={lever1Py}
            x2={lever1Px + 60}
            y2={lever1Py - 50}
            stroke={activeColor(2)}
            strokeWidth={sw}
            fill="none"
          />
          {/* Pivot dot */}
          <circle
            cx={lever1Px}
            cy={lever1Py}
            r={3}
            stroke={activeColor(2)}
            strokeWidth={sw}
            fill="none"
          />
        </g>

        {/* Connecting line from lever tip to gear area */}
        <line
          x1={lerp(lever1Px + 45, lever1Px + 30, s2)}
          y1={lerp(lever1Py - 40, lever1Py - 55, s2)}
          x2={gear1Cx - gear1R}
          y2={gear1Cy}
          stroke={s2 > 0 ? gold : rest}
          strokeWidth={sw}
          fill="none"
          strokeDasharray="4 3"
        />

        {/* Stage 3: Gear 1 (large) */}
        <g transform={`rotate(${gearRotation} ${gear1Cx} ${gear1Cy})`}>
          <path
            d={gearPath(gear1Cx, gear1Cy, gear1R, 8)}
            stroke={activeColor(3)}
            strokeWidth={sw}
            fill="none"
          />
          <circle
            cx={gear1Cx}
            cy={gear1Cy}
            r={4}
            stroke={activeColor(3)}
            strokeWidth={sw}
            fill="none"
          />
        </g>

        {/* Stage 3: Gear 2 (small, counter-rotates) */}
        <g transform={`rotate(${-gearRotation * (gear1R / gear2R)} ${gear2Cx} ${gear2Cy})`}>
          <path
            d={gearPath(gear2Cx, gear2Cy, gear2R, 8)}
            stroke={activeColor(3)}
            strokeWidth={sw}
            fill="none"
          />
          <circle
            cx={gear2Cx}
            cy={gear2Cy}
            r={3}
            stroke={activeColor(3)}
            strokeWidth={sw}
            fill="none"
          />
        </g>

        {/* Gear mounting posts */}
        <line
          x1={gear1Cx} y1={gear1Cy + gear1R + 5}
          x2={gear1Cx} y2={105}
          stroke={rest} strokeWidth={sw}
        />
        <line
          x1={gear2Cx} y1={gear2Cy + gear2R + 5}
          x2={gear2Cx} y2={105}
          stroke={rest} strokeWidth={sw}
        />

        {/* Stage 4: Counterweight */}
        <rect
          x={692}
          y={55 + weightY}
          width={16}
          height={20}
          rx={2}
          stroke={activeColor(4)}
          strokeWidth={sw}
          fill={s4 > 0 ? gold : "none"}
          fillOpacity={s4 > 0 ? 0.15 : 0}
        />

        {/* Stage 5: Final lever arm */}
        <g transform={`rotate(${finalLeverAngle} ${finalPx} ${finalPy})`}>
          <line
            x1={finalPx - 50}
            y1={finalPy}
            x2={finalPx + 70}
            y2={finalPy - 10}
            stroke={activeColor(5)}
            strokeWidth={sw}
            fill="none"
          />
          <circle
            cx={finalPx}
            cy={finalPy}
            r={3}
            stroke={activeColor(5)}
            strokeWidth={sw}
            fill="none"
          />
        </g>

        {/* Stage 5: Gold "light" dot */}
        <circle
          cx={1050}
          cy={80}
          r={8}
          stroke={gold}
          strokeWidth={sw}
          fill={gold}
          fillOpacity={dotOpacity * 0.9}
          opacity={0.3 + dotOpacity * 0.7}
        />
        {/* Glow ring */}
        <circle
          cx={1050}
          cy={80}
          r={14}
          stroke={gold}
          strokeWidth={1}
          fill="none"
          opacity={dotOpacity * 0.5}
        />
      </svg>

      {/* Mobile: simplified static mark */}
      <svg
        viewBox="0 0 200 40"
        xmlns="http://www.w3.org/2000/svg"
        className="block w-full md:hidden"
        aria-label="Mechanical chain reaction"
        role="img"
      >
        <line
          x1={10} y1={20} x2={170} y2={20}
          stroke={elapsed > 0 ? gold : rest}
          strokeWidth={sw}
          fill="none"
        />
        <circle
          cx={elapsed > 0 ? 170 : 30}
          cy={20}
          r={5}
          stroke={elapsed > 0 ? gold : rest}
          strokeWidth={sw}
          fill={elapsed > 2600 ? gold : "none"}
        />
        <circle
          cx={185}
          cy={20}
          r={6}
          stroke={gold}
          strokeWidth={sw}
          fill={gold}
          fillOpacity={dotOpacity * 0.9}
          opacity={0.3 + dotOpacity * 0.7}
        />
      </svg>
    </div>
  );
}
