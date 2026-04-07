"use client";

import React from "react";

const gridSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" fill="none">
  <!-- Grid lines -->
  <defs>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" stroke-width="0.5" opacity="0.04"/>
    </pattern>
  </defs>
  <rect width="400" height="400" fill="url(#grid)"/>
  <!-- Center mark -->
  <g opacity="0.06" stroke="white" stroke-width="0.75">
    <line x1="195" y1="200" x2="205" y2="200"/>
    <line x1="200" y1="195" x2="200" y2="205"/>
    <circle cx="200" cy="200" r="4" fill="none"/>
  </g>
  <!-- Datum symbol top-left -->
  <g opacity="0.06" stroke="white" stroke-width="0.75">
    <polygon points="80,120 74,130 86,130" fill="none"/>
    <line x1="70" y1="130" x2="90" y2="130"/>
  </g>
  <!-- Center mark bottom-right -->
  <g opacity="0.06" stroke="white" stroke-width="0.75">
    <line x1="315" y1="320" x2="325" y2="320"/>
    <line x1="320" y1="315" x2="320" y2="325"/>
    <circle cx="320" cy="320" r="4" fill="none"/>
  </g>
  <!-- Datum symbol center-left -->
  <g opacity="0.06" stroke="white" stroke-width="0.75">
    <polygon points="40,280 34,290 46,290" fill="none"/>
    <line x1="30" y1="290" x2="50" y2="290"/>
  </g>
</svg>`;

const encodedSvg = `data:image/svg+xml,${encodeURIComponent(gridSvg)}`;

export function BlueprintGrid({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={className}
      style={{
        position: "relative",
        backgroundImage: `url("${encodedSvg}")`,
        backgroundRepeat: "repeat",
        backgroundSize: "400px 400px",
      }}
    >
      {children}
    </div>
  );
}
