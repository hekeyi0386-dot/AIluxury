export type SceneKind =
  | "observatory"
  | "ocean"
  | "architecture"
  | "mountain"
  | "geneva"
  | "workshop";

/** Deterministic pseudo-random so server and client render the same SVG. */
function rng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

export function gearPath(cx: number, cy: number, rOuter: number, rInner: number, teeth: number) {
  const pts: string[] = [];
  const step = (Math.PI * 2) / teeth;
  for (let i = 0; i < teeth; i++) {
    const a = i * step;
    const q = step / 4;
    const seq: [number, number][] = [
      [a - q * 1.3, rInner],
      [a - q * 0.7, rOuter],
      [a + q * 0.7, rOuter],
      [a + q * 1.3, rInner],
    ];
    seq.forEach(([ang, r], j) =>
      pts.push(`${i === 0 && j === 0 ? "M" : "L"} ${(cx + Math.cos(ang) * r).toFixed(1)} ${(cy + Math.sin(ang) * r).toFixed(1)}`),
    );
  }
  return pts.join(" ") + " Z";
}

function Defs({ k }: { k: string }) {
  return (
    <defs>
      <filter id={`blur-${k}`}>
        <feGaussianBlur stdDeviation="14" />
      </filter>
      <filter id={`blur-s-${k}`}>
        <feGaussianBlur stdDeviation="3" />
      </filter>
    </defs>
  );
}

function Observatory() {
  const r = rng(7);
  const stars = Array.from({ length: 160 }, () => ({
    x: r() * 1600,
    y: r() * 560,
    s: r() * 1.6 + 0.3,
    o: r() * 0.7 + 0.25,
  }));
  return (
    <svg viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden>
      <Defs k="obs" />
      <defs>
        <linearGradient id="obs-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#050d0b" />
          <stop offset="0.55" stopColor="#0c2a22" />
          <stop offset="0.85" stopColor="#3b3a2c" />
          <stop offset="1" stopColor="#7a6238" />
        </linearGradient>
        <linearGradient id="obs-beam" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#f0d89a" stopOpacity="0.55" />
          <stop offset="1" stopColor="#f0d89a" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="obs-dome" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#26302d" />
          <stop offset="1" stopColor="#070b0a" />
        </linearGradient>
      </defs>
      <rect width="1600" height="1000" fill="url(#obs-sky)" />
      {stars.map((s, i) => (
        <circle key={i} cx={s.x} cy={s.y} r={s.s} fill="#f5f1e8" opacity={s.o} />
      ))}
      <ellipse cx="1180" cy="700" rx="520" ry="150" fill="#c3a36b" opacity="0.22" filter="url(#blur-obs)" />
      {/* Ridge */}
      <path d="M0 760 C 200 700 320 780 520 720 C 720 660 860 760 1060 700 C 1260 650 1420 720 1600 680 L1600 1000 L0 1000Z" fill="#0b1512" />
      <path d="M0 860 C 260 800 460 880 760 830 C 1060 780 1300 880 1600 820 L1600 1000 L0 1000Z" fill="#060c0a" />
      {/* Dome */}
      <g transform="translate(980 440)">
        <path d="M-210 280 A 210 210 0 0 1 210 280 Z" fill="url(#obs-dome)" />
        <path d="M-210 280 A 210 210 0 0 1 210 280" fill="none" stroke="#c3a36b" strokeOpacity="0.5" strokeWidth="2" />
        <path d="M-26 74 L 26 74 L 40 280 L -40 280 Z" fill="#f0d89a" opacity="0.9" />
        <path d="M-26 74 L 26 74 L 90 -420 L -90 -420 Z" fill="url(#obs-beam)" opacity="0.7" />
        <rect x="-260" y="278" width="520" height="40" fill="#0a100e" />
        {[-150, -90, -30, 30, 90, 150].map((x) => (
          <line key={x} x1={x} y1="280" x2={x * 0.5} y2="80" stroke="#c3a36b" strokeOpacity="0.14" />
        ))}
      </g>
      {/* Figure */}
      <g transform="translate(360 700)">
        <circle cx="0" cy="-118" r="13" fill="#030605" />
        <path d="M-18 -100 Q 0 -112 18 -100 L 26 40 L -26 40 Z" fill="#030605" />
        <path d="M18 -90 L 62 -126" stroke="#030605" strokeWidth="9" strokeLinecap="round" />
        <circle cx="64" cy="-128" r="3" fill="#f0d89a" />
      </g>
    </svg>
  );
}

