import { describe, it, expect } from "vitest";
import { allProjects, featuredProjects, projects } from "@/data/projects";

describe("project ordering", () => {
  it("sorts All Projects A–Z, including featured apps", () => {
    const names = allProjects.map((p) => p.name);
    expect(names).toEqual(
      [...names].sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" })),
    );
  });

  it("keeps Featured in featuredOrder", () => {
    const orders = featuredProjects.map((p) => p.featuredOrder ?? 0);
    expect(orders).toEqual([...orders].sort((a, b) => a - b));
  });

  it("keeps every project exactly once", () => {
    expect(allProjects.length).toBe(projects.length);
  });
});
