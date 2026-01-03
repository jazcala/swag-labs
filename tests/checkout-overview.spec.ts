import { test, expect } from '../fixtures/base-test';
import { TEST_PRODUCT_DATA, TEST_CHECKOUT_DATA } from '../utils/test-data';
import {
  EXPECTED_URL_PATHS
  , EXPECTED_CHECKOUT_OVERVIEW_CONSTANTS,
} from '../utils/test-constants';

test.describe('Checkout Overview Tests', () => {

  test('should display the correct title on checkout overview page', async ({ overviewReadyPage }) => {
    await expect(overviewReadyPage.title).toBeVisible();
  });

  test('should have correct item list in the overview', async ({ overviewReadyPage }) => {
    await expect.soft(overviewReadyPage.itemQuantity).toBeVisible();
    await expect.soft(overviewReadyPage.itemQuantity).toHaveText('1');
    await expect.soft(overviewReadyPage.itemName).toBeVisible();
    await expect.soft(overviewReadyPage.itemName).toHaveText(TEST_PRODUCT_DATA.name);
    await expect.soft(overviewReadyPage.itemPrice).toBeVisible();
    await expect.soft(overviewReadyPage.itemPrice).toHaveText(`$${TEST_PRODUCT_DATA.price}`);
    await expect.soft(overviewReadyPage.itemDescription).toBeVisible();
    await expect.soft(overviewReadyPage.itemDescription).toHaveText(TEST_PRODUCT_DATA.description);
  });

  test('should have Payment Information section', async ({ overviewReadyPage }) => {
    await expect(overviewReadyPage.paymentInfoTitle).toBeVisible();
    await expect(overviewReadyPage.paymentInfoValue).toHaveText(TEST_CHECKOUT_DATA.card);
  });

  test('should have Shipping Information section', async ({ overviewReadyPage }) => {
    await expect(overviewReadyPage.shippingInfoTitle).toBeVisible();
    await expect(overviewReadyPage.shippingInfoValue).toHaveText(TEST_CHECKOUT_DATA.shipping);
  });

  test('should have Price Total section', async ({ overviewReadyPage }) => {
    await expect(overviewReadyPage.totalTitle).toBeVisible();
    await expect(overviewReadyPage.itemSubTotalValue).toBeVisible();
    await expect(overviewReadyPage.itemSubTotalValue).toHaveText(`${EXPECTED_CHECKOUT_OVERVIEW_CONSTANTS.SUBTOTAL_LABEL}${TEST_PRODUCT_DATA.price}`);
    await expect(overviewReadyPage.itemTaxValue).toBeVisible();
    await expect(overviewReadyPage.itemTaxValue).toHaveText(`${EXPECTED_CHECKOUT_OVERVIEW_CONSTANTS.TAX_LABEL}${TEST_PRODUCT_DATA.tax}`);
    await expect(overviewReadyPage.itemTotalValue).toBeVisible();
    await expect(overviewReadyPage.itemTotalValue).toBeVisible();
    await expect(overviewReadyPage.itemTotalValue).toHaveText(`${EXPECTED_CHECKOUT_OVERVIEW_CONSTANTS.TOTAL_LABEL}${TEST_PRODUCT_DATA.total}`);
  });

  test('should have Finish and Cancel buttons', async ({ overviewReadyPage }) => {
    await expect(overviewReadyPage.finishButton).toBeVisible();
    await expect(overviewReadyPage.cancelButton).toBeVisible();
  });

  test('should navigate to the Finish page when Finish button is clicked', async ({ overviewReadyPage, page }) => {
    await overviewReadyPage.completeCheckout();
    await expect(page).toHaveURL(EXPECTED_URL_PATHS.CHECKOUT_COMPLETE_PAGE);
  });

  test('should navigate back to the cart when Cancel button is clicked', async ({ overviewReadyPage, page }) => {
    await overviewReadyPage.cancelCheckout();
    await expect(page).toHaveURL(EXPECTED_URL_PATHS.PRODUCTS_PAGE);;
  });

});
