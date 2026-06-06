"use client";

import Image from "next/image";
import FloatDeco from "@/components/deco/FloatDeco";
import CredentialsSection from "@/components/CredentialsSection";
import TechStackSection from "@/components/TechStackSection";

export default function SkillsSection() {
  return (
    <section
      aria-label="Skills"
      className="relative flex min-h-dvh w-screen shrink-0 max-md:flex-col items-center justify-center overflow-hidden bg-[color-mix(in_oklch,var(--color-paper)_65%,transparent)] md:h-dvh"
    >
      <div className="relative z-1 flex w-full max-md:flex-col max-md:py-16 max-md:gap-12 md:items-start md:divide-x md:divide-line">
        <CredentialsSection />
        <TechStackSection />
      </div>
      <FloatDeco
        src="/images/deco-flower-purple.webp"
        width={130}
        height={130}
        duration={10}
        yRange={8}
        rotate={20}
        className="top-[2.5vh] md:top-[7.5vh] right-[3vw]"
      />
      <Image
        src="/images/deco-fish-2.webp"
        alt=""
        aria-hidden
        width={150}
        height={80}
        style={{ width: 150, height: 80 }}
        className="absolute bottom-[5vh] left-[4vw] rotate-[-5deg] max-md:hidden"
      />
      <Image
        src="/images/deco-fish-3.webp"
        alt=""
        aria-hidden
        width={120}
        height={65}
        style={{ width: 120, height: 65 }}
        className="absolute bottom-[11vh] left-[12vw] rotate-[8deg] -scale-x-100 max-md:hidden"
      />
    </section>
  );
}
