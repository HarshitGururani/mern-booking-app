import { test, expect } from "@playwright/test";
import path from "path";
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

test("should allow user to add a hotel", async ({ page }) => {
  await page.goto(`${UI_URL}add-hotel`);

  await page.locator('[name="name"]').fill("Test Hotel");
  await page.locator('[name="city"]').fill("Test City");
  await page.locator('[name="country"]').fill("Test country");
  await page
    .locator('[name="description"]')
    .fill("This is a description for the Test");
  await page.locator('[name="pricePerNight"]').fill("100");
  await page.selectOption('select[name="starRating"]', "3");
  await page.getByText("Budget").click();

  await page.getByLabel("Free Wifi").check();
  await page.getByLabel("Parking").check();

  await page.locator('[name="adultCount"]').fill("4");
  await page.locator('[name="childCount"]').fill("2");

  await page.setInputFiles('[name="imageFiles"]', [
    path.join(__dirname, "files", "1.jpg"),
    path.join(__dirname, "files", "1.jpg"),
  ]);
  await page.getByRole("button", { name: "Save hotel" }).click();

  await expect(page.getByText("Hotel Saved!")).toBeVisible();
});

test("Should display hotels", async ({ page }) => {
  await page.goto(`${UI_URL}my-hotels`);

  await expect(page.getByText("Test Hotel")).toBeVisible();
  await expect(page.getByText("This is a description")).toBeVisible();

  await expect(page.getByText(", Test country")).toBeVisible();
  A;
  await expect(page.getByText("Budget")).toBeVisible();
  await expect(page.getByText("100 per night")).toBeVisible();
  await expect(page.getByText("4 adults ,2 children")).toBeVisible();
  await expect(page.getByText("3 Star Rating")).toBeVisible();

  await expect(page.getByRole("link", { name: "View Details" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Add Hotel" })).toBeVisible();
});
