

## Fix: Pin category labels to bottom of ProjectCard

The card descriptions vary in length, causing the category labels to sit at different vertical positions. The fix is to make the `<a>` wrapper a flex column with `h-full`, and add `mt-auto` to the label so it always sticks to the bottom.

### Changes

**`src/components/landing/ProjectCard.tsx`**
- Add `flex flex-col h-full` to the `<a>` container classes
- Remove `mb-4` from the `<p>` description (no longer needed since `mt-auto` handles spacing)
- Add `mt-auto pt-4` to the `<span>` label to push it to the bottom with consistent spacing

This also requires the parent grids in `FeaturedProjects.tsx` and `ProjectArchive.tsx` to have `items-stretch` (which is the default for CSS grid), so no changes needed there.

