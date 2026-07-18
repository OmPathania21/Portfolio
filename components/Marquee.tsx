"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const items = [
  "Python",
  "Open Source",
  "AI Systems",
  "3D CAD",
  "React",
  "Algorithms",
  "Quantum Computing",
  "Data Structures",
];

export default function Marquee() {
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = track.current!;
    // base infinite scroll
    const loop = gsap.to(el, {
      xPercent: -50,
      repeat: -1,
      duration: 24,
      ease: "none",
    });
    // velocity skew based on scroll direction
    const st = ScrollTrigger.create({
      onUpdate: (self) => {
        const v = gsap.utils.clamp(-3, 3, self.getVelocity() / 400);
        gsap.to(loop, { timeScale: 1 + Math.abs(v) * 0.6, overwrite: true });
      },
    });
    return () => {
      loop.kill();
      st.kill();
    };
  }, []);

  const row = [...items, ...items];

  return (
    <section className="relative overflow-hidden border-y hairline py-8">
      <div ref={track} className="flex w-max whitespace-nowrap">
        {row.map((t, i) => (
          <span
            key={i}
            className="mx-8 flex items-center gap-8 font-serif text-4xl font-light text-content-soft md:text-6xl"
          >
            {t}
            <span className="text-accent">✦</span>
          </span>
        ))}
      </div>
    </section>
  );
}
