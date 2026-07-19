"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Magnetic } from "./anim";
import ThemeToggle from "./ThemeToggle";

gsap.registerPlugin(ScrollTrigger);

const links = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Path", href: "#path" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const bar = useRef<HTMLElement>(null);
  const progress = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // entrance — plays once the lamp is switched on, hides again when off
    gsap.set(bar.current, { yPercent: -120, opacity: 0 });
    const reveal = () =>
      gsap.to(bar.current, {
        yPercent: 0,
        opacity: 1,
        duration: 1,
        ease: "expo.out",
      });
    const hide = () =>
      gsap.to(bar.current, {
        yPercent: -120,
        opacity: 0,
        duration: 0.4,
        ease: "power2.in",
      });
    window.addEventListener("lamp:on", reveal);
    window.addEventListener("lamp:off", hide);

    // scroll progress bar
    const st = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        if (progress.current)
          progress.current.style.transform = `scaleX(${self.progress})`;
      },
    });
    return () => {
      st.kill();
      window.removeEventListener("lamp:on", reveal);
      window.removeEventListener("lamp:off", hide);
    };
  }, []);

  return (
    <>
      <header
        ref={bar}
        className="glass-nav fixed inset-x-0 top-0 z-[900] opacity-0"
      >
        <div className="container-editorial flex items-center justify-between py-5">
          <a
            href="#top"
            className="font-serif text-lg tracking-tight text-content"
          >
            Om<span className="text-accent">.</span>
          </a>

          <nav className="hidden items-center gap-9 md:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="group relative font-sans text-sm text-content-soft transition-colors hover:text-content"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <ThemeToggle />
            <Magnetic className="inline-block">
              <a
                href="#contact"
                className="glass rounded-full px-5 py-2 font-sans text-sm text-content transition-colors hover:bg-content hover:text-surface"
              >
                Let’s talk
              </a>
            </Magnetic>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              aria-label="Toggle menu"
              onClick={() => setOpen((o) => !o)}
              className="flex h-10 w-10 flex-col items-center justify-center gap-1.5"
            >
            <span
              className={`h-px w-6 bg-content transition-transform duration-300 ${
                open ? "translate-y-[3.5px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-px w-6 bg-content transition-transform duration-300 ${
                open ? "-translate-y-[3.5px] -rotate-45" : ""
              }`}
            />
            </button>
          </div>
        </div>
        <div className="container-editorial">
          <div className="h-px w-full bg-content/10">
            <div
              ref={progress}
              className="h-px w-full origin-left scale-x-0 bg-accent"
            />
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      <div
        className={`glass fixed inset-0 z-[899] flex flex-col items-center justify-center gap-8 transition-all duration-500 md:hidden ${
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            onClick={() => setOpen(false)}
            className="font-serif text-4xl text-content"
          >
            {l.label}
          </a>
        ))}
      </div>
    </>
  );
}
