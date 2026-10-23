"use client";

import { useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import { PILLARS } from "@/lib/data";
import { Headline, Reveal } from "./motion";

const draw = (delay = 0, duration = 1.8) => ({
  initial: { pathLength: 0, opacity: 0 },
  whileInView: { pathLength: 1, opacity: 1 },
  viewport: { once: true, margin: "-20% 0px" },
  transition: { duration, delay, ease: [0.22, 1, 0.36, 1] as const },
});

const G = "#C3A36B";
const label = {
  fill: "#F5F1E8",
  fillOpacity: 0.65,
  fontSize: 9,
  letterSpacing: 3,
  fontFamily: "var(--font-sans), sans-serif",
} as const;

function Diagram({ id }: { id: string }) {
  if (id === "depth") {
    const years = ["2019", "2021", "2023", "2025", "2026"];
    return (
      <svg viewBox="0 0 400 400" className="w-full" role="img" aria-label="Concentric rings representing years of retained context">
        {years.map((y, i) => (
          <g key={y}>
            <motion.circle cx="200" cy="200" r={36 + i * 34} fill="none" stroke={G} strokeWidth={i === 4 ? 1.6 : 0.8} strokeOpacity={0.35 + i * 0.13} {...draw(i * 0.25)} />
            <text x="204" y={200 - (36 + i * 34) - 4} style={label}>{y}</text>
          </g>
        ))}
        <motion.line x1="200" y1="10" x2="200" y2="390" stroke={G} strokeOpacity="0.3" {...draw(0.4)} />
        <motion.line x1="10" y1="200" x2="390" y2="200" stroke={G} strokeOpacity="0.3" {...draw(0.6)} />
        <circle cx="200" cy="200" r="4" fill={G} />
      </svg>
    );
  }
  if (id === "foresight") {
    return (
      <svg viewBox="0 0 400 400" className="w-full" role="img" aria-label="A branching path representing possible futures">
        <motion.path d="M200 380 C 200 320 200 300 200 250" fill="none" stroke={G} strokeWidth="2" {...draw(0)} />
        {[
          "M200 250 C 200 210 120 190 110 130",
          "M200 250 C 200 210 280 190 290 130",
          "M200 250 C 200 200 200 170 200 110",
        ].map((d, i) => (
          <motion.path key={d} d={d} fill="none" stroke={G} strokeOpacity={i === 2 ? 1 : 0.4} strokeWidth={i === 2 ? 2 : 1} {...draw(0.5 + i * 0.2)} />
        ))}
        {[
          "M110 130 C 105 100 80 90 70 50",
          "M110 130 C 118 100 140 90 150 50",
          "M290 130 C 285 100 260 90 250 50",
          "M290 130 C 298 100 320 90 330 50",
          "M200 110 C 200 80 200 70 200 30",
        ].map((d, i) => (
          <motion.path key={d} d={d} fill="none" stroke={G} strokeOpacity={i === 4 ? 1 : 0.3} strokeWidth={i === 4 ? 2 : 0.8} {...draw(1.1 + i * 0.12)} />
        ))}
        {[[70, 50], [150, 50], [250, 50], [330, 50]].map(([x, y]) => (
          <circle key={x} cx={x} cy={y} r="3" fill="none" stroke={G} strokeOpacity="0.5" />
        ))}
        <circle cx="200" cy="30" r="5" fill={G} />
        <text x="214" y="34" style={label}>CONSIDERED PATH</text>
      </svg>
    );
  }
  if (id === "precision") {
    const nodes = [
      { x: 60, y: 60, t: "TEXT" },
      { x: 340, y: 60, t: "IMAGE" },
      { x: 60, y: 340, t: "VOICE" },
      { x: 340, y: 340, t: "WORLD" },
    ];
    return (
      <svg viewBox="0 0 400 400" className="w-full" role="img" aria-label="Four inputs converging into one line of reasoning">
        {nodes.map((n, i) => (
          <g key={n.t}>
            <motion.path d={`M${n.x} ${n.y} L 200 200`} stroke={G} strokeOpacity="0.55" fill="none" {...draw(i * 0.2, 1.4)} />
            <circle cx={n.x} cy={n.y} r="5" fill="none" stroke={G} />
            <text x={n.x < 200 ? n.x - 2 : n.x + 2} y={n.y < 200 ? n.y - 14 : n.y + 22} textAnchor={n.x < 200 ? "start" : "end"} style={label}>
              {n.t}
            </text>
          </g>
        ))}
        {Array.from({ length: 36 }, (_, i) => {
          const a = (i / 36) * Math.PI * 2;
          const long = i % 3 === 0;
          return (
            <line key={i} x1={200 + Math.cos(a) * (long ? 40 : 44)} y1={200 + Math.sin(a) * (long ? 40 : 44)} x2={200 + Math.cos(a) * 52} y2={200 + Math.sin(a) * 52} stroke={G} strokeOpacity={long ? 0.9 : 0.4} />
          );
        })}
        <motion.path d="M200 200 L 200 28" stroke={G} strokeWidth="2" fill="none" {...draw(1, 1.4)} />
        <circle cx="200" cy="200" r="5" fill={G} />
      </svg>
    );
  }
  // continuity: a spiral that keeps widening
  let d = "";
  for (let i = 0; i <= 260; i++) {
    const a = i * 0.075;
    const r = 8 + i * 0.66;
    d += `${i === 0 ? "M" : "L"} ${(200 + Math.cos(a) * r).toFixed(1)} ${(200 + Math.sin(a) * r).toFixed(1)} `;
  }
  return (
    <svg viewBox="0 0 400 400" className="w-full" role="img" aria-label="A widening spiral representing an intelligence that grows over years">
      <motion.path d={d} fill="none" stroke={G} strokeWidth="1.4" {...draw(0, 3)} />
      <circle cx="200" cy="200" r="3.5" fill={G} />
      <text x="212" y="190" style={label}>YEAR ONE</text>
      <text x="300" y="396" style={label}>AND BEYOND</text>
    </svg>
  );
}

export default function Pillars() {
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 60%", "end 70%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 24 });

  return (
    <section id="intelligence" className="relative bg-ink py-28 md:py-40">
      <div ref={ref} className="mx-auto grid max-w-[1500px] gap-16 px-6 md:px-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <Reveal>
              <p className="eyebrow mb-6">Intelligence Without Compromise</p>
            </Reveal>
            <Headline lines={["Beyond", "What Is Necessary."]} className="display text-[clamp(2.6rem,6vw,5.4rem)]" />
            <Reveal delay={0.3}>
              <p className="mt-8 max-w-md leading-relaxed text-ivory/80">
                A fine diving watch will survive depths its owner will never visit. VÉRAN is built in the same spirit:
                capability far beyond the everyday, as a matter of principle.
              </p>
            </Reveal>

            <ol className="mt-12 hidden gap-5 lg:grid" aria-label="Four principles">
              {PILLARS.map((p, i) => (
                <li key={p.id} className="flex items-center gap-5">
                  <span className={`h-px transition-all duration-700 ${active === i ? "w-14 bg-gold" : "w-6 bg-ivory/30"}`} />
                  <span className={`font-serif text-2xl transition-colors duration-700 ${active === i ? "text-gold" : "text-ivory/45"}`}>
                    {p.word}
                  </span>
                </li>
              ))}
            </ol>

            <div className="mt-12 hidden h-24 w-px bg-ivory/15 lg:block" aria-hidden>
              <motion.div style={{ scaleY: progress }} className="h-full w-px origin-top bg-gold" />
            </div>
            <p className="mt-10 max-w-md text-xs leading-relaxed text-ivory/50">
              These are ambitious product design goals for a concept, not independently verified performance claims.
            </p>
          </div>
        </div>

        <div className="space-y-24 lg:col-span-7 lg:space-y-0">
          {PILLARS.map((p, i) => (
            <motion.div
              key={p.id}
              onViewportEnter={() => setActive(i)}
              viewport={{ amount: 0.5 }}
              className="grid items-center gap-8 border-t border-gold/20 py-10 md:grid-cols-2 lg:min-h-[78vh] lg:py-16"
            >
              <div>
                <p className="text-[0.65rem] tracking-[0.35em] text-gold">0{i + 1}</p>
                <h3 className="display mt-3 text-5xl md:text-6xl">{p.word}</h3>
                <p className="mt-5 font-serif text-xl italic text-ivory/90">{p.line}</p>
                <p className="mt-5 leading-relaxed text-ivory/75">{p.body}</p>
              </div>
              <div className="mx-auto w-full max-w-sm">
                <Diagram id={p.id} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
