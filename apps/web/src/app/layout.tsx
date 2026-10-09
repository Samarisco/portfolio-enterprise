import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Anton, Instrument_Sans, Inter, JetBrains_Mono, Martian_Mono } from "next/font/google";
import { SITE_LANG, siteMetadata } from "@/shared/lib/metadata";
import { themeInitScript } from "@/shared/lib/theme";
import "./globals.css";

/* Landing: titulares de impacto (Anton), texto y datos. */
const display = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
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

const fontVariables = [display, body, data, sans, mono].map((font) => font.variable).join(" ");

export const metadata: Metadata = siteMetadata;

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
    <html lang={SITE_LANG} className={fontVariables} suppressHydrationWarning>
      <head>
        {/* Aplica el tema guardado antes del primer pintado (sin parpadeo). */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
