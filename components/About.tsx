"use client";

import { SplitReveal, FadeUp } from "./anim";

const philosophy =
  "I like problems that sit between disciplines — where software meets physics, healthcare, or infrastructure. I learn a stack by shipping in it, contribute in the open, and care about the details most people scroll past.";

const focus = [
  { k: "Now", v: "Engineering open-source CAD tooling at FOSSEE, IIT Bombay." },
  { k: "Exploring", v: "Photonic quantum computing & applied machine learning." },
  { k: "Believes", v: "The best interfaces feel inevitable — and a little alive." },
];

export default function About() {
  return (
    <section id="about" className="container-editorial py-28 md:py-40">
      <div className="grid gap-16 md:grid-cols-12">
        <div className="md:col-span-3">
          <FadeUp className="flex items-center gap-3 font-sans text-xs uppercase tracking-[0.3em] text-content-dim">
            <span className="h-px w-8 bg-accent" />
            About
          </FadeUp>
        </div>

        <div className="md:col-span-9">
          <SplitReveal
            text={philosophy}
            as="p"
            className="font-serif text-2xl font-light leading-[1.35] text-content md:text-4xl md:leading-[1.3]"
            stagger={0.012}
          />

          <div className="mt-20 grid gap-x-10 gap-y-10 border-t hairline pt-12 sm:grid-cols-3">
            {focus.map((f, i) => (
              <FadeUp key={f.k} delay={i * 0.06}>
                <h3 className="font-sans text-xs uppercase tracking-[0.2em] text-accent">
                  {f.k}
                </h3>
                <p className="mt-4 font-sans text-base leading-relaxed text-content-soft">
                  {f.v}
                </p>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
