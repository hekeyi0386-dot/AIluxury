export type Palette = {
  caseStops: [string, string, string, string];
  bezel: string;
  dialInner: string;
  dialOuter: string;
  index: string;
  indexEdge: string;
  hand: string;
  handShade: string;
  text: string;
  accent: string;
  aperture: string;
  apertureText: string;
};

export type Finish = { name: string; strap: string; stitch: string };

export type Edition = {
  id: "classic" | "explorer" | "signature";
  name: string;
  line: string;
  material: string;
  dial: string;
  blurb: string;
  palette: Palette;
  finishes: Finish[];
  details: { label: string; value: string }[];
};

export const EDITIONS: Edition[] = [
  {
    id: "classic",
    name: "Classic",
    line: "Polished steel. Deep green dial.",
    material: "Polished & satin steel",
    dial: "Deep green, hand-guilloché pattern",
    blurb:
      "The house archetype. A mirror-polished case frames a dial the colour of Alpine forest at dusk, so quiet that the intelligence beneath it is easy to forget until the crown is turned.",
    palette: {
      caseStops: ["#f4f6f6", "#9ba3a5", "#e3e7e8", "#5f686a"],
      bezel: "#cfd5d6",
      dialInner: "#1d604b",
      dialOuter: "#082a20",
      index: "#f3efe4",
      indexEdge: "#9aa39d",
      hand: "#eef0ee",
      handShade: "#9ba3a5",
      text: "#e9e2cf",
      accent: "#C3A36B",
      aperture: "#050b09",
      apertureText: "#dcc590",
    },
    finishes: [
      { name: "Emerald calfskin", strap: "#123D30", stitch: "#C3A36B" },
      { name: "Black alligator-grain", strap: "#161a18", stitch: "#8e9694" },
      { name: "Cognac calfskin", strap: "#6d4326", stitch: "#e0c48a" },
    ],
    details: [
      { label: "Case", value: "Polished and satin-brushed steel, hand-finished" },
      { label: "Crystal", value: "Domed sapphire with anti-glare treatment" },
      { label: "Dial", value: "Deep green, radial guilloché, applied indices" },
      { label: "Crown", value: "Signed, knurled; the single control for the AI" },
      { label: "Intelligence", value: "Private assistant, discreet aperture at six" },
      { label: "Ownership", value: "Numbered piece, private consultation" },
    ],
  },
  {
    id: "explorer",
    name: "Explorer",
    line: "Brushed titanium. Dark graphite dial.",
    material: "Brushed titanium",
    dial: "Dark graphite, matte grain",
    blurb:
      "Conceived for the expedition. A lighter, darker object with a matte graphite dial and warm ivory indices, made for those who consult their instrument at the edge of the map.",
    palette: {
      caseStops: ["#c8cbcc", "#767b7d", "#aeb2b3", "#4a4f51"],
      bezel: "#9ea3a5",
      dialInner: "#3a403e",
      dialOuter: "#111514",
      index: "#efe6cf",
      indexEdge: "#6c716f",
      hand: "#e6dcc3",
      handShade: "#8b8470",
      text: "#d9d1bb",
      accent: "#C3A36B",
      aperture: "#040706",
      apertureText: "#dcc590",
    },
    finishes: [
      { name: "Graphite rubber-weave", strap: "#1c2120", stitch: "#6f7574" },
      { name: "Forest canvas", strap: "#1d3a2d", stitch: "#c3a36b" },
      { name: "Sand suede", strap: "#8a7a5c", stitch: "#2b2a23" },
    ],
    details: [
      { label: "Case", value: "Brushed titanium with a fine bead-blasted flank" },
      { label: "Crystal", value: "Flat sapphire, domed edge, anti-glare" },
      { label: "Dial", value: "Graphite grain, ivory applied indices" },
      { label: "Crown", value: "Oversized knurled crown with guards" },
      { label: "Intelligence", value: "Field-oriented modes, quiet by design" },
      { label: "Ownership", value: "Numbered piece, expedition briefing" },
    ],
  },
  {
    id: "signature",
    name: "Signature",
    line: "Warm gold details. Ivory dial.",
    material: "Steel with champagne gold",
    dial: "Ivory, sunray-brushed",
    blurb:
      "The edition made to be commissioned. Champagne gold, an ivory dial, and a personalised intelligence whose voice, name and engraving are decided in private with the house.",
    palette: {
      caseStops: ["#f6e8c2", "#b89350", "#ecd7a3", "#8a6b35"],
      bezel: "#d8bd80",
      dialInner: "#fbf7ec",
      dialOuter: "#dcd3bb",
      index: "#a98240",
      indexEdge: "#6f5628",
      hand: "#c7a465",
      handShade: "#7d6030",
      text: "#3b3524",
      accent: "#8F7343",
      aperture: "#171a18",
      apertureText: "#e3cb92",
    },
    finishes: [
      { name: "Midnight calfskin", strap: "#14201b", stitch: "#C3A36B" },
      { name: "Bordeaux calfskin", strap: "#4a1a22", stitch: "#d9bf86" },
      { name: "Ivory calfskin", strap: "#d9d0b9", stitch: "#8F7343" },
    ],
    details: [
      { label: "Case", value: "Steel with champagne-gold bezel and crown" },
      { label: "Crystal", value: "Domed sapphire, polished bevel" },
      { label: "Dial", value: "Ivory sunray finish, gold applied indices" },
      { label: "Crown", value: "Gold-toned, engraved with your initial" },
      { label: "Intelligence", value: "Named, voiced and engraved in private" },
      { label: "Ownership", value: "Individual commission, delivery ceremony" },
    ],
  },
];

