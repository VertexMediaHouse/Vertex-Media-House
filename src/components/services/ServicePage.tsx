import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Zap,
  Captions,
  Music2,
  Wand2,
  Repeat2,
  Smartphone,
  Clapperboard,
  Film,
  ListVideo,
  Mic,
  Palette,
  AudioLines,
  Image,
  Type,
  ScanFace,
  FlaskConical,
  LayoutGrid,
  MousePointerClick,
  Youtube,
  Target,
  Search,
  MessagesSquare,
  ChartLine,
  Upload,
  Scissors,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PageShell } from "@/components/site/PageShell";
import { SectionGlow } from "@/components/site/SectionGlow";
import { LogoMarquee } from "@/components/site/Marquee";
import { Reviews, homeReviews, videoTestimonials } from "@/components/site/Reviews";
import {
  ServiceCard,
  Portfolio,
  /* Packages, */ shortFormItems,
} from "@/components/edit/EditSections";
import { ChannelWork } from "@/components/site/Portfolio";
import {
  ReelPhones,
  LongFormPlayer,
  LongFormPortfolio,
  ThumbnailClick,
  ThumbnailFeed,
  ChannelDashboard,
  ChannelProcess,
  ShortFormProcess,
  LongFormReview,
  ThumbnailProcess,
  SectionWrap,
} from "./ServiceVisuals";

type Service = {
  slug: string;
  name: string;
  icon: React.ElementType;
  blurb: string;
  tab: string;
  summary: string;
  metaTitle: string;
  metaDescription: string;
  badge: string;
  title: string;
  accent: string;
  intro: string;
  stats: [string, string][];
  visual: React.ComponentType;
  showcase: React.ComponentType;
  deliverables: { icon: React.ElementType; title: string; description: string }[];
  process: React.ComponentType;
  faqs: [string, string][];
};

const ShortFormShowcase = () => (
  <>
    <Portfolio
      items={shortFormItems}
      title="Short-form Reels."
      subtitle="Hook in the first second. Captions that keep eyes on screen. Pacing that earns every extra second of watch time."
    />
    {/* <Packages /> */}
  </>
);

const ChannelShowcase = () => (
  <SectionWrap
    eyebrow="Our work"
    title={
      <>
        Channels we <span className="text-[#ff4d31]">run.</span>
      </>
    }
    subtitle="Channels we manage end to end: strategy, editing, thumbnails and publishing."
  >
    <ChannelWork />
  </SectionWrap>
);

