"use client";

import { useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Stack" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled || open
          ? "border-b border-white/5 bg-background/75 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex page-width items-center justify-between px-6 py-4">
        <a
          href="#top"
          className="flex items-center gap-2 font-mono text-sm font-medium tracking-tight text-foreground"
        >
          <span className="text-neon">▲</span>
          eseyin<span className="text-muted">.</span>emmanuel
        </a>
        <div className="hidden items-center gap-9 sm:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-muted transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="hidden rounded-full bg-foreground px-4 py-1.5 text-sm font-semibold text-background transition-colors hover:bg-neon hover:text-white sm:inline-block"
          >
            Hire me
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-foreground sm:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* reading progress — a thin "film reel" bar */}
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="absolute inset-x-0 bottom-0 h-px origin-left bg-gradient-to-r from-neon to-neon-3"
      />

      {open && (
        <div className="border-t border-white/5 px-6 py-5 sm:hidden">
          <div className="flex flex-col gap-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-base text-muted transition-colors hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="w-fit rounded-full bg-foreground px-4 py-1.5 text-sm font-semibold text-background"
            >
              Hire me
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
