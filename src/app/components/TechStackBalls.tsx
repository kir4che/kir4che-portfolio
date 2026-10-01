"use client";

import { useEffect, useRef, useState } from "react";
import Matter from "matter-js";
import {
  SiHtml5,
  SiCss,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiSass,
  SiVite,
  SiGit,
} from "react-icons/si";
import type { IconType } from "react-icons";

type Tech = {
  name: string;
  Icon: IconType;
  color: string;
  iconColor?: string;
  description: { zh: string; en: string };
};

const TECHS: Tech[] = [
  {
    name: "HTML5 / CSS3",
    Icon: SiHtml5,
    color: "#E34F26",
    description: {
      zh: "語意化標籤、RWD 響應式設計",
      en: "Semantic HTML and responsive web design (RWD)",
    },
  },
  {
    name: "JavaScript",
    Icon: SiJavascript,
    color: "#F7DF1E",
    iconColor: "#1a1a1a",
    description: {
      zh: "ES5/ES6+ 語法、非同步處理、DOM 操作",
      en: "ES5/ES6+ syntax, asynchronous programming, and DOM manipulation",
    },
  },
  {
    name: "TypeScript",
    Icon: SiTypescript,
    color: "#3178C6",
    description: {
      zh: "熟悉型別系統、generics 與 strict 模式",
      en: "Comfortable with the type system, generics, and strict mode",
    },
  },
  {
    name: "React",
    Icon: SiReact,
    color: "#61DAFB",
    iconColor: "#1a1a1a",
    description: {
      zh: "熟悉 hooks、context、自訂 hook 模式",
      en: "Proficient with hooks, context, and custom hook patterns",
    },
  },
  {
    name: "Next.js",
    Icon: SiNextdotjs,
    color: "#000000",
    description: {
      zh: "熟悉 App Router、SSR/SSG、route handler",
      en: "Familiar with App Router, SSR/SSG, and route handlers",
    },
  },
  {
    name: "Tailwind CSS",
    Icon: SiTailwindcss,
    color: "#06B6D4",
    description: {
      zh: "熟悉 utility-first 工作流，搭配設計系統使用。",
      en: "Proficient with utility-first workflow and design system integration",
    },
  },
  {
    name: "Sass",
    Icon: SiSass,
    color: "#CC6699",
    description: {
      zh: "熟悉 variables、mixin、nesting 維護大型樣式",
      en: "Comfortable maintaining large stylesheets with variables, mixins, and nesting",
    },
  },
  {
    name: "Vite",
    Icon: SiVite,
    color: "#646CFF",
    description: {
      zh: "熟悉開發設定與 HMR 工作流",
      en: "Familiar with dev config and HMR workflow",
    },
  },
  {
    name: "Git",
    Icon: SiGit,
    color: "#F05032",
    description: {
      zh: "熟悉分支協作、code review 與版本管理",
      en: "Proficient with branching, code review, and release management",
    },
  },
];

// Matter's .d.ts types don't expose these internal fields, but the runtime accepts null.
// Centralised here so breakage from a Matter update is found in one place.
function forceReleaseMatterConstraint(
  mc: Matter.MouseConstraint,
  mouse: Matter.Mouse,
) {
  (mc.constraint as unknown as { bodyB: unknown; pointB: unknown }).bodyB =
    null;
  (mc.constraint as unknown as { bodyB: unknown; pointB: unknown }).pointB =
    null;
  (mc as unknown as { body: unknown }).body = null;
  // Prevent MouseConstraint.update from re-grabbing on the next tick while the button is held.
  (mouse as unknown as { button: number }).button = -1;
}

type Props = {
  width?: number;
  height?: number;
  radius?: number;
  className?: string;
  lang?: "zh" | "en";
};

