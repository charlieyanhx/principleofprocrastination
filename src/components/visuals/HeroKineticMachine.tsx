"use client";

import { useRef, useEffect, useCallback } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";

// ---------------------------------------------------------------------------
// Jacquard Loom — the machine that replaced mass human labor in textiles
// and birthed computing (punch cards → Babbage → modern programming).
//
// Visual: vertical warp threads, a shuttle crossing back and forth,
// threads lifting/lowering in binary patterns, fabric pattern emerging.
//
// Metaphor: threads = data streams, shuttle = coordinating agent,
// pattern = organized output. Exactly what this company does.
// ---------------------------------------------------------------------------

const GOLD = "#b98b55";
const LINE = "#e5e5e5";
const DIM = "rgba(229,229,229,0.20)";
const THREAD_DIM = "rgba(229,229,229,0.35)";
const LW = 1;

// Anchor: right side of hero, vertically centered with text
const AX = 0.72;
const AY = 0.30;

// Loom dimensions (in logical px, scaled by dp)
const NUM_THREADS = 32;
const THREAD_SPACING = 14;
const LOOM_HEIGHT = 480;
const SHUTTLE_Y_START = 80;  // where weaving begins
const SHUTTLE_Y_END = LOOM_HEIGHT - 40;
const SHUTTLE_SPEED = 60; // px per second

