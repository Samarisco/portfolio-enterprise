import { describe, expect, it } from "vitest";
import { siteConfig } from "./site";

describe("siteConfig", () => {
  it("keeps primary navigation anchored to landing sections", () => {
    expect(siteConfig.navigation.map((item) => item.href)).toEqual([
      "#experiencia",
      "#proyectos",
      "#habilidades",
      "#estudios",
      "#contacto",
    ]);
  });

  it("does not link to removed sections", () => {
    const labels = siteConfig.navigation.map((item) => item.label).join(" ");

    expect(labels).not.toMatch(/Roadmap|Skills/);
  });
});
