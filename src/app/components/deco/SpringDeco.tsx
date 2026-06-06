"use client";

import Image from "next/image";
import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";

interface SpringDecoProps {
  src: string;
  width: number;
  height: number;
  initial?: Record<string, number>;
  enter?: Record<string, number>;
  className?: string;
}

// 單純有進場效果的背景裝飾元素
export default function SpringDeco({
  src,
  width,
  height,
  initial = { y: 40, scale: 0.85, opacity: 0 },
  enter = { y: 0, scale: 1, opacity: 1 },
  className,
}: SpringDecoProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduced = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      aria-hidden
      className={`absolute pointer-events-none ${className ?? ""}`}
      initial={initial}
      animate={inView || reduced ? enter : initial}
      transition={{
        type: "spring",
        stiffness: 120,
        damping: 14,
      }}
    >
      <Image
        src={src}
        alt=""
        width={width}
        height={height}
        draggable={false}
        className="block select-none"
        style={{ width: width, height: height }}
      />
    </motion.div>
  );
}
