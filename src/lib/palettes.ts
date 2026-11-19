// Accent palettes. Add new entries here; DEFAULT_PALETTE_ID is what normal visitors see.
export interface Palette {
  id: string;
  name: string;
  primary: string; // HSL triplet
  primaryForeground: string;
}

export const PALETTES: Palette[] = [
  { id: "mono", name: "Monochrome", primary: "0 0% 4%", primaryForeground: "0 0% 100%" },
  { id: "amber", name: "Radiant Amber", primary: "38 92% 50%", primaryForeground: "0 0% 4%" },
  { id: "lime", name: "Electric Lime", primary: "84 81% 44%", primaryForeground: "0 0% 4%" },
  { id: "aqua", name: "Electric Aqua", primary: "189 94% 43%", primaryForeground: "0 0% 4%" },
  { id: "violet", name: "Electric Violet", primary: "262 83% 58%", primaryForeground: "0 0% 100%" },
  { id: "jade", name: "Cyber Jade", primary: "160 84% 39%", primaryForeground: "0 0% 100%" },
];

export const DEFAULT_PALETTE_ID = "mono";
const STORAGE_KEY = "neo21-palette";

export const getStoredPaletteId = (): string => {
  try {
    const id = localStorage.getItem(STORAGE_KEY);
    if (id && PALETTES.some((p) => p.id === id)) return id;
  } catch {
    /* ignore */
  }
  return DEFAULT_PALETTE_ID;
};

export const applyPalette = (id: string, persist = false) => {
  const p = PALETTES.find((x) => x.id === id) ?? PALETTES[0];
  const root = document.documentElement.style;
  root.setProperty("--primary", p.primary);
  root.setProperty("--primary-foreground", p.primaryForeground);
  root.setProperty("--ring", p.primary);
  if (persist) {
    try {
      localStorage.setItem(STORAGE_KEY, p.id);
    } catch {
      /* ignore */
    }
  }
  return p;
};
