"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

type Line = { prompt?: string; text: string; kind: "cmd" | "out" | "ok" };

const script: Line[] = [
  { prompt: "om@portfolio:~$", text: "./boot.sh", kind: "cmd" },
  { text: "initializing creative environment…", kind: "out" },
  { text: "modules loaded ✓  motion ✓  ideas ✓", kind: "ok" },
  { prompt: "om@portfolio:~$", text: "whoami", kind: "cmd" },
  { text: "Om Pathania — CS undergrad & builder of things that move.", kind: "out" },
  { prompt: "om@portfolio:~$", text: "cat welcome.txt", kind: "cmd" },
  { text: "You found the light. Scroll down — the good part starts here.", kind: "ok" },
];

// scroll lock helpers (Lenis exposed by SmoothScroll)
const getLenis = () =>
  (window as unknown as { __lenis?: { stop: () => void; start: () => void } })
    .__lenis;

export default function LampGate() {
  const root = useRef<HTMLDivElement>(null);
  const glow = useRef<HTMLDivElement>(null);
  const lamp = useRef<SVGGElement>(null);
  const chain = useRef<HTMLDivElement>(null);
  const knob = useRef<HTMLButtonElement>(null);

  const [on, setOn] = useState(false);
  const onRef = useRef(false);
  const [chars, setChars] = useState(0);
  const [gone, setGone] = useState(false);

  /* ---------- scroll lock ---------- */
  const lock = () => {
    document.body.style.overflow = "hidden";
    getLenis()?.stop();
    setTimeout(() => getLenis()?.stop(), 60);
    setTimeout(() => getLenis()?.stop(), 350);
  };
  const unlock = () => {
    document.body.style.overflow = "";
    getLenis()?.start();
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    lock();
    return () => {
      unlock();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ---------- the toggle ---------- */
  const setLight = (next: boolean) => {
    onRef.current = next;
    setOn(next);

    if (next) {
      unlock();
      lamp.current?.classList.add("is-on");
      gsap.to(glow.current, { opacity: 1, duration: 0.9, ease: "power2.out" });
      gsap.to(root.current, {
        backgroundColor: "#0a0d16",
        duration: 0.9,
        ease: "power2.out",
      });
      window.dispatchEvent(new Event("lamp:on"));
    } else {
      // full reset — back to the untouched starting phase
      lock();
      window.scrollTo(0, 0);
      lamp.current?.classList.remove("is-on");
      gsap.to(glow.current, { opacity: 0, duration: 0.5, ease: "power2.in" });
      gsap.to(root.current, {
        backgroundColor: "#05060a",
        duration: 0.5,
        ease: "power2.in",
      });
      setChars(0);
      setGone(false);
      window.dispatchEvent(new Event("lamp:off"));
    }
  };

  /* ---------- pull-switch drag ---------- */
  useEffect(() => {
    const k = knob.current;
    const c = chain.current;
    if (!k || !c) return;

    const BASE = 66;
    const MAX = 78;
    const THRESHOLD = 42;
    let startY: number | null = null;
    let dy = 0;

    // gentle idle sway to invite interaction
    const idle = gsap.to(c, {
      rotate: 4,
      transformOrigin: "top center",
      duration: 1.5,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });

    const down = (e: PointerEvent) => {
      startY = e.clientY;
      idle.pause();
      gsap.set(c, { rotate: 0 });
      k.setPointerCapture(e.pointerId);
    };
    const move = (e: PointerEvent) => {
      if (startY === null) return;
      dy = Math.max(0, Math.min(MAX, e.clientY - startY));
      gsap.set(c, { height: BASE + dy });
    };
    const up = () => {
      if (startY === null) return;
      const pulled = dy;
      startY = null;
      dy = 0;
      gsap.to(c, { height: BASE, duration: 0.7, ease: "elastic.out(1,0.4)" });
      if (pulled > THRESHOLD) setLight(!onRef.current);
      else if (!onRef.current) idle.play();
    };

    k.addEventListener("pointerdown", down);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    return () => {
      idle.kill();
      k.removeEventListener("pointerdown", down);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ---------- terminal typing ---------- */
  useEffect(() => {
    if (!on) return;
    const total = script.reduce((a, l) => a + l.text.length, 0);
    const o = { c: 0 };
    const tw = gsap.to(o, {
      c: total,
      duration: total * 0.03,
      ease: "none",
      delay: 0.5,
      onUpdate: () => setChars(Math.floor(o.c)),
    });
    return () => {
      tw.kill();
    };
  }, [on]);

  /* ---------- dismiss the cue once user scrolls past ---------- */
  useEffect(() => {
    if (!on) return;
    const onScroll = () => {
      if (window.scrollY > window.innerHeight * 0.9) setGone(true);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [on]);

  // render terminal lines up to the typed character count
  let used = 0;
  const rendered = script.map((l, i) => {
    const avail = chars - used;
    const started = avail > 0 || used === 0;
    const shown = Math.max(0, Math.min(l.text.length, avail));
    used += l.text.length;
    const active = avail > 0 && avail < l.text.length;
    if (!started && i > 0) return null;
    return { ...l, shown: l.text.slice(0, shown), active, i };
  });

  return (
    <section
      ref={root}
      aria-label="Enter site — switch the lamp on"
      className="lamp-gate relative flex min-h-[100svh] w-full flex-col items-stretch overflow-hidden md:flex-row"
      style={{ backgroundColor: "#05060a" }}
    >
      {/* warm ambient light (only visible when on) */}
      <div
        ref={glow}
        className="pointer-events-none absolute -left-[6%] top-0 z-0 h-full w-[80%] opacity-0"
        style={{
          background:
            "radial-gradient(50% 46% at 30% 46%, rgba(255,214,150,0.5) 0%, rgba(255,190,110,0.16) 36%, rgba(10,13,22,0) 66%)",
        }}
      />

      {/* ---------------- LEFT: table + table lamp ---------------- */}
      <div className="relative z-10 flex min-h-[48svh] w-full items-end justify-center pb-6 md:min-h-0 md:w-1/2 md:pb-16">
        <div className="relative origin-bottom scale-[0.72] sm:scale-90 md:scale-100">
          {/* fixed-size scene so the pull-chain lines up with the SVG socket */}
          <div className="relative" style={{ width: 300, height: 400 }}>
            <svg
              className="absolute inset-0"
              width="300"
              height="400"
              viewBox="0 0 300 400"
              fill="none"
            >
              <defs>
                <linearGradient id="coneGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="rgba(255,214,150,0.5)" />
                  <stop offset="1" stopColor="rgba(255,214,150,0)" />
                </linearGradient>
              </defs>

              {/* --- table --- */}
              <g>
                <polygon points="34,292 266,292 286,312 14,312" fill="#1b1d24" />
                <polygon points="14,312 286,312 286,327 14,327" fill="#101116" />
                <rect x="46" y="327" width="12" height="66" fill="#141519" />
                <rect x="242" y="327" width="12" height="66" fill="#141519" />
                <line
                  x1="34"
                  y1="293"
                  x2="266"
                  y2="293"
                  stroke="rgba(255,255,255,0.06)"
                />
              </g>

              {/* --- light cone + lamp (glows on) --- */}
              <g ref={lamp} className="tlamp">
                <path
                  className="tlamp-cone"
                  d="M104 150 L196 150 L252 322 L48 322 Z"
                  fill="url(#coneGrad)"
                />

                {/* base */}
                <ellipse cx="150" cy="292" rx="48" ry="12" fill="#23252d" />
                <ellipse cx="150" cy="288" rx="38" ry="8" fill="#2b2e37" />
                {/* pole */}
                <rect x="144" y="152" width="12" height="138" rx="3" fill="#2b2e37" />
                <rect x="147" y="152" width="3" height="138" fill="rgba(255,255,255,0.08)" />
                {/* socket */}
                <rect x="141" y="150" width="18" height="9" rx="2" fill="#3a3d47" />
                {/* bulb tip peeking below shade */}
                <circle className="tlamp-bulb" cx="150" cy="165" r="9" />
                {/* shade */}
                <path
                  className="tlamp-shade"
                  d="M120 88 L180 88 L198 150 L102 150 Z"
                />
                <ellipse cx="150" cy="88" rx="30" ry="6" className="tlamp-shade-top" />
                <line
                  x1="102"
                  y1="150"
                  x2="198"
                  y2="150"
                  stroke="rgba(0,0,0,0.25)"
                  strokeWidth="2"
                />
              </g>
            </svg>

            {/* pull switch (HTML overlay, lines up with socket) */}
            <div
              className="absolute flex flex-col items-center"
              style={{ left: 176, top: 158 }}
            >
              <div ref={chain} className="w-px bg-white/30" style={{ height: 66 }} />
              <button
                ref={knob}
                aria-label={on ? "Pull to switch the lamp off" : "Pull to switch the lamp on"}
                className="lamp-knob -mt-1 h-5 w-5 cursor-grab touch-none rounded-full active:cursor-grabbing"
                onClick={() => setLight(!onRef.current)}
              />
            </div>
          </div>

          <p
            className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap font-sans text-xs uppercase tracking-[0.3em] text-white/45 transition-opacity duration-500"
            style={{ opacity: on ? 0 : 1 }}
          >
            Pull the switch ↓
          </p>
        </div>
      </div>

      {/* ---------------- RIGHT: the terminal ---------------- */}
      <div className="relative z-10 flex w-full items-center justify-center px-6 pb-16 md:w-1/2 md:pb-0 md:pr-12">
        <div
          className="w-full max-w-xl overflow-hidden rounded-xl border border-white/10 shadow-2xl transition-opacity duration-700"
          style={{
            background: "rgba(9,12,18,0.92)",
            opacity: on ? 1 : 0.12,
          }}
        >
          {/* title bar */}
          <div className="flex items-center gap-2 border-b border-white/8 px-4 py-3">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
            <span className="ml-3 font-mono text-xs text-white/40">
              om@portfolio — bash
            </span>
          </div>
          {/* body */}
          <div className="min-h-[260px] px-5 py-4 font-mono text-[13px] leading-relaxed md:text-sm">
            {rendered.map((l) =>
              l ? (
                <div key={l.i} className="whitespace-pre-wrap break-words">
                  {l.prompt && (
                    <span className="text-[#8b7cff]">{l.prompt} </span>
                  )}
                  <span
                    className={
                      l.kind === "cmd"
                        ? "text-white"
                        : l.kind === "ok"
                        ? "text-[#28c840]"
                        : "text-white/70"
                    }
                  >
                    {l.shown}
                  </span>
                  {l.active && (
                    <span className="ml-0.5 inline-block h-4 w-2 translate-y-0.5 animate-pulse bg-white/80" />
                  )}
                </div>
              ) : null
            )}
          </div>
        </div>
      </div>

      {/* scroll cue appears once lit */}
      <div
        className="pointer-events-none absolute bottom-6 left-1/2 z-10 -translate-x-1/2 font-sans text-xs uppercase tracking-[0.3em] text-white/50 transition-opacity duration-700"
        style={{ opacity: on && !gone ? 1 : 0 }}
      >
        Scroll to enter ↓
      </div>
    </section>
  );
}
