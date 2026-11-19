import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { applyHighlights, applyPalette, getStoredHighlights, getStoredPaletteId } from "./lib/palettes";

applyPalette(getStoredPaletteId());
applyHighlights(getStoredHighlights());

createRoot(document.getElementById("root")!).render(<App />);
