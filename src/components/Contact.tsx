"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./icons";
import SectionHeading from "./SectionHeading";

export default function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden border-t border-border">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-neon/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6 py-28 sm:py-40">
        <SectionHeading
          align="center"
          chapter="04"
          label="Contact"
          title={
            <>
              Let&apos;s build something{" "}
              <span className="bg-gradient-to-r from-neon to-neon-3 bg-clip-text text-transparent">
                together
              </span>
            </>
          }
          intro="Need a web app, a SaaS or a native desktop app? I'm open to full-time roles, freelance work, and interesting collaborations. Reach out and I'll get back to you soon."
        />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="mt-10 flex flex-col items-center gap-8"
        >
          <a
            href="mailto:sheenleen2@gmail.com"
            className="group glow-border inline-flex items-center gap-2 rounded-full bg-neon px-7 py-3.5 text-sm font-semibold text-white transition-transform hover:scale-105"
          >
            <Mail size={16} />
            sheenleen2@gmail.com
            <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/Em-driod"
              target="_blank"
              rel="noreferrer"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-foreground transition-colors hover:border-neon hover:text-neon"
              aria-label="GitHub"
            >
              <GithubIcon size={18} />
            </a>
            <a
              href="https://www.linkedin.com/in/emmanuel-eseyin-525a14397/"
              target="_blank"
              rel="noreferrer"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-foreground transition-colors hover:border-neon hover:text-neon"
              aria-label="LinkedIn"
            >
              <LinkedinIcon size={18} />
            </a>
          </div>
        </motion.div>
      </div>

      <footer className="relative flex flex-col items-center justify-between gap-2 border-t border-border px-6 py-6 font-mono text-[11px] uppercase tracking-[0.2em] text-muted sm:flex-row sm:px-10">
        <span>© {new Date().getFullYear()} Eseyin Emmanuel</span>
        <span>The end · thanks for watching</span>
      </footer>
    </section>
  );
}
