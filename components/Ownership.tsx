"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EDITIONS, JOURNEY } from "@/lib/data";
import { Headline, Reveal } from "./motion";

type Values = {
  name: string;
  email: string;
  city: string;
  edition: string;
  format: string;
  date: string;
  message: string;
  consent: boolean;
};
type Errors = Partial<Record<keyof Values, string>>;

const EMPTY: Values = { name: "", email: "", city: "", edition: "", format: "geneva", date: "", message: "", consent: false };

function validate(v: Values): Errors {
  const e: Errors = {};
  if (v.name.trim().length < 2) e.name = "Please enter your full name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = "Please enter a valid email address.";
  if (v.city.trim().length < 2) e.city = "Please tell us where you are based.";
  if (!v.edition) e.edition = "Please choose an edition to discuss.";
  if (v.date) {
    const d = new Date(v.date + "T00:00:00");
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (Number.isNaN(d.getTime()) || d < today) e.date = "Please choose a date in the future.";
  }
  if (!v.consent) e.consent = "Please confirm that you understand this is a concept demonstration.";
  return e;
}

const field =
  "w-full border-0 border-b border-ivory/30 bg-transparent px-0 py-3 font-serif text-xl text-ivory placeholder:text-ivory/35 focus:border-gold focus:outline-none focus:ring-0";

