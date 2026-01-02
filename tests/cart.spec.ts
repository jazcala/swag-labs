import { test, expect } from '../fixtures//base-test';
import { loginAsStandardUser } from "../utils/testFlows";
import { EXPECTED_CART_CONSTANTS, EXPECTED_CHECKOUT_CONSTANTS } from "../utils/testConstants";

test.describe("Cart Page with one product Tests", () => {

  test("should have one item in the cart", async ({ cartPageReady }) => {
    await expect(cartPageReady.cartCount).toHaveText('1');
  });

  test("should remove item from the cart", async ({ cartPageReady }) => {
    await expect(cartPageReady.cartCount).toHaveText('1');

    await cartPageReady.removeFirstIemt();
    await expect(cartPageReady.cartCount).toBeHidden();
  });

  test("should proceed to checkout after clicking the button", async ({ cartPageReady, page }) => {
    await expect(cartPageReady.checkoutButton).toBeVisible();
    await cartPageReady.checkoutButton.click();
    await expect(page).toHaveURL(EXPECTED_CHECKOUT_CONSTANTS.PAGE_URL);
  });

});
