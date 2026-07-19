"use client";

import { RefObject, useEffect } from "react";

// where the strap is pinned — extreme left, around the heading line
export const ANCHOR = { x: 16, y: 330 };

/**
 * Makes the ID card behave like an object lying on a table:
 * grab it and it goes wherever the cursor takes it, and STAYS there
 * (no gravity, no snap-back). The draped strap re-draws from the
 * top-left corner to the card, and the card tilts to face the corner.
 */
export function useLanyardDrag(
  stageRef: RefObject<HTMLDivElement>,
  cardRef: RefObject<HTMLDivElement>,
  strapRef: RefObject<SVGPathElement>
) {
  useEffect(() => {
    const stage = stageRef.current;
    const card = cardRef.current;
    const strap = strapRef.current;
    if (!stage || !card || !strap) return;

    const clamp = (v: number, min: number, max: number) =>
      Math.max(min, Math.min(max, v));

    // card centre position, in stage pixels
    const pos = { x: 0, y: 0 };
    let off = { x: 0, y: 0 };
    let dragging = false;

    const draw = () => {
      const cw = card.offsetWidth;
      const ch = card.offsetHeight;
      const cx = pos.x;
      const cy = pos.y;

      // tilt the card so its top points back toward the anchor
      let theta = Math.atan2(ANCHOR.x - cx, cy - ANCHOR.y);
      theta = clamp(theta, -0.6, 0.6);

      // where the strap meets the card (its top-centre, after tilt)
      const half = ch / 2 + 4;
      const ax = cx + Math.sin(theta) * half;
      const ay = cy - Math.cos(theta) * half;

      card.style.transform = `translate(${cx - cw / 2}px, ${
        cy - ch / 2
      }px) rotate(${theta}rad)`;

      // draped strap: cubic bezier with sag between corner and card
      const dx = ax - ANCHOR.x;
      const dy = ay - ANCHOR.y;
      const dist = Math.hypot(dx, dy);
      const sag = Math.min(90, dist * 0.28);
      const c1x = ANCHOR.x + dx * 0.35;
      const c1y = ANCHOR.y + dy * 0.35 + sag;
      const c2x = ANCHOR.x + dx * 0.68;
      const c2y = ANCHOR.y + dy * 0.68 + sag;
      strap.setAttribute(
        "d",
        `M ${ANCHOR.x} ${ANCHOR.y} C ${c1x} ${c1y} ${c2x} ${c2y} ${ax} ${ay}`
      );
    };

    // initial resting pose — left area, tilted (as if left on a table)
    const place = () => {
      const r = stage.getBoundingClientRect();
      pos.x = Math.min(Math.max(r.width * 0.2, 190), 360);
      pos.y = Math.min(ANCHOR.y + 250, r.height - 60);
      draw();
    };
    place();

    const toStage = (e: PointerEvent) => {
      const r = stage.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    };

    const down = (e: PointerEvent) => {
      e.preventDefault();
      dragging = true;
      const p = toStage(e);
      off = { x: p.x - pos.x, y: p.y - pos.y };
      card.setPointerCapture?.(e.pointerId);
    };
    const move = (e: PointerEvent) => {
      if (!dragging) return;
      const r = stage.getBoundingClientRect();
      const p = toStage(e);
      pos.x = clamp(p.x - off.x, 40, r.width - 40);
      pos.y = clamp(p.y - off.y, 60, r.height - 40);
      draw();
    };
    const up = () => {
      dragging = false;
    };

    const onResize = () => {
      const r = stage.getBoundingClientRect();
      pos.x = clamp(pos.x, 40, r.width - 40);
      pos.y = clamp(pos.y, 60, r.height - 40);
      draw();
    };

    card.addEventListener("pointerdown", down);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    window.addEventListener("resize", onResize);
    return () => {
      card.removeEventListener("pointerdown", down);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("resize", onResize);
    };
  }, [stageRef, cardRef, strapRef]);
}
