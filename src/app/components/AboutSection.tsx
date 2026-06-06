"use client";

import Image from "next/image";
import FadeUp from "@/components/FadeUp";
import FloatDeco from "@/components/deco/FloatDeco";
import SpringDeco from "@/components/deco/SpringDeco";
import BeaverDeco from "@/components/deco/BeaverDeco";
import { useLang } from "@/contexts/LanguageContext";
import { t, tx } from "../translations";

export default function AboutSection() {
  const { lang } = useLang();

  return (
    <section
      aria-label="About"
      className="relative flex min-h-dvh w-screen shrink-0 max-md:flex-col items-center justify-center overflow-hidden bg-[color-mix(in_oklch,var(--color-paper-mid)_65%,transparent)] md:h-dvh"
    >
      <Image
        src="/images/deco-fish.webp"
        alt=""
        aria-hidden
        width={200}
        height={110}
        style={{ width: 200, height: 110 }}
        className="absolute top-[8vh] right-[8vw] rotate-10 -scale-x-100"
      />
      <Image
        src="/images/deco-star.webp"
        alt=""
        aria-hidden
        width={120}
        height={120}
        style={{ width: 120, height: 120 }}
        className="absolute opacity-50 max-sm:top-[52vh] max-sm:right-[12vw] sm:bottom-[12vh] sm:left-[2vw] sm:rotate-30 -z-10"
      />
      <Image
        src="/images/deco-speech-bubble.webp"
        alt=""
        aria-hidden
        width={100}
        height={80}
        style={{ width: 100, height: 80 }}
        className="absolute opacity-60 top-[52vh] md:top-[26vh] right-[20vw] lg:right-[24vw] xl:right-[28vw] max-md:hidden"
      />
      <div className="shrink-0 overflow-hidden rounded-full w-[clamp(200px,80vw,360px)] aspect-square max-md:mt-24 md:w-[clamp(240px,32vw,380px)] md:ml-[8vw] shadow-[0_8px_40px_oklch(0.28_0.02_30/0.12),0_0_0_4px_var(--color-paper),0_0_0_6px_var(--color-line)]">
        <Image
          src="/images/photo.webp"
          alt="Molly Su"
          width={320}
          height={640}
          className="size-full object-cover object-center"
        />
      </div>
      <div className="flex-1 max-w-170 px-8 max-md:py-10 md:pl-[4vw] md:pr-[6vw]">
        <FadeUp
          as="h2"
          delay={0.08}
          className="font-display text-4xl font-semibold mb-8 tracking-[-0.01em]"
        >
          {t.about.heading}
        </FadeUp>
        <FadeUp
          as="p"
          delay={0.16}
          className="text-ink-muted leading-[1.85] max-w-[48ch] mb-6"
        >
          {tx(t.about.p1, lang)}
        </FadeUp>
        <FadeUp
          as="p"
          delay={0.22}
          className="text-ink-muted leading-[1.85] max-w-[48ch] mb-8"
        >
          {tx(t.about.p2, lang)}
        </FadeUp>
        <FadeUp delay={0.28} className="flex flex-wrap gap-2 mb-10">
          {t.about.hashtags[lang].map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-line px-3 py-1 text-xs tracking-wide text-ink-muted bg-paper/60"
            >
              #{tag}
            </span>
          ))}
        </FadeUp>
      </div>
      <FloatDeco
        src="/images/deco-curl-blue.webp"
        width={150}
        height={125}
        duration={13}
        yRange={10}
        className="top-[12vh] left-[2vw] max-md:hidden"
      />
      <SpringDeco
        src="/images/deco-bell-bow.webp"
        width={100}
        height={125}
        initial={{ y: -40, x: 30, opacity: 0, scale: 0.85 }}
        enter={{ y: 0, x: 0, opacity: 0.8, scale: 1 }}
        className="top-[6vh] right-[14vw] max-md:hidden"
      />
      <Image
        src="/images/deco-flowers.webp"
        alt=""
        aria-hidden
        width={125}
        height={120}
        style={{ width: 125, height: 120 }}
        className="absolute bottom-[22vh] right-[6vw] max-md:hidden"
      />
      <BeaverDeco className="bottom-[2vh] md:bottom-[5vh] right-[8vw] md:left-[36vw] rotate-3" />
    </section>
  );
}
