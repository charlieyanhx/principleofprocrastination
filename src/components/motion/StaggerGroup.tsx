"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface StaggerGroupProps {
  children: ReactNode;
  className?: string;
  stagger?: number;
}

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
}

const parentVariants = (stagger: number) => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger,
    },
  },
});

const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
    },
  },
};

export function StaggerGroup({
  children,
  className,
  stagger = 0.08,
}: StaggerGroupProps) {
  return (
    <motion.div
      variants={parentVariants(stagger)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: StaggerItemProps) {
  return (
    <motion.div variants={childVariants} className={className}>
      {children}
    </motion.div>
  );
}
