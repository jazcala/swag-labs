import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';
import { EXPECTED_URL_PATHS } from '../utils/test-constants';

/**
 * LoginPage class represents the login page of the Swag Labs application.
 * It encapsulates the locators and actions related to the login functionality.
 */
export class LoginPage extends BasePage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  protected readonly path = EXPECTED_URL_PATHS.LOGIN_PAGE;

  /**
   * Constructor for the LoginPage.
   * @param page The Playwright Page object instance.
   */
  constructor(page: Page) {
    super(page);
    this.usernameInput = page.getByRole('textbox', { name: 'Username' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.loginButton = page.getByRole('button', { name: 'Login' });
  }

  /**
   * Performs a login action with the given username and password.
   * @param username The username to enter.
   * @param password The password to enter.
   * @returns A promise that resolves after the login attempt.
   */
  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username); // Fill the username input
    await this.passwordInput.fill(password); // Fill the password input
    await this.loginButton.click();         // Click the login button
  }

}
