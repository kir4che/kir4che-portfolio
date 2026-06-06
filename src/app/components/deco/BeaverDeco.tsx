"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef, useState } from "react";

export default function BeaverDeco({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduced = useReducedMotion();
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      aria-hidden
      className={`absolute size-28 sm:size-40 ${className}`}
      initial={{ y: 40, scale: 0.85, opacity: 0 }}
      animate={
        inView || reduced
          ? { y: 0, scale: 1, opacity: 0.9 }
          : { y: 40, scale: 0.85, opacity: 0 }
      }
      transition={{ type: "spring", stiffness: 120, damping: 14 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      <img
        src="/images/deco-beaver-open.webp"
        alt=""
        aria-hidden
        draggable={false}
        className={`absolute inset-0 size-full select-none pointer-events-none transition-opacity ${hovered ? "opacity-100" : "opacity-0"}`}
      />
      <img
        src="/images/deco-beaver-closed.webp"
        alt=""
        draggable={false}
        className={`size-full select-none pointer-events-none ${hovered ? "opacity-0" : "opacity-100"}`}
      />
    </motion.div>
  );
}
