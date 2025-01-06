import { test, expect } from "@playwright/test";

const UI_URL = "http://localhost:5173/";

test("should not allow the user to sign in", async ({ page }) => {
  // Navigate to the app's URL
  await page.goto(UI_URL);

  // Click the sign-in link
  await page.getByRole("link", { name: "Sign in" }).click();

  // Ensure the sign-in page is loaded
  await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();

  // Fill in credentials
  await page.locator('[name="email"]').fill("1@1.com");
  await page.locator('[name="password"]').fill("password123");

  // Click the login button
  await page.getByRole("button", { name: "Sign in" }).click();

  // Validate dashboard elements are visible
  await expect(page.getByText("Sign in Successfull")).toBeVisible();
  await expect(page.getByRole("link", { name: "My Bookings" })).toBeVisible();
  await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Sign out" })).toBeVisible();
});

test("should allow user to register", async ({ page }) => {
  const testEmail = `test_register_${
    Math.floor(Math.random() * 90000) + 10000
  }@test.com`;

  await page.goto(UI_URL);

  await page.getByRole("link", { name: "Sign In" }).click();
  await page.getByRole("link", { name: "register" }).click();

  await expect(
    page.getByRole("heading", { name: "Create an Account" })
  ).toBeVisible();

  await page.locator("[name=firstName]").fill("test_firstName");
  await page.locator("[name=lastName]").fill("test_lastName");
  await page.locator("[name=email]").fill(testEmail);
  await page.locator("[name=password]").fill("password123");
  await page.locator("[name=confirmPassword]").fill("password123");

  await page.getByRole("button", { name: "Create Account" }).click();

  await expect(page.getByText("Registration Success!")).toBeVisible();
  await expect(page.getByRole("link", { name: "My Bookings" })).toBeVisible();
  await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Sign out" })).toBeVisible();
});
