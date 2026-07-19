"use client";

import { useRef } from "react";
import IdCard from "./IdCard";
import { useLanyardDrag, ANCHOR } from "./useLanyardDrag";

/** SRM lanyard — teal strap. Worn for the FOSSEE role. */
export default function LanyardSrm() {
  const stage = useRef<HTMLDivElement>(null);
  const card = useRef<HTMLDivElement>(null);
  const strap = useRef<SVGPathElement>(null);
  useLanyardDrag(stage, card, strap);

  return (
    <div ref={stage} className="pointer-events-none absolute inset-0 z-20">
      <svg className="pointer-events-none absolute inset-0 h-full w-full" style={{ overflow: "visible" }}>
        <defs>
          <linearGradient id="srmGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#1e8b9c" />
            <stop offset="1" stopColor="#0e5a66" />
          </linearGradient>
        </defs>
        <path
          ref={strap}
          id="srm-strap"
          d=""
          fill="none"
          stroke="url(#srmGrad)"
          strokeWidth={50}
          strokeLinecap="round"
          style={{ filter: "drop-shadow(0 5px 7px rgba(0,0,0,0.3))" }}
        />
        <text
          fill="#eaf7f9"
          fontSize="13"
          fontWeight="600"
          letterSpacing="1.5"
          style={{ textTransform: "uppercase" }}
        >
          <textPath href="#srm-strap" startOffset="24%">
            SRM Institute of Science and Technology
          </textPath>
        </text>
        <circle
          cx={ANCHOR.x}
          cy={ANCHOR.y}
          r="8"
          fill="#0c3a42"
          stroke="#eaf7f9"
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
