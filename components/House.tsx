"use client";

import Scene from "./Scene";
import { Headline, ParallaxFrame, Reveal } from "./motion";

export default function House() {
  return (
    <section id="house" className="relative overflow-hidden bg-forest py-28 md:py-40">
      <div className="mx-auto max-w-[1500px] px-6 md:px-12">
        <Reveal>
          <p className="eyebrow mb-6">Our House · Geneva, 2026</p>
        </Reveal>
        <Headline
          lines={["Born from Precision.", "Driven by Possibility."]}
          className="display text-[clamp(2.4rem,6.4vw,5.8rem)]"
        />

        <div className="mt-20 grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <ParallaxFrame className="aspect-[4/3]" distance={50}>
              <Scene kind="geneva" className="h-full w-full" />
            </ParallaxFrame>
            <div className="mt-6 grid grid-cols-2 gap-6">
              <ParallaxFrame className="aspect-[4/3]" distance={30}>
                <Scene kind="workshop" className="h-full w-full" />
              </ParallaxFrame>
              <ParallaxFrame className="aspect-[4/3]" distance={30}>
                <Scene kind="architecture" className="h-full w-full" />
              </ParallaxFrame>
            </div>
            <p className="mt-4 text-[0.65rem] uppercase tracking-[0.25em] text-ivory/45">
              Lakeside Geneva · The workshop · The atelier hall (generated concept imagery)
            </p>
          </div>

          <div className="lg:col-span-5 lg:pt-10">
            <Reveal>
              <p className="font-serif text-2xl font-light italic leading-snug text-ivory md:text-3xl">
                The next generation of luxury would not be defined by material possessions alone, but by the
                intelligence those possessions could embody.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-10 space-y-6 leading-relaxed text-ivory/80">
                <p>
                  VÉRAN was founded in Geneva in 2026 by two people from opposite ends of the same question: a
                  precision-instrument designer, who believed an object should be made to outlast its maker, and an
                  artificial intelligence researcher, who believed intelligence should deepen a life rather than
                  crowd it.
                </p>
                <p>
                  Inspired by Swiss craftsmanship, they set out to build an instrument that people would not simply
                  use, but choose to own, care for, and eventually pass down.
                </p>
                <p>
                  The house brings together two disciplines: the art of making exceptional physical objects, and the
                  science of expanding human capability.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mt-12 grid grid-cols-2 gap-px bg-gold/25">
                {[
                  ["The Designer", "Precision-instrument maker. Believes in objects that endure."],
                  ["The Researcher", "AI scientist. Believes intelligence should be personal and discreet."],
                ].map(([t, b]) => (
                  <div key={t} className="bg-forest p-5">
                    <h3 className="font-serif text-xl text-gold">{t}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ivory/70">{b}</p>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-xs leading-relaxed text-ivory/45">
                A fictional brand narrative. The founders, the house and its history are invented for a design school
                project.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
