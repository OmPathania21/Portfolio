"use client";

import { SplitReveal, FadeUp } from "./anim";
import { experience } from "@/lib/data";

export default function Path() {
  return (
    <section id="path" className="border-t hairline bg-surface-800/40">
      <div className="container-editorial py-28 md:py-40">
        <div className="mb-16 flex items-center gap-3 font-sans text-xs uppercase tracking-[0.3em] text-content-dim">
          <span className="h-px w-8 bg-accent" />
          The Path
        </div>

        <SplitReveal
          text="Where I’ve been building"
          as="h2"
          className="mb-20 font-serif text-4xl font-light leading-[0.95] text-content md:text-6xl"
        />

        {/* Experience */}
        <div className="space-y-0">
          {experience.map((e, i) => (
            <FadeUp
              key={e.org}
              delay={i * 0.05}
              className="grid gap-4 border-t hairline py-10 md:grid-cols-12 md:gap-8"
            >
              <div className="md:col-span-4">
                <h3 className="font-serif text-2xl font-light text-content md:text-3xl">
                  {e.org}
                </h3>
                <p className="mt-1 font-sans text-sm text-accent">{e.role}</p>
                <p className="mt-2 font-sans text-sm text-content-dim">
                  {e.period}
                  {e.place ? ` · ${e.place}` : ""}
                </p>
              </div>
              <ul className="space-y-3 md:col-span-8">
                {e.points.map((p, j) => (
                  <li
                    key={j}
                    className="flex gap-4 font-sans text-base leading-relaxed text-content-soft"
                  >
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                    {p}
                  </li>
                ))}
              </ul>
            </FadeUp>
          ))}
          <div className="border-t hairline" />
        </div>
      </div>
    </section>
  );
}
