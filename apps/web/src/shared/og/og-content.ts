import { cv } from "../../features/cv/data/cv";
import { cvEn } from "../../features/cv/data/cv.en";
import { siteConfig } from "../lib/site";

/**
 * Textos de las imágenes para compartir (Open Graph / Twitter).
 * Viven aparte del renderizador para que `og-content.spec.ts` los pase por las guardas
 * de contenido prohibido.
 */

export type OgVariant = "home" | "cv" | "cv-en";

export interface OgContent {
  /** Etiqueta sobre el titular (nombre o tipo de documento). */
  readonly kicker: string;
  /** Líneas del titular: plano claro, texto limpio y plano cian. */
  readonly lines: readonly [string, string, string];
  /** Línea pequeña bajo el titular. */
  readonly footnote: string;
  /** Texto alternativo de la imagen. */
  readonly alt: string;
}

const domain = new URL(siteConfig.url).host;

export const ogContent: Readonly<Record<OgVariant, OgContent>> = {
  home: {
    kicker: siteConfig.name,
    lines: ["Sistemas,", "automatización", "e IA aplicada"],
    footnote: domain,
    alt: `${siteConfig.name}: ${siteConfig.headline}. ${domain}`,
  },
  cv: {
    kicker: `CV · ${cv.name}`,
    lines: ["Sistemas,", "automatización", "e IA aplicada"],
    footnote: `${domain}/cv`,
    alt: `CV de ${cv.name}: ${cv.headline}. ${domain}/cv`,
  },
  "cv-en": {
    kicker: `Resume · ${cvEn.name}`,
    lines: ["Systems,", "automation", "& applied AI"],
    footnote: `${domain}/cv/en`,
    alt: `Resume of ${cvEn.name}: ${cvEn.headline}. ${domain}/cv/en`,
  },
};

export const OG_SIZE = { width: 1200, height: 630 } as const;
