import { test, expect } from "@playwright/test";
import { CartPage } from "../pages/CartPage";
import { CheckoutPage } from "../pages/CheckoutPage";
import { loginAsStandardUser } from "../utils/testFlows";
import { generateRandomUser } from "../utils/testData";
import { ProductsPage } from "../pages/ProductsPage";
import { EXPECTED_CART_CONSTANTS, EXPECTED_CHECKOUT_CONSTANTS, EXPECTED_CHECKOUT_OVERVIEW_CONSTANTS } from "../utils/testConstants";


test.describe("Checkout Page Tests", () => {

  test.beforeEach(async ({ page }) => {
    await loginAsStandardUser(page);
    const productsPage = new ProductsPage(page);
    await productsPage.addToCart();
    await productsPage.viewCart();
    const cartPage = new CartPage(page);
    await expect(page).toHaveURL(EXPECTED_CART_CONSTANTS.PAGE_URL);
    await cartPage.proceedToCheckout();
    await expect(page).toHaveURL(EXPECTED_CHECKOUT_CONSTANTS.PAGE_URL);
  });

  test("should displayed the title", async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);
    await expect(checkoutPage.title).toBeVisible();
  });

  test("should display the checkout form", async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);
    await expect(checkoutPage.firstNameInput).toBeVisible();
    await expect(checkoutPage.lastNameInput).toBeVisible();
    await expect(checkoutPage.postalCodeInput).toBeVisible();
    await expect(checkoutPage.continueButton).toBeVisible();
    await expect(checkoutPage.cancelButton).toBeVisible();
  });

  test("should display the correct number of items in the cart", async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);
    expect(await checkoutPage.getCartItemCount()).toBe(1);
  });

  test("should fill the checkout form and proceed to the next step", async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);
    const { firstName, lastName, zipCode } = generateRandomUser();
    await checkoutPage.fillFormAndContinue(firstName, lastName, zipCode);
    await expect(page).toHaveURL(EXPECTED_CHECKOUT_OVERVIEW_CONSTANTS.PAGE_URL);
  });

  test("should cancel the checkout process", async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.cancelCheckout();
    await expect(page).toHaveURL(EXPECTED_CART_CONSTANTS.PAGE_URL);
  });

});
