import { describe, expect, it } from "vitest";
import {
  findForbiddenContent,
  findPhoneLikeSequences,
  stripVectorGeometry,
} from "../../../shared/lib/forbidden-content";
import { siteConfig } from "../../../shared/lib/site";
import { CV_PDF_URL, cv } from "../../cv/data/cv";
import { CV_EN_PDF_URL, cvEn } from "../../cv/data/cv.en";
import { SKILL_LEVELS, perfil } from "./perfil";

/**
 * Guardas de contenido (design doc §6): todo lo publicado en `/`, `/cv` y `/cv/en`
 * se serializa y se revisa contra los datos que no deben aparecer en la web.
 * Los patrones son genéricos a propósito para no repetir aquí los datos privados.
 */
const publishedContent = {
  landing: JSON.stringify(perfil),
  site: JSON.stringify(siteConfig),
  cv: JSON.stringify(cv),
  cvEn: JSON.stringify(cvEn),
} as const;

describe("detector de contenido prohibido", () => {
  // Números ficticios (prefijo 555): nunca usar aquí el teléfono real.
  it.each([
    "(555) 010 0199",
    "555 010 01 99",
    "+52 (555) 010 0199",
    "555.010.0199",
    "5550100199",
  ])("detecta el teléfono con formato %s", (sample) => {
    expect(findPhoneLikeSequences(`Llámame al ${sample} hoy`)).toHaveLength(1);
    expect(findForbiddenContent(sample)).toContain("teléfono");
  });

  it("no marca como teléfono fechas, rangos ni cifras del sitio", () => {
    expect(
      findPhoneLikeSequences(
        "ago 2026 – oct 2026 · 2023 – mayo 2026 · rango 1–1013 · 823 especies · 247 pruebas · React 18",
      ),
    ).toEqual([]);
  });

  it("detecta enlaces tel:, Gmail, IPv4 y rutas locales", () => {
    expect(findForbiddenContent('<a href="tel:+5255501001">x</a>')).toContain("enlace tel:");
    expect(findForbiddenContent("ejemplo@gmail.com")).toContain("Gmail");
    expect(findForbiddenContent("10.0.0.1")).toContain("IPv4");
    expect(findForbiddenContent(JSON.stringify("D:\\carpeta"))).toContain("ruta local de Windows");
  });
});

describe("stripVectorGeometry", () => {
  it("quita la geometría de los iconos pero conserva enlaces y texto", () => {
    const html =
      '<svg viewBox="0 0 24 24"><path d="M22 13a18.15 18.15 0 0 1-20 0"></path></svg>' +
      '<a href="tel:5550100199">(555) 010 0199</a>' +
      '<script>self.__next_f.push([1,"{\\"d\\":\\"M20 10c0 4.993-5.539 10.193-7.399 11.799\\"}"])</script>';
    const stripped = stripVectorGeometry(html);

    expect(stripped).not.toContain("18.15");
    expect(stripped).not.toContain("4.993");
    expect(findForbiddenContent(stripped)).toEqual(["enlace tel:", "teléfono"]);
  });
});

describe("contenido publicado: datos prohibidos", () => {
  for (const [source, text] of Object.entries(publishedContent)) {
    it(`${source} no contiene datos prohibidos`, () => {
      expect(findForbiddenContent(text)).toEqual([]);
    });
  }

  it("la landing no menciona España ni el puesto de noviembre", () => {
    expect(publishedContent.landing).not.toMatch(/Espa[ñn]a|Spain/i);
    expect(publishedContent.landing).not.toMatch(/nov(iembre)? 2026/i);
  });

  it("la landing no publica cifras de usuarios", () => {
    expect(publishedContent.landing).not.toMatch(/\d+\s*usuarios/i);
  });
});

