import { test, expect } from "@playwright/test";

test.describe("Products Tests", () => {

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await expect(page.locator('[data-test="login-button"]')).toBeVisible();
    await page.fill('[data-test="username"]', "standard_user");
    await page.fill('[data-test="password"]', "secret_sauce");
    page.locator('[data-test="login-button"]').click();
    await expect(page.locator(".app_logo")).toHaveText("Swag Labs");
  })

  test("should display the products page", async ({ page }) => {
    await expect(page.locator('[data-test="title"]')).toHaveText("Products");

  });

  test("should display the correct number of products", async ({ page }) => {
    const products = await page.locator(".inventory_item").count();
    expect(products).toBe(6);
  });

  test("should display product details when clicked", async ({ page }) => {
    await page.locator(".inventory_item_label").first().locator("a").click();
    await expect(page).toHaveURL(`/inventory-item.html?id=4`);
    await expect(page.locator(".inventory_details_desc")).toBeVisible();
    const productName = await page.locator(".inventory_details_name").textContent();
    expect(productName).toBe("Sauce Labs Backpack");

  });

  test("should add first product to the cart", async ({ page }) => {
    await page.locator(".inventory_item").first().locator(".btn_primary").click();
    const cartCount = await page.locator(".shopping_cart_badge").textContent();
    expect(cartCount).toBe("1");
  });




});
