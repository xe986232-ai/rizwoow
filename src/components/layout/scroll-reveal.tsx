"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

// Same quartic ease-out used by the Lenis smooth-scroll setup and the
// page transition, so a section "settling in" on scroll feels like the
// same hand as everything else that moves on this site.
const scrollEase = (t: number) => 1 - Math.pow(1 - t, 4);

export function ScrollReveal({
  children,
  className,
  delay = 0,
  y = 24,
}: {
  children: ReactNode;
  className?: string;
  /** Extra delay (seconds) before this section starts animating in. */
  delay?: number;
  /** How far (px) the section rises into place. */
  y?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: scrollEase, delay }}
    >
      {children}
    </motion.div>
  );
}
