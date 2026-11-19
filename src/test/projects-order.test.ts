import { describe, it, expect } from "vitest";
import { allProjects, featuredProjects, projects } from "@/data/projects";

describe("allProjects ordering", () => {
  it("lists featured apps first, in featured order", () => {
    expect(allProjects.slice(0, featuredProjects.length).map((p) => p.id)).toEqual(
      featuredProjects.map((p) => p.id),
    );
  });

  it("lists the non-featured apps A–Z after them", () => {
    const rest = allProjects.slice(featuredProjects.length);
    const names = rest.map((p) => p.name);
    const sortedNames = [...names].sort((a, b) =>
      a.localeCompare(b, undefined, { sensitivity: "base" }),
    );
    expect(names).toEqual(sortedNames);
    expect(names).toEqual([
      "Daylight",
      "Kcal",
      "Like2RSS",
      "Listr",
      "Movie Finder",
      "Nostr2RSS",
      "Nostrpacks",
      "NostrPad",
      "The Ultimate Orange Pill",
      "WTF Happened In 2030",
      "Youtube Client",
    ]);
  });

  it("keeps every project exactly once", () => {
    expect(allProjects.length).toBe(projects.length);
    expect(new Set(allProjects.map((p) => p.id)).size).toBe(projects.length);
  });
});
