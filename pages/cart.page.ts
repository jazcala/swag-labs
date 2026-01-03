import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';
/**
 * CartPage class represents the cart page of the Swag Labs application.
 * It encapsulates the locators and actions related to the cart functionality.
 */

export class CartPage extends BasePage {
  readonly title: Locator;
  readonly cartQuantityLabel: Locator;
  readonly cartDescriptionLabel: Locator;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;
  readonly removeButton: Locator;

  constructor(page: Page) {
    super(page);
    this.title = page.getByText('Your Cart');
    this.cartQuantityLabel = page.getByText('QTY');
    this.cartDescriptionLabel = page.getByText('Description');
    this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
    this.continueShoppingButton = page.getByRole('button', { name: 'Continue Shopping' });
    this.removeButton = page.getByRole('button', { name: 'Remove' });
  }

  async removeFirstIemt(): Promise<void> {
    await this.removeButton.first().click();
  }

  async proceedToCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }
}
