import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio-enterprise.local"),
  title: {
    default: "Samael Amaral | Full Stack Developer Jr.",
    template: "%s | Samael Amaral",
  },
  description:
    "Portfolio de Samael Amaral, Full Stack Developer Jr. enfocado en TypeScript, Next.js, NestJS, APIs REST, PostgreSQL, automatizacion e IA aplicada.",
  applicationName: "Samael Amaral Portfolio",
  authors: [{ name: "Samael Amaral" }],
  keywords: [
    "Samael Amaral",
    "Full Stack Developer Jr",
    "Entry Level Developer",
    "Next.js",
    "NestJS",
    "TypeScript",
    "PostgreSQL",
    "Prisma",
    "Apaseo el Grande Guanajuato",
  ],
  openGraph: {
    title: "Samael Amaral | Full Stack Developer Jr.",
    description:
      "Portfolio profesional con proyectos full stack, APIs REST, frontend responsive, bases de datos y roadmap tecnico.",
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
    { media: "(prefers-color-scheme: light)", color: "#f7f4ed" },
    { media: "(prefers-color-scheme: dark)", color: "#08090a" },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
