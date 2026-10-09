import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Anton, DM_Serif_Display, Instrument_Sans, Inter, JetBrains_Mono, Martian_Mono } from "next/font/google";
import { themeInitScript } from "@/shared/lib/theme";
import "./globals.css";

/* Landing: titulares de impacto (Anton), recortes de letras (DM Serif Display), texto y datos. */
const display = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

const cutout = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-cutout",
  display: "swap",
});

const body = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const data = Martian_Mono({
  subsets: ["latin"],
  variable: "--font-data",
  axes: ["wdth"],
  display: "swap",
});

/* Fuentes de la hoja del CV (`cv.css`); no se precargan en la landing. */
const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  preload: false,
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  preload: false,
});

const fontVariables = [display, cutout, body, data, sans, mono].map((font) => font.variable).join(" ");

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio-enterprise.local"),
  title: {
    default: "Samael Amaral | Frontend Developer Jr.",
    template: "%s | Samael Amaral",
  },
  description:
    "Portfolio de Samael Amaral, Frontend Developer Jr. enfocado en TypeScript, Next.js, NestJS, APIs REST, PostgreSQL, automatizacion e IA aplicada.",
  applicationName: "Samael Amaral Portfolio",
  authors: [{ name: "Samael Amaral" }],
  keywords: [
    "Samael Amaral",
    "Frontend Developer Jr",
    "Entry Level Developer",
    "Next.js",
    "NestJS",
    "TypeScript",
    "PostgreSQL",
    "Prisma",
    "Apaseo el Grande Guanajuato",
  ],
  openGraph: {
    title: "Samael Amaral | Frontend Developer Jr.",
    description:
      "Portfolio profesional con proyectos full stack, APIs REST, frontend responsive y bases de datos.",
    type: "website",
    locale: "en_US",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark light",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f2f5fb" },
    { media: "(prefers-color-scheme: dark)", color: "#05070f" },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={fontVariables} suppressHydrationWarning>
      <head>
        {/* Aplica el tema guardado antes del primer pintado (sin parpadeo). */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
