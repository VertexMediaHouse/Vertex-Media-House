import React from "react";
import { motion } from "framer-motion";
import SpotlightCard from "./SpotlightCard";
import { SectionGlow } from "./SectionGlow";
import { cn } from "@/lib/utils";
import { PlatformIcons, type Platform } from "./PlatformIcons";

interface Review {
  review: string;
  name: string;
  position: string;
  service: string;
  platforms?: Platform[];
}

interface VideoTestimonial {
  src: string;
  poster?: string;
  name: string;
  position: string;
  quote: string;
  platforms: Platform[];
}

// Verbatim from the marketplace reviews. TODO: platform tags are assumed, not from the reviews.
const clientReviews: Review[] = [
  {
    review:
      "Amazing work. He went above and beyond. The work was delivered in a timely manner and he did multiple revisions for me with no questions asked. I'm truly impressed and can't wait to do more work with him. Thank you for the exceptional product.",
    name: "greggamaral",
    position: "United States",
    service: "Video Editing",
    platforms: ["shorts", "instagram", "tiktok"],
  },
  {
    review: "Very good to work with. Communicated well through the chat through the process.",
    name: "tomwdallas",
    position: "United States",
    service: "Video Editing",
    platforms: ["shorts", "instagram"],
  },
  {
    review:
      "I have definitely found my go to person for all marketing creatives! This is our second time working together, and it exceeded my expectations, again.",
    name: "primeonecredit",
    position: "United States",
    service: "Video Editing",
    platforms: ["shorts", "instagram", "tiktok"],
  },
  {
    review: "Exceeded my expectations in every way!",
    name: "vodusrich",
    position: "United States",
    service: "Video Editing",
    platforms: ["shorts", "tiktok"],
  },
  {
    review: "Great work, fast to communicate and exceeded expectations.",
    name: "blaiselarrab139",
    position: "United States",
    service: "Video Editing",
    platforms: ["shorts", "instagram"],
  },
  {
    review:
      "Consistently outstanding work. Professional, strategic, and always delivered with care. Highly recommended!",
    name: "omowaleaduayi",
    position: "United States",
    service: "Video Editing",
    platforms: ["shorts", "instagram", "tiktok"],
  },
];

export const homeReviews = clientReviews;

// Home page only. TODO: drop the two testimonial videos into public/assets/video/testimonials/.
export const videoTestimonials: VideoTestimonial[] = [
  {
    src: "/assets/video/testimonials/1.mp4",
    name: "Client name",
    position: "Designation",
    quote: "One line from the video goes here.",
    platforms: ["shorts", "instagram", "tiktok"],
  },
  {
    src: "/assets/video/testimonials/2.mp4",
    name: "Client name",
    position: "Designation",
    quote: "One line from the video goes here.",
    platforms: ["shorts", "instagram", "tiktok"],
  },
];

function VideoCard({ t }: { t: VideoTestimonial }) {
  return (
    <div className="grid grid-cols-5 gap-5 rounded-2xl border border-white/40 dark:border-white/10 liquid-glass dark:!bg-white/[0.03] p-4 md:p-5">
      <div className="col-span-2 relative aspect-[9/16] rounded-xl overflow-hidden bg-neutral-900">
        <video
          src={t.src}
          poster={t.poster}
          controls
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
      <div className="col-span-3 flex flex-col py-2">
        <span className="text-5xl leading-none font-black text-[#ff4d31]">"</span>
        <p className="mt-1 text-lg md:text-xl font-semibold leading-snug text-neutral-900 dark:text-white">
          {t.quote}
        </p>
        <div className="mt-auto pt-6 border-t border-neutral-200/50 dark:border-white/5">
          <p className="text-base font-bold text-neutral-950 dark:text-white">{t.name}</p>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">{t.position}</p>
          <PlatformIcons items={t.platforms} className="mt-3" />
        </div>
      </div>
    </div>
  );
}

const reviews = clientReviews;

