"use client";

import { motion } from "framer-motion";

const stats = [
  { label: "products_shipped", value: "5" },
  { label: "live_apps", value: "5" },
  { label: "industries", value: "4" },
];

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="mb-8 sm:mb-12"
      >
        <p className="font-mono text-sm text-neon">// about_me</p>
        <h2 className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl">
          About
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="glow-border overflow-hidden rounded-lg border border-border bg-surface md:col-span-3"
        >
          <div className="flex items-center gap-1.5 border-b border-border bg-surface-2 px-4 py-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-neon-2/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-warn/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-neon/70" />
            <span className="ml-3 text-xs text-muted">about.md</span>
          </div>
          <div className="p-5 font-mono text-sm leading-relaxed text-muted sm:p-6">
            <p>
              <span className="text-neon-3">&gt;</span> I&apos;m Eseyin
              Emmanuel, a software developer. I don&apos;t just write code —
              I build software with a business model attached.
            </p>
            <p className="mt-4">
              <span className="text-neon-3">&gt;</span> That&apos;s meant
              shipping real, live products across different niches: a
              business operating system, a fitness-industry SaaS, an
              e-commerce conversion tool, a music distribution platform, and
              a food ordering storefront.
            </p>
            <p className="mt-4">
              <span className="text-neon-3">&gt;</span> Each one is built to
              stand on its own as a product people actually pay for — not
              just a demo.
            </p>
            <p className="mt-4 text-foreground">
              <span className="text-neon-3">&gt;</span> If it doesn&apos;t
              make sense as a business, I don&apos;t build it.
              <span className="caret text-neon">_</span>
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-3 gap-3 self-start sm:gap-4 md:col-span-2 md:grid-cols-1"
        >
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-lg border border-border bg-surface p-4 transition-colors hover:border-neon/40 sm:p-5"
            >
              <div className="glow-text font-mono text-xl font-bold text-neon sm:text-2xl">
                {s.value}
              </div>
              <div className="mt-1 truncate font-mono text-[10px] text-muted sm:text-xs">
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
