"use client";

import Image from "next/image";
import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";
import FadeUp from "@/components/FadeUp";
import FloatDeco from "@/components/deco/FloatDeco";
import ParallaxDeco from "@/components/deco/ParallaxDeco";
import SpringDeco from "@/components/deco/SpringDeco";
import { useLang } from "@/contexts/LanguageContext";
import { t, tx } from "../translations";

const HeroNameWithRollingO = () => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });
  const reduced = useReducedMotion();

  return (
    <span ref={ref} className="inline-flex items-baseline">
      {"M"}
      <motion.span
        className="inline-block"
        initial={
          reduced ? { opacity: 0 } : { x: -400, rotate: -720, opacity: 0 }
        }
        animate={inView || reduced ? { x: 0, rotate: 0, opacity: 1 } : {}}
        transition={{
          type: "spring",
          stiffness: 45,
          damping: 14,
          mass: 1.2,
          delay: 0.5,
        }}
      >
        o
      </motion.span>
      {"lly"}
    </span>
  );
};

export default function HeroSection() {
  const { lang } = useLang();

  return (
    <section
      aria-label="Hero"
      className="relative flex min-h-dvh w-screen shrink-0 max-md:flex-col items-center max-md:justify-center overflow-hidden bg-[color-mix(in_oklch,var(--color-paper)_65%,transparent)] md:h-dvh"
    >
      <Image
        src="/images/deco-star.webp"
        alt=""
        aria-hidden
        width={140}
        height={99}
        style={{ width: 140, height: 99 }}
        className="absolute top-[6vh] left-[4vw] rotate-[-15deg] max-md:hidden"
      />
      <div className="relative z-1 w-full px-8 max-md:pt-10 max-md:pb-4 md:shrink-0 md:w-[46vw] md:pl-[8vw]">
        <FadeUp
          as="p"
          delay={0}
          className="relative z-1 text-sm tracking-widest text-ink-faint mb-6"
        >
          {tx(t.hero.role, lang)}
        </FadeUp>
        <FadeUp delay={0.04} className="relative z-1 w-8 h-px bg-accent my-4" />
        <FadeUp
          as="h1"
          delay={0.08}
          className="relative z-1 font-display text-hero font-bold leading-none tracking-tight drop-shadow-[0_2px_24px_oklch(0.28_0.02_30/0.08)]"
        >
          <HeroNameWithRollingO />
          <br />
          Su
        </FadeUp>
        <FadeUp
          as="p"
          delay={0.18}
          className="relative z-1 tracking-wide text-ink-muted mt-8 max-w-[34ch] leading-[1.75] whitespace-pre-line"
        >
          {tx(t.hero.desc, lang)}
        </FadeUp>
        <FadeUp
          delay={0.28}
          className="relative z-1 mt-8 w-12 h-px bg-accent"
        />
      </div>
      <div className="relative w-full h-[52vh] md:flex-1 md:h-[85vh] overflow-hidden mask-[linear-gradient(to_top,transparent_0%,black_25%)] [-webkit-mask-image:linear-gradient(to_top,transparent_0%,black_25%)]">
        <Image
          src="/images/avatar.webp"
          alt="Molly Su"
          fill
          sizes="(max-width: 768px) 100vw, 54vw"
          className="object-contain object-bottom z-1"
          priority
        />
      </div>
      <ParallaxDeco
        src="/images/deco-sparkle-pink.webp"
        width={120}
        height={180}
        factor={0.5}
        className="top-[18vh] right-[10vw] md:top-[8vh] md:right-[40vw] z-0"
      />
      <Image
        src="/images/deco-cat-2.webp"
        alt=""
        aria-hidden
        width={250}
        height={120}
        style={{ width: 250, height: 120 }}
        className="absolute bottom-[3vh] left-[2vw] max-md:hidden"
      />
      <FloatDeco
        src="/images/deco-wave-green.webp"
        width={200}
        height={100}
        duration={5}
        yRange={8}
        className="top-[8vh] md:top-[26vh] left-[32vw] md:left-[24vw]"
      />
      <FloatDeco
        src="/images/deco-star-yellow.webp"
        width={150}
        height={150}
        duration={10}
        yRange={12}
        rotate={30}
        priority
        className="bottom-0 md:bottom-[4vh] right-[2vw] opacity-50"
      />
      <SpringDeco
        src="/images/deco-miffy-onigiri.webp"
        width={120}
        height={130}
        initial={{ y: 50, scale: 0.8, opacity: 0 }}
        enter={{ y: 0, scale: 1, opacity: 0.85 }}
        className="bottom-[8vh] left-[24vw] max-md:hidden"
      />
    </section>
  );
}
