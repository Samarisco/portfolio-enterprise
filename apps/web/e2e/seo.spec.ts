import { expect, test } from "@playwright/test";
import { findForbiddenContent } from "../src/shared/lib/forbidden-content";

const SITE_URL = "https://portfolio-enterprise-web.vercel.app";
const TITLE = "Samael Amaral · Sistemas, automatización e IA aplicada";

test("landing metadata uses the new positioning in Spanish", async ({ page }) => {
  await page.goto("/");

  await expect(page.locator("html")).toHaveAttribute("lang", "es-MX");
  await expect(page).toHaveTitle(TITLE);
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    "content",
    /Sistemas, automatización e IA aplicada/,
  );
  await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute("content", "es_MX");
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute("content", TITLE);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `${SITE_URL}`);
});

test("cv pages keep their own canonical and locale", async ({ page }) => {
  await page.goto("/cv");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `${SITE_URL}/cv`);
  await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute("content", "es_MX");

  await page.goto("/cv/en");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `${SITE_URL}/cv/en`);
  await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute("content", "en_US");
  await expect(page.locator("[data-cv-root]")).toHaveAttribute("lang", "en-US");
});

for (const path of ["/", "/cv", "/cv/en"]) {
  test(`head of ${path} does not publish forbidden data`, async ({ page }) => {
    await page.goto(path);
    const head = await page.locator("head").innerHTML();

    expect(findForbiddenContent(head)).toEqual([]);
    expect(head).not.toMatch(/Frappe|ERPNext|Frontend Developer/i);
  });
}

test("robots.txt and sitemap.xml list the public routes", async ({ request }) => {
  const robots = await request.get("/robots.txt");
  expect(robots.status()).toBe(200);
  expect(await robots.text()).toContain(`Sitemap: ${SITE_URL}/sitemap.xml`);

  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.status()).toBe(200);
  const xml = await sitemap.text();
  for (const loc of [SITE_URL, `${SITE_URL}/cv`, `${SITE_URL}/cv/en`]) {
    expect(xml).toContain(`<loc>${loc}</loc>`);
  }
});

/** Lee ancho y alto de la cabecera IHDR de un PNG. */
function pngSize(buffer: Buffer): { width: number; height: number } {
  return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
}

for (const path of ["/", "/cv", "/cv/en"]) {
  test(`share images of ${path} are 1200×630 PNGs with alt text`, async ({ page, request }) => {
    await page.goto(path);
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
      "content",
      "summary_large_image",
    );

    for (const name of ["og:image", "twitter:image"]) {
      const attr = name.startsWith("og:") ? "property" : "name";
      const content = await page.locator(`meta[${attr}="${name}"]`).getAttribute("content");
      expect(content, name).toBeTruthy();
      await expect(page.locator(`meta[${attr}="${name}:alt"]`)).toHaveAttribute("content", /.+/);

      // En desarrollo Next usa el host local; en producción, el dominio canónico.
      const url = new URL(content ?? "");
      const response = await request.get(`${url.pathname}${url.search}`);
      expect(response.status()).toBe(200);
      expect(response.headers()["content-type"]).toContain("image/png");
      expect(pngSize(await response.body())).toEqual({ width: 1200, height: 630 });
    }
  });
}

test("site icons respond", async ({ page, request }) => {
  await page.goto("/");

  const icon = await page.locator('link[rel="icon"]').first().getAttribute("href");
  const iconResponse = await request.get(icon ?? "");
  expect(iconResponse.status()).toBe(200);
  expect(iconResponse.headers()["content-type"]).toContain("image/svg+xml");

  const apple = await page.locator('link[rel="apple-touch-icon"]').getAttribute("href");
  const appleResponse = await request.get(apple ?? "");
  expect(appleResponse.status()).toBe(200);
  expect(pngSize(await appleResponse.body())).toEqual({ width: 180, height: 180 });
});
