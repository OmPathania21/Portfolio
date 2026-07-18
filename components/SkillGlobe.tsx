"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { SplitReveal } from "./anim";
import { globeSkills } from "@/lib/data";

type Pt = { x: number; y: number; z: number };

export default function SkillGlobe() {
  const wrap = useRef<HTMLDivElement>(null);
  const nodes = useRef<(HTMLButtonElement | null)[]>([]);
  const tip = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);
  const activeRef = useRef<number | null>(null);
  activeRef.current = active;

  useEffect(() => {
    const el = wrap.current!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const N = globeSkills.length;

    // Fibonacci sphere — evenly distributed base points
    const base: Pt[] = [];
    const golden = Math.PI * (1 + Math.sqrt(5));
    for (let i = 0; i < N; i++) {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / N);
      const theta = golden * i;
      base.push({
        x: Math.sin(phi) * Math.cos(theta),
        y: Math.sin(phi) * Math.sin(theta),
        z: Math.cos(phi),
      });
    }

    // rotation state + velocity, nudged by pointer position
    let ax = -0.25;
    let ay = 0;
    let vx = 0.0006;
    let vy = 0.0022;
    let tvx = vx;
    let tvy = vy;

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const nx = (e.clientX - r.left) / r.width - 0.5;
      const ny = (e.clientY - r.top) / r.height - 0.5;
      tvy = nx * 0.02;
      tvx = -ny * 0.02;
    };
    const onLeave = () => {
      tvx = 0.0006;
      tvy = 0.0022;
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);

    let raf = 0;
    const render = () => {
      const r = el.getBoundingClientRect();
      const R = Math.min(r.width, r.height) * 0.42;
      const frozen = activeRef.current !== null;

      // ease velocity toward target (or toward 0 while a chip is focused)
      const goalX = frozen ? 0 : tvx;
      const goalY = frozen ? 0 : tvy;
      vx += (goalX - vx) * 0.05;
      vy += (goalY - vy) * 0.05;
      ax += vx;
      ay += vy;

      const cosY = Math.cos(ay),
        sinY = Math.sin(ay);
      const cosX = Math.cos(ax),
        sinX = Math.sin(ax);

      for (let i = 0; i < N; i++) {
        const p = base[i];
        // rotate Y then X
        const x1 = p.x * cosY - p.z * sinY;
        const z1 = p.x * sinY + p.z * cosY;
        const y2 = p.y * cosX - z1 * sinX;
        const z2 = p.y * sinX + z1 * cosX;
        const x2 = x1;

        const depth = (z2 + 1) / 2; // 0 back .. 1 front
        const scale = 0.5 + depth * 0.7;
        const px = x2 * R;
        const py = y2 * R;

        const node = nodes.current[i];
        if (!node) continue;
        const isActive = activeRef.current === i;
        node.style.transform = `translate(-50%,-50%) translate3d(${px}px, ${py}px, 0) scale(${
          isActive ? 1.35 : scale
        })`;
        node.style.opacity = String(isActive ? 1 : 0.28 + depth * 0.72);
        node.style.zIndex = String(Math.round(depth * 100) + (isActive ? 200 : 0));
        node.style.filter = depth < 0.35 ? "blur(0.4px)" : "none";

        if (isActive && tip.current) {
          tip.current.style.transform = `translate(-50%, -140%) translate3d(${px}px, ${py}px, 0)`;
        }
      }
      raf = requestAnimationFrame(render);
    };

    if (reduce) {
      // static: lay chips out without spin
      vx = vy = tvx = tvy = 0;
      render();
      cancelAnimationFrame(raf);
      // one static frame
    } else {
      raf = requestAnimationFrame(render);
    }

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  const enter = (i: number) => {
    setActive(i);
    const node = nodes.current[i];
    if (node)
      gsap.to(node, {
        duration: 0.4,
        ease: "elastic.out(1,0.5)",
        overwrite: true,
      });
  };

  const categories = Array.from(new Set(globeSkills.map((s) => s.category)));

  return (
    <section id="toolkit" className="container-editorial py-28 md:py-40">
      <div className="mb-16 grid gap-6 md:grid-cols-12 md:items-end">
        <div className="md:col-span-8">
          <p className="mb-6 flex items-center gap-3 font-sans text-xs uppercase tracking-[0.3em] text-content-dim">
            <span className="h-px w-8 bg-accent" />
            The Toolkit
          </p>
          <SplitReveal
            text="A world of tools"
            as="h2"
            className="font-serif text-4xl font-light leading-none text-content md:text-6xl"
          />
        </div>
        <p className="font-sans text-sm text-content-dim md:col-span-4">
          Everything I build with — orbiting in one place. Hover any point to
          see what it is. Move your cursor to steer the globe.
        </p>
      </div>

      <div className="grid items-center gap-10 md:grid-cols-12">
        {/* Globe */}
        <div className="md:col-span-8">
          <div
            ref={wrap}
            className="relative mx-auto aspect-square w-full max-w-[620px]"
          >
            {/* backdrop rings */}
            <svg
              className="pointer-events-none absolute inset-0 h-full w-full opacity-40"
              viewBox="0 0 100 100"
              aria-hidden="true"
            >
              <circle cx="50" cy="50" r="42" className="stroke-accent/25" strokeWidth="0.15" fill="none" />
              <ellipse cx="50" cy="50" rx="42" ry="15" className="stroke-content/10" strokeWidth="0.15" fill="none" />
              <ellipse cx="50" cy="50" rx="15" ry="42" className="stroke-content/10" strokeWidth="0.15" fill="none" />
            </svg>
            {/* center glow */}
            <div
              className="pointer-events-none absolute left-1/2 top-1/2 h-1/2 w-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgb(var(--accent-soft) / 0.22), transparent 70%)",
                filter: "blur(12px)",
              }}
            />

            {/* skill chips */}
            <div className="absolute left-1/2 top-1/2 h-0 w-0">
              {globeSkills.map((s, i) => (
                <button
                  key={s.name}
                  ref={(n) => {
                    nodes.current[i] = n;
                  }}
                  onMouseEnter={() => enter(i)}
                  onMouseLeave={() => setActive(null)}
                  onFocus={() => enter(i)}
                  onBlur={() => setActive(null)}
                  className={`absolute left-0 top-0 whitespace-nowrap rounded-full border px-3 py-1 font-sans text-sm transition-colors duration-200 will-change-transform ${
                    active === i
                      ? "border-accent bg-accent text-surface"
                      : "border-content/15 bg-surface-800/60 text-content-soft hover:text-content"
                  }`}
                  style={{ backdropFilter: "blur(2px)" }}
                >
                  {s.name}
                </button>
              ))}

              {/* tooltip */}
              <div
                ref={tip}
                className={`pointer-events-none absolute left-0 top-0 z-[300] w-52 rounded-xl border border-accent/30 bg-surface-800/95 p-4 transition-opacity duration-200 ${
                  active !== null ? "opacity-100" : "opacity-0"
                }`}
                style={{ backdropFilter: "blur(8px)" }}
              >
                {active !== null && (
                  <>
                    <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-accent">
                      {globeSkills[active].category}
                    </p>
                    <p className="mt-1 font-serif text-xl font-light text-content">
                      {globeSkills[active].name}
                    </p>
                    <p className="mt-1 font-sans text-xs leading-snug text-content-dim">
                      {globeSkills[active].note}
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Legend / categories */}
        <div className="md:col-span-4">
          <p className="mb-5 font-sans text-xs uppercase tracking-[0.2em] text-content-dim">
            Categories
          </p>
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <span
                key={c}
                className="rounded-full border border-content/12 px-4 py-2 font-sans text-sm text-content-soft"
              >
                {c}
              </span>
            ))}
          </div>
          <p className="mt-8 font-sans text-sm leading-relaxed text-content-dim">
            {globeSkills.length} tools and counting — the palette I reach for when
            turning ideas into working software.
          </p>
        </div>
      </div>
    </section>
  );
}
