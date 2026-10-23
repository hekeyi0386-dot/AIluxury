const LINKS = [
  ["Collections", "#collection"],
  ["The House", "#house"],
  ["Craftsmanship", "#craftsmanship"],
  ["Exploration", "#exploration"],
  ["Private Appointments", "#appointment"],
  ["Contact", "#contact"],
];

export default function Footer() {
  return (
    <footer id="contact" className="relative bg-forest pb-10 pt-24">
      <div className="hairline absolute inset-x-0 top-0" />
      <div className="mx-auto max-w-[1500px] px-6 md:px-12">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="font-serif text-5xl tracking-[0.4em]">VÉRAN</p>
            <p className="mt-4 font-serif text-xl italic text-gold">Beyond Intelligence.</p>
            <p className="mt-8 max-w-xs text-sm leading-relaxed text-ivory/60">
              Geneva, Switzerland
              <br />
              Ultra-luxury personal AI instruments
            </p>
          </div>
          <nav aria-label="Footer" className="lg:col-span-4">
            <ul className="grid grid-cols-2 gap-x-6 gap-y-4">
              {LINKS.map(([l, h]) => (
                <li key={l}>
                  <a href={h} className="text-[0.7rem] uppercase tracking-[0.25em] text-ivory/75 transition-colors hover:text-gold">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="lg:col-span-3">
            <p className="eyebrow mb-3">Contact</p>
            <p className="text-sm leading-relaxed text-ivory/70">
              A fictional house. There is no address, telephone or inbox behind this page.
            </p>
          </div>
        </div>
        <div className="mt-20 flex flex-col gap-3 border-t border-gold/20 pt-8 text-xs leading-relaxed text-ivory/50 md:flex-row md:justify-between">
          <p>© 2026 VÉRAN. A speculative luxury brand concept created for a design school project.</p>
          <p>VÉRAN ONE is a conceptual product. Imagery is generated vector art; no partnerships, testimonials or certified specifications are implied.</p>
        </div>
      </div>
    </footer>
  );
}