export const services: Record<string, Service> = {
  "short-form": {
    slug: "short-form",
    name: "Short Form Editing",
    icon: Smartphone,
    blurb: "Reels, Shorts and TikToks that stop the scroll.",
    tab: "Short form",
    summary:
      "Reels, Shorts and TikToks built around the first second. Hooks, animated captions, sound design and motion that keep people watching.",
    metaTitle: "Short Form Video Editing — Reels, Shorts & TikTok | Vertex Media House",
    metaDescription:
      "Reels, YouTube Shorts and TikTok editing built for retention: hooks under a second, synced captions, sound design and fast turnaround.",
    badge: "Reels · Shorts · TikTok",
    title: "Stop the scroll.",
    accent: "Keep them watching.",
    intro:
      "Vertical edits built around the first second. Hook-first pacing, animated captions, sound design and motion that turns raw clips into content people finish, save and share.",
    stats: [
      ["< 1s", "to the hook"],
      ["24h", "turnaround"],
      ["9:16", "native for every platform"],
    ],
    visual: ReelPhones,
    showcase: ShortFormShowcase,
    deliverables: [
      {
        icon: Zap,
        title: "Scroll-stopping hooks",
        description:
          "We restructure your clip so the strongest moment lands in the first second, not the tenth.",
      },
      {
        icon: Captions,
        title: "Animated captions",
        description:
          "Word-by-word captions synced to your voice, styled to your brand. 85% of people watch on mute.",
      },
      {
        icon: Music2,
        title: "Sound design",
        description:
          "Trending audio, SFX on every cut and clean voice. Short-form is felt as much as seen.",
      },
      {
        icon: Wand2,
        title: "Motion graphics",
        description: "Zooms, text pops, emojis and B-roll that reset attention every few seconds.",
      },
      {
        icon: Repeat2,
        title: "Repurposing",
        description:
          "Send one podcast or long video. Get back a week of clips cut for Reels, Shorts and TikTok.",
      },
      {
        icon: Scissors,
        title: "Hook & script help",
        description:
          "Not sure what to film? We plan hooks and scripts so every shoot already has a winner in it.",
      },
    ],
    process: ShortFormProcess,
    faqs: [
      [
        "Which platforms do you edit for?",
        "Instagram Reels, YouTube Shorts, TikTok, LinkedIn and Facebook. Every export is 9:16 and safe-zone checked for each app's buttons.",
      ],
      [
        "Can you cut shorts from my long videos or podcast?",
        "Yes. That's content repurposing. We pull the best moments, reframe to vertical and add captions and hooks.",
      ],
      ["How fast is delivery?", "24–48 hours per reel depending on your plan."],
      [
        "Do I need to write the hooks?",
        "No. Hook creation and scripting are included from the Growth plan up.",
      ],
    ],
  },

  "long-form": {
    slug: "long-form",
    name: "Long Form Editing",
    icon: Clapperboard,
    blurb: "YouTube videos and podcasts people watch to the end.",
    tab: "Long form",
    summary:
      "YouTube videos and podcasts that hold attention end to end. Story structure, B-roll, graphics and chapters that make an hour feel like ten minutes.",
    metaTitle: "Long Form Video Editing — YouTube & Podcasts | Vertex Media House",
    metaDescription:
      "YouTube and podcast editing that holds attention for 10, 20 or 60 minutes: story structure, B-roll, chapters, graphics and colour grading.",
    badge: "YouTube · Podcasts · Brand films",
    title: "An hour that",
    accent: "feels like ten minutes.",
    intro:
      "YouTube videos, podcasts and brand films edited around one number: audience retention. Story structure, B-roll, graphics and pacing that keep people watching to the end card.",
    stats: [
      ["10–90", "minute episodes"],
      ["4K", "delivery"],
      ["Multi-cam", "podcast sync"],
    ],
    visual: LongFormPlayer,
    showcase: LongFormPortfolio,
    deliverables: [
      {
        icon: ListVideo,
        title: "Story structure",
        description: "We cut the rambling, tighten the arc and reorder so every section pays off.",
      },
      {
        icon: Film,
        title: "B-roll & visuals",
        description: "Stock, screen recordings, maps and graphics that show what you're saying.",
      },
      {
        icon: Mic,
        title: "Podcast editing",
        description: "Multi-cam switching, filler-word removal and clean audio for video podcasts.",
      },
      {
        icon: AudioLines,
        title: "Audio mix",
        description:
          "Levelled voices, noise removal, music beds and SFX mixed to broadcast standard.",
      },
      {
        icon: Palette,
        title: "Colour grading",
        description: "A consistent, cinematic look across every episode and every camera.",
      },
      {
        icon: Clapperboard,
        title: "Chapters & end screens",
        description:
          "Timestamps, chapter titles and end screens that send viewers to your next video.",
      },
    ],
    process: LongFormReview,
    faqs: [
      ["How long can the videos be?", "Anything from 8-minute YouTube videos to 3-hour podcasts."],
      [
        "Do you edit multi-camera podcasts?",
        "Yes. We sync every camera and audio source, switch between speakers and clean up the audio.",
      ],
      [
        "Can I get shorts from the same episode?",
        "Yes. Add short-form repurposing and we cut clips from every long-form edit.",
      ],
      ["What's the turnaround?", "Usually 3–5 working days depending on length and complexity."],
    ],
  },

  thumbnails: {
    slug: "thumbnails",
    name: "Thumbnail Design",
    icon: Image,
    blurb: "Thumbnails that win the click in a crowded feed.",
    tab: "Thumbnails",
    summary:
      "Bold, readable, curiosity-driven thumbnails designed for the feed and A/B tested, so more of the people who see your video click.",
    metaTitle: "YouTube Thumbnail Design — High CTR Thumbnails | Vertex Media House",
    metaDescription:
      "Click-worthy YouTube thumbnails designed for CTR: bold concepts, readable text, expressive faces and A/B testing.",
    badge: "YouTube thumbnails",
    title: "The best video",
    accent: "nobody clicks on is worthless.",
    intro:
      "Your thumbnail is the ad for your video. We design bold, readable, curiosity-driven thumbnails and test them, so more of the people who see your video actually click.",
    stats: [
      ["3", "concepts per video"],
      ["24h", "turnaround"],
      ["A/B", "tested"],
    ],
    visual: ThumbnailClick,
    showcase: ThumbnailFeed,
    deliverables: [
      {
        icon: MousePointerClick,
        title: "CTR-first concepts",
        description:
          "We start from the idea, not the template. One clear hook the viewer gets in half a second.",
      },
      {
        icon: ScanFace,
        title: "Face & expression",
        description: "Cut-outs, lighting and emotion that make your face do the work in the feed.",
      },
      {
        icon: Type,
        title: "Readable text",
        description:
          "3–4 words max, sized to read on a phone. Built to support your title, not repeat it.",
      },
      {
        icon: FlaskConical,
        title: "A/B testing",
        description:
          "Multiple variants tested with YouTube's Test & Compare so the data picks the winner.",
      },
      {
        icon: LayoutGrid,
        title: "Channel consistency",
        description:
          "A recognisable style so subscribers spot your video before they read your name.",
      },
      {
        icon: Image,
        title: "Title pairing",
        description:
          "We suggest titles that work with the thumbnail. The two sell the click together.",
      },
    ],
    process: ThumbnailProcess,
    faqs: [
      [
        "Do I need to take special photos?",
        "It helps. We'll send you a quick shot list, but we can also pull frames from your video.",
      ],
      ["How many versions do I get?", "Usually 3 variants per video so you can A/B test."],
      [
        "Do you design for Shorts and podcasts?",
        "Yes: YouTube, podcast covers, Shorts covers and Instagram Reel covers.",
      ],
      [
        "Can you redo my old thumbnails?",
        "Yes. Refreshing thumbnails on older videos is one of the fastest ways to get new views.",
      ],
    ],
  },

  "youtube-management": {
    slug: "youtube-management",
    name: "YouTube Channel Management",
    icon: Youtube,
    blurb: "Strategy, uploads, SEO and analytics, handled.",
    tab: "Channel management",
    summary:
      "Strategy, editing, thumbnails, SEO, publishing and analytics, run by one team. You film. We turn it into a channel that grows.",
    metaTitle: "YouTube Channel Management — Strategy, SEO & Growth | Vertex Media House",
    metaDescription:
      "Done-for-you YouTube channel management: content strategy, editing, thumbnails, SEO, uploads, community and monthly analytics.",
    badge: "Done-for-you YouTube",
    title: "You press record.",
    accent: "We run the channel.",
    intro:
      "Strategy, editing, thumbnails, titles, SEO, publishing, community and analytics, run by one team. You show up to film. We turn it into a channel that grows every month.",
    stats: [
      ["1", "team for everything"],
      ["Weekly", "uploads, on schedule"],
      ["Monthly", "growth reports"],
    ],
    visual: ChannelDashboard,
    showcase: ChannelShowcase,
    deliverables: [
      {
        icon: Target,
        title: "Content strategy",
        description:
          "Pillars, series and video ideas based on what your audience and competitors show works.",
      },
      {
        icon: Clapperboard,
        title: "Editing & thumbnails",
        description:
          "Long-form, Shorts and thumbnails in one pipeline. Consistent quality every week.",
      },
      {
        icon: Search,
        title: "SEO & metadata",
        description: "Titles, descriptions, tags, chapters and playlists written to be found.",
      },
      {
        icon: Upload,
        title: "Publishing",
        description:
          "Scheduled uploads, end screens, cards and pinned comments. Never a missed week.",
      },
      {
        icon: MessagesSquare,
        title: "Community",
        description: "Comment replies, community posts and polls that keep your audience close.",
      },
      {
        icon: ChartLine,
        title: "Analytics & reports",
        description: "Monthly reports and a strategy call: what worked, what didn't, what's next.",
      },
    ],
    process: ChannelProcess,
    faqs: [
      [
        "Do you need access to my channel?",
        "Yes, as a Manager or Editor through YouTube's channel permissions. You keep full ownership and can remove access anytime.",
      ],
      [
        "Can you start a channel from zero?",
        "Yes. We handle branding, channel setup, first videos and the launch plan.",
      ],
      [
        "What do I still have to do?",
        "Film. We send you topics, outlines and a filming schedule. Everything after recording is on us.",
      ],
      [
        "How soon will I see growth?",
        "Most channels see momentum within 60–90 days of consistent, optimised uploads, but growth depends on your niche and how often you post.",
      ],
    ],
  },
};

