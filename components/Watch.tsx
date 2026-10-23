"use client";

import { useEffect, useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Edition, Finish } from "@/lib/data";

export type WatchMode = "time" | "ask" | "foresight" | "context";

export const MODES: { id: WatchMode; label: string; line: string }[] = [
  { id: "time", label: "GENÈVE", line: "Thursday · 23 October" },
  { id: "ask", label: "LISTENING", line: "Speak, or simply look" },
  { id: "foresight", label: "FORESIGHT", line: "Three paths considered" },
  { id: "context", label: "RECALLED", line: "From your notes, 2019" },
];

const CX = 280;
const CY = 380;

function useClock(enabled: boolean) {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    if (!enabled) return;
    const tick = () => setNow(Date.now() - new Date().getTimezoneOffset() * 60000);
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, [enabled]);
  return now;
}

export default function Watch({
  edition,
  finish,
  mode = "time",
  crown = 0,
  sheen = 0.5,
  live = true,
  className = "",
  label,
}: {
  edition: Edition;
  finish?: Finish;
  mode?: WatchMode;
  crown?: number;
  sheen?: number;
  live?: boolean;
  className?: string;
  label?: string;
}) {
  const uid = useId().replace(/:/g, "");
  const p = edition.palette;
  const fin = finish ?? edition.finishes[0];
  const now = useClock(live);

  // Static classic pose (10:09:36) until the client clock starts.
  const secTotal = now !== null ? now / 1000 : 36;
  const minTotal = now !== null ? now / 60000 : 9.6;
  const secA = secTotal * 6;
  const minA = minTotal * 6;
  const hourA = now !== null ? (now / 3600000) * 30 : 10 * 30 + 9.6 * 0.5;

  const m = MODES.find((x) => x.id === mode) ?? MODES[0];
  const id = (s: string) => `${s}-${uid}`;
  const url = (s: string) => `url(#${id(s)})`;
  const isLight = edition.id === "signature";

  const ticks = Array.from({ length: 60 }, (_, i) => i);
  const rays = Array.from({ length: 90 }, (_, i) => i);
  const flutes = 150;

  const hand = (len: number, w: number, tail: number) => {
    const half = (side: 1 | -1) =>
      `M ${CX} ${CY + tail} L ${CX + side * w} ${CY + tail - 4} L ${CX + side * (w * 0.55)} ${
        CY - len * 0.78
      } L ${CX} ${CY - len} Z`;
    return (
      <>
        <path d={half(-1)} fill={p.hand} />
        <path d={half(1)} fill={p.handShade} />
      </>
    );
  };

  return (
    <svg
      viewBox="0 0 600 760"
      className={className}
      role="img"
      aria-label={label ?? `VÉRAN ONE ${edition.name}: ${edition.line}`}
    >
      <defs>
        <linearGradient id={id("case")} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={p.caseStops[0]} />
          <stop offset="0.35" stopColor={p.caseStops[1]} />
          <stop offset="0.62" stopColor={p.caseStops[2]} />
          <stop offset="1" stopColor={p.caseStops[3]} />
        </linearGradient>
        <linearGradient id={id("caseR")} x1="1" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor={p.caseStops[0]} />
          <stop offset="0.4" stopColor={p.caseStops[3]} />
          <stop offset="0.7" stopColor={p.caseStops[2]} />
          <stop offset="1" stopColor={p.caseStops[1]} />
        </linearGradient>
        <radialGradient id={id("dial")} cx="0.38" cy="0.32" r="0.9">
          <stop offset="0" stopColor={p.dialInner} />
          <stop offset="1" stopColor={p.dialOuter} />
        </radialGradient>
        <linearGradient id={id("strap")} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={fin.strap} stopOpacity="1" />
          <stop offset="0.5" stopColor={fin.strap} stopOpacity="0.82" />
          <stop offset="1" stopColor={fin.strap} stopOpacity="1" />
        </linearGradient>
        <linearGradient id={id("strapShade")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#000" stopOpacity="0.55" />
          <stop offset="0.45" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={id("strapShadeB")} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#000" stopOpacity="0.55" />
          <stop offset="0.45" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={id("glass")} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.34" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0.02" />
          <stop offset="1" stopColor="#fff" stopOpacity="0.1" />
        </linearGradient>
        <linearGradient id={id("band")} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0.32" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <pattern
          id={id("knurl")}
          width="6"
          height="6"
          patternUnits="userSpaceOnUse"
          patternTransform={`translate(0 ${crown * 0.6})`}
        >
          <rect width="6" height="6" fill={p.caseStops[1]} />
          <rect width="6" height="2.6" fill={p.caseStops[0]} />
          <rect y="4.6" width="6" height="1.4" fill={p.caseStops[3]} />
        </pattern>
        <clipPath id={id("dialClip")}>
          <circle cx={CX} cy={CY} r="154" />
        </clipPath>
        <filter id={id("soft")} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.4" />
        </filter>
      </defs>

      {/* Straps */}
      <g>
        <path d="M 196 30 L 364 30 L 346 236 L 214 236 Z" fill={url("strap")} />
        <path d="M 196 30 L 364 30 L 346 236 L 214 236 Z" fill={url("strapShade")} />
        <path d="M 206 44 L 354 44 L 340 232 L 220 232" fill="none" stroke={fin.stitch} strokeWidth="1.4" strokeDasharray="5 4" opacity="0.8" />
        <path d="M 214 524 L 346 524 L 364 730 L 196 730 Z" fill={url("strap")} />
        <path d="M 214 524 L 346 524 L 364 730 L 196 730 Z" fill={url("strapShadeB")} />
        <path d="M 220 528 L 340 528 L 354 716 L 206 716" fill="none" stroke={fin.stitch} strokeWidth="1.4" strokeDasharray="5 4" opacity="0.8" />
        {[0, 1, 2, 3, 4].map((i) => (
          <circle key={i} cx={280} cy={610 + i * 24} r="3.4" fill="#000" opacity="0.5" />
        ))}
      </g>

      {/* Lugs */}
      {[
        [196, 196],
        [328, 196],
        [196, 494],
        [328, 494],
      ].map(([x, y], i) => (
        <g key={i}>
          <rect x={x} y={y} width="36" height="72" rx="15" fill={url("caseR")} />
          <rect x={x + 6} y={y + 4} width="5" height="64" rx="2.5" fill="#fff" opacity="0.28" />
        </g>
      ))}

      {/* Crown + guards */}
      <g>
        <rect x="452" y="318" width="34" height="26" rx="6" fill={url("case")} />
        <rect x="452" y="416" width="34" height="26" rx="6" fill={url("case")} />
        <rect x="456" y="344" width="46" height="72" rx="8" fill={url("knurl")} stroke="#000" strokeOpacity="0.4" />
        <rect x="496" y="350" width="10" height="60" rx="4" fill={url("case")} />
        <path d="M 501 372 L 506 372 L 503.5 392 Z" fill="#000" opacity="0.45" />
        <rect x="460" y="348" width="38" height="10" rx="4" fill="#fff" opacity="0.18" />
      </g>

      {/* Case */}
      <circle cx={CX} cy={CY} r="186" fill={url("case")} stroke="#000" strokeOpacity="0.45" strokeWidth="1.2" />
      <circle cx={CX} cy={CY} r="176" fill="none" stroke={p.caseStops[3]} strokeOpacity="0.5" strokeWidth="1" />
      <circle cx={CX} cy={CY} r="174" fill={url("caseR")} />
      <circle
        cx={CX}
        cy={CY}
        r="168"
        fill="none"
        stroke="#000"
        strokeOpacity="0.28"
        strokeWidth="14"
        strokeDasharray={`${(2 * Math.PI * 168) / flutes / 2.2} ${(2 * Math.PI * 168) / flutes - (2 * Math.PI * 168) / flutes / 2.2}`}
      />
      <circle cx={CX} cy={CY} r="160" fill={p.bezel} opacity="0.55" />
      <circle cx={CX} cy={CY} r="158" fill="#000" opacity="0.55" />

      {/* Dial */}
      <circle cx={CX} cy={CY} r="156" fill={url("dial")} />
      <g clipPath={url("dialClip")}>
        {rays.map((i) => (
          <line
            key={i}
            x1={CX}
            y1={CY}
            x2={CX + Math.cos((i / rays.length) * Math.PI * 2) * 170}
            y2={CY + Math.sin((i / rays.length) * Math.PI * 2) * 170}
            stroke={isLight ? "#8f7343" : "#fff"}
            strokeOpacity={i % 2 ? 0.035 : 0.075}
            strokeWidth="1"
          />
        ))}
        {[40, 62, 84, 106, 128].map((r) => (
          <circle key={r} cx={CX} cy={CY} r={r} fill="none" stroke={isLight ? "#8f7343" : "#fff"} strokeOpacity="0.07" strokeWidth="0.8" strokeDasharray="1.2 2.4" />
        ))}
        <circle cx={CX} cy={CY} r="154" fill="none" stroke="#000" strokeOpacity="0.5" strokeWidth="6" />
      </g>

      {/* Minute track */}
      {ticks.map((i) => {
        const a = (i / 60) * Math.PI * 2 - Math.PI / 2;
        const major = i % 5 === 0;
        const r1 = major ? 126 : 138;
        return (
          <line
            key={i}
            x1={CX + Math.cos(a) * r1}
            y1={CY + Math.sin(a) * r1}
            x2={CX + Math.cos(a) * 146}
            y2={CY + Math.sin(a) * 146}
            stroke={p.index}
            strokeOpacity={major ? 0 : 0.55}
            strokeWidth="1"
          />
        );
      })}

      {/* Applied indices */}
      {Array.from({ length: 12 }, (_, i) => {
        const deg = i * 30;
        const double = i === 0;
        const L = double ? 26 : i % 3 === 0 ? 24 : 18;
        const w = double ? 5 : 6.5;
        const offsets = double ? [-6.5, 6.5] : [0];
        return (
          <g key={i} transform={`rotate(${deg} ${CX} ${CY})`}>
            {offsets.map((o) => (
              <g key={o}>
                <rect x={CX + o - w / 2 - 0.8} y={CY - 146} width={w + 1.6} height={L + 1.6} rx="1.6" fill="#000" opacity="0.35" />
                <rect x={CX + o - w / 2} y={CY - 145.2} width={w} height={L} rx="1.2" fill={p.index} stroke={p.indexEdge} strokeWidth="0.8" />
                <rect x={CX + o - w / 2 + 0.8} y={CY - 144.4} width={w * 0.35} height={L - 1.6} fill="#fff" opacity={isLight ? 0.5 : 0.55} />
              </g>
            ))}
          </g>
        );
      })}

      {/* Brand */}
      <text
        x={CX}
        y={CY - 62}
        textAnchor="middle"
        fill={p.text}
        style={{ fontFamily: "var(--font-serif), Georgia, serif", fontSize: 22, letterSpacing: 9, fontWeight: 500 }}
      >
        VÉRAN
      </text>
      <text
        x={CX}
        y={CY - 44}
        textAnchor="middle"
        fill={p.text}
        opacity="0.7"
        style={{ fontFamily: "var(--font-sans), sans-serif", fontSize: 7.4, letterSpacing: 4.2 }}
      >
        ONE · GENÈVE
      </text>

      {/* AI aperture */}
      <g>
        <rect x={CX - 62} y={CY + 54} width="124" height="46" rx="8" fill={p.accent} opacity="0.7" />
        <rect x={CX - 60} y={CY + 56} width="120" height="42" rx="6.5" fill={p.aperture} />
        <rect x={CX - 60} y={CY + 56} width="120" height="42" rx="6.5" fill="none" stroke="#fff" strokeOpacity="0.08" />
        <AnimatePresence mode="wait">
          <motion.g
            key={m.id}
            initial={{ opacity: 0, y: 3 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -3 }}
            transition={{ duration: 0.35 }}
          >
            <text
              x={CX}
              y={CY + 74}
              textAnchor="middle"
              fill={p.apertureText}
              opacity="0.75"
              style={{ fontFamily: "var(--font-sans), sans-serif", fontSize: 6.6, letterSpacing: 3.2 }}
            >
              {m.label}
            </text>
            <text
              x={CX}
              y={CY + 89}
              textAnchor="middle"
              fill="#f3ecda"
              style={{ fontFamily: "var(--font-serif), Georgia, serif", fontSize: 11.5, fontStyle: "italic" }}
            >
              {m.line}
            </text>
          </motion.g>
        </AnimatePresence>
      </g>

      {/* Hands */}
      <g
        style={{
          transformOrigin: `${CX}px ${CY}px`,
          transform: `rotate(${hourA}deg)`,
          filter: "drop-shadow(1px 2px 1.5px rgba(0,0,0,.55))",
        }}
      >
        {hand(92, 6.5, 16)}
      </g>
      <g
        style={{
          transformOrigin: `${CX}px ${CY}px`,
          transform: `rotate(${minA}deg)`,
          filter: "drop-shadow(1px 2px 1.5px rgba(0,0,0,.55))",
        }}
      >
        {hand(132, 5.2, 18)}
      </g>
      <g
        style={{
          transformOrigin: `${CX}px ${CY}px`,
          transform: `rotate(${secA}deg)`,
          transition: now !== null ? "transform 1s linear" : "none",
          filter: "drop-shadow(1px 2px 1px rgba(0,0,0,.5))",
        }}
      >
        <line x1={CX} y1={CY + 34} x2={CX} y2={CY - 140} stroke={p.accent} strokeWidth="1.4" />
        <circle cx={CX} cy={CY - 112} r="3.4" fill="none" stroke={p.accent} strokeWidth="1.2" />
      </g>
      <circle cx={CX} cy={CY} r="7" fill={url("case")} stroke="#000" strokeOpacity="0.5" />
      <circle cx={CX} cy={CY} r="2.4" fill="#000" opacity="0.7" />

      {/* Sapphire */}
      <circle cx={CX} cy={CY} r="156" fill={url("glass")} />
      <g clipPath={url("dialClip")} style={{ mixBlendMode: "screen" }}>
        <g style={{ transform: `translateX(${(sheen - 0.5) * 360}px) rotate(18deg)`, transformOrigin: `${CX}px ${CY}px`, transition: "transform 0.3s ease-out" }}>
          <rect x={CX - 28} y={CY - 260} width="56" height="520" fill={url("band")} />
          <rect x={CX + 46} y={CY - 260} width="12" height="520" fill={url("band")} opacity="0.7" />
        </g>
      </g>
      <path
        d={`M ${CX - 128} ${CY - 70} A 140 140 0 0 1 ${CX - 40} ${CY - 136}`}
        stroke="#fff"
        strokeOpacity="0.5"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
        filter={url("soft")}
      />
      <circle cx={CX} cy={CY} r="156" fill="none" stroke="#fff" strokeOpacity="0.2" strokeWidth="1" />
    </svg>
  );
}
