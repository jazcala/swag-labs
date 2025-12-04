import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * CheckoutCompletePage class represents the checkout complete page of the Swag Labs application.
 * It encapsulates the locators and expected values related to the checkout completion functionality.
 */

export class CheckoutCompletePage extends BasePage {
  readonly messageTitle: Locator;
  readonly messageDescription: Locator;
  readonly backHomeButton: Locator;

  constructor(page: Page) {
    super(page);
    this.messageTitle = page.locator('[data-test="complete-header"]');
    this.messageDescription = page.locator('[data-test="complete-text"]');
    this.backHomeButton = page.locator('[data-test="back-to-products"]');
  }

}
