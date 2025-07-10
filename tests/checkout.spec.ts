import { test, expect } from "@playwright/test";
import { describe } from "node:test";
import { ProductsPage } from "../pages/ProductsPage";
import { LoginPage } from "../pages/LoginPage";
import { CartPage } from "../pages/CartPage";
import { CheckoutPage } from "../pages/checkoutPage";

describe("Checkout Tests", () => {

  test.beforeEach(async ({ page }) => {
    //login to the application
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    expect(loginPage.loginButton).toBeVisible();
    await loginPage.login("standard_user", "secret_sauce");
    await expect(page).toHaveURL("/inventory.html");
    // Add the first product to the cart and go to checkout page
    const productPage = new ProductsPage(page);
    await productPage.addFirstProductToCart();
    await productPage.cartButton.click();
    const cartPage = new CartPage(page);
    await expect(cartPage.checkoutButton).toBeVisible();
    await cartPage.checkoutButton.click();
    await expect(page).toHaveURL("/checkout-step-one.html");
  });

  test("should displayed the title", async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);
    await expect(checkoutPage.title).toHaveText(checkoutPage.expectedTitle);
  });

  test("should display the checkout form", async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);
    await expect(checkoutPage.firstNameInput).toBeVisible();
    await expect(checkoutPage.firstNameInput).toHaveAttribute(
      "placeholder",
      checkoutPage.firstNamePlaceholder
    );
    await expect(checkoutPage.lastNameInput).toBeVisible();
    await expect(checkoutPage.lastNameInput).toHaveAttribute(
      "placeholder",
      checkoutPage.lastNamePlaceholder
    );
    await expect(checkoutPage.postalCodeInput).toBeVisible();
    await expect(checkoutPage.postalCodeInput).toHaveAttribute(
      "placeholder",
      checkoutPage.postalCodePlaceholder
    );
    await expect(checkoutPage.continueButton).toBeVisible();
    await expect(checkoutPage.continueButton).toHaveText(checkoutPage.continueButtonText);
    await expect(checkoutPage.cancelButton).toBeVisible();
    await expect(checkoutPage.cancelButton).toHaveText(checkoutPage.cancelButtonText);
  });

  test("should display the correct number of items in the cart", async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);
    const cartCount = await checkoutPage.cartQuantity.textContent();
    expect(cartCount).toBe('1');
  });

  test("should fill the checkout form and proceed to the next step", async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.fillCheckoutForm("John", "Doe", "12345");
    await checkoutPage.continueButton.click();
    await expect(page).toHaveURL("/checkout-step-two.html");
  });

  test("should cancel the checkout process", async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.cancelButton.click();
    await expect(page).toHaveURL("/cart.html");
    const cartPage = new CartPage(page);
    await expect(cartPage.title).toHaveText("Your Cart");
  });

  test("should display an error message for empty first name", async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);
    checkoutPage.fillCheckoutForm("", "Doe", "12345");
    await checkoutPage.continueButton.click();
    await expect(checkoutPage.errorMessage).toHaveText(checkoutPage.firstNameError);
  });

  test("should display an error message for empty last name", async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);
    checkoutPage.fillCheckoutForm("John", "", "12345");
    await checkoutPage.continueButton.click();
    await expect(checkoutPage.errorMessage).toHaveText(checkoutPage.lastNameError);
  });

  test("should display an error message for empty postal code", async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);
    checkoutPage.fillCheckoutForm("John", "Doe", "");
    await checkoutPage.continueButton.click();
    await expect(checkoutPage.errorMessage).toHaveText(checkoutPage.postalCodeError);
  });

});
