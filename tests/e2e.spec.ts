import { test, expect } from "@playwright/test";
import { ProductsPage } from "../pages/ProductsPage";
import { CartPage } from "../pages/CartPage";
import { CheckoutOverviewPage } from "../pages/CheckoutOverviewPage";
import { CheckoutCompletePage } from "../pages/CheckoutCompletePage";
import { loginAsStandardUser, fillFormAndContinue } from "../utils/testFlows";
import { ALL_PRODUCTS, TestProductShape } from "../utils/testData";
import { EXPECTED_CHECKOUT_CONSTANTS, EXPECTED_CHECKOUT_COMPLETE_CONSTANTS, EXPECTED_CHECKOUT_OVERVIEW_CONSTANTS, EXPECTED_PRODUCTS_CONSTANTS } from "../utils/testConstants";

/**
 * E2E (End-to-End) test suite using Data-Driven Testing (DDT) to validate the
 * entire critical purchase path for multiple products.
 */
test.describe("E2E Purchase Flows", () => {

  // --- 1. SINGLE-ITEM PURCHASE FLOW (DDT) ---
  test.describe("Single-Item Purchase (Data Driven)", () => {

    ALL_PRODUCTS.forEach((product: TestProductShape) => {

      test(`should successfully purchase the ${product.name} (Single-Item E2E)`, async ({ page }) => {

        // Step 1. Authentication
        await loginAsStandardUser(page);
        await expect(page).toHaveURL(EXPECTED_PRODUCTS_CONSTANTS.PAGE_URL);

        // Step 2. Add Product
        const productsPage = new ProductsPage(page);
        await productsPage.addToCart(product.name);

        // Steps 3 & 4. Cart Navigation & Start Checkout
        await productsPage.viewCart();
        const cartPage = new CartPage(page);
        await cartPage.proceedToCheckout();
        await expect(page).toHaveURL(EXPECTED_CHECKOUT_CONSTANTS.PAGE_URL);

        // Step 5. Fill Form
        await fillFormAndContinue(page);

        // Step 6. Overview Validation
        await expect(page).toHaveURL(EXPECTED_CHECKOUT_OVERVIEW_CONSTANTS.PAGE_URL);

        const expectedItemTotal = parseFloat(product.price).toFixed(2);
        const expectedTaxTotal = parseFloat(product.tax).toFixed(2);
        const expectedFinalTotal = (parseFloat(expectedItemTotal) + parseFloat(expectedTaxTotal)).toFixed(2);

        const overviewPage = new CheckoutOverviewPage(page);
        await expect(overviewPage.itemSubTotalValue).toHaveText(`Item total: $${expectedItemTotal}`);
        await expect(overviewPage.itemTaxValue).toHaveText(`Tax: $${expectedTaxTotal}`);
        await expect(overviewPage.itemTotalValue).toHaveText(`Total: $${expectedFinalTotal}`);

        // Step 7. Finalize
        await overviewPage.finishButton.click();

        // Step 8. Confirmation (URL and Message Check)
        await expect(page).toHaveURL(EXPECTED_CHECKOUT_COMPLETE_CONSTANTS.PAGE_URL);

        const checkoutCompletePage = new CheckoutCompletePage(page);
        await expect(checkoutCompletePage.messageTitle).toHaveText(EXPECTED_CHECKOUT_COMPLETE_CONSTANTS.MESSAGE_TITLE);
        await expect(checkoutCompletePage.messageDescription).toHaveText(EXPECTED_CHECKOUT_COMPLETE_CONSTANTS.MESSAGE_DESCRIPTION);

        // Step 9. Return to Home

        await expect(checkoutCompletePage.backHomeButton).toBeVisible();
        await checkoutCompletePage.backHomeButton.click();

        // Final navigation assertion
        await expect(page).toHaveURL(EXPECTED_PRODUCTS_CONSTANTS.PAGE_URL);

      });
    });
  });

  // --- 2. MULTI-ITEM PURCHASE FLOW - REFACTORED TO MATCH USER'S STRUCTURE ---
  test.describe("Multi-Item Purchase Validation", () => {

    test('should correctly calculate total price for two different items (Multi-Item E2E)', async ({ page }) => {
      const productsPage = new ProductsPage(page);

      // Products to be tested (Backpack and Bike Light)
      const product1 = ALL_PRODUCTS.find(p => p.name === 'Sauce Labs Backpack') as TestProductShape;
      const product2 = ALL_PRODUCTS.find(p => p.name === 'Sauce Labs Bike Light') as TestProductShape;

      // Calculate expected totals based on data
      const expectedItemTotal = (parseFloat(product1.price) + parseFloat(product2.price)).toFixed(2);
      const expectedTaxTotal = (parseFloat(product1.tax) + parseFloat(product2.tax)).toFixed(2);
      const expectedFinalTotal = (parseFloat(expectedItemTotal) + parseFloat(expectedTaxTotal)).toFixed(2);

      // Step 1. Authentication
      await loginAsStandardUser(page);
      await expect(page).toHaveURL(EXPECTED_PRODUCTS_CONSTANTS.PAGE_URL); // New constant

      // Step 2. Add Multiple Products
      await productsPage.addToCart(product1.name);
      await productsPage.addToCart(product2.name);

      // Steps 3 & 4. Cart Navigation & Start Checkout
      await productsPage.viewCart();
      const cartPage = new CartPage(page);
      await cartPage.checkoutButton.click();
      await expect(page).toHaveURL(EXPECTED_CHECKOUT_CONSTANTS.PAGE_URL);

      // Step 5. Fill Form
      await fillFormAndContinue(page);

      // Step 6. Overview Validation (CRITICAL ASSERTION)
      await expect(page).toHaveURL(EXPECTED_CHECKOUT_OVERVIEW_CONSTANTS.PAGE_URL);

      // Check that the calculated totals match our expected aggregated values
      const overviewPage = new CheckoutOverviewPage(page);
      await expect(overviewPage.itemSubTotalValue).toHaveText(`Item total: $${expectedItemTotal}`);
      await expect(overviewPage.itemTaxValue).toHaveText(`Tax: $${expectedTaxTotal}`);
      await expect(overviewPage.itemTotalValue).toHaveText(`Total: $${expectedFinalTotal}`);

      // Step 7. Finalize
      await overviewPage.finishButton.click();

      // Step 8. Confirmation (URL and Message Check)
      await expect(page).toHaveURL(EXPECTED_CHECKOUT_COMPLETE_CONSTANTS.PAGE_URL);
      const checkoutCompletePage = new CheckoutCompletePage(page);
      await expect(checkoutCompletePage.messageTitle).toHaveText(EXPECTED_CHECKOUT_COMPLETE_CONSTANTS.MESSAGE_TITLE);
      await expect(checkoutCompletePage.messageDescription).toHaveText(EXPECTED_CHECKOUT_COMPLETE_CONSTANTS.MESSAGE_DESCRIPTION);

      // Step 9. Return to Home
      expect(checkoutCompletePage.backHomeButton).toBeVisible();
      await checkoutCompletePage.backHomeButton.click();
      await expect(page).toHaveURL(EXPECTED_PRODUCTS_CONSTANTS.PAGE_URL);

    });
  });
});
