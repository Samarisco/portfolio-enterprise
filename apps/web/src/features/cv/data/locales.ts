import type { Metadata } from "next";
import { cv, type CvData, type CvLocale } from "./cv";
import { cvEn } from "./cv.en";

export const cvByLocale: Readonly<Record<CvLocale, CvData>> = {
  es: cv,
  en: cvEn,
};

/** Orden del selector ES/EN. */
export const cvLocales: readonly CvLocale[] = ["es", "en"];

type LanguageAlternates = NonNullable<NonNullable<Metadata["alternates"]>["languages"]>;

/** Enlaces hreflang cruzados entre las versiones del CV (mismos en ambas páginas). */
export const cvLanguageAlternates = {
  "es-MX": cv.path,
  "en-US": cvEn.path,
  "x-default": cv.path,
} as const satisfies LanguageAlternates;

/** Metadata de la página del CV en el idioma indicado. */
export function getCvMetadata(locale: CvLocale): Metadata {
  const data = cvByLocale[locale];

  return {
    title: data.pageTitle,
    description: data.pageDescription,
    alternates: {
      canonical: data.path,
      languages: cvLanguageAlternates,
    },
    openGraph: {
      title: `${data.pageTitle} | ${data.name}`,
      description: data.headline,
      type: "profile",
      locale: data.ogLocale,
      alternateLocale: cvLocales
        .filter((code) => code !== locale)
        .map((code) => cvByLocale[code].ogLocale),
      url: data.path,
    },
  };
}
