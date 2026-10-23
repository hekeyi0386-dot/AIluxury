"use client";

import { STORIES } from "@/lib/data";
import Scene from "./Scene";
import { Headline, ParallaxFrame, Reveal } from "./motion";

export default function Exploration() {
  return (
    <section id="exploration" className="relative bg-ink py-28 md:py-40">
      <div className="mx-auto max-w-[1500px] px-6 md:px-12">
        <Reveal>
          <p className="eyebrow mb-6">The People Who Go Further</p>
        </Reveal>
        <Headline lines={["Made for the", "Extraordinary."]} className="display text-[clamp(2.8rem,7vw,6.2rem)]" />
        <Reveal delay={0.3}>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-ivory/80">
            VÉRAN is not worn to be more productive. It is chosen by a particular kind of person: ambitious, curious,
            quietly confident. Three concept campaigns.
          </p>
        </Reveal>
      </div>

      <div className="mt-24 space-y-32 md:space-y-48">
        {STORIES.map((s, i) => {
          const flip = i % 2 === 1;
          return (
            <article key={s.id} id={s.id} className="relative">
              <div className="mx-auto grid max-w-[1700px] items-center gap-10 md:px-12 lg:grid-cols-12 lg:gap-x-0">
                <div className={`lg:col-span-8 lg:row-start-1 ${flip ? "lg:col-start-5" : "lg:col-start-1"}`}>
                  <ParallaxFrame className="aspect-[4/3] md:aspect-[16/11]" distance={60}>
                    <Scene kind={s.kind} className="h-full w-full" />
                  </ParallaxFrame>
                </div>
                <div
                  className={`relative z-10 px-6 md:px-0 lg:col-span-5 lg:row-start-1 lg:self-center ${
                    flip ? "lg:col-start-1" : "lg:col-start-8"
                  }`}
                >
                  <div className="bg-ink/95 p-0 lg:border lg:border-gold/25 lg:bg-forest/95 lg:p-12 lg:shadow-2xl lg:backdrop-blur">
                    <Reveal>
                      <p className="eyebrow mb-5">{s.kicker}</p>
                      <h3 className="font-serif text-xl uppercase tracking-[0.3em] text-gold">{s.role}</h3>
                      <p className="display mt-6 text-[clamp(1.9rem,3.4vw,3rem)]">{s.title}</p>
                      <p className="mt-6 leading-relaxed text-ivory/80">{s.body}</p>
                      <blockquote className="mt-8 border-l border-gold pl-5 font-serif text-xl italic leading-snug text-ivory">
                        “{s.quote}”
                      </blockquote>
                      <p className="mt-8 text-[0.65rem] uppercase tracking-[0.25em] text-ivory/55">{s.meta}</p>
                      <p className="mt-2 text-[0.65rem] tracking-wide text-ivory/40">
                        Fictional concept scenario. Not a real partnership or endorsement.
                      </p>
                    </Reveal>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Manifesto band over mountains */}
      <div className="relative mt-32 md:mt-48">
        <ParallaxFrame className="h-[70vh] min-h-[420px]" distance={90}>
          <Scene kind="mountain" className="h-full w-full" />
        </ParallaxFrame>
        <div className="absolute inset-0 z-10 flex items-center justify-center px-6 text-center">
          <Reveal className="max-w-4xl">
            <p className="eyebrow mb-6">The House Belief</p>
            <p className="display text-[clamp(1.9rem,4.8vw,4.2rem)] text-ivory">
              Intelligence is available to everyone.
              <br />
              <span className="shimmer italic">Mastery belongs to those who go further.</span>
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
