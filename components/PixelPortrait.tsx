"use client";

import { useEffect, useRef } from "react";

/**
 * Draws the portrait onto a canvas one block at a time, starting from the
 * centre and radiating out to the corners — as if the image is being built
 * pixel by pixel in front of the viewer. Plays once, when scrolled into view.
 */
export default function PixelPortrait({
  src = "/om-portrait.jpg",
  cellPx = 9,
}: {
  src?: string;
  cellPx?: number;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const box = wrap.current;
    const cnv = canvas.current;
    if (!box || !cnv) return;
    const ctx = cnv.getContext("2d");
    if (!ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let raf = 0;
    let cells: { i: number; j: number }[] = [];
    let cols = 0;
    let rows = 0;
    let cw = 0;
    let ch = 0;
    let crop = { sx: 0, sy: 0, sw: 0, sh: 0 };
    let started = false;

    const img = new Image();
    img.decoding = "async";

    const setup = () => {
      const rect = box.getBoundingClientRect();
      cw = rect.width;
      ch = rect.height;
      if (cw < 2 || ch < 2 || !img.complete || img.naturalWidth === 0) return false;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      cnv.width = Math.round(cw * dpr);
      cnv.height = Math.round(ch * dpr);
      cnv.style.width = `${cw}px`;
      cnv.style.height = `${ch}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, cw, ch);

      // cover-fit crop of the source image
      const ca = cw / ch;
      const ia = img.naturalWidth / img.naturalHeight;
      if (ia > ca) {
        crop.sh = img.naturalHeight;
        crop.sw = crop.sh * ca;
        crop.sx = (img.naturalWidth - crop.sw) / 2;
        crop.sy = 0;
      } else {
        crop.sw = img.naturalWidth;
        crop.sh = crop.sw / ca;
        crop.sx = 0;
        crop.sy = (img.naturalHeight - crop.sh) / 2;
      }

      cols = Math.max(8, Math.round(cw / cellPx));
      rows = Math.max(8, Math.round(ch / cellPx));

      // order all cells by distance from centre (+ jitter for organic feel)
      cells = [];
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          cells.push({ i, j });
        }
      }
      cells.sort((a, b) => {
        const da =
          Math.hypot((a.i + 0.5) / cols - 0.5, (a.j + 0.5) / rows - 0.5) +
          Math.random() * 0.05;
        const db =
          Math.hypot((b.i + 0.5) / cols - 0.5, (b.j + 0.5) / rows - 0.5) +
          Math.random() * 0.05;
        return da - db;
      });
      return true;
    };

    const drawCell = (c: { i: number; j: number }) => {
      const dw = cw / cols;
      const dh = ch / rows;
      const ssw = crop.sw / cols;
      const ssh = crop.sh / rows;
      ctx.drawImage(
        img,
        crop.sx + c.i * ssw,
        crop.sy + c.j * ssh,
        ssw,
        ssh,
        c.i * dw,
        c.j * dh,
        dw + 1,
        dh + 1
      );
    };

    const drawAll = () => {
      ctx.drawImage(
        img,
        crop.sx,
        crop.sy,
        crop.sw,
        crop.sh,
        0,
        0,
        cw,
        ch
      );
    };

    const play = () => {
      if (started) return;
      if (!setup()) return;
      started = true;
      if (reduce) {
        drawAll();
        return;
      }
      const total = cells.length;
      const dur = 3200;
      const t0 = performance.now();
      let shown = 0;
      const tick = (t: number) => {
        let p = Math.min(1, (t - t0) / dur);
        p = 1 - (1 - p) * (1 - p); // ease-out
        const target = Math.floor(p * total);
        for (; shown < target; shown++) drawCell(cells[shown]);
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          play();
          io.disconnect();
        }
      },
      { threshold: 0.35 }
    );

    img.onload = () => {
      // if already on screen when the image finishes loading, play now
      const r = box.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) play();
      else io.observe(box);
    };
    img.src = src;

    const onResize = () => {
      if (started && img.complete) {
        setup();
        drawAll(); // after the reveal, just keep it sharp on resize
      }
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, [src, cellPx]);

  return (
    <div
      ref={wrap}
      className="relative aspect-[3/4] w-full overflow-hidden rounded-xl border hairline"
    >
      <canvas ref={canvas} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