export default function TechStackBalls({
  width = 480,
  height = 320,
  radius = 32,
  className = "",
  lang = "zh",
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const ballRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [tooltip, setTooltip] = useState<Tech | null>(null);

  const isDragging = useRef(false);
  const pointerStart = useRef({ x: 0, y: 0 });

  const handleBallClick = (tech: Tech) => {
    setTooltip((prev) => (prev?.name === tech.name ? null : tech));
  };

  useEffect(() => {
    const handleDismiss = () => setTooltip(null);
    document.addEventListener("click", handleDismiss);
    return () => document.removeEventListener("click", handleDismiss);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const {
      Engine,
      Runner,
      Bodies,
      Composite,
      Mouse,
      MouseConstraint,
      Events,
    } = Matter;

    const engine = Engine.create();
    engine.gravity.y = 1;

    // Sealed box: floor + ceiling + left + right. Floor/ceiling overhang the
    // sides so corners can't leak under hard throws.
    const wallThickness = 50;
    const walls = [
      Bodies.rectangle(
        width / 2,
        height + wallThickness / 2,
        width + wallThickness * 2,
        wallThickness,
        { isStatic: true },
      ),
      Bodies.rectangle(
        width / 2,
        -wallThickness / 2,
        width + wallThickness * 2,
        wallThickness,
        { isStatic: true },
      ),
      Bodies.rectangle(-wallThickness / 2, height / 2, wallThickness, height, {
        isStatic: true,
      }),
      Bodies.rectangle(
        width + wallThickness / 2,
        height / 2,
        wallThickness,
        height,
        { isStatic: true },
      ),
    ];

    // 4-3-2-1 pyramid target positions, hex-packed.
    const rowGap = radius * Math.sqrt(3);
    const positions = [4, 3, 2, 1].flatMap((count, row) => {
      const rowY = height - radius - row * rowGap;
      const startX = width / 2 - count * radius + radius;
      return Array.from({ length: count }, (_, i) => ({
        x: startX + i * radius * 2,
        y: rowY,
      }));
    });

    // Spawn inside the sealed box. Small upward offset + horizontal jitter
    // gives a brief settle-in motion without risking spawning above the ceiling.
    const balls = TECHS.map((_, i) => {
      const { x, y } = positions[i];
      return Bodies.circle(
        x + (Math.random() - 0.5) * 4,
        Math.max(radius + 4, y - 60),
        radius,
        {
          restitution: 0.35,
          friction: 0.05,
          frictionAir: 0.01,
          density: 0.002,
        },
      );
    });

    const mouse = Mouse.create(container);
    // Matter binds wheel events as non-passive, which blocks page scroll.
    // Re-bind them as passive so the browser can scroll freely.
    const m = mouse as unknown as {
      mousewheel: EventListener;
      element: HTMLElement;
    };
    m.element.removeEventListener("mousewheel", m.mousewheel);
    m.element.removeEventListener("DOMMouseScroll", m.mousewheel);
    m.element.addEventListener("mousewheel", m.mousewheel, { passive: true });
    m.element.addEventListener("DOMMouseScroll", m.mousewheel, {
      passive: true,
    });

    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: 0.2,
        damping: 0.1,
        render: { visible: false },
      },
    });

    Composite.add(engine.world, [...walls, ...balls, mouseConstraint]);

    // Auto-release the dragged ball when the cursor hits any edge so the ball
    // doesn't get glued to the wall or yanked outside the container.
    const releaseDragged = () => {
      if (!mouseConstraint.body) return;
      forceReleaseMatterConstraint(mouseConstraint, mouse);
    };

    // If the ball can't keep up with the cursor (because a wall is blocking it),
    // the distance between cursor and ball grows. Past this threshold = pinned
    // against a wall → release so it falls naturally.
    const releaseDistSq = (radius * 2) ** 2;
    Events.on(engine, "beforeUpdate", () => {
      const body = mouseConstraint.body;
      if (!body) return;
      const dx = mouse.position.x - body.position.x;
      const dy = mouse.position.y - body.position.y;
      if (dx * dx + dy * dy > releaseDistSq) {
        releaseDragged();
      }
    });

    container.addEventListener("mouseleave", releaseDragged);

    const runner = Runner.create();
    Runner.run(runner, engine);

    let frameId = 0;
    const els = ballRefs.current;
    const tick = () => {
      for (let i = 0; i < balls.length; i++) {
        const el = els[i];
        if (!el) continue;
        const body = balls[i];
        el.style.transform = `translate(${body.position.x - radius}px, ${body.position.y - radius}px) rotate(${body.angle}rad)`;
      }
      frameId = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(frameId);
      Runner.stop(runner);
      container.removeEventListener("mouseleave", releaseDragged);
      Events.off(engine, "beforeUpdate");

      // Matter's Mouse attaches DOM listeners without exposing a destroy.
      // Manually remove them so React strict-mode remounts don't stack.
      const m = mouse as unknown as {
        element: HTMLElement;
        mousedown: EventListener;
        mousemove: EventListener;
        mouseup: EventListener;
        mousewheel: EventListener;
      };
      if (m.element) {
        m.element.removeEventListener("mousedown", m.mousedown);
        m.element.removeEventListener("mousemove", m.mousemove);
        m.element.removeEventListener("mouseup", m.mouseup);
        m.element.removeEventListener("mousewheel", m.mousewheel);
        m.element.removeEventListener("DOMMouseScroll", m.mousewheel);
        m.element.removeEventListener("touchstart", m.mousedown);
        m.element.removeEventListener("touchmove", m.mousemove);
        m.element.removeEventListener("touchend", m.mouseup);
      }

      Composite.clear(engine.world, false);
      Engine.clear(engine);
    };
  }, [width, height, radius]);

  return (
    <>
      <div className={className} aria-label="Tech stack ball pit">
        <div
          ref={containerRef}
          className="relative touch-none"
          style={{ width, height }}
        >
          {TECHS.map((tech, i) => {
            const Icon = tech.Icon;
            return (
              <div
                key={tech.name}
                ref={(el) => {
                  ballRefs.current[i] = el;
                }}
                className="absolute top-0 left-0 flex items-center justify-center rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.15)] will-change-transform select-none cursor-pointer"
                style={{
                  width: radius * 2,
                  height: radius * 2,
                  backgroundColor: tech.color,
                }}
                title={tech.name}
                onPointerDown={(e) => {
                  isDragging.current = false;
                  pointerStart.current = { x: e.clientX, y: e.clientY };
                }}
                onPointerMove={(e) => {
                  const dx = e.clientX - pointerStart.current.x;
                  const dy = e.clientY - pointerStart.current.y;
                  if (dx * dx + dy * dy > 16) isDragging.current = true;
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  if (isDragging.current) return;
                  handleBallClick(tech);
                }}
              >
                <Icon size={radius} color={tech.iconColor ?? "#fff"} />
              </div>
            );
          })}
        </div>
      </div>
      {tooltip &&
        (() => {
          const idx = TECHS.findIndex((t) => t.name === tooltip.name);
          const el = ballRefs.current[idx];
          const rect = el?.getBoundingClientRect();
          if (!rect) return null;
          return (
            <div
              onClick={(e) => e.stopPropagation()}
              className="fixed z-50 w-56 rounded-xl border border-line bg-paper px-4 py-3 shadow-[0_8px_24px_oklch(0.28_0.02_30/0.12)]"
              style={{
                left: rect.left + rect.width / 2,
                top: rect.top - 8,
                transform: "translate(-50%, -100%)",
              }}
            >
              <p className="mb-1 text-sm font-semibold text-ink">
                {tooltip.name}
              </p>
              <p className="text-xs leading-relaxed text-ink-muted">
                {tooltip.description[lang]}
              </p>
            </div>
          );
        })()}
    </>
  );
}