function Ocean() {
  const r = rng(11);
  const glints = Array.from({ length: 70 }, (_, i) => {
    const t = i / 70;
    return { y: 560 + t * 360, w: 30 + t * 380 * r() + 10, o: 0.15 + r() * 0.55 * (1 - t * 0.5), dx: (r() - 0.5) * 120 * (0.3 + t) };
  });
  return (
    <svg viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden>
      <Defs k="oc" />
      <defs>
        <linearGradient id="oc-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0e3a35" />
          <stop offset="0.5" stopColor="#4a6a58" />
          <stop offset="0.78" stopColor="#d9b073" />
          <stop offset="1" stopColor="#f3dca6" />
        </linearGradient>
        <linearGradient id="oc-sea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#b69258" />
          <stop offset="0.12" stopColor="#1c4a43" />
          <stop offset="1" stopColor="#04130f" />
        </linearGradient>
        <radialGradient id="oc-sun" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#fff6d8" />
          <stop offset="0.25" stopColor="#f6dc9a" stopOpacity="0.8" />
          <stop offset="1" stopColor="#f6dc9a" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="1600" height="1000" fill="url(#oc-sky)" />
      <circle cx="1050" cy="560" r="330" fill="url(#oc-sun)" />
      <circle cx="1050" cy="560" r="46" fill="#fff8e2" />
      <path d="M0 330 C 300 290 500 350 800 310 C 1100 270 1300 340 1600 300 L1600 420 L0 420Z" fill="#fff" opacity="0.06" filter="url(#blur-oc)" />
      <rect y="560" width="1600" height="440" fill="url(#oc-sea)" />
      {glints.map((g, i) => (
        <rect key={i} x={1050 + g.dx - g.w / 2} y={g.y} width={g.w} height={1.5 + i / 30} fill="#f8e3ad" opacity={g.o} />
      ))}
      {/* Research vessel */}
      <g transform="translate(330 548)" fill="#05100d">
        <path d="M0 0 L 250 0 L 232 22 L 24 22 Z" />
        <rect x="150" y="-34" width="62" height="34" />
        <rect x="170" y="-62" width="26" height="28" />
        <line x1="112" y1="0" x2="112" y2="-96" stroke="#05100d" strokeWidth="3" />
        <line x1="112" y1="-90" x2="40" y2="0" stroke="#05100d" strokeWidth="1" />
        <line x1="112" y1="-90" x2="190" y2="-34" stroke="#05100d" strokeWidth="1" />
        <rect x="44" y="-18" width="44" height="18" />
      </g>
      <path d="M0 880 C 220 840 400 900 640 870 C 900 836 1120 910 1600 860 L1600 1000 L0 1000Z" fill="#020907" />
      <path d="M0 940 C 300 910 700 960 1000 930 C 1260 905 1450 950 1600 925 L1600 1000 L0 1000Z" fill="#010504" />
    </svg>
  );
}

