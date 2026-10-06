import * as React from "react";
import { animate, motion } from "framer-motion";
import { ArrowRight, BadgePercent, Check, Eye, EyeOff, Mail, Minus, Plus } from "lucide-react";
import { Logo } from "./Logo";
import { cn } from "@/lib/utils";
import { services } from "@/components/services/ServicePage";

/* ---------- Rates: every price on the page comes from here ---------- */
// USD. The YouTube management rate is still a placeholder.
const EMAIL = "dhrumil@vertexmediahouse.com";
const ITEMS = [
  {
    key: "short",
    slug: "short-form",
    name: "Short-form videos",
    hint: "Reels, Shorts, TikToks",
    unit: "video",
    rate: 30,
  },
  {
    key: "long",
    slug: "long-form",
    name: "Long-form videos",
    hint: "YouTube videos & podcasts",
    unit: "video",
    rate: 70,
  },
  {
    key: "thumbs",
    slug: "thumbnails",
    name: "Thumbnails",
    hint: "Designed for clicks",
    unit: "thumbnail",
    rate: 15,
  },
] as const;
const EXTRAS = [
  {
    key: "ytm",
    slug: "youtube-management",
    name: "YouTube management",
    desc: "Strategy, uploads, SEO and reports for your channel",
    rate: 400,
    per: "month",
  },
] as const;
const MAX = 100;

type ItemKey = (typeof ITEMS)[number]["key"];
type ExtraKey = (typeof EXTRAS)[number]["key"];
type Selection = { counts: Record<ItemKey, number>; extras: Record<ExtraKey, boolean> };

const usd = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

/** Turns a selection into priced lines and a monthly total. */
function quote({ counts, extras }: Selection) {
  const lines: { name: string; qty: number; rate: number; amount: number }[] = [];
  for (const it of ITEMS) {
    const n = counts[it.key];
    if (n > 0) lines.push({ name: it.name, qty: n, rate: it.rate, amount: n * it.rate });
  }
  for (const ex of EXTRAS)
    if (extras[ex.key]) lines.push({ name: ex.name, qty: 1, rate: ex.rate, amount: ex.rate });
  return { lines, total: lines.reduce((s, l) => s + l.amount, 0) };
}

const none = Object.fromEntries(EXTRAS.map((e) => [e.key, false])) as Record<ExtraKey, boolean>;
const rate = (k: ItemKey) => ITEMS.find((it) => it.key === k)!.rate;

export const plans = [
  {
    name: "Starter",
    tagline: "For creators building consistency",
    price: 449,
    items: [
      { key: "long", label: "long videos", qty: 4 },
      { key: "short", label: "short videos", qty: 8 },
      { key: "thumbs", label: "thumbnails", qty: 4 },
    ],
    free: ["Licensed music & sound effects", "Project dashboard access", "2 revisions per video"],
  },
  {
    name: "Growth",
    tagline: "For creators scaling their reach",
    price: 899,
    popular: true,
    items: [
      { key: "long", label: "long videos", qty: 8 },
      { key: "short", label: "short videos", qty: 16 },
      { key: "thumbs", label: "thumbnails", qty: 8 },
    ],
    free: [
      "SEO and upload",
      "Dedicated manager",
      "Monthly growth report",
      "Licensed music & sound effects",
      "Project dashboard access",
      "Animated captions",
      "3 revisions per video",
    ],
  },
  {
    name: "Pro",
    tagline: "For creators going full-time",
    price: 1799,
    items: [
      { key: "long", label: "long videos", qty: 12 },
      { key: "short", label: "short videos", qty: 24 },
      { key: "thumbs", label: "thumbnails (2 per video)", qty: 24 },
    ],
    free: [
      "Strategy and channel management",
      "Dedicated manager",
      "Weekly growth reports",
      "Licensed music & sound effects",
      "Project dashboard access",
      "Animated captions",
      "Thumbnail A/B testing",
      "Priority 24h delivery",
      "Unlimited revisions",
    ],
  },
].map((p) => {
  const items = p.items.map((it) => ({ ...it, rate: rate(it.key as ItemKey) }));
  const value = items.reduce((s, it) => s + it.qty * it.rate, 0);
  return { ...p, items, value, save: value - p.price };
});

