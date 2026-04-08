"use client";

import { useRef, useState, useEffect } from "react";
import { useInView } from "framer-motion";

/**
 * Conveyor belt animation: two rollers connected by a belt,
 * with small items traveling across. Loops once when scrolled into view.
 */
export function ChainReaction({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (inView) setStarted(true);
  }, [inView]);

  const gold = "#b98b55";
  const rest = "#d4d4d4";
  const sw = 1.5;

  // Belt geometry
  const leftCx = 100, rightCx = 500, beltY = 50, rollerR = 18;
  const beltTop = beltY - rollerR;
  const beltBottom = beltY + rollerR;

  // Items: 4 small boxes traveling along the top belt
  const items = [0, 1, 2, 3];
  const itemW = 16, itemH = 12;

  return (
    <div ref={ref} className={`my-14 ${className ?? ""}`}>
      <svg
        viewBox="0 0 600 100"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full max-w-2xl mx-auto block"
        aria-label="Conveyor belt animation"
        role="img"
      >
        <defs>
          <style>{`
            @keyframes roll {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
            @keyframes moveItem {
              0% { transform: translateX(0); opacity: 0; }
              5% { opacity: 1; }
              90% { opacity: 1; }
              100% { transform: translateX(${rightCx - leftCx - itemW}px); opacity: 0; }
            }
            .roller-spin {
              animation: roll 2s linear infinite;
              transform-origin: var(--cx) var(--cy);
            }
            .belt-item {
              animation: moveItem 3s ease-in-out forwards;
            }
          `}</style>
        </defs>

        {/* Belt lines (top and bottom) */}
        <line
          x1={leftCx} y1={beltTop} x2={rightCx} y2={beltTop}
          stroke={started ? gold : rest} strokeWidth={sw}
          style={{ transition: "stroke 0.5s" }}
        />
        <line
          x1={leftCx} y1={beltBottom} x2={rightCx} y2={beltBottom}
          stroke={started ? gold : rest} strokeWidth={sw}
          style={{ transition: "stroke 0.5s" }}
        />

        {/* Left roller */}
        <g
          className={started ? "roller-spin" : ""}
          style={{ "--cx": `${leftCx}px`, "--cy": `${beltY}px` } as React.CSSProperties}
        >
          <circle
            cx={leftCx} cy={beltY} r={rollerR}
            stroke={started ? gold : rest} strokeWidth={sw} fill="none"
            style={{ transition: "stroke 0.5s" }}
          />
          {/* Spokes */}
          <line x1={leftCx} y1={beltY - rollerR + 3} x2={leftCx} y2={beltY + rollerR - 3}
            stroke={started ? gold : rest} strokeWidth={1} style={{ transition: "stroke 0.5s" }} />
          <line x1={leftCx - rollerR + 3} y1={beltY} x2={leftCx + rollerR - 3} y2={beltY}
            stroke={started ? gold : rest} strokeWidth={1} style={{ transition: "stroke 0.5s" }} />
        </g>
        {/* Left axle mount */}
        <line x1={leftCx} y1={beltY + rollerR} x2={leftCx} y2={beltY + rollerR + 12}
          stroke={rest} strokeWidth={sw} />
        <line x1={leftCx - 12} y1={beltY + rollerR + 12} x2={leftCx + 12} y2={beltY + rollerR + 12}
          stroke={rest} strokeWidth={sw} />

        {/* Right roller */}
        <g
          className={started ? "roller-spin" : ""}
          style={{ "--cx": `${rightCx}px`, "--cy": `${beltY}px` } as React.CSSProperties}
        >
          <circle
            cx={rightCx} cy={beltY} r={rollerR}
            stroke={started ? gold : rest} strokeWidth={sw} fill="none"
            style={{ transition: "stroke 0.5s" }}
          />
          <line x1={rightCx} y1={beltY - rollerR + 3} x2={rightCx} y2={beltY + rollerR - 3}
            stroke={started ? gold : rest} strokeWidth={1} style={{ transition: "stroke 0.5s" }} />
          <line x1={rightCx - rollerR + 3} y1={beltY} x2={rightCx + rollerR - 3} y2={beltY}
            stroke={started ? gold : rest} strokeWidth={1} style={{ transition: "stroke 0.5s" }} />
        </g>
        {/* Right axle mount */}
        <line x1={rightCx} y1={beltY + rollerR} x2={rightCx} y2={beltY + rollerR + 12}
          stroke={rest} strokeWidth={sw} />
        <line x1={rightCx - 12} y1={beltY + rollerR + 12} x2={rightCx + 12} y2={beltY + rollerR + 12}
          stroke={rest} strokeWidth={sw} />

        {/* Belt texture marks (small dashes along top belt) */}
        {Array.from({ length: 12 }).map((_, i) => {
          const x = leftCx + 20 + i * ((rightCx - leftCx - 40) / 11);
          return (
            <line key={`tick-${i}`}
              x1={x} y1={beltTop - 1} x2={x} y2={beltTop + 1}
              stroke={started ? gold : rest} strokeWidth={1}
              opacity={0.4}
              style={{ transition: "stroke 0.5s" }}
            />
          );
        })}

        {/* Items on the belt */}
        {started && items.map((i) => (
          <rect
            key={`item-${i}`}
            x={leftCx + 10}
            y={beltTop - itemH - 2}
            width={itemW}
            height={itemH}
            rx={2}
            stroke={gold}
            strokeWidth={sw}
            fill={gold}
            fillOpacity={0.15}
            className="belt-item"
            style={{ animationDelay: `${i * 0.7}s` }}
          />
        ))}

        {/* Center axle dots */}
        <circle cx={leftCx} cy={beltY} r={3} fill={started ? gold : rest}
          style={{ transition: "fill 0.5s" }} />
        <circle cx={rightCx} cy={beltY} r={3} fill={started ? gold : rest}
          style={{ transition: "fill 0.5s" }} />
      </svg>
    </div>
  );
}
