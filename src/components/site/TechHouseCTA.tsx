import { motion } from "framer-motion";
import { ArrowUpRight, Code2, Workflow, Database, Plug } from "lucide-react";

const TECH_HOUSE = "https://vertextechhouse.com";

const lines = [
  ["vertex build --website", "deployed in 14 days"],
  ["vertex automate --crm", "38 workflows live"],
  ["vertex connect --stripe --hubspot", "synced"],
  ["vertex ai --agent support", "answering 24/7"],
];

const offers = [
  { icon: Code2, label: "Websites & web apps" },
  { icon: Workflow, label: "AI automation" },
  { icon: Database, label: "CRM setup" },
  { icon: Plug, label: "Integrations" },
];

export function TechHouseCTA() {
  return (
    <section className="relative w-full px-4 sm:px-6 md:px-8 py-12 md:py-16">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl border border-black/10 dark:border-white/10 bg-neutral-950 text-white">
        {/* blueprint grid + glow */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.06) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
            maskImage: "radial-gradient(ellipse at 30% 50%, black 20%, transparent 75%)",
          }}
        />
        <div
          aria-hidden
          className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#ff4d31]/25 blur-3xl"
        />
        <div
          aria-hidden
          className="absolute -right-16 -bottom-24 h-72 w-72 rounded-full bg-sky-500/20 blur-3xl"
        />

        <div className="relative grid lg:grid-cols-2 gap-10 p-6 sm:p-10 md:p-14 items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-sky-300">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-400 animate-pulse" />
              Our sister studio
            </span>
            <h2 className="mt-6 text-4xl md:text-5xl font-bold tracking-tight leading-[1.05]">
              Need something <span className="text-sky-400">technical?</span>
            </h2>
            <p className="mt-5 max-w-lg text-lg text-neutral-400">
              We make the content. <b className="text-white font-semibold">Vertex Tech House</b>{" "}
              builds the tech behind it: websites, automations, CRMs and AI tools that run your
              business while you create.
            </p>

            <ul className="mt-7 grid grid-cols-2 gap-3 max-w-md">
              {offers.map((o) => (
                <li key={o.label} className="flex items-center gap-2.5 text-sm text-neutral-300">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 ring-1 ring-white/10 text-sky-300">
                    <o.icon className="h-4 w-4" />
                  </span>
                  {o.label}
                </li>
              ))}
            </ul>

            <a
              href={TECH_HOUSE}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-9 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 font-semibold text-neutral-950 transition-transform hover:scale-[1.03]"
            >
              Visit Vertex Tech House
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          {/* Terminal */}
          <div className="rounded-2xl border border-white/10 bg-black/60 backdrop-blur shadow-2xl shadow-black/50 overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
              <span className="ml-2 font-mono text-xs text-neutral-500">vertextechhouse.com</span>
            </div>
            <div className="p-5 md:p-6 font-mono text-xs md:text-sm space-y-4">
              {lines.map(([cmd, out], i) => (
                <motion.div
                  key={cmd}
                  initial={{ opacity: 0, y: 6 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ delay: 0.3 + i * 0.5 }}
                >
                  <p className="text-neutral-300">
                    <span className="text-sky-400">$</span> {cmd}
                  </p>
                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ delay: 0.6 + i * 0.5 }}
                    className="text-emerald-400"
                  >
                    ✓ {out}
                  </motion.p>
                </motion.div>
              ))}
              <p className="text-neutral-300">
                <span className="text-sky-400">$</span>{" "}
                <span className="inline-block h-4 w-2 -mb-0.5 bg-neutral-300 animate-pulse" />
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
