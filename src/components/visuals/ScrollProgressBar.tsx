"use client";

import { useScroll, useSpring, motion } from "framer-motion";

export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: 2,
        zIndex: 50,
        background: "#b98b55",
        scaleX,
        transformOrigin: "left",
      }}
    />
  );
}
