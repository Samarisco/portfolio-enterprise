import { describe, expect, it } from "vitest";
import { invariant, toSlug } from "./index";

describe("utils", () => {
  it("normalizes text into stable slugs", () => {
    expect(toSlug("Revenue Intelligence OS")).toBe("revenue-intelligence-os");
    expect(toSlug("  Arquitectura SaaS Premium  ")).toBe("arquitectura-saas-premium");
  });

  it("throws when an invariant is violated", () => {
    expect(() => invariant(false, "Expected condition")).toThrow("Expected condition");
  });
});