// A simple binary weave pattern (1 = thread lifted, 0 = thread down)
// Each row is one shuttle pass
const PATTERN: number[][] = (() => {
  const rows: number[][] = [];
  for (let r = 0; r < 48; r++) {
    const row: number[] = [];
    for (let c = 0; c < NUM_THREADS; c++) {
      // Create a diamond/twill-like pattern
      const diag = (r + c) % 8;
      const diag2 = (r - c + 40) % 6;
      row.push((diag < 3 || diag2 < 2) ? 1 : 0);
    }
    rows.push(row);
  }
  return rows;
})();

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
    const d = dp;

    // Loom origin
    const loomW = (NUM_THREADS - 1) * THREAD_SPACING;
    const ox = w * AX * dp - (loomW * d) / 2;
    const oy = h * AY * dp;

    // --- Frame / beam ---
    ctx.strokeStyle = LINE;
    ctx.lineWidth = LW * d;
    ctx.lineCap = "round";

    // Top beam
    ctx.beginPath();
    ctx.moveTo(ox - 15 * d, oy);
    ctx.lineTo(ox + loomW * d + 15 * d, oy);
    ctx.stroke();

    // Bottom beam (cloth beam)
    const bottomY = oy + LOOM_HEIGHT * d;
    ctx.beginPath();
    ctx.moveTo(ox - 15 * d, bottomY);
    ctx.lineTo(ox + loomW * d + 15 * d, bottomY);
    ctx.stroke();

    // Side uprights
    ctx.strokeStyle = DIM;
    ctx.beginPath();
    ctx.moveTo(ox - 15 * d, oy);
    ctx.lineTo(ox - 15 * d, bottomY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(ox + loomW * d + 15 * d, oy);
    ctx.lineTo(ox + loomW * d + 15 * d, bottomY);
    ctx.stroke();

    // --- Shuttle position ---
    const totalWeaveHeight = SHUTTLE_Y_END - SHUTTLE_Y_START;
    const rowHeight = totalWeaveHeight / PATTERN.length;
    const cycleTime = (totalWeaveHeight * 2) / SHUTTLE_SPEED;
    const tInCycle = (t % cycleTime) / cycleTime;
    // Ping-pong: 0→1→0
    const progress = tInCycle < 0.5 ? tInCycle * 2 : 2 - tInCycle * 2;
    const shuttleY = oy + (SHUTTLE_Y_START + progress * totalWeaveHeight) * d;
    const currentRow = Math.floor(progress * (PATTERN.length - 1));
    const goingRight = tInCycle < 0.5;

    // --- Heddle zone (above shuttle) ---
    const heddleY = oy + (SHUTTLE_Y_START - 15) * d;

    // Heddle frame lines
    ctx.strokeStyle = DIM;
    ctx.lineWidth = 0.5 * d;
    ctx.beginPath();
    ctx.moveTo(ox - 10 * d, heddleY);
    ctx.lineTo(ox + loomW * d + 10 * d, heddleY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(ox - 10 * d, heddleY + 20 * d);
    ctx.lineTo(ox + loomW * d + 10 * d, heddleY + 20 * d);
    ctx.stroke();

    // --- Warp threads ---
    const row = PATTERN[currentRow] || PATTERN[0];

    for (let i = 0; i < NUM_THREADS; i++) {
      const tx = ox + i * THREAD_SPACING * d;
      const lifted = row[i] === 1;

      // Thread above heddle zone — straight
      ctx.strokeStyle = THREAD_DIM;
      ctx.lineWidth = LW * d;
      ctx.beginPath();
      ctx.moveTo(tx, oy + 3 * d);
      ctx.lineTo(tx, heddleY);
      ctx.stroke();

      // Through heddle zone — lifted or lowered
      const heddleMidY = heddleY + 10 * d;
      const offset = lifted ? -6 * d : 6 * d;
      ctx.strokeStyle = lifted ? GOLD : THREAD_DIM;
      ctx.lineWidth = (lifted ? 1.2 : 0.8) * d;
      ctx.globalAlpha = fadeRef.current * (lifted ? 0.7 : 0.35);
      ctx.beginPath();
      ctx.moveTo(tx, heddleY);
      ctx.quadraticCurveTo(tx, heddleMidY + offset, tx, heddleY + 20 * d);
      ctx.stroke();
      ctx.globalAlpha = fadeRef.current;

      // Below heddle to bottom — with woven pattern
      ctx.strokeStyle = THREAD_DIM;
      ctx.lineWidth = LW * d;
      ctx.beginPath();
      ctx.moveTo(tx, heddleY + 20 * d);
      ctx.lineTo(tx, bottomY - 3 * d);
      ctx.stroke();
    }

    // --- Woven fabric pattern (below shuttle line) ---
    const fabricStartY = shuttleY + 8 * d;
    const fabricRowH = rowHeight * d;

    for (let r = currentRow; r < PATTERN.length; r++) {
      const ry = fabricStartY + (r - currentRow) * fabricRowH;
      if (ry > bottomY - 5 * d) break;

      for (let c = 0; c < NUM_THREADS; c++) {
        if (PATTERN[r][c] === 1) {
          const fx = ox + c * THREAD_SPACING * d;
          ctx.fillStyle = GOLD;
          ctx.globalAlpha = fadeRef.current * 0.12;
          ctx.fillRect(fx - 3 * d, ry, 6 * d, fabricRowH * 0.8);
          ctx.globalAlpha = fadeRef.current;
        }
      }
    }

    // --- Shuttle ---
    const shuttleW = loomW * d * 0.3;
    const shuttleH = 6 * d;
    const shuttleProgress = goingRight ? progress : (1 - progress);
    const shuttleX = ox + shuttleProgress * (loomW * d - shuttleW);

    // Shuttle body
    ctx.fillStyle = GOLD;
    ctx.globalAlpha = fadeRef.current * 0.25;
    ctx.beginPath();
    ctx.moveTo(shuttleX, shuttleY);
    ctx.lineTo(shuttleX + shuttleW, shuttleY);
    ctx.lineTo(shuttleX + shuttleW - 4 * d, shuttleY + shuttleH);
    ctx.lineTo(shuttleX + 4 * d, shuttleY + shuttleH);
    ctx.closePath();
    ctx.fill();
    ctx.globalAlpha = fadeRef.current;

    ctx.strokeStyle = GOLD;
    ctx.lineWidth = LW * d;
    ctx.beginPath();
    ctx.moveTo(shuttleX, shuttleY);
    ctx.lineTo(shuttleX + shuttleW, shuttleY);
    ctx.lineTo(shuttleX + shuttleW - 4 * d, shuttleY + shuttleH);
    ctx.lineTo(shuttleX + 4 * d, shuttleY + shuttleH);
    ctx.closePath();
    ctx.stroke();

    // Shuttle weft thread trail
    ctx.strokeStyle = GOLD;
    ctx.lineWidth = 0.8 * d;
    ctx.globalAlpha = fadeRef.current * 0.4;
    ctx.beginPath();
    if (goingRight) {
      ctx.moveTo(ox, shuttleY + shuttleH / 2);
      ctx.lineTo(shuttleX, shuttleY + shuttleH / 2);
    } else {
      ctx.moveTo(shuttleX + shuttleW, shuttleY + shuttleH / 2);
      ctx.lineTo(ox + loomW * d, shuttleY + shuttleH / 2);
    }
    ctx.stroke();
    ctx.globalAlpha = fadeRef.current;

    // --- Punch card hint (top, above loom) ---
    const cardY = oy - 35 * d;
    const cardW = loomW * d * 0.5;
    const cardX = ox + (loomW * d - cardW) / 2;
    ctx.strokeStyle = DIM;
    ctx.lineWidth = 0.8 * d;
    ctx.strokeRect(cardX, cardY, cardW, 25 * d);

    // Punch holes
    const pRow = PATTERN[currentRow] || PATTERN[0];
    const holeSpacing = cardW / (NUM_THREADS + 1);
    for (let i = 0; i < NUM_THREADS; i++) {
      const hx = cardX + (i + 1) * holeSpacing;
      const hy = cardY + 12.5 * d;
      if (pRow[i] === 1) {
        ctx.fillStyle = GOLD;
        ctx.globalAlpha = fadeRef.current * 0.5;
        ctx.beginPath();
        ctx.arc(hx, hy, 2 * d, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = fadeRef.current;
      } else {
        ctx.strokeStyle = DIM;
        ctx.beginPath();
        ctx.arc(hx, hy, 1.5 * d, 0, Math.PI * 2);
        ctx.stroke();
      }
    }

    // Feed line from card to heddles
    ctx.strokeStyle = DIM;
    ctx.lineWidth = 0.5 * d;
    ctx.setLineDash([3 * d, 3 * d]);
    ctx.beginPath();
    ctx.moveTo(cardX + cardW / 2, cardY + 25 * d);
    ctx.lineTo(cardX + cardW / 2, heddleY);
    ctx.stroke();
    ctx.setLineDash([]);

    // --- Beam end caps (small circles) ---
    ctx.fillStyle = LINE;
    for (const bx of [ox - 15 * d, ox + loomW * d + 15 * d]) {
      ctx.beginPath();
      ctx.arc(bx, oy, 3 * d, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(bx, bottomY, 3 * d, 0, Math.PI * 2);
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
