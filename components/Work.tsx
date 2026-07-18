"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitReveal } from "./anim";
import { projects } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

function ProjectRow({
  index,
  title,
  kind,
  period,
  blurb,
  stack,
}: (typeof projects)[number]) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(el, { opacity: 1, y: 0 });
      return;
    }
    gsap.set(el, { opacity: 0, y: 60 });
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      once: true,
      onEnter: () =>
        gsap.to(el, { opacity: 1, y: 0, duration: 1, ease: "expo.out" }),
    });
    return () => st.kill();
  }, []);

  return (
    <article
      ref={ref}
      data-cursor="hover"
      className="group relative grid cursor-pointer grid-cols-1 gap-6 border-t hairline py-10 transition-colors md:grid-cols-12 md:gap-8 md:py-14"
    >
      {/* hover wash */}
      <div className="pointer-events-none absolute inset-0 -z-10 origin-bottom scale-y-0 bg-surface-800 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100" />

      <div className="flex items-baseline gap-4 md:col-span-1">
        <span className="font-sans text-sm text-content-dim">{index}</span>
      </div>

      <div className="md:col-span-5">
        <h3 className="font-serif text-2xl font-light leading-tight text-content transition-transform duration-500 group-hover:translate-x-3 md:text-4xl">
          {title}
        </h3>
        <p className="mt-3 font-sans text-sm uppercase tracking-[0.2em] text-accent">
          {kind}
        </p>
      </div>

      <div className="md:col-span-4">
        <p className="font-sans text-base leading-relaxed text-content-soft">
          {blurb}
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {stack.map((s) => (
            <span
              key={s}
              className="rounded-full border hairline px-3 py-1 font-sans text-xs text-content-dim"
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-start justify-between md:col-span-2 md:flex-col md:items-end md:justify-between">
        <span className="font-sans text-sm text-content-dim">{period}</span>
        <span className="mt-4 inline-block text-accent opacity-0 transition-all duration-500 group-hover:translate-x-1 group-hover:opacity-100">
          ↗
        </span>
      </div>
    </article>
  );
}

export default function Work() {
  return (
    <section id="work" className="container-editorial py-28 md:py-40">
      <div className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SplitReveal
          text="Selected Work"
          as="h2"
          className="font-serif text-4xl font-light leading-none text-content md:text-6xl"
        />
        <p className="max-w-xs font-sans text-sm text-content-dim">
          A cross-section of research, product, and systems work — from quantum
          optics to interactive AI.
        </p>
      </div>

      <div>
        {projects.map((p) => (
          <ProjectRow key={p.index} {...p} />
        ))}
        <div className="border-t hairline" />
      </div>
    </section>
  );
}
