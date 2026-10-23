"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { EDITIONS } from "@/lib/data";
import TiltWatch from "./TiltWatch";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const watchY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const glowScale = useTransform(scrollYProgress, [0, 1], [1, 1.35]);

  return (
    <section ref={ref} id="top" className="relative flex min-h-[100svh] items-center overflow-hidden bg-ink">
      {/* Studio light */}
      <motion.div
        aria-hidden
        style={{ scale: glowScale }}
        className="absolute inset-0 bg-[radial-gradient(ellipse_55%_60%_at_68%_48%,rgba(195,163,107,0.28),rgba(18,61,48,0.5)_45%,#101513_80%)]"
      />
      <motion.div
        aria-hidden
        animate={{ opacity: [0.35, 0.6, 0.35], x: [0, 30, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-40 top-0 h-full w-[60vw] rotate-12 bg-gradient-to-r from-transparent via-gold/10 to-transparent blur-2xl"
      />
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink to-transparent" />

      <div className="relative mx-auto grid w-full max-w-[1500px] items-center gap-6 px-6 pb-24 pt-32 md:px-12 lg:grid-cols-12">
        <motion.div style={{ y: textY, opacity: fade }} className="order-2 lg:order-1 lg:col-span-6">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1.2 }}
            className="eyebrow mb-8"
          >
            The Art of Intelligence · Geneva
          </motion.p>
          <h1 className="display text-[clamp(3.4rem,9.5vw,8.6rem)] text-ivory" aria-label="Beyond Intelligence.">
            {["BEYOND", "INTELLIGENCE."].map((l, i) => (
              <span key={l} className="block overflow-hidden pb-[0.08em]" aria-hidden>
                <motion.span
                  className={`block ${i === 1 ? "shimmer italic" : ""}`}
                  initial={{ y: "115%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.6, delay: 0.45 + i * 0.18, ease: [0.22, 1, 0.36, 1] }}
                >
                  {l}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 1.2 }}
            className="mt-10 max-w-md font-serif text-2xl font-light italic leading-snug text-ivory/85 md:text-[1.7rem]"
          >
            An extraordinary instrument for those who see further.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 1.2 }}
            className="mt-12 flex flex-wrap items-center gap-8"
          >
            <a href="#instrument" className="btn">
              <span>Discover VÉRAN ONE</span>
            </a>
            <a href="#appointment" className="text-[0.68rem] uppercase tracking-[0.3em] text-ivory/70 underline decoration-gold/60 underline-offset-8 transition-colors hover:text-gold">
              Request a private appointment
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          style={{ y: watchY }}
          initial={{ opacity: 0, scale: 0.88, rotate: -4 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 2.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="order-1 mx-auto w-[min(78vw,430px)] lg:order-2 lg:col-span-6 lg:w-[min(46vw,640px)] lg:justify-self-center"
        >
          <div className="sweep">
            <TiltWatch edition={EDITIONS[0]} float max={14} mode="time" />
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex" aria-hidden>
        <span className="text-[0.6rem] uppercase tracking-[0.4em] text-ivory/60">Scroll</span>
        <motion.span
          animate={{ scaleY: [0.3, 1, 0.3], originY: 0 }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          className="block h-12 w-px bg-gold"
        />
      </div>
    </section>
  );
}
