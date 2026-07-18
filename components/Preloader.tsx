"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDone(true);
      return;
    }
    document.body.style.overflow = "hidden";
    const counter = { v: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = "";
        setDone(true);
      },
    });

    tl.to(counter, {
      v: 100,
      duration: 2,
      ease: "power2.inOut",
      onUpdate: () => {
        if (countRef.current)
          countRef.current.textContent = String(Math.round(counter.v)).padStart(2, "0");
      },
    })
      .to(".pl-word", {
        yPercent: -110,
        duration: 0.7,
        ease: "expo.inOut",
        stagger: 0.08,
      })
      .to(
        root.current,
        { yPercent: -100, duration: 1, ease: "expo.inOut" },
        "-=0.2"
      );

    return () => {
      document.body.style.overflow = "";
      tl.kill();
    };
  }, []);

  if (done) return null;

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[10000] flex flex-col justify-between bg-surface px-6 py-8 md:px-12 md:py-12"
    >
      <div className="flex items-start justify-between font-sans text-xs uppercase tracking-[0.3em] text-content-dim">
        <span>Om Pathania</span>
        <span>Portfolio ’26</span>
      </div>

      <div className="overflow-hidden">
        <div className="pl-word font-serif text-[15vw] font-light leading-none text-content md:text-[10vw]">
          Crafting
        </div>
      </div>

      <div className="flex items-end justify-between">
        <div className="overflow-hidden">
          <div className="pl-word font-serif text-[15vw] font-light italic leading-none text-accent md:text-[10vw]">
            software.
          </div>
        </div>
        <span
          ref={countRef}
          className="font-sans text-2xl tabular-nums text-content-dim md:text-4xl"
        >
          00
        </span>
      </div>
    </div>
  );
}
