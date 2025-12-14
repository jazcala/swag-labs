import { test, expect, Page } from "@playwright/test";
import { loginAsStandardUser, fillFormAndContinue } from "../utils/testFlows";
import { ProductsPage } from "../pages/ProductsPage";
import { CartPage } from "../pages/CartPage";
import { CheckoutOverviewPage } from "../pages/CheckoutOverviewPage";
import { EXPECTED_URL_PATHS } from "../utils/testConstants";
import { LoginPage } from "../pages/LoginPage";

// Define an array of URLs to test the sidebar on
const authenticatedPages = [
  { name: 'Products Page', url: EXPECTED_URL_PATHS.PRODUCTS_PAGE },
  { name: 'Cart Page', url: EXPECTED_URL_PATHS.CART_PAGE },
  { name: 'Checkout Overview Page', url: EXPECTED_URL_PATHS.CHECKOUT_PAGE_STEP_1 }
];

test.describe("Global Sidebar Menu Functionality Tests", () => {

  test.beforeEach(async ({ page }) => {
    // Prerequisite: Log in as standard user for all sidebar tests
    await loginAsStandardUser(page);
  });

  /**
   * Helper function to check the visibility of all required sidebar links.
   * It uses the BasePage methods which are available on any initialized Page Object.
   */
  const assertSidebarLinksVisible = async (pageObject: ProductsPage | CartPage | CheckoutOverviewPage) => {
    await pageObject.openSidebarMenu();
    await expect(pageObject.allItemsLink).toBeVisible();
    await expect(pageObject.aboutLink).toBeVisible();
    await expect(pageObject.logoutLink).toBeVisible();
    await expect(pageObject.resetAppStateLink).toBeVisible();
    await pageObject.closeSidebarMenu();
  };

  // --- Test Group 1: Sidebar Link Visibility across all pages (DDT) ---
  authenticatedPages.forEach((pagePath) => {

    test(`should display all sidebar links correctly on the ${pagePath.name}`, async ({ page }) => {
      let pageObject: ProductsPage | CartPage | CheckoutOverviewPage;

      // Navigate to the specific page
      if (pagePath.url === EXPECTED_URL_PATHS.PRODUCTS_PAGE) {
        // Already on products page after login, no need to navigate
        pageObject = new ProductsPage(page);
      } else if (pagePath.url === EXPECTED_URL_PATHS.CART_PAGE) {
        // Add a product to reach the cart page
        const productsPage = new ProductsPage(page);
        await productsPage.addToCart();
        await productsPage.viewCart();
        pageObject = new CartPage(page);
      } else if (pagePath.url === EXPECTED_URL_PATHS.CHECKOUT_PAGE_STEP_1) {
        // Add a product, navigate to cart, then through checkout step 1
        const productsPage = new ProductsPage(page);
        await productsPage.addToCart();
        await productsPage.viewCart();
        const cartPage = new CartPage(page);
        await cartPage.proceedToCheckout();
        await fillFormAndContinue(page);
        pageObject = new CheckoutOverviewPage(page);
      }

      await assertSidebarLinksVisible(pageObject!);
    });
  });

  // --- Test Group 2: Functional tests for sidebar links ---

  test('should successfully navigate to the Inventory page via All Items link', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    // Open menu
    await productsPage.openSidebarMenu();

    // Click All Items link
    await productsPage.allItemsLink.click();

    // Assert navigation
    await expect(page).toHaveURL(EXPECTED_URL_PATHS.PRODUCTS_PAGE);
    await expect(productsPage.title).toBeVisible();

  });

  test('should successfully logout via the Logout link', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    // Open menu
    await productsPage.openSidebarMenu();

    // Click Logout (using BasePage method)
    await productsPage.clickLogout();

    // Assert navigation back to login page
    await expect(page).toHaveURL(EXPECTED_URL_PATHS.LOGIN_PAGE);

    // Assert clean state
    const loginPage = new LoginPage(page);
    await expect(loginPage.usernameInput).toHaveValue('');

  });

  test('should successfully reset app state via Reset App State link', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    // Arrange: Add item to cart and assert cart count
    await productsPage.addToCart();
    expect(await productsPage.getCartItemCount()).toBe(1);

    // Step 1: Open menu
    await productsPage.openSidebarMenu();

    // Step 2: Click Reset App State
    await productsPage.resetAppStateLink.click();

    // Step 3: Assert cart badge is no longer visible
    expect(await productsPage.getCartItemCount()).toBe(0);

  });
});