export const serviceList = Object.values(services);

function Hero({ s }: { s: Service }) {
  const Visual = s.visual;
  return (
    <section className="relative w-full overflow-hidden px-4 sm:px-6 md:px-8 pt-10 md:pt-16 pb-12">
      <SectionGlow />
      <div className="relative mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-5">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full liquid-glass border border-white/30 dark:border-white/10 px-3 py-1 text-xs font-mono uppercase tracking-widest text-neutral-700 dark:text-neutral-300"
          >
            <s.icon className="h-3.5 w-3.5 text-[#ff4d31]" />
            {s.badge}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-6 text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tighter text-neutral-950 dark:text-white leading-[0.95]"
          >
            <span className="sr-only">{s.name}: </span>
            {s.title}
            <br />
            <span className="text-[#ff4d31]">{s.accent}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 max-w-xl text-lg lg:text-xl text-neutral-600 dark:text-neutral-400"
          >
            {s.intro}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Button
              className="rounded-xl px-6 py-3 h-auto bg-[#ff4d31] text-white hover:bg-[#e8462c]"
              data-cal-link="dhrumil-sanghvi/15min"
              data-cal-config='{"layout":"month_view"}'
            >
              Book a Call
            </Button>
            <Button
              asChild
              variant="outline"
              className="rounded-xl px-6 py-3 h-auto border-neutral-300 dark:border-neutral-700 bg-transparent"
            >
              <a href="#included">What's included</a>
            </Button>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          // Fixed height so every service hero is the same size; visuals are sized to fit it.
          className="lg:col-span-7 lg:h-[574px] lg:flex lg:flex-col lg:justify-center"
        >
          <Visual />
        </motion.div>
      </div>
    </section>
  );
}

