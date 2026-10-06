import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowRight, BadgeCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import SpotlightCard from "./SpotlightCard";
import { serviceList } from "@/components/services/ServicePage";
import { DesignedThumb, ThumbnailGrid, posters } from "@/components/services/ServiceVisuals";

const shortForm = [
  "/assets/video/1.mp4",
  "/assets/video/2.mp4",
  "/assets/video/3.mp4",
  "/assets/video/6.mp4",
];

function ShortFormWork() {
  return (
    <div className="marquee-mask overflow-hidden w-full">
      <div className="flex w-max gap-4 md:gap-6 animate-marquee hover:[animation-play-state:paused] py-4">
        {[...shortForm, ...shortForm, ...shortForm].map((src, index) => (
          <div key={index} className="w-[170px] md:w-[300px] flex-shrink-0">
            <SpotlightCard
              className="group h-full p-4 md:p-5 rounded-x liquid-glass dark:!bg-white/[0.04] border-white/40 dark:border-white/10 backdrop-blur-xl"
              spotlightColor="rgba(120, 140, 180, 0.28)"
              darkSpotlightColor="rgba(255, 255, 255, 0.18)"
            >
              <div className="relative aspect-[9/16] w-full overflow-hidden rounded-x bg-neutral-900/50">
                <video
                  src={src}
                  loop
                  muted
                  playsInline
                  autoPlay
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10 rounded-x" />
              </div>
            </SpotlightCard>
          </div>
        ))}
      </div>
    </div>
  );
}

// TODO: swap for real long-form client videos.
const longForm = [
  {
    src: posters[1],
    video: "/assets/video/7.mp4",
    text: "I almost quit",
    tone: "yellow",
    title: "I almost quit my podcast at episode 7. Here's why I didn't",
    ch: "Founder Diaries",
    views: "412K views · 2 weeks ago",
    dur: "42:10",
  },
  {
    src: posters[3],
    img: "object-top scale-[1.35] origin-top",
    video: "/assets/video/6.mp4",
    text: "100 days later",
    tone: "white",
    title: "I trained every day for 100 days (full documentary)",
    ch: "Move Daily",
    views: "1.1M views · 1 month ago",
    dur: "27:33",
  },
  {
    src: posters[2],
    video: "/assets/video/3.mp4",
    text: "Made by hand",
    tone: "red",
    title: "The last calligrapher in the city",
    ch: "Slow Craft",
    views: "268K views · 3 weeks ago",
    dur: "18:04",
  },
  {
    src: posters[4],
    video: "/assets/video/2.mp4",
    text: "$0 → $10K",
    sub: "full breakdown",
    tone: "white",
    title: "How I made my first $10K online: the full breakdown",
    ch: "Side Hustle Lab",
    views: "684K views · 1 month ago",
    dur: "35:20",
  },
  {
    src: posters[0],
    img: "object-[50%_75%]",
    video: "/assets/video/1.mp4",
    text: "The real secret",
    tone: "yellow",
    title: "What nobody tells you about building a brand",
    ch: "Brand Room",
    views: "530K views · 5 days ago",
    dur: "1:04:12",
  },
  {
    src: posters[1],
    video: "/assets/video/5.mp4",
    text: "Ask me anything",
    tone: "red",
    title: "Q&A: money, burnout and hiring my first editor",
    ch: "Founder Diaries",
    views: "198K views · 6 days ago",
    dur: "58:47",
  },
] as {
  src: string;
  img?: string;
  video: string;
  text: string;
  sub?: string;
  tone: Tone;
  title: string;
  ch: string;
  views: string;
  dur: string;
}[];

type Tone = "yellow" | "white" | "red";

