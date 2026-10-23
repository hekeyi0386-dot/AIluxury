"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EDITIONS } from "@/lib/data";
import Watch from "./Watch";
import TiltWatch from "./TiltWatch";
import { Headline, Reveal } from "./motion";

export default function Collection({ onRequest }: { onRequest: (editionId: string) => void }) {
  const [ei, setEi] = useState(0);
  const [fi, setFi] = useState(0);
  const [detail, setDetail] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLButtonElement>(null);
  const ed = EDITIONS[ei];
  const fin = ed.finishes[fi];

  const pick = (i: number) => {
    setEi(i);
    setFi(0);
  };

  useEffect(() => {
    if (!detail) return;
    const opener = openerRef.current;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setDetail(false);
    window.addEventListener("keydown", esc);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", esc);
      opener?.focus();
    };
  }, [detail]);

  return (
    <section id="collection" className="relative bg-ink py-28 md:py-40">
      <div className="mx-auto max-w-[1500px] px-6 md:px-12">
        <Reveal>
          <p className="eyebrow mb-6">The Collection</p>
        </Reveal>
        <Headline lines={["Discover", "the Collection."]} className="display text-[clamp(2.8rem,7vw,6.2rem)]" />
        <Reveal delay={0.3}>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-ivory/80">
            Three editions, each made in limited annual numbers and individually numbered. None are for sale from a
            shelf. Each is commissioned.
          </p>
        </Reveal>

        {/* Edition selector cards */}
        <div role="tablist" aria-label="Choose an edition" className="mt-16 grid gap-px bg-gold/20 md:grid-cols-3">
          {EDITIONS.map((e, i) => (
            <button
              key={e.id}
              role="tab"
              aria-selected={ei === i}
              aria-controls="edition-stage"
              onClick={() => pick(i)}
              className={`group relative flex items-center gap-5 p-6 text-left transition-colors duration-500 md:flex-col md:items-start md:gap-6 md:p-8 ${
                ei === i ? "bg-forest" : "bg-ink hover:bg-forest/60"
              }`}
            >
              <div className="h-28 w-24 shrink-0 transition-transform duration-700 group-hover:scale-105 md:h-56 md:w-full">
                <Watch edition={e} live={false} className="mx-auto h-full w-auto" label={`VÉRAN ONE ${e.name}`} />
              </div>
              <div>
                <p className="eyebrow mb-2">VÉRAN ONE</p>
                <h3 className={`font-serif text-3xl uppercase tracking-[0.2em] ${ei === i ? "text-gold" : ""}`}>{e.name}</h3>
                <p className="mt-2 text-sm text-ivory/65">{e.line}</p>
              </div>
              <span
                aria-hidden
                className={`absolute inset-x-0 bottom-0 h-px bg-gold transition-transform duration-700 ${ei === i ? "scale-x-100" : "scale-x-0"}`}
              />
            </button>
          ))}
        </div>

        {/* Stage */}
        <div id="edition-stage" role="tabpanel" className="mt-px grid items-center gap-12 bg-forest p-6 md:p-14 lg:grid-cols-12">
          <div className="relative lg:col-span-6">
            <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(195,163,107,0.22),transparent_65%)]" />
            <AnimatePresence mode="wait">
              <motion.div
                key={ed.id + fi}
                initial={{ opacity: 0, rotateY: -35, scale: 0.94 }}
                animate={{ opacity: 1, rotateY: 0, scale: 1 }}
                exit={{ opacity: 0, rotateY: 35, scale: 0.94 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                style={{ perspective: 1200 }}
                className="relative mx-auto w-[min(70vw,360px)] lg:w-[min(32vw,440px)]"
              >
                <TiltWatch edition={ed} finish={fin} className="h-full w-full" max={14} />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="lg:col-span-6">
            <AnimatePresence mode="wait">
              <motion.div key={ed.id} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
                <p className="eyebrow mb-4">VÉRAN ONE — {ed.name.toUpperCase()}</p>
                <h3 className="display text-4xl md:text-6xl">{ed.line}</h3>
                <p className="mt-6 max-w-lg leading-relaxed text-ivory/80">{ed.blurb}</p>
                <dl className="mt-8 grid grid-cols-2 gap-6 border-y border-gold/20 py-6">
                  <div>
                    <dt className="eyebrow mb-1">Case</dt>
                    <dd className="text-sm text-ivory/85">{ed.material}</dd>
                  </div>
                  <div>
                    <dt className="eyebrow mb-1">Dial</dt>
                    <dd className="text-sm text-ivory/85">{ed.dial}</dd>
                  </div>
                </dl>
              </motion.div>
            </AnimatePresence>

            <fieldset className="mt-8">
              <legend className="eyebrow mb-4">Strap · {fin.name}</legend>
              <div className="flex gap-4">
                {ed.finishes.map((f, i) => (
                  <label key={f.name} className="cursor-pointer">
                    <input
                      type="radio"
                      name="finish"
                      className="peer sr-only"
                      checked={fi === i}
                      onChange={() => setFi(i)}
                      aria-label={f.name}
                    />
                    <span
                      className="block h-11 w-11 rounded-full border border-ivory/30 ring-offset-2 ring-offset-forest transition-all peer-checked:ring-1 peer-checked:ring-gold peer-focus-visible:ring-2 peer-focus-visible:ring-gold"
                      style={{ background: `radial-gradient(circle at 35% 30%, ${f.stitch}, ${f.strap} 55%)` }}
                    />
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="mt-10 flex flex-wrap gap-5">
              <button onClick={() => onRequest(ed.id)} className="btn btn-solid">
                <span>Request a Private Appointment</span>
              </button>
              <button ref={openerRef} onClick={() => setDetail(true)} className="btn">
                <span>View Details</span>
              </button>
            </div>
            <p className="mt-6 text-xs text-ivory/45">Price on consultation. By appointment only.</p>
          </div>
        </div>
      </div>

      {/* Detail view */}
      <AnimatePresence>
        {detail && (
          <motion.div
            className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/90 p-4 backdrop-blur-md md:p-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setDetail(false)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="detail-title"
              onClick={(e) => e.stopPropagation()}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative grid max-h-[92vh] w-full max-w-6xl gap-8 overflow-y-auto border border-gold/30 bg-forest p-6 md:grid-cols-2 md:p-12"
            >
              <button ref={closeRef} onClick={() => setDetail(false)} className="absolute right-4 top-4 z-10 px-3 py-2 text-[0.65rem] uppercase tracking-[0.3em] text-gold hover:text-ivory">
                Close ✕
              </button>
              <div className="mx-auto w-[min(60vw,340px)] md:w-full md:max-w-[420px]">
                <TiltWatch edition={ed} finish={fin} className="w-full" max={18} />
                <p className="mt-2 text-center text-[0.6rem] uppercase tracking-[0.3em] text-ivory/50">Move to rotate</p>
              </div>
              <div>
                <p className="eyebrow mb-3">VÉRAN ONE — {ed.name.toUpperCase()}</p>
                <h3 id="detail-title" className="display text-4xl md:text-5xl">{ed.line}</h3>
                <dl className="mt-8 divide-y divide-gold/20 border-y border-gold/20">
                  {ed.details.map((d) => (
                    <div key={d.label} className="grid grid-cols-3 gap-4 py-3">
                      <dt className="eyebrow">{d.label}</dt>
                      <dd className="col-span-2 text-sm text-ivory/85">{d.value}</dd>
                    </div>
                  ))}
                  <div className="grid grid-cols-3 gap-4 py-3">
                    <dt className="eyebrow">Strap</dt>
                    <dd className="col-span-2 text-sm text-ivory/85">{fin.name}</dd>
                  </div>
                </dl>
                <p className="mt-5 text-xs leading-relaxed text-ivory/50">
                  Design intent for a speculative concept. These are not certified specifications and no test results
                  are implied.
                </p>
                <button
                  onClick={() => {
                    setDetail(false);
                    onRequest(ed.id);
                  }}
                  className="btn btn-solid mt-6"
                >
                  <span>Request a Private Appointment</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
