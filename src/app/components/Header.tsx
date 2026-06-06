"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, animate } from "motion/react";
import { useScrollX } from "./HorizontalScroll";
import { useLang } from "@/contexts/LanguageContext";
import { t, tx } from "../translations";
import { FaGithub, FaBlogger, FaEnvelope } from "react-icons/fa";
import type { IconType } from "react-icons";

const SOCIAL_LINKS: { label: string; href: string; Icon: IconType }[] = [
  { label: "GitHub", href: "https://github.com/kir4che", Icon: FaGithub },
  { label: "Blog", href: "https://kir4che.com/", Icon: FaBlogger },
  { label: "Email", href: "mailto:mollydcxxiii@gmail.com", Icon: FaEnvelope },
];

const SECTION_IDS = [
  "about",
  "skills",
  "works",
  "experience",
  "contact",
] as const;
type SectionId = (typeof SECTION_IDS)[number];

const smoothScrollTo = (target: number) => {
  animate(window.scrollY, target, {
    duration: 0.7,
    ease: [0.32, 0, 0.67, 0],
    onUpdate: (v) => window.scrollTo(0, v),
  });
};

export default function Header() {
  const scrollX = useScrollX();
  const [activeIndex, setActiveIndex] = useState(-1);
  const [menuOpen, setMenuOpen] = useState(false);
  const { lang, toggleLang } = useLang();

  useEffect(() => {
    return scrollX.on("change", (x) => {
      const panel = Math.round(x / window.innerWidth);
      setActiveIndex(panel - 1);
    });
  }, [scrollX]);

  const scrollToPanel = (index: number) => {
    setMenuOpen(false);
    if (window.matchMedia("(max-width: 767px)").matches) {
      setTimeout(() => {
        const id = SECTION_IDS[index];
        const el = document.querySelector(
          `[aria-label="${id.charAt(0).toUpperCase() + id.slice(1)}"]`,
        );
        if (el) smoothScrollTo(el.getBoundingClientRect().top + window.scrollY);
      }, 320);
    } else {
      const target = (index + 1) * window.innerWidth;
      window.scrollTo({
        top: Math.min(target, document.body.scrollHeight - window.innerHeight),
        behavior: "smooth",
      });
    }
  };

  const sections = SECTION_IDS.map((id) => ({
    id,
    label: tx(t.nav[id as SectionId], lang),
  }));

  return (
    <>
      <header className="fixed top-0 left-0 z-50 flex h-13 w-full items-center px-8 lg:px-[8vw] bg-paper/80 backdrop-blur-sm lg:bg-transparent lg:backdrop-blur-none">
        <div className="flex flex-1 items-center gap-3">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="font-display text-sm font-semibold text-ink/85"
          >
            Molly Su
          </button>
          {SOCIAL_LINKS.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="opacity-40 transition-opacity duration-300 hover:opacity-80"
              suppressHydrationWarning
            >
              <Icon aria-hidden="true" size={16} />
            </a>
          ))}
        </div>
        <nav className="max-lg:hidden">
          <ul className="flex items-center gap-8">
            {sections.map((s, i) => (
              <li key={s.id}>
                <button
                  onClick={() => scrollToPanel(i)}
                  className={`nav-link text-xs tracking-[0.2em] transition-colors duration-300 ${
                    activeIndex === i
                      ? "text-accent font-semibold"
                      : "text-ink-faint hover:text-ink"
                  }`}
                >
                  {s.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex flex-1 items-center justify-end gap-4">
          <div className="flex items-center gap-1.5">
            {(["zh", "en"] as const).map((l, i) => (
              <div key={l} className="flex items-center gap-1.5">
                {i > 0 && <span className="text-[10px] text-line">｜</span>}
                <button
                  onClick={toggleLang}
                  className={`text-xs tracking-[0.12em] transition-colors duration-300 ${
                    lang === l
                      ? "font-semibold text-ink"
                      : "font-normal text-ink-faint hover:text-ink"
                  }`}
                >
                  {l.toUpperCase()}
                </button>
              </div>
            ))}
          </div>
          <button
            className="lg:hidden flex flex-col justify-center gap-1.25 size-6"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <span
              className={`block h-px bg-ink transition-all duration-300 origin-center ${menuOpen ? "rotate-45 translate-y-1.5" : ""}`}
            />
            <span
              className={`block h-px bg-ink transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-px bg-ink transition-all duration-300 origin-center ${menuOpen ? "-rotate-45 -translate-y-1.5" : ""}`}
            />
          </button>
        </div>
      </header>
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.22, ease: [0.32, 0, 0.67, 0] }}
            className="fixed inset-0 z-40 bg-paper/95 backdrop-blur-sm flex flex-col items-center justify-center gap-8 lg:hidden"
            onClick={() => setMenuOpen(false)}
          >
            {sections.map((s, i) => (
              <motion.button
                key={s.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{
                  type: "spring",
                  stiffness: 320,
                  damping: 26,
                  delay: i * 0.055,
                }}
                onClick={() => scrollToPanel(i)}
                className="flex items-baseline gap-3 group"
              >
                <span className="text-[10px] text-ink-faint tracking-widest tabular-nums w-5 text-right">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-3xl font-semibold tracking-tight transition-colors duration-200 group-hover:text-accent">
                  {s.label}
                </span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
