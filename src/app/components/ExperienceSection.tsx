"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import FadeUp from "./FadeUp";
import { useLang } from "@/contexts/LanguageContext";
import { t, tx } from "../translations";

const companies = t.experience.companies;
type Company = (typeof companies)[number];
type ContentItem = Company["content"][number];
type DetailItem = ContentItem["details"][number];

export default function ExperienceSection() {
  const [activeId, setActiveId] = useState<string>(companies[0]?.id);
  const { lang } = useLang();

  const active = companies.find((c) => c.id === activeId) ?? companies[0];

  if (!active) return null;

  return (
    <section
      aria-label="Experience"
      className="relative flex min-h-dvh w-screen shrink-0 items-center overflow-hidden bg-[color-mix(in_oklch,var(--color-paper-mid)_65%,transparent)] max-md:py-12 px-8 md:px-[8vw]"
    >
      <div className="relative z-10 flex size-full max-md:flex-col gap-8 md:items-center justify-between md:gap-[8vw] xl:gap-[12vw]">
        <div className="shrink-0 w-fit">
          <FadeUp
            as="p"
            delay={0}
            className="text-xs tracking-[0.28em] text-accent mb-6 md:mb-12"
          >
            {tx(t.experience.label, lang)}
          </FadeUp>
          <ul role="tablist" className="flex gap-6 md:flex-col md:gap-0">
            {companies.map((c, i) => {
              const isActive = c.id === activeId;
              return (
                <FadeUp
                  as="li"
                  key={c.id}
                  delay={0.08 + i * 0.08}
                  role="presentation"
                >
                  <button
                    role="tab"
                    id={`tab-${c.id}`}
                    aria-selected={isActive}
                    aria-controls={`panel-${c.id}`}
                    onClick={() => setActiveId(c.id)}
                    className={`block w-full text-left cursor-pointer md:mb-8 transition-colors duration-300 border-b-2 pb-2 md:border-b-0 md:border-l-2 md:pl-4 md:pb-px md:py-px ${
                      isActive ? "border-accent" : "border-line"
                    }`}
                  >
                    <p
                      className={`font-display mb-1 md:mb-2 transition-colors duration-300 ${
                        isActive
                          ? "font-semibold text-ink"
                          : "font-normal text-ink-muted"
                      }`}
                    >
                      {c.companyName}
                    </p>
                    <p className="max-md:hidden text-xs text-ink-faint tracking-[0.04em]">
                      {c.date}
                    </p>
                    <p className="max-md:hidden text-xs text-ink-faint tracking-[0.04em] mt-0.5">
                      {tx(c.location, lang)}
                    </p>
                  </button>
                </FadeUp>
              );
            })}
          </ul>
        </div>
        <div
          role="tabpanel"
          id={`panel-${activeId}`}
          aria-labelledby={`tab-${activeId}`}
          className="flex-1 md:overflow-y-auto md:max-h-[80vh] pr-2 w-full"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeId}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{
                duration: 0.2,
                ease: "easeOut",
              }}
            >
              <header className="mb-6">
                <p className="font-display text-md font-semibold leading-tight mb-3">
                  {tx(active.role, lang)}
                  <span className="text-accent mx-2">@</span>
                  <a
                    href={active.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:underline"
                    suppressHydrationWarning
                  >
                    {active.companyName}
                  </a>
                </p>
              </header>
              <ul className="mb-8">
                {active.content.map((item: ContentItem, i: number) => (
                  <li key={i} className="mb-6">
                    <p className="sm:text-[1.125rem] font-medium text-ink-muted pl-4 border-l-[1.5px] border-line">
                      {tx(item.task, lang)}
                      {"href" in item.task && item.task.href && (
                        <a
                          href={item.task.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block ml-1.5 opacity-40 hover:opacity-80 transition-opacity"
                          suppressHydrationWarning
                        >
                          ↗
                        </a>
                      )}
                    </p>
                    {item.details.length > 0 && (
                      <ul className="pt-2 pl-8 list-disc">
                        {item.details.map((d: DetailItem, j: number) => (
                          <li
                            key={j}
                            className="text-[13px] sm:text-sm text-ink/65 leading-loose mb-1"
                          >
                            {"href" in d && d.href ? (
                              <a
                                href={d.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline underline-offset-2 hover:text-accent transition-colors"
                                suppressHydrationWarning
                              >
                                {tx(d, lang)}
                              </a>
                            ) : (
                              tx(d, lang)
                            )}
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-2">
                {active.skills.map((s) => (
                  <span
                    key={s}
                    className="text-xs tracking-widest text-ink-muted bg-paper-dark rounded-sm px-2.5 py-1"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <Image
        src="/images/deco-wax-seal.webp"
        alt=""
        aria-hidden
        width={90}
        height={125}
        style={{ width: 90, height: 125 }}
        className="absolute bottom-[50vh] left-[20vw] opacity-85 z-0 max-lg:hidden"
      />
      {activeId === "mrhost" && (
        <Image
          src="/images/deco-cat.webp"
          alt=""
          aria-hidden
          width={360}
          height={180}
          style={{ width: 360, height: 180 }}
          className="absolute bottom-[4vh] right-[2vw] opacity-80 scale-x-[-1] z-0"
        />
      )}
    </section>
  );
}
