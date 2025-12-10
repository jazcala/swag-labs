import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
/**
 * CartPage class represents the cart page of the Swag Labs application.
 * It encapsulates the locators and actions related to the cart functionality.
 */

export class CartPage extends BasePage {
  readonly cartQuantityLabel: Locator;
  readonly cartDescriptionLabel: Locator;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;
  readonly removeButton: Locator;

  constructor(page: Page) {
    super(page);
    this.cartQuantityLabel = page.locator('.cart_quantity_label');
    this.cartDescriptionLabel = page.locator('.cart_desc_label');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
    this.removeButton = page.locator('.cart_button');
  }

  async getFirstRemoveButton(): Promise<Locator> {
    return this.removeButton.first();
  }

  async proceedToCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }
}
