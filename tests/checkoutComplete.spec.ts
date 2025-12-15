import { test, expect } from "@playwright/test";
import { loginAsStandardUser, setupForCheckoutCompleteTest } from "../utils/testFlows";
import { CheckoutCompletePage } from "../pages/CheckoutCompletePage";
import { CheckoutPage } from "../pages/CheckoutPage";
import { EXPECTED_URL_PATHS } from "../utils/testConstants";

test.describe("Checkout Complete Tests", () => {

  test.beforeEach(async ({ page }) => {
    await setupForCheckoutCompleteTest(page);
    await expect(page).toHaveURL(EXPECTED_URL_PATHS.CHECKOUT_COMPLETE);
  });

  test("should display the correct title on checkout Complete page", async ({ page }) => {
    const checkoutCompletePage = new CheckoutCompletePage(page);
    await expect(checkoutCompletePage.title).toBeVisible();
  });

  test("should have completed order message", async ({ page }) => {
    const checkoutCompletePage = new CheckoutCompletePage(page);
    await expect(checkoutCompletePage.messageTitle).toBeVisible();
    await expect(checkoutCompletePage.messageDescription).toBeVisible();
  });

  test("should have Back Home button with correct text", async ({ page }) => {
    const checkoutCompletePage = new CheckoutCompletePage(page);
    await expect(checkoutCompletePage.backHomeButton).toBeVisible();
  });

  test("should navigate back to products page when Back Home button is clicked", async ({ page }) => {
    const checkoutCompletePage = new CheckoutCompletePage(page);
    await checkoutCompletePage.navigateBackHome();
    await expect(page).toHaveURL(EXPECTED_URL_PATHS.PRODUCTS_PAGE);
  });

  test("should have no items in the cart after completing checkout", async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);
    expect(await checkoutPage.getCartItemCount()).toBe(0);
  });

});
