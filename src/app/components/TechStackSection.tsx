"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import FadeUp from "./FadeUp";
import { useLang } from "@/contexts/LanguageContext";
import { t, tx, type Lang } from "../translations";
import {
  SiHtml5,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiAstro,
  SiTailwindcss,
  SiSass,
  SiGreensock,
  SiMui,
  SiNodedotjs,
  SiMysql,
  SiVitest,
  SiGit,
  SiFigma,
  SiPython,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";
import type { IconType } from "react-icons";

const { techStackLabel, techStackHint, learningLabel, techGroups } = t.credentials;

const TECH_ICONS: Record<string, { Icon: IconType; color: string }> = {
  html: { Icon: SiHtml5, color: "#E34F26" },
  javascript: { Icon: SiJavascript, color: "#F7DF1E" },
  typescript: { Icon: SiTypescript, color: "#3178C6" },
  react: { Icon: SiReact, color: "#61DAFB" },
  nextjs: { Icon: SiNextdotjs, color: "#000000" },
  astro: { Icon: SiAstro, color: "#FF5D01" },
  tailwind: { Icon: SiTailwindcss, color: "#06B6D4" },
  sass: { Icon: SiSass, color: "#CC6699" },
  mui: { Icon: SiMui, color: "#007FFF" },
  gsap: { Icon: SiGreensock, color: "#88CE02" },
  nodejs: { Icon: SiNodedotjs, color: "#339933" },
  mysql: { Icon: SiMysql, color: "#4479A1" },
  java: { Icon: FaJava, color: "#ED8B00" },
  python: { Icon: SiPython, color: "#3776AB" },
  vitest: { Icon: SiVitest, color: "#6E9F18" },
  git: { Icon: SiGit, color: "#F05032" },
  figma: { Icon: SiFigma, color: "#F24E1E" },
};

type TooltipPos = {
  x: number;
  y: number;
  arrowX: number;
  placement: "top" | "bottom";
};

type TechItem = (typeof techGroups)[number]["items"][number];
type TechItemWithDesc = Extract<
  TechItem,
  { desc: Record<Lang, readonly string[]> }
>;

const TOOLTIP_WIDTH = 256;
const SCREEN_PADDING = 8;
const TOOLTIP_ESTIMATE_HEIGHT = 120;
const TOOLTIP_OFFSET = 8;

const getTooltipPosition = (rect: DOMRect): TooltipPos => {
  const pillCenterX = rect.left + rect.width / 2;
  const rawLeft = pillCenterX - TOOLTIP_WIDTH / 2;
  const clampedLeft = Math.min(
    Math.max(rawLeft, SCREEN_PADDING),
    window.innerWidth - TOOLTIP_WIDTH - SCREEN_PADDING,
  );
  const placement =
    rect.top < TOOLTIP_ESTIMATE_HEIGHT + SCREEN_PADDING ? "bottom" : "top";

  return {
    x: clampedLeft,
    y:
      placement === "top"
        ? rect.top - TOOLTIP_OFFSET
        : rect.bottom + TOOLTIP_OFFSET,
    arrowX: pillCenterX - clampedLeft,
    placement,
  };
};

const hasTechDesc = (tech: TechItem): tech is TechItemWithDesc =>
  "desc" in tech;

const getTechDesc = (tech: TechItem, lang: Lang): readonly string[] =>
  hasTechDesc(tech) ? tech.desc[lang] : [];

const TooltipArrow = ({
  placement,
  arrowX,
}: {
  placement: TooltipPos["placement"];
  arrowX: number;
}) => {
  const isTop = placement === "top";
  return (
    <>
      <span
        className={
          isTop
            ? "absolute top-full -mt-px border-4 border-transparent border-t-line"
            : "absolute bottom-full -mb-px border-4 border-transparent border-b-line"
        }
        style={{ left: arrowX, transform: "translateX(-50%)" }}
      />
      <span
        className={
          isTop
            ? "absolute top-full -mt-1.25 border-4 border-transparent border-t-paper"
            : "absolute bottom-full -mb-1.25 border-4 border-transparent border-b-paper"
        }
        style={{ left: arrowX, transform: "translateX(-50%)" }}
      />
    </>
  );
};

const TechPill = ({ tech, lang }: { tech: TechItem; lang: Lang }) => {
  const [pos, setPos] = useState<TooltipPos | null>(null);
  const [visible, setVisible] = useState(false);
  const pillRef = useRef<HTMLSpanElement>(null);
  const showTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const meta = TECH_ICONS[tech.id];
  const lines = getTechDesc(tech, lang);
  const hasDesc = lines.length > 0;
  const level = "level" in tech ? tech.level : undefined;

  const closeTooltip = () => {
    if (showTimerRef.current) clearTimeout(showTimerRef.current);
    setVisible(false);
    setTimeout(() => setPos(null), 150);
  };

  // 當 tooltip 顯示時，監聽 scroll 事件以關閉 tooltip，避免位置錯誤。
  useEffect(() => {
    if (!pos) return;
    window.addEventListener("scroll", closeTooltip, {
      capture: true,
      passive: true,
    });
    return () =>
      window.removeEventListener("scroll", closeTooltip, { capture: true });
  }, [pos]);

  const handleMouseEnter = () => {
    if (!hasDesc || !pillRef.current) return;
    setPos(getTooltipPosition(pillRef.current.getBoundingClientRect()));
    showTimerRef.current = setTimeout(() => setVisible(true), 10);
  };

  const handleMouseLeave = closeTooltip;

  const tooltip =
    pos && hasDesc
      ? createPortal(
          <div
            className="fixed z-9999 w-64 rounded-lg border border-line bg-paper shadow-md px-3.5 py-2.5 pointer-events-none transition-[opacity,transform] duration-150 ease-out"
            style={{
              left: pos.x,
              top: pos.y,
              transform:
                pos.placement === "top"
                  ? `translateY(-100%) ${visible ? "scale(1)" : "scale(0.95)"}`
                  : `translateY(0) ${visible ? "scale(1)" : "scale(0.95)"}`,
              opacity: visible ? 1 : 0,
              transformOrigin: pos.placement === "top" ? "50% 100%" : "50% 0%",
            }}
          >
            <ul className="flex flex-col gap-1 list-disc pl-3.5">
              {lines.map((line, i) => (
                <li
                  key={i}
                  className="text-[13px] leading-relaxed text-ink-muted"
                >
                  {line}
                </li>
              ))}
            </ul>
            <TooltipArrow placement={pos.placement} arrowX={pos.arrowX} />
          </div>,
          document.body,
        )
      : null;

  return (
    <>
      <span
        ref={pillRef}
        className="relative inline-flex items-center gap-1.5 rounded-full border border-line bg-paper px-3.5 py-1.5 tracking-wide text-[12px] sm:text-sm font-medium text-ink-muted cursor-default transition-all duration-200"
        style={
          pos && hasDesc && meta
            ? {
                backgroundColor: `${meta.color}18`,
                borderColor: `${meta.color}60`,
              }
            : undefined
        }
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {meta && <meta.Icon size={13} color={meta.color} aria-hidden="true" />}
        {tech.name}
        {level && (
          <span className="text-[9px] tracking-wide text-ink-faint/70 bg-line/40 rounded-full px-1.5 py-0.5 uppercase leading-none">
            {level}
          </span>
        )}
      </span>
      {tooltip}
    </>
  );
};

export default function TechStackSection() {
  const { lang } = useLang();

  return (
    <div className="flex-1 flex flex-col justify-start px-8 md:pl-[4vw] md:pr-[8vw] gap-6 md:gap-8">
      <FadeUp
        as="p"
        delay={0.08}
        className="text-[10px] tracking-[0.22em] text-accent"
      >
        {tx(techStackLabel, lang)}
      </FadeUp>
      <div className="flex flex-col gap-6">
        {techGroups.map((group, gi) => (
          <FadeUp key={group.label.en} delay={0.12 + gi * 0.06}>
            <p className="text-xs tracking-[0.15em] text-ink-faint mb-3">
              {tx(group.label, lang)}
            </p>
            <div className="flex flex-wrap gap-2 md:gap-y-3">
              {group.items.map((tech) => (
                <TechPill key={tech.id} tech={tech} lang={lang} />
              ))}
            </div>
          </FadeUp>
        ))}
        <FadeUp delay={0.12 + techGroups.length * 0.06}>
          <p className="text-xs tracking-[0.15em] text-ink-faint mb-3">
            {tx(learningLabel, lang)}
          </p>
          <div className="flex flex-wrap gap-2 md:gap-y-3">
            {["CS50", "Three.js"].map((name) => (
              <span
                key={name}
                className="inline-flex items-center rounded-full border border-dashed border-line px-3.5 py-1.5 text-[12px] sm:text-sm text-ink-faint/60 tracking-wide"
              >
                {name}
              </span>
            ))}
          </div>
        </FadeUp>
        <FadeUp delay={0.12 + (techGroups.length + 1) * 0.06}>
          <p className="text-[10px] tracking-wide text-ink-faint">
            ※ {tx(techStackHint, lang)}
          </p>
        </FadeUp>
      </div>
    </div>
  );
}
