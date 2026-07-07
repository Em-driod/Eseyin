"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./icons";

export default function Contact() {
  return (
    <section id="contact" className="border-t border-border">
      <div className="relative mx-auto max-w-6xl px-6 py-24 text-center">
        <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-neon/10 blur-[100px]" />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="font-mono text-sm text-neon">// get_in_touch</p>
          <h2 className="glow-text mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
            Let&apos;s build something together
          </h2>
          <p className="mx-auto mt-4 max-w-md text-muted">
            Open to full-time roles, freelance work, and interesting
            collaborations. Reach out and I&apos;ll get back to you soon.
          </p>
          <a
            href="mailto:sheenleen2@gmail.com"
            className="group glow-border mt-8 inline-flex items-center gap-2 rounded bg-neon px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-105"
          >
            <Mail size={16} />
            sheenleen2@gmail.com
            <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
          <div className="mt-8 flex items-center justify-center gap-4">
            <a
              href="https://github.com/Em-driod"
              target="_blank"
              rel="noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded border border-border text-foreground transition-colors hover:border-neon hover:text-neon"
              aria-label="GitHub"
            >
              <GithubIcon size={18} />
            </a>
            <a
              href="https://www.linkedin.com/in/emmanuel-eseyin-525a14397/"
              target="_blank"
              rel="noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded border border-border text-foreground transition-colors hover:border-neon hover:text-neon"
              aria-label="LinkedIn"
            >
              <LinkedinIcon size={18} />
            </a>
          </div>
        </motion.div>
      </div>
      <footer className="border-t border-border px-6 py-6 text-center font-mono text-xs text-muted">
        © {new Date().getFullYear()} eseyin_emmanuel — built with Next.js &amp; Tailwind CSS
      </footer>
    </section>
  );
}
