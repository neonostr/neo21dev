import { useRef, useState } from "react";
import {
  HIGHLIGHTS,
  HighlightId,
  PALETTES,
  applyHighlights,
  applyPalette,
  getStoredHighlights,
  getStoredPaletteId,
} from "@/lib/palettes";

export const Footer = () => {
  const [revealed, setRevealed] = useState(false);
  const [paletteId, setPaletteId] = useState(getStoredPaletteId);
  const [highlights, setHighlights] = useState<HighlightId[]>(getStoredHighlights);
  const clicks = useRef<number[]>([]);

  const handleSloganClick = () => {
    const now = Date.now();
    clicks.current = [...clicks.current.filter((t) => now - t < 1500), now];
    if (clicks.current.length >= 5) {
      clicks.current = [];
      setRevealed((r) => !r);
    }
  };

  const cycle = () => {
    const i = PALETTES.findIndex((p) => p.id === paletteId);
    const next = PALETTES[(i + 1) % PALETTES.length];
    applyPalette(next.id, true);
    setPaletteId(next.id);
  };

  const setHl = (next: HighlightId[]) => {
    applyHighlights(next, true);
    setHighlights(next);
  };

  const toggle = (id: HighlightId) =>
    setHl(highlights.includes(id) ? highlights.filter((h) => h !== id) : [...highlights, id]);

  const current = PALETTES.find((p) => p.id === paletteId) ?? PALETTES[0];
  const allOn = highlights.length === HIGHLIGHTS.length;

  return (
    <footer className="py-12 mt-8 border-t">
      <div className="flex flex-col gap-4 items-start max-md:items-center">
        <p className="text-sm text-muted-foreground select-none" onClick={handleSloganClick}>
          It's time to build the world we want to live in.
        </p>
        {revealed && (
          <div className="flex flex-col gap-3 items-start max-md:items-center text-xs uppercase tracking-widest">
            <button
              type="button"
              onClick={cycle}
              className="inline-flex items-center gap-2 text-foreground transition-colors"
            >
              <span className="h-2.5 w-2.5 rounded-full bg-primary" />
              {current.name}
              <span className="text-muted-foreground">
                {PALETTES.indexOf(current) + 1}/{PALETTES.length}
              </span>
            </button>
            <div className="flex flex-wrap gap-x-3 gap-y-2 max-md:justify-center">
              {HIGHLIGHTS.map((h) => {
                const on = highlights.includes(h.id);
                return (
                  <button
                    key={h.id}
                    type="button"
                    aria-pressed={on}
                    onClick={() => toggle(h.id)}
                    className={`inline-flex items-center gap-1.5 transition-colors ${
                      on ? "text-foreground" : "text-muted-foreground line-through"
                    }`}
                  >
                    <span className={`h-2 w-2 border border-foreground ${on ? "bg-foreground" : ""}`} />
                    {h.label}
                  </button>
                );
              })}
              <button
                type="button"
                onClick={() => setHl(allOn ? [] : HIGHLIGHTS.map((h) => h.id))}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {allOn ? "None" : "All"}
              </button>
            </div>
          </div>
        )}
      </div>
    </footer>
  );
};
