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
