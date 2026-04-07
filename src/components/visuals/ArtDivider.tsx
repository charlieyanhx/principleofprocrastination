"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface ArtDividerProps {
  src: string;
  alt: string;
  artist: string;
  title: string;
  year?: string;
  /** Photographer name for CC attribution */
  photographer?: string;
  /** License string e.g. "CC BY-SA 3.0" */
  license?: string;
  /** Height of the strip in viewport units. Default 40. */
  height?: number;
  /** Image opacity 0-1. Default 0.12 */
  opacity?: number;
  /** Apply grayscale filter. Default true */
  grayscale?: boolean;
  /** Parallax amount (0 = none, 0.2 = subtle). Default 0.15 */
  parallax?: number;
}

export function ArtDivider({
  src,
  alt,
  artist,
  title,
  year,
  photographer,
  license,
  height = 40,
  opacity = 0.12,
  grayscale = true,
  parallax = 0.15,
}: ArtDividerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [`-${parallax * 100}%`, `${parallax * 100}%`]);

  return (
    <div
      ref={ref}
      className="relative overflow-hidden"
      style={{ height: `${height}vh` }}
    >
      <motion.div className="absolute inset-0" style={{ y }}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes="100vw"
          className="object-cover"
          style={{
            opacity,
            filter: grayscale ? "grayscale(100%)" : "none",
          }}
        />
      </motion.div>

      {/* Attribution kept in alt text and LICENSES.md only */}
    </div>
  );
}
