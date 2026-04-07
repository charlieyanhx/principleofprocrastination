"use client";

export function ConveyorBelt({
  direction,
  className,
}: {
  direction: "horizontal" | "vertical";
  className?: string;
}) {
  const isHorizontal = direction === "horizontal";
  const id = `conveyor-${direction}`;

  return (
    <svg
      width={isHorizontal ? "100%" : 2}
      height={isHorizontal ? 2 : "100%"}
      className={className}
      style={{ display: "block", overflow: "visible" }}
    >
      <style>{`
        @keyframes conveyor-h {
          from { stroke-dashoffset: 16; }
          to { stroke-dashoffset: 0; }
        }
        @keyframes conveyor-v {
          from { stroke-dashoffset: 16; }
          to { stroke-dashoffset: 0; }
        }
        .conveyor-line-horizontal {
          stroke-dasharray: 8 8;
          animation: conveyor-h 0.6s linear infinite;
        }
        .conveyor-line-vertical {
          stroke-dasharray: 8 8;
          animation: conveyor-v 0.6s linear infinite;
        }
      `}</style>
      <line
        className={`conveyor-line-${direction}`}
        x1={isHorizontal ? 0 : 1}
        y1={isHorizontal ? 1 : 0}
        x2={isHorizontal ? "100%" : 1}
        y2={isHorizontal ? 1 : "100%"}
        stroke="#b98b55"
        strokeWidth={2}
        strokeLinecap="round"
      />
    </svg>
  );
}
