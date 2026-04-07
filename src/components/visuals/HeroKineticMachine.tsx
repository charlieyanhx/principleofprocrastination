"use client";

import { useRef, useEffect, useCallback } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";

// ---------------------------------------------------------------------------
// Howl's-Castle-inspired kinetic machine
//
// Design: One tall, asymmetric, densely interconnected assemblage.
// Gears at different sizes, dangling pendulums, pipes curving between
// distant parts, eccentric orbiting ornaments, slider-cranks at odd angles.
// Everything physically connected — chaotic but cohesive, creaking & alive.
// ---------------------------------------------------------------------------

interface Gear {
  ox: number; oy: number;
  radius: number; teeth: number;
  speed: number; dir: 1 | -1;
  spokes?: number;
}

interface Pendulum {
  gear: number; mount: number;
  len: number; amp: number; freq: number; phase: number;
  weight: number; // 0 = dot only, >0 = circle radius
}

interface Crank {
  gear: number; crankR: number; rodLen: number; angle: number;
}

interface Pipe {
  /** Start/end as gear index + angle offset, or raw offsets */
  x1: number; y1: number; cx: number; cy: number; x2: number; y2: number;
}

interface Orbiter {
  gear: number; dist: number; radius: number; speedMul: number; phase: number;
}

// ---------------------------------------------------------------------------
// Machine layout — all offsets from anchor
// ---------------------------------------------------------------------------

const M = 5; // mesh overlap

const GEARS: Gear[] = [
  // === Tower core (vertical stack) ===
  { ox: 0,   oy: 0,    radius: 55, teeth: 18, speed: 1,    dir: 1,  spokes: 6 },  // G0: main drive
  { ox: -30, oy: -100, radius: 35, teeth: 12, speed: -(55/35), dir: -1, spokes: 4 }, // G1: upper
  { ox: 40,  oy: 85,   radius: 42, teeth: 14, speed: -(55/42), dir: -1, spokes: 5 }, // G2: lower-right
  { ox: -55, oy: 60,   radius: 28, teeth: 9,  speed: (55/28),  dir: 1 },             // G3: lower-left

  // === Extending arms ===
  { ox: 55,  oy: -55,  radius: 20, teeth: 7,  speed: -(55/20)*0.8, dir: -1 },        // G4: upper-right small
  { ox: 90,  oy: 40,   radius: 30, teeth: 10, speed: (55/42)*(42/30), dir: 1, spokes: 4 }, // G5: far right
  { ox: -85, oy: -40,  radius: 18, teeth: 6,  speed: (55/35)*(35/18), dir: 1 },       // G6: far left tiny (fast)
  { ox: 70,  oy: -120, radius: 14, teeth: 5,  speed: 3.2, dir: 1 },                   // G7: top ornament (very fast)

  // === Low-hanging cluster ===
  { ox: -20, oy: 150,  radius: 38, teeth: 13, speed: -(55/42)*(42/38), dir: 1, spokes: 4 }, // G8: bottom
  { ox: 30,  oy: 190,  radius: 22, teeth: 7,  speed: (55/42)*(42/38)*(38/22), dir: -1 },    // G9: bottom-right
];

const LINKAGES: [number, number][] = [
  [0, 1], [0, 2], [0, 3],  // core connections
  [1, 4], [2, 5],           // arm extensions
  [1, 6],                   // left arm
  [4, 7],                   // up to ornament
  [2, 8], [8, 9],           // down to bottom cluster
  [3, 8],                   // diagonal brace
];

