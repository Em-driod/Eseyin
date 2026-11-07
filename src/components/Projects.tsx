"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "./SectionHeading";

type Project = {
  slug: string;
  title: string;
  tag: string;
  description: string;
  tags: string[];
  wide: string;
  close: string;
  href: string;
};

const projects: Project[] = [
  {
    slug: "morniy",
    title: "Morniy",
    tag: "Business OS",
    description:
      "An operating system for running a business — bringing the tools founders need to manage operations into one place.",
    tags: ["Business Tools", "SaaS"],
    wide: "/morniylaptop.jpeg",
    close: "/morniyphone.jpeg",
    href: "https://morniy.online",
  },
  {
    slug: "foige",
    title: "Foige",
    tag: "Fitness SaaS",
    description:
      "A client manager for personal trainers — track who has sessions left, log client history, and get paid, without chasing anyone on WhatsApp.",
    tags: ["SaaS", "Client Management"],
    wide: "/honelaptop.png",
    close: "/honephone.png",
    href: "https://foige.online",
  },
  {
    slug: "liquidlift",
    title: "LiquidLift",
    tag: "E-commerce",
    description:
      "A Shopify app that shows personalized video offers at high-intent moments, like cart abandonment, to recover sales stores already paid to bring in.",
    tags: ["Shopify App", "E-commerce"],
    wide: "/liquidlaptop.png",
    close: "/liquidphone.jpeg",
    href: "https://liquidlift-app-eight.vercel.app",
  },
  {
    slug: "ayinz",
    title: "Ayinz",
    tag: "Music",
    description: "A music distribution platform for independent artists.",
    tags: ["Music Distribution"],
    wide: "/ayinzlaptop.jpeg",
    close: "/ayinzphone.jpeg",
    href: "https://www.ayinz.com",
  },
  {
    slug: "atmosfood",
    title: "AtmosFood",
    tag: "Food Ordering",
    description: "An online storefront for ordering food.",
    tags: ["E-commerce", "Food"],
    wide: "/atmoslaptop.jpeg",
    close: "/atmosphone.png",
    href: "https://www.atmostfood.shop/",
  },
];

