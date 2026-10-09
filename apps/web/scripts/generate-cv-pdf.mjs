#!/usr/bin/env node
/**
 * Genera los PDF del CV a partir de sus rutas:
 *   /cv    -> public/CV-Samael-Amaral.pdf     (español)
 *   /cv/en -> public/CV-Samael-Amaral-EN.pdf  (inglés)
 *
 * Uso:
 *   pnpm --filter @portfolio/web cv:pdf          # ambos idiomas
 *   pnpm --filter @portfolio/web cv:pdf -- en    # solo los idiomas indicados (es, en)
 *
 * - Si existe CV_BASE_URL (p. ej. http://localhost:3000) usa ese servidor.
 * - Si no, compila la app (omitir con CV_SKIP_BUILD=1 si ya hay build) y levanta `next start` en un puerto temporal.
 * - Imprime cada página en A4 y en carta emulando `print` y falla si alguna no cabe en 1 página.
 * - Valida todos los idiomas antes de escribir; guarda la versión en carta como archivo final.
 *
 * Requiere Chromium de Playwright: `pnpm exec playwright install chromium`.
 */
import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "@playwright/test";

const appDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = path.join(appDir, "public");
const locales = {
  es: { route: "/cv", file: "CV-Samael-Amaral.pdf" },
  en: { route: "/cv/en", file: "CV-Samael-Amaral-EN.pdf" },
};
const nextBin = path.join(appDir, "node_modules", "next", "dist", "bin", "next");
const port = Number(process.env.CV_PORT ?? 3210);
const finalFormat = "Letter";
const formats = ["A4", "Letter"];

function runNext(args, { waitForReady = false } = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [nextBin, ...args], {
      cwd: appDir,
      stdio: waitForReady ? ["ignore", "pipe", "inherit"] : "inherit",
      env: { ...process.env, NEXT_TELEMETRY_DISABLED: "1" },
    });

    child.on("error", reject);

    if (waitForReady) {
      child.stdout.on("data", (chunk) => {
        if (/ready|started server|Local:/i.test(String(chunk))) resolve(child);
      });
      child.on("exit", (code) => reject(new Error(`next ${args[0]} terminó con código ${code}`)));
      return;
    }

    child.on("exit", (code) =>
      code === 0 ? resolve(child) : reject(new Error(`next ${args[0]} terminó con código ${code}`)),
    );
  });
}

function countPdfPages(buffer) {
  const matches = buffer.toString("latin1").match(/\/Type\s*\/Page(?![s\w])/g);
  return matches ? matches.length : 0;
}

function selectedLocales() {
  const requested = process.argv.slice(2).filter((arg) => arg !== "--");
  if (requested.length === 0) return Object.keys(locales);

  const unknown = requested.filter((code) => !Object.hasOwn(locales, code));
  if (unknown.length > 0) {
    throw new Error(`Idioma no soportado: ${unknown.join(", ")}. Usa: ${Object.keys(locales).join(", ")}`);
  }
  return requested;
}

async function main() {
  const selected = selectedLocales();
  let server;
  let baseUrl = process.env.CV_BASE_URL;

  if (!baseUrl) {
    const hasBuild = existsSync(path.join(appDir, ".next", "BUILD_ID"));
    if (!hasBuild || process.env.CV_SKIP_BUILD !== "1") {
      console.log("Compilando la app con next build…");
      await runNext(["build"]);
    }
    console.log(`Levantando next start en el puerto ${port}…`);
    server = await runNext(["start", "--port", String(port)], { waitForReady: true });
    baseUrl = `http://localhost:${port}`;
  }

  const browser = await chromium.launch();
  try {
    const outputs = [];
    const overflow = [];

    for (const code of selected) {
      const { route, file } = locales[code];
      const page = await browser.newPage();
      await page.goto(new URL(route, baseUrl).href, { waitUntil: "networkidle" });
      await page.emulateMedia({ media: "print", colorScheme: "light", reducedMotion: "reduce" });
      await page.evaluate(() => document.fonts.ready);

      const results = {};
      for (const format of formats) {
        const pdf = await page.pdf({ format, printBackground: true, preferCSSPageSize: false });
        const pages = countPdfPages(pdf);
        results[format] = { pdf, pages };
        console.log(`[${code}] ${format}: ${pages} página(s)`);
        if (pages !== 1) overflow.push(`${code} ${format}`);
      }

      outputs.push({ file, pdf: results[finalFormat].pdf });
      await page.close();
    }

    if (overflow.length > 0) {
      throw new Error(`El CV no cabe en una sola página en: ${overflow.join(", ")}`);
    }

    await mkdir(publicDir, { recursive: true });
    for (const { file, pdf } of outputs) {
      const outputFile = path.join(publicDir, file);
      await writeFile(outputFile, pdf);
      console.log(`PDF (${finalFormat}) guardado en ${path.relative(appDir, outputFile)}`);
    }
  } finally {
    await browser.close();
    server?.kill();
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
