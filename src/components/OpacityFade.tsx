"use client";

import { useRef } from "react";
import { useMotionValueEvent, type MotionValue } from "framer-motion";

export default function OpacityFade({
  value,
  children,
  className,
}: {
  value: MotionValue<number>;
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useMotionValueEvent(value, "change", (v) => {
    if (ref.current) ref.current.style.opacity = String(v);
  });
  return (
    <div ref={ref} className={className} style={{ opacity: value.get() }}>
      {children}
    </div>
  );
}
