import Image from "next/image";

interface FloatDecoProps {
  src: string;
  width: number;
  height: number;
  duration?: number;
  yRange?: number;
  rotate?: number;
  className?: string;
  priority?: boolean;
}

// 以純 CSS GPU 合成層動畫實現持續漂浮效果，完全不佔用 JavaScript 主執行緒 (TBT: 0ms)
export default function FloatDeco({
  src,
  width,
  height,
  duration = 10,
  yRange = 12,
  rotate = 0,
  className,
  priority,
}: FloatDecoProps) {
  return (
    <div
      aria-hidden
      className={`absolute pointer-events-none float-deco-anim ${className ?? ""}`}
      style={
        {
          "--float-duration": `${duration}s`,
          "--float-y": `-${yRange}px`,
          "--float-rot": `${rotate}deg`,
        } as React.CSSProperties
      }
    >
      <Image
        src={src}
        alt=""
        width={width}
        height={height}
        draggable={false}
        priority={priority}
        className="block select-none"
        style={{ width: width, height: height }}
      />
    </div>
  );
}
