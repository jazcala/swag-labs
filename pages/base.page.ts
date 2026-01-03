import { Page, Locator } from '@playwright/test';
import { EXPECTED_URL_PATHS } from '../utils/test-constants';

/**
 * BasePage class serves as a foundational class for all page objects in the Swag Labs application.
 * It encapsulates common properties and methods that can be shared across different pages.
 */
export abstract class BasePage {
  protected readonly path = EXPECTED_URL_PATHS.LOGIN_PAGE;
  readonly page: Page;
  readonly siteTitle: Locator;
  readonly errorMessage: Locator;
  //--- Global Cart Elements ---
  readonly cartButton: Locator;
  readonly cartCount: Locator;
  //--- Global Sidebar Elements ---
  readonly sidebarMenuButton: Locator;
  readonly allItemsLink: Locator;
  readonly aboutLink: Locator;
  readonly logoutLink: Locator;
  readonly resetAppStateLink: Locator;
  readonly closeSidebarButton: Locator;
  //--- Global Footer Elements ---
  readonly footerContainer: Locator;
  readonly twitterLink: Locator;
  readonly facebookLink: Locator;
  readonly linkedinLink: Locator;
  readonly copyrightText: Locator;
  /**
   * Constructor for the BasePage.
   * @param page The Playwright Page object instance.
   */
  constructor(page: Page) {
    this.page = page;
    this.siteTitle = page.getByText('Swag Labs');
    // --- Global Error Message Element Inicialization ---
    this.errorMessage = page.getByTestId('error');
    // --- Globar Cart Elements Inicialization ---
    this.cartButton = page.getByTestId('shopping-cart-link');
    this.cartCount = page.getByTestId('shopping-cart-badge');
    // --- Global Sidebar Elements Inicialization ---
    this.sidebarMenuButton = page.getByRole('button', { name: 'Open Menu' });
    this.allItemsLink = page.getByRole('link', { name: 'All Items' });
    this.aboutLink = page.getByRole('link', { name: 'About' });
    this.logoutLink = page.getByRole('link', { name: 'Logout' });
    this.resetAppStateLink = page.getByRole('link', { name: 'Reset App State' });
    this.closeSidebarButton = page.getByRole('button', { name: 'Close Menu' });
    // --- Global Footer Elements Inicialization ---
    this.footerContainer = page.getByTestId('footer');
    this.twitterLink = page.getByRole('link', { name: 'Twitter' });
    this.facebookLink = page.getByRole('link', { name: 'Facebook' });
    this.linkedinLink = page.getByRole('link', { name: 'LinkedIn' });
    this.copyrightText = page.getByTestId('footer-copy');
  }

  /**
   * Navigates to a specified URL.
   * @param url The URL to navigate to.
   * @returns A promise that resolves when the navigation is complete.
   */
  async goto(url: string): Promise<void> {
    await this.page.goto(url);
  }

  async navigate(): Promise<void> {
    await this.page.goto(this.path);
    await this.page.waitForURL(`**${this.path}`);
  }

  // --- Reusable Error Message Methods ---
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
  //--- Cart Methods ---

  /**
   * Navigates to the cart page by clicking the cart button.
   */
  async viewCart(): Promise<void> {
    await this.cartButton.click();
  }

  // --- Sidebar Methods ---

  /**
   * Opens the hamburger sidebar menu.
   */
  async openSidebarMenu(): Promise<void> {
    await this.sidebarMenuButton.click();
  }

  /**
     * Closes the hamburger sidebar menu.
     */
  async closeSidebarMenu(): Promise<void> {
    await this.closeSidebarButton.click();
  }

  /**
   * Clicks the Logout link in the sidebar menu.
   */
  async clickLogout(): Promise<void> {
    await this.logoutLink.click();
  }

  // -- Footer
  async clickSocialLink(platform: string): Promise<void> {
    const links: Record<string, Locator> = {
      'Twitter': this.twitterLink,
      'Facebook': this.facebookLink,
      'LinkedIn': this.linkedinLink
    };
    await links[platform].click();
  }
}