function Architecture() {
  const ribs = Array.from({ length: 15 }, (_, i) => i);
  return (
    <svg viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden>
      <Defs k="ar" />
      <defs>
        <linearGradient id="ar-wall" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2b302d" />
          <stop offset="1" stopColor="#0b0f0d" />
        </linearGradient>
        <linearGradient id="ar-beam" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f4dca0" stopOpacity="0.8" />
          <stop offset="1" stopColor="#f4dca0" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="ar-floor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8a7a58" />
          <stop offset="1" stopColor="#0c100e" />
        </linearGradient>
      </defs>
      <rect width="1600" height="1000" fill="url(#ar-wall)" />
      {/* Vaulted ribs converging at a vanishing point */}
      {ribs.map((i) => {
        const x = -200 + i * 130;
        return (
          <path
            key={i}
            d={`M ${x} 1000 C ${x + 40} 560 ${800 + (x - 800) * 0.35} 220 ${800 + (x - 800) * 0.12} 40`}
            fill="none"
            stroke="#c3a36b"
            strokeOpacity={0.1 + (1 - Math.abs(i - 7) / 8) * 0.22}
            strokeWidth={2 + (1 - Math.abs(i - 7) / 8) * 5}
          />
        );
      })}
      {Array.from({ length: 8 }, (_, i) => (
        <ellipse key={i} cx="800" cy={120 + i * 70} rx={90 + i * 95} ry={20 + i * 22} fill="none" stroke="#f5f1e8" strokeOpacity={0.05 + i * 0.012} />
      ))}
      <polygon points="1120,0 1600,0 1600,640 1000,760" fill="url(#ar-beam)" opacity="0.35" />
      <polygon points="1260,0 1420,0 1180,820 960,800" fill="url(#ar-beam)" opacity="0.25" />
      <rect y="760" width="1600" height="240" fill="url(#ar-floor)" />
      <polygon points="1000,760 1180,820 1500,1000 1000,1000" fill="#f4dca0" opacity="0.2" />
      {/* Figure holding a model */}
      <g transform="translate(560 770)">
        <circle cx="0" cy="-196" r="15" fill="#040706" />
        <path d="M-26 -172 Q 0 -188 26 -172 L 36 0 L -36 0 Z" fill="#040706" />
        <path d="M20 -150 L 78 -128" stroke="#040706" strokeWidth="11" strokeLinecap="round" />
        <path d="M80 -150 L 112 -128 L 80 -106 L 48 -128 Z" fill="#c3a36b" opacity="0.9" />
      </g>
    </svg>
  );
}

function Mountain() {
  const r = rng(23);
  const ridge = (base: number, amp: number, seed: number) => {
    const q = rng(seed);
    let d = `M0 1000 L0 ${base}`;
    for (let x = 0; x <= 1600; x += 80) d += ` L ${x} ${base - q() * amp}`;
    return d + " L1600 1000 Z";
  };
  return (
    <svg viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden>
      <Defs k="mt" />
      <defs>
        <linearGradient id="mt-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0b2b24" />
          <stop offset="0.7" stopColor="#7d8b73" />
          <stop offset="1" stopColor="#e5cf9c" />
        </linearGradient>
        <linearGradient id="mt-mist" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f5f1e8" stopOpacity="0" />
          <stop offset="1" stopColor="#f5f1e8" stopOpacity="0.35" />
        </linearGradient>
      </defs>
      <rect width="1600" height="1000" fill="url(#mt-sky)" />
      <path d={ridge(560, 260, Math.floor(r() * 1000) + 3)} fill="#587364" opacity="0.7" />
      <rect y="560" width="1600" height="180" fill="url(#mt-mist)" />
      <path d={ridge(680, 240, 41)} fill="#2d4a3e" opacity="0.9" />
      <rect y="660" width="1600" height="160" fill="url(#mt-mist)" opacity="0.8" />
      <path d={ridge(800, 220, 59)} fill="#12281f" />
      <path d={ridge(910, 120, 71)} fill="#07130f" />
    </svg>
  );
}

function Geneva() {
  return (
    <svg viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden>
      <Defs k="ge" />
      <defs>
        <linearGradient id="ge-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0d3329" />
          <stop offset="0.6" stopColor="#8c9a7c" />
          <stop offset="1" stopColor="#ecd8a8" />
        </linearGradient>
        <linearGradient id="ge-lake" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#c7b27c" />
          <stop offset="0.2" stopColor="#2c5f55" />
          <stop offset="1" stopColor="#071a15" />
        </linearGradient>
      </defs>
      <rect width="1600" height="1000" fill="url(#ge-sky)" />
      <path d="M0 520 L180 400 L300 470 L520 300 L680 440 L860 360 L1060 470 L1260 330 L1440 450 L1600 400 L1600 640 L0 640Z" fill="#66806f" opacity="0.7" />
      <path d="M0 580 L260 500 L420 560 L700 470 L980 560 L1240 490 L1600 560 L1600 640 L0 640Z" fill="#3a584b" />
      {/* Lakefront buildings */}
      {Array.from({ length: 22 }, (_, i) => {
        const h = 36 + ((i * 53) % 70);
        return <rect key={i} x={40 + i * 70} y={640 - h} width="52" height={h} fill="#1a2b25" opacity="0.95" />;
      })}
      <rect y="640" width="1600" height="360" fill="url(#ge-lake)" />
      {/* Jet d'eau */}
      <path d="M1180 640 L 1180 330" stroke="#fff" strokeOpacity="0.9" strokeWidth="5" strokeLinecap="round" />
      <path d="M1180 330 Q 1130 330 1100 420 M1180 330 Q 1230 330 1260 420" stroke="#fff" strokeOpacity="0.5" strokeWidth="3" fill="none" />
      {Array.from({ length: 36 }, (_, i) => (
        <rect key={i} x={620 + ((i * 97) % 520)} y={660 + i * 9} width={30 + ((i * 41) % 150)} height="2" fill="#f4dca0" opacity={0.15 + ((i * 7) % 5) * 0.08} />
      ))}
      <path d="M0 900 C 400 880 900 930 1600 890 L1600 1000 L0 1000Z" fill="#030a08" />
    </svg>
  );
}

