import type { Metadata } from "next";
import { siteConfig } from "./site";

/** Idioma del sitio (la hoja de `/cv/en` declara el suyo en su propio contenedor). */
export const SITE_LANG = "es-MX";

const title = `${siteConfig.name} · ${siteConfig.headline}`;

/** Metadata global (`app/layout.tsx`). Las rutas del CV sobrescriben título, canonical y OG. */
export const siteMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name }],
  keywords: [
    "Samael Amaral",
    "Sistemas",
    "Automatización TI",
    "IA aplicada",
    "Desarrollo asistido por IA",
    "Soporte TI",
    "Soporte N2",
    "Active Directory",
    "Apaseo el Grande Guanajuato",
  ],
  openGraph: {
    title,
    description: siteConfig.description,
    type: "website",
    locale: "es_MX",
    siteName: siteConfig.name,
  },
  robots: {
    index: true,
    follow: true,
  },
};

/** Metadata propia de la landing (`/`). */
export const homeMetadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: {
    title,
    description: siteConfig.description,
    type: "website",
    locale: "es_MX",
    siteName: siteConfig.name,
    url: "/",
  },
};