export default function Ownership({ edition }: { edition: string }) {
  const [v, setV] = useState<Values>({ ...EMPTY, edition });
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState<{ ref: string; name: string; edition: string } | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const doneRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (edition) setV((s) => ({ ...s, edition }));
  }, [edition]);

  useEffect(() => {
    if (sent) doneRef.current?.focus();
  }, [sent]);

  const set = <K extends keyof Values>(k: K, val: Values[K]) => {
    setV((s) => ({ ...s, [k]: val }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const submit = (ev: FormEvent) => {
    ev.preventDefault();
    const e = validate(v);
    setErrors(e);
    const first = (Object.keys(e) as (keyof Values)[])[0];
    if (first) {
      (formRef.current?.elements.namedItem(first) as HTMLElement | null)?.focus();
      return;
    }
    // Demo only: nothing is transmitted or stored.
    const ref = "VRN-" + Math.random().toString(36).slice(2, 8).toUpperCase();
    setSent({ ref, name: v.name.trim().split(" ")[0], edition: EDITIONS.find((x) => x.id === v.edition)?.name ?? "" });
  };

  const reset = () => {
    setSent(null);
    setV({ ...EMPTY, edition });
    setErrors({});
  };

  const err = (k: keyof Values) =>
    errors[k] ? (
      <p id={`${k}-err`} role="alert" className="mt-2 text-sm text-[#e8b4a0]">
        {errors[k]}
      </p>
    ) : null;
  const aria = (k: keyof Values) => ({
    "aria-invalid": errors[k] ? true : undefined,
    "aria-describedby": errors[k] ? `${k}-err` : undefined,
  });

  return (
    <section id="ownership" className="relative bg-ink py-28 md:py-40">
      <div className="mx-auto max-w-[1500px] px-6 md:px-12">
        <Reveal>
          <p className="eyebrow mb-6">Private Ownership</p>
        </Reveal>
        <Headline lines={["An Experience", "Beyond Ownership."]} className="display text-[clamp(2.8rem,7vw,6.2rem)]" />
        <Reveal delay={0.3}>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-ivory/80">
            A VÉRAN is not added to a basket. It is commissioned: numbered, personalised and cared for across a
            lifetime.
          </p>
        </Reveal>

        <ol className="relative mt-20 grid gap-10 md:grid-cols-5 md:gap-6">
          <span aria-hidden className="absolute left-0 right-0 top-[1.15rem] hidden h-px bg-gold/30 md:block" />
          {JOURNEY.map((j, i) => (
            <motion.li
              key={j.n}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 1, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <span className="relative z-10 mb-6 flex h-9 w-9 items-center justify-center rounded-full border border-gold bg-ink font-serif text-sm text-gold">
                {j.n}
              </span>
              <h3 className="font-serif text-2xl leading-tight">{j.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ivory/70">{j.body}</p>
            </motion.li>
          ))}
        </ol>

        {/* Form */}
        <div id="appointment" className="mt-28 grid gap-14 border-t border-gold/25 pt-20 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal>
              <p className="eyebrow mb-5">Private Appointments</p>
              <h3 className="display text-4xl md:text-5xl">Request a Private Appointment</h3>
              <p className="mt-6 leading-relaxed text-ivory/75">
                Tell us a little about yourself. A house specialist would reply personally to arrange a consultation
                in Geneva or privately by video.
              </p>
              <p className="mt-8 border-l border-gold pl-4 text-sm leading-relaxed text-ivory/60">
                Demonstration only. VÉRAN is a fictional concept: this form runs entirely in your browser and nothing
                is sent, stored or answered.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  className="border border-gold/40 bg-forest p-8 md:p-14"
                  role="status"
                >
                  <p className="eyebrow mb-5">Demonstration submission</p>
                  <h3 ref={doneRef} tabIndex={-1} className="display text-4xl outline-none md:text-5xl">
                    Thank you, {sent.name}.
                  </h3>
                  <p className="mt-6 leading-relaxed text-ivory/80">
                    In a real house, a specialist would now write to you about the {sent.edition} edition. Here, this is
                    where the story pauses: no message was sent and no data left your browser.
                  </p>
                  <p className="mt-8 text-[0.7rem] uppercase tracking-[0.3em] text-gold">Reference · {sent.ref} (demo)</p>
                  <button onClick={reset} className="btn mt-10">
                    <span>Make another request</span>
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  ref={formRef}
                  onSubmit={submit}
                  noValidate
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid gap-x-10 gap-y-9 md:grid-cols-2"
                >
                  <div>
                    <label htmlFor="name" className="eyebrow">Full name</label>
                    <input id="name" name="name" autoComplete="name" value={v.name} onChange={(e) => set("name", e.target.value)} className={field} placeholder="Your name" {...aria("name")} />
                    {err("name")}
                  </div>
                  <div>
                    <label htmlFor="email" className="eyebrow">Email</label>
                    <input id="email" name="email" type="email" autoComplete="email" value={v.email} onChange={(e) => set("email", e.target.value)} className={field} placeholder="you@example.com" {...aria("email")} />
                    {err("email")}
                  </div>
                  <div>
                    <label htmlFor="city" className="eyebrow">City</label>
                    <input id="city" name="city" autoComplete="address-level2" value={v.city} onChange={(e) => set("city", e.target.value)} className={field} placeholder="Where you are based" {...aria("city")} />
                    {err("city")}
                  </div>
                  <div>
                    <label htmlFor="edition" className="eyebrow">Edition of interest</label>
                    <select id="edition" name="edition" value={v.edition} onChange={(e) => set("edition", e.target.value)} className={`${field} [&>option]:bg-forest`} {...aria("edition")}>
                      <option value="">Select an edition</option>
                      {EDITIONS.map((e) => (
                        <option key={e.id} value={e.id}>
                          VÉRAN ONE — {e.name}
                        </option>
                      ))}
                    </select>
                    {err("edition")}
                  </div>

                  <fieldset>
                    <legend className="eyebrow mb-3">Consultation</legend>
                    <div className="flex flex-col gap-3">
                      {[
                        ["geneva", "In person, Geneva"],
                        ["video", "Private video"],
                      ].map(([val, lab]) => (
                        <label key={val} className="flex cursor-pointer items-center gap-3 text-ivory/85">
                          <input type="radio" name="format" value={val} checked={v.format === val} onChange={() => set("format", val)} className="h-4 w-4 accent-[#C3A36B]" />
                          {lab}
                        </label>
                      ))}
                    </div>
                  </fieldset>
                  <div>
                    <label htmlFor="date" className="eyebrow">Preferred date (optional)</label>
                    <input id="date" name="date" type="date" value={v.date} onChange={(e) => set("date", e.target.value)} className={`${field} [color-scheme:dark]`} {...aria("date")} />
                    {err("date")}
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="message" className="eyebrow">What would you like your intelligence to help you go further in? (optional)</label>
                    <textarea id="message" name="message" rows={3} value={v.message} onChange={(e) => set("message", e.target.value)} className={`${field} resize-none`} placeholder="A few words are enough" />
                  </div>

                  <div className="md:col-span-2">
                    <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-ivory/75">
                      <input name="consent" type="checkbox" checked={v.consent} onChange={(e) => set("consent", e.target.checked)} className="mt-1 h-4 w-4 accent-[#C3A36B]" {...aria("consent")} />
                      I understand this is a fictional concept and the form is a demonstration: nothing will be sent or
                      stored.
                    </label>
                    {err("consent")}
                  </div>

                  <div className="md:col-span-2">
                    <button type="submit" className="btn btn-solid">
                      <span>Request a Private Appointment</span>
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
