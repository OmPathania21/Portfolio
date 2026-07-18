"use client";

import {
  useRef,
  useEffect,
  ReactNode,
  ElementType,
  createElement,
} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ */
/*  SplitReveal — masked word-by-word headline reveal on scroll        */
/* ------------------------------------------------------------------ */
export function SplitReveal({
  text,
  as = "h2",
  className = "",
  delay = 0,
  stagger = 0.06,
}: {
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const words = el.querySelectorAll<HTMLElement>("[data-word]");
    gsap.set(words, { yPercent: 118, rotate: 3 });

    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 88%",
      once: true,
      onEnter: () => {
        gsap.to(words, {
          yPercent: 0,
          rotate: 0,
          duration: 0.9,
          ease: "expo.out",
          stagger,
          delay,
        });
      },
    });
    return () => st.kill();
  }, [delay, stagger]);

  const words = text.split(" ");

  return createElement(
    as,
    { ref, className },
    words.map((w, i) => (
      <span
        key={i}
        className="reveal-line align-bottom"
        style={{ display: "inline-block" }}
      >
        <span data-word style={{ display: "inline-block", willChange: "transform" }}>
          {w}
        </span>
        {i < words.length - 1 ? " " : ""}
      </span>
    ))
  );
}

/* ------------------------------------------------------------------ */
/*  FadeUp — generic scroll reveal wrapper                             */
/* ------------------------------------------------------------------ */
export function FadeUp({
  children,
  className = "",
  delay = 0,
  y = 26,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: ElementType;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(el, { opacity: 1, y: 0 });
      return;
    }
    gsap.set(el, { opacity: 0, y });
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 90%",
      once: true,
      onEnter: () =>
        gsap.to(el, { opacity: 1, y: 0, duration: 0.9, ease: "expo.out", delay }),
    });
    return () => st.kill();
  }, [delay, y]);

  return createElement(as, { ref, className }, children);
}

/* ------------------------------------------------------------------ */
/*  Magnetic — button/element that leans toward the cursor            */
/* ------------------------------------------------------------------ */
export function Magnetic({
  children,
  className = "",
  strength = 0.4,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "elastic.out(1, 0.4)" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "elastic.out(1, 0.4)" });

    const move = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top + r.height / 2);
      xTo(x * strength);
      yTo(y * strength);
    };
    const leave = () => {
      xTo(0);
      yTo(0);
    };
    el.addEventListener("mousemove", move);
    el.addEventListener("mouseleave", leave);
    return () => {
      el.removeEventListener("mousemove", move);
      el.removeEventListener("mouseleave", leave);
    };
  }, [strength]);

  return (
    <div ref={ref} className={className} style={{ display: "inline-block" }}>
      {children}
    </div>
  );
}
