"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "#work", label: "~/work" },
  { href: "#about", label: "~/about" },
  { href: "#skills", label: "~/stack" },
  { href: "#contact", label: "~/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/70 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a
          href="#top"
          className="flex items-center gap-2 font-mono text-sm font-medium tracking-tight text-foreground"
        >
          <span className="text-neon">▲</span>
          eseyin@emmanuel<span className="text-muted">:</span>
          <span className="text-neon-3">~</span>
          <span className="caret text-neon">_</span>
        </a>
        <div className="hidden items-center gap-8 sm:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-mono text-sm text-muted transition-colors hover:text-neon"
            >
              {l.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="hidden rounded border border-neon/40 px-4 py-1.5 font-mono text-sm text-neon transition-colors hover:bg-neon/10 sm:inline-block"
          >
            ./hire-me
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="flex h-9 w-9 items-center justify-center rounded border border-border text-foreground sm:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-border bg-background px-6 py-4 sm:hidden">
          <div className="flex flex-col gap-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="font-mono text-sm text-muted transition-colors hover:text-neon"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="w-fit rounded border border-neon/40 px-4 py-1.5 font-mono text-sm text-neon transition-colors hover:bg-neon/10"
            >
              ./hire-me
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
