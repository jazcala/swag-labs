import { Page, Locator } from '@playwright/test';

export class CheckoutCompletePage {
  readonly page: Page;
  readonly title: Locator;
  readonly messageTitle: Locator;
  readonly messageDescription: Locator;
  readonly backHomeButton: Locator;

  // Expected elements values
  readonly expectedTitle: string = "Checkout: Complete!";
  readonly expectedMessageTitle: string = "Thank you for your order!";
  readonly expectedMessageDescription: string = "Your order has been dispatched, and will arrive just as fast as the pony can get there!";
  readonly expectedBackHomeButtonText: string = "Back Home";

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator('[data-test="title"]');
    this.messageTitle = page.locator('[data-test="complete-header"]');
    this.messageDescription = page.locator('[data-test="complete-text"]');
    this.backHomeButton = page.locator('[data-test="back-to-products"]');
  }

}
