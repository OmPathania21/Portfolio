"use client";

import { SplitReveal, FadeUp, Magnetic } from "./anim";
import { profile } from "@/lib/data";

export default function Contact() {
  return (
    <footer
      id="contact"
      className="relative overflow-hidden border-t hairline"
    >
      {/* ambient glow */}
      <div
        className="pointer-events-none absolute bottom-[-30%] left-1/2 -z-10 h-[60vw] w-[60vw] -translate-x-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgb(var(--accent-soft) / 0.22) 0%, transparent 65%)",
          filter: "blur(30px)",
        }}
      />

      <div className="container-editorial py-28 md:py-40">
        <p className="mb-8 flex items-center gap-3 font-sans text-xs uppercase tracking-[0.3em] text-content-dim">
          <span className="h-px w-8 bg-accent" />
          Get in touch
        </p>

        <SplitReveal
          text="Let’s build something"
          as="h2"
          className="font-serif text-[9vw] font-light leading-[0.9] tracking-tightest text-content md:text-[5.5vw]"
        />
        <SplitReveal
          text="worth remembering."
          as="h2"
          className="font-serif text-[9vw] font-light italic leading-[0.9] tracking-tightest text-accent md:text-[5.5vw]"
          delay={0.15}
        />

        <div className="mt-16">
          <Magnetic strength={0.3}>
            <a
              href={`mailto:${profile.email}`}
              className="group inline-flex items-center gap-4 rounded-full border hairline px-8 py-5 font-sans text-lg text-content transition-colors hover:bg-content hover:text-surface"
            >
              {profile.email}
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </a>
          </Magnetic>
        </div>

        <div className="mt-24 grid gap-10 border-t hairline pt-10 md:grid-cols-3">
          <FadeUp>
            <p className="font-sans text-xs uppercase tracking-[0.2em] text-content-dim">
              Elsewhere
            </p>
            <div className="mt-4 flex flex-col gap-2">
              <a
                href={profile.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-content-soft transition-colors hover:text-accent"
              >
                GitHub ↗
              </a>
              <a
                href={profile.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-content-soft transition-colors hover:text-accent"
              >
                LinkedIn ↗
              </a>
            </div>
          </FadeUp>

          <FadeUp delay={0.05}>
            <p className="font-sans text-xs uppercase tracking-[0.2em] text-content-dim">
              Direct
            </p>
            <div className="mt-4 flex flex-col gap-2 font-sans text-content-soft">
              <a
                href={`tel:${profile.phone.replace(/\s/g, "")}`}
                className="transition-colors hover:text-accent"
              >
                {profile.phone}
              </a>
              <span>{profile.location}</span>
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <p className="font-sans text-xs uppercase tracking-[0.2em] text-content-dim">
              Currently
            </p>
            <p className="mt-4 font-sans text-content-soft">
              Software Engineering Intern @ FOSSEE, IIT Bombay · Open to new
              opportunities.
            </p>
          </FadeUp>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 font-sans text-xs text-content-dim md:flex-row md:items-center">
          <span>© {new Date().getFullYear()} Om Pathania</span>
          <span>Designed & built with Next.js, GSAP & care.</span>
          <a href="#top" className="transition-colors hover:text-accent">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
