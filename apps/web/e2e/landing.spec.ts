import { expect, test } from "@playwright/test";
import { findForbiddenContent, stripVectorGeometry } from "../src/shared/lib/forbidden-content";

const HEADLINE = "Sistemas, automatización e IA aplicada";
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

  // Landmarks: header y footer fuera de main.
  await expect(page.locator("main header, main footer")).toHaveCount(0);
  await expect(page.locator("body header")).toHaveCount(1);

  await expect(
    page.locator("header").getByRole("link", { name: "Ver CV", exact: true }),
  ).toHaveAttribute("href", "/cv");
  await expect(
    page.locator("#inicio").getByRole("link", { name: "Contacto", exact: true }),
  ).toHaveAttribute("href", "#contacto");

  const translator = page.getByRole("article").filter({
    has: page.getByRole("heading", { name: "Traductor de lenguaje de señas" }),
  });
  await expect(translator.getByText("Prototipo", { exact: true })).toBeVisible();
  await expect(translator.getByRole("link")).toHaveCount(0);
});

test("contact is a compact row of links", async ({ page }) => {
  await page.goto("/");
  const contact = page.locator("#contacto");

  await expect(contact.getByRole("link", { name: /Correo/ })).toHaveAttribute(
    "href",
    "mailto:Amaral.Samael@Outlook.com",
  );
  await expect(contact.getByRole("link", { name: "LinkedIn" })).toHaveAttribute(
    "href",
    "https://www.linkedin.com/in/samaelamaral",
  );
  await expect(contact.getByRole("link", { name: "GitHub" })).toHaveAttribute(
    "href",
    "https://github.com/Samarisco",
  );
  await expect(contact.getByRole("link", { name: "Ver CV", exact: true })).toHaveAttribute(
    "href",
    "/cv",
  );
  await expect(contact.getByRole("link", { name: "CV en inglés" })).toHaveAttribute(
    "href",
    "/cv/en",
  );

  const box = await contact.boundingBox();
  expect(box?.height ?? Number.POSITIVE_INFINITY).toBeLessThan(560);
});

test("landing page does not publish forbidden data", async ({ page }) => {
  await page.goto("/");

  const visibleText = await page.locator("body").innerText();
  const html = stripVectorGeometry(await page.content());

  // Todos los patrones sobre el texto visible y sobre el HTML completo (atributos incluidos).
  expect(findForbiddenContent(visibleText)).toEqual([]);
  expect(findForbiddenContent(html)).toEqual([]);
  expect(visibleText).not.toMatch(/Espa[ñn]a|Spain/i);
  expect(visibleText).not.toMatch(/Frappe|ERPNext/i);
});

test("agent graph lets the visitor pick an agent", async ({ page }) => {
  await page.goto("/");
  const graph = page.getByRole("figure", { name: "Mi sistema de ingeniería multiagente" });

  const qa = graph.getByRole("button", { name: "qa", exact: true });
  await qa.click();
  await expect(qa).toHaveAttribute("aria-pressed", "true");
  await expect(graph.getByText("Verifica el resultado al final.")).toBeVisible();

  await graph.getByRole("button", { name: /Pausar/ }).click();
  await expect(graph.getByRole("button", { name: /Reanudar/ })).toBeVisible();
});

test("theme toggle switches and persists the theme", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/");
  const html = page.locator("html");

  await expect(html).not.toHaveAttribute("data-theme", /.+/);
  await page.getByRole("button", { name: "Activar tema oscuro" }).click();
  await expect(html).toHaveAttribute("data-theme", "dark");

  await page.reload();
  // El script del <head> aplica la elección guardada antes de hidratar.
  await expect(html).toHaveAttribute("data-theme", "dark");
  await page.getByRole("button", { name: "Activar tema claro" }).click();
  await expect(html).toHaveAttribute("data-theme", "light");
});

test.describe("with reduced motion", () => {
  test("hero is visible right away and the graph does not auto-play", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    expect(await page.evaluate(() => matchMedia("(prefers-reduced-motion: reduce)").matches)).toBe(true);

    await expect(page.locator(".hero__line").first()).toHaveCSS("opacity", "1");
    await expect(page.getByRole("button", { name: /Pausar/ })).toHaveCount(0);
    await expect(page.getByRole("button", { name: "lead", exact: true })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });
});
