"use client";

import { useRef } from "react";
import IdCard from "./IdCard";
import { useLanyardDrag, ANCHOR } from "./useLanyardDrag";

/** IEEE SSIT lanyard — black strap, white text. */
export default function LanyardSsit() {
  const stage = useRef<HTMLDivElement>(null);
  const card = useRef<HTMLDivElement>(null);
  const strap = useRef<SVGPathElement>(null);
  useLanyardDrag(stage, card, strap);

  return (
    <div ref={stage} className="pointer-events-none absolute inset-0 z-20">
      <svg className="pointer-events-none absolute inset-0 h-full w-full" style={{ overflow: "visible" }}>
        <defs>
          <linearGradient id="ssitGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#20242c" />
            <stop offset="1" stopColor="#0a0c10" />
          </linearGradient>
        </defs>
        <path
          ref={strap}
          id="ssit-strap"
          d=""
          fill="none"
          stroke="url(#ssitGrad)"
          strokeWidth={50}
          strokeLinecap="round"
          style={{ filter: "drop-shadow(0 5px 8px rgba(0,0,0,0.4))" }}
        />
        <text
          fill="#f2f5fa"
          fontSize="11.5"
          fontWeight="600"
          letterSpacing="1.2"
          style={{ textTransform: "uppercase" }}
        >
          <textPath href="#ssit-strap" startOffset="14%">
            IEEE SRMIST · Society on Social Implications of Technology
          </textPath>
        </text>
        <circle
          cx={ANCHOR.x}
          cy={ANCHOR.y}
          r="8"
          fill="#0a0c10"
          stroke="#f2f5fa"
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
