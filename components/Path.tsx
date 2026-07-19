"use client";

import { useState } from "react";
import { SplitReveal } from "./anim";
import LanyardSrm from "./LanyardSrm";
import LanyardQwiklabs from "./LanyardQwiklabs";
import LanyardSsit from "./LanyardSsit";
import { experience, type LanyardVariant } from "@/lib/data";

const LANYARDS: Record<LanyardVariant, () => JSX.Element> = {
  srm: LanyardSrm,
  qwiklabs: LanyardQwiklabs,
  ssit: LanyardSsit,
};

export default function Path() {
  const [active, setActive] = useState(0);
  const exp = experience[active];
  const Lanyard = LANYARDS[exp.lanyard];

  return (
    <section
      id="path"
      className="relative min-h-[820px] overflow-hidden border-t hairline bg-surface-800/40 md:min-h-[900px]"
    >
      <div className="container-editorial relative z-10 py-28 md:py-40">
        <div className="mb-16 flex items-center gap-3 font-sans text-xs uppercase tracking-[0.3em] text-content-dim">
          <span className="h-px w-8 bg-accent" />
          The Path
        </div>

        <SplitReveal
          text="Where I’ve been building"
          as="h2"
          className="mb-16 font-serif text-4xl font-light leading-[0.95] text-content md:text-6xl"
        />

        <div className="grid items-start gap-12 md:grid-cols-12 md:gap-8">
          {/* left column is left open for the resting lanyard */}
          <div className="hidden md:col-span-5 md:block" aria-hidden />

          {/* RIGHT — options + writing */}
          <div className="md:col-span-7">
            {/* options */}
            <div className="flex flex-wrap gap-2">
              {experience.map((e, i) => (
                <button
                  key={e.org}
                  onClick={() => setActive(i)}
                  className={`rounded-full px-4 py-2 font-sans text-sm transition-colors ${
                    i === active
                      ? "bg-accent text-surface"
                      : "glass text-content-soft hover:text-content"
                  }`}
                >
                  {e.org}
                </button>
              ))}
            </div>

            {/* writing */}
            <div key={active} className="exp-in mt-12">
              <h3 className="font-serif text-3xl font-light text-content md:text-4xl">
                {exp.org}
              </h3>
              <p className="mt-2 font-sans text-sm uppercase tracking-[0.2em] text-accent">
                {exp.role}
              </p>
              <p className="mt-2 font-sans text-sm text-content-dim">
                {exp.period}
                {exp.place ? ` · ${exp.place}` : ""}
              </p>

              <ul className="mt-8 space-y-4">
                {exp.points.map((p, j) => (
                  <li
                    key={j}
                    className="flex gap-4 font-sans text-base leading-relaxed text-content-soft"
                  >
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>

            <p className="mt-10 font-sans text-xs text-content-dim">
              Grab the card and drag it anywhere on the screen — it stays where you
              leave it.
            </p>
          </div>
        </div>
      </div>

      {/* full-width draggable lanyard overlay (paints above, only the card is interactive) */}
      <Lanyard />
    </section>
  );
}
