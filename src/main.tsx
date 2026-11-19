import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { applyPalette, getStoredPaletteId } from "./lib/palettes";

applyPalette(getStoredPaletteId());

createRoot(document.getElementById("root")!).render(<App />);
