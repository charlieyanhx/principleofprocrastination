"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function ChainDrive({
  className,
  height = 500,
}: {
  className?: string;
  height?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const dashOffset = useTransform(scrollYProgress, [0, 1], [0, -200]);

  const sprocketY = [
    height * 0.1,
    height * 0.5,
    height * 0.9,
  ];

  const sprocketRadius = 12;
  const teethCount = 8;

  function renderSprocket(cx: number, cy: number) {
    const teeth: React.ReactNode[] = [];
    for (let i = 0; i < teethCount; i++) {
      const angle = (i * 360) / teethCount;
      const rad = (angle * Math.PI) / 180;
      const innerR = sprocketRadius - 2;
      const outerR = sprocketRadius + 3;
      teeth.push(
        <line
          key={i}
          x1={cx + Math.cos(rad) * innerR}
          y1={cy + Math.sin(rad) * innerR}
          x2={cx + Math.cos(rad) * outerR}
          y2={cy + Math.sin(rad) * outerR}
          stroke="#b98b55"
          strokeWidth={2}
          strokeLinecap="round"
        />
      );
    }
    return (
      <g>
        <circle
          cx={cx}
          cy={cy}
          r={sprocketRadius}
          fill="none"
          stroke="#b98b55"
          strokeWidth={1.5}
        />
        <circle cx={cx} cy={cy} r={3} fill="#b98b55" />
        {teeth}
      </g>
    );
  }

  const chainPath = `M 20 ${sprocketY[0] + sprocketRadius} L 20 ${sprocketY[1] - sprocketRadius} M 20 ${sprocketY[1] + sprocketRadius} L 20 ${sprocketY[2] - sprocketRadius}`;

  return (
    <div
      ref={containerRef}
      className={`hidden lg:block ${className ?? ""}`}
    >
      <svg
        viewBox={`0 0 40 ${height}`}
        width={40}
        height={height}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Chain links */}
        <motion.path
          d={chainPath}
          stroke="#e5e5e5"
          strokeWidth={2}
          strokeDasharray="6 4"
          style={{ strokeDashoffset: dashOffset }}
          strokeLinecap="round"
        />

        {/* Sprockets */}
        {sprocketY.map((y, i) => (
          <g key={i}>{renderSprocket(20, y)}</g>
        ))}
      </svg>
    </div>
  );
}
