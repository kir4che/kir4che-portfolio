"use client";

import Image from "next/image";
import FadeUp from "@/components/FadeUp";
import RotatingCube from "@/components/RotatingCube";
import SpringDeco from "@/components/deco/SpringDeco";

const CURRENT_YEAR = new Date().getFullYear();

export default function ContactSection() {
  return (
    <section
      aria-label="Contact"
      className="relative flex min-h-dvh w-screen shrink-0 flex-col overflow-hidden bg-[color-mix(in_oklch,var(--color-pink)_45%,transparent)] md:h-dvh"
    >
      <Image
        src="/images/deco-cat.webp"
        alt=""
        aria-hidden
        width={380}
        height={200}
        style={{ width: 380, height: 200 }}
        className="absolute opacity-80 bottom-[5vh] right-[5vw] max-md:hidden"
      />
      <Image
        src="/images/deco-star.webp"
        alt=""
        aria-hidden
        width={130}
        height={91}
        style={{ width: 130, height: 91 }}
        className="absolute top-[2vh] sm:top-[4vh] md:top-[9vh] right-[5vw] md:right-[18vw] rotate-[-10deg] z-10"
      />
      <Image
        src="/images/deco-fish.webp"
        alt=""
        aria-hidden
        width={160}
        height={88}
        style={{ width: 160, height: 88 }}
        className="absolute top-[12vh] left-0 -rotate-12 max-md:hidden"
      />
      <Image
        src="/images/deco-curl-purple.webp"
        alt=""
        aria-hidden
        width={130}
        height={104}
        style={{ width: 130, height: 104 }}
        className="absolute bottom-[8vh] left-[3vw]"
      />
      <div className="relative z-1 my-auto w-full px-8 max-md:py-20 flex max-md:flex-col gap-10 md:items-center md:gap-[8vw] md:px-[8vw]">
        <div className="shrink-0">
          <FadeUp
            as="p"
            delay={0}
            className="text-xs tracking-[0.28em] text-accent mb-8"
          >
            CONTACT
          </FadeUp>
          <div className="relative inline-block">
            <FadeUp
              as="h2"
              delay={0.08}
              className="font-display text-hero font-bold mb-8 leading-[1.1] md:mb-12"
            >
              Let&apos;s <br className="2xl:hidden" />
              talk.
            </FadeUp>
            <SpringDeco
              src="/images/deco-speech-bubble-3.webp"
              width={100}
              height={100}
              initial={{ scale: 0, opacity: 0, rotate: -20 }}
              enter={{ scale: 1, opacity: 0.88, rotate: 6 }}
              className="absolute -top-9 -right-28 lg:-right-24 z-10"
            />
          </div>
          <FadeUp delay={0.18} className="text-lg xs:text-xl text-ink-muted">
            <a
              href="mailto:mollydcxxiii@gmail.com"
              className="email-link block text-inherit no-underline"
              suppressHydrationWarning
            >
              mollydcxxiii@gmail.com
            </a>
          </FadeUp>
        </div>
        <div className="size-[clamp(280px,90vw,420px)] md:size-[clamp(200px,36vw,420px)] xl:size-[clamp(200px,40vw,500px)] max-md:self-end">
          <RotatingCube />
        </div>
      </div>
      <p className="relative z-1 self-end pr-8 pb-8 md:pr-[2vw] text-xs text-ink-faint tracking-widest">
        © {CURRENT_YEAR} Molly Su
      </p>
    </section>
  );
}
