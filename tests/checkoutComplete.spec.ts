import { test, expect } from '../fixtures/base-test'
import { EXPECTED_URL_PATHS } from "../utils/testConstants";

test.describe("Checkout Complete Tests", () => {

  test("should display the correct title on checkout Complete page", async ({ checkoutCompleteReady }) => {
    await expect(checkoutCompleteReady.title).toBeVisible();
  });

  test("should have completed order message", async ({ checkoutCompleteReady }) => {
    await expect(checkoutCompleteReady.messageTitle).toBeVisible();
    await expect(checkoutCompleteReady.messageDescription).toBeVisible();
  });

  test("should have Back Home button with correct text", async ({ checkoutCompleteReady }) => {
    await expect(checkoutCompleteReady.backHomeButton).toBeVisible();
  });

  test("should navigate back to products page when Back Home button is clicked", async ({ checkoutCompleteReady, page }) => {
    await checkoutCompleteReady.navigateBackHome();
    await expect(page).toHaveURL(EXPECTED_URL_PATHS.PRODUCTS_PAGE);
  });

  test("should have no items in the cart after completing checkout", async ({ checkoutCompleteReady }) => {
    await expect(checkoutCompleteReady.cartCount).toBeHidden();
  });

});
