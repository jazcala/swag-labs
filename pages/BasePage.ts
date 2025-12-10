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
  //--- Global Cart Elements ---
  readonly cartButton: Locator;
  readonly cartQuantity: Locator;
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
    this.title = page.locator('[data-test="title"]');
    this.siteTitle = page.locator('.app_logo');
    this.errorMessage = page.locator('[data-test="error"]');
    // --- Globar Cart Elements Inicialization ---
    this.cartButton = page.locator('[data-test="shopping-cart-link"]');
    this.cartQuantity = page.locator('[data-test="shopping-cart-badge"]');
    // --- Global Sidebar Elements Inicialization ---
    this.sidebarMenuButton = page.locator('#react-burger-menu-btn');
    this.allItemsLink = page.locator('#inventory_sidebar_link');
    this.aboutLink = page.locator('#about_sidebar_link');
    this.logoutLink = page.locator('#logout_sidebar_link');
    this.resetAppStateLink = page.locator('#reset_sidebar_link');
    this.closeSidebarButton = page.locator('#react-burger-cross-btn');
    // --- Global Footer Elements Inicialization ---
    this.footerContainer = page.locator('[data-test="footer"]');
    this.twitterLink = page.locator('[data-test="social-twitter"]');
    this.facebookLink = page.locator('[data-test="social-facebook"]');
    this.linkedinLink = page.locator('data-test="social-linkedin"]');
    this.copyrightText = page.locator('[data-test="footer_copy"]');
  }

  /**
   * Navigates to a specified URL.
   * @param url The URL to navigate to.
   * @returns A promise that resolves when the navigation is complete.
   */
  async goto(url: string) {
    await this.page.goto(url);
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

  /**
   * Gets the number of items in the cart.
   * @returns A promise that resolves with the number of items in the cart.
   */
  async getCartItemCount(): Promise<number> {
    const isVisible = await this.cartQuantity.isVisible();
    if (!isVisible) {
      return 0;
    }
    const countText = await this.cartQuantity.textContent();
    return Number(countText);
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
}
