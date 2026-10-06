import React from "react";

type StarBorderProps = React.HTMLAttributes<HTMLDivElement> & {
  color?: string;
  speed?: React.CSSProperties["animationDuration"];
  thickness?: number;
};

const StarBorder = ({
  className = "",
  color = "rgba(255, 255, 255, 0.5)",
  speed = "6s",
  thickness = 1,
  children,
  style,
  ...rest
}: StarBorderProps) => {
  return (
    <div
      className={`relative inline-block overflow-hidden rounded-xl ${className}`}
      {...rest}
      style={{ padding: `${thickness}px`, ...style }}
    >
      <div
        className="absolute w-[300%] h-[50%] opacity-70 bottom-[-11px] right-[-250%] rounded-full animate-star-movement-bottom z-0"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 25%)`,
          animationDuration: speed,
        }}
      ></div>
      <div
        className="absolute w-[300%] h-[50%] opacity-70 top-[-10px] left-[-250%] rounded-full animate-star-movement-top z-0"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed,
        }}
      ></div>
      <div className="relative z-1 h-full w-full rounded-xl overflow-hidden bg-white/60 dark:bg-black/20 backdrop-blur-3xl border border-neutral-200/50 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none">
        {children}
      </div>
    </div>
  );
};

export default StarBorder;