describe("perfil de la landing", () => {
  it("usa el titular de posicionamiento y el puesto confirmado", () => {
    expect(perfil.personal.name).toBe("Samael Amaral");
    expect(perfil.personal.headline).toBe(
      "Especialista en Sistemas y Automatización · Frappe · Desarrollo asistido por IA",
    );
    expect(perfil.personal.headline).toBe(cv.headline);
    expect(perfil.personal.currentRole).toBe(
      "IT Support, Development & Automation Intern · Fast Market · ago 2026 – oct 2026",
    );
  });

  it("publica solo el correo profesional y los perfiles autorizados", () => {
    expect(perfil.personal.email).toBe(cv.email);
    expect(perfil.personal.linkedinUrl).toBe("https://www.linkedin.com/in/samaelamaral");
    expect(perfil.personal.githubUrl).toBe("https://github.com/Samarisco");
  });

  it("enlaza al CV en español, en inglés y a sus PDF", () => {
    expect(perfil.personal.cvUrl).toBe(cv.path);
    expect(perfil.personal.cvEnUrl).toBe(cvEn.path);
    expect(perfil.personal.resumeUrl).toBe(CV_PDF_URL);
    expect(perfil.personal.resumeEnUrl).toBe(CV_EN_PDF_URL);
  });

  it("tiene los proyectos de perfil.md y marca el traductor como prototipo sin enlace", () => {
    expect(perfil.projects.map((project) => project.name)).toEqual([
      "DiosesmonDex",
      "Traductor de lenguaje de señas",
      "Portafolio",
    ]);

    const translator = perfil.projects.find((project) => project.name.startsWith("Traductor"));
    expect(translator?.status).toBe("Prototipo");
    expect(translator?.link).toBeUndefined();

    const dex = perfil.projects.find((project) => project.name === "DiosesmonDex");
    expect(dex?.link?.href).toBe("https://diosesmondex.onrender.com");
  });

  it("tiene 9 habilidades con el nivel literal de perfil.md", () => {
    expect(perfil.skills).toHaveLength(9);

    for (const skill of perfil.skills) {
      expect(SKILL_LEVELS).toContain(skill.level);
    }

    const levelOf = (area: string) => perfil.skills.find((skill) => skill.area === area)?.level;
    expect(levelOf("JavaScript/TypeScript, React, Node/Express")).toBe(
      "Intermedio para leer, depurar e integrar; básico para escribir desde cero sin IA",
    );
    expect(levelOf("SQL (PostgreSQL, SQLite)")).toBe("Intermedio para leer, depurar e integrar");
    expect(levelOf("Java / Spring Boot")).toBe("Básico (cursos)");
  });

  it("incluye los 4 cursos de ONE G8 y el estado real de la carrera", () => {
    const one = perfil.education.find((item) => item.title.startsWith("ONE Tech Foundation"));
    expect(one?.courses).toHaveLength(4);

    const uveg = perfil.education.find((item) => item.institution.includes("UVEG"));
    expect(uveg?.period).toBe("2023 – mayo 2026");
    expect(uveg?.detail).toContain("título en trámite");
  });
});

describe("consistencia con el CV", () => {
  it("lista las mismas empresas en el mismo orden", () => {
    expect(perfil.experience.map((job) => job.company)).toEqual(
      cv.experience.map((job) => job.company),
    );
  });

  it("usa el mismo puesto y periodo de Mubea", () => {
    const landing = perfil.experience.find((job) => job.company === "Mubea");
    const cvJob = cv.experience.find((job) => job.company === "Mubea");

    expect(cvJob?.positions).toEqual([{ title: landing?.role, period: landing?.period }]);
  });

  it("usa el mismo puesto de Fast Market y la misma fecha de inicio", () => {
    const landing = perfil.experience.find((job) => job.company === "Fast Market");
    const cvPositions = cv.experience.find((job) => job.company === "Fast Market")?.positions;

    // El CV agrega el sufijo de país al puesto y, mientras diga "actual", solo se compara
    // el inicio del periodo (design doc §11, decisión 2).
    expect(cvPositions).toHaveLength(1);
    expect(cvPositions?.[0]?.title.replace(/\s*\(México\)$/, "")).toBe(landing?.role);
    expect(landing?.period).toBe("ago 2026 – oct 2026");
    expect(cvPositions?.[0]?.period.split(" – ")[0]).toBe(landing?.period.split(" – ")[0]);
  });
});