const PENDULUMS: Pendulum[] = [
  { gear: 0, mount: Math.PI*0.85,  len: 95,  amp: 15, freq: 1.1, phase: 0,           weight: 7 },
  { gear: 1, mount: Math.PI*1.4,   len: 45,  amp: 8,  freq: 2.0, phase: Math.PI/4,   weight: 0 },
  { gear: 3, mount: Math.PI*1.2,   len: 70,  amp: 12, freq: 0.7, phase: Math.PI/2,   weight: 5 },
  { gear: 5, mount: Math.PI*0.3,   len: 55,  amp: 10, freq: 1.5, phase: Math.PI*0.8, weight: 4 },
  { gear: 8, mount: Math.PI*1.5,   len: 60,  amp: 9,  freq: 0.9, phase: Math.PI/3,   weight: 6 },
  { gear: 6, mount: Math.PI*0.7,   len: 35,  amp: 14, freq: 2.8, phase: 0,           weight: 0 },
  { gear: 9, mount: Math.PI*1.8,   len: 40,  amp: 7,  freq: 1.3, phase: Math.PI*1.2, weight: 3 },
];

const CRANKS: Crank[] = [
  { gear: 2, crankR: 22, rodLen: 60, angle: Math.PI * 0.1 },   // horizontal-ish piston
  { gear: 4, crankR: 12, rodLen: 40, angle: -Math.PI * 0.35 },  // angled up-right piston
];

// Curved pipes connecting distant parts (quadratic bezier control points)
const PIPES: Pipe[] = [
  { x1: -85, y1: -40,  cx: -100, cy: 30,   x2: -55, y2: 60 },   // G6 → G3 (left curve)
  { x1: 70,  y1: -120, cx: 110,  cy: -60,  x2: 90,  y2: 40 },   // G7 → G5 (right curve)
  { x1: -30, y1: -100, cx: -60,  cy: -150,  x2: 70,  y2: -120 }, // G1 → G7 (top arch)
];

// Small circles orbiting gear edges — decorative spinning ornaments
const ORBITERS: Orbiter[] = [
  { gear: 0, dist: 70,  radius: 4, speedMul: 1.5,  phase: 0 },
  { gear: 0, dist: 70,  radius: 3, speedMul: 1.5,  phase: Math.PI },
  { gear: 7, dist: 22,  radius: 3, speedMul: 4.0,  phase: Math.PI/2 },
  { gear: 8, dist: 50,  radius: 3, speedMul: 1.0,  phase: Math.PI*0.7 },
];

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const LINE = "#e5e5e5";
const DIM = "rgba(229,229,229,0.3)";
const GOLD = "#b98b55";
const LW = 1.5;
const PR = 3.5;
const OMEGA = (0.5 * 2 * Math.PI) / 60; // base angular velocity

