"use client";

import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";

const stack = [
  "React", "Next.js", "TypeScript", "Tailwind CSS", "Vite",
  "Rust", "Tauri", "Python", "FastAPI",
  "Node.js", "Express", "PostgreSQL", "Prisma", "tRPC",
  "Docker", "CI/CD", "Vitest", "Playwright", "Git",
];

const groups = [
  { title: "Frontend", note: "What people see and click", skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Vite"] },
  { title: "Backend", note: "Data, logic and APIs", skills: ["Node.js", "Express", "Python", "FastAPI", "PostgreSQL", "Prisma", "REST / tRPC"] },
  { title: "Desktop", note: "Native desktop apps · shipped on macOS", skills: ["Rust", "Tauri", "React"] },
  { title: "Tooling", note: "Shipping and testing", skills: ["Git", "Docker", "CI/CD", "Vitest", "Playwright"] },
];

export default function Skills() {
  return (
    <section id="skills" className="border-t border-border py-24 sm:py-32">
      <div className="mx-auto page-width px-6">
        <SectionHeading chapter="03" label="Stack" title="The toolkit" />
      </div>

      <div className="relative my-14 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
        <div className="flex whitespace-nowrap">
          <div className="animate-marquee flex shrink-0 gap-10 pr-10 text-3xl font-black uppercase tracking-tighter text-foreground/15 sm:text-5xl">
            {[...stack, ...stack].map((s, i) => (
              <span key={i} className="flex items-center gap-10">
                <span className="text-lg text-neon/60">◆</span> {s}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto page-width px-6">
        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {groups.map((g, i) => (
            <motion.div
              key={g.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-surface p-7"
            >
              <div className="flex items-baseline justify-between">
                <h3 className="text-xl font-bold text-foreground">{g.title}</h3>
                <span className="font-mono text-xs text-muted">0{i + 1}</span>
              </div>
              <p className="mt-1 text-sm text-muted">{g.note}</p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {g.skills.map((s) => (
                  <li
                    key={s}
                    className="rounded-full border border-border px-3 py-1 text-sm text-foreground/80 transition-colors hover:border-neon hover:text-neon-3"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
