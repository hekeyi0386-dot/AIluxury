"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { MAKING } from "@/lib/data";
import Scene, { gearPath } from "./Scene";
import { Headline, Reveal } from "./motion";

function MakingVisual({ id }: { id: string }) {
  const frame = "absolute inset-0 h-full w-full";
  if (id === "assembly") {
    return (
      <div className="absolute inset-0">
        <Scene kind="workshop" className="h-full w-full" />
        <svg viewBox="0 0 400 300" className={`${frame} z-10 opacity-90`} aria-hidden>
          <g style={{ transformOrigin: "120px 170px", animation: "gearspin 40s linear infinite" }}>
            <path d={gearPath(120, 170, 70, 60, 22)} fill="none" stroke="#C3A36B" strokeWidth="1.2" />
            <circle cx="120" cy="170" r="10" fill="none" stroke="#C3A36B" />
          </g>
          <g style={{ transformOrigin: "224px 130px", animation: "gearspinr 28s linear infinite" }}>
            <path d={gearPath(224, 130, 50, 43, 16)} fill="none" stroke="#F5F1E8" strokeOpacity="0.8" strokeWidth="1.2" />
            <circle cx="224" cy="130" r="8" fill="none" stroke="#F5F1E8" />
          </g>
        </svg>
      </div>
    );
  }
  if (id === "finishing") {
    return (
      <div className="absolute inset-0 bg-[linear-gradient(115deg,#2f3637,#c9cfd0_28%,#6c7476_44%,#eef1f1_58%,#444b4d_78%,#1d2223)]">
        {Array.from({ length: 70 }, (_, i) => (
          <div key={i} className="absolute inset-x-0 bg-white" style={{ top: `${i * 1.45}%`, height: 1, opacity: 0.04 + ((i * 37) % 10) / 100 }} />
        ))}
        <div className="sweep absolute inset-0" />
        <motion.div
          className="absolute -inset-y-10 w-24 rotate-12 bg-gradient-to-r from-transparent via-white/45 to-transparent blur-md"
          animate={{ left: ["-20%", "120%"] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", repeatDelay: 1.5 }}
        />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent" />
      </div>
    );
  }
  if (id === "materials") {
    const m = [
      ["Steel", "linear-gradient(135deg,#f4f6f6,#9ba3a5 40%,#e3e7e8 65%,#5f686a)"],
      ["Titanium", "linear-gradient(135deg,#c8cbcc,#767b7d 40%,#aeb2b3 65%,#4a4f51)"],
      ["Champagne gold", "linear-gradient(135deg,#f6e8c2,#b89350 40%,#ecd7a3 65%,#8a6b35)"],
    ];
    return (
      <div className="absolute inset-0 flex items-center justify-center gap-4 bg-[radial-gradient(circle_at_50%_40%,#1f3c31,#07120e)] p-6 md:gap-8">
        {m.map(([n, g], i) => (
          <motion.div key={n} initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.15 * i, duration: 0.9 }} className="flex flex-col items-center gap-4">
            <div className="sweep h-40 w-20 rounded-sm shadow-2xl md:h-64 md:w-28" style={{ background: g }} />
            <span className="text-[0.6rem] uppercase tracking-[0.25em] text-ivory/70">{n}</span>
          </motion.div>
        ))}
      </div>
    );
  }
  if (id === "sapphire") {
    return (
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#17483a,#050c09_70%)]">
        <svg viewBox="0 0 400 300" className={frame} aria-hidden>
          <defs>
            <linearGradient id="sp-g" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#ffffff" stopOpacity="0.55" />
              <stop offset="0.5" stopColor="#9fc9d8" stopOpacity="0.08" />
              <stop offset="1" stopColor="#ffffff" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          <ellipse cx="200" cy="150" rx="150" ry="62" fill="url(#sp-g)" stroke="#fff" strokeOpacity="0.5" />
          <ellipse cx="200" cy="150" rx="116" ry="40" fill="none" stroke="#fff" strokeOpacity="0.3" />
          <path d="M70 150 L 330 150 M 200 88 L 200 212" stroke="#C3A36B" strokeOpacity="0.35" strokeDasharray="2 5" />
          <path d="M96 130 Q 160 96 238 106" stroke="#fff" strokeOpacity="0.7" strokeWidth="3" fill="none" strokeLinecap="round" />
        </svg>
        <div className="sweep absolute inset-0" />
      </div>
    );
  }
  // inspection
  return (
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#173f33,#050c09_75%)]">
      <svg viewBox="0 0 400 300" className={frame} aria-hidden>
        <circle cx="200" cy="150" r="110" fill="#0b2a21" stroke="#C3A36B" strokeOpacity="0.5" />
        {Array.from({ length: 60 }, (_, i) => {
          const a = (i / 60) * Math.PI * 2;
          const l = i % 5 === 0 ? 10 : 5;
          return <line key={i} x1={200 + Math.cos(a) * (110 - l)} y1={150 + Math.sin(a) * (110 - l)} x2={200 + Math.cos(a) * 110} y2={150 + Math.sin(a) * 110} stroke="#F5F1E8" strokeOpacity="0.6" />;
        })}
        <motion.g animate={{ x: [0, 30, -20, 0], y: [0, -14, 16, 0] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}>
          <circle cx="200" cy="150" r="62" fill="rgba(245,241,232,0.06)" stroke="#F5F1E8" strokeWidth="1.5" />
          <circle cx="200" cy="150" r="56" fill="none" stroke="#C3A36B" strokeOpacity="0.6" strokeDasharray="3 4" />
          <path d="M138 150 H 262 M200 88 V 212" stroke="#C3A36B" strokeOpacity="0.7" />
        </motion.g>
        <text x="200" y="282" textAnchor="middle" fill="#C3A36B" style={{ fontSize: 9, letterSpacing: 4, fontFamily: "var(--font-sans), sans-serif" }}>
          EXAMINED UNDER LOUPE · APPROVED
        </text>
      </svg>
    </div>
  );
}

export default function Making() {
  const [i, setI] = useState(0);
  const cur = MAKING[i];

  return (
    <section id="craftsmanship" className="relative overflow-hidden bg-forest py-28 md:py-40">
      <div className="mx-auto max-w-[1500px] px-6 md:px-12">
        <Reveal>
          <p className="eyebrow mb-6">The Art of Making</p>
        </Reveal>
        <Headline lines={["Crafted", "to Endure."]} className="display text-[clamp(2.8rem,7vw,6.2rem)]" />
        <Reveal delay={0.3}>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-ivory/80">
            Swiss watchmaking tradition, brought to a contemporary philosophy: the most advanced thing about an object
            should be the care it was made with.
          </p>
        </Reveal>

        <div className="mt-16 grid items-stretch gap-10 lg:grid-cols-12">
          <div className="relative aspect-[4/3] overflow-hidden border border-gold/25 lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={cur.id}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              >
                <MakingVisual id={cur.id} />
              </motion.div>
            </AnimatePresence>
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(0,0,0,0.5))]" />
          </div>

          <div className="flex flex-col justify-between lg:col-span-5">
            <div role="tablist" aria-label="Stages of making" className="divide-y divide-gold/20 border-y border-gold/20">
              {MAKING.map((m, idx) => (
                <button
                  key={m.id}
                  role="tab"
                  id={`tab-${m.id}`}
                  aria-selected={i === idx}
                  aria-controls="making-panel"
                  onClick={() => setI(idx)}
                  className="flex w-full items-baseline justify-between gap-6 py-4 text-left transition-colors hover:text-gold"
                >
                  <span className={`font-serif text-2xl ${i === idx ? "text-gold" : ""}`}>{m.title}</span>
                  <span className="text-[0.6rem] tracking-[0.3em] text-ivory/50">0{idx + 1}</span>
                </button>
              ))}
            </div>
            <div id="making-panel" role="tabpanel" aria-labelledby={`tab-${cur.id}`} className="mt-8 min-h-[11rem]">
              <AnimatePresence mode="wait">
                <motion.div key={cur.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
                  <p className="eyebrow mb-3">{cur.kicker}</p>
                  <p className="leading-relaxed text-ivory/80">{cur.body}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className="mt-24 grid gap-px bg-gold/20 md:grid-cols-3">
          {[
            ["Made by hand", "Every instrument passes through the hands of a single master watchmaker."],
            ["Numbered", "Each piece is numbered and recorded in the house register."],
            ["Made to be passed on", "Designed to be serviced, restored and inherited."],
          ].map(([t, b]) => (
            <Reveal key={t} className="bg-forest p-8">
              <h3 className="font-serif text-2xl text-gold">{t}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ivory/75">{b}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
