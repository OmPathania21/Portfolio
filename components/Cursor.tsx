"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!canHover) return;

    const dot = dotRef.current!;
    const ring = ringRef.current!;

    const xTo = gsap.quickTo(ring, "x", { duration: 0.5, ease: "power3" });
    const yTo = gsap.quickTo(ring, "y", { duration: 0.5, ease: "power3" });
    const dxTo = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power3" });
    const dyTo = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power3" });

    const move = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      dxTo(e.clientX);
      dyTo(e.clientY);
    };

    const grow = () =>
      gsap.to(ring, { scale: 2.4, borderColor: "#C9A96A", duration: 0.3 });
    const shrink = () =>
      gsap.to(ring, { scale: 1, borderColor: "rgba(199,193,179,0.4)", duration: 0.3 });

    window.addEventListener("mousemove", move);

    const interactive = document.querySelectorAll(
      "a, button, [data-cursor='hover']"
    );
    interactive.forEach((el) => {
      el.addEventListener("mouseenter", grow);
      el.addEventListener("mouseleave", shrink);
    });

    return () => {
      window.removeEventListener("mousemove", move);
      interactive.forEach((el) => {
        el.removeEventListener("mouseenter", grow);
        el.removeEventListener("mouseleave", shrink);
      });
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] hidden md:block">
      <div
        ref={ringRef}
        className="absolute left-0 top-0 h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full border"
        style={{ borderColor: "rgba(199,193,179,0.4)" }}
      />
      <div
        ref={dotRef}
        className="absolute left-0 top-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold"
      />
    </div>
  );
}
