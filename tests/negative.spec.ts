import { test, expect } from '../fixtures/base-test';
import { generateRandomUser } from '../utils/test-data';
import {
  EXPECTED_URL_PATHS,
  EXPECTED_CHECKOUT_CONSTANTS
} from '../utils/test-constants';

test.describe('Negative Tests (Application Flow Errors)', () => {

  // --- Cart/Checkout Error Scenarios ---
  test.skip('should prevent checkout navigation when cart is empty', async ({ authenticatedPage, cartPage, page }) => {

    test.info().annotations.push({ type: 'issue', description: 'The application navigates to checkout with an empty cart' });

    // 1. Go to the Cart Page (it should be empty)
    await authenticatedPage.viewCart();
    await expect(page).toHaveURL(EXPECTED_URL_PATHS.CART_PAGE);

    // 2. Attempt to click Checkout button
    await cartPage.proceedToCheckout();

    // 3. Verify that the system redirects back to the Products page
    await expect(page).toHaveURL(EXPECTED_URL_PATHS.PRODUCTS_PAGE);
  });

  // --- Checkout Form Error Scenarios ---

  test.describe('Checkout Form Validation', () => {

    test('should display an error when first name is missing', async ({ checkoutReadyPage, page }) => {
      const { lastName, zipCode } = generateRandomUser();
      await checkoutReadyPage.fillFormAndContinue('', lastName, zipCode);
      await expect(checkoutReadyPage.errorMessage).toHaveText(EXPECTED_CHECKOUT_CONSTANTS.FIRST_NAME_ERROR);
      await expect(page).toHaveURL(EXPECTED_CHECKOUT_CONSTANTS.PAGE_URL);
    });

    test('should display an error when last name is missing', async ({ checkoutReadyPage, page }) => {
      const { firstName, zipCode } = generateRandomUser();
      await checkoutReadyPage.fillFormAndContinue(firstName, '', zipCode);
      await expect(checkoutReadyPage.errorMessage).toHaveText(EXPECTED_CHECKOUT_CONSTANTS.LAST_NAME_ERROR);
      await expect(page).toHaveURL(EXPECTED_CHECKOUT_CONSTANTS.PAGE_URL);
    });

    test('should display an error when postal code is missing', async ({ checkoutReadyPage, page }) => {
      const { firstName, lastName } = generateRandomUser();
      await checkoutReadyPage.fillFormAndContinue(firstName, lastName, '');
      await expect(checkoutReadyPage.errorMessage).toHaveText(EXPECTED_CHECKOUT_CONSTANTS.ZIP_CODE_ERROR);
      await expect(page).toHaveURL(EXPECTED_CHECKOUT_CONSTANTS.PAGE_URL);
    });

  });
});
