# Om Pathania — Portfolio

An elegant, editorial, heavily-animated personal portfolio built with **Next.js 14**, **Tailwind CSS**, and **GSAP**.

## Highlights

- **Editorial art direction** — Fraunces serif display + Space Grotesk, warm ink-dark palette with a restrained gold accent, film-grain texture overlay.
- **Motion** — Lenis smooth scroll, a counting preloader, character-by-character hero reveal, masked word reveals on scroll, a velocity-reactive marquee, magnetic buttons, and a custom cursor.
- **Accessible & responsive** — respects `prefers-reduced-motion`, keyboard-focusable, works from 375px → 1440px+.

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Editing your content

All copy lives in one place: [`lib/data.ts`](lib/data.ts). Update your projects, experience, skills, and — importantly:

- `profile.links.github` and `profile.links.linkedin` — **replace the placeholder `https://github.com/` / `https://www.linkedin.com/` URLs with your real profiles.**

## Structure

```
app/
  layout.tsx      Fonts + metadata
  page.tsx        Section assembly
  globals.css     Tokens, texture, cursor, reduced-motion
components/
  SmoothScroll    Lenis + GSAP ticker
  Preloader       Intro counter
  Cursor          Custom cursor
  Nav             Header + scroll progress
  Hero, Marquee, About, Work, Path, Contact
  anim.tsx        SplitReveal / FadeUp / Magnetic primitives
lib/data.ts       ← all your content
```

## Deploy

Push to GitHub and import into [Vercel](https://vercel.com) — zero config.
