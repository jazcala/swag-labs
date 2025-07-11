import { test, expect } from "@playwright/test";
import { ProductsPage } from "../pages/ProductsPage";
import { CartPage } from "../pages/CartPage";
import { loginAsStandardUser, addFirstProductToCart, viewCart } from "../utils/testFlows";
import { cartPageUrl, checkoutPageUrl } from "../utils/testData";

test.describe("Cart Page with one product Tests", () => {

  test.beforeEach(async ({ page }) => {
    await loginAsStandardUser(page);
    await addFirstProductToCart(page);
    await viewCart(page);
    await expect(page).toHaveURL(cartPageUrl);
  })

  test("should display the cart page", async ({ page }) => {
    const cartPage = new CartPage(page);
    await expect(cartPage.title).toHaveText("Your Cart");
    const cartQTY = await cartPage.cartQuantityLabel.textContent();
    expect(cartQTY).toBe("QTY");
    const cartDescription = await cartPage.cartDescriptionLabel.textContent();
    expect(cartDescription).toBe("Description");
    expect(cartPage.checkoutButton).toHaveText("Checkout");
    expect(cartPage.continueShoppingButton).toHaveText("Continue Shopping");
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
    await expect(page).toHaveURL(checkoutPageUrl);
  });

});
