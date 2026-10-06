import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Check, Eye, MousePointerClick, TrendingUp, Upload, Users } from "lucide-react";
import { ServiceCard } from "@/components/edit/EditSections";
import { serviceList } from "@/components/services/ServicePage";
import { DesignedThumb, posters } from "@/components/services/ServiceVisuals";
import { SectionGlow } from "./SectionGlow";

/* Two rows of tiles drifting in opposite directions on a tilted plane, fading into the card. */
function SlantedReel({ rows, speed = 28 }: { rows: React.ReactNode[][]; speed?: number }) {
  return (
    <div aria-hidden className="absolute inset-0 pointer-events-none">
      <div className="absolute -inset-x-1/2 -inset-y-10 flex flex-col justify-center gap-3 -rotate-[10deg]">
        {rows.map((tiles, r) => (
          <motion.div
            key={r}
            className="flex w-max gap-3"
            animate={{ x: r % 2 ? ["-50%", "0%"] : ["0%", "-50%"] }}
            transition={{ duration: speed + r * 6, ease: "linear", repeat: Infinity }}
          >
            {[...tiles, ...tiles].map((t, i) => (
              <div key={i} className="shrink-0">
                {t}
              </div>
            ))}
          </motion.div>
        ))}
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-[#ff4d31]/30 via-transparent to-transparent mix-blend-overlay" />
      <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-white/40 to-white dark:from-black/10 dark:via-black/40 dark:to-[#0a0a0a]" />
    </div>
  );
}

const reel = (src: string) => (
  <img src={src} alt="" className="h-32 w-[72px] rounded-lg object-cover ring-1 ring-white/10" />
);
const video = (src: string, d: string) => (
  <div className="relative h-20 w-36 rounded-lg overflow-hidden ring-1 ring-white/10 bg-neutral-900">
    <img src={src} alt="" className="h-full w-full object-cover object-[50%_25%]" />
    <span className="absolute bottom-1 right-1 rounded bg-black/80 px-1 text-[8px] font-semibold text-white">
      {d}
    </span>
    <span className="absolute bottom-0 left-0 h-0.5 w-2/3 bg-[#ff0033]" />
  </div>
);
const thumb = (src: string, text: string, tone: "yellow" | "white" | "red") => (
  <div className="relative h-20 w-36 rounded-lg overflow-hidden ring-1 ring-white/10 bg-neutral-900">
    <DesignedThumb src={src} text={text} tone={tone} />
  </div>
);
const stat = (Icon: typeof Eye, value: string, label: string) => (
  <div className="flex h-16 w-40 items-center gap-2.5 rounded-lg bg-white dark:bg-neutral-900 px-3 ring-1 ring-black/10 dark:ring-white/10">
    <span className="flex h-8 w-8 items-center justify-center rounded-md bg-[#ff4d31]/15 text-[#ff4d31]">
      <Icon className="h-4 w-4" />
    </span>
    <span>
      <span className="block text-sm font-bold text-neutral-900 dark:text-white">{value}</span>
      <span className="block text-[10px] text-neutral-500">{label}</span>
    </span>
  </div>
);

const [p0, p1, p2, p3, p4] = posters;
const reels: Record<string, React.ReactNode[][]> = {
  "short-form": [[p1, p2, p3, p4, p0].map(reel), [p4, p0, p1, p3, p2].map(reel)],
  "long-form": [
    [video(p1, "42:10"), video(p3, "18:04"), video(p0, "27:33"), video(p4, "12:48")],
    [video(p2, "35:20"), video(p1, "1:04:12"), video(p4, "22:15"), video(p3, "16:40")],
  ],
  thumbnails: [
    [
      thumb(p1, "Nobody tells you", "yellow"),
      thumb(p4, "$0 → $10K", "white"),
      thumb(p2, "Don't buy this", "red"),
      thumb(p3, "Day 1 vs 100", "yellow"),
    ],
    [
      thumb(p0, "The 5AM myth", "white"),
      thumb(p1, "Watch before you quit", "red"),
      thumb(p3, "I tried it", "yellow"),
      thumb(p4, "Worth it?", "white"),
    ],
  ],
  "youtube-management": [
    [
      stat(Users, "+12.9K", "subscribers"),
      stat(Eye, "1.3M", "views"),
      stat(MousePointerClick, "9.4%", "CTR"),
      stat(TrendingUp, "+214%", "watch time"),
    ],
    [
      stat(Upload, "Fri 5 PM", "scheduled"),
      stat(Check, "SEO done", "title · tags"),
      stat(Check, "Replied", "48 comments"),
      stat(Upload, "3 Shorts", "published"),
    ],
  ],
};

export function Services() {
  return (
    <section
      id="services"
      className="relative w-full overflow-hidden px-4 sm:px-6 md:px-8 py-12 md:py-20 bg-white dark:bg-black"
    >
      <SectionGlow />
      <div className="relative mx-auto max-w-7xl">
        <div className="flex flex-col items-center text-center mb-8 md:mb-12">
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full border border-neutral-200/70 dark:border-white/10 bg-white/60 dark:bg-white/[0.04] backdrop-blur-md px-3 py-1 text-xs font-semibold text-neutral-600 dark:text-neutral-300 uppercase tracking-wider"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#ff4d31] animate-pulse" />
            Services
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-neutral-950 dark:text-white"
          >
            Four services. <span className="text-[#ff4d31]">One channel.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 max-w-2xl text-lg md:text-xl text-neutral-600 dark:text-neutral-400 font-medium"
          >
            Pick one, or let us run the whole thing. Every service is built around watch time and
            clicks.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {serviceList.map((s, i) => (
            <Link key={s.slug} to="/services/$slug" params={{ slug: s.slug }} className="block">
              <ServiceCard
                icon={s.icon}
                title={s.name}
                description={s.summary}
                index={i}
                className="h-full min-h-[580px]"
                top={<SlantedReel rows={reels[s.slug]} />}
              >
                <span className="mt-auto pt-6 inline-flex items-center gap-1 text-sm font-semibold text-[#ff4d31]">
                  Explore{" "}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </ServiceCard>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
