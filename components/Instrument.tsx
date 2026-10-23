"use client";

import { useRef, useState } from "react";
import { AnimatePresence, animate, motion } from "framer-motion";
import { EDITIONS } from "@/lib/data";
import TiltWatch from "./TiltWatch";
import { MODES, type WatchMode } from "./Watch";
import { Headline, Reveal } from "./motion";

const HOTSPOTS = [
  {
    id: "crown",
    n: "01",
    title: "The Crown",
    x: 84,
    y: 50,
    zoom: 2.6,
    body: "The single physical control. Press to wake the intelligence, turn to move between its four modes. No touchscreen swiping, no notifications competing for attention.",
  },
  {
    id: "dial",
    n: "02",
    title: "The Dial",
    x: 47,
    y: 40,
    zoom: 2.1,
    body: "Hand-guilloché texture, applied indices and a signed wordmark. The dial reads first as a watch, always, and only then as anything more.",
  },
  {
    id: "aperture",
    n: "03",
    title: "The Aperture",
    x: 47,
    y: 60,
    zoom: 2.8,
    body: "A discreet window at six o'clock where the intelligence speaks in quiet, serif type, one thought at a time. It is dark until it has something worth saying.",
  },
  {
    id: "sapphire",
    n: "04",
    title: "The Sapphire",
    x: 34,
    y: 33,
    zoom: 2.3,
    body: "A domed sapphire crystal that catches the light like a still lake. Treated to stay legible in any condition, from a gallery to a glacier.",
  },
  {
    id: "case",
    n: "05",
    title: "The Case",
    x: 36,
    y: 29,
    zoom: 2.2,
    body: "Sculpted lugs, polished bevels and a fluted bezel, finished by hand. Available in steel, titanium and champagne gold.",
  },
];

const MODE_COPY: Record<WatchMode, { title: string; body: string }> = {
  time: { title: "Time", body: "At rest, VÉRAN ONE is a watch. The intelligence waits, silent." },
  ask: { title: "Ask", body: "Speak, or show it what you see. The instrument listens privately and answers in the aperture." },
  foresight: { title: "Foresight", body: "Set a decision before it and see the branches, weighed with care, before you commit." },
  context: { title: "Recall", body: "Draw on years of notes and conversations you have chosen to share, resurfaced when they matter." },
};

