import { test, expect } from '../fixtures/base-test';
import { loginAsLockedOutUser } from '../utils/test-flows';
import {
  EXPECTED_URL_PATHS,
  EXPECTED_LOGIN_CONSTANTS,
} from '../utils/test-constants';

/**
 * Smoke Test Suite
 * This suite provides quick sanity checks to ensure the application's most critical
 * functions (Login, Navigation, basic access) are operational.
 */
test.describe('Smoke Test Suite @smoke', () => {

  // Successful Login and Navigation
  test('should successfully log in and navigate to the Products page', async ({ authenticatedPage }) => {

    await expect(authenticatedPage.title).toBeVisible();
    await expect(authenticatedPage.cartButton).toBeVisible();

  });

  // Locked Out User Login Failure
  test('should display error message for locked out user', async ({ loginPage, page }) => {

    // Attempt login with locked-out credentials
    await loginAsLockedOutUser(loginPage);

    // Assert navigation remains on the login page
    await expect(page).toHaveURL(EXPECTED_URL_PATHS.LOGIN_PAGE);

    // Assert the correct error message is displayed
    await expect(loginPage.errorMessage).toHaveText(EXPECTED_LOGIN_CONSTANTS.ERROR_LOCKED_OUT);

  });

  // Logout Functionality Check
  test('should successfully log out and return to the login page', async ({ authenticatedPage, page, loginPage }) => {

    await expect(page).toHaveURL(EXPECTED_URL_PATHS.PRODUCTS_PAGE);

    // Open the sidebar menu
    await authenticatedPage.openSidebarMenu();

    // Click the Logout link
    await authenticatedPage.logoutLink.click();

    // Assert navigation back to the login page
    await expect(page).toHaveURL(EXPECTED_URL_PATHS.LOGIN_PAGE);

    // Assert that the login username field is empty after logout
    await expect(loginPage.usernameInput).toHaveValue('');

  });

});
