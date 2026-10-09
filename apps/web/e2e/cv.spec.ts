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