export default function Instrument() {
  const [active, setActive] = useState<string | null>(null);
  const [mode, setMode] = useState<WatchMode>("time");
  const [crown, setCrown] = useState(0);
  const crownRef = useRef(0);
  const spot = HOTSPOTS.find((h) => h.id === active) ?? null;

  const turnTo = (next: WatchMode) => {
    const from = crownRef.current;
    const to = from + 60;
    crownRef.current = to;
    animate(from, to, { duration: 0.6, ease: "easeOut", onUpdate: setCrown });
    setMode(next);
  };
  const turnNext = () => turnTo(MODES[(MODES.findIndex((m) => m.id === mode) + 1) % MODES.length].id);

  return (
    <section id="instrument" className="relative overflow-hidden bg-forest py-28 md:py-40">
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_75%_50%,rgba(195,163,107,0.14),transparent_70%)]" />
      <div className="relative mx-auto max-w-[1500px] px-6 md:px-12">
        <div className="max-w-3xl">
          <Reveal>
            <p className="eyebrow mb-6">The Instrument · VÉRAN ONE</p>
          </Reveal>
          <Headline lines={["Precision", "Meets Possibility."]} className="display text-[clamp(2.8rem,7vw,6.2rem)]" />
          <Reveal delay={0.3}>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-ivory/80">
              A collectible timepiece with a hidden layer of extraordinary intelligence. Explore the object. Touch
              any point of the dial below, or turn the crown.
            </p>
          </Reveal>
        </div>

        <div className="mt-20 grid items-start gap-12 lg:grid-cols-12">
          {/* Stage */}
          <div className="lg:col-span-7">
            <div className="relative mx-auto aspect-[600/760] w-full max-w-[640px] overflow-hidden border border-gold/20 bg-[radial-gradient(circle_at_50%_45%,#1b4a3b,#071c16_75%)]">
              <motion.div
                className="absolute inset-0"
                animate={{
                  scale: spot ? spot.zoom : 1,
                  x: spot ? `${(50 - spot.x) * spot.zoom}%` : "0%",
                  y: spot ? `${(50 - spot.y) * spot.zoom}%` : "0%",
                }}
                transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <TiltWatch edition={EDITIONS[0]} mode={mode} crown={crown} max={spot ? 3 : 12} className="h-full w-full" />
              </motion.div>

              {!spot &&
                HOTSPOTS.filter((h) => h.id !== "case").map((h) => (
                  <button
                    key={h.id}
                    onClick={() => setActive(h.id)}
                    aria-label={`Explore: ${h.title}`}
                    className="group absolute z-10 -translate-x-1/2 -translate-y-1/2"
                    style={{ left: `${h.x}%`, top: `${h.y}%` }}
                  >
                    <span className="absolute inset-0 -m-3 animate-ping rounded-full border border-gold/60" />
                    <span className="relative flex h-8 w-8 items-center justify-center rounded-full border border-gold bg-ink/60 text-[0.6rem] tracking-widest text-gold backdrop-blur transition-colors group-hover:bg-gold group-hover:text-ink">
                      {h.n}
                    </span>
                  </button>
                ))}

              <AnimatePresence>
                {spot && (
                  <motion.div
                    key={spot.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="absolute inset-x-4 bottom-4 z-20 border border-gold/30 bg-ink/85 p-5 backdrop-blur-md md:inset-x-6 md:bottom-6"
                    role="status"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="eyebrow mb-2">
                          {spot.n} · Detail
                        </p>
                        <h3 className="font-serif text-2xl">{spot.title}</h3>
                      </div>
                      <button
                        onClick={() => setActive(null)}
                        className="shrink-0 text-[0.65rem] uppercase tracking-[0.25em] text-gold underline underline-offset-4"
                      >
                        Reset view
                      </button>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-ivory/80">{spot.body}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <p className="absolute left-4 top-4 z-10 text-[0.6rem] uppercase tracking-[0.3em] text-ivory/55">
                Move across the crystal to turn the light
              </p>
            </div>
          </div>

          {/* Controls */}
          <div className="lg:col-span-5">
            <Reveal>
              <h3 className="eyebrow mb-6">Explore the object</h3>
              <ul className="divide-y divide-gold/20 border-y border-gold/20">
                {HOTSPOTS.map((h) => (
                  <li key={h.id}>
                    <button
                      onClick={() => setActive(active === h.id ? null : h.id)}
                      aria-pressed={active === h.id}
                      className="flex w-full items-center justify-between py-4 text-left transition-colors hover:text-gold"
                    >
                      <span className="flex items-baseline gap-5">
                        <span className="text-[0.65rem] tracking-[0.3em] text-gold">{h.n}</span>
                        <span className={`font-serif text-2xl ${active === h.id ? "text-gold" : ""}`}>{h.title}</span>
                      </span>
                      <span aria-hidden className="text-gold">{active === h.id ? "−" : "+"}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.15} className="mt-14">
              <h3 className="eyebrow mb-3">Turn the crown</h3>
              <p className="mb-6 text-sm leading-relaxed text-ivory/70">
                One control, four modes. Select a mode, or press the crown to advance.
              </p>
              <div role="group" aria-label="Intelligence mode" className="grid grid-cols-2 gap-px bg-gold/25 sm:grid-cols-4">
                {MODES.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => turnTo(m.id)}
                    aria-pressed={mode === m.id}
                    className={`bg-forest px-3 py-4 text-[0.65rem] uppercase tracking-[0.25em] transition-colors ${
                      mode === m.id ? "text-gold" : "text-ivory/70 hover:text-ivory"
                    }`}
                  >
                    {MODE_COPY[m.id].title}
                  </button>
                ))}
              </div>
              <AnimatePresence mode="wait">
                <motion.p
                  key={mode}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="mt-6 min-h-[4.5rem] font-serif text-xl italic leading-snug text-ivory/90"
                  aria-live="polite"
                >
                  {MODE_COPY[mode].body}
                </motion.p>
              </AnimatePresence>
              <button onClick={turnNext} className="btn mt-4">
                <span>Press the crown</span>
              </button>
            </Reveal>

            <p className="mt-10 text-xs leading-relaxed text-ivory/50">
              Concept object. Interface text on the dial is illustrative; VÉRAN ONE is a speculative design and not a
              working product.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
