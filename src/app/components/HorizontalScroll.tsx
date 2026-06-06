"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  motionValue,
  useMotionValue,
  useAnimationFrame,
  useReducedMotion,
  type MotionValue,
} from "motion/react";

const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(value, max));

const ScrollXContext = createContext<MotionValue<number>>(motionValue(0));

// 取得當前水平捲動位置
export const useScrollX = (): MotionValue<number> => useContext(ScrollXContext);

const ViewportContext = createContext<React.RefObject<HTMLDivElement | null>>({
  current: null,
});

// 取得 viewport ref 用來量尺寸或在裡面放 absolute 元素
export const useViewportRef = (): React.RefObject<HTMLDivElement | null> =>
  useContext(ViewportContext);

export default function HorizontalScroll({
  children,
  header,
}: {
  children: ReactNode;
  header?: ReactNode;
}) {
  const scrollXMV = useMotionValue(0);
  const reduced = useReducedMotion();

  // 橫向排列所有 section 的容器
  const stageRef = useRef<HTMLDivElement>(null);
  // 外層撐高度用的容器，讓使用者可以用垂直滾輪推動水平畫面。
  const spacerRef = useRef<HTMLDivElement>(null);
  // 固定在畫面上的 sticky 區域（實際可視範圍）
  const viewportRef = useRef<HTMLDivElement>(null);
  // 記錄目前已套用到 transform 的位置
  const currentRef = useRef(0);
  // 記錄總共可以水平移動多少 px
  const scrollRangeRef = useRef(0);

  const [isMobile, setIsMobile] = useState(false);

  // 監聽 viewport 是否進入 mobile 寬度，是則改回一般直向排列。
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const handler = () => setIsMobile(mq.matches);
    handler();
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // 測量階段：內容寬度、可捲動距離，並在 resize 時更新。
  useEffect(() => {
    if (isMobile) return;
    const stage = stageRef.current;
    const spacer = spacerRef.current;
    if (!stage || !spacer) return;

    // 測量可水平移動的總距離，並轉成頁面的垂直高度用來撐開頁面。
    const measure = () => {
      const newRange = stage.scrollWidth - window.innerWidth;
      const prevRange = scrollRangeRef.current;
      spacer.style.height = `calc(100vh + ${newRange}px)`;

      // 若內容寬度因 RWD 或圖片載入而改變，依照原本捲動比例校正位置 resize 時就不會錯位。
      if (prevRange > 0 && newRange !== prevRange) {
        const nextScrollY = Math.round(
          (currentRef.current / prevRange) * newRange,
        );
        window.scrollTo({ top: nextScrollY, behavior: "instant" });
        currentRef.current = nextScrollY;
      }
      scrollRangeRef.current = newRange;
    };

    measure();
    // 初始化先把 currentRef 設定到正確位置。
    // ex. 重整前使用者已滾動到一半，重整後應該還在一半，而不是跳回頭部。
    currentRef.current = clamp(window.scrollY, 0, scrollRangeRef.current);

    // 偵測 stage 尺寸變化
    const observer = new ResizeObserver(measure);
    observer.observe(stage);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [isMobile]);

  useAnimationFrame(() => {
    if (isMobile || scrollRangeRef.current <= 0) return;
    const stage = stageRef.current;
    if (!stage) return;

    // 把 window.scrollY 映射成水平位移：往下滾多少，stage 就往左移多少。
    const target = clamp(window.scrollY, 0, scrollRangeRef.current);

    // 每幀走「剩餘距離的 12%」，越靠近 target 越慢，製造平滑的動畫感。
    const factor = reduced ? 1 : 0.12;
    currentRef.current += (target - currentRef.current) * factor;
    // 當 target、current 非常接近時，直接把 current 設成 target。
    if (Math.abs(target - currentRef.current) < 0.1)
      currentRef.current = target;

    // 將計算後的水平位移套用到 stage 的 transform
    stage.style.transform = `translate3d(${-currentRef.current}px, 0, 0)`;
    scrollXMV.set(currentRef.current);
  });

  return (
    <ScrollXContext.Provider value={scrollXMV}>
      <ViewportContext.Provider value={viewportRef}>
        {header}
        {isMobile ? (
          <div className="flex flex-col">{children}</div>
        ) : (
          <div ref={spacerRef}>
            <div
              ref={viewportRef}
              className="sticky top-0 h-dvh overflow-hidden"
            >
              <div ref={stageRef} className="flex h-dvh will-change-transform">
                {children}
              </div>
            </div>
          </div>
        )}
      </ViewportContext.Provider>
    </ScrollXContext.Provider>
  );
}
