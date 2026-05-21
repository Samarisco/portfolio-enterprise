import { expect, test } from "@playwright/test";

test("landing page exposes core product narrative", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", {
      name: "Desarrollador Frontend Jr. con enfoque en TypeScript, APIs REST y productos web modernos.",
    }),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "Ver proyectos" })).toBeVisible();
  await expect(page.getByText("Proyectos personales", { exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "TypeScript", exact: true })).toBeVisible();
});
