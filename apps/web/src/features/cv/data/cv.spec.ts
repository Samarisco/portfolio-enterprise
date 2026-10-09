import { describe, expect, it } from "vitest";
import { profile } from "../../landing/data/profile";
import { CV_PDF_URL, cv } from "./cv";
import { CV_EN_PDF_URL, cvEn } from "./cv.en";
import { cvByLocale, cvLocales, getCvMetadata } from "./locales";

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
      { title: "IT Support, Development & Automation Intern (México)", period: "ago 2026 – oct 2026" },
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

describe("cv data (English)", () => {
  const renderedEnText = JSON.stringify(cvEn);

  it("includes every section of the English CV with content", () => {
    expect(cvEn.lang).toBe("en-US");
    expect(cvEn.name).toBe(cv.name);
    expect(cvEn.headline).toBe(
      "Systems & Automation Specialist · Frappe · AI-Assisted Development",
    );
    expect(cvEn.summary).not.toHaveLength(0);
    expect(Object.values(cvEn.labels.sections)).toEqual([
      "Summary",
      "Experience",
      "Projects",
      "Skills",
      "Education & Certifications",
      "Languages",
    ]);
    expect(cvEn.experience.map((job) => job.company)).toEqual(["Fast Market", "Mubea"]);
    expect(cvEn.projects.map((project) => project.name)).toEqual([
      "DiosesmonDex",
      "Sign Language Translator",
    ]);
    expect(cvEn.skills.map((group) => group.label)).toEqual([
      "Systems & Support",
      "Development & Automation",
      "Applied AI",
    ]);
    expect(cvEn.education).toHaveLength(2);
    expect(cvEn.languages).toContain("Spanish (native)");

    for (const entry of [...cvEn.experience, ...cvEn.projects]) {
      expect(entry.highlights.length).toBeGreaterThan(0);
    }
  });

  it("only shows the active Fast Market position, not the commented one", () => {
    const fastMarket = cvEn.experience.find((job) => job.company === "Fast Market");

    expect(fastMarket?.positions).toEqual([
      { title: "IT Support, Development & Automation Intern (Mexico)", period: "Aug 2026 – Oct 2026" },
    ]);
    expect(renderedEnText).not.toMatch(/Spain/i);
    expect(renderedEnText).not.toContain("Pronto");
    expect(renderedEnText).not.toContain("Nov 2026");
  });

  it("does not expose a phone number on the public page", () => {
    expect(renderedEnText).not.toMatch(/\+?\d[\d\s-]{8,}\d/);
  });

  it("uses its own PDF and keeps the same links as the Spanish CV", () => {
    expect(CV_EN_PDF_URL).toBe("/CV-Samael-Amaral-EN.pdf");
    expect(cvEn.pdfUrl).toBe(CV_EN_PDF_URL);
    expect(cvEn.email).toBe(cv.email);
    expect(cvEn.links).toEqual(cv.links);
  });
});

describe("cv locales", () => {
  it("cross-links both versions with hreflang alternates", () => {
    expect(cvByLocale.es.path).toBe("/cv");
    expect(cvByLocale.en.path).toBe("/cv/en");

    for (const locale of cvLocales) {
      const metadata = getCvMetadata(locale);
      expect(metadata.alternates?.canonical).toBe(cvByLocale[locale].path);
      expect(metadata.alternates?.languages).toMatchObject({ "es-MX": "/cv", "en-US": "/cv/en" });
    }

    expect(getCvMetadata("es").openGraph).toMatchObject({ locale: "es_MX" });
    expect(getCvMetadata("en").openGraph).toMatchObject({ locale: "en_US" });
  });
});
