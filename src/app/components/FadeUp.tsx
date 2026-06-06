"use client";

import { HTMLAttributes, ElementType } from "react";
import { motion, useReducedMotion } from "motion/react";
import { useViewportRef } from "@/components/HorizontalScroll";

interface FadeUpProps extends HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
  delay?: number;
  style?: React.CSSProperties;
  className?: string;
  as?: ElementType;
}

const TRANSITION = {
  type: "spring" as const,
  stiffness: 80,
  damping: 18,
  mass: 0.8,
};

export default function FadeUp({
  children,
  delay = 0,
  style,
  className,
  as = "div",
}: FadeUpProps) {
  const reduced = useReducedMotion();
  const viewportRef = useViewportRef();
  const Tag = motion[as as keyof typeof motion] as React.ElementType;

  // 若開啟了減少動畫，則位移距離為 0，只保留透明度變化。
  const yOffset = reduced ? 0 : 24;

  return (
    <Tag
      className={className}
      style={style}
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      // 當元素有 20% 進入視口時觸發動畫，且只觸發一次。
      viewport={{ once: true, root: viewportRef, amount: 0.2 }}
      transition={{ ...TRANSITION, delay }}
    >
      {children}
    </Tag>
  );
}
