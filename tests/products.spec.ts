import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { ProductsPage } from "../pages/ProductsPage";

test.describe("Products Tests", () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await expect(loginPage.loginButton).toBeVisible();
    await loginPage.login("standard_user", "secret_sauce");
    await expect(page).toHaveURL("/inventory.html");
  })

  test("should have Swag Labs as logo", async ({ page }) => {
    const productsPage = new ProductsPage(page);
    await expect(productsPage.logo).toBeVisible();
    await expect(productsPage.logo).toHaveText("Swag Labs");

  });

  test("should display the products page title", async ({ page }) => {
    const productsPage = new ProductsPage(page);
    await expect(productsPage.title).toHaveText("Products");

  });

  test("should display the correct number of products", async ({ page }) => {
    const productPage = new ProductsPage(page);
    const productCount = await productPage.products.count();
    expect(productCount).toBe(6);
  });

  test("should display product details when clicked", async ({ page }) => {
    const productId = 4; // Assuming product ID 4 is "Sauce Labs Backpack"
    const productUrl = `/inventory-item.html?id=${productId}`;
    const productName = "Sauce Labs Backpack";
    const productPage = new ProductsPage(page);
    await expect(productPage.products.first()).toBeVisible();
    productPage.selectProduct(productName);
    await expect(page).toHaveURL(productUrl);
    await expect(page.locator(".inventory_details_desc")).toBeVisible();
    expect(productName).toBe("Sauce Labs Backpack");
  });

  test("should add first product to the cart", async ({ page }) => {
    const productPage = new ProductsPage(page);
    await expect(productPage.products.first()).toBeVisible();
    await productPage.addFirstProductToCart();
    const cartCount = await productPage.cartCount.textContent();
    expect(cartCount).toBe("1");
    const removeButton = await productPage.getFirstProductRemoveButton();
    expect(await removeButton.textContent()).toBe("Remove");
  });


  test("should remove first product from the cart", async ({ page }) => {
    const productPage = new ProductsPage(page);
    await expect(productPage.products.first()).toBeVisible();
    await productPage.addFirstProductToCart();
    const cartCount = await productPage.cartCount.textContent();
    expect(cartCount).toBe("1");
    const removeButton = await productPage.getFirstProductRemoveButton();
    await removeButton.click();
    const updatedCartCount = await productPage.cartCount.count();
    expect(updatedCartCount).toBe(0);
  });

  test("should sort products by price low to high", async ({ page }) => {
    const productPage = new ProductsPage(page);
    await expect(productPage.products.first()).toBeVisible();
    await productPage.sortProductsByPriceLowToHigh();
    const productPrices = await productPage.getProductPrices();
    const sortedPrices = await productPage.sortPricesAscending();
    const firstProductPrice = await productPage.getFirstProductPrice();
    expect(firstProductPrice).toBe(sortedPrices[0]);
    expect(productPrices).toEqual(sortedPrices);
  });

  test("should sort products by price high to low", async ({ page }) => {
    const productPage = new ProductsPage(page);
    await expect(productPage.products.first()).toBeVisible();
    await productPage.sortProductsByPriceHighToLow();
    const productPrices = await productPage.getProductPrices();
    const sortedPrices = await productPage.sortPricesDescending();
    const firstProductPrice = await productPage.getFirstProductPrice();
    expect(firstProductPrice).toBe(sortedPrices[0]);
    expect(productPrices).toEqual(sortedPrices);
  });

  test("should sort products by name A to Z", async ({ page }) => {
    const productPage = new ProductsPage(page);
    await expect(productPage.products.first()).toBeVisible();
    await productPage.sortProductsByNameAtoZ();
    const firstProductName = await productPage.getFirstProductName();
    const productsName = await productPage.getProductsNames();
    const sortedNames = productsName.sort();
    expect(firstProductName).toBe(sortedNames[0]);
    expect(productsName).toEqual(sortedNames);
  });

  test("should sort products by name Z to A", async ({ page }) => {
    const productPage = new ProductsPage(page);
    await expect(productPage.products.first()).toBeVisible();
    await productPage.sortProductsByNameZtoA();
    const firstProductName = await productPage.getFirstProductName();
    const productsName = await productPage.getProductsNames();
    const sortedNames = productsName.sort((a, b) => b.localeCompare(a));
    expect(firstProductName).toBe(sortedNames[0]);
    expect(productsName).toEqual(sortedNames);
  });

  test("should navigate to the cart page", async ({ page }) => {
    const productPage = new ProductsPage(page);
    productPage.cartButton.click();
    await expect(page).toHaveURL("/cart.html");
  });

});
