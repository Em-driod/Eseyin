"use client";

import { motion } from "framer-motion";

const stack = [
  "React", "Next.js", "TypeScript", "Tailwind CSS", "Vite",
  "Node.js", "Express", "PostgreSQL", "Prisma", "tRPC",
  "Docker", "CI/CD", "Vitest", "Playwright", "Git",
];

const groups = [
  { title: "frontend/", skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Vite"] },
  { title: "backend/", skills: ["Node.js", "Express", "PostgreSQL", "Prisma", "REST / tRPC"] },
  { title: "tooling/", skills: ["Git", "Docker", "CI/CD", "Vitest", "Playwright"] },
];

export default function Skills() {
  return (
    <section id="skills" className="border-y border-border py-24">
      <div className="mb-12 overflow-hidden">
        <div className="flex whitespace-nowrap">
          <div className="animate-marquee flex shrink-0 gap-8 pr-8 font-mono text-lg text-muted">
            {[...stack, ...stack].map((s, i) => (
              <span key={i} className="flex items-center gap-8">
                <span className="text-neon">◆</span> {s}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-8 font-mono text-sm text-neon"
        >
          // stack.json
        </motion.p>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {groups.map((g, i) => (
            <motion.div
              key={g.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-lg border border-border bg-surface p-6"
            >
              <h3 className="font-mono text-sm text-neon-3">{g.title}</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {g.skills.map((s) => (
                  <li
                    key={s}
                    className="rounded border border-border px-3 py-1 font-mono text-sm text-muted transition-colors hover:border-neon hover:text-neon"
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
