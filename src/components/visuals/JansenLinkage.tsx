"use client";

import { useRef, useEffect, useCallback } from "react";
import { useInView } from "framer-motion";

/**
 * Newton's Cradle — the iconic desk toy demonstrating conservation of
 * momentum and energy. Five balls hang from thin strings; the outer
 * balls swing while the inner ones stay perfectly still.
 *
 * Clean, minimal, universally recognised. Perfect above "懒人原则" —
 * the system does the work, not the person.
 */

const GOLD = "#b98b55";
const LINE = "#d4d4d4";

const NUM_BALLS = 5;
const BALL_R = 14;
const BALL_GAP = BALL_R * 2 + 2; // edge-to-edge gap of 2
const STRING_LEN = 130;
const MAX_ANGLE = Math.PI / 4; // 45° swing

export function JansenLinkage({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const inView = useInView(containerRef, { once: true, amount: 0.3 });
  const startedRef = useRef(false);
  const startTimeRef = useRef(0);

  const render = useCallback((time: number) => {
    const cvs = canvasRef.current;
    const box = containerRef.current;
    if (!cvs || !box) return;
    const ctx = cvs.getContext("2d");
    if (!ctx) return;

    const dp = window.devicePixelRatio || 1;
    const w = 420;
    const h = 240;

    if (cvs.width !== Math.round(w * dp) || cvs.height !== Math.round(h * dp)) {
      cvs.width = Math.round(w * dp);
      cvs.height = Math.round(h * dp);
      cvs.style.width = `${w}px`;
      cvs.style.height = `${h}px`;
    }

    ctx.clearRect(0, 0, cvs.width, cvs.height);

    if (!startedRef.current) {
      // Draw static cradle before animation starts
      drawCradle(ctx, dp, w, h, 0, true);
      rafRef.current = requestAnimationFrame(render);
      return;
    }

    const elapsed = (time - startTimeRef.current) / 1000;
    drawCradle(ctx, dp, w, h, elapsed, false);

    rafRef.current = requestAnimationFrame(render);
  }, []);

  useEffect(() => {
    if (inView && !startedRef.current) {
      startedRef.current = true;
      startTimeRef.current = performance.now();
    }
  }, [inView]);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(render);
    return () => cancelAnimationFrame(rafRef.current);
  }, [render]);

  return (
    <div ref={containerRef} className={className} style={{ width: 420, height: 240 }}>
      <canvas ref={canvasRef} style={{ display: "block", width: 420, height: 240 }} />
    </div>
  );
}

function drawCradle(
  ctx: CanvasRenderingContext2D,
  dp: number,
  w: number,
  h: number,
  elapsed: number,
  isStatic: boolean,
) {
  const d = dp;
  const cx = (w / 2) * d;
  const topY = 20 * d; // top bar y
  const pivotY = topY + 8 * d; // string attachment point
  const sLen = STRING_LEN * d;
  const bR = BALL_R * d;
  const gap = BALL_GAP * d;
  const totalW = (NUM_BALLS - 1) * gap;
  const startX = cx - totalW / 2;

  // --- Top frame bar ---
  const barLeft = startX - 20 * d;
  const barRight = startX + totalW + 20 * d;
  ctx.strokeStyle = LINE;
  ctx.lineWidth = 1.5 * d;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(barLeft, topY);
  ctx.lineTo(barRight, topY);
  ctx.stroke();

  // Small frame uprights
  ctx.lineWidth = 1 * d;
  ctx.beginPath();
  ctx.moveTo(barLeft, topY);
  ctx.lineTo(barLeft, topY - 8 * d);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(barRight, topY);
  ctx.lineTo(barRight, topY - 8 * d);
  ctx.stroke();

  // Top bar connecting piece
  ctx.lineWidth = 2 * d;
  ctx.beginPath();
  ctx.moveTo(barLeft, topY - 8 * d);
  ctx.lineTo(barRight, topY - 8 * d);
  ctx.stroke();

  // --- Swing animation ---
  // Period of pendulum swing (in seconds)
  const period = 1.6;
  const omega = (2 * Math.PI) / period;
  // Phase: use sine wave, left ball swings when sin > 0, right ball when sin < 0
  const phase = isStatic ? 0 : Math.sin(omega * elapsed);

  // Slight energy "decay" that resets (purely cosmetic cycle)
  const cyclePos = isStatic ? 0 : (elapsed % (period * 4)) / (period * 4);
  const envelope = 1 - 0.08 * Math.sin(cyclePos * Math.PI); // very subtle

  for (let i = 0; i < NUM_BALLS; i++) {
    const restX = startX + i * gap;
    let angle = 0;

    if (!isStatic) {
      if (i === 0 && phase > 0) {
        // Left ball swings left (negative angle)
        angle = -MAX_ANGLE * phase * envelope;
      } else if (i === NUM_BALLS - 1 && phase < 0) {
        // Right ball swings right (positive angle)
        angle = -MAX_ANGLE * phase * envelope;
      }
    }

    // Ball position based on pendulum angle
    const ballX = restX + Math.sin(angle) * sLen;
    const ballY = pivotY + Math.cos(angle) * sLen;

    // String
    ctx.strokeStyle = LINE;
    ctx.lineWidth = 0.8 * d;
    ctx.globalAlpha = 0.6;
    ctx.beginPath();
    ctx.moveTo(restX, pivotY);
    ctx.lineTo(ballX, ballY);
    ctx.stroke();
    ctx.globalAlpha = 1;

    // Ball shadow (subtle)
    ctx.fillStyle = GOLD;
    ctx.globalAlpha = 0.06;
    ctx.beginPath();
    ctx.arc(ballX + 2 * d, ballY + 2 * d, bR, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;

    // Ball
    const isSwinging = (i === 0 && phase > 0.1) || (i === NUM_BALLS - 1 && phase < -0.1);
    ctx.strokeStyle = GOLD;
    ctx.lineWidth = 1.2 * d;
    ctx.beginPath();
    ctx.arc(ballX, ballY, bR, 0, Math.PI * 2);
    ctx.stroke();

    // Fill
    ctx.fillStyle = GOLD;
    ctx.globalAlpha = isSwinging && !isStatic ? 0.2 : 0.08;
    ctx.beginPath();
    ctx.arc(ballX, ballY, bR, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;

    // Highlight dot (specular)
    ctx.fillStyle = GOLD;
    ctx.globalAlpha = isSwinging && !isStatic ? 0.6 : 0.3;
    ctx.beginPath();
    ctx.arc(ballX - 3 * d, ballY - 3 * d, 2 * d, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;

    // Pivot dot
    ctx.fillStyle = LINE;
    ctx.globalAlpha = 0.4;
    ctx.beginPath();
    ctx.arc(restX, pivotY, 1.5 * d, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
  }
}
