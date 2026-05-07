"use client";

import { useEffect, useRef, useCallback } from "react";

// -- Design tokens --
const GOLD = "#b98b55";
const LIGHT_GRAY = "#e5e5e5";

interface GenerativeDividerProps {
  variant: "warp" | "circuit" | "flow";
  height?: number;
  className?: string;
}

// ─── Warp Thread Pattern ────────────────────────────────────────────────────

function drawWarp(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  t: number
) {
  ctx.clearRect(0, 0, w, h);
  const spacing = 8;
  const threadCount = Math.ceil(h / spacing);

  for (let i = 0; i < threadCount; i++) {
    const y = i * spacing;
    const isGold = i % 12 === 3 || i % 12 === 7;
    ctx.beginPath();
    ctx.strokeStyle = isGold
      ? GOLD
      : `rgba(229, 229, 229, 0.3)`;
    ctx.lineWidth = isGold ? 1 : 0.5;

    for (let x = 0; x <= w; x += 4) {
      const phase = i * 0.4 + t * 0.0004;
      const amplitude = 2 + Math.sin(i * 0.3) * 1.5;
      const dy = Math.sin(x * 0.008 + phase) * amplitude;
      if (x === 0) {
        ctx.moveTo(x, y + dy);
      } else {
        ctx.lineTo(x, y + dy);
      }
    }
    ctx.stroke();
  }
}

// ─── Circuit Trace Pattern ──────────────────────────────────────────────────

interface CircuitPath {
  segments: { x1: number; y1: number; x2: number; y2: number }[];
  totalLen: number;
}

function buildCircuitGrid(w: number, h: number) {
  const hLines: { x1: number; y1: number; x2: number; y2: number }[] = [];
  const vLines: { x1: number; y1: number; x2: number; y2: number }[] = [];
  const nodes: { x: number; y: number }[] = [];

  const stepX = 40;
  const stepY = 30;
  const cols = Math.ceil(w / stepX);
  const rows = Math.ceil(h / stepY);

  // Seeded pseudo-random for stable layout
  const rand = (i: number) => {
    const s = Math.sin(i * 127.1 + 311.7) * 43758.5453;
    return s - Math.floor(s);
  };

  let seed = 0;
  for (let r = 0; r <= rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x1 = c * stepX;
      const x2 = (c + 1) * stepX;
      const y = r * stepY;
      if (rand(seed++) > 0.35) {
        hLines.push({ x1, y1: y, x2, y2: y });
      }
    }
  }
  for (let c = 0; c <= cols; c++) {
    for (let r = 0; r < rows; r++) {
      const x = c * stepX;
      const y1 = r * stepY;
      const y2 = (r + 1) * stepY;
      if (rand(seed++) > 0.5) {
        vLines.push({ x1: x, y1, x2: x, y2 });
      }
    }
  }

  // Nodes at intersections
  const nodeSet = new Set<string>();
  for (const seg of [...hLines, ...vLines]) {
    const k1 = `${seg.x1},${seg.y1}`;
    const k2 = `${seg.x2},${seg.y2}`;
    if (!nodeSet.has(k1)) { nodeSet.add(k1); nodes.push({ x: seg.x1, y: seg.y1 }); }
    if (!nodeSet.has(k2)) { nodeSet.add(k2); nodes.push({ x: seg.x2, y: seg.y2 }); }
  }

  // Build a few random connected paths for the gold pulse
  const allSegs = [...hLines, ...vLines];
  const paths: CircuitPath[] = [];
  for (let p = 0; p < 3; p++) {
    const startIdx = Math.floor(rand(seed++) * allSegs.length);
    const path: CircuitPath["segments"] = [];
    let current = allSegs[startIdx];
    if (!current) continue;
    path.push(current);
    let endX = current.x2;
    let endY = current.y2;
    for (let step = 0; step < 8; step++) {
      const next = allSegs.find(
        (s) =>
          !path.includes(s) &&
          ((s.x1 === endX && s.y1 === endY) ||
            (s.x2 === endX && s.y2 === endY))
      );
      if (!next) break;
      if (next.x1 === endX && next.y1 === endY) {
        path.push(next);
        endX = next.x2;
        endY = next.y2;
      } else {
        path.push({ x1: next.x2, y1: next.y2, x2: next.x1, y2: next.y1 });
        endX = next.x1;
        endY = next.y1;
      }
    }
    let totalLen = 0;
    for (const s of path) {
      totalLen += Math.hypot(s.x2 - s.x1, s.y2 - s.y1);
    }
    paths.push({ segments: path, totalLen });
  }

  return { hLines, vLines, nodes, paths };
}

