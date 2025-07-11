import { test, expect } from "@playwright/test";
import { loginAsStandardUser, viewCart, proceedToCheckout, fillFormAndCheckout, addFirstProductToCart, completeCheckout } from "../utils/testFlows";
import { checkoutCompletePageUrl, productsPageUrl } from "../utils/testData";
import { CheckoutCompletePage } from "../pages/CheckoutCompletePage";
import { CheckoutPage } from "../pages/CheckoutPage";

test.describe("Checkout Overview Tests", () => {
  test.beforeEach(async ({ page }) => {
    // Login to the application
    await loginAsStandardUser(page);
    // Add product to the cart,
    await addFirstProductToCart(page);
    //  view cart
    await viewCart(page);
    // navigate to the checkout overview page
    await proceedToCheckout(page);
    // Complete the form and proceed to checkout overview
    await fillFormAndCheckout(page);
    await completeCheckout(page);
    await expect(page).toHaveURL(checkoutCompletePageUrl);
  });

  test("should display the correct title on checkout Complete page", async ({ page }) => {
    const checkoutCompletePage = new CheckoutCompletePage(page);
    await expect(checkoutCompletePage.title).toHaveText(checkoutCompletePage.expectedTitle);
  });

  test("should have completed order message", async ({ page }) => {
    const checkoutCompletePage = new CheckoutCompletePage(page);
    await expect(checkoutCompletePage.messageTitle).toBeVisible();
    await expect(checkoutCompletePage.messageTitle).toHaveText(checkoutCompletePage.expectedMessageTitle);
    await expect(checkoutCompletePage.messageDescription).toBeVisible();
    await expect(checkoutCompletePage.messageDescription).toHaveText(checkoutCompletePage.expectedMessageDescription);

  });

  test("should have Back Home button with correct text", async ({ page }) => {
    const checkoutCompletePage = new CheckoutCompletePage(page);
    await expect(checkoutCompletePage.backHomeButton).toBeVisible();
    await expect(checkoutCompletePage.backHomeButton).toHaveText(checkoutCompletePage.expectedBackHomeButtonText);
  });

  test("should navigate back to products page when Back Home button is clicked", async ({ page }) => {
    const checkoutCompletePage = new CheckoutCompletePage(page);
    await checkoutCompletePage.backHomeButton.click();
    await expect(page).toHaveURL(productsPageUrl);
  });

  test("should have no items in the cart after completing checkout", async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);
    await expect(checkoutPage.cartQuantity).not.toBeAttached();
  });

});
