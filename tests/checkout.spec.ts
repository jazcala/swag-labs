import { test, expect } from '../fixtures/base-test';
import { generateRandomUser } from '../utils/test-data';
import { EXPECTED_URL_PATHS } from '../utils/test-constants';

test.describe('Checkout Page Tests', () => {

  test('should displayed the title', async ({ checkoutReadyPage }) => {
    await expect(checkoutReadyPage.title).toBeVisible();
  });

  test('should display the checkout form', async ({ checkoutReadyPage }) => {
    await expect.soft(checkoutReadyPage.firstNameInput).toBeVisible();
    await expect.soft(checkoutReadyPage.lastNameInput).toBeVisible();
    await expect.soft(checkoutReadyPage.postalCodeInput).toBeVisible();
    await expect.soft(checkoutReadyPage.continueButton).toBeVisible();
    await expect.soft(checkoutReadyPage.cancelButton).toBeVisible();
  });

  test('should display the correct number of items in the cart', async ({ checkoutReadyPage }) => {
    await expect(checkoutReadyPage.cartCount).toHaveText('1');
  });

  test('should fill the checkout form and proceed to the next step', async ({ checkoutReadyPage, page }) => {
    const { firstName, lastName, zipCode } = generateRandomUser();
    await checkoutReadyPage.fillFormAndContinue(firstName, lastName, zipCode);
    await expect(page).toHaveURL(EXPECTED_URL_PATHS.CHECKOUT_OVERVIEW_PAGE);
  });

  test('should cancel the checkout process', async ({ checkoutReadyPage, page }) => {
    await checkoutReadyPage.cancelCheckout();
    await expect(page).toHaveURL(EXPECTED_URL_PATHS.CART_PAGE);
  });

});
