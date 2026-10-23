"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { NAV } from "@/lib/data";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = [...NAV.map((n) => n.id), "appointment"];
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", esc);
    return () => {
      window.removeEventListener("keydown", esc);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <a
        href="#main"
        className="sr-only z-[100] bg-gold px-4 py-2 text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ${
          scrolled || open ? "bg-ink/85 py-4 backdrop-blur-md" : "bg-transparent py-7"
        }`}
      >
        <div className={`absolute inset-x-0 bottom-0 h-px bg-gold/25 transition-opacity ${scrolled ? "opacity-100" : "opacity-0"}`} />
        <nav className="mx-auto flex max-w-[1500px] items-center justify-between px-6 md:px-12" aria-label="Primary">
          <a href="#top" className="font-serif text-2xl tracking-[0.42em] text-ivory" aria-label="VÉRAN — home">
            VÉRAN
          </a>
          <ul className="hidden items-center gap-10 lg:flex">
            {NAV.map((n) => (
              <li key={n.id}>
                <a
                  href={`#${n.id}`}
                  aria-current={active === n.id ? "true" : undefined}
                  className={`group relative text-[0.68rem] uppercase tracking-[0.28em] transition-colors ${
                    active === n.id ? "text-gold" : "text-ivory/80 hover:text-ivory"
                  }`}
                >
                  {n.label}
                  <span
                    className={`absolute -bottom-2 left-0 h-px bg-gold transition-all duration-500 ${
                      active === n.id ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#appointment"
            className="hidden border border-gold/70 px-5 py-2.5 text-[0.65rem] uppercase tracking-[0.28em] text-gold transition-colors hover:bg-gold hover:text-ink lg:inline-block"
          >
            Private Appointment
          </a>
          <button
            className="relative z-[60] flex h-11 w-11 flex-col items-center justify-center gap-[7px] lg:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            <span className={`h-px w-7 bg-ivory transition-transform duration-500 ${open ? "translate-y-[4px] rotate-45" : ""}`} />
            <span className={`h-px w-7 bg-ivory transition-transform duration-500 ${open ? "-translate-y-[4px] -rotate-45" : ""}`} />
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 flex flex-col justify-center bg-forest px-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ul className="space-y-5">
              {[...NAV, { id: "appointment", label: "Private Appointments" }].map((n, i) => (
                <motion.li
                  key={n.id}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.12 + i * 0.07, duration: 0.7 }}
                >
                  <a
                    href={`#${n.id}`}
                    onClick={() => setOpen(false)}
                    className="font-serif text-4xl font-light text-ivory"
                  >
                    {n.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <p className="eyebrow mt-14">Geneva · Concept house</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
