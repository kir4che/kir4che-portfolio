"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useViewportRef } from "@/components/HorizontalScroll";
import { useLang } from "@/contexts/LanguageContext";
import type { Lang } from "../translations";

interface WorkCardProps {
  title: string;
  tags: string;
  year: string;
  image: string;
  desc?: string;
  highlight?: readonly string[];
  links: {
    github?: string;
    live?: string;
    demo?: string;
  };
  index: number;
  variant?: "grid" | "sidebar";
}

const CARD_TRANSITION = {
  type: "spring" as const,
  stiffness: 80,
  damping: 18,
  mass: 0.8,
};

const cardTransition = (index: number) => ({
  ...CARD_TRANSITION,
  delay: 0.1 + index * 0.08,
});

const WorkMeta = ({ title, year }: Pick<WorkCardProps, "title" | "year">) => (
  <div className="px-4 py-3 shrink-0">
    <div className="flex items-baseline justify-between gap-2">
      <p className="font-display font-semibold leading-tight text-ink">
        {title}
      </p>
      <span className="text-xs text-ink-faint shrink-0">{year}</span>
    </div>
  </div>
);

const WorkLinks = ({
  links,
  title,
  lang,
  className,
}: {
  links: WorkCardProps["links"];
  title: string;
  lang: Lang;
  className: string;
}) => {
  const items = [
    links.github && {
      href: links.github,
      label: "GitHub",
      ariaLabel: `${title} on GitHub`,
    },
    links.live && {
      href: links.live,
      label: "Live",
      ariaLabel: `${title} — Live site`,
    },
    links.demo && {
      href: links.demo,
      label: lang === "zh" ? "Demo 影片" : "Demo Video",
      ariaLabel: `${title} — Demo`,
    },
  ].filter((item): item is { href: string; label: string; ariaLabel: string } =>
    Boolean(item),
  );

  return (
    <>
      {items.map((item) => (
        <a
          key={item.href}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={item.ariaLabel}
          className={"cursor-pointer " + className}
        >
          {item.label} ↗
        </a>
      ))}
    </>
  );
};

const HighlightList = ({
  items,
  mobile,
  reduced,
}: {
  items: readonly string[];
  mobile: boolean;
  reduced: boolean | null;
}) => {
  if (items.length === 0) return null;

  if (mobile)
    return (
      <ul className="list-disc pl-4 mb-3 space-y-0.5">
        {items.map((item, i) => (
          <li key={i} className="text-xs text-ink-muted leading-relaxed">
            {item}
          </li>
        ))}
      </ul>
    );

  return (
    <ul className="space-y-1.5">
      {items.map((item, i) => (
        <motion.li
          key={i}
          className="flex gap-2 text-sm text-paper leading-relaxed"
          initial={{ opacity: 0, y: reduced ? 0 : 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.04 + i * 0.03, duration: 0.18 }}
        >
          <span className="text-accent shrink-0 mt-px">→</span>
          <span>{item}</span>
        </motion.li>
      ))}
    </ul>
  );
};

export default function WorkCard({
  title,
  tags,
  year,
  image,
  desc,
  highlight,
  links,
  index,
  variant = "grid",
}: WorkCardProps) {
  const [hovered, setHovered] = useState(false);
  const reduced = useReducedMotion();
  const viewportRef = useViewportRef();
  const { lang } = useLang();

  const highlightItems = highlight ?? [];
  const href = links.live ?? links.demo ?? links.github;
  const transition = cardTransition(index);

  if (variant === "sidebar")
    return (
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={title}
        className="relative overflow-hidden rounded-xl bg-paper shadow-[0_2px_12px_oklch(0.28_0.02_30/0.08)] flex flex-col h-full cursor-pointer group"
        initial={{ opacity: 0, y: reduced ? 0 : 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, root: viewportRef, amount: 0.2 }}
        transition={transition}
      >
        <div className="relative overflow-hidden aspect-video">
          <Image
            src={image}
            alt={title}
            fill
            sizes="280px"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        </div>
        <WorkMeta title={title} year={year} />
        <p className="text-[10px] tracking-wider text-accent px-4 pb-3">
          {tags}
        </p>
      </motion.a>
    );

  return (
    <motion.div
      className="relative overflow-hidden rounded-xl bg-paper shadow-[0_2px_12px_oklch(0.28_0.02_30/0.08)] flex flex-col h-full"
      initial={{ opacity: 0, y: reduced ? 0 : 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, root: viewportRef, amount: 0.2 }}
      transition={transition}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      <div className="relative overflow-hidden aspect-video md:aspect-auto md:flex-1 md:min-h-0">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className={`object-cover transition-transform duration-500 ease-out ${hovered ? "scale-105" : "scale-100"}`}
          unoptimized={image.startsWith("https://placehold.co")}
        />
      </div>
      <div className="shrink-0">
        <WorkMeta title={title} year={year} />
        {desc && (
          <p className="text-xs text-ink-muted leading-relaxed -mt-2 px-4 pb-3 max-md:hidden">
            {desc}
          </p>
        )}
        <p className="text-[10px] tracking-wider text-accent px-4 pb-3 max-md:hidden">
          {tags}
        </p>
        <div className="md:hidden px-4 pb-3">
          <HighlightList items={highlightItems} mobile reduced={reduced} />
          <div className="flex gap-3">
            <WorkLinks
              links={links}
              title={title}
              lang={lang}
              className="text-xs text-accent hover:underline"
            />
          </div>
        </div>
      </div>
      <AnimatePresence>
        {hovered && (
          <motion.div
            className="absolute inset-0 max-md:hidden flex flex-col justify-between gap-3 p-5 backdrop-blur-sm"
            style={{ background: "oklch(0.28 0.02 30 / 0.72)" }}
            initial={{ opacity: 0, y: reduced ? 0 : 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduced ? 0 : 3 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <HighlightList
              items={highlightItems}
              mobile={false}
              reduced={reduced}
            />
            <div className="flex gap-2 flex-wrap">
              <WorkLinks
                links={links}
                title={title}
                lang={lang}
                className="text-sm font-semibold bg-paper/15 border border-paper/50 text-paper px-4 py-2 rounded-full hover:bg-paper hover:text-ink transition-colors duration-200 pointer-events-auto"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
