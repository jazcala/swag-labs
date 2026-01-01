import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import * as flows from '../utils/testFlows';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { CheckoutOverviewPage } from '../pages/CheckoutOverviewPage';
import { CheckoutCompletePage } from '../pages/CheckoutCompletePage';

type MyPageObjects = {
  loginPage: LoginPage;
  productsPage: ProductsPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  checkoutOverviewPage: CheckoutOverviewPage;
  checkoutCompletePage: CheckoutCompletePage;
  loginPageReady: LoginPage;
  authenticatedPage: ProductsPage;
  cartPageReady: CartPage;
  checkoutReadyPage: CheckoutPage;
  overviewReadyPage: CheckoutOverviewPage;
  checkoutCompleteReady: CheckoutCompletePage;

}

export const test = base.extend<MyPageObjects>({
  loginPage: async ({ page }, use) => { await use(new LoginPage(page)); },
  productsPage: async ({ page }, use) => { await use(new ProductsPage(page)); },
  cartPage: async ({ page }, use) => { await use(new CartPage(page)) },
  checkoutPage: async ({ page }, use) => { await use(new CheckoutPage(page)) },
  checkoutOverviewPage: async ({ page }, use) => { await use(new CheckoutOverviewPage(page)) },
  checkoutCompletePage: async ({ page }, use) => { await use(new CheckoutCompletePage(page)) },
  // STATE FIXTURE: Everything is ready for a Product test
  loginPageReady: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    loginPage.navigate();
    await use(new LoginPage(page));
  },
  authenticatedPage: async ({ loginPage, productsPage }, use) => {
    await flows.loginAsStandardUser(loginPage);
    use(productsPage);

  },
  // STATE FIXTURE: Everything is ready for a Checkout Form test
  cartPageReady: async ({ authenticatedPage, cartPage }, use) => {
    // 1. authenticatedPage is already at the Products Page
    await authenticatedPage.addToCart();
    await authenticatedPage.viewCart();

    await use(cartPage);
  },

  // This fixture DEPENDS on authenticatedPage to handle the login first
  checkoutReadyPage: async ({ authenticatedPage, cartPage, checkoutPage }, use) => {
    // authenticatedPage is already logged in
    await flows.setupForCheckoutForm(authenticatedPage, cartPage);
    await use(checkoutPage);
  },
  overviewReadyPage: async ({ checkoutReadyPage, checkoutOverviewPage }, use) => {
    await flows.fillFormAndContinue(checkoutReadyPage);
    await use(checkoutOverviewPage);
  },
  checkoutCompleteReady: async ({ overviewReadyPage, checkoutCompletePage }, use) => {
    await overviewReadyPage.completeCheckout();
    await use(checkoutCompletePage);
  }

})

export { expect } from '@playwright/test';
