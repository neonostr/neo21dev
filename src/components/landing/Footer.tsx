import { useRef, useState } from "react";
import { PALETTES, applyPalette, getStoredPaletteId } from "@/lib/palettes";

export const Footer = () => {
  const [revealed, setRevealed] = useState(false);
  const [paletteId, setPaletteId] = useState(getStoredPaletteId);
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

  const current = PALETTES.find((p) => p.id === paletteId) ?? PALETTES[0];

  return (
    <footer className="py-12 mt-8 border-t">
      <div className="flex flex-col gap-3 items-start max-md:items-center">
        <p className="text-sm text-muted-foreground select-none" onClick={handleSloganClick}>
          It's time to build the world we want to live in.
        </p>
        {revealed && (
          <button
            type="button"
            onClick={cycle}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
          >
            <span className="h-2.5 w-2.5 rounded-full bg-primary" />
            {current.name}
          </button>
        )}
      </div>
    </footer>
  );
};