function Faq({ faqs }: { faqs: Service["faqs"] }) {
  return (
    <SectionWrap eyebrow="FAQ" title="Questions, answered.">
      <Accordion type="single" collapsible className="mx-auto max-w-3xl">
        {faqs.map(([q, a]) => (
          <AccordionItem key={q} value={q} className="border-neutral-200 dark:border-white/10">
            <AccordionTrigger className="text-left text-base md:text-lg font-semibold text-neutral-900 dark:text-white">
              {q}
            </AccordionTrigger>
            <AccordionContent className="text-base text-neutral-600 dark:text-neutral-400">
              {a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </SectionWrap>
  );
}

function OtherServices({ current }: { current: string }) {
  return (
    <SectionWrap eyebrow="More services" title="Need the full stack?">
      <div className="grid sm:grid-cols-3 gap-5">
        {serviceList
          .filter((o) => o.slug !== current)
          .map((o) => (
            <Link
              key={o.slug}
              to="/services/$slug"
              params={{ slug: o.slug }}
              className="group liquid-glass rounded-2xl border border-black/10 dark:border-white/10 p-6 transition-all hover:-translate-y-1 hover:border-[#ff4d31]/50"
            >
              <o.icon className="h-7 w-7 text-[#ff4d31]" />
              <h3 className="mt-4 text-xl font-bold text-neutral-900 dark:text-white">{o.name}</h3>
              <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">{o.blurb}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#ff4d31]">
                Explore{" "}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
      </div>
    </SectionWrap>
  );
}

export function ServicePage({ slug }: { slug: string }) {
  const s = services[slug];
  const Showcase = s.showcase;
  return (
    <PageShell>
      <Hero s={s} />
      <div className="py-6">
        <LogoMarquee />
      </div>
      <Showcase />
      <s.process />
      <OtherServices current={slug} />
      <div id="included">
        <SectionWrap
          eyebrow="What's included"
          title={
            <>
              Everything you <span className="text-[#ff4d31]">get.</span>
            </>
          }
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {s.deliverables.map((d, i) => (
              <ServiceCard key={d.title} {...d} index={i} />
            ))}
          </div>
        </SectionWrap>
      </div>
      <Reviews rows={1} items={homeReviews} videos={videoTestimonials} />
      <Faq faqs={s.faqs} />
    </PageShell>
  );
}
