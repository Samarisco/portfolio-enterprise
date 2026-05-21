import { describe, expect, it } from "vitest";
import { siteConfig } from "./site";

describe("siteConfig", () => {
  it("keeps primary navigation anchored to landing sections", () => {
    expect(siteConfig.navigation.map((item) => item.href)).toEqual([
      "#experience",
      "#projects",
      "#skills",
      "#roadmap",
      "#contact",
    ]);
  });
});
