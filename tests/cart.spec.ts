import { test, expect } from "@playwright/test";
import { ProductsPage } from "../pages/ProductsPage";
import { LoginPage } from "../pages/LoginPage";
import { CartPage } from "../pages/CartPage";

test.describe("Cart Page Tests", () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    expect(loginPage.loginButton).toBeVisible();
    await loginPage.login("standard_user", "secret_sauce");
    await expect(page).toHaveURL("/inventory.html");
  })

  test("should display the cart page", async ({ page }) => {
    const cartPage = new CartPage(page);
    await cartPage.goto();
    await expect(page).toHaveURL("/cart.html");
    await expect(cartPage.title).toHaveText("Your Cart");
    const cartQTY = await cartPage.cartQuantityLabel.textContent();
    expect(cartQTY).toBe("QTY");
    const cartDescription = await cartPage.cartDescriptionLabel.textContent();
    expect(cartDescription).toBe("Description");
    expect(cartPage.checkoutButton).toHaveText("Checkout");
    expect(cartPage.continueShoppingButton).toHaveText("Continue Shopping");
  });

  test("should add item from the cart", async ({ page }) => {
    const productPage = new ProductsPage(page);
    await productPage.addFirstProductToCart();
    await productPage.cartButton.click();
    const cartPage = new CartPage(page);
    const cartCount = await cartPage.cartQuantity.textContent();
    expect(cartCount).toBe('1');

  });

  test("should remove item from the cart", async ({ page }) => {
    const productPage = new ProductsPage(page);
    await productPage.addFirstProductToCart();
    await productPage.cartButton.click();
    const cartPage = new CartPage(page);
    const cartCount = await cartPage.cartQuantity.textContent();
    expect(cartCount).toBe('1');
    const firstProductRemoveButton = await cartPage.getFirstRemoveButton();
    await firstProductRemoveButton.click();
    await expect(cartPage.cartQuantity).not.toBeVisible();
  });

  test("should proceed to checkout", async ({ page }) => {
    const productPage = new ProductsPage(page);
    await productPage.addFirstProductToCart();
    await productPage.cartButton.click();
    const cartPage = new CartPage(page);
    await expect(cartPage.checkoutButton).toBeVisible();
    await cartPage.checkoutButton.click();
    await expect(page).toHaveURL("/checkout-step-one.html");
  });

});
