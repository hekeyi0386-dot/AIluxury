# VÉRAN — Beyond Intelligence.

A speculative luxury brand website for a design school project: a fictional Geneva house making
ultra-luxury personal AI instruments (**VÉRAN ONE**). Everything is concept: the brand, founders,
product, stories and form are invented, and no backend exists.

**Stack:** Next.js 14 (App Router) · React 18 · Tailwind CSS 3 · Framer Motion 11 · TypeScript

## Run

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint    # type-check
```

## Structure

- `app/` — layout (Cormorant Garamond + Jost via `next/font`), global styles, page
- `components/Watch.tsx` — the VÉRAN ONE rendered as parametric SVG (three editions, live clock,
  turnable crown, AI aperture, sapphire sheen)
- `components/TiltWatch.tsx` — pointer-driven 3D tilt
- `components/Scene.tsx` — generated editorial scenes (observatory, ocean, architecture, mountains,
  Geneva, workshop)
- `components/*` — one file per section (Hero, Instrument, Exploration, Pillars, Making, Collection,
  House, Ownership + appointment form, Footer)
- `lib/data.ts` — all copy and edition data

## Notes

- Imagery is generated vector art with grain and vignette, not photography. Replace `Scene` with
  `next/image` photography when licensed assets are available.
- Product details are labelled design intent; no certified specifications, testimonials or
  partnerships are implied.
- The appointment form validates in the browser and shows a demo confirmation; nothing is sent.