const ReviewCard = ({ review, name, position, platforms }: Review) => {
  return (
    <div className="w-[380px] shrink-0 p-4">
      <SpotlightCard
        className={cn(
          "flex flex-col h-full p-8 rounded-xl",
          "liquid-glass dark:!bg-white/[0.03] border-white/40 dark:border-white/10",
          "backdrop-blur-xl backdrop-saturate-150 shadow-2xl shadow-orange-500/5",
        )}
        spotlightColor="rgba(120, 140, 180, 0.28)"
        darkSpotlightColor="rgba(255, 255, 255, 0.18)"
      >
        <div className="relative z-10 flex flex-col h-full">
          <p className="text-base leading-relaxed font-medium text-neutral-900 dark:text-white mb-8 whitespace-normal">
            "{review}"
          </p>

          <div className="mt-auto pt-6 border-t border-neutral-200/50 dark:border-white/5">
            <div className="flex flex-col gap-1">
              <span className="text-base font-bold text-neutral-950 dark:text-neutral-100 tracking-tight">
                {name}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                  {position}
                </span>
              </div>
              {platforms && <PlatformIcons items={platforms} className="mt-2" />}
            </div>
          </div>
        </div>
      </SpotlightCard>
    </div>
  );
};

export function Reviews({
  rows = 2,
  items = reviews,
  videos,
}: {
  rows?: 1 | 2;
  items?: Review[];
  videos?: VideoTestimonial[];
}) {
  // Split reviews into rows
  const row1 = rows === 1 ? items : items.slice(0, Math.ceil(items.length / 2));
  const row2 = items.slice(Math.ceil(items.length / 2));

  return (
    <section
      id="reviews"
      className="relative w-full overflow-hidden py-12 md:py-20 bg-white dark:bg-black"
    >
      <SectionGlow />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 md:px-8 mb-10 flex flex-col items-center text-center">
        <motion.span
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 rounded-full border border-neutral-200/70 dark:border-white/10 bg-white/60 dark:bg-white/[0.04] backdrop-blur-md px-3 py-1 text-xs font-semibold text-neutral-600 dark:text-neutral-300 uppercase tracking-wider"
        >
          Testimonials
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-6 text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-neutral-950 dark:text-white"
        >
          Real clients. Real results.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 max-w-2xl text-lg md:text-xl text-neutral-600 dark:text-neutral-400 font-medium"
        >
          Creators, founders, and brand owners who trusted us with their growth - here's what
          happened.
        </motion.p>
      </div>

      {videos && (
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 md:px-8 mb-6 grid md:grid-cols-2 gap-6">
          {videos.map((v, i) => (
            <VideoCard key={i} t={v} />
          ))}
        </div>
      )}

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <div className="relative flex flex-col gap-4">
          {/* Row 1: Moving Left */}
          <div className="marquee-mask relative flex overflow-hidden py-1">
            <div className="flex animate-marquee whitespace-nowrap hover:[animation-play-state:paused]">
              {[...row1, ...row1, ...row1].map((review, i) => (
                <ReviewCard key={`row1-${i}`} {...review} />
              ))}
            </div>
          </div>

          {/* Row 2: Moving Right (Only if rows === 2 and we have enough items) */}
          {rows === 2 && row2.length > 0 && (
            <div className="marquee-mask relative flex overflow-hidden py-1">
              <div className="flex animate-marquee-reverse whitespace-nowrap hover:[animation-play-state:paused]">
                {[...row2, ...row2, ...row2].map((review, i) => (
                  <ReviewCard key={`row2-${i}`} {...review} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        @keyframes marquee-reverse {
          0% { transform: translateX(-33.33%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        .animate-marquee-reverse {
          animation: marquee-reverse 40s linear infinite;
        }
        .marquee-mask {
          -webkit-mask-image: linear-gradient(to right, transparent, black 2%, black 98%, transparent);
          mask-image: linear-gradient(to right, transparent, black 2%, black 98%, transparent);
        }
      `,
        }}
      />
    </section>
  );
}