function drawCircuit(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  t: number,
  grid: ReturnType<typeof buildCircuitGrid>
) {
  ctx.clearRect(0, 0, w, h);
  const { hLines, vLines, nodes, paths } = grid;

  // Draw lines
  ctx.strokeStyle = "rgba(229, 229, 229, 0.2)";
  ctx.lineWidth = 0.5;
  for (const seg of [...hLines, ...vLines]) {
    ctx.beginPath();
    ctx.moveTo(seg.x1, seg.y1);
    ctx.lineTo(seg.x2, seg.y2);
    ctx.stroke();
  }

  // Draw nodes
  ctx.fillStyle = "rgba(229, 229, 229, 0.25)";
  for (const n of nodes) {
    ctx.beginPath();
    ctx.arc(n.x, n.y, 1, 0, Math.PI * 2);
    ctx.fill();
  }

  // Gold pulse along paths (cycle every 3500ms)
  const pulseCycle = 3500;
  for (const path of paths) {
    const progress = (t % pulseCycle) / pulseCycle;
    const dist = progress * path.totalLen;
    let acc = 0;
    for (const seg of path.segments) {
      const segLen = Math.hypot(seg.x2 - seg.x1, seg.y2 - seg.y1);
      if (acc + segLen >= dist) {
        const frac = (dist - acc) / segLen;
        const px = seg.x1 + (seg.x2 - seg.x1) * frac;
        const py = seg.y1 + (seg.y2 - seg.y1) * frac;

        // Glow
        const grad = ctx.createRadialGradient(px, py, 0, px, py, 12);
        grad.addColorStop(0, "rgba(185, 139, 85, 0.5)");
        grad.addColorStop(1, "rgba(185, 139, 85, 0)");
        ctx.fillStyle = grad;
        ctx.fillRect(px - 12, py - 12, 24, 24);

        // Dot
        ctx.fillStyle = GOLD;
        ctx.beginPath();
        ctx.arc(px, py, 2, 0, Math.PI * 2);
        ctx.fill();
        break;
      }
      acc += segLen;
    }
  }
}

// ─── Flow Field ─────────────────────────────────────────────────────────────

interface Particle {
  x: number;
  y: number;
  speed: number;
  opacity: number;
  isGold: boolean;
  size: number;
}

function initParticles(w: number, h: number, count: number): Particle[] {
  const particles: Particle[] = [];
  for (let i = 0; i < count; i++) {
    const isGold = i < 5;
    particles.push({
      x: Math.random() * w,
      y: Math.random() * h,
      speed: 0.3 + Math.random() * 0.5,
      opacity: isGold ? 0.5 + Math.random() * 0.3 : 0.1 + Math.random() * 0.2,
      isGold,
      size: isGold ? 1.5 : 1,
    });
  }
  return particles;
}

function drawFlow(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  t: number,
  particles: Particle[]
) {
  ctx.clearRect(0, 0, w, h);
  const time = t * 0.0003;

  for (const p of particles) {
    // Flow field angle
    const angle =
      Math.sin(p.x * 0.005 + time) * 0.5 +
      Math.cos(p.y * 0.008 + time * 0.7) * 0.3;

    p.x += Math.cos(angle) * p.speed + p.speed * 0.5;
    p.y += Math.sin(angle) * p.speed * 0.4;

    // Wrap edges
    if (p.x > w) p.x = 0;
    if (p.x < 0) p.x = w;
    if (p.y > h) p.y -= h;
    if (p.y < 0) p.y += h;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = p.isGold
      ? `rgba(185, 139, 85, ${p.opacity})`
      : `rgba(229, 229, 229, ${p.opacity})`;
    ctx.fill();
  }
}

// ─── Component ──────────────────────────────────────────────────────────────

export function GenerativeDivider({
  variant,
  height = 200,
  className,
}: GenerativeDividerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const stateRef = useRef<{
    circuitGrid?: ReturnType<typeof buildCircuitGrid>;
    particles?: Particle[];
  }>({});

  const setup = useCallback(
    (canvas: HTMLCanvasElement) => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = height;

      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      const ctx = canvas.getContext("2d")!;
      ctx.scale(dpr, dpr);

      if (variant === "circuit") {
        stateRef.current.circuitGrid = buildCircuitGrid(w, h);
      }
      if (variant === "flow") {
        stateRef.current.particles = initParticles(w, h, 50);
      }

      return { ctx, w, h };
    },
    [variant, height]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let running = true;
    let env: { ctx: CanvasRenderingContext2D; w: number; h: number } | null =
      null;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !env) {
          env = setup(canvas);
          const loop = (t: number) => {
            if (!running || !env) return;
            switch (variant) {
              case "warp":
                drawWarp(env.ctx, env.w, env.h, t);
                break;
              case "circuit":
                drawCircuit(
                  env.ctx,
                  env.w,
                  env.h,
                  t,
                  stateRef.current.circuitGrid!
                );
                break;
              case "flow":
                drawFlow(
                  env.ctx,
                  env.w,
                  env.h,
                  t,
                  stateRef.current.particles!
                );
                break;
            }
            animRef.current = requestAnimationFrame(loop);
          };
          animRef.current = requestAnimationFrame(loop);
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(canvas);

    // Handle resize
    const handleResize = () => {
      if (env) {
        env = setup(canvas);
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      running = false;
      cancelAnimationFrame(animRef.current);
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
    };
  }, [variant, height, setup]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        width: "100%",
        height,
        display: "block",
        background: "#fafafa",
      }}
    />
  );
}
