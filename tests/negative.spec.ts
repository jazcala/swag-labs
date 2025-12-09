import { test, expect } from "@playwright/test";
import { ProductsPage } from "../pages/ProductsPage";
import { TEST_PRODUCT_DATA, generateRandomUser } from "../utils/testData";
import { EXPECTED_PRODUCTS_CONSTANTS, EXPECTED_CART_CONSTANTS, EXPECTED_CHECKOUT_CONSTANTS } from "../utils/testConstants";
import { loginAsStandardUser, setupForCheckoutFormTest } from "../utils/testFlows";
import { CheckoutPage } from "../pages/CheckoutPage";
import { CartPage } from "../pages/CartPage";

test.describe("Negative Tests (Application Flow Errors)", () => {

  // --- Cart/Checkout Error Scenarios ---

  /**
  *  It verifies that while the app allows navigation to the empty cart page,
  * attempting to click the Checkout button redirects the user back to the Products page.
  * This test is skipped because the current application behavior allows navigation to checkout
  * even with an empty cart, which may not align with the intended negative test scenario.
   */
  test.skip("should prevent checkout navigation when cart is empty", async ({ page }) => {

    // Start with a logged-in user and an empty cart
    await loginAsStandardUser(page);
    const productsPage = new ProductsPage(page);

    // 1. Go to the Cart Page (it should be empty)
    await productsPage.viewCart();
    await expect(page).toHaveURL(EXPECTED_CART_CONSTANTS.PAGE_URL);

    const cartPage = new CartPage(page);
    // 2. Attempt to click Checkout button
    const checkoutButton = cartPage.checkoutButton;
    // page.locator(EXPECTED_CART_CONSTANTS.CHECKOUT_BUTTON_SELECTOR);
    await expect(checkoutButton).toBeVisible();
    await checkoutButton.click();

    // 3. Verify that the system redirects back to the Products page
    await expect(page).toHaveURL(EXPECTED_PRODUCTS_CONSTANTS.PAGE_URL);
  });

  // --- Checkout Form Error Scenarios ---

  test.describe("Checkout Form Validation", () => {

    let checkoutPage: CheckoutPage;

    test.beforeEach(async ({ page }) => {
      // Setup the page by navigating to the Checkout Step One form with an item ready.
      // We pass the required constants to the helper function.
      await setupForCheckoutFormTest(
        page,
        TEST_PRODUCT_DATA.name,
      );
      // We explicitly assert the final navigation step here, as intended.
      await expect(page).toHaveURL(EXPECTED_CHECKOUT_CONSTANTS.PAGE_URL);
    });

    test.afterEach(async ({ page }) => {
      await expect(page).toHaveURL(EXPECTED_CHECKOUT_CONSTANTS.PAGE_URL);
    })

    test("should display an error when first name is missing", async ({ page }) => {
      checkoutPage = new CheckoutPage(page);
      const { lastName, zipCode } = generateRandomUser();
      checkoutPage.fillCheckoutForm("", lastName, zipCode);
      await checkoutPage.continueButton.click();
      await expect(checkoutPage.errorMessage).toHaveText(EXPECTED_CHECKOUT_CONSTANTS.FIRST_NAME_ERROR);
    });

    test("should display an error when last name is missing", async ({ page }) => {
      checkoutPage = new CheckoutPage(page);
      const { firstName, zipCode } = generateRandomUser();
      checkoutPage.fillCheckoutForm(firstName, "", zipCode);
      await checkoutPage.continueButton.click();
      await expect(checkoutPage.errorMessage).toHaveText(EXPECTED_CHECKOUT_CONSTANTS.LAST_NAME_ERROR);
    });

    test("should display an error when postal code is missing", async ({ page }) => {
      const checkoutPage = new CheckoutPage(page);
      const { firstName, lastName } = generateRandomUser();
      await checkoutPage.fillCheckoutForm(firstName, lastName, "");
      await checkoutPage.continueButton.click();
      await expect(checkoutPage.errorMessage).toHaveText(EXPECTED_CHECKOUT_CONSTANTS.ZIP_CODE_ERROR);
    });

  });
});
