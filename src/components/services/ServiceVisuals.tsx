import { useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useMotionValueEvent,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  Music2,
  Play,
  Captions,
  Settings,
  Youtube,
  Check,
  Trophy,
  Upload,
  MousePointer2,
  LayoutDashboard,
  SquarePlay,
  ChartColumn,
  MessageSquareText,
  CircleDollarSign,
  Search,
  Video,
  ArrowUp,
  ChevronDown,
  Lightbulb,
  Scissors,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { PlatformIcons } from "@/components/site/PlatformIcons";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

export const posters = [
  "https://framerusercontent.com/images/4kp2KImAJicjmXIczDErqcpt9FI.png?width=528&height=938",
  "https://framerusercontent.com/images/FHS0pgop7yjZHlGI56VGYUZULS0.png?width=720&height=1280",
  "https://framerusercontent.com/images/RJn1eKEVAnvuDEpP5MAM11elvU.png?width=260&height=462",
  "https://framerusercontent.com/images/JZOcw2Qtn21puWJbHgarML3XE.png?width=260&height=462",
  "https://framerusercontent.com/images/5jOtcgkwh7AOIWMWAQXhjcUGSuk.png?width=528&height=938",
];

/** Loops 0→100 over `ms`; shared clock for the fake players. */
function useLoop(ms: number) {
  const [p, setP] = useState(0);
  useEffect(() => {
    const start = performance.now();
    const id = setInterval(() => setP((((performance.now() - start) % ms) / ms) * 100), 80);
    return () => clearInterval(id);
  }, [ms]);
  return p;
}

/** Drifts to a new random spot within ±DRIFT px every few seconds. */
const DRIFT = 14;
function Chip({ className, children }: { className?: string; children: React.ReactNode }) {
  const [to, setTo] = useState({ x: 0, y: 0, d: 3 });
  useEffect(() => {
    let id: ReturnType<typeof setTimeout>;
    const move = () => {
      const d = 2 + Math.random() * 2;
      setTo({ x: (Math.random() * 2 - 1) * DRIFT, y: (Math.random() * 2 - 1) * DRIFT, d });
      id = setTimeout(move, d * 1000);
    };
    move();
    return () => clearTimeout(id);
  }, []);
  return (
    <motion.div
      animate={{ x: to.x, y: to.y }}
      transition={{ duration: to.d, ease: "easeInOut" }}
      className={cn(
        "absolute z-20 liquid-glass rounded-2xl border border-white/30 dark:border-white/10 p-3 shadow-xl",
        className,
      )}
    >
      {children}
    </motion.div>
  );
}

/* ---------- Short form: a fan of phones playing reels ---------- */
function Phone({
  video,
  className,
  children,
}: {
  video: string;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "relative aspect-[9/19] rounded-[2.2rem] [clip-path:inset(0_round_2.2rem)] border-[6px] border-neutral-900 dark:border-neutral-800 bg-black overflow-hidden shadow-2xl shadow-black/40",
        className,
      )}
    >
      <video
        src={video}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute top-1.5 left-1/2 -translate-x-1/2 h-4 w-16 rounded-full bg-black z-20" />
      {children}
    </div>
  );
}

export function ReelPhones() {
  return (
    <div className="relative h-[460px] sm:h-[574px] flex items-center justify-center">
      <Phone
        video="/assets/video/2.mp4"
        className="hidden sm:block absolute w-[190px] -translate-x-[165px] -rotate-[9deg] opacity-60"
      />
      <Phone
        video="/assets/video/3.mp4"
        className="hidden sm:block absolute w-[190px] translate-x-[165px] rotate-[9deg] opacity-60"
      />

      <Phone video="/assets/video/6.mp4" className="relative z-10 w-[205px] sm:w-[250px]">
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70 z-10" />
        <div className="absolute top-7 left-4 z-20 text-white text-sm font-bold">Reels</div>

        {/* Right action rail */}
        <div className="absolute right-2.5 bottom-20 z-20 flex flex-col items-center gap-3.5 text-white text-[10px] font-semibold">
          {[
            [Heart, "248K"],
            [MessageCircle, "3.1K"],
            [Send, "18K"],
            [Bookmark, "41K"],
          ].map(([Icon, n], i) => {
            const I = Icon as typeof Heart;
            return (
              <div key={i} className="flex flex-col items-center gap-0.5">
                <I className={cn("h-6 w-6", i === 0 && "fill-[#ff4d31] text-[#ff4d31]")} />
                <span>{n as string}</span>
              </div>
            );
          })}
        </div>

        {/* Handle + caption */}
        <div className="absolute left-3 right-12 bottom-4 z-20 text-white">
          <div className="flex items-center gap-2 text-xs font-bold">
            <span className="h-6 w-6 rounded-full bg-gradient-to-br from-[#ff4d31] to-yellow-400" />
            yourbrand
            <span className="rounded-md border border-white/60 px-1.5 py-0.5 text-[10px]">
              Follow
            </span>
          </div>
          <p className="mt-1.5 text-[11px] leading-snug text-white/90 line-clamp-2">
            The one edit that took us from 2K to 200K views 👇
          </p>
          <p className="mt-1 flex items-center gap-1 text-[10px] text-white/80">
            <Music2 className="h-3 w-3" /> Original audio · Vertex
          </p>
        </div>

        {/* Watch progress */}
        <div className="absolute bottom-0 inset-x-0 h-0.5 bg-white/20 z-20">
          <div className="h-full origin-left bg-white animate-[fill-x_9s_linear_infinite]" />
        </div>
      </Phone>

      {/* Anchored to the centre phone's edges so they never drift far from it. */}
      <Chip className="left-[calc(50%-210px)] top-[14%]">
        <PlatformIcons items={["shorts"]} className="[&_svg]:h-8 [&_svg]:w-8" />
      </Chip>
      <Chip className="left-[calc(50%+145px)] top-[38%]">
        <PlatformIcons items={["tiktok"]} className="[&_svg]:h-8 [&_svg]:w-8" />
      </Chip>
      <Chip className="left-[calc(50%-205px)] bottom-[16%]">
        <PlatformIcons items={["instagram"]} className="[&_svg]:h-8 [&_svg]:w-8" />
      </Chip>
    </div>
  );
}

/* ---------- Long form: YouTube player with chapters + retention graph ---------- */
const chapters = [
  { name: "Hook", w: 8 },
  { name: "Intro", w: 12 },
  { name: "The story", w: 32 },
  { name: "B-roll deep dive", w: 30 },
  { name: "Payoff & CTA", w: 18 },
];

export function LongFormPlayer() {
  const p = useLoop(16000);
  let acc = 0;
  const current = chapters.find((c) => (acc += c.w) > p) ?? chapters[chapters.length - 1];
  const secs = Math.floor((p / 100) * 2530);
  const time = `${Math.floor(secs / 60)}:${String(secs % 60).padStart(2, "0")}`;

  return (
    <div className="w-full max-w-[680px] mx-auto liquid-glass rounded-2xl border border-black/10 dark:border-white/10 p-3 shadow-2xl shadow-black/20 space-y-3">
      <div className="relative aspect-video rounded-xl overflow-hidden bg-black">
        <video
          src="/assets/video/7.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full object-cover object-[50%_28%]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
        <p className="absolute top-3 left-4 right-4 text-white text-sm md:text-base font-semibold truncate">
          How we built a 7-figure podcast — Full Episode
        </p>

        <div className="absolute inset-x-3 bottom-2 space-y-2">
          {/* Chapter-segmented progress bar */}
          <div className="flex gap-1">
            {chapters.map((c, i) => {
              const start = chapters.slice(0, i).reduce((s, x) => s + x.w, 0);
              const fill = Math.max(0, Math.min(100, ((p - start) / c.w) * 100));
              return (
                <div
                  key={c.name}
                  className="h-1 rounded-full bg-white/30 overflow-hidden"
                  style={{ width: `${c.w}%` }}
                >
                  <div className="h-full bg-[#ff0033]" style={{ width: `${fill}%` }} />
                </div>
              );
            })}
          </div>
          <div className="flex items-center justify-between text-white text-[11px] md:text-xs">
            <div className="flex items-center gap-3">
              <Play className="h-4 w-4 fill-white" />
              <span className="tabular-nums">{time} / 42:10</span>
              <span className="hidden sm:inline text-white/80">• {current.name}</span>
            </div>
            <div className="flex items-center gap-3">
              <Captions className="h-4 w-4" />
              <span className="rounded bg-[#ff0033] px-1 text-[9px] font-bold">4K</span>
              <Settings className="h-4 w-4" />
            </div>
          </div>
        </div>
      </div>

      {/* Retention */}
      <div className="rounded-xl bg-white/50 dark:bg-white/[0.03] border border-black/5 dark:border-white/5 p-3">
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="font-semibold text-neutral-800 dark:text-neutral-200">
            Audience retention
          </span>
          <div className="flex items-center gap-3 text-neutral-500">
            <span className="flex items-center gap-1">
              <span className="h-1.5 w-3 rounded bg-neutral-400" />
              Raw cut
            </span>
            <span className="flex items-center gap-1">
              <span className="h-1.5 w-3 rounded bg-[#ff4d31]" />
              Vertex edit
            </span>
          </div>
        </div>
        <svg viewBox="0 0 400 90" className="w-full h-20" preserveAspectRatio="none">
          <path
            d="M0,8 C30,40 70,58 130,66 S300,80 400,84"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="4 4"
            className="text-neutral-400"
          />
          <path
            d="M0,8 C25,16 60,20 110,22 S160,18 200,24 S300,28 400,34 L400,90 L0,90Z"
            fill="#ff4d31"
            opacity="0.12"
          />
          <path
            d="M0,8 C25,16 60,20 110,22 S160,18 200,24 S300,28 400,34"
            fill="none"
            stroke="#ff4d31"
            strokeWidth="2.5"
          />
          <line
            x1={p * 4}
            x2={p * 4}
            y1="0"
            y2="90"
            stroke="currentColor"
            strokeWidth="1"
            className="text-neutral-500"
          />
        </svg>
        <div className="flex justify-between text-[10px] text-neutral-500 mt-1">
          <span>0:00</span>
          <span className="font-semibold text-[#ff4d31]">68% still watching at 30:00</span>
          <span>42:10</span>
        </div>
      </div>
    </div>
  );
}

