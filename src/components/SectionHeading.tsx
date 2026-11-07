"use client";

import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Chapter-style heading used by every section so the page reads like
 * a film in parts: "Chapter 02 — About", then a big title that slides
 * up from behind a mask.
 */
export default function SectionHeading({
  chapter,
  label,
  title,
  intro,
  align = "left",
}: {
  chapter: string;
  label: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  align?: "left" | "center";
}) {
  const centered = align === "center";
  return (
    <div className={centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className={`flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-neon-3 ${
          centered ? "justify-center" : ""
        }`}
      >
        <span>Chapter {chapter}</span>
        <motion.span
          initial={{ width: 0 }}
          whileInView={{ width: 40 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease }}
          className="h-px bg-neon/60"
        />
        <span className="text-muted">{label}</span>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="shown"
        viewport={{ once: true, margin: "-80px" }}
        className="mt-4 overflow-hidden pb-1"
      >
        <motion.h2
          variants={{ hidden: { y: "105%" }, shown: { y: "0%" } }}
          transition={{ duration: 0.9, ease }}
          className="text-4xl font-black uppercase leading-[0.95] tracking-tighter text-foreground sm:text-5xl md:text-6xl"
        >
          {title}
        </motion.h2>
      </motion.div>

      {intro && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.25, ease }}
          className={`mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg ${
            centered ? "mx-auto" : ""
          }`}
        >
          {intro}
        </motion.p>
      )}
    </div>
  );
}