export const NAV = [
  { id: "instrument", label: "The Instrument" },
  { id: "exploration", label: "Exploration" },
  { id: "craftsmanship", label: "Craftsmanship" },
  { id: "collection", label: "Collection" },
  { id: "house", label: "The House" },
];

export const STORIES = [
  {
    id: "visionary",
    kind: "observatory" as const,
    role: "The Visionary",
    kicker: "Concept story · The high observatory",
    title: "She recognised the pattern before the data could explain it.",
    body:
      "On a windswept ridge above the cloud line, an astrophysicist spends the long night with a question no instrument has settled. The crown turns once, and VÉRAN ONE sets her years of notes beside the latest readings, quietly proposing three ways the evidence might fit together.",
    quote: "Not an answer. A better question, at the moment it matters.",
    meta: "Scientist · Investigating difficult research questions",
  },
  {
    id: "pioneer",
    kind: "ocean" as const,
    role: "The Pioneer",
    kicker: "Concept story · The open ocean",
    title: "Beyond the chart, the water tells its own story.",
    body:
      "Dawn on a research vessel, three days from any harbour. An ocean explorer reads the shifting temperature, current and light, and VÉRAN ONE interprets what has changed since the last dive, helping decide where to go next and when to wait.",
    quote: "The sea changes by the hour. The instrument keeps pace.",
    meta: "Ocean explorer · Interpreting changing conditions on expedition",
  },
  {
    id: "architect",
    kind: "architecture" as const,
    role: "The Architect of Change",
    kicker: "Concept story · The unbuilt hall",
    title: "Complexity, resolved into a single, confident line.",
    body:
      "In a half-finished concrete hall, an architect holds a structure that does not yet exist. With a turn of the crown, VÉRAN ONE explores spans, loads and light across hundreds of possibilities, and returns the few that deserve to be built.",
    quote: "It never draws for me. It lets me see further before I draw.",
    meta: "Architect · Exploring structural and spatial possibilities",
  },
];

export const PILLARS = [
  {
    id: "depth",
    word: "Depth",
    line: "Years of context, held with discretion.",
    body:
      "An intelligence designed to retain and organise years of personal context that you choose to share, so each conversation begins where the last one ended.",
  },
  {
    id: "foresight",
    word: "Foresight",
    line: "Possible futures, weighed with care.",
    body:
      "Advanced analysis designed to help you explore possible futures and complex decisions, setting out the branches before you commit to one.",
  },
  {
    id: "precision",
    word: "Precision",
    line: "Text, image, voice and the world, as one.",
    body:
      "Multimodal reasoning designed to bring words, images, voice and connected information into a single, exacting line of thought.",
  },
  {
    id: "continuity",
    word: "Continuity",
    line: "An intelligence that grows with its owner.",
    body:
      "A personal intelligence designed to evolve alongside its owner, with an identity that deepens over years and may one day be passed on.",
  },
];

export const MAKING = [
  {
    id: "finishing",
    title: "Hand finishing",
    kicker: "I · The case",
    body:
      "Each case is brushed in a single direction, then polished by hand along its bevels, so that light moves across it the way it moves across a still lake. The difference between satin and mirror is a matter of a few degrees.",
  },
  {
    id: "assembly",
    title: "Precision assembly",
    kicker: "II · The movement of parts",
    body:
      "Wheels, bridges and screws are placed under magnification by a single watchmaker. The intelligence module is integrated beneath the dial with the same patience as any complication.",
  },
  {
    id: "materials",
    title: "Material selection",
    kicker: "III · The metals",
    body:
      "Steel for clarity, titanium for lightness, champagne gold for warmth. Every metal is chosen for how it ages, because an object meant to be passed down must grow more beautiful with use.",
  },
  {
    id: "sapphire",
    title: "Sapphire crystal",
    kicker: "IV · The window",
    body:
      "A domed sapphire crystal, cut, polished and treated to hold reflections without glare, lets the dial and its discreet aperture be read in any light.",
  },
  {
    id: "inspection",
    title: "Quality inspection",
    kicker: "V · The final eye",
    body:
      "Before an instrument is numbered, it is examined under the loupe by someone who did not make it. Anything less than exact is returned to the bench.",
  },
];

export const JOURNEY = [
  {
    n: "I",
    title: "Private Consultation",
    body: "A conversation, in Geneva or privately by video, about who you are and where you are going.",
  },
  {
    n: "II",
    title: "Personal Configuration",
    body: "Edition, metal, dial and strap are chosen with a house specialist. Your intelligence is given a name and a temperament.",
  },
  {
    n: "III",
    title: "Individual Commission",
    body: "Your instrument is made by hand and numbered. Its engraving and its identity are unique to you.",
  },
  {
    n: "IV",
    title: "Delivery Ceremony",
    body: "A quiet presentation in a private salon, where the crown is turned for the first time.",
  },
  {
    n: "V",
    title: "Lifelong Service",
    body: "Dedicated care for the object and its intelligence, for as long as you wish to wear it.",
  },
];
