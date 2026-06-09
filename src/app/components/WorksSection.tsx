"use client";

import Image from "next/image";
import FadeUp from "@/components/FadeUp";
import FloatDeco from "@/components/deco/FloatDeco";
import SpringDeco from "@/components/deco/SpringDeco";
import WorkCard from "@/components/WorkCard";
import { useLang } from "@/contexts/LanguageContext";
import { t, tx } from "../translations";

export default function WorksSection() {
  const { lang } = useLang();

  return (
    <section
      aria-label="Works"
      className="relative flex min-h-dvh w-screen shrink-0 flex-col overflow-hidden bg-[color-mix(in_oklch,var(--color-paper)_65%,transparent)] md:h-dvh px-8 md:px-[4vw] md:pt-16"
    >
      <FadeUp
        as="h2"
        delay={0.08}
        className="font-display text-lg font-bold tracking-tight"
      >
        {tx(t.works.heading, lang)}
      </FadeUp>
      <div className="flex-1 flex max-xl:flex-col justify-between pt-6 md:pt-4 pb-12 gap-8 lg:gap-[3vw]">
        <div className="flex-1 flex items-center justify-center">
          <ul
            className="
              w-full
              flex flex-col gap-6
              md:grid md:grid-cols-2 md:grid-rows-2 md:gap-4 md:h-full md:max-h-[calc(100dvh-9rem)]
            "
          >
            {t.works.items.map((item, i) => (
              <li key={i}>
                <WorkCard
                  title={tx(item.title, lang)}
                  tags={item.tags}
                  year={item.year}
                  image={item.image}
                  desc={tx(item.desc, lang)}
                  highlight={item.highlight[lang]}
                  links={item.links}
                  index={i}
                />
              </li>
            ))}
          </ul>
        </div>
        {t.otherProjects.items.length > 0 && (
          <div className="md:w-[clamp(225px,25vw,280px)] md:flex md:flex-col">
            <p className="text-sm font-medium tracking-widest text-accent mb-2">
              {t.otherProjects.label[lang]}
            </p>
            <ul className="flex flex-col gap-4">
              {t.otherProjects.items.map((item, i) => (
                <li key={i}>
                  <WorkCard
                    title={tx(item.title, lang)}
                    tags={item.tags}
                    year={item.year}
                    image={item.image}
                    desc={item.desc ? tx(item.desc, lang) : undefined}
                    highlight={item.highlight?.[lang]}
                    links={item.links}
                    index={i}
                    variant="sidebar"
                  />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <Image
        src="/images/deco-star.webp"
        alt=""
        aria-hidden
        width={220}
        height={150}
        style={{ width: 220, height: 150 }}
        className="absolute opacity-50 top-[8vh] left-[30vw] max-md:hidden -z-10"
      />
      <FloatDeco
        src="/images/deco-star-green.webp"
        width={130}
        height={130}
        duration={14}
        yRange={10}
        rotate={25}
        className="bottom-[4vh] right-[3vw] max-md:hidden"
      />
      <SpringDeco
        src="/images/deco-binder-clip.webp"
        width={68}
        height={80}
        initial={{ rotate: 40, scale: 0, opacity: 0 }}
        enter={{ rotate: -6, scale: 1, opacity: 0.68 }}
        className="top-[6vh] right-[28vw] max-lg:hidden rotate-30"
      />
    </section>
  );
}
