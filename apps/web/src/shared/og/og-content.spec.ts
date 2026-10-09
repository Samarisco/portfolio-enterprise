import { describe, expect, it } from "vitest";
import { findForbiddenContent } from "../lib/forbidden-content";
import { ogContent } from "./og-content";

describe("textos de las imágenes para compartir", () => {
  for (const [variant, content] of Object.entries(ogContent)) {
    it(`${variant} no contiene datos prohibidos`, () => {
      const text = JSON.stringify(content);

      expect(findForbiddenContent(text)).toEqual([]);
      expect(text).not.toMatch(/Frappe|ERPNext|Frontend Developer|Espa[ñn]a|Spain/i);
    });

    it(`${variant} tiene texto alternativo con el dominio canónico`, () => {
      expect(content.alt).toContain("portfolio-enterprise-web.vercel.app");
    });
  }
});