function LongFormWork() {
  const [hover, setHover] = React.useState<number | null>(null);
  return (
    <div className="mx-auto w-[90%] grid sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-8">
      {longForm.map((v, i) => (
        <div
          key={v.title}
          className="group"
          onMouseEnter={() => setHover(i)}
          onMouseLeave={() => setHover(null)}
        >
          <div className="relative aspect-video rounded-xl overflow-hidden bg-neutral-900 transition-transform duration-300 group-hover:scale-[1.02]">
            <DesignedThumb src={v.src} img={v.img} text={v.text} sub={v.sub} tone={v.tone} />
            {/* YouTube-style hover preview */}
            {hover === i && (
              <>
                <video
                  src={v.video}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 h-full w-full object-cover object-[50%_28%]"
                />
                <motion.span
                  className="absolute bottom-0 left-0 h-1 bg-[#ff0033]"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 8, ease: "linear" }}
                />
              </>
            )}
            <span className="absolute bottom-2 right-2 rounded bg-black/80 px-1 text-[10px] font-semibold text-white">
              {v.dur}
            </span>
          </div>
          <div className="mt-3 flex gap-3">
            <span className="h-9 w-9 shrink-0 rounded-full bg-gradient-to-br from-[#ff4d31] to-yellow-400" />
            <div>
              <p className="font-semibold leading-snug text-neutral-900 dark:text-white line-clamp-2">
                {v.title}
              </p>
              <p className="mt-1 text-sm text-neutral-500">{v.ch}</p>
              <p className="text-sm text-neutral-500">{v.views}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function ThumbnailWork() {
  return (
    <div className="mx-auto w-[90%]">
      <ThumbnailGrid />
    </div>
  );
}

// TODO: swap for real managed channels.
const channels: {
  name: string;
  /** Link to the real channel; makes the whole card clickable. */
  url?: string;
  handle: string;
  avatar: string;
  banner: string;
  subs: string;
  videos: string;
  uploads: { src: string; img?: string; text: string; tone: Tone }[];
}[] = [
  {
    name: "Founder Diaries",
    handle: "@founderdiaries",
    avatar: posters[1],
    banner: posters[4],
    subs: "48K",
    videos: "212",
    uploads: [
      { src: posters[1], text: "Nobody tells you", tone: "yellow" },
      { src: posters[4], text: "$0 → $10K", tone: "white" },
      { src: posters[1], text: "I almost quit", tone: "red" },
    ],
  },
  {
    name: "Move Daily",
    handle: "@movedaily",
    avatar: posters[3],
    banner: posters[2],
    subs: "96K",
    videos: "340",
    uploads: [
      {
        src: posters[3],
        img: "object-top scale-[1.35] origin-top",
        text: "Day 1 vs 100",
        tone: "yellow",
      },
      { src: posters[0], img: "object-[50%_75%]", text: "The 5AM myth", tone: "white" },
      { src: posters[2], text: "Don't skip this", tone: "red" },
    ],
  },
];

export function ChannelWork() {
  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {channels.map((c) => (
        <a
          key={c.name}
          href={c.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 bg-white/70 dark:bg-[#111113] transition-colors [&[href]]:hover:border-[#ff4d31]/50"
        >
          {/* Banner */}
          <div className="relative h-28 md:h-32 overflow-hidden">
            <img
              src={c.banner}
              alt=""
              className="h-full w-full object-cover scale-110 blur-[2px] brightness-75"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#ff4d31]/60 via-black/20 to-transparent" />
            <p className="absolute left-5 top-4 text-2xl md:text-3xl font-black uppercase tracking-tight text-white [text-shadow:0_2px_12px_rgba(0,0,0,.6)]">
              {c.name}
            </p>
          </div>

          <div className="px-5 pb-5">
            <div className="relative z-10 flex items-end gap-4 -mt-8">
              <img
                src={c.avatar}
                alt=""
                className="h-16 w-16 md:h-20 md:w-20 shrink-0 rounded-full object-cover object-top ring-4 ring-white dark:ring-[#111113]"
              />
              <div className="min-w-0 pb-1">
                <p className="flex items-center gap-1.5 font-bold text-neutral-900 dark:text-white">
                  {c.name}
                  <BadgeCheck className="h-4 w-4 text-neutral-500" />
                </p>
                <p className="text-xs text-neutral-500 truncate">
                  {c.handle} · {c.subs} subscribers · {c.videos} videos
                </p>
              </div>
              <span className="ml-auto mb-1 shrink-0 rounded-full bg-neutral-900 dark:bg-white px-4 py-2 text-xs font-semibold text-white dark:text-neutral-900">
                Subscribe
              </span>
            </div>

            <div className="mt-4 flex gap-5 border-b border-black/10 dark:border-white/10 text-sm">
              {["Home", "Videos", "Shorts", "Community"].map((tab) => (
                <span
                  key={tab}
                  className={cn(
                    "pb-2",
                    tab === "Videos"
                      ? "border-b-2 border-neutral-900 dark:border-white font-semibold text-neutral-900 dark:text-white"
                      : "text-neutral-500",
                  )}
                >
                  {tab}
                </span>
              ))}
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2.5">
              {c.uploads.map((u, i) => (
                <div
                  key={i}
                  className="relative aspect-video rounded-md overflow-hidden bg-neutral-900"
                >
                  <DesignedThumb src={u.src} img={u.img} text={u.text} tone={u.tone} />
                </div>
              ))}
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}

const panels: Record<string, React.ComponentType> = {
  "short-form": ShortFormWork,
  "long-form": LongFormWork,
  thumbnails: ThumbnailWork,
  "youtube-management": ChannelWork,
};

export function Portfolio() {
  const [active, setActive] = React.useState(serviceList[0].slug);
  const current = serviceList.find((s) => s.slug === active)!;
  const Panel = panels[active];

  return (
    <section
      id="portfolio"
      className="relative w-full overflow-hidden px-4 sm:px-6 md:px-8 py-12 md:py-20 bg-white dark:bg-black/50"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(60% 50% at 50% 0%, rgba(59,130,246,0.08), transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neutral-300/60 dark:via-white/10 to-transparent"
      />

      <div className="relative mx-auto max-w-7xl">
        <div className="flex flex-col items-center text-center mb-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-neutral-200/70 dark:border-white/10 bg-white/60 dark:bg-white/[0.04] backdrop-blur-md px-3 py-1 text-xs font-medium text-neutral-600 dark:text-neutral-300">
            <span className="h-1.5 w-1.5 rounded-full bg-[#ff4d31]" />
            Our Work
          </span>
          <h2 className="mt-5 text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-neutral-950 dark:text-white max-w-4xl">
            Our <span className="text-[#ff4d31] dark:text-[#ff4d31]">Edits</span>
          </h2>
          <p className="mt-8 max-w-2xl text-base md:text-lg text-neutral-600 dark:text-neutral-400">
            See our Shorts, long videos, thumbnails, and channels. Pick a category below.
          </p>

          <div
            role="tablist"
            aria-label="Portfolio category"
            className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-1.5 p-1.5 rounded-2xl bg-neutral-100 dark:bg-white/[0.03] border border-neutral-200 dark:border-white/10 w-full sm:w-auto"
          >
            {serviceList.map((s) => (
              <button
                key={s.slug}
                role="tab"
                aria-selected={active === s.slug}
                aria-controls="portfolio-panel"
                onClick={() => setActive(s.slug)}
                className={cn(
                  "relative flex items-center justify-center gap-2 px-4 md:px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors",
                  active === s.slug
                    ? "text-neutral-900 dark:text-white"
                    : "text-neutral-500 hover:text-neutral-900 dark:hover:text-white",
                )}
              >
                {active === s.slug && (
                  <motion.span
                    layoutId="portfolio-tab"
                    className="absolute inset-0 rounded-xl bg-white dark:bg-white/10 shadow-sm"
                  />
                )}
                <s.icon className={cn("relative h-4 w-4", active === s.slug && "text-[#ff4d31]")} />
                <span className="relative whitespace-nowrap">{s.tab}</span>
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            id="portfolio-panel"
            role="tabpanel"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
            className="min-h-[400px]"
          >
            <Panel />
          </motion.div>
        </AnimatePresence>

        <div className="mt-10 flex justify-center">
          <Link
            to="/services/$slug"
            params={{ slug: current.slug }}
            className="inline-flex items-center gap-2 rounded-full border border-neutral-300 dark:border-white/15 px-5 py-2.5 text-sm font-semibold text-neutral-900 dark:text-white hover:border-[#ff4d31] hover:text-[#ff4d31] transition-colors"
          >
            More on {current.name.toLowerCase()} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