/** Opens a Gmail draft to us with the subject and message filled in; they just hit send. */
const mailLink = (subject: string, body: string) =>
  `https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

/** Animates between values so the total "counts" as you change things. */
function Money({ value }: { value: number }) {
  const [v, setV] = React.useState(value);
  const from = React.useRef(value);
  React.useEffect(() => {
    const c = animate(from.current, value, {
      duration: 0.4,
      ease: "easeOut",
      onUpdate: (x) => {
        from.current = x;
        setV(x);
      },
    });
    return () => c.stop();
  }, [value]);
  return <>{usd(v)}</>;
}

function SectionHead({
  label,
  title,
  sub,
  as: H = "h2",
}: {
  label: string;
  title: React.ReactNode;
  sub: string;
  as?: "h1" | "h2";
}) {
  return (
    <div className="flex flex-col items-center text-center mb-10 md:mb-14">
      <span className="inline-flex items-center gap-2 rounded-full border border-neutral-200/70 dark:border-white/10 bg-white/60 dark:bg-white/[0.04] backdrop-blur-md px-3 py-1 text-xs font-semibold text-neutral-600 dark:text-neutral-300 uppercase tracking-wider">
        <span className="h-1.5 w-1.5 rounded-full bg-[#ff4d31] animate-pulse" />
        {label}
      </span>
      <H className="mt-6 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-950 dark:text-white">
        {title}
      </H>
      <p className="mt-5 max-w-2xl text-lg text-neutral-600 dark:text-neutral-400">{sub}</p>
    </div>
  );
}

const card =
  "rounded-3xl border border-white/40 dark:border-white/10 liquid-glass dark:!bg-white/[0.03] shadow-2xl shadow-black/5";

/* ---------- Part 1: build your own ---------- */
function Builder() {
  const [sel, setSel] = React.useState<Selection>({
    counts: { short: 8, long: 2, thumbs: 2 },
    extras: { ...none },
  });
  const q = quote(sel);
  const setCount = (k: ItemKey, n: number) =>
    setSel((s) => ({ ...s, counts: { ...s.counts, [k]: Math.max(0, Math.min(MAX, n || 0)) } }));
  const toggle = (k: ExtraKey) =>
    setSel((s) => ({ ...s, extras: { ...s.extras, [k]: !s.extras[k] } }));

  const message = [
    "Hi Vertex Media House team,",
    "",
    "I'd like to get started with this custom monthly package:",
    "",
    ...q.lines.map((l) => `- ${l.qty} × ${l.name} (${usd(l.amount)})`),
    "",
    `Estimated total: ${usd(q.total)}/month`,
    "",
    "Could we set up a quick call to go over the details?",
    "",
    "Thanks!",
  ].join("\n");

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_380px] gap-6 items-start">
      <div className={cn(card, "p-4 sm:p-6 md:p-8")}>
        <p className="font-mono text-xs uppercase tracking-widest text-neutral-500">Per month</p>
        <ul className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 [&>li:last-child]:col-span-2 sm:[&>li:last-child]:col-span-1">
          {ITEMS.map((it) => {
            const Icon = services[it.slug].icon;
            const n = sel.counts[it.key];
            return (
              <li
                key={it.key}
                className={cn(
                  "flex flex-col rounded-2xl border p-4 transition-colors",
                  n > 0
                    ? "border-[#ff4d31]/50 bg-[#ff4d31]/[0.04]"
                    : "border-neutral-200/70 dark:border-white/10 bg-white/70 dark:bg-white/[0.03]",
                )}
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10 text-[#ff4d31]">
                  <Icon className="h-5 w-5" />
                </span>
                <p className="mt-3 font-semibold leading-tight text-neutral-900 dark:text-white">
                  {it.name}
                </p>
                <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">{it.hint}</p>
                <p className="mt-2 text-sm font-semibold text-neutral-900 dark:text-white">
                  {usd(it.rate)} <span className="font-normal text-neutral-500">/ {it.unit}</span>
                </p>
                <div className="mt-auto pt-4">
                  <div className="flex items-center justify-between rounded-xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-white/[0.04]">
                    <button
                      type="button"
                      onClick={() => setCount(it.key, n - 1)}
                      disabled={n === 0}
                      aria-label={`Fewer ${it.name}`}
                      className="flex h-9 w-9 items-center justify-center text-neutral-600 dark:text-neutral-300 disabled:opacity-30"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <input
                      type="number"
                      inputMode="numeric"
                      min={0}
                      max={MAX}
                      value={n}
                      onChange={(e) => setCount(it.key, e.target.valueAsNumber)}
                      aria-label={it.name}
                      className="h-9 w-10 bg-transparent text-center font-semibold tabular-nums text-neutral-900 dark:text-white outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    />
                    <button
                      type="button"
                      onClick={() => setCount(it.key, n + 1)}
                      aria-label={`More ${it.name}`}
                      className="flex h-9 w-9 items-center justify-center text-neutral-600 dark:text-neutral-300"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        <p className="mt-6 font-mono text-xs uppercase tracking-widest text-neutral-500">Add-ons</p>
        <div className="mt-4 space-y-3">
          {EXTRAS.map((ex) => {
            const on = sel.extras[ex.key];
            const Icon = services[ex.slug].icon;
            return (
              <button
                key={ex.key}
                type="button"
                onClick={() => toggle(ex.key)}
                aria-pressed={on}
                className={cn(
                  "flex w-full items-start gap-3 rounded-2xl border p-4 text-left transition-colors",
                  on
                    ? "border-[#ff4d31]/60 bg-[#ff4d31]/[0.06]"
                    : "border-neutral-200/70 dark:border-white/10 bg-white/70 dark:bg-white/[0.03] hover:border-neutral-300 dark:hover:border-white/20",
                )}
              >
                <span
                  className={cn(
                    "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors",
                    on
                      ? "border-[#ff4d31] bg-[#ff4d31] text-white"
                      : "border-neutral-300 dark:border-white/20",
                  )}
                >
                  {on && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
                </span>
                <Icon className="mt-0.5 h-5 w-5 shrink-0 text-[#ff4d31]" />
                <span className="min-w-0 flex-1">
                  <span className="flex items-baseline justify-between gap-2">
                    <span className="font-semibold text-neutral-900 dark:text-white">
                      {ex.name}
                    </span>
                    <span className="shrink-0 text-xs font-semibold text-[#ff4d31]">
                      +{usd(ex.rate)}/{ex.per}
                    </span>
                  </span>
                  <span className="mt-0.5 block text-sm text-neutral-500 dark:text-neutral-400">
                    {ex.desc}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* The bill */}
      <div className="lg:sticky lg:top-28">
        <div className={cn(card, "overflow-hidden font-mono text-sm")}>
          <div className="flex items-start justify-between gap-4 border-b border-dashed border-neutral-300 dark:border-white/15 p-6">
            <div>
              <Logo wordmark className="[&_svg]:h-5 [&_svg]:w-5 [&>span:last-child]:text-lg" />
              <p className="mt-2 text-[11px] text-neutral-500">vertexmediahouse.com</p>
            </div>
            <div className="text-right">
              <p className="text-xs font-bold uppercase tracking-widest text-neutral-900 dark:text-white">
                Estimate
              </p>
              <p className="mt-1 text-[11px] text-neutral-500">Billed monthly</p>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-[1fr_auto_auto] gap-x-4 border-b border-neutral-200/70 dark:border-white/10 pb-2 text-[10px] uppercase tracking-widest text-neutral-500">
              <span>Item</span>
              <span className="text-right">Qty</span>
              <span className="w-16 text-right">Amount</span>
            </div>
            {q.lines.length ? (
              <ul className="divide-y divide-neutral-200/50 dark:divide-white/5">
                {q.lines.map((l) => (
                  <li
                    key={l.name}
                    className="grid grid-cols-[1fr_auto_auto] items-baseline gap-x-4 py-2.5"
                  >
                    <span className="min-w-0 font-sans text-neutral-800 dark:text-neutral-200">
                      {l.name}
                      <span className="block font-mono text-[11px] text-neutral-500">
                        @ {usd(l.rate)}
                      </span>
                    </span>
                    <span className="text-right tabular-nums text-neutral-600 dark:text-neutral-400">
                      {l.qty}
                    </span>
                    <span className="w-16 text-right tabular-nums text-neutral-900 dark:text-white">
                      {usd(l.amount)}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="py-6 text-center font-sans text-neutral-500">
                Add a few videos to start your bill.
              </p>
            )}

            <div className="mt-4 flex items-end justify-between gap-3 rounded-2xl bg-neutral-950 dark:bg-white px-4 py-3.5 text-white dark:text-neutral-950">
              <span className="text-[11px] uppercase tracking-widest opacity-70">
                Total
                <span className="block normal-case tracking-normal">per month</span>
              </span>
              <span className="font-sans text-3xl font-bold tracking-tight tabular-nums">
                <Money value={q.total} />
              </span>
            </div>
          </div>
        </div>

        <a
          href={mailLink(`Custom package enquiry: ${usd(q.total)}/month`, message)}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-green-500 px-6 py-3.5 font-semibold text-white shadow-lg shadow-green-500/25 transition-all hover:bg-green-600 hover:scale-[1.02]"
        >
          <Mail className="h-5 w-5" />
          Let's connect
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </a>
        <p className="mt-3 text-center text-xs text-neutral-500">
          Opens Gmail with this bill ready to send. Final quote after a quick chat.
        </p>
      </div>
    </div>
  );
}

/* ---------- Part 2: ready-made plans ---------- */
function Breakdown({ plan }: { plan: (typeof plans)[number] }) {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="relative mt-4 overflow-hidden rounded-2xl border border-neutral-200/70 dark:border-white/10 bg-white/70 dark:bg-white/[0.03] p-5">
      <div
        aria-hidden={!open}
        className={cn(
          "text-sm transition-[filter,opacity] duration-500",
          open ? "blur-none opacity-100" : "pointer-events-none select-none blur-[6px] opacity-60",
        )}
      >
        <p className="flex justify-between border-b border-neutral-200/70 dark:border-white/10 pb-2 font-mono text-[10px] uppercase tracking-widest text-neutral-500">
          <span>Item</span>
          <span>Cost</span>
        </p>
        <div className="space-y-2 py-3">
          {plan.items.map((it) => (
            <p key={it.label} className="flex justify-between gap-3">
              <span className="text-neutral-600 dark:text-neutral-400">
                {it.qty} {it.label} × {usd(it.rate)}
              </span>
              <span className="tabular-nums text-neutral-900 dark:text-white">
                {usd(it.qty * it.rate)}
              </span>
            </p>
          ))}
          {plan.free.map((f) => (
            <p key={f} className="flex justify-between gap-3">
              <span className="text-neutral-600 dark:text-neutral-400">{f}</span>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">Free</span>
            </p>
          ))}
        </div>
        <div className="space-y-2 border-t border-dashed border-neutral-300 dark:border-white/15 pt-3">
          <p className="flex justify-between gap-3">
            <span className="text-neutral-600 dark:text-neutral-400">Total value</span>
            <span className="tabular-nums text-neutral-500 line-through">{usd(plan.value)}</span>
          </p>
          <p className="flex justify-between gap-3 font-semibold">
            <span className="text-neutral-900 dark:text-white">You pay</span>
            <span className="tabular-nums">
              <span className="text-[#ff4d31]">{usd(plan.price)}</span>{" "}
              <span className="text-emerald-600 dark:text-emerald-400">
                (save {usd(plan.save)})
              </span>
            </span>
          </p>
        </div>
      </div>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className={cn(
          "flex items-center justify-center gap-2 rounded-xl text-sm font-semibold transition-all",
          open
            ? "mt-4 w-full border border-neutral-200 dark:border-white/10 py-2 text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white"
            : "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-neutral-900 px-5 py-2.5 text-white shadow-xl shadow-black/20 hover:scale-[1.03] dark:bg-white dark:text-neutral-900",
        )}
      >
        {open ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        {open ? "Hide breakdown" : "See breakdown"}
      </button>
    </div>
  );
}

function Plans() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {plans.map((p, i) => (
        <motion.div
          key={p.name}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.12 }}
          className="flex flex-col"
        >
          <div
            className={cn(
              card,
              "relative flex flex-1 flex-col p-6 md:p-8",
              p.popular && "border-[#ff4d31]/50 dark:border-[#ff4d31]/50 dark:!bg-white/[0.06]",
            )}
          >
            {p.popular && (
              <span className="absolute top-0 right-6 rounded-b-lg bg-[#ff4d31] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg shadow-[#ff4d31]/30">
                ⭐ Most popular
              </span>
            )}
            <h3
              className={cn(
                "text-2xl font-bold tracking-tight",
                p.popular ? "text-[#ff4d31]" : "text-neutral-900 dark:text-white",
              )}
            >
              {p.name}
            </h3>
            <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">{p.tagline}</p>
            <div className="mt-6 flex items-center justify-between gap-3 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3">
              <span className="flex items-center gap-2 text-sm font-semibold text-emerald-700 dark:text-emerald-400">
                <BadgePercent className="h-5 w-5" />
                You save {usd(p.save)}/mo
              </span>
              <span className="rounded-full bg-emerald-500 px-2 py-0.5 text-xs font-bold text-white">
                {Math.round((p.save / p.value) * 100)}% off
              </span>
            </div>
            <p className="mt-5 text-sm text-neutral-500 line-through tabular-nums">
              {usd(p.value)}/month total value
            </p>
            <p className="mt-0.5 flex items-baseline gap-1.5">
              <span className="text-4xl font-bold tracking-tight tabular-nums text-neutral-950 dark:text-white">
                {usd(p.price)}
              </span>
              <span className="text-neutral-500">/ month</span>
            </p>
            <p className="mt-1 text-xs text-neutral-500">
              That's {usd(p.save * 12)} saved every year.
            </p>
            <ul className="mt-6 mb-8 space-y-2.5">
              {p.items.map((it) => (
                <li
                  key={it.label}
                  className="flex items-start gap-2.5 text-sm text-neutral-700 dark:text-neutral-300"
                >
                  <Check
                    className={cn(
                      "mt-0.5 h-4 w-4 shrink-0",
                      p.popular ? "text-[#ff4d31]" : "text-neutral-400",
                    )}
                  />
                  {it.qty} {it.label} / month
                </li>
              ))}
              {p.free.map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-2.5 text-sm text-neutral-700 dark:text-neutral-300"
                >
                  <Check
                    className={cn(
                      "mt-0.5 h-4 w-4 shrink-0",
                      p.popular ? "text-[#ff4d31]" : "text-neutral-400",
                    )}
                  />
                  <span className="flex-1">{f}</span>
                  <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                    Free
                  </span>
                </li>
              ))}
            </ul>
            <a
              href={mailLink(
                `${p.name} plan enquiry: ${usd(p.price)}/month`,
                [
                  "Hi Vertex Media House team,",
                  "",
                  `I'm interested in the ${p.name} plan (${usd(p.price)}/month):`,
                  "",
                  ...p.items.map((it) => `- ${it.qty} ${it.label}`),
                  ...p.free.map((f) => `- ${f} (free)`),
                  "",
                  "Could we set up a quick call to get started?",
                  "",
                  "Thanks!",
                ].join("\n"),
              )}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "mt-auto flex items-center justify-center gap-2 rounded-xl px-6 py-3 font-semibold transition-transform hover:scale-[1.02]",
                p.popular
                  ? "bg-[#ff4d31] text-white shadow-lg shadow-[#ff4d31]/20"
                  : "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900",
              )}
            >
              Choose {p.name}
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          <Breakdown plan={p} />
        </motion.div>
      ))}
    </div>
  );
}

export function PricingSections() {
  return (
    <>
      <section className="relative w-full overflow-hidden px-4 sm:px-6 md:px-8 pt-10 pb-12 md:pt-16 md:pb-20">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background: "radial-gradient(60% 50% at 50% 0%, rgba(255,77,49,0.08), transparent 70%)",
          }}
        />
        <div className="relative mx-auto max-w-7xl">
          <SectionHead
            as="h1"
            label="Pricing"
            title={
              <>
                Build your own <span className="text-[#ff4d31]">package.</span>
              </>
            }
            sub="Pick what you need each month. Your price updates as you go."
          />
          <Builder />
        </div>
      </section>

      <section className="relative w-full overflow-hidden px-4 sm:px-6 md:px-8 py-12 md:py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neutral-300/60 dark:via-white/10 to-transparent"
        />
        <div className="relative mx-auto max-w-7xl">
          <SectionHead
            label="Packages"
            title={
              <>
                Or save with a <span className="text-[#ff4d31]">ready-made plan.</span>
              </>
            }
            sub="Same work as ordering each video on its own, for less, with extras thrown in free."
          />
          <Plans />
        </div>
      </section>
    </>
  );
}
