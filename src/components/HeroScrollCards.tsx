"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./icons";

const wipe = {
  hidden: { clipPath: "inset(0 100% 0 0)" },
  visible: {
    clipPath: "inset(0 0% 0 0)",
    transition: { duration: 0.55, ease: [0.65, 0, 0.35, 1] as const },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } },
};

const shards = [
  { top: "0%", left: "58%", w: "1px", h: "38%", rotate: -18, delay: 1.0 },
  { top: "55%", left: "70%", w: "1px", h: "30%", rotate: -18, delay: 1.15 },
  { top: "20%", left: "88%", w: "1px", h: "22%", rotate: -18, delay: 1.3 },
];

function useTimecode() {
  const [frame, setFrame] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setFrame((f) => f + 1), 1000 / 24);
    return () => clearInterval(id);
  }, []);
  const totalSeconds = Math.floor(frame / 24);
  const mm = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
  const ss = String(totalSeconds % 60).padStart(2, "0");
  const ff = String(frame % 24).padStart(2, "0");
  return `${mm}:${ss}:${ff}`;
}

export default function HeroScrollCards() {
  const timecode = useTimecode();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const spring = { stiffness: 60, damping: 20, mass: 0.4 };
  const textX = useSpring(useTransform(mouseX, [-0.5, 0.5], [4, -4]), spring);

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <div
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="relative min-h-screen overflow-hidden bg-background"
    >
      {/* letterbox bars */}
      <motion.div
        initial={{ height: "12vh" }}
        animate={{ height: 0 }}
        transition={{ duration: 1.1, delay: 1.6, ease: [0.83, 0, 0.17, 1] }}
        className="absolute inset-x-0 top-0 z-30 bg-black"
      />
      <motion.div
        initial={{ height: "12vh" }}
        animate={{ height: 0 }}
        transition={{ duration: 1.1, delay: 1.6, ease: [0.83, 0, 0.17, 1] }}
        className="absolute inset-x-0 bottom-0 z-30 bg-black"
      />

      {/* sharp accent shards */}
      {shards.map((s, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scaleY: 0 }}
          animate={{ opacity: 0.5, scaleY: 1 }}
          transition={{ duration: 0.6, delay: s.delay, ease: "easeOut" }}
          className="pointer-events-none absolute origin-top bg-neon/50"
          style={{
            top: s.top,
            left: s.left,
            width: s.w,
            height: s.h,
            transform: `rotate(${s.rotate}deg)`,
          }}
        />
      ))}

      {/* viewfinder corner brackets */}
      {[
        "left-6 top-24 border-l-2 border-t-2",
        "right-6 top-24 border-r-2 border-t-2",
        "left-6 bottom-16 border-l-2 border-b-2",
        "right-6 bottom-16 border-r-2 border-b-2",
      ].map((pos, i) => (
        <motion.div
          key={pos}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 0.4, delay: 1.7 + i * 0.05 }}
          className={`pointer-events-none absolute z-30 h-6 w-6 border-neon/60 ${pos}`}
        />
      ))}

      {/* one-time light sweep */}
      <motion.div
        initial={{ x: "-120%" }}
        animate={{ x: "120%" }}
        transition={{ duration: 1.6, delay: 0.6, ease: "easeInOut" }}
        className="pointer-events-none absolute inset-y-0 left-0 z-20 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent"
      />

      {/* camera HUD */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        className="pointer-events-none absolute right-6 top-[4.5rem] z-30 hidden sm:flex items-center gap-2 font-mono text-[11px] text-white/70"
      >
        <span className="flicker h-1.5 w-1.5 rounded-full bg-red-500" />
        REC {timecode}
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.9, duration: 0.6 }}
        className="pointer-events-none absolute left-6 top-[4.5rem] z-30 font-mono text-[11px] text-white/50"
      >
        50mm &middot; f/1.8
      </motion.div>

      <Pendant />

      <motion.div
        animate={{ scale: [1, 1.012, 1] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-10 flex min-h-screen flex-col"
      >
        <motion.div
          style={{ x: textX }}
          className="mx-auto flex w-full max-w-4xl flex-1 flex-col justify-center px-6 py-24 sm:px-10 md:px-14"
        >
          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mb-6 font-mono text-xs uppercase tracking-[0.35em] text-neon/80"
          >
            Portfolio of
          </motion.p>

          <div className="overflow-hidden">
            <motion.h1
              initial="hidden"
              animate="visible"
              variants={wipe}
              className="text-5xl font-black uppercase leading-[0.88] tracking-tighter text-white sm:text-6xl md:text-7xl"
            >
              Eseyin
            </motion.h1>
          </div>
          <div className="overflow-hidden">
            <motion.h1
              initial="hidden"
              animate="visible"
              variants={wipe}
              transition={{ delay: 0.15 }}
              className="bg-gradient-to-r from-neon to-neon-2 bg-clip-text text-5xl font-black uppercase leading-[0.88] tracking-tighter text-transparent drop-shadow-[0_0_30px_rgba(234,88,12,0.4)] sm:text-6xl md:text-7xl"
            >
              Emmanuel.
            </motion.h1>
          </div>

          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ delay: 0.75 }}
            className="mt-8 max-w-md text-base leading-relaxed text-white/60 sm:text-lg"
          >
            Software developer. I build software with a business model
            attached — five live products shipped, each one designed to
            stand on its own as a real business, not a demo.
          </motion.p>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ delay: 0.9 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <a
              href="#work"
              className="group inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:border-neon hover:bg-neon hover:text-white"
            >
              View my work
              <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href="https://github.com/Em-driod"
              target="_blank"
              rel="noreferrer"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-neon hover:text-neon"
              aria-label="GitHub"
            >
              <GithubIcon size={18} />
            </a>
            <a
              href="https://www.linkedin.com/in/emmanuel-eseyin-525a14397/"
              target="_blank"
              rel="noreferrer"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-neon hover:text-neon"
              aria-label="LinkedIn"
            >
              <LinkedinIcon size={18} />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="mt-16 flex items-center gap-4"
          >
            <motion.span
              initial={{ width: 0 }}
              animate={{ width: 40 }}
              transition={{ delay: 1.4, duration: 0.6 }}
              className="h-px bg-neon/60"
            />
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-white/40">
              5 products &middot; 1 developer
            </span>
          </motion.div>
        </motion.div>

      </motion.div>
    </div>
  );
}

