import { Page, Locator } from '@playwright/test';

/**
 * CartPage class represents the cart page of the Swag Labs application.
 * It encapsulates the locators and actions related to the cart functionality.
 */

export class CartPage {
  readonly page: Page;
  readonly title: Locator;
  readonly cartQuantityLabel: Locator;
  readonly cartDescriptionLabel: Locator;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;
  readonly cartQuantity: Locator;
  readonly removeButton: Locator;

  readonly expectedTitle = "Your Cart";

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator('[data-test="title"]');
    this.cartQuantityLabel = page.locator('.cart_quantity_label');
    this.cartDescriptionLabel = page.locator('.cart_desc_label');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
    this.cartQuantity = page.locator('[data-test="shopping-cart-badge"]');
    this.removeButton = page.locator('.cart_button');
  }
  /**
   * Navigates to the cart page.
   * @returns A promise that resolves when the navigation is complete.
   */
  async goto() {
    await this.page.goto('/cart.html');
  }

  async getFirstRemoveButton(): Promise<Locator> {
    return this.removeButton.first();
  }
}
