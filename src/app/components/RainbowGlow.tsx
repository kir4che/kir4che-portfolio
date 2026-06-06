"use client";

import { useEffect, useRef } from "react";
// @ts-expect-error webgl-fluid has no type declarations
import WebGLFluid from "webgl-fluid";

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

    // 若使用者開啟「減少動態效果」則不啟動 WebGLFluid
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // 限制 DPR 上限，避免 4K 螢幕上 canvas 解析度過高拖慢效能。
    const dpr = Math.min(window.devicePixelRatio, 1.5);
    canvas.width = canvas.offsetWidth * dpr;
    canvas.height = canvas.offsetHeight * dpr;

    // 透過 globalThis 把顏色陣列傳給 webgl-fluid 的 patch 版本
    // webgl-fluid 內部的 Ye() 函式會讀取這兩個全域變數來決定每次 splat 的顏色
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

    // 滑鼠移動過慢則不觸發 splat
    let prevX = 0,
      prevY = 0,
      prevTime = 0;
    const onPointerMove = (e: PointerEvent) => {
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

    // passive: true 讓滑鼠事件不會被 WebGLFluid 的 preventDefault 阻擋
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onPointerMove);

      // 清除全域顏色狀態
      globalThis.__webglFluidColors = undefined;
      globalThis.__webglFluidColorIndex = undefined;

      // 主動釋放 WebGL context，避免瀏覽器的 context 數量上限（通常 16 個）被耗盡。
      // webgl-fluid 優先用 webgl2，所以 cleanup 也先從 webgl2 開始找。
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
      className="fixed -inset-25 z-0 pointer-events-none overflow-hidden"
      aria-hidden
    >
      <canvas
        ref={canvasRef}
        className="size-full blur translate-z-0 will-change-transform"
      />
    </div>
  );
}
