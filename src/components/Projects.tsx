"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import OpacityFade from "./OpacityFade";

const projects = [
  {
    title: "Morniy",
    tag: "Business OS",
    description:
      "An operating system for running a business — bringing the tools founders need to manage operations into one place.",
    tags: ["Business Tools", "SaaS"],
    image: "/morniylaptop.jpeg",
    href: "https://morniy.online",
  },
  {
    title: "Hone",
    tag: "Fitness SaaS",
    description:
      "A client manager for personal trainers — track who has sessions left, log client history, and get paid, without chasing anyone on WhatsApp.",
    tags: ["SaaS", "Client Management"],
    image: "/honelaptop.png",
    href: "https://forge-vkjd.vercel.app",
  },
  {
    title: "LiquidLift",
    tag: "E-commerce",
    description:
      "A Shopify app that shows personalized video offers at high-intent moments, like cart abandonment, to recover sales stores already paid to bring in.",
    tags: ["Shopify App", "E-commerce"],
    image: "/liquidlaptop.png",
    href: "https://liquidlift-app-eight.vercel.app",
  },
  {
    title: "Ayinz",
    tag: "Music",
    description: "A music distribution platform for independent artists.",
    tags: ["Music Distribution"],
    image: "/ayinzlaptop.jpeg",
    href: "https://www.ayinz.com",
  },
  {
    title: "AtmosFood",
    tag: "Food Ordering",
    description: "An online storefront for ordering food.",
    tags: ["E-commerce", "Food"],
    image: "/atmoslaptop.jpeg",
    href: "https://www.atmostfood.shop/",
  },
];

const N = projects.length;
const STEP = 1 / N;
const EDGE = STEP * 0.32;

function useProjectMotion(
  progress: ReturnType<typeof useSpring>,
  i: number,
  direction: 1 | -1
) {
  const start = i * STEP;
  const end = (i + 1) * STEP;
  const opacity = useTransform(
    progress,
    [start, start + EDGE, end - EDGE, end],
    i === 0 ? [1, 1, 1, 0] : i === N - 1 ? [0, 1, 1, 1] : [0, 1, 1, 0]
  );
  const scale = useTransform(
    progress,
    [start, start + EDGE, end - EDGE, end],
    i === 0 ? [1, 1, 1, 0.9] : i === N - 1 ? [0.9, 1, 1, 1] : [0.9, 1, 1, 0.9]
  );
  const blurAmt = useTransform(
    progress,
    [start, start + EDGE, end - EDGE, end],
    i === 0 ? [0, 0, 0, 3] : i === N - 1 ? [3, 0, 0, 0] : [3, 0, 0, 3]
  );
  const blur = useTransform(blurAmt, (v) => `blur(${v}px)`);
  const y = useTransform(progress, [start, end], [24 * direction, -24 * direction]);
  return { opacity, scale, blur, y };
}

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 });

  const [active, setActive] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.min(N - 1, Math.max(0, Math.floor(v * N)));
    setActive(idx);
  });

  return (
    <section id="work" className="relative">
      <div ref={containerRef} className="relative" style={{ height: `${N * 100}vh` }}>
        <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#1a0f08]">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(234,88,12,0.2),transparent_55%)]" />

          <div className="relative mx-auto flex h-full max-w-6xl flex-col justify-center px-6">
            <div className="mb-10 flex items-center justify-between">
              <div>
                <p className="font-mono text-sm text-neon-3">// selected_work</p>
                <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Projects
                </h2>
              </div>
              <div className="hidden items-center gap-2 sm:flex">
                {projects.map((_, i) => (
                  <span key={i} className="relative h-1.5 w-8 overflow-hidden rounded-full bg-white/15">
                    <motion.span
                      className="absolute inset-y-0 left-0 bg-neon-3"
                      animate={{ width: i === active ? "100%" : "0%" }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2" style={{ perspective: 1600 }}>
              <div className="relative aspect-video w-full">
                {projects.map((p, i) => {
                  const { opacity, scale, blur, y } = useProjectMotion(progress, i, 1);
                  return (
                    <OpacityFade
                      key={p.title}
                      value={opacity}
                      className={`absolute inset-0 ${i === active ? "pointer-events-auto" : "pointer-events-none"}`}
                    >
                      <motion.a
                        href={p.href}
                        target="_blank"
                        rel="noreferrer"
                        style={{ y, scale, filter: blur }}
                        whileHover={{ scale: 1.02, y: -6 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="glow-border group relative block h-full w-full cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-surface-2 shadow-[0_30px_80px_-25px_rgba(234,88,12,0.5)]"
                      >
                        <Image
                          src={p.image}
                          alt={p.title}
                          fill
                          quality={95}
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 90vw, 640px"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/30 px-2.5 py-1 font-mono text-xs text-white/80 backdrop-blur-sm">
                          {String(i + 1).padStart(2, "0")} / {String(N).padStart(2, "0")}
                        </span>
                        <span className="absolute bottom-4 right-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                          <ArrowUpRight size={16} />
                        </span>
                      </motion.a>
                    </OpacityFade>
                  );
                })}
              </div>

              <div className="relative min-h-[16rem]">
                {projects.map((p, i) => {
                  const { opacity, y } = useProjectMotion(progress, i, -1);
                  return (
                    <OpacityFade
                      key={p.title}
                      value={opacity}
                      className={`absolute inset-0 ${i === active ? "pointer-events-auto" : "pointer-events-none"}`}
                    >
                      <motion.div style={{ y }}>
                        <p className="font-mono text-xs uppercase tracking-widest text-neon-3">
                          {p.tag}
                        </p>
                        <a
                          href={p.href}
                          target="_blank"
                          rel="noreferrer"
                          className="group mt-2 flex w-fit items-center gap-2"
                        >
                          <h3 className="text-2xl font-semibold text-white sm:text-3xl">
                            {p.title}
                          </h3>
                          <ArrowUpRight
                            size={20}
                            className="text-white/60 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-neon-3"
                          />
                        </a>
                        <p className="mt-4 max-w-md text-sm leading-relaxed text-white/60">
                          {p.description}
                        </p>
                        <div className="mt-5 flex flex-wrap gap-2">
                          {p.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded border border-white/15 px-2.5 py-1 font-mono text-[11px] text-white/70"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <a
                          href={p.href}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-5 inline-flex w-fit items-center gap-2 font-mono text-xs text-neon-3 hover:underline"
                        >
                          visit site →
                        </a>
                      </motion.div>
                    </OpacityFade>
                  );
                })}
              </div>
            </div>

            <p className="mt-10 font-mono text-xs text-white/40">scroll to browse ↓</p>
          </div>
        </div>
      </div>
    </section>
  );
}
