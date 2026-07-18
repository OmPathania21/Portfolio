"use client";

import { SplitReveal, FadeUp } from "./anim";
import { experience, education, certifications } from "@/lib/data";

export default function Path() {
  return (
    <section id="path" className="border-t hairline bg-ink-800/40">
      <div className="container-editorial py-28 md:py-40">
        <div className="mb-16 flex items-center gap-3 font-sans text-xs uppercase tracking-[0.3em] text-paper-dim">
          <span className="h-px w-8 bg-gold" />
          The Path
        </div>

        <SplitReveal
          text="Experience & education"
          as="h2"
          className="mb-20 font-serif text-5xl font-light leading-[0.95] text-paper md:text-8xl"
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
                <h3 className="font-serif text-2xl font-light text-paper md:text-3xl">
                  {e.org}
                </h3>
                <p className="mt-1 font-sans text-sm text-gold">{e.role}</p>
                <p className="mt-2 font-sans text-sm text-paper-dim">
                  {e.period}
                  {e.place ? ` · ${e.place}` : ""}
                </p>
              </div>
              <ul className="space-y-3 md:col-span-8">
                {e.points.map((p, j) => (
                  <li
                    key={j}
                    className="flex gap-4 font-sans text-base leading-relaxed text-paper-soft"
                  >
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold" />
                    {p}
                  </li>
                ))}
              </ul>
            </FadeUp>
          ))}
          <div className="border-t hairline" />
        </div>

        {/* Education + Certs */}
        <div className="mt-24 grid gap-16 md:grid-cols-12">
          <div className="md:col-span-7">
            <h3 className="mb-8 font-sans text-xs uppercase tracking-[0.2em] text-gold">
              Education
            </h3>
            <div className="space-y-8">
              {education.map((ed) => (
                <FadeUp key={ed.school} className="border-l hairline pl-6">
                  <h4 className="font-serif text-xl font-light text-paper">
                    {ed.school}
                  </h4>
                  <p className="mt-1 font-sans text-sm text-paper-soft">
                    {ed.detail} · {ed.period}
                    {ed.place ? ` · ${ed.place}` : ""}
                  </p>
                  {ed.note ? (
                    <p className="mt-2 font-sans text-sm text-paper-dim">
                      {ed.note}
                    </p>
                  ) : null}
                </FadeUp>
              ))}
            </div>
          </div>

          <div className="md:col-span-5">
            <h3 className="mb-8 font-sans text-xs uppercase tracking-[0.2em] text-gold">
              Certifications
            </h3>
            <ul className="space-y-4">
              {certifications.map((c) => (
                <FadeUp
                  key={c}
                  as="li"
                  className="flex gap-4 font-sans text-base text-paper-soft"
                >
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold" />
                  {c}
                </FadeUp>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
