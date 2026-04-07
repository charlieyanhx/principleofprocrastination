"use client";

import { useEffect, useRef } from "react";

/**
 * Theo Jansen's 11-bar walking linkage mechanism.
 *
 * Published bar lengths (scaled by S to fit a 200x140 SVG viewBox):
 *   a = 38.0  (crank radius, O -> A)
 *   b = 41.5  (A -> B)
 *   c = 39.3  (B -> C)
 *   d = 40.1  (A -> D)
 *   e = 55.8  (B -> D)
 *   f = 39.4  (C -> E)
 *   g = 36.7  (D -> E)
 *   h = 65.7  (E -> F)
 *   i = 49.0  (D -> F)
 *   j = 50.0  (M -> C)
 *   k = 61.9  (M -> B)
 *   m = 7.8, n = 15.0 (fixed point M offset from crank center O)
 *
 * Kinematic chain:
 *   Fixed: O (crank center), M (second ground pivot)
 *   Crank: A rotates on circle(O, a)
 *   B = circle(A, b) ∩ circle(M, k)        [rigid triangle MBC with sides k, c, j]
 *   C = circle(B, c) ∩ circle(M, j)        [determines upper frame]
 *   D = circle(A, d) ∩ circle(B, e)        [rigid triangle ABD with sides b, d, e]
 *   E = circle(C, f) ∩ circle(D, g)        [knee joint]
 *   F = circle(D, i) ∩ circle(E, h)        [foot point]
 *
 * The foot (F) traces the characteristic Jansen oval: flat bottom for ground
 * contact, arcing upward for the swing phase.
 */

type Point = [number, number];

// --- Scale factor to fit mechanism in 200x140 viewBox ---
// Raw mechanism spans ~124x127 units; scale 0.85 fits with comfortable margins.
const S = 0.85;

// --- Scaled bar lengths ---
const a = 38.0 * S;
const b = 41.5 * S;
const c = 39.3 * S;
const d = 40.1 * S;
const e = 55.8 * S;
const f = 39.4 * S;
const g = 36.7 * S;
const h = 65.7 * S;
const i_len = 49.0 * S;
const j = 50.0 * S;
const k = 61.9 * S;
const m_off = 7.8 * S;
const n_off = 15.0 * S;

// Crank center position in viewBox coordinates.
// Chosen so the full mechanism (all joints across full rotation) is centered
// within the 200x140 viewBox with even margins.
const O_X = 93;
const O_Y = 77;

/**
 * Two-circle intersection solver.
 *
 * Given circles centered at p1 (radius r1) and p2 (radius r2), returns one of
 * the two intersection points. The `sign` parameter selects which solution:
 *   true  → the solution where cross(p2−p1, result−p1) > 0  (positive rotation)
 *   false → the opposite solution
 *
 * Using the cross-product sign (rather than comparing y-coordinates) keeps the
 * selected branch consistent regardless of the orientation of the two centers,
 * which is critical for the linkage to solve correctly across all crank angles.
 */
function circleIntersect(
  p1: Point,
  r1: number,
  p2: Point,
  r2: number,
  sign: boolean
): Point | null {
  const dx = p2[0] - p1[0];
  const dy = p2[1] - p1[1];
  const dist = Math.sqrt(dx * dx + dy * dy);

  // No intersection if circles are too far apart, nested, or coincident.
  if (dist > r1 + r2 + 1e-6 || dist < Math.abs(r1 - r2) - 1e-6 || dist < 1e-9) {
    return null;
  }

  // Distance from p1 to the midline between the two intersection points.
  const aa = (r1 * r1 - r2 * r2 + dist * dist) / (2 * dist);
  const hSq = r1 * r1 - aa * aa;
  const hh = hSq > 0 ? Math.sqrt(hSq) : 0;

  // Midline point.
  const mx = p1[0] + (aa * dx) / dist;
  const my = p1[1] + (aa * dy) / dist;

  // Perpendicular offset (rotated 90 degrees from the center-to-center direction).
  const px = (-dy * hh) / dist;
  const py = (dx * hh) / dist;

  return sign ? [mx + px, my + py] : [mx - px, my - py];
}

/**
 * Solve all joint positions for a given crank angle θ.
 *
 * The sign choices for each circle intersection were determined by exhaustive
 * search over all 32 combinations to find the unique configuration that:
 *   1. Solves for all 360 degrees of crank rotation without gaps
 *   2. Produces a foot trace with the characteristic Jansen walking oval
 *   3. Places the foot below the crank (proper leg orientation)
 */
function solveLinkage(theta: number): {
  O: Point;
  M: Point;
  A: Point;
  B: Point;
  C: Point;
  D: Point;
  E: Point;
  F: Point;
} | null {
  const O: Point = [O_X, O_Y];
  const M: Point = [O_X + m_off, O_Y - n_off];

  const A: Point = [O_X + a * Math.cos(theta), O_Y + a * Math.sin(theta)];

  const B = circleIntersect(A, b, M, k, false);
  if (!B) return null;

  const C = circleIntersect(B, c, M, j, true);
  if (!C) return null;

  const D = circleIntersect(A, d, B, e, true);
  if (!D) return null;

  const E = circleIntersect(C, f, D, g, false);
  if (!E) return null;

  const F = circleIntersect(D, i_len, E, h, false);
  if (!F) return null;

  return { O, M, A, B, C, D, E, F };
}

