"use client";

import Image from "next/image";
import { motion, useTransform, useReducedMotion } from "motion/react";
import { useScrollX } from "../HorizontalScroll";

interface ParallaxDecoProps {
  src: string;
  width: number;
  height: number;
  factor?: number; /// 視差係數
  className?: string;
}

// 跟著水平捲動移動的背景裝飾元素
export default function ParallaxDeco({
  src,
  width,
  height,
  factor = 0.5,
  className,
}: ParallaxDecoProps) {
  const scrollX = useScrollX();
  const reduced = useReducedMotion();
  const x = useTransform(scrollX, (v) => (reduced ? 0 : v * (1 - factor)));

  return (
    <motion.div
      aria-hidden
      style={{ x }}
      className={`absolute pointer-events-none ${className ?? ""}`}
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
