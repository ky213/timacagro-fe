import { test, expect } from "@playwright/test";

test.describe("Main tests", () => {
  test("Should navigate all pages", async ({ page }) => {
    await page.goto("http://localhost:3000");
    await expect(page).toHaveTitle("User Management");

    await page.goto("http://localhost:3000/dashboard");
    await expect(page.getByText("Dashboard")).toBeVisible();

    //Click first row in the table
    await page.getByRole("row").first().click();
    await expect(page.getByText("Phone")).toBeVisible();

    await page.goto("http://localhost:3000/dashboard/new-user");
    await expect(page.getByText("Create new user")).toBeVisible();
  });

  test("Should create user", async ({ page }) => {
    await page.goto("http://localhost:3000/dashboard/new-user");

    await page.getByLabel("First Name *").fill("aaaaaaaa");
    await page.getByLabel("Last Name *").fill("aaaaaaaa");
    await page.getByLabel("Email Address *").fill("aaaaaaa@gmail.com");
    await page.getByLabel("Phone *").fill("123456789");
    await page.getByLabel("Gender").click();
    await page.getByRole("option", { name: "Male", exact: true }).click();
    await page.getByLabel("Nationality").click();
    await page.getByRole("option", { name: "IN" }).click();
    await page.getByRole("button", { name: "Submit" }).click();
    await page.waitForTimeout(4000);
    await expect(page.getByText("aaaaaaa@gmail.com")).toBeVisible();
  });
});
