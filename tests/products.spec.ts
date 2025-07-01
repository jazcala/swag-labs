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
    const removeButton = await page.locator(".inventory_item").first().locator(".btn_secondary");
    expect(await removeButton.textContent()).toBe("Remove");
  });


  test("should remove first product from the cart", async ({ page }) => {
    await page.locator(".inventory_item").first().locator(".btn_primary").click();
    const cartCount = await page.locator(".shopping_cart_badge").textContent();
    expect(cartCount).toBe("1");
    await page.locator(".inventory_item").first().locator(".btn_secondary").click();
    const updatedCartCount = await page.locator(".shopping_cart_badge").count();
    expect(updatedCartCount).toBe(0);
  });

  test("should sort products by price low to high", async ({ page }) => {
    await page.selectOption('[data-test="product-sort-container"]', "lohi");
    const productPrices = await page.locator(".inventory_item_price").allTextContents();
    const sortedPrices = productPrices.map(price => parseFloat(price.replace("$", ""))).sort((a, b) => a - b);
    console.log("Sorted Prices lohi:", sortedPrices);
    const firstProductPrice = await page.locator(".inventory_item_price").first().textContent();
    expect(firstProductPrice).toBe(`$${sortedPrices[0].toFixed(2)}`);
  });

  test("should sort products by price high to low", async ({ page }) => {
    await page.selectOption('[data-test="product-sort-container"]', "hilo");
    const productPrices = await page.locator(".inventory_item_price").allTextContents();
    const sortedPrices = productPrices.map(price => parseFloat(price.replace("$", ""))).sort((a, b) => a + b);
    console.log("Sorted Prices hilo:", sortedPrices);

    const firstProductPrice = await page.locator(".inventory_item_price").first().textContent();
    expect(firstProductPrice).toBe(`$${sortedPrices[0].toFixed(2)}`);
  });

  test("should sort products by name A to Z", async ({ page }) => {
    await page.selectOption('[data-test="product-sort-container"]', "az");
    const firstProductName = await page.locator(".inventory_item_name").first().textContent();
    const productNames = await page.locator(".inventory_item_name").allTextContents();
    const sortedNames = productNames.sort();
    console.log("Sorted Names za:", sortedNames);
    expect(firstProductName).toBe(sortedNames[0]);
  });

  test("should sort products by name Z to A", async ({ page }) => {
    await page.selectOption('[data-test="product-sort-container"]', "za");
    const productNames = await page.locator(".inventory_item_name").allTextContents();
    const sortedNames = productNames.sort((a, b) => b.localeCompare(a));
    console.log("Sorted Names za:", sortedNames);
    const firstProductName = await page.locator(".inventory_item_name").first().textContent();
    expect(firstProductName).toBe(sortedNames[0]);
  });

  test("should navigate to the cart page", async ({ page }) => {
    await page.locator(".shopping_cart_link").click();
    await expect(page).toHaveURL("/cart.html");
    await expect(page.locator('[data-test="title"]')).toHaveText("Your Cart");
  });

  test("should display the correct number of items in the cart", async ({ page }) => {
    await page.locator(".inventory_item").first().locator(".btn_primary").click();
    await page.locator(".shopping_cart_link").click();
    const cartCount = await page.locator(".cart_quantity").textContent();
    expect(cartCount).toBe("1");
  });

});
