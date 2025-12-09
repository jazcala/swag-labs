import { test, expect } from "@playwright/test";
import { ProductsPage } from "../pages/ProductsPage";
import { CartPage } from "../pages/CartPage";
import { loginAsStandardUser } from "../utils/testFlows";
import { EXPECTED_CART_CONSTANTS, EXPECTED_CHECKOUT_CONSTANTS } from "../utils/testConstants";

test.describe("Cart Page with one product Tests", () => {


  test.beforeEach(async ({ page }) => {
    await loginAsStandardUser(page);
    const productsPage = new ProductsPage(page);
    await productsPage.addFirstProductToCart();
    await productsPage.viewCart();
    await expect(page).toHaveURL(EXPECTED_CART_CONSTANTS.PAGE_URL);
  });

  test("should display the cart page", async ({ page }) => {
    const cartPage = new CartPage(page);
    await expect(cartPage.title).toHaveText(EXPECTED_CART_CONSTANTS.TITLE);
    const cartQTY = await cartPage.cartQuantityLabel.textContent();
    expect(cartQTY).toBe(EXPECTED_CART_CONSTANTS.QTY_LABEL);
    const cartDescription = await cartPage.cartDescriptionLabel.textContent();
    expect(cartDescription).toBe(EXPECTED_CART_CONSTANTS.DESCRIPTION_LABEL);
    expect(cartPage.checkoutButton).toHaveText(EXPECTED_CART_CONSTANTS.CHECKOUT_BUTTON_TEXT);
    expect(cartPage.continueShoppingButton).toHaveText(EXPECTED_CART_CONSTANTS.CONTINUE_SHOPPING_BUTTON_TEXT);
  });

  test("should have one item in the cart", async ({ page }) => {
    const cartPage = new CartPage(page);
    const cartCount = await cartPage.cartQuantity.textContent();
    expect(cartCount).toBe('1');
  });

  test("should remove item from the cart", async ({ page }) => {
    const cartPage = new CartPage(page);
    const cartCount = await cartPage.cartQuantity.textContent();
    expect(cartCount).toBe('1');
    const firstProductRemoveButton = await cartPage.getFirstRemoveButton();
    await firstProductRemoveButton.click();
    await expect(cartPage.cartQuantity).not.toBeVisible();
  });

  test("should proceed to checkout after clicking the button", async ({ page }) => {
    const cartPage = new CartPage(page);
    await expect(cartPage.checkoutButton).toBeVisible();
    await cartPage.checkoutButton.click();
    await expect(page).toHaveURL(EXPECTED_CHECKOUT_CONSTANTS.PAGE_URL);
  });

});