const AX = 0.70; // anchor x fraction
const AY = 0.42; // anchor y fraction

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function HeroKineticMachine({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const fadeRef = useRef(1);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => {
    if (typeof window === "undefined") return;
    fadeRef.current = Math.max(0, 1 - v / (window.innerHeight * 0.8));
  });

  const render = useCallback((time: number) => {
    const cvs = canvasRef.current;
    const box = containerRef.current;
    if (!cvs || !box) return;
    const ctx = cvs.getContext("2d");
    if (!ctx) return;

    const dp = window.devicePixelRatio || 1;
    const { width: w, height: h } = box.getBoundingClientRect();

    if (cvs.width !== Math.round(w * dp) || cvs.height !== Math.round(h * dp)) {
      cvs.width = Math.round(w * dp);
      cvs.height = Math.round(h * dp);
      cvs.style.width = `${w}px`;
      cvs.style.height = `${h}px`;
    }

    ctx.clearRect(0, 0, cvs.width, cvs.height);
    ctx.globalAlpha = fadeRef.current;
    if (fadeRef.current <= 0) { rafRef.current = requestAnimationFrame(render); return; }

    const t = time / 1000;
    const ax = w * AX * dp;
    const ay = h * AY * dp;
    const d = dp; // shorthand

    const angles = GEARS.map(g => g.dir * g.speed * OMEGA * t);
    const cx = GEARS.map(g => ax + g.ox * d);
    const cy = GEARS.map(g => ay + g.oy * d);

    // ---- Pipes (curved, behind everything) ----
    ctx.strokeStyle = DIM;
    ctx.lineWidth = 1 * d;
    ctx.lineCap = "round";
    for (const p of PIPES) {
      ctx.beginPath();
      ctx.moveTo(ax + p.x1 * d, ay + p.y1 * d);
      ctx.quadraticCurveTo(ax + p.cx * d, ay + p.cy * d, ax + p.x2 * d, ay + p.y2 * d);
      ctx.stroke();
    }

    // ---- Linkage bars ----
    ctx.strokeStyle = DIM;
    ctx.lineWidth = 1 * d;
    for (const [a, b] of LINKAGES) {
      ctx.beginPath();
      ctx.moveTo(cx[a], cy[a]);
      ctx.lineTo(cx[b], cy[b]);
      ctx.stroke();
    }

    // ---- Gears ----
    ctx.strokeStyle = LINE;
    ctx.lineWidth = LW * d;
    for (let i = 0; i < GEARS.length; i++) {
      const g = GEARS[i];
      const r = g.radius * d;
      const td = 6 * d;
      const tw = Math.PI / g.teeth;

      // Circle
      ctx.beginPath();
      ctx.arc(cx[i], cy[i], r, 0, Math.PI * 2);
      ctx.stroke();

      // Teeth
      for (let j = 0; j < g.teeth; j++) {
        const ta = angles[i] + (j * Math.PI * 2) / g.teeth;
        const a1 = ta - tw * 0.4, a2 = ta + tw * 0.4;
        ctx.beginPath();
        ctx.moveTo(cx[i] + Math.cos(a1) * r, cy[i] + Math.sin(a1) * r);
        ctx.lineTo(cx[i] + Math.cos(a1) * (r + td), cy[i] + Math.sin(a1) * (r + td));
        ctx.lineTo(cx[i] + Math.cos(a2) * (r + td), cy[i] + Math.sin(a2) * (r + td));
        ctx.lineTo(cx[i] + Math.cos(a2) * r, cy[i] + Math.sin(a2) * r);
        ctx.stroke();
      }

      // Spokes + hub
      if (g.spokes && g.radius > 20) {
        ctx.save();
        ctx.globalAlpha = ctx.globalAlpha * 0.2;
        ctx.beginPath();
        ctx.arc(cx[i], cy[i], r * 0.3, 0, Math.PI * 2);
        ctx.stroke();
        for (let s = 0; s < g.spokes; s++) {
          const sa = angles[i] + (s * Math.PI * 2) / g.spokes;
          ctx.beginPath();
          ctx.moveTo(cx[i] + Math.cos(sa) * r * 0.1, cy[i] + Math.sin(sa) * r * 0.1);
          ctx.lineTo(cx[i] + Math.cos(sa) * r * 0.9, cy[i] + Math.sin(sa) * r * 0.9);
          ctx.stroke();
        }
        ctx.restore();
      }
    }

    // ---- Gear center pivots ----
    ctx.fillStyle = GOLD;
    for (let i = 0; i < GEARS.length; i++) {
      ctx.beginPath();
      ctx.arc(cx[i], cy[i], PR * d, 0, Math.PI * 2);
      ctx.fill();
    }

    // ---- Linkage midpoints ----
    for (const [a, b] of LINKAGES) {
      ctx.beginPath();
      ctx.arc((cx[a]+cx[b])/2, (cy[a]+cy[b])/2, 2 * d, 0, Math.PI * 2);
      ctx.fill();
    }

    // ---- Slider-cranks ----
    for (const sc of CRANKS) {
      const gx = cx[sc.gear], gy = cy[sc.gear];
      const ga = angles[sc.gear];
      const cpx = gx + Math.cos(ga) * sc.crankR * d;
      const cpy = gy + Math.sin(ga) * sc.crankR * d;
      const rc = Math.cos(sc.angle), rs = Math.sin(sc.angle);
      const along = (cpx - gx) * rc + (cpy - gy) * rs;
      const perp = -(cpx - gx) * rs + (cpy - gy) * rc;
      const proj = Math.sqrt(Math.max(0, sc.rodLen * sc.rodLen * d * d - perp * perp));
      const sx = gx + rc * (along + proj);
      const sy = gy + rs * (along + proj);

      // Rails
      ctx.save();
      ctx.strokeStyle = DIM;
      ctx.lineWidth = 1 * d;
      const rl = (sc.rodLen + sc.crankR + 15) * d;
      for (const off of [-3.5 * d, 3.5 * d]) {
        ctx.beginPath();
        ctx.moveTo(gx - rc * 8 * d - rs * off, gy - rs * 8 * d + rc * off);
        ctx.lineTo(gx + rc * rl - rs * off, gy + rs * rl + rc * off);
        ctx.stroke();
      }
      ctx.restore();

      // Rod
      ctx.strokeStyle = LINE;
      ctx.lineWidth = LW * d;
      ctx.beginPath();
      ctx.moveTo(cpx, cpy);
      ctx.lineTo(sx, sy);
      ctx.stroke();

      // Piston block
      ctx.save();
      ctx.translate(sx, sy);
      ctx.rotate(sc.angle);
      ctx.strokeStyle = LINE;
      ctx.lineWidth = LW * d;
      ctx.strokeRect(-4 * d, -6 * d, 8 * d, 12 * d);
      ctx.restore();

      ctx.fillStyle = GOLD;
      ctx.beginPath(); ctx.arc(cpx, cpy, PR * d, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(sx, sy, 2.5 * d, 0, Math.PI * 2); ctx.fill();
    }

    // ---- Pendulums ----
    for (const p of PENDULUMS) {
      const gx = cx[p.gear], gy = cy[p.gear];
      const gr = GEARS[p.gear].radius;
      const ga = angles[p.gear];

      const pa = ga + p.mount;
      const px = gx + Math.cos(pa) * gr * d;
      const py = gy + Math.sin(pa) * gr * d;
      const sw = Math.PI / 2 + (p.amp * Math.PI / 180) * Math.sin(p.freq * OMEGA * t + p.phase);
      const ex = px + Math.cos(sw) * p.len * d;
      const ey = py + Math.sin(sw) * p.len * d;

      ctx.strokeStyle = LINE;
      ctx.lineWidth = LW * d;
      ctx.beginPath();
      ctx.moveTo(px, py);
      ctx.lineTo(ex, ey);
      ctx.stroke();

      if (p.weight > 0) {
        ctx.strokeStyle = DIM;
        ctx.lineWidth = 1 * d;
        ctx.beginPath();
        ctx.arc(ex, ey, p.weight * d, 0, Math.PI * 2);
        ctx.stroke();
      }

      ctx.fillStyle = GOLD;
      ctx.beginPath(); ctx.arc(px, py, PR * d, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(ex, ey, (p.weight > 0 ? 2.5 : PR) * d, 0, Math.PI * 2); ctx.fill();
    }

    // ---- Orbiters (tiny spinning ornaments) ----
    for (const o of ORBITERS) {
      const gx = cx[o.gear], gy = cy[o.gear];
      const oa = angles[o.gear] * o.speedMul + o.phase;
      const ox = gx + Math.cos(oa) * o.dist * d;
      const oy = gy + Math.sin(oa) * o.dist * d;

      ctx.strokeStyle = DIM;
      ctx.lineWidth = 1 * d;
      ctx.beginPath();
      ctx.arc(ox, oy, o.radius * d, 0, Math.PI * 2);
      ctx.stroke();

      // Thin tether line
      ctx.beginPath();
      ctx.moveTo(gx + Math.cos(oa) * GEARS[o.gear].radius * d, gy + Math.sin(oa) * GEARS[o.gear].radius * d);
      ctx.lineTo(ox, oy);
      ctx.stroke();

      ctx.fillStyle = GOLD;
      ctx.beginPath();
      ctx.arc(ox, oy, 1.5 * d, 0, Math.PI * 2);
      ctx.fill();
    }

    rafRef.current = requestAnimationFrame(render);
  }, []);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(render);
    return () => cancelAnimationFrame(rafRef.current);
  }, [render]);

  return (
    <div ref={containerRef} className={className} style={{ width: "100%", height: "100%" }}>
      <canvas ref={canvasRef} style={{ display: "block", width: "100%", height: "100%", pointerEvents: "none" }} />
    </div>
  );
}
