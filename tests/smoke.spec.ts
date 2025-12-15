import { test, expect } from "@playwright/test";
import { ProductsPage } from "../pages/ProductsPage";
import { loginAsStandardUser, loginAsLockedOutUser } from "../utils/testFlows";
import { EXPECTED_PRODUCTS_CONSTANTS, EXPECTED_LOGIN_CONSTANTS } from "../utils/testConstants";
import { LoginPage } from "../pages/LoginPage";

/**
 * Smoke Test Suite
 * This suite provides quick sanity checks to ensure the application's most critical
 * functions (Login, Navigation, basic access) are operational.
 */
test.describe("Smoke Test Suite", () => {

  // Test 1: Successful Login and Navigation
  test('should successfully log in and navigate to the Products page', async ({ page }) => {

    // Step 1: Attempt login with valid credentials
    await loginAsStandardUser(page);

    // Step 2: Assert successful navigation to the products page
    await expect(page).toHaveURL(EXPECTED_PRODUCTS_CONSTANTS.PAGE_URL);

    // Step 3: Assert key product page elements are visible
    const productsPage = new ProductsPage(page);
    await expect(productsPage.title).toBeVisible();
    await expect(productsPage.cartButton).toBeVisible();

  });

  // Test 2: Locked Out User Login Failure
  test('should display error message for locked out user', async ({ page }) => {

    // Step 1: Attempt login with locked-out credentials
    const loginPage = await loginAsLockedOutUser(page);

    // Step 2: Assert navigation remains on the login page
    await expect(page).toHaveURL(EXPECTED_LOGIN_CONSTANTS.PAGE_URL);

    // Step 3: Assert the correct error message is displayed
    await expect(loginPage.errorMessage).toHaveText(EXPECTED_LOGIN_CONSTANTS.ERROR_LOCKED_OUT);

  });

  // Test 3: Logout Functionality Check
  test('should successfully log out and return to the login page', async ({ page }) => {

    // Step 1: Log in first (prerequisite)
    await loginAsStandardUser(page);
    await expect(page).toHaveURL(EXPECTED_PRODUCTS_CONSTANTS.PAGE_URL);

    const productsPage = new ProductsPage(page);

    // Step 2: Open the sidebar menu
    await productsPage.sidebarMenuButton.click();

    // Step 3: Click the Logout link
    await productsPage.logoutLink.click();

    // Step 4: Assert navigation back to the login page
    await expect(page).toHaveURL(EXPECTED_LOGIN_CONSTANTS.PAGE_URL);

    // Step 5: Assert that the login username field is empty after logout
    const loginPage = new LoginPage(page);
    await expect(loginPage.usernameInput).toHaveValue('');

  });

});