/* ---------- Long-form portfolio (real YouTube work) ---------- */
type LongFormVideo = {
  /** Any YouTube link: watch?v=, youtu.be/, /live/ or /embed/. Empty = placeholder card. */
  url: string;
  title: string;
  client: string;
  kind: string;
  duration: string;
  views?: string;
  /** The headline outcome, e.g. "+41% avg. view duration". */
  result?: string;
};

// TODO: placeholders — paste the real YouTube link into `url` and swap in real titles/numbers.
const longFormVideos: LongFormVideo[] = [
  {
    url: "",
    title: "Full podcast episode, multi-cam edit",
    client: "Client name",
    kind: "Podcast",
    duration: "58:47",
    views: "412K views",
    result: "+41% avg. view duration",
  },
  {
    url: "",
    title: "Documentary-style YouTube video",
    client: "Client name",
    kind: "YouTube",
    duration: "27:33",
    views: "1.1M views",
    result: "1.1M views",
  },
  {
    url: "",
    title: "Brand story film",
    client: "Client name",
    kind: "Brand film",
    duration: "4:12",
    result: "Launch film",
  },
  {
    url: "",
    title: "Talking-head explainer with B-roll",
    client: "Client name",
    kind: "YouTube",
    duration: "18:04",
    views: "268K views",
    result: "62% retention",
  },
  {
    url: "",
    title: "Interview episode",
    client: "Client name",
    kind: "Podcast",
    duration: "1:04:12",
    views: "530K views",
  },
  {
    url: "",
    title: "Channel trailer",
    client: "Client name",
    kind: "YouTube",
    duration: "2:45",
    result: "+2.4K subs in 30 days",
  },
];

const youtubeId = (url: string) =>
  url.match(/(?:v=|youtu\.be\/|embed\/|live\/|shorts\/)([\w-]{11})/)?.[1];

