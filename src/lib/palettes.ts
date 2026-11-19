// Accent palettes. Add new entries here; DEFAULT_PALETTE_ID is what normal visitors see.
export interface Palette {
  id: string;
  name: string;
  primary: string; // strong accent, HSL triplet
  primaryForeground: string; // text on the strong accent
  soft: string; // light tint of the accent (row hover, text selection)
}

export const PALETTES: Palette[] = [
  { id: "mono", name: "Monochrome", primary: "0 0% 4%", primaryForeground: "0 0% 100%", soft: "0 0% 96%" },
  { id: "amber", name: "Radiant Amber", primary: "38 92% 50%", primaryForeground: "0 0% 4%", soft: "48 96% 89%" },
  { id: "solar", name: "Solar Orange", primary: "33 100% 55%", primaryForeground: "0 0% 4%", soft: "36 100% 89%" },
  { id: "blaze", name: "Blaze Orange", primary: "22 100% 51%", primaryForeground: "0 0% 4%", soft: "24 100% 90%" },
  { id: "ember", name: "Ember Red", primary: "12 100% 54%", primaryForeground: "0 0% 4%", soft: "16 100% 91%" },
  { id: "lime", name: "Electric Lime", primary: "84 81% 44%", primaryForeground: "0 0% 4%", soft: "80 89% 89%" },
  { id: "aqua", name: "Electric Aqua", primary: "189 94% 43%", primaryForeground: "0 0% 4%", soft: "185 96% 90%" },
  { id: "violet", name: "Electric Violet", primary: "262 83% 58%", primaryForeground: "0 0% 100%", soft: "251 91% 95%" },
  { id: "jade", name: "Cyber Jade", primary: "160 84% 39%", primaryForeground: "0 0% 100%", soft: "149 80% 90%" },
];

export const DEFAULT_PALETTE_ID = "amber";

// Places where the accent can show. Each can be switched on/off in the hidden switcher.
export const HIGHLIGHTS = [
  { id: "button", label: "Button" },
  { id: "filter", label: "Filter" },
  { id: "underline", label: "Underline" },
  { id: "rows", label: "Row names" },
  { id: "tint", label: "Row tint" },
  { id: "headings", label: "Headings" },
  { id: "updates", label: "Updates" },
  { id: "selection", label: "Selection" },
  { id: "focus", label: "Focus" },
] as const;
export type HighlightId = (typeof HIGHLIGHTS)[number]["id"];
export const DEFAULT_HIGHLIGHTS: HighlightId[] = ["button", "underline"];

const STORAGE_KEY = "neo21-palette";
const HL_KEY = "neo21-highlights-v3";

const read = (k: string) => {
  try {
    return localStorage.getItem(k);
  } catch {
    return null;
  }
};
const write = (k: string, v: string) => {
  try {
    localStorage.setItem(k, v);
  } catch {
    /* ignore */
  }
};

export const getStoredPaletteId = (): string => {
  const id = read(STORAGE_KEY);
  return id && PALETTES.some((p) => p.id === id) ? id : DEFAULT_PALETTE_ID;
};

export const getStoredHighlights = (): HighlightId[] => {
  const raw = read(HL_KEY);
  if (raw === null) return DEFAULT_HIGHLIGHTS;
  const ids = HIGHLIGHTS.map((h) => h.id) as string[];
  return raw.split(",").filter((x) => ids.includes(x)) as HighlightId[];
};

export const applyPalette = (id: string, persist = false) => {
  const p = PALETTES.find((x) => x.id === id) ?? PALETTES[0];
  const root = document.documentElement.style;
  root.setProperty("--primary", p.primary);
  root.setProperty("--primary-foreground", p.primaryForeground);
  root.setProperty("--accent-soft", p.soft);
  root.setProperty("--ring", p.primary);
  // Monochrome = original look: highlights only apply when a real accent is picked.
  document.documentElement.toggleAttribute("data-accent", p.id !== "mono");
  if (persist) write(STORAGE_KEY, p.id);
  return p;
};

export const applyHighlights = (on: HighlightId[], persist = false) => {
  const el = document.documentElement;
  HIGHLIGHTS.forEach((h) => el.toggleAttribute(`data-hl-${h.id}`, on.includes(h.id)));
  if (persist) write(HL_KEY, on.join(","));
};
