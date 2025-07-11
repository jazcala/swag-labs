import { test, expect } from "@playwright/test";
import { loginAsStandardUser, addProductByName, viewCart, proceedToCheckout, fillFormAndCheckout } from "../utils/testFlows";
import { CheckoutOverviewPage } from "../pages/CheckoutOverviewPage";
import { checkoutCompletePageUrl, productsPageUrl, testProduct, testCheckoutData } from "../utils/testData";


test.describe("Checkout Overview Tests", () => {

  test.beforeEach(async ({ page }) => {
    // Login to the application
    await loginAsStandardUser(page);
    // Add product to the cart,
    await addProductByName(page, testProduct.name);
    //  view cart
    await viewCart(page);
    // navigate to the checkout overview page
    await proceedToCheckout(page);
    // Complete the form and proceed to checkout overview
    await fillFormAndCheckout(page);
    await expect(page).toHaveURL("/checkout-step-two.html");
  });

  test("should display the correct title on checkout overview page", async ({ page }) => {
    const checkoutOverviewPage = new CheckoutOverviewPage(page);
    await expect(checkoutOverviewPage.title).toHaveText(checkoutOverviewPage.expectedTitle);
  });

  test("should have correct item list in the overview", async ({ page }) => {
    const checkoutOverviewPage = new CheckoutOverviewPage(page);
    await expect(checkoutOverviewPage.itemQuantity).toBeVisible();
    await expect(checkoutOverviewPage.itemQuantity).toHaveText("1");
    await expect(checkoutOverviewPage.itemName).toBeVisible();
    await expect(checkoutOverviewPage.itemName).toHaveText(testProduct.name);
    await expect(checkoutOverviewPage.itemPrice).toBeVisible();
    await expect(checkoutOverviewPage.itemPrice).toHaveText(`$${testProduct.price}`);
    await expect(checkoutOverviewPage.itemDescription).toBeVisible();
    await expect(checkoutOverviewPage.itemDescription).toHaveText(testProduct.description);
  });

  test("should have Payment Information section", async ({ page }) => {
    const checkoutOverviewPage = new CheckoutOverviewPage(page);
    await expect(checkoutOverviewPage.paymentInfoTitle).toBeVisible();
    await expect(checkoutOverviewPage.paymentInfoTitle).toHaveText(checkoutOverviewPage.expectedPaymentInfoTitle);
    await expect(checkoutOverviewPage.paymentInfoValue).toHaveText(testCheckoutData.card);
  });

  test("should have Shipping Information section", async ({ page }) => {
    const checkoutOverviewPage = new CheckoutOverviewPage(page);
    await expect(checkoutOverviewPage.shippingInfoTitle).toBeVisible();
    await expect(checkoutOverviewPage.shippingInfoTitle).toHaveText(checkoutOverviewPage.expectedShippingInfoTitle);
    await expect(checkoutOverviewPage.shippingInfoValue).toHaveText(testCheckoutData.shipping);
  });

  test("should have Price Total section", async ({ page }) => {
    const checkoutOverviewPage = new CheckoutOverviewPage(page);
    await expect(checkoutOverviewPage.totalTitle).toBeVisible();
    await expect(checkoutOverviewPage.totalTitle).toHaveText(checkoutOverviewPage.expectedTotalTitle);
    await expect(checkoutOverviewPage.itemSubTotalValue).toBeVisible();
    await expect(checkoutOverviewPage.itemSubTotalValue).toHaveText(`${checkoutOverviewPage.expectedSubtotalLabel}${testProduct.price}`);
    await expect(checkoutOverviewPage.itemTaxValue).toBeVisible();
    await expect(checkoutOverviewPage.itemTaxValue).toHaveText(`${checkoutOverviewPage.expectedTaxLabel}${testProduct.tax}`);
    await expect(checkoutOverviewPage.itemTotalValue).toBeVisible();
    await expect(checkoutOverviewPage.itemTotalValue).toBeVisible();
    await expect(checkoutOverviewPage.itemTotalValue).toHaveText(`${checkoutOverviewPage.expectedTotalLabel}${(parseFloat(testProduct.price) + parseFloat(testProduct.tax)).toFixed(2)}`);
  });

  test("should have Finish and Cancel buttons", async ({ page }) => {
    const checkoutOverviewPage = new CheckoutOverviewPage(page);
    expect(checkoutOverviewPage.finishButton).toBeVisible();
    expect(checkoutOverviewPage.finishButton).toHaveText(checkoutOverviewPage.expectedFinishButton);
    expect(checkoutOverviewPage.cancelButton).toBeVisible();
    expect(checkoutOverviewPage.cancelButton).toHaveText(checkoutOverviewPage.expectedCancelButton);
  });

  test("should navigate to the Finish page when Finish button is clicked", async ({ page }) => {
    const checkoutOverviewPage = new CheckoutOverviewPage(page);
    await checkoutOverviewPage.finishButton.click();
    await expect(page).toHaveURL(checkoutCompletePageUrl);
  });

  test("should navigate back to the cart when Cancel button is clicked", async ({ page }) => {
    const checkoutOverviewPage = new CheckoutOverviewPage(page);
    await checkoutOverviewPage.cancelButton.click();
    await expect(page).toHaveURL(productsPageUrl);;
  });
});
