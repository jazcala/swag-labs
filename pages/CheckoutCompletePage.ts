import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * CheckoutCompletePage class represents the checkout complete page of the Swag Labs application.
 * It encapsulates the locators and expected values related to the checkout completion functionality.
 */

export class CheckoutCompletePage extends BasePage {
  readonly title: Locator;
  readonly messageTitle: Locator;
  readonly messageDescription: Locator;
  readonly backHomeButton: Locator;

  constructor(page: Page) {
    super(page);
    this.title = page.getByText('Checkout: Complete!');
    this.messageTitle = page.getByText('Thank you for your order!');
    this.messageDescription = page.getByText('Your order has been dispatched, and will arrive just as fast as the pony can get there!');
    this.backHomeButton = page.getByRole('button', { name: 'Back Home' });
  }

  async navigateBackHome(): Promise<void> {
    await this.backHomeButton.click();
  }

}
