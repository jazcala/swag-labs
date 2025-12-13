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
    await productsPage.addFirstProductToCart();
    await productsPage.viewCart();
    const cartPage = new CartPage(page);
    await cartPage.proceedToCheckout();
    await expect(page).toHaveURL(EXPECTED_CHECKOUT_CONSTANTS.PAGE_URL);
  });

  test("should displayed the title", async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);
    await expect(checkoutPage.title).toHaveText(EXPECTED_CHECKOUT_CONSTANTS.TITLE);
  });

  test("should display the checkout form", async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);
    await expect(checkoutPage.firstNameInput).toBeVisible();
    await expect(checkoutPage.firstNameInput).toHaveAttribute(
      "placeholder",
      EXPECTED_CHECKOUT_CONSTANTS.FIRST_NAME_PLACEHOLDER
    );
    await expect(checkoutPage.lastNameInput).toBeVisible();
    await expect(checkoutPage.lastNameInput).toHaveAttribute(
      "placeholder",
      EXPECTED_CHECKOUT_CONSTANTS.LAST_NAME_PLACEHOLDER
    );
    await expect(checkoutPage.postalCodeInput).toBeVisible();
    await expect(checkoutPage.postalCodeInput).toHaveAttribute(
      "placeholder",
      EXPECTED_CHECKOUT_CONSTANTS.ZIP_CODE_PLACEHOLDER
    );
    await expect(checkoutPage.continueButton).toBeVisible();
    await expect(checkoutPage.continueButton).toHaveText(EXPECTED_CHECKOUT_CONSTANTS.CONTINUE_BUTTON_TEXT);
    await expect(checkoutPage.cancelButton).toBeVisible();
    await expect(checkoutPage.cancelButton).toHaveText(EXPECTED_CHECKOUT_CONSTANTS.CANCEL_BUTTON_TEXT);
  });

  test("should display the correct number of items in the cart", async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);
    const cartCount = await checkoutPage.cartQuantity.textContent();
    expect(cartCount).toBe('1');
  });

  test("should fill the checkout form and proceed to the next step", async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);
    const { firstName, lastName, zipCode } = generateRandomUser();
    await checkoutPage.fillCheckoutForm(firstName, lastName, zipCode);
    await checkoutPage.continueButton.click();
    await expect(page).toHaveURL(EXPECTED_CHECKOUT_OVERVIEW_CONSTANTS.PAGE_URL);
  });

  test("should cancel the checkout process", async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.cancelButton.click();
    await expect(page).toHaveURL(EXPECTED_CART_CONSTANTS.PAGE_URL);
  });

});
