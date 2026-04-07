"use client";

import Image from "next/image";

interface ArtBackgroundProps {
  src: string;
  alt: string;
  /** Opacity 0-1. Default 0.08 */
  opacity?: number;
  /** Apply grayscale. Default true */
  grayscale?: boolean;
  /** Position of the image within the container */
  position?: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * Wraps children with a subtle artwork background image.
 * The image is desaturated and very low opacity so text remains readable.
 */
export function ArtBackground({
  src,
  alt,
  opacity = 0.08,
  grayscale = true,
  position = "center",
  children,
  className = "",
}: ArtBackgroundProps) {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="100vw"
          className="object-cover"
          style={{
            opacity,
            filter: grayscale ? "grayscale(100%)" : "none",
            objectPosition: position,
          }}
        />
      </div>
      <div className="relative">{children}</div>
    </div>
  );
}
