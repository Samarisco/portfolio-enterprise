#!/usr/bin/env node
/**
 * Genera public/CV-Samael-Amaral.pdf a partir de la ruta /cv.
 *
 * Uso:
 *   pnpm --filter @portfolio/web cv:pdf
 *
 * - Si existe CV_BASE_URL (p. ej. http://localhost:3000) usa ese servidor.
 * - Si no, compila la app (omitir con CV_SKIP_BUILD=1 si ya hay build) y levanta `next start` en un puerto temporal.
 * - Imprime la página en A4 y en carta emulando `print` y falla si alguna no cabe en 1 página.
 * - Guarda la versión en carta como archivo final.
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
const outputFile = path.join(appDir, "public", "CV-Samael-Amaral.pdf");
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

async function main() {
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
    const page = await browser.newPage();
    await page.goto(new URL("/cv", baseUrl).href, { waitUntil: "networkidle" });
    await page.emulateMedia({ media: "print", colorScheme: "light", reducedMotion: "reduce" });
    await page.evaluate(() => document.fonts.ready);

    const results = {};
    for (const format of formats) {
      const pdf = await page.pdf({ format, printBackground: true, preferCSSPageSize: false });
      const pages = countPdfPages(pdf);
      results[format] = { pdf, pages };
      console.log(`${format}: ${pages} página(s)`);
    }

    const overflow = formats.filter((format) => results[format].pages !== 1);
    if (overflow.length > 0) {
      throw new Error(`El CV no cabe en una sola página en: ${overflow.join(", ")}`);
    }

    await mkdir(path.dirname(outputFile), { recursive: true });
    await writeFile(outputFile, results[finalFormat].pdf);
    console.log(`PDF (${finalFormat}) guardado en ${path.relative(appDir, outputFile)}`);
  } finally {
    await browser.close();
    server?.kill();
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