function Pendant() {
  const [spins, setSpins] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setSpins((s) => s + 1), 9000);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.div
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="absolute right-8 top-0 z-30 sm:right-16 md:right-24"
    >
      <motion.div
        animate={{ rotate: [-7, 7, -7] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "top center" }}
        className="flex flex-col items-center"
      >
        {/* chain */}
        <div className="flex flex-col items-center">
          {Array.from({ length: 9 }).map((_, i) => (
            <ChainLink key={i} index={i} horizontal={i % 2 === 1} />
          ))}
        </div>

        {/* pendant */}
        <div className="relative -mt-1" style={{ perspective: 900 }}>
          <motion.div
            animate={{
              rotateY: spins * 360,
              scale: spins > 0 ? [1, 1.06, 0.98, 1] : 1,
            }}
            transition={{
              rotateY: { duration: 1.8, ease: [0.22, 1, 0.36, 1] },
              scale: { duration: 1.8, times: [0, 0.5, 0.8, 1], ease: "easeInOut" },
            }}
            className="glow-border relative h-44 w-44 overflow-hidden rounded-full border-2 border-neon/50 shadow-[0_20px_60px_-12px_rgba(234,88,12,0.6)] sm:h-56 sm:w-56 md:h-64 md:w-64"
          >
            <Image
              src="/image.png"
              alt="Eseyin Emmanuel"
              fill
              priority
              quality={100}
              className="object-cover"
              sizes="256px"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-neon-2/20 via-transparent to-black/30 mix-blend-multiply" />

            {/* specular sweep, replays on every spin */}
            {spins > 0 && (
              <motion.div
                key={spins}
                initial={{ x: "-130%", opacity: 0 }}
                animate={{ x: "130%", opacity: [0, 0.9, 0] }}
                transition={{ duration: 1.8, ease: "easeInOut" }}
                className="pointer-events-none absolute inset-y-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/70 to-transparent mix-blend-overlay"
              />
            )}
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ChainLink({ index, horizontal }: { index: number; horizontal: boolean }) {
  return (
    <div
      className={
        horizontal
          ? "relative h-3 w-[22px] shrink-0 sm:h-3.5 sm:w-7"
          : "relative h-[22px] w-3 shrink-0 sm:h-7 sm:w-3.5"
      }
      style={{
        marginTop: index === 0 ? 0 : -7,
        zIndex: 20 - index,
      }}
    >
      {/* metal ring */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "linear-gradient(135deg, #fff8e6 0%, #fdba74 22%, #f97316 45%, #9a3412 72%, #431407 100%)",
          boxShadow:
            "0 2px 3px rgba(0,0,0,0.55), 0 0 0 1px rgba(0,0,0,0.3), inset 0 1px 1px rgba(255,255,255,0.6)",
        }}
      />
      {/* punched-through hole */}
      <div className="absolute inset-[3px] rounded-full bg-background sm:inset-[4px]" />
    </div>
  );
}
