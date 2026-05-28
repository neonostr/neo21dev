#!/usr/bin/env node
// Generates CONTENT.md from the site's source content (projects + hero/footer copy).
// Run via the generate-content GitHub Action whenever source files change.

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

// --- Extract projects from src/data/projects.ts ---
const projectsSrc = readFileSync(resolve(root, "src/data/projects.ts"), "utf8");

// Match the projects: Project[] = [ ... ]; array
const arrMatch = projectsSrc.match(/export const projects:\s*Project\[\]\s*=\s*\[([\s\S]*?)\n\];/);
if (!arrMatch) {
  console.error("Could not find projects array in src/data/projects.ts");
  process.exit(1);
}

// Naively eval the array literal (it contains only string/number/boolean literals).
const arrLiteral = "[" + arrMatch[1] + "]";
// eslint-disable-next-line no-new-func
const projects = new Function(`return (${arrLiteral});`)();

const categoryLabels = { bitcoin: "Bitcoin", nostr: "Nostr", other: "Other" };

// --- Extract hero copy ---
const heroSrc = readFileSync(resolve(root, "src/components/landing/Hero.tsx"), "utf8");
const stripTags = (s) => s.replace(/\s+/g, " ").trim();
const heroH1 = stripTags((heroSrc.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [, ""])[1]);
const heroParas = [...heroSrc.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/g)].map((m) => stripTags(m[1]));

// --- Extract footer copy ---
const footerSrc = readFileSync(resolve(root, "src/components/landing/Footer.tsx"), "utf8");
const footerLine = stripTags((footerSrc.match(/<p[^>]*>([\s\S]*?)<\/p>/) || [, ""])[1]);

// --- Build markdown ---
const sorted = [...projects].sort((a, b) => a.order - b.order);
const featured = sorted.filter((p) => p.featured);

const grouped = { bitcoin: [], nostr: [], other: [] };
for (const p of sorted) grouped[p.category]?.push(p);

const lines = [];
lines.push("# neo21.dev");
lines.push("");
lines.push(`> ${heroH1}`);
lines.push("");
for (const para of heroParas) lines.push(para + "\n");

lines.push("## Featured");
lines.push("");
for (const p of featured) {
  lines.push(`- **[${p.name}](${p.url})** — ${p.description}`);
}
lines.push("");

lines.push("## All Projects");
lines.push("");
for (const cat of ["bitcoin", "nostr", "other"]) {
  if (!grouped[cat].length) continue;
  lines.push(`### ${categoryLabels[cat]}`);
  lines.push("");
  for (const p of grouped[cat]) {
    lines.push(`- **[${p.name}](${p.url})** — ${p.description}`);
  }
  lines.push("");
}

lines.push("---");
lines.push("");
lines.push(`_${footerLine}_`);
lines.push("");
lines.push(`<sub>Auto-generated from source on ${new Date().toISOString().slice(0, 10)}.</sub>`);
lines.push("");

const out = resolve(root, "CONTENT.md");
writeFileSync(out, lines.join("\n"));
console.log(`Wrote ${out} (${sorted.length} projects)`);
