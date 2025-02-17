const { test, expect, describe } = require("@playwright/test");

describe("Note app", () => {
  test("front page can be opened", async ({ page }) => {
    await page.goto("http://localhost:5173");

    const locator = await page.getByText("Notes");
    await expect(locator).toBeVisible();
    await expect(
      page.getByText("Browser can execute only JavaScript")
    ).toBeVisible();
  });

  test("login form can be opened", async ({ page }) => {
    await page.goto("http://localhost:5173");

    await page.getByRole("button", { name: "log in" }).click();
    await page.getByRole("textbox").first().fill("blekpenta");
    await page.getByRole("textbox").last().fill("blek1111");
    await page.getByRole("button", { name: "login" }).click();

    await expect(page.getByText("Sokhibjon Makhmudov logged-in")).toBeVisible();
  });
});