/** The 11 bars of the linkage, as pairs of joint names. */
const BAR_CONNECTIONS: [string, string][] = [
  ["O", "A"], // crank arm
  ["A", "B"], // bar b
  ["M", "B"], // bar k
  ["B", "C"], // bar c
  ["M", "C"], // bar j
  ["A", "D"], // bar d
  ["B", "D"], // bar e
  ["C", "E"], // bar f
  ["D", "E"], // bar g
  ["D", "F"], // bar i
  ["E", "F"], // bar h
];

const JOINT_NAMES = ["O", "M", "A", "B", "C", "D", "E", "F"] as const;

const BAR_COLOR = "#e5e5e5";
const BAR_OPACITY = 0.3;
const JOINT_COLOR = "#b98b55";
const JOINT_RADIUS = 2;
const CRANK_PIVOT_RADIUS = 3;
const FIXED_PIVOT_RADIUS = 2.5;
const CYCLE_DURATION_MS = 3000;
const TRACE_STEPS = 120;

export function JansenLinkage({ className }: { className?: string }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    // --- Build the foot-trace path (static, drawn once) ---
    const tracePath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    tracePath.setAttribute("fill", "none");
    tracePath.setAttribute("stroke", JOINT_COLOR);
    tracePath.setAttribute("stroke-opacity", "0.12");
    tracePath.setAttribute("stroke-width", "0.8");
    svg.appendChild(tracePath);

    const tracePoints: Point[] = [];
    for (let step = 0; step < TRACE_STEPS; step++) {
      const angle = (step / TRACE_STEPS) * Math.PI * 2;
      const result = solveLinkage(angle);
      if (result) tracePoints.push(result.F);
    }
    if (tracePoints.length > 2) {
      let pathD = `M ${tracePoints[0][0].toFixed(2)} ${tracePoints[0][1].toFixed(2)}`;
      for (let idx = 1; idx < tracePoints.length; idx++) {
        pathD += ` L ${tracePoints[idx][0].toFixed(2)} ${tracePoints[idx][1].toFixed(2)}`;
      }
      pathD += " Z";
      tracePath.setAttribute("d", pathD);
    }

    // --- Build bar (line) elements ---
    const barElements: SVGLineElement[] = [];
    for (let idx = 0; idx < BAR_CONNECTIONS.length; idx++) {
      const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
      line.setAttribute("stroke", BAR_COLOR);
      line.setAttribute("stroke-opacity", String(BAR_OPACITY));
      line.setAttribute("stroke-width", "1.2");
      line.setAttribute("stroke-linecap", "round");
      svg.appendChild(line);
      barElements.push(line);
    }

    // --- Build joint (circle) elements ---
    const jointElements: Map<string, SVGCircleElement> = new Map();
    for (const name of JOINT_NAMES) {
      const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      circle.setAttribute("fill", JOINT_COLOR);
      const radius =
        name === "O"
          ? CRANK_PIVOT_RADIUS
          : name === "M"
            ? FIXED_PIVOT_RADIUS
            : JOINT_RADIUS;
      circle.setAttribute("r", String(radius));
      svg.appendChild(circle);
      jointElements.set(name, circle);
    }

    // --- Animation loop ---
    let startTime: number | null = null;

    function animate(timestamp: number) {
      if (startTime === null) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const theta = ((elapsed % CYCLE_DURATION_MS) / CYCLE_DURATION_MS) * Math.PI * 2;

      const result = solveLinkage(theta);
      if (result) {
        const joints = result as unknown as Record<string, Point>;

        for (let idx = 0; idx < BAR_CONNECTIONS.length; idx++) {
          const [startName, endName] = BAR_CONNECTIONS[idx];
          const p1 = joints[startName];
          const p2 = joints[endName];
          const line = barElements[idx];
          line.setAttribute("x1", String(p1[0]));
          line.setAttribute("y1", String(p1[1]));
          line.setAttribute("x2", String(p2[0]));
          line.setAttribute("y2", String(p2[1]));
        }

        for (const name of JOINT_NAMES) {
          const p = joints[name];
          const el = jointElements.get(name)!;
          el.setAttribute("cx", String(p[0]));
          el.setAttribute("cy", String(p[1]));
        }
      }

      frameRef.current = requestAnimationFrame(animate);
    }

    frameRef.current = requestAnimationFrame(animate);

    // --- Cleanup ---
    return () => {
      cancelAnimationFrame(frameRef.current);
      barElements.forEach((el) => el.remove());
      jointElements.forEach((el) => el.remove());
      tracePath.remove();
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 200 140"
      className={className}
      style={{ overflow: "visible" }}
    />
  );
}
