"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { profile } from "@/lib/data";

export default function Hero() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let reveal: (() => void) | null = null;
    let resetTl: (() => void) | null = null;

    const ctx = gsap.context(() => {
      const chars = gsap.utils.toArray<HTMLElement>("[data-hchar]");
      gsap.set(chars, { yPercent: 120 });
      gsap.set(".hero-fade", { opacity: 0, y: 20 });
      gsap.set(".hero-glow", { scale: 0.6, opacity: 0 });

      // built paused — plays when the lamp is switched on
      const tl = gsap.timeline({ paused: true });
      tl.to(".hero-glow", { scale: 1, opacity: 1, duration: 1.6, ease: "power2.out" })
        .to(
          chars,
          { yPercent: 0, duration: 1.1, ease: "expo.out", stagger: 0.035 },
          "-=1.3"
        )
        .to(
          ".hero-fade",
          { opacity: 1, y: 0, duration: 0.9, ease: "expo.out", stagger: 0.12 },
          "-=0.7"
        );

      // subtle parallax drift on the whole hero as you scroll
      gsap.to(".hero-title", {
        yPercent: 18,
        opacity: 0.15,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      reveal = () => tl.play();
      resetTl = () => tl.pause(0);
      window.addEventListener("lamp:on", reveal);
      window.addEventListener("lamp:off", resetTl);
    }, root);

    return () => {
      if (reveal) window.removeEventListener("lamp:on", reveal);
      if (resetTl) window.removeEventListener("lamp:off", resetTl);
      ctx.revert();
    };
  }, []);

  const line1 = "Om";
  const line2 = "Pathania";

  const renderChars = (word: string, accent = false) =>
    word.split("").map((c, i) => (
      <span key={i} className="reveal-line" style={{ display: "inline-block" }}>
        <span
          data-hchar
          className={accent ? "italic text-accent" : ""}
          style={{ display: "inline-block", willChange: "transform" }}
        >
          {c}
        </span>
      </span>
    ));

  return (
    <section
      id="top"
      ref={root}
      className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden pb-10 pt-32 md:pb-16"
    >
      {/* ambient glow */}
      <div
        className="hero-glow pointer-events-none absolute left-1/2 top-1/3 -z-10 h-[70vw] w-[70vw] -translate-x-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgb(var(--accent-soft) / 0.30) 0%, rgb(var(--accent) / 0.10) 40%, transparent 70%)",
          filter: "blur(20px)",
        }}
      />

      <div className="container-editorial">
        <div className="hero-fade flex items-center gap-3 font-sans text-xs uppercase tracking-[0.3em] text-content-dim">
          <span className="h-px w-8 bg-accent" />
          {profile.role}
        </div>
      </div>

      <div className="container-editorial">
        <h1 className="hero-title font-serif font-light leading-[0.85] tracking-tightest text-content">
          <span className="block overflow-hidden text-[15vw] md:text-[11vw] lg:text-[9rem]">
            {renderChars(line1)}
          </span>
          <span className="block overflow-hidden text-[15vw] md:text-[11vw] lg:text-[9rem]">
            {renderChars(line2, true)}
          </span>
        </h1>
      </div>

      <div className="container-editorial">
        <div className="flex flex-col gap-8 border-t hairline pt-8 md:flex-row md:items-end md:justify-between">
          <p className="hero-fade max-w-md font-sans text-base leading-relaxed text-content-soft md:text-lg">
            {profile.tagline}
          </p>
          <div className="hero-fade flex items-center gap-6 font-sans text-sm text-content-dim">
            <span>{profile.location}</span>
            <a href="#work" className="group flex items-center gap-2 text-content">
              Scroll
              <span className="inline-block transition-transform group-hover:translate-y-1">
                ↓
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
