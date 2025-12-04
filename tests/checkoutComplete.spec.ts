import { test, expect } from "@playwright/test";
import { loginAsStandardUser, fillFormAndContinue } from "../utils/testFlows";
import { CheckoutCompletePage } from "../pages/CheckoutCompletePage";
import { CheckoutPage } from "../pages/CheckoutPage";
import { CheckoutOverviewPage } from "../pages/CheckoutOverviewPage";
import { ProductsPage } from "../pages/ProductsPage";
import { CartPage } from "../pages/CartPage";
import { EXPECTED_CHECKOUT_COMPLETE_CONSTANTS, EXPECTED_PRODUCTS_CONSTANTS } from "../utils/testConstants";

test.describe("Checkout Overview Tests", () => {

  test.beforeEach(async ({ page }) => {
    // Login to the application
    await loginAsStandardUser(page);
    // Add product to the cart,
    const productsPage = new ProductsPage(page);
    await productsPage.addFirstProductToCart();
    //  view cart
    await productsPage.viewCart();
    // navigate to the checkout overview page
    const cartPage = new CartPage(page);
    await cartPage.proceedToCheckout();
    // Complete the form and proceed to checkout overview
    await fillFormAndContinue(page);
    const checkoutOverviewPage = new CheckoutOverviewPage(page);
    await checkoutOverviewPage.completeCheckout();
    await expect(page).toHaveURL(EXPECTED_CHECKOUT_COMPLETE_CONSTANTS.PAGE_URL);
  });

  test("should display the correct title on checkout Complete page", async ({ page }) => {
    const checkoutCompletePage = new CheckoutCompletePage(page);
    await expect(checkoutCompletePage.title).toHaveText(EXPECTED_CHECKOUT_COMPLETE_CONSTANTS.TITLE);
  });

  test("should have completed order message", async ({ page }) => {
    const checkoutCompletePage = new CheckoutCompletePage(page);
    await expect(checkoutCompletePage.messageTitle).toBeVisible();
    await expect(checkoutCompletePage.messageTitle).toHaveText(EXPECTED_CHECKOUT_COMPLETE_CONSTANTS.MESSAGE_TITLE);
    await expect(checkoutCompletePage.messageDescription).toBeVisible();
    await expect(checkoutCompletePage.messageDescription).toHaveText(EXPECTED_CHECKOUT_COMPLETE_CONSTANTS.MESSAGE_DESCRIPTION);
  });

  test("should have Back Home button with correct text", async ({ page }) => {
    const checkoutCompletePage = new CheckoutCompletePage(page);
    await expect(checkoutCompletePage.backHomeButton).toBeVisible();
    await expect(checkoutCompletePage.backHomeButton).toHaveText(EXPECTED_CHECKOUT_COMPLETE_CONSTANTS.BACK_TO_HOME_BUTTON_TEXT);
  });

  test("should navigate back to products page when Back Home button is clicked", async ({ page }) => {
    const checkoutCompletePage = new CheckoutCompletePage(page);
    await checkoutCompletePage.backHomeButton.click();
    await expect(page).toHaveURL(EXPECTED_PRODUCTS_CONSTANTS.PAGE_URL);
  });

  test("should have no items in the cart after completing checkout", async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);
    await expect(checkoutPage.cartQuantity).not.toBeAttached();
  });

});
