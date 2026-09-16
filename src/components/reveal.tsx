"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Scroll-reveal wrapper built on framer-motion: children fade and slide up
 * the first time they enter the viewport.
 */
export function Reveal({
  delay = 0,
  className,
  children,
}: {
  delay?: number;
  className?: string;
  children: ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-64px" }}
      transition={{ delay, duration: 0.55, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
