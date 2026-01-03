import { test, expect } from '../fixtures/base-test';
import { EXPECTED_URL_PATHS } from '../utils/test-constants';

test.describe('Global Sidebar Menu Functionality', () => {

  // --- Visibility across pages using Fixtures ---

  test('should display all sidebar links on Products Page', async ({ authenticatedPage }) => {
    await authenticatedPage.openSidebarMenu();
    await expect.soft(authenticatedPage.allItemsLink).toBeVisible();
    await expect.soft(authenticatedPage.aboutLink).toBeVisible();
    await expect.soft(authenticatedPage.logoutLink).toBeVisible();
    await expect.soft(authenticatedPage.resetAppStateLink).toBeVisible();
  });

  test('should display all sidebar links on Cart Page', async ({ cartPageReady }) => {
    await cartPageReady.openSidebarMenu();
    await expect.soft(cartPageReady.allItemsLink).toBeVisible();
    await expect.soft(cartPageReady.aboutLink).toBeVisible();
    await expect.soft(cartPageReady.logoutLink).toBeVisible();
    await expect.soft(cartPageReady.resetAppStateLink).toBeVisible();
  });

  test('should display all sidebar links on Checkout Overview', async ({ overviewReadyPage }) => {
    await overviewReadyPage.openSidebarMenu();
    await expect.soft(overviewReadyPage.allItemsLink).toBeVisible();
    await expect.soft(overviewReadyPage.aboutLink).toBeVisible();
    await expect.soft(overviewReadyPage.logoutLink).toBeVisible();
    await expect.soft(overviewReadyPage.resetAppStateLink).toBeVisible();
  });

  // --- Functional Logic ---

  test('should successfully logout and clear session', async ({ authenticatedPage, page }) => {
    await authenticatedPage.openSidebarMenu();
    await authenticatedPage.clickLogout();

    await expect(page).toHaveURL(EXPECTED_URL_PATHS.LOGIN_PAGE);
    // Verify we can't just 'go back' to authenticated area
    await page.goto(EXPECTED_URL_PATHS.PRODUCTS_PAGE);
    await expect(page).toHaveURL(EXPECTED_URL_PATHS.LOGIN_PAGE);
  });

  test('should successfully reset app state (clear cart)', async ({ authenticatedPage }) => {
    // Setup: Add an item first
    await authenticatedPage.addToCart();
    await expect(authenticatedPage.cartCount).toHaveText('1');

    // Action: Reset state
    await authenticatedPage.openSidebarMenu();
    await authenticatedPage.resetAppStateLink.click();

    // Assert: Cart is empty
    await expect(authenticatedPage.cartCount).toBeHidden();

  });
});
