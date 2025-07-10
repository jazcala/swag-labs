import { Page, Locator } from '@playwright/test';

/**
 * LoginPage class represents the login page of the Swag Labs application.
 * It encapsulates the locators and actions related to the login functionality.
 */
export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  /**
   * Constructor for the LoginPage.
   * @param page The Playwright Page object instance.
   */
  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  /**
   * Navigates to the Swag Labs login page.
   * @returns A promise that resolves when the navigation is complete.
   */
  async goto() {
    await this.page.goto('/');
  }

  /**
   * Performs a login action with the given username and password.
   * @param username The username to enter.
   * @param password The password to enter.
   * @returns A promise that resolves after the login attempt.
   */
  async login(username: string, password: string) {
    await this.usernameInput.fill(username); // Fill the username input
    await this.passwordInput.fill(password); // Fill the password input
    await this.loginButton.click();         // Click the login button
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
}
