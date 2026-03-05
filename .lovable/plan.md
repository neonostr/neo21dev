

## Dark Mode Toggle Implementation

### Approach
Use `next-themes` (already installed) with `localStorage` persistence. Place a sun/moon icon button in the top-right corner of the page. Default to light mode, but respect saved preference on return visits.

### Changes

1. **`src/main.tsx`** — Wrap `<App />` with `<ThemeProvider>` from `next-themes`, configured with `attribute="class"`, `defaultTheme="light"`, `storageKey="theme"`.

2. **`src/components/ThemeToggle.tsx`** (new) — A button component using `useTheme()` from `next-themes`. Shows `Sun` icon in dark mode, `Moon` icon in light mode. Clicking toggles between them. Styled as a ghost icon button positioned unobtrusively.

3. **`src/pages/Index.tsx`** — Add `<ThemeToggle />` in the top-right corner of the page (fixed or absolute positioned within the container).

4. **`index.html`** — Add `class="light"` to `<html>` tag to prevent flash of unstyled content (next-themes handles the rest).

### How it works
- `next-themes` stores the user's choice in `localStorage` automatically
- On return visits, it reads `localStorage` and applies the saved theme before React hydrates, preventing flash
- The dark mode CSS variables already exist in `src/index.css` under `.dark`

