"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

interface FloatDecoProps {
  src: string;
  width: number;
  height: number;
  duration?: number;
  yRange?: number;
  rotate?: number;
  className?: string;
  priority?: boolean;
}

// 以 Framer Motion infinite mirror loop 實現持續漂浮效果的背景裝飾元素
export default function FloatDeco({
  src,
  width,
  height,
  duration = 10,
  yRange = 12,
  rotate = 0,
  className,
  priority,
}: FloatDecoProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      aria-hidden
      className={`absolute pointer-events-none ${className ?? ""}`}
      animate={
        reduced
          ? {}
          : {
              y: [0, -yRange, 0],
              rotate: rotate ? [-rotate, rotate, -rotate] : 0,
            }
      }
      transition={{
        duration,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
      }}
    >
      <Image
        src={src}
        alt=""
        width={width}
        height={height}
        draggable={false}
        priority={priority}
        className="block select-none"
        style={{ width: width, height: height }}
      />
    </motion.div>
  );
}
