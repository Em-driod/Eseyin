"use client";

import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";

const ease = [0.16, 1, 0.3, 1] as const;

const stats = [
  { label: "Products shipped", value: "5" },
  { label: "Live apps", value: "5" },
  { label: "Industries", value: "4" },
];

const paragraphs = [
  "I'm Eseyin Emmanuel, a software developer. I don't just write code — I build software with a business model attached.",
  "That's meant shipping real, live products across different niches: a business operating system, a fitness-industry SaaS, an e-commerce conversion tool, a music distribution platform, and a food ordering storefront.",
  "Each one is built to stand on its own as a product people actually pay for — not just a demo.",
];

export default function About() {
  return (
    <section id="about" className="relative border-t border-border">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32">
        <SectionHeading chapter="02" label="About" title="The developer" />

        <div className="mt-14 grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-10">
          {/* pull quote */}
          <motion.blockquote
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease }}
            className="relative md:col-span-6"
          >
            <span className="pointer-events-none absolute -left-2 -top-10 select-none text-[9rem] font-black leading-none text-neon/15">
              &ldquo;
            </span>
            <p className="relative text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl">
              If it doesn&apos;t make sense as a business,{" "}
              <span className="text-neon-3">I don&apos;t build it.</span>
            </p>
          </motion.blockquote>

          <div className="md:col-span-6">
            {paragraphs.map((t, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: i * 0.08, ease }}
                className={`text-base leading-relaxed text-muted sm:text-lg ${i ? "mt-5" : ""}`}
              >
                {t}
              </motion.p>
            ))}

            <div className="mt-12 grid grid-cols-3 divide-x divide-border border-y border-border">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
                  className="px-4 py-6 first:pl-0"
                >
                  <div className="text-4xl font-black tracking-tighter text-foreground sm:text-5xl">
                    {s.value}
                  </div>
                  <div className="mt-1 text-xs text-muted sm:text-sm">{s.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
