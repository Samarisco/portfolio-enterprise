import { expect, test } from "@playwright/test";

const PDF_URL = "/CV-Samael-Amaral.pdf";

test("cv page renders the resume and its actions", async ({ page }) => {
  await page.goto("/cv");

  await expect(page).toHaveTitle(/CV/);
  await expect(
    page.getByRole("heading", { level: 1, name: "Juan Samael Amaral Bravo" }),
  ).toBeVisible();
  for (const section of ["Experiencia", "Proyectos", "Habilidades", "Educación y certificaciones"]) {
    await expect(page.getByRole("heading", { level: 2, name: section })).toBeVisible();
  }
  await expect(page.getByRole("link", { name: "Descargar PDF" })).toHaveAttribute("href", PDF_URL);
  await expect(page.getByRole("button", { name: "Imprimir" })).toBeVisible();
});

test("cv actions are hidden when printing", async ({ page }) => {
  await page.goto("/cv");
  await page.emulateMedia({ media: "print" });

  await expect(page.getByRole("button", { name: "Imprimir" })).toBeHidden();
  await expect(page.getByRole("link", { name: "Descargar PDF" })).toBeHidden();
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});

test("landing CV link points to the downloadable PDF", async ({ page, request }) => {
  await page.goto("/");

  await expect(page.getByRole("link", { name: /Descargar CV/ })).toHaveAttribute("href", PDF_URL);

  const response = await request.get(PDF_URL);
  expect(response.ok()).toBe(true);
  expect(response.headers()["content-type"]).toContain("application/pdf");
});

const EN_PDF_URL = "/CV-Samael-Amaral-EN.pdf";

test("english cv page renders the resume and its actions", async ({ page, request }) => {
  await page.goto("/cv/en");

  await expect(page.locator("[data-cv-root]")).toHaveAttribute("lang", "en-US");
  await expect(
    page.getByRole("heading", { level: 1, name: "Juan Samael Amaral Bravo" }),
  ).toBeVisible();
  for (const section of [
    "Summary",
    "Experience",
    "Projects",
    "Skills",
    "Education & Certifications",
    "Languages",
  ]) {
    await expect(page.getByRole("heading", { level: 2, name: section })).toBeVisible();
  }
  await expect(page.getByRole("link", { name: "Download PDF" })).toHaveAttribute(
    "href",
    EN_PDF_URL,
  );
  await expect(page.getByRole("button", { name: "Print" })).toBeVisible();
  await expect(page.locator("link[rel='canonical']")).toHaveAttribute("href", /\/cv\/en$/);
  await expect(page.locator("link[rel='alternate'][hreflang='es-MX']")).toHaveAttribute(
    "href",
    /\/cv$/,
  );

  const response = await request.get(EN_PDF_URL);
  expect(response.ok()).toBe(true);
  expect(response.headers()["content-type"]).toContain("application/pdf");
});

test("language switcher links /cv and /cv/en", async ({ page }) => {
  await page.goto("/cv");
  const esSwitcher = page.getByRole("navigation", { name: "Idioma del CV" });
  await expect(esSwitcher.getByRole("link", { name: "ES" })).toHaveAttribute("aria-current", "page");
  await esSwitcher.getByRole("link", { name: "EN" }).click();

  await expect(page).toHaveURL(/\/cv\/en$/);
  const enSwitcher = page.getByRole("navigation", { name: "Resume language" });
  await expect(enSwitcher.getByRole("link", { name: "EN" })).toHaveAttribute("aria-current", "page");
  await enSwitcher.getByRole("link", { name: "ES" }).click();

  await expect(page).toHaveURL(/\/cv$/);
  await expect(page.getByRole("link", { name: "Descargar PDF" })).toHaveAttribute("href", PDF_URL);
});

test("english cv actions and language switcher are hidden when printing", async ({ page }) => {
  await page.goto("/cv/en");
  await page.emulateMedia({ media: "print" });

  await expect(page.getByRole("button", { name: "Print" })).toBeHidden();
  await expect(page.getByRole("link", { name: "Download PDF" })).toBeHidden();
  await expect(page.getByRole("navigation", { name: "Resume language" })).toBeHidden();
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});
