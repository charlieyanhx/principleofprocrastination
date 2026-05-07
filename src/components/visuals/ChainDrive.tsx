"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const GOLD = "#b98b55";
const MUTED = "#e5e5e5";
const NODE_R = 5;
const LINE_WIDTH = 1.5;

/** Positions of the three nodes as fractions of total height. */
const NODE_POSITIONS = [0.25, 0.5, 0.75] as const;

/**
 * ScrollProgressLine — a vertical line that draws itself as the section
 * scrolls into view, with gold nodes that fill at each milestone.
 *
 * Exported as `ChainDrive` so SolutionPath.tsx needs no changes.
 * Automatically measures its container height.
 */
export function ChainDrive({
  className,
}: {
  className?: string;
  height?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [h, setH] = useState(500);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const measure = () => {
      const rect = el.getBoundingClientRect();
      if (rect.height > 0) setH(rect.height);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Map scroll progress to how far the line has been drawn (0 → h).
  const lineHeight = useTransform(scrollYProgress, [0.15, 0.85], [0, h]);

  // For each node, derive an opacity for its filled state.
  const nodeFills = NODE_POSITIONS.map((pos) => {
    const start = 0.15 + pos * 0.7 - 0.03;
    const end = 0.15 + pos * 0.7 + 0.03;
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useTransform(scrollYProgress, [start, end], [0, 1]);
  });

  const SVG_WIDTH = 12;
  const cx = SVG_WIDTH / 2;

  return (
    <div
      ref={containerRef}
      className={`hidden lg:block ${className ?? ""}`}
      style={{ height: "100%" }}
    >
      <svg
        viewBox={`0 0 ${SVG_WIDTH} ${h}`}
        width={SVG_WIDTH}
        height={h}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ overflow: "visible" }}
      >
        {/* Background track */}
        <line
          x1={cx}
          y1={0}
          x2={cx}
          y2={h}
          stroke={MUTED}
          strokeWidth={LINE_WIDTH}
          strokeOpacity={0.35}
        />

        {/* Gold progress line clipped to scroll progress */}
        <defs>
          <motion.clipPath id="chain-line-clip">
            <motion.rect
              x={0}
              y={0}
              width={SVG_WIDTH}
              style={{ height: lineHeight }}
            />
          </motion.clipPath>
        </defs>

        <line
          x1={cx}
          y1={0}
          x2={cx}
          y2={h}
          stroke={GOLD}
          strokeWidth={LINE_WIDTH}
          clipPath="url(#chain-line-clip)"
        />

        {/* Nodes */}
        {NODE_POSITIONS.map((pos, i) => {
          const cy = h * pos;
          return (
            <g key={i}>
              <circle
                cx={cx}
                cy={cy}
                r={NODE_R}
                fill="none"
                stroke={MUTED}
                strokeWidth={LINE_WIDTH}
              />
              <motion.circle
                cx={cx}
                cy={cy}
                r={NODE_R}
                fill={GOLD}
                stroke={GOLD}
                strokeWidth={LINE_WIDTH}
                style={{ opacity: nodeFills[i] }}
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
}
