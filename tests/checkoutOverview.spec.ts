import { test, expect } from "@playwright/test";
import { loginAsStandardUser } from "../utils/testFlows";
import { CheckoutOverviewPage } from "../pages/CheckoutOverviewPage";
import { TEST_PRODUCT_DATA, TEST_CHECKOUT_DATA } from "../utils/testData";
import { fillFormAndContinue } from "../utils/testFlows";
import { ProductsPage } from "../pages/ProductsPage";
import { CartPage } from "../pages/CartPage";
import { EXPECTED_CHECKOUT_COMPLETE_CONSTANTS, EXPECTED_CHECKOUT_OVERVIEW_CONSTANTS, EXPECTED_PRODUCTS_CONSTANTS } from "../utils/testConstants";


test.describe("Checkout Overview Tests", () => {

  test.beforeEach(async ({ page }) => {
    // Login to the application
    await loginAsStandardUser(page);
    // Add product to the cart,
    const productsPage = new ProductsPage(page);
    await productsPage.addToCart(TEST_PRODUCT_DATA.name);
    //  view cart
    await productsPage.viewCart();
    // navigate to the checkout overview page
    const cartPage = new CartPage(page);
    await cartPage.proceedToCheckout();
    // Complete the form and proceed to checkout overview
    await fillFormAndContinue(page);
    await expect(page).toHaveURL(EXPECTED_CHECKOUT_OVERVIEW_CONSTANTS.PAGE_URL);
  });

  test("should display the correct title on checkout overview page", async ({ page }) => {
    const checkoutOverviewPage = new CheckoutOverviewPage(page);
    await expect(checkoutOverviewPage.title).toBeVisible();
  });

  test("should have correct item list in the overview", async ({ page }) => {
    const checkoutOverviewPage = new CheckoutOverviewPage(page);
    await expect(checkoutOverviewPage.itemQuantity).toBeVisible();
    await expect(checkoutOverviewPage.itemQuantity).toHaveText("1");
    await expect(checkoutOverviewPage.itemName).toBeVisible();
    await expect(checkoutOverviewPage.itemName).toHaveText(TEST_PRODUCT_DATA.name);
    await expect(checkoutOverviewPage.itemPrice).toBeVisible();
    await expect(checkoutOverviewPage.itemPrice).toHaveText(`$${TEST_PRODUCT_DATA.price}`);
    await expect(checkoutOverviewPage.itemDescription).toBeVisible();
    await expect(checkoutOverviewPage.itemDescription).toHaveText(TEST_PRODUCT_DATA.description);
  });

  test("should have Payment Information section", async ({ page }) => {
    const checkoutOverviewPage = new CheckoutOverviewPage(page);
    await expect(checkoutOverviewPage.paymentInfoTitle).toBeVisible();
    await expect(checkoutOverviewPage.paymentInfoValue).toHaveText(TEST_CHECKOUT_DATA.card);
  });

  test("should have Shipping Information section", async ({ page }) => {
    const checkoutOverviewPage = new CheckoutOverviewPage(page);
    await expect(checkoutOverviewPage.shippingInfoTitle).toBeVisible();
    await expect(checkoutOverviewPage.shippingInfoValue).toHaveText(TEST_CHECKOUT_DATA.shipping);
  });

  test("should have Price Total section", async ({ page }) => {
    const checkoutOverviewPage = new CheckoutOverviewPage(page);
    await expect(checkoutOverviewPage.totalTitle).toBeVisible();
    await expect(checkoutOverviewPage.itemSubTotalValue).toBeVisible();
    await expect(checkoutOverviewPage.itemSubTotalValue).toHaveText(`${EXPECTED_CHECKOUT_OVERVIEW_CONSTANTS.SUBTOTAL_LABEL}${TEST_PRODUCT_DATA.price}`);
    await expect(checkoutOverviewPage.itemTaxValue).toBeVisible();
    await expect(checkoutOverviewPage.itemTaxValue).toHaveText(`${EXPECTED_CHECKOUT_OVERVIEW_CONSTANTS.TAX_LABEL}${TEST_PRODUCT_DATA.tax}`);
    await expect(checkoutOverviewPage.itemTotalValue).toBeVisible();
    await expect(checkoutOverviewPage.itemTotalValue).toBeVisible();
    await expect(checkoutOverviewPage.itemTotalValue).toHaveText(`${EXPECTED_CHECKOUT_OVERVIEW_CONSTANTS.TOTAL_LABEL}${(parseFloat(TEST_PRODUCT_DATA.price) + parseFloat(TEST_PRODUCT_DATA.tax)).toFixed(2)}`);
  });

  test("should have Finish and Cancel buttons", async ({ page }) => {
    const checkoutOverviewPage = new CheckoutOverviewPage(page);
    expect(checkoutOverviewPage.finishButton).toBeVisible();
    expect(checkoutOverviewPage.cancelButton).toBeVisible();
  });

  test("should navigate to the Finish page when Finish button is clicked", async ({ page }) => {
    const checkoutOverviewPage = new CheckoutOverviewPage(page);
    await checkoutOverviewPage.finishButton.click();
    await expect(page).toHaveURL(EXPECTED_CHECKOUT_COMPLETE_CONSTANTS.PAGE_URL);
  });

  test("should navigate back to the cart when Cancel button is clicked", async ({ page }) => {
    const checkoutOverviewPage = new CheckoutOverviewPage(page);
    await checkoutOverviewPage.cancelButton.click();
    await expect(page).toHaveURL(EXPECTED_PRODUCTS_CONSTANTS.PAGE_URL);;
  });
});
