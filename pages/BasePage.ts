import { Page, Locator } from '@playwright/test';

/**
 * BasePage class serves as a foundational class for all page objects in the Swag Labs application.
 * It encapsulates common properties and methods that can be shared across different pages.
 */
export class BasePage {
  readonly page: Page;
  readonly siteTitle: Locator;
  readonly title: Locator;
  readonly errorMessage: Locator;
  readonly cartButton: Locator;

  /**
   * Constructor for the BasePage.
   * @param page The Playwright Page object instance.
   */
  constructor(page: Page) {
    this.page = page;
    this.title = page.locator('[data-test="title"]');
    this.siteTitle = page.locator('.app_logo');
    this.errorMessage = page.locator('[data-test="error"]');
    this.cartButton = page.locator('.shopping_cart_link');
  }

  /**
   * Navigates to a specified URL.
   * @param url The URL to navigate to.
   * @returns A promise that resolves when the navigation is complete.
   */
  async goto(url: string) {
    await this.page.goto(url);
  }

  /**
   * Retrieves the text of the error message displayed on the page.
   * @returns A promise that resolves with the error message text.
   */
  async getErrorMessageText(): Promise<string | null> {
    return await this.errorMessage.textContent(); // Get the text content of the error message element
  }

  /**
   * Checks if the error message is visible on the page.
   * @returns A promise that resolves to true if the error message is visible, false otherwise.
   */
  async isErrorMessageVisible(): Promise<boolean> {
    return await this.errorMessage.isVisible(); // Check if the error message element is visible
  }

  /**
   * Views the cart page by clicking the cart button.
   */
  async viewCart(): Promise<void> {
    await this.cartButton.click();
  }

}
