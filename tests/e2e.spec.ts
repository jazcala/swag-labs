import { test, expect } from '../fixtures/base-test';
import { ALL_PRODUCTS, generateRandomUser, TestProductShape } from '../utils/test-data';
import {
  EXPECTED_URL_PATHS
} from '../utils/test-constants';

/**
 * E2E (End-to-End) test suite using Data-Driven Testing (DDT) to validate the
 * entire critical purchase path for multiple products.
 */
test.describe('E2E Purchase Flows', () => {

  // --- 1. SINGLE-ITEM PURCHASE FLOW (DDT) ---
  test.describe('Single-Item Purchase (Data Driven)', () => {

    ALL_PRODUCTS.forEach((product: TestProductShape) => {

      test(`should successfully purchase the ${product.name} (Single-Item E2E)`, async ({ authenticatedPage, cartPage, checkoutPage, checkoutOverviewPage, checkoutCompletePage, page }) => {

        // Authenticated - add product to cart and navigate
        await authenticatedPage.addToCart(product.name);
        await authenticatedPage.viewCart();
        await cartPage.proceedToCheckout();
        await expect(page).toHaveURL(EXPECTED_URL_PATHS.CHECKOUT_PAGE);

        // Form entry
        const user = generateRandomUser();
        await checkoutPage.fillFormAndContinue(user.firstName, user.lastName, user.zipCode);

        // Overview checks
        await expect.soft(checkoutOverviewPage.itemSubTotalValue).toContainText(product.price);
        await expect.soft(checkoutOverviewPage.itemTotalValue).toContainText(product.total);

        await checkoutOverviewPage.completeCheckout();

        // Final Confirmation
        await expect(page).toHaveURL(EXPECTED_URL_PATHS.CHECKOUT_COMPLETE_PAGE);
        await expect.soft(checkoutCompletePage.messageTitle).toBeVisible();
        await expect.soft(checkoutCompletePage.messageDescription).toBeVisible();

        //Return to Home
        await checkoutCompletePage.navigateBackHome();

        // Lifecycle loop - Back to home
        await expect(page).toHaveURL(EXPECTED_URL_PATHS.PRODUCTS_PAGE);

      });
    });
  });

  // --- 2. MULTI-ITEM PURCHASE FLOW - REFACTORED TO MATCH USER'S STRUCTURE ---
  test.describe('Multi-Item Purchase Validation', () => {

    test('should correctly calculate total price for two different items (Multi-Item E2E)', async ({ authenticatedPage, cartPage, checkoutPage, checkoutOverviewPage, checkoutCompletePage, page }) => {

      // Products to be tested (Backpack and Bike Light)
      const product1 = ALL_PRODUCTS.find(p => p.name === 'Sauce Labs Backpack') as TestProductShape;
      const product2 = ALL_PRODUCTS.find(p => p.name === 'Sauce Labs Bike Light') as TestProductShape;

      // Calculate expected totals based on data
      const expectedItemTotal = (parseFloat(product1.price) + parseFloat(product2.price)).toFixed(2);
      const expectedTaxTotal = (parseFloat(product1.tax) + parseFloat(product2.tax)).toFixed(2);
      const expectedFinalTotal = (parseFloat(expectedItemTotal) + parseFloat(expectedTaxTotal)).toFixed(2);

      // Add Multiple Products
      await authenticatedPage.addToCart(product1.name);
      await authenticatedPage.addToCart(product2.name);

      // Cart Navigation & Start Checkout
      await authenticatedPage.viewCart();
      await cartPage.proceedToCheckout();
      await expect(page).toHaveURL(EXPECTED_URL_PATHS.CHECKOUT_PAGE);

      // Fill Form and proceed to checkout
      const user = generateRandomUser();
      await checkoutPage.fillFormAndContinue(user.firstName, user.lastName, user.zipCode);
      await expect(page).toHaveURL(EXPECTED_URL_PATHS.CHECKOUT_OVERVIEW_PAGE);

      await expect(checkoutOverviewPage.itemSubTotalValue).toHaveText(`Item total: $${expectedItemTotal}`);
      await expect(checkoutOverviewPage.itemTaxValue).toHaveText(`Tax: $${expectedTaxTotal}`);
      await expect(checkoutOverviewPage.itemTotalValue).toHaveText(`Total: $${expectedFinalTotal}`);

      // Finalize Order
      await checkoutOverviewPage.completeCheckout();

      // Confirmation
      await expect(page).toHaveURL(EXPECTED_URL_PATHS.CHECKOUT_COMPLETE_PAGE);
      await expect(checkoutCompletePage.messageTitle).toBeVisible();
      await expect(checkoutCompletePage.messageDescription).toBeVisible();

      // Return to Home
      await expect(checkoutCompletePage.backHomeButton).toBeVisible();
      await checkoutCompletePage.navigateBackHome();
      await expect(page).toHaveURL(EXPECTED_URL_PATHS.PRODUCTS_PAGE);

    });
  });
});