const N = projects.length;
const ease = [0.16, 1, 0.3, 1] as const;
const pad = (n: number) => String(n).padStart(2, "0");
const domain = (url: string) => new URL(url).hostname.replace(/^www\./, "");

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const railVisible = useInView(sectionRef, { margin: "-45% 0px -45% 0px" });
  const [active, setActive] = useState(0);

  return (
    <section id="work" ref={sectionRef} className="relative py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[60vh] bg-[radial-gradient(ellipse_at_20%_0%,rgba(234,88,12,0.14),transparent_60%)]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <SectionHeading
          chapter="01"
          label="Selected work"
          title={
            <>
              Five products.{" "}
              <span className="bg-gradient-to-r from-neon to-neon-3 bg-clip-text text-transparent">
                All live.
              </span>
            </>
          }
          intro="Each one is a real business people can use today. Keep scrolling to see them one by one — click any project to visit it."
        />
      </div>

      <ProgressRail visible={railVisible} active={active} />

      <div className="relative mt-16 sm:mt-24">
        {projects.map((p, i) => (
          <Scene key={p.slug} p={p} i={i} onActive={setActive} />
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* One project = one "scene": a wide establishing shot that opens up  */
/* like a film frame as you scroll to it, then a close-up shot that    */
/* drifts past. The page keeps scrolling normally the whole time.      */
/* ------------------------------------------------------------------ */
function Scene({
  p,
  i,
  onActive,
}: {
  p: Project;
  i: number;
  onActive: (i: number) => void;
}) {
  const reduce = useReducedMotion();
  const sceneRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLAnchorElement>(null);

  const isCentered = useInView(sceneRef, { margin: "-50% 0px -50% 0px" });
  useEffect(() => {
    if (isCentered) onActive(i);
  }, [isCentered, i, onActive]);

  // 0 → 1 while the frame travels from the bottom of the screen to the centre
  const { scrollYProgress: enter } = useScroll({
    target: frameRef,
    offset: ["start end", "center center"],
  });
  // 0 → 1 across the whole time the scene is on screen
  const { scrollYProgress: through } = useScroll({
    target: sceneRef,
    offset: ["start end", "end start"],
  });

  const clipPath = useTransform(
    enter,
    [0, 1],
    reduce
      ? ["inset(0% 0% 0% 0% round 18px)", "inset(0% 0% 0% 0% round 18px)"]
      : ["inset(12% 16% 12% 16% round 32px)", "inset(0% 0% 0% 0% round 18px)"]
  );
  const imgScale = useTransform(enter, [0, 1], reduce ? [1, 1] : [1.3, 1.04]);
  const imgY = useTransform(through, [0, 1], reduce ? ["0%", "0%"] : ["-4%", "4%"]);
  const shade = useTransform(enter, [0, 0.9], reduce ? [0, 0] : [0.75, 0]);
  const closeY = useTransform(through, [0, 1], reduce ? [0, 0] : [140, -140]);

  const flip = i % 2 === 1;

  return (
    <article
      id={`project-${p.slug}`}
      ref={sceneRef}
      className="relative mx-auto max-w-7xl scroll-mt-24 px-6 pb-28 sm:pb-40"
    >
      {/* title card */}
      <div className="mb-8 flex items-end justify-between gap-6 sm:mb-10">
        <div>
          <motion.p
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease }}
            className="font-mono text-[11px] uppercase tracking-[0.3em] text-neon-3"
          >
            Project {pad(i + 1)} · {p.tag}
          </motion.p>
          <motion.div
            initial="hidden"
            whileInView="shown"
            viewport={{ once: true, margin: "-60px" }}
            className="mt-3 overflow-hidden pb-1"
          >
            <motion.h3
              variants={{ hidden: { y: "105%" }, shown: { y: "0%" } }}
              transition={{ duration: 0.9, ease, delay: 0.05 }}
              className="text-5xl font-black uppercase leading-[0.9] tracking-tighter text-foreground sm:text-7xl md:text-8xl"
            >
              {p.title}
            </motion.h3>
          </motion.div>
        </div>
        <span className="hidden shrink-0 font-mono text-sm text-muted sm:block">
          <span className="text-foreground">{pad(i + 1)}</span> / {pad(N)}
        </span>
      </div>

      {/* wide shot */}
      <motion.a
        ref={frameRef}
        href={p.href}
        target="_blank"
        rel="noreferrer"
        aria-label={`Visit ${p.title} (opens in a new tab)`}
        style={{ clipPath }}
        className="group relative block aspect-[16/10] w-full overflow-hidden bg-surface-2 sm:aspect-[2.13/1]"
      >
        <motion.div style={{ scale: imgScale, y: imgY }} className="absolute inset-0">
          <Image
            src={p.wide}
            alt={`${p.title} shown on a laptop`}
            fill
            quality={90}
            sizes="(max-width: 1280px) 100vw, 1232px"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        </motion.div>

        {/* lights come up as the frame opens */}
        <motion.div style={{ opacity: shade }} className="absolute inset-0 bg-black" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/20" />

        {/* viewfinder corners */}
        {[
          "left-4 top-4 border-l border-t",
          "right-4 top-4 border-r border-t",
          "left-4 bottom-4 border-l border-b",
          "right-4 bottom-4 border-r border-b",
        ].map((pos) => (
          <span
            key={pos}
            className={`pointer-events-none absolute h-5 w-5 border-white/50 sm:h-7 sm:w-7 ${pos}`}
          />
        ))}

        <span className="absolute bottom-5 left-6 font-mono text-[11px] uppercase tracking-[0.25em] text-white/80 sm:bottom-7 sm:left-9">
          {domain(p.href)}
        </span>
        <span className="absolute bottom-4 right-5 flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-black transition-all duration-300 sm:bottom-6 sm:right-8 sm:translate-y-2 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100">
          Visit site <ArrowUpRight size={14} />
        </span>
      </motion.a>

      {/* details + close-up shot */}
      <div className="relative mt-10 grid grid-cols-1 gap-10 md:mt-0 md:grid-cols-12 md:gap-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease }}
          className={`md:col-span-5 md:pt-14 ${flip ? "md:order-2 md:col-start-8" : ""}`}
        >
          <p className="text-lg leading-relaxed text-foreground/85 sm:text-xl">
            {p.description}
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {p.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border px-3 py-1 font-mono text-[11px] text-muted"
              >
                {tag}
              </span>
            ))}
          </div>
          <a
            href={p.href}
            target="_blank"
            rel="noreferrer"
            className="group mt-8 inline-flex items-center gap-2 border-b border-neon/50 pb-1 text-sm font-semibold text-foreground transition-colors hover:border-neon hover:text-neon-3"
          >
            Visit {p.title}
            <ArrowUpRight
              size={16}
              className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </a>
        </motion.div>

        <motion.div
          style={{ y: closeY }}
          className={`relative hidden md:block md:col-span-6 ${
            flip ? "md:order-1 md:col-start-1" : "md:col-start-7"
          } md:-mt-24`}
        >
          <div className="relative aspect-[2.13/1] overflow-hidden rounded-2xl border border-white/10 shadow-[0_40px_90px_-30px_rgba(0,0,0,0.9)]">
            <Image
              src={p.close}
              alt={`${p.title} close-up on a phone`}
              fill
              quality={85}
              sizes="600px"
              className="object-cover"
            />
            <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
          </div>
          <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
            Close-up · on mobile
          </p>
        </motion.div>
      </div>
    </article>
  );
}

/* Fixed side index so visitors always know where they are: */
/* "project 2 of 5" — and can jump straight to any project.  */
function ProgressRail({ visible, active }: { visible: boolean; active: number }) {
  return (
    <motion.nav
      aria-label="Projects"
      initial={false}
      animate={{ opacity: visible ? 1 : 0, x: visible ? 0 : -12 }}
      transition={{ duration: 0.4, ease }}
      className={`fixed left-4 top-1/2 z-40 hidden -translate-y-1/2 xl:block ${
        visible ? "" : "pointer-events-none"
      }`}
    >
      <ol className="flex flex-col gap-3">
        {projects.map((p, i) => {
          const on = i === active;
          return (
            <li key={p.slug}>
              <a
                href={`#project-${p.slug}`}
                className="group flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em]"
              >
                <motion.span
                  animate={{ width: on ? 28 : 12 }}
                  transition={{ duration: 0.4, ease }}
                  className={`h-px ${on ? "bg-neon" : "bg-white/30 group-hover:bg-white/60"}`}
                />
                <span
                  className={`transition-colors ${
                    on ? "text-foreground" : "text-muted/60 group-hover:text-muted"
                  }`}
                >
                  {pad(i + 1)}
                  {on && <span className="ml-2 hidden min-[1600px]:inline">{p.title}</span>}
                </span>
              </a>
            </li>
          );
        })}
      </ol>
    </motion.nav>
  );
}
