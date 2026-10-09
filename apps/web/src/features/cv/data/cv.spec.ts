import { describe, expect, it } from "vitest";
import { profile } from "../../landing/data/profile";
import { CV_PDF_URL, cv } from "./cv";

const renderedText = JSON.stringify(cv);

describe("cv data", () => {
  it("includes every section of the CV with content", () => {
    expect(cv.name).toBe("Juan Samael Amaral Bravo");
    expect(cv.headline).not.toHaveLength(0);
    expect(cv.summary).not.toHaveLength(0);
    expect(cv.experience.map((job) => job.company)).toEqual(["Fast Market", "Mubea"]);
    expect(cv.projects.map((project) => project.name)).toEqual([
      "DiosesmonDex",
      "Traductor de lenguaje de señas",
    ]);
    expect(cv.skills).toHaveLength(3);
    expect(cv.education).toHaveLength(2);
    expect(cv.languages).toContain("Español nativo");

    for (const entry of [...cv.experience, ...cv.projects]) {
      expect(entry.highlights.length).toBeGreaterThan(0);
    }
  });

  it("only shows the active Fast Market position, not the commented one", () => {
    const fastMarket = cv.experience.find((job) => job.company === "Fast Market");

    expect(fastMarket?.positions).toEqual([
      { title: "IT Support, Development & Automation Intern (México)", period: "ago 2026 – actual" },
    ]);
    expect(renderedText).not.toContain("México–España");
    expect(renderedText).not.toContain("nov 2026");
    expect(renderedText).not.toContain("Pronto Market");
  });

  it("does not expose a phone number on the public page", () => {
    expect(renderedText).not.toMatch(/\+?\d[\d\s-]{8,}\d/);
  });

  it("points the landing CV link to the generated PDF", () => {
    expect(CV_PDF_URL).toBe("/CV-Samael-Amaral.pdf");
    expect(profile.personal.resumeUrl).toBe(CV_PDF_URL);
  });
});
