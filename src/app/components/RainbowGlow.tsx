"use client";

import { useEffect, useRef } from "react";

const COLORS_SCHEME = [
  { r: 0.15, g: 0.05, b: 0.05 },
  { r: 0.15, g: 0.1, b: 0.05 },
  { r: 0.12, g: 0.12, b: 0.05 },
  { r: 0.05, g: 0.12, b: 0.05 },
  { r: 0.05, g: 0.08, b: 0.15 },
  { r: 0.06, g: 0.05, b: 0.12 },
  { r: 0.1, g: 0.05, b: 0.12 },
];

export default function RainbowGlow() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // 若在行動裝置、觸控螢幕（無滑鼠 hover）或開啟減少動畫
    if (
      window.matchMedia(
        "(hover: none), (pointer: coarse), (max-width: 767px), (prefers-reduced-motion: reduce)",
      ).matches
    )
      return;

    // 限制 DPR 上限，避免高解析螢幕拖慢效能。
    const dpr = Math.min(window.devicePixelRatio, 1.5);
    canvas.width = canvas.offsetWidth * dpr;
    canvas.height = canvas.offsetHeight * dpr;

    let initialized = false;
    let isCancelled = false;

    const initFluid = async () => {
      if (initialized || isCancelled) return;
      try {
        // @ts-expect-error webgl-fluid has no type declarations
        const { default: WebGLFluid } = await import("webgl-fluid");
        if (isCancelled || !canvasRef.current) return;

        globalThis.__webglFluidColors = COLORS_SCHEME;
        globalThis.__webglFluidColorIndex = 0;

        WebGLFluid(canvas, {
          IMMEDIATE: false,
          TRIGGER: "hover",
          TRANSPARENT: true,
          COLORFUL: true,
          COLOR_UPDATE_SPEED: 1.5,
          DENSITY_DISSIPATION: 2,
          VELOCITY_DISSIPATION: 0.5,
          PRESSURE: 0.05,
          CURL: 0,
          SPLAT_RADIUS: 0.5,
          SPLAT_FORCE: 3000,
          SHADING: false,
          BLOOM: false,
          SUNRAYS: false,
        });
        initialized = true;
      } catch {
        // 忽略動態載入被取消或失敗
      }
    };

    // 2. 嚴禁使用定時器或 requestIdleCallback 自動觸發！
    // 只有在使用者真正移動滑鼠時才載入與啟動流體特效
    let prevX = 0,
      prevY = 0,
      prevTime = 0;

    const onPointerMove = (e: PointerEvent) => {
      // 確保是真實滑鼠指針
      if (e.pointerType !== "mouse") return;

      if (!initialized) {
        void initFluid();
        return;
      }

      const now = performance.now();
      const dt = now - prevTime;
      const speed =
        dt > 0 ? Math.hypot(e.clientX - prevX, e.clientY - prevY) / dt : 0;
      prevX = e.clientX;
      prevY = e.clientY;
      prevTime = now;
      if (speed < 0.3) return;
      canvas.dispatchEvent(
        new MouseEvent("mousemove", {
          clientX: e.clientX,
          clientY: e.clientY,
        }),
      );
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });

    return () => {
      isCancelled = true;
      window.removeEventListener("pointermove", onPointerMove);

      globalThis.__webglFluidColors = undefined;
      globalThis.__webglFluidColorIndex = undefined;

      if (!initialized) return;

      const gl =
        canvas.getContext("webgl2") ??
        canvas.getContext("webgl") ??
        canvas.getContext("experimental-webgl");
      (gl as WebGLRenderingContext | WebGL2RenderingContext | null)
        ?.getExtension("WEBGL_lose_context")
        ?.loseContext();
    };
  }, []);

  return (
    <div
      className="fixed -inset-25 z-0 pointer-events-none overflow-hidden max-md:hidden"
      aria-hidden
    >
      <canvas
        ref={canvasRef}
        className="size-full blur translate-z-0 will-change-transform"
      />
    </div>
  );
}