function PortfolioCard({
  v,
  i,
  featured,
  onPlay,
}: {
  v: LongFormVideo;
  i: number;
  featured: boolean;
  onPlay: () => void;
}) {
  const id = youtubeId(v.url);
  const [src, setSrc] = useState(id && `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`);

  const thumb = src ? (
    <img
      src={src}
      alt=""
      loading="lazy"
      // maxres doesn't exist for every video; YouTube then serves a 120px grey placeholder
      onLoad={(e) =>
        e.currentTarget.naturalWidth <= 120 && setSrc(`https://i.ytimg.com/vi/${id}/hqdefault.jpg`)
      }
      className="absolute inset-0 h-full w-full object-cover"
    />
  ) : (
    <img
      src={posters[i % posters.length]}
      alt=""
      className="absolute inset-0 h-full w-full object-cover object-[50%_25%]"
    />
  );

  return (
    <div className={cn("group relative", featured && "md:col-span-2 md:row-span-2")}>
      {/* Hover glow: a blurred copy of the thumbnail just behind the card edge */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-40 overflow-hidden"
      >
        <div className="relative h-full w-full">{thumb}</div>
      </div>

      <button
        type="button"
        onClick={onPlay}
        disabled={!id}
        aria-label={`Play ${v.title}`}
        className={cn(
          "relative block w-full aspect-video overflow-hidden rounded-xl bg-neutral-900 text-left",
          "border border-black/10 dark:border-white/10",
          "enabled:cursor-pointer disabled:cursor-default",
          featured && "md:aspect-auto md:h-full",
        )}
      >
        <div className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-[1.03]">
          {thumb}
        </div>
        <span className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/10" />

        <span className="absolute top-3 left-3 rounded bg-black/60 px-2 py-0.5 text-[11px] font-medium text-white">
          {v.kind}
        </span>
        {v.result && (
          <span className="absolute top-3 right-3 rounded bg-[#ff4d31] px-2 py-0.5 text-[11px] font-semibold text-white">
            {v.result}
          </span>
        )}

        {/* Play button: always on for the featured video, on hover for the rest */}
        {id && (
          <span
            className={cn(
              "absolute inset-0 m-auto flex items-center justify-center rounded-full bg-[#ff4d31] text-white transition-opacity duration-200",
              featured
                ? "h-14 w-14 md:h-16 md:w-16"
                : "h-11 w-11 opacity-0 group-hover:opacity-100",
            )}
          >
            <Play
              className={cn("translate-x-0.5", featured ? "h-6 w-6 md:h-7 md:w-7" : "h-5 w-5")}
              fill="currentColor"
            />
          </span>
        )}

        {/* Caption */}
        <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-3 md:p-4">
          <span className="min-w-0">
            <span
              className={cn(
                "block font-bold leading-tight text-white line-clamp-2",
                featured ? "text-lg md:text-2xl" : "text-sm",
              )}
            >
              {v.title}
            </span>
            <span className="mt-1 block text-xs md:text-sm text-white/70">
              {v.client}
              {v.views && ` · ${v.views}`}
            </span>
          </span>
          <span className="shrink-0 rounded bg-black/70 px-1.5 py-0.5 font-mono text-[11px] font-semibold text-white">
            {v.duration}
          </span>
        </span>
      </button>
    </div>
  );
}

export function LongFormPortfolio() {
  const [open, setOpen] = useState<LongFormVideo | null>(null);
  const openId = open && youtubeId(open.url);

  return (
    <SectionWrap
      eyebrow="Our work"
      title={
        <>
          Recent <span className="text-[#ff4d31]">long-form edits.</span>
        </>
      }
      subtitle="YouTube videos, podcasts and brand films we've edited for clients. Click any one to watch it here."
    >
      <div className="mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-4">
        {longFormVideos.map((v, i) => (
          <PortfolioCard key={i} v={v} i={i} featured={i === 0} onPlay={() => setOpen(v)} />
        ))}
      </div>

      <Dialog open={!!open} onOpenChange={(o) => !o && setOpen(null)}>
        <DialogContent className="max-w-5xl w-[calc(100%-2rem)] gap-0 p-0 overflow-hidden border-white/10 bg-neutral-950 text-white">
          <div className="px-5 py-4 pr-12">
            <DialogTitle className="text-base md:text-lg font-bold text-white line-clamp-1">
              {open?.title}
            </DialogTitle>
            <p className="text-sm text-white/60">
              {open?.client} · {open?.kind}
            </p>
          </div>
          {openId && (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${openId}?autoplay=1&rel=0`}
              title={open.title}
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
              className="aspect-video w-full"
            />
          )}
        </DialogContent>
      </Dialog>
    </SectionWrap>
  );
}

/* ---------- Thumbnails: the designed thumbnail ---------- */
export function DesignedThumb({
  src,
  text,
  sub,
  tone = "yellow",
  img = "object-top",
}: {
  src: string;
  text: string;
  sub?: string;
  tone?: "yellow" | "white" | "red";
  img?: string;
}) {
  const color = { yellow: "text-yellow-300", white: "text-white", red: "text-[#ff4d31]" }[tone];
  return (
    <div className="absolute inset-0 overflow-hidden @container">
      <img
        src={src}
        alt=""
        className={cn("absolute right-0 h-full w-3/5 object-cover saturate-150 contrast-125", img)}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/85 via-45% to-transparent" />
      <div className="absolute left-[6%] top-1/2 -translate-y-1/2 max-w-[55%] -rotate-2">
        <p
          className={cn(
            "font-black uppercase leading-[0.9] tracking-tight text-[clamp(0.9rem,9.5cqw,2.6rem)] [text-shadow:0_3px_0_#000,0_0_24px_rgba(0,0,0,.6)]",
            color,
          )}
        >
          {text}
        </p>
        {sub && (
          <span className="mt-2 inline-block rounded-md bg-[#ff4d31] px-2 py-0.5 text-[clamp(0.5rem,2.4cqw,0.85rem)] font-extrabold uppercase text-white">
            {sub}
          </span>
        )}
      </div>
      <svg
        viewBox="0 0 100 40"
        className="absolute left-[44%] top-[58%] w-[16%] text-[#ff4d31] drop-shadow-lg"
        fill="none"
      >
        <path
          d="M4 30 C30 34 60 26 86 10"
          stroke="currentColor"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <path
          d="M70 6 L90 8 L84 26"
          stroke="currentColor"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

/* ---------- Thumbnails: a YouTube home feed where one thumbnail wins the click ---------- */
const feedTiles = [
  { src: posters[0], title: "My honest morning routine", ch: "Slow Mornings", time: "14:20" },
  null, // ours
  {
    src: posters[2],
    title: "Testing cheap mics vs expensive mics",
    ch: "Gear Notes",
    time: "11:05",
  },
  { src: posters[3], title: "What I eat in a week", ch: "Fuel Daily", time: "9:47" },
  { src: posters[4], title: "Q&A: answering your questions", ch: "Ask Maya", time: "32:18" },
  { src: posters[1], title: "Podcast ep. 41 full episode", ch: "The Long Talk", time: "1:02:11" },
];

function FeedMeta({
  title,
  ch,
  ours,
  children,
}: {
  title: string;
  ch: string;
  ours?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <div className="mt-2 flex gap-2">
      <span
        className={cn(
          "mt-0.5 h-7 w-7 shrink-0 rounded-full",
          ours ? "bg-gradient-to-br from-[#ff4d31] to-yellow-400" : "bg-neutral-400/40",
        )}
      />
      <div className="min-w-0">
        <p className="truncate text-[13px] font-semibold leading-tight text-neutral-900 dark:text-white">
          {title}
        </p>
        <p className="truncate text-[11px] mt-0.5 text-neutral-500 dark:text-[#aaa]">
          {ch}
          {children}
        </p>
      </div>
    </div>
  );
}

export function ThumbnailClick() {
  const still = useReducedMotion();
  // One sequence on load: the feed dims, the cursor finds your thumbnail, it gets the click.
  const at = (delay: number, duration: number) => (still ? { duration: 0 } : { delay, duration });

  return (
    <div className="liquid-glass rounded-2xl border border-black/10 dark:border-white/10 bg-white/55 dark:bg-[#0f0f0f]/60 p-3 shadow-2xl shadow-black/20 text-left">
      <div className="flex h-11 items-center gap-3 px-1">
        <span className="flex items-center gap-1">
          <Youtube
            className="h-6 w-6 text-[#ff0033]"
            fill="#ff0033"
            stroke="white"
            strokeWidth={1.5}
          />
          <span className="text-[15px] font-semibold tracking-tight text-neutral-900 dark:text-white">
            YouTube
          </span>
        </span>
        <span className="hidden sm:flex mx-auto w-full max-w-[240px] items-center gap-2 rounded-full border border-black/10 dark:border-white/15 px-3 py-1.5 text-xs text-neutral-500 dark:text-[#aaa]">
          <Search className="h-3.5 w-3.5" /> Search
        </span>
      </div>
      <div className="flex gap-2 overflow-hidden px-1 py-2">
        {["All", "Podcasts", "Business", "Fitness", "Recently uploaded"].map((c, i) => (
          <span
            key={c}
            className={cn(
              "whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-medium",
              i === 0
                ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
                : "bg-black/5 text-neutral-700 dark:bg-white/10 dark:text-neutral-200",
            )}
          >
            {c}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-3 gap-y-6 px-1 pb-1">
        {feedTiles.map((f, i) =>
          f ? (
            <motion.div
              key={i}
              initial={{ opacity: 1, filter: "grayscale(0)" }}
              animate={{ opacity: 0.35, filter: "grayscale(1)" }}
              transition={at(0.6, 0.8)}
              className={cn(i > 3 && "hidden sm:block")}
            >
              <div className="relative aspect-video overflow-hidden rounded-lg bg-neutral-800">
                <img src={f.src} alt="" className="h-full w-full object-cover object-top" />
                <span className="absolute bottom-1 right-1 rounded bg-black/80 px-1 text-[9px] font-semibold text-white">
                  {f.time}
                </span>
              </div>
              <FeedMeta title={f.title} ch={f.ch} />
            </motion.div>
          ) : (
            <motion.div
              key="ours"
              animate={still ? undefined : { scale: [1, 0.95, 1.04] }}
              transition={at(1.9, 0.35)}
              className="relative z-10"
            >
              <motion.div
                initial={{ boxShadow: "0 0 0 0px #ff4d31" }}
                animate={{ boxShadow: "0 0 0 3px #ff4d31" }}
                transition={at(1.9, 0.2)}
                className="relative aspect-video overflow-hidden rounded-lg bg-neutral-900"
              >
                <DesignedThumb src={posters[1]} text="I quit my job for this" sub="30 days later" />
                <span className="absolute bottom-1 right-1 rounded bg-black/80 px-1 text-[9px] font-semibold text-white">
                  18:42
                </span>
              </motion.div>
              <FeedMeta title="I quit my job for this (30 days later)" ch="Your channel" ours>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={at(2.2, 0.3)}
                  className="block sm:inline sm:ml-1.5 font-bold text-[#ff4d31]"
                >
                  12.8% click-through
                </motion.span>
              </FeedMeta>
              {!still && (
                <motion.div
                  initial={{ x: 90, y: 190, opacity: 0 }}
                  animate={{ x: 0, y: 0, opacity: 1 }}
                  transition={{ delay: 0.7, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                  className="pointer-events-none absolute left-[55%] top-[40%] z-20"
                >
                  <MousePointer2 className="h-6 w-6 fill-white text-neutral-900 drop-shadow-lg" />
                </motion.div>
              )}
            </motion.div>
          ),
        )}
      </div>
    </div>
  );
}

const thumbDir = "/assets/imgs/THUMBNAILS/";
const thumbFeed = [
  {
    src: "dda9e50c-4955-41a9-852b-ecbe56c21a0b.png",
    title: "How I bought 5 properties at age 28",
    ch: "The Wealth Room Podcast",
    views: "1.2M views · 3 weeks ago",
  },
  {
    src: "0763f14c-0caf-4237-9759-f3def66dd9e9.png",
    title: "Is $100K enough to live here?",
    ch: "Cost of Living Check",
    views: "684K views · 1 month ago",
  },
  {
    src: "1aab68f0-c249-480a-8471-e95a747d362d.png",
    title: "The Hang Up",
    ch: "Short Film",
    views: "2.4M views · 2 months ago",
  },
  {
    src: "c588e606-ada5-4f82-8278-580fe169edfe.png",
    title: "What YouTube actually paid me this month",
    ch: "Creator Income",
    views: "912K views · 5 days ago",
  },
  {
    src: "Episode 2 (POC Video) (Thumbnail).png",
    title: "How long does your money last? | Episode 02",
    ch: "RetireHow & DollarFar",
    views: "430K views · 2 weeks ago",
  },
  {
    src: "Episode 4 (POC Video) (Thumbnail).png",
    title: "Where your money goes further | Episode 04",
    ch: "RetireHow & DollarFar",
    views: "3.1M views · 4 months ago",
  },
];

/** YouTube-feed grid of designed thumbnails (also used in the home portfolio). */
export function ThumbnailGrid() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-8">
      {thumbFeed.map((f, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: (i % 3) * 0.1 }}
          className="group"
        >
          <div className="relative aspect-video rounded-xl overflow-hidden bg-neutral-900 transition-transform duration-300 group-hover:scale-[1.02]">
            <img
              src={encodeURI(thumbDir + f.src)}
              alt={f.title}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <span className="absolute bottom-2 right-2 rounded bg-black/80 px-1 text-[10px] font-semibold text-white">
              {12 + i * 3}:0{i}
            </span>
          </div>
          <div className="mt-3 flex gap-3">
            <span className="h-9 w-9 shrink-0 rounded-full bg-gradient-to-br from-[#ff4d31] to-yellow-400" />
            <div>
              <p className="font-semibold leading-snug text-neutral-900 dark:text-white line-clamp-2">
                {f.title}
              </p>
              <p className="mt-1 text-sm text-neutral-500">{f.ch}</p>
              <p className="text-sm text-neutral-500">{f.views}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export function ThumbnailFeed() {
  return (
    <SectionWrap
      eyebrow="Built to be clicked"
      title={
        <>
          Designed for the <span className="text-[#ff4d31]">feed.</span>
        </>
      }
      subtitle="Your thumbnail competes with 20 others on the same screen. Readable at phone size, one clear idea, zero clutter."
    >
      <ThumbnailGrid />
    </SectionWrap>
  );
}

/* ---------- Channel management: YouTube Studio analytics, recreated ---------- */
// Daily views over 90 days on a 400×120 chart (y grows downward). Vertex starts at x=120.
const studioViews =
  "M0,104 L20,102 L40,105 L60,101 L80,103 L100,100 L120,102 L140,96 L160,92 L180,94 L200,84 L220,80 L240,72 L260,74 L280,60 L300,54 L320,48 L340,50 L360,34 L380,28 L400,18";
// Views per hour, last 48 hours.
const realtimeBars = Array.from({ length: 48 }, (_, i) =>
  Math.round(35 + 30 * Math.abs(Math.sin(i * 0.7)) + i * 0.6),
);
const studioNav = [
  LayoutDashboard,
  SquarePlay,
  ChartColumn,
  MessageSquareText,
  Captions,
  CircleDollarSign,
];

export function ChannelDashboard() {
  // The realtime subscriber count ticks up like the real thing.
  const [subs, setSubs] = useState(48213);
  useEffect(() => {
    const id = setInterval(() => setSubs((v) => v + 1 + Math.floor(Math.random() * 3)), 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="liquid-glass overflow-hidden rounded-xl border border-white/40 dark:border-white/10 bg-white/55 dark:bg-[#0f0f0f]/60 backdrop-blur-xl text-neutral-900 dark:text-[#f1f1f1] shadow-2xl shadow-black/20 dark:shadow-black/40 text-left">
      {/* Studio top bar */}
      <div className="flex items-center gap-3 border-b border-black/10 dark:border-white/10 px-3 md:px-4 h-12">
        <span className="flex items-center gap-1">
          <Youtube
            className="h-6 w-6 text-[#ff0033]"
            fill="#ff0033"
            stroke="white"
            strokeWidth={1.5}
          />
          <span className="text-[15px] font-semibold tracking-tight">Studio</span>
        </span>
        <span className="hidden sm:flex mx-auto w-full max-w-[260px] items-center gap-2 rounded-full border border-black/10 dark:border-white/15 px-3 py-1.5 text-xs text-neutral-500 dark:text-[#aaa]">
          <Search className="h-3.5 w-3.5" /> Search across your channel
        </span>
        <span className="ml-auto sm:ml-0 flex items-center gap-1.5 rounded-full border border-black/10 dark:border-white/20 px-3 py-1 text-xs font-medium">
          <Video className="h-3.5 w-3.5 text-[#ff0033]" /> Create
        </span>
        <img src={posters[1]} alt="" className="h-7 w-7 rounded-full object-cover object-top" />
      </div>

      <div className="flex">
        {/* Icon rail */}
        <nav className="hidden md:flex flex-col items-center gap-1 border-r border-black/10 dark:border-white/10 px-2 py-3">
          {studioNav.map((Icon, i) => (
            <span
              key={i}
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-lg",
                i === 2
                  ? "bg-black/5 dark:bg-white/10 text-[#ff0033]"
                  : "text-neutral-500 dark:text-[#aaa]",
              )}
            >
              <Icon className="h-[18px] w-[18px]" />
            </span>
          ))}
        </nav>

        {/* Analytics */}
        <div className="min-w-0 flex-1 p-3 md:p-4">
          <div className="flex items-center justify-between gap-2">
            <p className="text-base md:text-lg font-semibold">Channel analytics</p>
            <span className="flex items-center gap-1 rounded border border-black/10 dark:border-white/15 px-2 py-1 text-[10px] md:text-[11px] text-neutral-500 dark:text-[#aaa]">
              Last 90 days <ChevronDown className="h-3 w-3" />
            </span>
          </div>
          <div className="mt-2 flex gap-4 border-b border-black/10 dark:border-white/10 text-[11px] md:text-xs">
            {["Overview", "Content", "Audience", "Research"].map((t, i) => (
              <span
                key={t}
                className={cn(
                  "pb-2",
                  i === 0
                    ? "border-b-2 border-neutral-900 dark:border-white font-medium"
                    : "text-neutral-500 dark:text-[#aaa]",
                )}
              >
                {t}
              </span>
            ))}
          </div>

          <p className="mt-3 text-center text-sm md:text-base font-semibold">
            Your channel got 1,318,442 views in the last 90 days
          </p>

          <div className="mt-3 flex gap-3">
            {/* Metric tabs + chart */}
            <div className="min-w-0 flex-1 flex flex-col overflow-hidden rounded-lg border border-black/10 dark:border-white/10">
              <div className="grid grid-cols-3">
                {[
                  ["Views", "1.3M", "214%"],
                  ["Watch time (hours)", "92.4K", "168%"],
                  ["Subscribers", "+12.9K", "189%"],
                ].map(([k, v, d], i) => (
                  <div
                    key={k}
                    className={cn(
                      "border-black/10 dark:border-white/10 px-2 md:px-3 py-2",
                      i > 0 && "border-l",
                      i === 0
                        ? "bg-black/[0.03] dark:bg-white/[0.06] border-t-2 border-t-[#3ea6ff]"
                        : "border-b",
                    )}
                  >
                    <p className="truncate text-[10px] md:text-[11px] text-neutral-500 dark:text-[#aaa]">
                      {k}
                    </p>
                    <p className="flex items-center gap-1 text-base md:text-xl font-semibold tabular-nums">
                      {v}
                      <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#2ba640]">
                        <ArrowUp
                          className="h-2.5 w-2.5 text-white dark:text-[#0f0f0f]"
                          strokeWidth={3}
                        />
                      </span>
                    </p>
                    <p className="hidden md:block text-[10px] text-neutral-500 dark:text-[#aaa]">
                      {d} more than usual
                    </p>
                  </div>
                ))}
              </div>

              <div className="relative flex flex-1 flex-col px-2 md:px-3 pt-3 pb-1">
                <svg
                  viewBox="0 0 400 120"
                  preserveAspectRatio="none"
                  className="min-h-28 lg:min-h-52 w-full flex-1"
                >
                  {[20, 60, 100].map((y) => (
                    <line
                      key={y}
                      x1="0"
                      x2="400"
                      y1={y}
                      y2={y}
                      className="stroke-black/10 dark:stroke-white/10"
                    />
                  ))}
                  <line
                    x1="120"
                    x2="120"
                    y1="0"
                    y2="120"
                    className="stroke-black/30 dark:stroke-white/35"
                    strokeDasharray="3 3"
                  />
                  <path d={`${studioViews} L400,120 L0,120Z`} fill="#3ea6ff" fillOpacity="0.12" />
                  <path
                    d={studioViews}
                    fill="none"
                    stroke="#3ea6ff"
                    strokeWidth="2"
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>
                <span className="absolute left-[31%] top-2 rounded bg-black/5 dark:bg-[#272727] px-1.5 py-0.5 text-[9px] text-neutral-500 dark:text-[#aaa]">
                  Vertex starts
                </span>
                <div className="flex justify-between text-[9px] md:text-[10px] text-neutral-500 dark:text-[#aaa]">
                  <span>Jul 3</span>
                  <span>Jul 31</span>
                  <span>Aug 28</span>
                  <span>Sep 29</span>
                </div>
              </div>
            </div>

            {/* Realtime */}
            <div className="hidden lg:block w-44 shrink-0 rounded-lg border border-black/10 dark:border-white/10 p-3">
              <p className="text-sm font-semibold">Realtime</p>
              <p className="flex items-center gap-1.5 text-[10px] text-neutral-500 dark:text-[#aaa]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#3ea6ff] animate-pulse" /> Updating
                live
              </p>
              <p className="mt-2 text-xl font-semibold tabular-nums">
                {subs.toLocaleString("en-US")}
              </p>
              <p className="text-[10px] text-neutral-500 dark:text-[#aaa]">Subscribers</p>
              <div className="mt-3 border-t border-black/10 dark:border-white/10 pt-2">
                <p className="text-base font-semibold tabular-nums">31,942</p>
                <p className="text-[10px] text-neutral-500 dark:text-[#aaa]">
                  Views · Last 48 hours
                </p>
                <div className="mt-2 flex h-8 items-end gap-px">
                  {realtimeBars.map((h, i) => (
                    <span key={i} className="flex-1 bg-[#3ea6ff]" style={{ height: `${h}%` }} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Channel management: "How it works" as one video's journey from idea to live ---------- */
const journeySteps = [
  {
    name: "Ideas",
    icon: Lightbulb,
    text: "We pick topics from what your audience and competitors show works.",
  },
  {
    name: "You film",
    icon: Video,
    you: true,
    text: "One afternoon, from our outline. The only step that's yours.",
  },
  {
    name: "Edit & package",
    icon: Scissors,
    text: "Editing, thumbnail, title and SEO, done while you get on with your week.",
  },
  {
    name: "Live & report",
    icon: Upload,
    text: "Published at your peak hour, then tracked in your monthly report.",
  },
];
const ideaChecks = ["Search demand", "Competitor gap", "Fits your channel"];
const journeyTags = ["Title", "Tags", "Chapters", "End screen"];

function CountUp({ to }: { to: number }) {
  const still = useReducedMotion();
  const [v, setV] = useState(still ? to : 0);
  useEffect(() => {
    if (still) return;
    const c = animate(0, to, {
      duration: 1.6,
      ease: "easeOut",
      onUpdate: (x) => setV(Math.round(x)),
    });
    return () => c.stop();
  }, [to, still]);
  return <>{v.toLocaleString("en-US")}</>;
}

/** The card's picture area: what the video looks like at each step. */
function JourneyMedia({ stage }: { stage: number }) {
  if (stage === 0)
    return (
      <div className="absolute inset-0 flex flex-col justify-center gap-2.5 bg-yellow-100 px-5">
        {ideaChecks.map((c, i) => (
          <motion.p
            key={c}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + i * 0.3 }}
            className="flex items-center gap-2 text-xs font-semibold text-neutral-800"
          >
            <span className="flex h-4 w-4 items-center justify-center rounded bg-emerald-500 text-white">
              <Check className="h-3 w-3" strokeWidth={3} />
            </span>
            {c}
          </motion.p>
        ))}
      </div>
    );
  if (stage === 1)
    return (
      <>
        <video
          src="/assets/video/7.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full object-cover object-[50%_28%]"
        />
        <span className="absolute top-2 left-2 flex items-center gap-1.5 rounded bg-black/60 px-1.5 py-0.5 text-[10px] font-bold text-white">
          <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" /> REC
        </span>
      </>
    );
  return (
    <>
      <motion.div
        initial={stage === 2 ? { opacity: 0, scale: 1.1 } : false}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="absolute inset-0"
      >
        <DesignedThumb src={posters[4]} text="$0 → $10K" sub="in 90 days" tone="white" />
      </motion.div>
      {stage === 2 && (
        <div className="absolute inset-x-0 bottom-0 h-1 bg-white/20">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.6 }}
            className="h-full bg-[#ff4d31]"
          />
        </div>
      )}
      {stage === 3 && (
        <span className="absolute top-2 left-2 rounded bg-[#ff0033] px-1.5 py-0.5 text-[10px] font-bold text-white">
          LIVE
        </span>
      )}
    </>
  );
}

function JourneyCard({ stage }: { stage: number }) {
  const still = useReducedMotion();
  const you = journeySteps[stage].you;
  return (
    <motion.div
      layoutId="journey-card"
      layout="position"
      transition={still ? { duration: 0 } : { type: "spring", stiffness: 160, damping: 22 }}
      className="relative rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-neutral-900 shadow-xl shadow-black/20"
    >
      <div className="relative aspect-video overflow-hidden rounded-t-xl bg-neutral-900">
        <JourneyMedia stage={stage} />
      </div>
      <div className="p-3">
        <p className="text-sm font-semibold leading-snug text-neutral-900 dark:text-white">
          How I made my first $10K online
        </p>
        {stage === 0 && (
          <p className="mt-1 text-xs text-neutral-500">Picked from this month's research</p>
        )}
        {stage === 1 && (
          <p className="mt-1 text-xs text-sky-500">Outline in hand, filmed in one take</p>
        )}
        {stage === 2 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {journeyTags.map((t, i) => (
              <motion.span
                key={t}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + i * 0.2 }}
                className="flex items-center gap-1 rounded-full bg-[#ff4d31]/10 px-2 py-0.5 text-[10px] font-semibold text-[#ff4d31]"
              >
                <Check className="h-2.5 w-2.5" strokeWidth={3} /> {t}
              </motion.span>
            ))}
          </div>
        )}
        {stage === 3 && (
          <div className="mt-1 flex items-end justify-between gap-3">
            <p className="text-xs">
              <span className="font-semibold tabular-nums text-emerald-600 dark:text-emerald-400">
                <CountUp to={48210} /> views
              </span>
              <span className="block text-neutral-500">in the first week</span>
            </p>
            <svg viewBox="0 0 80 28" className="h-7 w-20" fill="none">
              <motion.path
                d="M2,26 C14,25 22,22 32,18 S52,8 78,3"
                stroke="#10b981"
                strokeWidth="2.5"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.4, delay: 0.3 }}
              />
            </svg>
          </div>
        )}
      </div>

      {/* Whoever is working on it right now */}
      <motion.div
        animate={still ? undefined : { x: [0, 8, 0], y: [0, 5, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute top-full -mt-1 right-8 z-10"
      >
        <MousePointer2
          className={cn(
            "h-5 w-5 -rotate-3",
            you ? "fill-sky-500 text-sky-500" : "fill-[#ff4d31] text-[#ff4d31]",
          )}
        />
        <span
          className={cn(
            "ml-4 inline-block rounded-md rounded-tl-none px-2 py-0.5 text-[10px] font-semibold text-white whitespace-nowrap",
            you ? "bg-sky-500" : "bg-[#ff4d31]",
          )}
        >
          {you ? "You" : "Vertex team"}
        </span>
      </motion.div>
    </motion.div>
  );
}

export function ChannelProcess() {
  const n = journeySteps.length;
  const { track, stage, pick, progress } = useScrollStages(n);

  return (
    <SectionWrap
      eyebrow="How it works"
      title={
        <>
          One video, <span className="text-[#ff4d31]">idea to live.</span>
        </>
      }
      subtitle="Follow one video through a normal month. You only handle one step."
    >
      {/* Slower than the other pages so each step's animation has time to play. */}
      <div ref={track} style={{ height: `${n * STEP_VH * 1.75}vh` }}>
        <div
          className="sticky rounded-2xl border border-black/10 dark:border-white/10 bg-white/60 dark:bg-[#111113] shadow-2xl shadow-black/20 overflow-hidden"
          style={{ top: PIN_TOP }}
        >
          {/* Stations: fixed min width, scrolls sideways on phones */}
          <div className="overflow-x-auto">
            <div
              className="grid min-w-[880px] min-h-[360px] grid-cols-4 gap-6 px-6 pt-6 pb-12"
              style={{
                backgroundImage:
                  "radial-gradient(circle, rgba(128,128,128,.2) 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            >
              {journeySteps.map((st, i) => (
                <div key={st.name}>
                  <p
                    className={cn(
                      "mb-3 flex items-center gap-2 text-sm font-bold transition-colors",
                      i === stage ? "text-neutral-950 dark:text-white" : "text-neutral-400",
                    )}
                  >
                    <st.icon className={cn("h-4 w-4", i <= stage && "text-[#ff4d31]")} />
                    {st.name}
                    {st.you && (
                      <span className="rounded-full bg-sky-500/15 px-2 py-0.5 text-[10px] font-semibold text-sky-600 dark:text-sky-400">
                        You
                      </span>
                    )}
                  </p>
                  {i === stage ? (
                    <JourneyCard stage={stage} />
                  ) : (
                    <div
                      className={cn(
                        "flex aspect-video items-center justify-center rounded-xl border-2 border-dashed transition-colors",
                        i < stage
                          ? "border-[#ff4d31]/30 text-[#ff4d31]"
                          : "border-black/10 dark:border-white/10",
                      )}
                    >
                      {i < stage && <Check className="h-6 w-6" strokeWidth={2.5} />}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-2 md:grid-cols-4 border-t border-black/5 dark:border-white/5">
            {journeySteps.map((st, i) => (
              <button
                key={st.name}
                onClick={() => pick(i)}
                aria-current={i === stage ? "step" : undefined}
                className={cn(
                  "relative text-left px-4 md:px-6 py-4 md:py-5 transition-colors border-black/5 dark:border-white/5",
                  i % 2 === 1 && "border-l",
                  i > 1 && "border-t md:border-t-0",
                  i === 2 && "md:border-l",
                  i === stage && "bg-[#ff4d31]/[0.06]",
                )}
              >
                <span
                  className={cn("text-xs", i === stage ? "text-[#ff4d31]" : "text-neutral-400")}
                >
                  Week {i + 1}
                </span>
                <span
                  className={cn(
                    "block mt-1 font-bold",
                    i === stage ? "text-neutral-950 dark:text-white" : "text-neutral-500",
                  )}
                >
                  {st.name}
                </span>
                <span className="hidden md:block mt-1 text-sm text-neutral-600 dark:text-neutral-400 leading-snug">
                  {st.text}
                </span>
                <span className="absolute inset-x-0 top-0 h-0.5">
                  <StepBar progress={progress} i={i} n={n} />
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </SectionWrap>
  );
}

// Where a pinned "How it works" card sits below the fixed navbar.
const PIN_TOP = 112;
// Page scroll per step, in viewport heights. Lower = less scrolling to get through.
const STEP_VH = 40;

/**
 * Scroll-driven steps: put `track` on a tall wrapper and make the card inside it
 * sticky at PIN_TOP. Scrolling through the wrapper advances `stage`.
 */
function useScrollStages(count: number) {
  const track = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: track,
    offset: [`start ${PIN_TOP}px`, "end end"],
  });
  const [stage, setStage] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) =>
    setStage(Math.min(count - 1, Math.floor(v * count))),
  );
  // Scroll the page to the middle of step i.
  const pick = (i: number) => {
    const el = track.current;
    if (!el) return;
    const start = el.getBoundingClientRect().top + window.scrollY - PIN_TOP;
    const end = start + el.offsetHeight - (window.innerHeight - PIN_TOP);
    window.scrollTo({ top: start + ((i + 0.5) / count) * (end - start) });
  };
  return { track, stage, pick, progress: scrollYProgress };
}

/** Fills as the page scrolls through step `i`. */
function StepBar({ progress, i, n }: { progress: MotionValue<number>; i: number; n: number }) {
  const scaleX = useTransform(progress, [i / n, (i + 1) / n], [0, 1]);
  return <motion.span style={{ scaleX }} className="block h-full bg-[#ff4d31] origin-left" />;
}

/* ---------- Short + long form: "How it works" as our real workflow on one canvas ---------- */
type Format = "short" | "long";

const flowSteps = [
  {
    name: "Share footage",
    who: "You",
    text: "Drop your raw clips in Google Drive or Dropbox and share the folder.",
  },
  {
    name: "We edit",
    who: "Us",
    text: "Hook, captions, sound and motion. First cut in 24–48h.",
    long: "Story, pacing, B-roll, graphics and sound. First cut in 3 days.",
  },
  {
    name: "Review on Frame.io",
    who: "You",
    text: "We send a Frame.io link. Click the exact frame and leave a note.",
  },
  {
    name: "Approve & upload",
    who: "Us + You",
    text: "We fix every note in v2. You approve, download and post.",
  },
];
const flowTitles = [
  "drive.google.com · Client footage",
  "Premiere Pro · Edit v1",
  "frame.io · Review v1",
  "frame.io · v2 approved",
];
// Cursor stops on the fixed-width canvas, one per step.
const flowCursor = [
  { x: 190, y: 215, you: true },
  { x: 470, y: 300, you: false },
  { x: 800, y: 250, you: true },
  { x: 1060, y: 130, you: true },
];
const flowFiles: Record<Format, [string, string][]> = {
  short: [
    ["IMG_2041.MOV", "1.2 GB"],
    ["IMG_2042.MOV", "860 MB"],
    ["voiceover.m4a", "14 MB"],
  ],
  long: [
    ["CAM_A_4K.mov", "38.2 GB"],
    ["CAM_B_4K.mov", "36.9 GB"],
    ["Guest_Mic.wav", "1.1 GB"],
  ],
};
const flowNotes: Record<Format, { at: number; time: string; text: string; fix: string }[]> = {
  short: [
    { at: 8, time: "0:01", text: "Hook needs more punch", fix: "Faster cut + zoom" },
    { at: 45, time: "0:09", text: "Caption covers my face", fix: "Moved up" },
    { at: 80, time: "0:17", text: "Love this transition!", fix: "Kept" },
  ],
  long: [
    { at: 12, time: "04:12", text: "Can we cut this pause?", fix: "Cut and tightened" },
    { at: 38, time: "15:40", text: "Show the revenue chart here", fix: "Chart added" },
    { at: 71, time: "29:03", text: "Love this bit, keep it!", fix: "Used as cold open" },
  ],
};

// Google Drive and Dropbox marks.
function DriveLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 87.3 78" className={className} aria-label="Google Drive" role="img">
      <path
        d="m6.6 66.85 3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8h-27.5c0 1.55.4 3.1 1.2 4.5z"
        fill="#0066da"
      />
      <path
        d="m43.65 25-13.75-23.8c-1.35.8-2.5 1.9-3.3 3.3l-25.4 44a9.06 9.06 0 0 0 -1.2 4.5h27.5z"
        fill="#00ac47"
      />
      <path
        d="m73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5h-27.502l5.852 11.5z"
        fill="#ea4335"
      />
      <path
        d="m43.65 25 13.75-23.8c-1.35-.8-2.9-1.2-4.5-1.2h-18.5c-1.6 0-3.15.45-4.5 1.2z"
        fill="#00832d"
      />
      <path
        d="m59.8 53h-32.3l-13.75 23.8c1.35.8 2.9 1.2 4.5 1.2h50.8c1.6 0 3.15-.45 4.5-1.2z"
        fill="#2684fc"
      />
      <path
        d="m73.4 26.5-12.7-22c-.8-1.4-1.95-2.5-3.3-3.3l-13.75 23.8 16.15 28h27.45c0-1.55-.4-3.1-1.2-4.5z"
        fill="#ffba00"
      />
    </svg>
  );
}
function DropboxLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-label="Dropbox" role="img">
      <path
        fill="#0061fe"
        d="M6 1.807 0 5.629l6 3.822 6.001-3.822L6 1.807zm12 0-6 3.822 6 3.822 6-3.822-6-3.822zM0 13.274l6 3.822 6.001-3.822L6 9.452l-6 3.822zm18-3.822-6 3.822 6 3.822 6-3.822-6-3.822zM6 18.371l6.001 3.822 6-3.822-6-3.822L6 18.371z"
      />
    </svg>
  );
}

/** The client's real video, vertical for short form and 16:9 for long form. */
function FlowPlayer({ format, children }: { format: Format; children?: React.ReactNode }) {
  const short = format === "short";
  return (
    <div
      className={cn(
        "relative shrink-0 overflow-hidden rounded bg-black",
        short ? "aspect-[9/16] w-[92px]" : "aspect-video w-full",
      )}
    >
      <video
        src={short ? "/assets/video/6.mp4" : "/assets/video/7.mp4"}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className={cn("absolute inset-0 h-full w-full object-cover", !short && "object-[50%_28%]")}
      />
      {children}
    </div>
  );
}

function WorkflowProcess({ format }: { format: Format }) {
  const short = format === "short";
  const n = flowSteps.length;
  const { track, stage, pick, progress } = useScrollStages(n);
  const card = useRef<HTMLDivElement>(null);
  const seen = useInView(card, { once: true, amount: 0.4 });
  const scroller = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = scroller.current;
    if (el && el.scrollWidth > el.clientWidth)
      el.scrollTo({ left: flowCursor[stage].x - el.clientWidth / 2, behavior: "smooth" });
  }, [stage]);
  const files = flowFiles[format];
  const notes = flowNotes[format];
  const edited = stage >= 1;
  const reviewed = stage >= 2;
  const approved = stage >= 3;
  const cursor = flowCursor[stage];

  return (
    <SectionWrap
      eyebrow="How it works"
      title={
        short ? (
          <>
            Four steps. <span className="text-[#ff4d31]">Zero chasing.</span>
          </>
        ) : (
          <>
            Five days. <span className="text-[#ff4d31]">Zero email threads.</span>
          </>
        )
      }
      subtitle={`The exact workflow we run on every ${short ? "reel" : "episode"}: Drive in, Frame.io review, approved file out.`}
    >
      <div ref={track} style={{ height: `${n * STEP_VH * 1.25}vh` }}>
        <div
          ref={card}
          className="sticky rounded-2xl border border-black/10 dark:border-white/10 bg-white/60 dark:bg-[#111113] shadow-2xl shadow-black/20 overflow-hidden"
          style={{ top: PIN_TOP }}
        >
          <div className="flex items-center gap-3 px-4 py-3 border-b border-black/5 dark:border-white/5">
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
            </div>
            <span className="font-mono text-xs text-neutral-500">{flowTitles[stage]}</span>
          </div>

          {/* Canvas: fixed width, scrolls sideways on phones */}
          <div ref={scroller} className="overflow-x-auto">
            <div
              className={cn("relative w-[1120px] mx-auto", short ? "h-[330px]" : "h-[410px]")}
              style={{
                backgroundImage:
                  "radial-gradient(circle, rgba(128,128,128,.25) 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            >
              {/* Connectors */}
              <svg
                className="absolute inset-0 h-full w-full pointer-events-none text-neutral-400/50"
                fill="none"
              >
                {(
                  [
                    ["M244 150 H284", 1],
                    ["M584 150 H624", 2],
                    ["M894 150 H934", 3],
                  ] as const
                ).map(([d, min]) => (
                  <path
                    key={d}
                    d={d}
                    stroke={stage >= min ? "#ff4d31" : "currentColor"}
                    strokeWidth="2"
                    strokeDasharray="5 5"
                    className="transition-colors duration-500"
                  />
                ))}
              </svg>

              {/* 1. Client shares footage */}
              <CanvasFrame
                label="Google Drive or Dropbox"
                x={24}
                y={80}
                w={220}
                show
                active={stage === 0}
              >
                <div className="bg-white dark:bg-neutral-900 p-3">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-neutral-800 dark:text-neutral-100">
                    <DriveLogo className="h-3.5 w-3.5" />
                    <DropboxLogo className="h-3.5 w-3.5" />
                    <span className="ml-1">Client footage</span>
                    <span className="ml-auto flex -space-x-1.5">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-sky-500 text-[9px] font-bold text-white ring-2 ring-white dark:ring-neutral-900">
                        Y
                      </span>
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#ff4d31] text-[9px] font-bold text-white ring-2 ring-white dark:ring-neutral-900">
                        V
                      </span>
                    </span>
                  </div>
                  <div className="mt-3 space-y-2.5">
                    {files.map(([f, size], i) => (
                      <div key={f}>
                        <div className="flex justify-between font-mono text-[10px] text-neutral-600 dark:text-neutral-400">
                          <span className="flex items-center gap-1">
                            <Video className="h-3 w-3" />
                            {f}
                          </span>
                          <span>{size}</span>
                        </div>
                        <div className="mt-1 h-1 rounded-full bg-black/5 dark:bg-white/10 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: seen ? "100%" : 0 }}
                            transition={{ duration: 1 + i * 0.4, ease: "easeOut" }}
                            className="h-full rounded-full bg-emerald-500"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: seen ? 1 : 0 }}
                    transition={{ delay: 2 }}
                    className="mt-3 flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400"
                  >
                    <Check className="h-3.5 w-3.5" /> Shared with Vertex
                  </motion.p>
                </div>
              </CanvasFrame>

              {/* 2. We edit */}
              <CanvasFrame
                label="Edit · v1"
                x={284}
                y={40}
                w={300}
                show={edited}
                active={stage === 1}
              >
                <div className={cn("flex gap-2.5 bg-neutral-950 p-2.5", !short && "flex-col")}>
                  <FlowPlayer format={format}>
                    <span className="absolute top-1 left-1 rounded bg-black/60 px-1 font-mono text-[9px] text-white">
                      v1
                    </span>
                  </FlowPlayer>
                  <div
                    className={cn("flex flex-1 gap-1.5", short ? "self-center" : "self-stretch")}
                  >
                    <div className="space-y-1.5 font-mono text-[8px] leading-3 text-white/40">
                      {["V1", "CC", "SFX", "MUS"].map((t) => (
                        <p key={t} className="h-3">
                          {t}
                        </p>
                      ))}
                    </div>
                    <div className="relative flex-1 space-y-1.5">
                      <div className="flex h-3 gap-0.5">
                        {[18, 26, 14, 22, 18].map((w, i) => (
                          <motion.span
                            key={i}
                            initial={false}
                            animate={{ scaleX: edited ? 1 : 0 }}
                            transition={{ delay: edited ? i * 0.12 : 0 }}
                            style={{ width: `${w}%` }}
                            className="h-full origin-left rounded-sm bg-[#ff4d31]/85"
                          />
                        ))}
                      </div>
                      <div className="flex h-3 items-center gap-1">
                        {Array.from({ length: 8 }).map((_, i) => (
                          <motion.span
                            key={i}
                            initial={false}
                            animate={{ opacity: edited ? 1 : 0 }}
                            transition={{ delay: edited ? 0.6 + i * 0.06 : 0 }}
                            className="h-2 flex-1 rounded-sm bg-yellow-300/80"
                          />
                        ))}
                      </div>
                      <div className="relative h-3">
                        {[10, 34, 52, 78].map((l, i) => (
                          <motion.span
                            key={l}
                            initial={false}
                            animate={{ scale: edited ? 1 : 0 }}
                            transition={{ delay: edited ? 1 + i * 0.1 : 0 }}
                            style={{ left: `${l}%` }}
                            className="absolute top-0.5 h-2 w-2 rotate-45 bg-sky-400"
                          />
                        ))}
                      </div>
                      <motion.div
                        initial={false}
                        animate={{ scaleX: edited ? 1 : 0 }}
                        transition={{ delay: edited ? 1.2 : 0, duration: 0.6 }}
                        className="h-3 origin-left rounded-sm bg-emerald-500/50"
                      />
                      {edited && (
                        <span
                          className={cn(
                            "absolute -inset-y-1 inset-x-0",
                            short
                              ? "animate-[sweep-x_6s_linear_infinite]"
                              : "animate-[sweep-x_12s_linear_infinite]",
                          )}
                        >
                          <span className="absolute inset-y-0 left-0 w-px bg-white" />
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </CanvasFrame>

              {/* 3. Frame.io review */}
              <CanvasFrame
                label={`Frame.io · ${approved ? "v2" : "v1"}`}
                x={624}
                y={40}
                w={270}
                show={reviewed}
                active={stage === 2}
              >
                <div className="bg-[#1b1b24] p-2.5 text-white">
                  <p className="mb-2 flex items-center justify-between text-[11px]">
                    <span className="font-bold tracking-tight">
                      frame<span className="text-[#7c6cff]">.io</span>
                    </span>
                    <span className="rounded bg-white/10 px-1.5 font-mono text-[9px]">
                      {approved ? "v2 · all resolved" : "v1 · 3 comments"}
                    </span>
                  </p>
                  <div className={cn("flex gap-2.5", !short && "flex-col")}>
                    <FlowPlayer format={format}>
                      <div className="absolute inset-x-1.5 bottom-1.5 h-1 rounded-full bg-white/25">
                        {reviewed &&
                          notes.map((note, i) => (
                            <motion.span
                              key={note.at}
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: 0.3 + i * 0.35, type: "spring" }}
                              style={{ left: `${note.at}%` }}
                              className={cn(
                                "absolute top-1/2 -mt-1.5 -ml-1.5 h-3 w-3 rounded-full border-2 border-black transition-colors",
                                approved ? "bg-emerald-500" : "bg-yellow-400",
                              )}
                            />
                          ))}
                      </div>
                    </FlowPlayer>
                    <div className="flex-1 space-y-1.5">
                      {notes.map((note, i) => (
                        <motion.div
                          key={note.at}
                          initial={false}
                          animate={{ opacity: reviewed ? 1 : 0, y: reviewed ? 0 : 6 }}
                          transition={{ delay: reviewed ? 0.3 + i * 0.35 : 0 }}
                          className="flex gap-1.5 rounded bg-white/5 p-1.5 text-[10px] leading-snug"
                        >
                          <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-sky-500 text-[8px] font-bold">
                            Y
                          </span>
                          <div className="min-w-0">
                            <p>
                              <span className="mr-1 font-mono text-yellow-400">{note.time}</span>
                              <span className={cn(approved && "line-through text-white/40")}>
                                {note.text}
                              </span>
                            </p>
                            {approved && (
                              <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 + i * 0.2 }}
                                className="mt-0.5 flex items-center gap-1 text-emerald-400"
                              >
                                <Check className="h-2.5 w-2.5" /> {note.fix}
                              </motion.p>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </CanvasFrame>

              {/* 4. Approve & upload */}
              <CanvasFrame
                label="Approve & upload"
                x={934}
                y={90}
                w={166}
                show={approved}
                active={approved}
              >
                <div className="bg-white dark:bg-neutral-900 p-3 space-y-3">
                  <p
                    className={cn(
                      "flex items-center justify-center gap-1.5 rounded-md py-1.5 text-xs font-bold text-white transition-colors duration-500",
                      approved ? "bg-emerald-500 delay-500" : "bg-[#7c6cff]",
                    )}
                  >
                    {approved && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
                    {approved ? "Approved" : "Approve v2"}
                  </p>
                  <div>
                    <p className="flex justify-between font-mono text-[10px] text-neutral-500">
                      <span>final_v2.mp4</span>
                      <span>{short ? "1080×1920" : "4K"}</span>
                    </p>
                    <div className="mt-1 h-1 rounded-full bg-black/5 dark:bg-white/10 overflow-hidden">
                      <motion.div
                        initial={false}
                        animate={{ width: approved ? "100%" : 0 }}
                        transition={{ delay: approved ? 0.8 : 0, duration: 1 }}
                        className="h-full rounded-full bg-emerald-500"
                      />
                    </div>
                  </div>
                  <motion.div
                    initial={false}
                    animate={{ opacity: approved ? 1 : 0 }}
                    transition={{ delay: approved ? 1.9 : 0 }}
                    className="flex items-center justify-between rounded-md bg-black/5 dark:bg-white/5 px-2 py-1.5"
                  >
                    <span className="flex items-center gap-1 text-[11px] font-semibold text-neutral-800 dark:text-neutral-200">
                      <Check className="h-3.5 w-3.5 text-emerald-500" /> Posted
                    </span>
                    {short ? (
                      <PlatformIcons
                        items={["instagram", "shorts", "tiktok"]}
                        className="gap-1.5"
                      />
                    ) : (
                      <Youtube className="h-4 w-4 text-[#ff0033]" />
                    )}
                  </motion.div>
                </div>
              </CanvasFrame>

              {/* Whoever is working right now */}
              <motion.div
                className="absolute z-10 pointer-events-none"
                animate={{ x: cursor.x, y: cursor.y }}
                transition={{ type: "spring", stiffness: 90, damping: 16 }}
                style={{ left: 0, top: 0 }}
              >
                <MousePointer2
                  className={cn(
                    "h-5 w-5 -rotate-3",
                    cursor.you ? "fill-sky-500 text-sky-500" : "fill-[#ff4d31] text-[#ff4d31]",
                  )}
                />
                <span
                  className={cn(
                    "ml-4 inline-block rounded-md rounded-tl-none px-2 py-0.5 text-[10px] font-semibold text-white whitespace-nowrap",
                    cursor.you ? "bg-sky-500" : "bg-[#ff4d31]",
                  )}
                >
                  {cursor.you ? "You" : "Vertex editor"}
                </span>
              </motion.div>
            </div>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-2 md:grid-cols-4 border-t border-black/5 dark:border-white/5">
            {flowSteps.map((st, i) => (
              <button
                key={st.name}
                onClick={() => pick(i)}
                aria-current={i === stage ? "step" : undefined}
                className={cn(
                  "relative text-left px-4 md:px-6 py-4 md:py-5 transition-colors border-black/5 dark:border-white/5",
                  i % 2 === 1 && "border-l",
                  i > 1 && "border-t md:border-t-0",
                  i === 2 && "md:border-l",
                  i === stage && "bg-[#ff4d31]/[0.06]",
                )}
              >
                <span className="flex items-center gap-2">
                  <span
                    className={cn(
                      "font-mono text-xs",
                      i === stage ? "text-[#ff4d31]" : "text-neutral-400",
                    )}
                  >
                    0{i + 1}
                  </span>
                  <span
                    className={cn(
                      "rounded-full px-1.5 text-[10px] font-semibold",
                      st.who === "Us"
                        ? "bg-[#ff4d31]/10 text-[#ff4d31]"
                        : "bg-sky-500/15 text-sky-600 dark:text-sky-400",
                    )}
                  >
                    {st.who}
                  </span>
                </span>
                <span
                  className={cn(
                    "block mt-1 font-bold",
                    i === stage ? "text-neutral-950 dark:text-white" : "text-neutral-500",
                  )}
                >
                  {st.name}
                </span>
                <span className="hidden md:block mt-1 text-sm text-neutral-600 dark:text-neutral-400 leading-snug">
                  {(!short && st.long) || st.text}
                </span>
                <span className="absolute inset-x-0 top-0 h-0.5">
                  <StepBar progress={progress} i={i} n={n} />
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </SectionWrap>
  );
}

export const ShortFormProcess = () => <WorkflowProcess format="short" />;
export const LongFormReview = () => <WorkflowProcess format="long" />;

/* ---------- Thumbnails: "How it works" as a design canvas ---------- */
const canvasSteps = [
  {
    name: "Brief",
    text: "You send the video and title idea. We pull out the one feeling it should sell.",
  },
  {
    name: "Sketch",
    text: "Three rough concepts in hours, not days. Different angles, not different fonts.",
  },
  {
    name: "Design",
    text: "The strongest concept becomes the final: cut-out, colour, 3–4 words max.",
  },
  { name: "Test", text: "Variants run in YouTube's Test & Compare. The data picks the winner." },
];
// Cursor stops on the fixed-width canvas, one per step.
const cursorAt = [
  { x: 170, y: 150 },
  { x: 400, y: 160 },
  { x: 700, y: 250 },
  { x: 960, y: 318 },
];

function Sketch({ variant, drawn }: { variant: 0 | 1 | 2; drawn: boolean }) {
  const paths = [
    [
      "M110 18 a22 22 0 1 0 0.1 0",
      "M12 30 H70",
      "M12 44 H62",
      "M12 58 H54",
      "M70 62 C80 70 86 66 92 58",
    ],
    [
      "M40 16 a22 22 0 1 0 0.1 0",
      "M92 26 H154",
      "M92 40 H146",
      "M92 56 C100 66 84 74 74 64",
      "M20 72 H70",
    ],
    ["M60 14 a20 20 0 1 0 0.1 0", "M110 14 a20 20 0 1 0 0.1 0", "M36 66 H136", "M86 10 V74"],
  ][variant];
  return (
    <svg
      viewBox="0 0 170 86"
      className="h-full w-full text-neutral-500 dark:text-neutral-400"
      fill="none"
    >
      {paths.map((d, i) => (
        <motion.path
          key={i}
          d={d}
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={false}
          animate={{ pathLength: drawn ? 1 : 0 }}
          transition={{ duration: 0.5, delay: drawn ? variant * 0.35 + i * 0.12 : 0 }}
        />
      ))}
    </svg>
  );
}

function CanvasFrame({
  label,
  x,
  y,
  w,
  show,
  active,
  children,
}: {
  label: string;
  x: number;
  y: number;
  w: number;
  show: boolean;
  active?: boolean;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      animate={{ opacity: show ? 1 : 0.15 }}
      transition={{ duration: 0.4 }}
      className="absolute"
      style={{ left: x, top: y, width: w }}
    >
      <p
        className={cn("mb-1 font-mono text-[10px]", active ? "text-[#ff4d31]" : "text-neutral-500")}
      >
        {label}
      </p>
      <div
        className={cn(
          "rounded-md overflow-hidden ring-1 transition-shadow",
          active ? "ring-2 ring-[#ff4d31]" : "ring-black/10 dark:ring-white/10",
        )}
      >
        {children}
      </div>
    </motion.div>
  );
}

export function ThumbnailProcess() {
  const n = canvasSteps.length;
  const { track, stage, pick, progress } = useScrollStages(n);
  const scroller = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = scroller.current;
    if (el && el.scrollWidth > el.clientWidth)
      el.scrollTo({ left: cursorAt[stage].x - el.clientWidth / 2, behavior: "smooth" });
  }, [stage]);

  return (
    <SectionWrap
      eyebrow="How it works"
      title={
        <>
          From brief to <span className="text-[#ff4d31]">best click.</span>
        </>
      }
      subtitle="Watch one thumbnail go from idea to tested winner."
    >
      <div ref={track} style={{ height: `${n * STEP_VH}vh` }}>
        <div
          className="sticky rounded-2xl border border-black/10 dark:border-white/10 bg-white/60 dark:bg-[#111113] shadow-2xl shadow-black/20 overflow-hidden"
          style={{ top: PIN_TOP }}
        >
          <div className="flex items-center gap-3 px-4 py-3 border-b border-black/5 dark:border-white/5">
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
            </div>
            <span className="font-mono text-xs text-neutral-500">Budget mic video · Thumbnail</span>
          </div>

          {/* Canvas: fixed width, scrolls sideways on phones */}
          <div ref={scroller} className="overflow-x-auto">
            <div
              className="relative h-[380px] w-[1120px] mx-auto"
              style={{
                backgroundImage:
                  "radial-gradient(circle, rgba(128,128,128,.25) 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            >
              {/* Connectors */}
              <svg
                className="absolute inset-0 h-full w-full pointer-events-none text-neutral-400/50"
                fill="none"
              >
                {[
                  ["M232 150 C250 150 250 70 270 70", 1],
                  ["M232 150 H270", 1],
                  ["M232 150 C250 150 250 280 270 280", 1],
                  ["M444 180 C480 180 480 200 520 200", 2],
                  ["M862 200 H900", 3],
                ].map(([d, min]) => (
                  <motion.path
                    key={d as string}
                    d={d as string}
                    stroke={stage >= (min as number) ? "#ff4d31" : "currentColor"}
                    strokeWidth="2"
                    strokeDasharray="5 5"
                    className="transition-colors duration-500"
                  />
                ))}
              </svg>

              <CanvasFrame label="Brief" x={32} y={70} w={200} show active={stage === 0}>
                <div className="bg-yellow-200 p-4 font-mono text-[11px] leading-relaxed text-neutral-800 -rotate-1">
                  <p className="font-bold">"I tested every budget mic"</p>
                  <p className="mt-2">Feeling: surprise</p>
                  <p>Face: yes, shocked</p>
                  <p>Words: 4 max</p>
                  <p>Style: channel series</p>
                </div>
              </CanvasFrame>

              {([0, 1, 2] as const).map((v) => (
                <CanvasFrame
                  key={v}
                  label={`Sketch ${"ABC"[v]}${v === 1 && stage >= 2 ? " · picked" : ""}`}
                  x={270}
                  y={20 + v * 106}
                  w={174}
                  show={stage >= 1}
                  active={stage >= 2 && v === 1}
                >
                  <div className="h-[84px] bg-white dark:bg-neutral-900">
                    <Sketch variant={v} drawn={stage >= 1} />
                  </div>
                </CanvasFrame>
              ))}

              <CanvasFrame
                label="Final · 1280×720"
                x={520}
                y={100}
                w={342}
                show={stage >= 2}
                active={stage === 2}
              >
                <div className="relative aspect-video bg-neutral-900">
                  <DesignedThumb src={posters[1]} text="Only one was worth it" sub="$1,200 test" />
                </div>
              </CanvasFrame>

              <CanvasFrame
                label="Test & Compare · 7 days"
                x={900}
                y={70}
                w={190}
                show={stage >= 3}
                active={stage === 3}
              >
                <div className="bg-white dark:bg-neutral-900 p-3 space-y-3">
                  {[
                    ["A", 4.1],
                    ["B", 6.3],
                    ["Final", 9.4],
                  ].map(([k, v], i) => (
                    <div key={k as string}>
                      <div className="flex justify-between text-xs">
                        <span className="font-semibold text-neutral-800 dark:text-neutral-200">
                          {k}
                        </span>
                        <span
                          className={cn(
                            "font-mono tabular-nums",
                            i === 2 ? "text-[#ff4d31] font-bold" : "text-neutral-500",
                          )}
                        >
                          {v}%
                        </span>
                      </div>
                      <div className="mt-1 h-1.5 rounded-full bg-black/5 dark:bg-white/10 overflow-hidden">
                        <motion.div
                          initial={false}
                          animate={{ width: stage >= 3 ? `${(v as number) * 10}%` : 0 }}
                          transition={{ duration: 0.8, delay: i * 0.15 }}
                          className={cn(
                            "h-full rounded-full",
                            i === 2 ? "bg-[#ff4d31]" : "bg-neutral-400",
                          )}
                        />
                      </div>
                    </div>
                  ))}
                  <p className="flex items-center gap-1 text-[11px] font-semibold text-[#ff4d31]">
                    <Trophy className="h-3.5 w-3.5" /> Winner applied
                  </p>
                </div>
              </CanvasFrame>

              {/* Designer cursor */}
              <motion.div
                className="absolute z-10 pointer-events-none"
                animate={cursorAt[stage]}
                transition={{ type: "spring", stiffness: 90, damping: 16 }}
                style={{ left: 0, top: 0 }}
              >
                <MousePointer2 className="h-5 w-5 fill-[#ff4d31] text-[#ff4d31] -rotate-3" />
                <span className="ml-4 inline-block rounded-md rounded-tl-none bg-[#ff4d31] px-2 py-0.5 text-[10px] font-semibold text-white whitespace-nowrap">
                  Vertex design
                </span>
              </motion.div>
            </div>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-2 md:grid-cols-4 border-t border-black/5 dark:border-white/5">
            {canvasSteps.map((st, i) => (
              <button
                key={st.name}
                onClick={() => pick(i)}
                aria-current={i === stage ? "step" : undefined}
                className={cn(
                  "relative text-left px-4 md:px-6 py-4 md:py-5 transition-colors border-black/5 dark:border-white/5",
                  i % 2 === 1 && "border-l",
                  i > 1 && "border-t md:border-t-0",
                  i === 2 && "md:border-l",
                  i === stage && "bg-[#ff4d31]/[0.06]",
                )}
              >
                <span
                  className={cn(
                    "font-mono text-xs",
                    i === stage ? "text-[#ff4d31]" : "text-neutral-400",
                  )}
                >
                  0{i + 1}
                </span>
                <span
                  className={cn(
                    "block mt-1 font-bold",
                    i === stage ? "text-neutral-950 dark:text-white" : "text-neutral-500",
                  )}
                >
                  {st.name}
                </span>
                <span className="hidden md:block mt-1 text-sm text-neutral-600 dark:text-neutral-400 leading-snug">
                  {st.text}
                </span>
                <span className="absolute inset-x-0 top-0 h-0.5">
                  <StepBar progress={progress} i={i} n={n} />
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </SectionWrap>
  );
}

/* ---------- Shared section wrapper ---------- */
export function SectionWrap({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="relative w-full overflow-clip px-4 sm:px-6 md:px-8 py-12 md:py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neutral-300/60 dark:via-white/10 to-transparent"
      />
      <div className="relative mx-auto max-w-7xl">
        <div className="flex flex-col items-center text-center mb-10 md:mb-14">
          <span className="inline-flex items-center gap-2 rounded-full border border-neutral-200/70 dark:border-white/10 bg-white/60 dark:bg-white/[0.04] backdrop-blur-md px-3 py-1 text-xs font-semibold text-neutral-600 dark:text-neutral-300 uppercase tracking-wider">
            <span className="h-1.5 w-1.5 rounded-full bg-[#ff4d31] animate-pulse" />
            {eyebrow}
          </span>
          <h2 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-950 dark:text-white">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-5 max-w-2xl text-lg text-neutral-600 dark:text-neutral-400">
              {subtitle}
            </p>
          )}
        </div>
        {children}
      </div>
    </section>
  );
}
