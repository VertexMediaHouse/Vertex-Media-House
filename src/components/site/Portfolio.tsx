import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import SpotlightCard from "./SpotlightCard";
import { SectionGlow } from "./SectionGlow";
import { serviceList } from "@/components/services/ServicePage";
import { ThumbnailGrid } from "@/components/services/ServiceVisuals";

const shortForm = [
  "/assets/video/shortform/1.mp4",
  "/assets/video/shortform/2.mp4",
  "/assets/video/shortform/3.mp4",
  "/assets/video/shortform/6.mp4",
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

// Real client edits. TODO: real channel names, view counts and run times — the rest is ours.
const longForm = [
  {
    src: "/assets/imgs/longform/podcast-1.webp",
    video: "/assets/video/longform/podcast-1.mp4",
    title: "Full podcast episode, multi-cam edit",
    ch: "Client name",
    views: "412K views · 2 weeks ago",
    dur: "42:10",
  },
  {
    src: "/assets/imgs/longform/podcast-2.webp",
    video: "/assets/video/longform/podcast-2.mp4",
    title: "Podcast interview, two-camera cut",
    ch: "Client name",
    views: "1.1M views · 1 month ago",
    dur: "27:33",
  },
  {
    src: "/assets/imgs/longform/interview-1.webp",
    video: "/assets/video/longform/interview-1.mp4",
    title: "Talking-head explainer with B-roll",
    ch: "Client name",
    views: "268K views · 3 weeks ago",
    dur: "18:04",
  },
  {
    src: "/assets/imgs/longform/interview-2.webp",
    video: "/assets/video/longform/interview-2.mp4",
    title: "On-location interview film",
    ch: "Client name",
    views: "684K views · 1 month ago",
    dur: "35:20",
  },
  {
    src: "/assets/imgs/longform/gaming-1.webp",
    video: "/assets/video/longform/gaming-1.mp4",
    title: "Gameplay highlights, commentary edit",
    ch: "Client name",
    views: "530K views · 5 days ago",
    dur: "1:04:12",
  },
  {
    src: "/assets/imgs/longform/gaming-2.webp",
    video: "/assets/video/longform/gaming-2.mp4",
    title: "Full gaming episode with overlays",
    ch: "Client name",
    views: "198K views · 6 days ago",
    dur: "58:47",
  },
];

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
            <img
              src={v.src}
              alt={v.title}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
            {/* YouTube-style hover preview */}
            {hover === i && (
              <>
                <video
                  src={v.video}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 h-full w-full object-cover"
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

// Real managed channels, straight from YouTube Studio.
const dashboards = [
  {
    src: "/assets/imgs/dashboards/retirehow.webp",
    name: "RetireHow",
    note: "14.5K views and 89.8 watch hours in 7 days — 99.3% new viewers.",
  },
  {
    src: "/assets/imgs/dashboards/wanderbloom.webp",
    name: "WanderBloom",
    note: "125.4K views, 7.8K watch hours and +1.2K subscribers in 28 days.",
  },
];

export function ChannelWork() {
  return (
    <div className="mx-auto w-[90%] grid lg:grid-cols-2 gap-6">
      {dashboards.map((d) => (
        <figure
          key={d.name}
          className="overflow-hidden rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-[#111113]"
        >
          <img
            src={d.src}
            alt={`${d.name} YouTube Studio dashboard`}
            loading="lazy"
            className="w-full border-b border-black/10 dark:border-white/10"
          />
          <figcaption className="px-5 py-4">
            <p className="font-bold text-neutral-900 dark:text-white">{d.name}</p>
            <p className="mt-1 text-sm text-neutral-500">{d.note}</p>
          </figcaption>
        </figure>
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
      <SectionGlow />

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
