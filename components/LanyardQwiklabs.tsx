"use client";

import { useRef } from "react";
import IdCard from "./IdCard";
import { useLanyardDrag, ANCHOR } from "./useLanyardDrag";

/** Qwiklabs Developer Club lanyard — white strap, blue text. */
export default function LanyardQwiklabs() {
  const stage = useRef<HTMLDivElement>(null);
  const card = useRef<HTMLDivElement>(null);
  const strap = useRef<SVGPathElement>(null);
  useLanyardDrag(stage, card, strap);

  return (
    <div ref={stage} className="pointer-events-none absolute inset-0 z-20">
      <svg className="pointer-events-none absolute inset-0 h-full w-full" style={{ overflow: "visible" }}>
        <defs>
          <linearGradient id="qwikGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="1" stopColor="#e6ebf2" />
          </linearGradient>
        </defs>
        <path
          ref={strap}
          id="qwik-strap"
          d=""
          fill="none"
          stroke="url(#qwikGrad)"
          strokeWidth={50}
          strokeLinecap="round"
          style={{ filter: "drop-shadow(0 5px 8px rgba(0,0,0,0.28))" }}
        />
        <text
          fill="#1f49b0"
          fontSize="12.5"
          fontWeight="700"
          letterSpacing="1.5"
          style={{ textTransform: "uppercase" }}
        >
          <textPath href="#qwik-strap" startOffset="20%">
            Qwiklabs Developer Club SRMIST
          </textPath>
        </text>
        <circle
          cx={ANCHOR.x}
          cy={ANCHOR.y}
          r="8"
          fill="#1f49b0"
          stroke="#ffffff"
          strokeWidth="2.5"
        />
      </svg>

      <div
        ref={card}
        className="pointer-events-auto absolute left-0 top-0 cursor-grab touch-none active:cursor-grabbing"
        style={{ willChange: "transform" }}
      >
        <div className="mx-auto mb-[-3px] h-5 w-9 rounded-b-[3px] bg-gradient-to-b from-[#d7dbe0] to-[#8f96a1] shadow" />
        <IdCard />
      </div>
    </div>
  );
}