function Workshop() {
  return (
    <svg viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden>
      <Defs k="wk" />
      <defs>
        <radialGradient id="wk-bg" cx="0.65" cy="0.4" r="0.8">
          <stop offset="0" stopColor="#3a2f1c" />
          <stop offset="0.5" stopColor="#10201a" />
          <stop offset="1" stopColor="#040807" />
        </radialGradient>
        <linearGradient id="wk-metal" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f3e2b0" />
          <stop offset="0.4" stopColor="#8f7343" />
          <stop offset="0.7" stopColor="#d6bb80" />
          <stop offset="1" stopColor="#4d3d1f" />
        </linearGradient>
        <linearGradient id="wk-steel" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#e8ecec" />
          <stop offset="0.45" stopColor="#6c7476" />
          <stop offset="0.75" stopColor="#c1c7c8" />
          <stop offset="1" stopColor="#2f3637" />
        </linearGradient>
      </defs>
      <rect width="1600" height="1000" fill="url(#wk-bg)" />
      <g filter="url(#blur-s-wk)" opacity="0.5">
        <path d={gearPath(1240, 260, 300, 262, 40)} fill="url(#wk-metal)" />
      </g>
      <path d={gearPath(1000, 560, 280, 238, 36)} fill="url(#wk-metal)" />
      <circle cx="1000" cy="560" r="190" fill="#0b130f" stroke="url(#wk-steel)" strokeWidth="6" />
      {[0, 60, 120, 180, 240, 300].map((a) => (
        <path key={a} d="M1000 560 L 1000 400" stroke="url(#wk-metal)" strokeWidth="26" strokeLinecap="round" transform={`rotate(${a} 1000 560)`} />
      ))}
      <circle cx="1000" cy="560" r="36" fill="url(#wk-steel)" />
      <circle cx="1000" cy="560" r="10" fill="#050a08" />
      <path d={gearPath(560, 700, 190, 160, 28)} fill="url(#wk-steel)" />
      <circle cx="560" cy="700" r="108" fill="#0b130f" stroke="url(#wk-metal)" strokeWidth="5" />
      <circle cx="560" cy="700" r="22" fill="url(#wk-metal)" />
      <path d={gearPath(1420, 820, 130, 108, 24)} fill="url(#wk-steel)" />
      <circle cx="1420" cy="820" r="30" fill="#0b130f" />
      {[[420, 360], [740, 300], [260, 520]].map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="20" fill="url(#wk-metal)" />
          <line x1={x - 14} y1={y} x2={x + 14} y2={y} stroke="#1a1408" strokeWidth="4" transform={`rotate(${i * 40 + 20} ${x} ${y})`} />
        </g>
      ))}
    </svg>
  );
}

const SCENES: Record<SceneKind, () => JSX.Element> = {
  observatory: Observatory,
  ocean: Ocean,
  architecture: Architecture,
  mountain: Mountain,
  geneva: Geneva,
  workshop: Workshop,
};

/** A graded, grain-textured "photographic" frame built from generated vector art. */
export default function Scene({ kind, className = "" }: { kind: SceneKind; className?: string }) {
  const Comp = SCENES[kind];
  return (
    <div className={`scene-frame ${className}`}>
      <Comp />
    </div>
  );
}
