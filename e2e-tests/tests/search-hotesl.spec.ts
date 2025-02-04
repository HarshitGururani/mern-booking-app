import test, { expect } from "@playwright/test";

const UI_URL = "http://localhost:5173/";

test.beforeEach(async ({ page }) => {
  // Navigate to the app's URL
  await page.goto(UI_URL);

  // Click the sign-in link
  await page.getByRole("link", { name: "Login" }).click();

  // Ensure the sign-in page is loaded
  await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();

  // Fill in credentials
  await page.locator('[name="email"]').fill("1@1.com");
  await page.locator('[name="password"]').fill("password123");

  // Click the login button
  await page.getByRole("button", { name: "Login" }).click();

  // Validate dashboard elements are visible
  await expect(page.getByText("Login Successfull!")).toBeVisible();
});

test("should show hotel search results", async ({ page }) => {
  await page.goto(UI_URL);

  await page.getByPlaceholder("Where are you going").fill("Test country");
  await page.getByRole("button", { name: "Search" }).click();
  await expect(page.getByText("Hotels found in Test country")).toBeVisible();
});

test("should show hotel details", async ({ page }) => {
  await page.goto(UI_URL);

  await page.getByPlaceholder("Where are you going").fill("Test country");
  await page.getByRole("button", { name: "Search" }).click();

  await page.getByText("Test Hotel").click();
  await expect(page).toHaveURL("/detail/");
  await expect(page.getByRole("button", { name: "Book now" })).toBeVisible();
});

test("should book hotel", async ({ page }) => {
  await page.goto(UI_URL);

  await page.getByPlaceholder("Where are you going").fill("Test country");
  await page.getByRole("button", { name: "Search" }).click();

  await page.getByText("Test Hotel").click();
  await expect(page).toHaveURL("/detail/");
  await expect(page.getByRole("button", { name: "Book now" })).toBeVisible();
});
