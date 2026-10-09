import { expect, test } from "@playwright/test";

const HEADLINE = "Especialista en Sistemas y Automatización · Frappe · Desarrollo asistido por IA";
const CURRENT_ROLE =
  "IT Support, Development & Automation Intern · Fast Market · ago 2026 – oct 2026";
const SECTIONS = ["Experiencia", "Proyectos", "Habilidades", "Estudios", "Contacto"];

test("landing page tells the profile narrative from perfil.md", async ({ page }) => {
  await page.goto("/");

  const h1 = page.getByRole("heading", { level: 1 });
  await expect(h1).toHaveCount(1);
  await expect(h1).toHaveText(HEADLINE);
  await expect(page.getByText(CURRENT_ROLE, { exact: true })).toBeVisible();

  await expect(page.getByRole("heading", { level: 2 })).toHaveText(SECTIONS);

  await expect(
    page.locator("header").getByRole("link", { name: "Ver CV", exact: true }),
  ).toHaveAttribute("href", "/cv");
  await expect(
    page.locator("#inicio").getByRole("link", { name: "Contacto", exact: true }),
  ).toHaveAttribute("href", "#contacto");
  await expect(page.locator("#contacto").getByRole("link", { name: /Correo/ })).toHaveAttribute(
    "href",
    "mailto:Amaral.Samael@Outlook.com",
  );
  await expect(page.locator("#contacto").getByRole("link", { name: /Ver en línea/ })).toHaveAttribute(
    "href",
    "/cv/en",
  );

  const translator = page.getByRole("article").filter({
    has: page.getByRole("heading", { name: "Traductor de lenguaje de señas" }),
  });
  await expect(translator.getByText("Prototipo", { exact: true })).toBeVisible();
  await expect(translator.getByRole("link")).toHaveCount(0);
});

test("landing page does not publish forbidden data", async ({ page }) => {
  await page.goto("/");

  const visibleText = await page.locator("body").innerText();
  const html = await page.content();

  expect(visibleText).not.toMatch(/\b\d{3}[\s.-]?\d{3}[\s.-]?\d{4}\b/);
  expect(visibleText).not.toMatch(/\b(?:\d{1,3}\.){3}\d{1,3}\b/);
  expect(visibleText).not.toMatch(/Roadmap|CMS 3D|Dashboard responsive/i);
  expect(visibleText).not.toMatch(/Espa[ñn]a|Spain/i);

  expect(html).not.toMatch(/gmail/i);
  expect(html).not.toMatch(/M[eé]xico\s*[–-]\s*Espa[ñn]a|Mexico\s*[–-]\s*Spain/i);
  expect(html).not.toMatch(/Pronto\s*Market/i);
});
