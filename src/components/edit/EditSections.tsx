import { useState, useEffect, useRef } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import StarBorder from "@/components/site/StarBorder";
import { cn } from "@/lib/utils";
import { SectionGlow } from "@/components/site/SectionGlow";

/** iOS Safari only exposes fullscreen on the video element itself. */
type IOSVideo = HTMLVideoElement & { webkitEnterFullscreen?: () => void };

/* ---------- Doodles ---------- */
function PlayDoodle({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 80 80" fill="none">
      <circle
        cx="40"
        cy="40"
        r="34"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeDasharray="4 6"
      />
      <path
        d="M34 28 L56 40 L34 52 Z"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ServiceCard({
  icon: Icon,
  title,
  description,
  index,
  children,
  className,
  top,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  index: number;
  children?: React.ReactNode;
  className?: string;
  top?: React.ReactNode;
}) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      className={cn(
        "group relative transition-all duration-500 ease-out hover:-translate-y-3",
        className,
      )}
    >
      <StarBorder
        className="w-full h-full"
        color="rgba(255, 255, 255, 0.6)"
        speed="16s"
        thickness={3}
      >
        <div
          className={cn(
            "relative flex flex-col items-start p-8 h-full w-full overflow-hidden",
            "liquid-glass dark:!bg-white/[0.03] border-none shadow-none",
            "backdrop-blur-xl backdrop-saturate-150",
          )}
        >
          {/* Spotlight Effect (Light Mode) */}
          <motion.div
            className="pointer-events-none absolute -inset-px rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 dark:hidden"
            style={{
              background: useMotionTemplate`
                radial-gradient(
                  400px circle at ${mouseX}px ${mouseY}px,
                  rgba(120, 140, 180, 0.28),
                  transparent 80%
                )
              `,
            }}
          />
          {/* Spotlight Effect (Dark Mode) */}
          <motion.div
            className="pointer-events-none absolute -inset-px rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 hidden dark:block"
            style={{
              background: useMotionTemplate`
                radial-gradient(
                  400px circle at ${mouseX}px ${mouseY}px,
                  rgba(255, 255, 255, 0.18),
                  transparent 80%
                )
              `,
            }}
          />

          {top && (
            <div className="relative -mx-8 -mt-8 mb-6 h-[40%] min-h-52 w-[calc(100%+4rem)] overflow-hidden">
              {top}
            </div>
          )}

          {/* Animated Icon Container */}
          <div className="relative mb-6">
            <motion.div
              animate={{
                y: [0, -8, 0],
                rotate: [0, 10, -10, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="flex h-14 w-14 items-center justify-center rounded-xl bg-orange-500/10 text-[#ff4d31] group-hover:scale-110 group-hover:bg-orange-500/20 transition-all duration-500"
            >
              <Icon className="h-7 w-7 transition-transform duration-500 group-hover:rotate-[360deg]" />

              {/* Icon Glow Animation */}
              <motion.div
                animate={{
                  opacity: [0.2, 0.5, 0.2],
                  scale: [1, 1.3, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 rounded-xl bg-orange-500/20 blur-xl"
              />
            </motion.div>
          </div>

          <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-3 tracking-tight">
            {title}
          </h3>
          <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed text-base">
            {description}
          </p>
          {children}
        </div>
      </StarBorder>
    </motion.div>
  );
}

/* ---------- Portfolio (skewed continuous video marquee) ---------- */
export const shortFormItems = [
  {
    id: "MB1",
    video: "/assets/video/1.mp4",
    poster:
      "https://framerusercontent.com/images/FHS0pgop7yjZHlGI56VGYUZULS0.png?width=260&height=462",
  },
  {
    id: "MB2",
    video: "/assets/video/2.mp4",
    poster:
      "https://framerusercontent.com/images/4kp2KImAJicjmXIczDErqcpt9FI.png?width=528&height=938",
  },
  {
    id: "MB3",
    video: "/assets/video/3.mp4",
    poster:
      "https://framerusercontent.com/images/RJn1eKEVAnvuDEpP5MAM11elvU.png?width=260&height=462",
  },
  {
    id: "MB4",
    video: "/assets/video/4.mp4",
    poster:
      "https://framerusercontent.com/images/JZOcw2Qtn21puWJbHgarML3XE.png?width=260&height=462",
  },
  {
    id: "MB5",
    video: "/assets/video/5.mp4",
    poster:
      "https://framerusercontent.com/images/5jOtcgkwh7AOIWMWAQXhjcUGSuk.png?width=528&height=938",
  },
  {
    id: "MB6",
    video: "/assets/video/6.mp4",
    poster:
      "https://framerusercontent.com/images/RJn1eKEVAnvuDEpP5MAM11elvU.png?width=260&height=462",
  },
  {
    id: "MB7",
    video: "/assets/video/7.mp4",
    poster:
      "https://framerusercontent.com/images/JZOcw2Qtn21puWJbHgarML3XE.png?width=260&height=462",
  },
];

interface PortfolioProps {
  items: typeof shortFormItems;
  title: string;
  subtitle: string;
  direction?: "left" | "right";
}

export function Portfolio({ items, title, subtitle, direction = "left" }: PortfolioProps) {
  const repeatedItems = [...items, ...items];

  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [playStates, setPlayStates] = useState<boolean[]>([]);
  const [muteStates, setMuteStates] = useState<boolean[]>([]);

  useEffect(() => {
    const len = repeatedItems.length;
    setPlayStates(new Array(len).fill(true));
    setMuteStates(new Array(len).fill(true));
  }, [repeatedItems.length]);

  const togglePlay = (idx: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const v = videoRefs.current[idx];
    if (!v) return;
    if (v.paused) {
      v.play();
      setPlayStates((prev) => {
        const next = [...prev];
        next[idx] = true;
        return next;
      });
    } else {
      v.pause();
      setPlayStates((prev) => {
        const next = [...prev];
        next[idx] = false;
        return next;
      });
    }
  };

  const toggleMute = (idx: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const v = videoRefs.current[idx];
    if (!v) return;
    v.muted = !v.muted;
    setMuteStates((prev) => {
      const next = [...prev];
      next[idx] = v.muted;
      return next;
    });
  };

  const openFullscreen = (idx: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const v = videoRefs.current[idx];
    if (!v) return;

    // Apply contain so vertical video never stretches on a horizontal screen
    const applyContain = () => {
      v.style.position = "fixed";
      v.style.inset = "0";
      v.style.width = "100vw";
      v.style.height = "100vh";
      v.style.objectFit = "contain";
      v.style.background = "#000";
      v.style.zIndex = "9999";
    };

    const revertContain = () => {
      v.style.position = "";
      v.style.inset = "";
      v.style.width = "";
      v.style.height = "";
      v.style.objectFit = "";
      v.style.background = "";
      v.style.zIndex = "";
    };

    // Native fullscreen — objectFit contain is applied via CSS in fullscreen pseudo-class
    // We inject a one-time <style> tag if not already present
    if (!document.getElementById("_vx-fs-style")) {
      const style = document.createElement("style");
      style.id = "_vx-fs-style";
      style.textContent = `
        video:fullscreen { object-fit: contain; background: #000; }
        video:-webkit-full-screen { object-fit: contain; background: #000; }
        video:-moz-full-screen { object-fit: contain; background: #000; }
      `;
      document.head.appendChild(style);
    }

    if (v.requestFullscreen) {
      v.requestFullscreen();
    } else if ((v as IOSVideo).webkitEnterFullscreen) {
      // iOS Safari — no native fullscreen API, use fixed overlay fallback
      applyContain();
      const exit = (ev: KeyboardEvent | TouchEvent) => {
        if ("key" in ev && ev.key !== "Escape") return;
        revertContain();
        document.removeEventListener("keydown", exit as EventListener);
        v.removeEventListener("touchend", exit as EventListener);
      };
      document.addEventListener("keydown", exit as EventListener);
      v.addEventListener("touchend", exit as EventListener);
      (v as IOSVideo).webkitEnterFullscreen!();
    }
  };

  return (
    <section
      id="portfolio"
      className="relative w-full px-4 sm:px-6 md:px-8 py-12 md:py-16 overflow-hidden"
    >
      <SectionGlow />
      <div className="absolute bottom-10 left-10 hidden md:block text-[#ff4d31]/40 doodle-float">
        <PlayDoodle className="h-14 w-14" />
      </div>

      <div className="mx-auto max-w-7xl mb-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 rounded-full border border-neutral-200/70 dark:border-white/10 bg-white/60 dark:bg-white/[0.04] backdrop-blur-md px-3 py-1 text-xs font-semibold text-neutral-600 dark:text-neutral-300 uppercase tracking-wider"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#ff4d31] animate-pulse" />
              Portfolio
            </motion.span>

            <h2 className="mt-3 text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-neutral-950 dark:text-white">
              {title}
            </h2>
          </div>
          <p className="max-w-md text-neutral-600 dark:text-neutral-400">{subtitle}</p>
        </div>
      </div>

      <div
        className="relative w-full overflow-hidden flex items-center py-6 select-none"
        style={{
          maskImage:
            "linear-gradient(to right, rgba(0,0,0,0) 0%, black 15%, black 85%, rgba(0,0,0,0) 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, rgba(0,0,0,0) 0%, black 15%, black 85%, rgba(0,0,0,0) 100%)",
        }}
      >
        <div
          className="w-full flex justify-center"
          style={{
            transform: "perspective(1200px) skewX(4deg) skewY(4deg)",
            transformStyle: "preserve-3d",
          }}
        >
          <div
            className="flex w-max gap-4 animate-marquee [animation-duration:120s] py-2 hover:[animation-play-state:paused]"
            style={{ animationDirection: direction === "right" ? "reverse" : "normal" }}
          >
            {repeatedItems.map((item, idx) => (
              <div
                key={`portfolio-${idx}`}
                className={`
  group
  ${idx === 1 && direction === "right" ? "w-[468px] md:w-[576px]" : "w-[234px] md:w-[288px]"}
  h-[416px] md:h-[512px]
  flex-shrink-0
  relative
  overflow-hidden
  rounded-xl
  border border-white/20 dark:border-white/10
  shadow-lg hover:shadow-2xl hover:scale-[1.02]
  transition-all duration-300
`}
              >
                {/* Video */}
                <video
                  ref={(el) => {
                    videoRefs.current[idx] = el;
                  }}
                  className="w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                >
                  <source src={item.video} type="video/mp4" />
                </video>

                {/* Gradient scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                {/* ── TOP RIGHT: Mute / Unmute ── */}
                <button
                  type="button"
                  onClick={(e) => toggleMute(idx, e)}
                  aria-label={muteStates[idx] ? "Unmute" : "Mute"}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center bg-black/40 backdrop-blur-md border border-white/20 text-white opacity-0 group-hover:opacity-100 translate-y-[-4px] group-hover:translate-y-0 transition-all duration-300 ease-out hover:bg-black/60 active:scale-95 cursor-pointer z-20"
                >
                  {muteStates[idx] ? (
                    /* Muted */
                    <svg viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5">
                      <path d="M7.5 2L4 5H1.5A.5.5 0 001 5.5v5a.5.5 0 00.5.5H4l3.5 3V2z" />
                      <line
                        x1="10.5"
                        y1="5"
                        x2="14.5"
                        y2="11"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                      <line
                        x1="14.5"
                        y1="5"
                        x2="10.5"
                        y2="11"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  ) : (
                    /* Unmuted */
                    <svg viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5">
                      <path d="M7.5 2L4 5H1.5A.5.5 0 001 5.5v5a.5.5 0 00.5.5H4l3.5 3V2z" />
                      <path
                        d="M10 5.5a3.5 3.5 0 010 5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        fill="none"
                        strokeLinecap="round"
                      />
                      <path
                        d="M12 3.5a6 6 0 010 9"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        fill="none"
                        strokeLinecap="round"
                      />
                    </svg>
                  )}
                </button>

                {/* ── CENTER: Play / Pause ── */}
                <button
                  type="button"
                  onClick={(e) => togglePlay(idx, e)}
                  aria-label={playStates[idx] ? "Pause" : "Play"}
                  className="absolute inset-0 m-auto w-12 h-12 rounded-full flex items-center justify-center bg-black/40 backdrop-blur-md border border-white/25 text-white opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-300 ease-out hover:bg-black/60 active:scale-95 cursor-pointer z-20"
                >
                  {playStates[idx] ? (
                    /* Pause */
                    <svg viewBox="0 0 16 16" fill="currentColor" className="w-5 h-5">
                      <rect x="3" y="2" width="3.5" height="12" rx="1" />
                      <rect x="9.5" y="2" width="3.5" height="12" rx="1" />
                    </svg>
                  ) : (
                    /* Play */
                    <svg
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className="w-5 h-5 translate-x-[1px]"
                    >
                      <path d="M4 2.5l9 5.5-9 5.5V2.5z" />
                    </svg>
                  )}
                </button>

                {/* ── BOTTOM RIGHT: Fullscreen ── */}
                <button
                  type="button"
                  onClick={(e) => openFullscreen(idx, e)}
                  aria-label="Fullscreen"
                  className="absolute bottom-3 right-3 w-8 h-8 rounded-full flex items-center justify-center bg-black/40 backdrop-blur-md border border-white/20 text-white opacity-0 group-hover:opacity-100 translate-y-[4px] group-hover:translate-y-0 transition-all duration-300 ease-out hover:bg-black/60 active:scale-95 cursor-pointer z-20"
                >
                  <svg
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    className="w-3.5 h-3.5"
                  >
                    <path d="M2 6V2h4M10 2h4v4M14 10v4h-4M6 14H2v-4" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
