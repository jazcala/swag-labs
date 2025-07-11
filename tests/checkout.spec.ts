import { test, expect } from "@playwright/test";
import { CartPage } from "../pages/CartPage";
import { CheckoutPage } from "../pages/CheckoutPage";
import { addFirstProductToCart, loginAsStandardUser, viewCart, proceedToCheckout } from "../utils/testFlows";
import { cartPageUrl, checkoutOverviewPageUrl, checkoutPageUrl, generateRandomUser } from "../utils/testData";

test.describe("Checkout Page Tests", () => {

  test.beforeEach(async ({ page }) => {
    await loginAsStandardUser(page);
    await addFirstProductToCart(page);
    await viewCart(page);
    await proceedToCheckout(page);
    await expect(page).toHaveURL(checkoutPageUrl);
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
    const { firstName, lastName, zipCode } = generateRandomUser();
    await checkoutPage.fillCheckoutForm(firstName, lastName, zipCode);
    await checkoutPage.continueButton.click();
    await expect(page).toHaveURL(checkoutOverviewPageUrl);
  });

  test("should cancel the checkout process", async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.cancelButton.click();
    await expect(page).toHaveURL(cartPageUrl);
    const { title, expectedTitle } = new CartPage(page);
    await expect(title).toHaveText(expectedTitle);
  });

  test("should display an error message for empty first name", async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);
    const { lastName, zipCode } = generateRandomUser();
    checkoutPage.fillCheckoutForm("", lastName, zipCode);
    await checkoutPage.continueButton.click();
    await expect(checkoutPage.errorMessage).toHaveText(checkoutPage.firstNameError);
  });

  test("should display an error message for empty last name", async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);
    const { firstName, zipCode } = generateRandomUser();
    checkoutPage.fillCheckoutForm(firstName, "", zipCode);
    await checkoutPage.continueButton.click();
    await expect(checkoutPage.errorMessage).toHaveText(checkoutPage.lastNameError);
  });

  test("should display an error message for empty postal code", async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);
    const { firstName, lastName } = generateRandomUser();
    checkoutPage.fillCheckoutForm(firstName, lastName, "");
    await checkoutPage.continueButton.click();
    await expect(checkoutPage.errorMessage).toHaveText(checkoutPage.postalCodeError);
  });

});
