// import { Page } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { USERS, generateRandomUser } from './test-data';
import { ProductsPage } from '../pages/products.page';
import { CheckoutPage } from '../pages/checkout.page';
import { CartPage } from '../pages/cart.page';
// import { CheckoutOverviewPage } from '../pages/checkout-overview.page';
// import { EXPECTED_LOGIN_CONSTANTS } from './testConstants';

/**
 * Helper function to perform login with given credentials.
 * @param page The Playwright Page object.
 * @param username The username for login.
 * @param password The password for login.
 */

async function login(loginPage: LoginPage, username: string, password: string): Promise<void> {
  await loginPage.navigate();
  await loginPage.login(username, password);
}

/** --- LOGIN FLOWS ---
 * These functions encapsulate common login scenarios for reuse across tests.
 */
export async function loginAsStandardUser(loginPage: LoginPage): Promise<void> {
  await login(loginPage, USERS.STANDARD_USER.username, USERS.STANDARD_USER.password);
}

export async function loginAsLockedOutUser(loginPage: LoginPage): Promise<void> {
  await login(loginPage, USERS.LOCKED_OUT_USER.username, USERS.LOCKED_OUT_USER.password);
}

/**
 * Helper function that sets up the environment for Checkout Form validation tests.
 * Steps: 1. Login. 2. Add item to cart. 3. Navigate to Checkout Step One page.
 * @param page The Playwright Page object.
 * @param productName The name of the product to add to the cart (defaults to standard test product).
 */
export async function setupForCheckoutForm(
  productsPage: ProductsPage,
  cartPage: CartPage,
  productName?: string,
): Promise<void> {
  await productsPage.addToCart(productName);
  await productsPage.viewCart();
  await cartPage.proceedToCheckout();
}

/**
 * --- CHECKOUT SUB-FLOW ---
 * Fills out the checkout form and clicks continue.
 * This is a sub-flow that coordinates data generation and two actions on one page.
 * @param page The Playwright Page object instance.
 */

export async function fillFormAndContinue(checkoutPage: CheckoutPage): Promise<void> {
  const person = generateRandomUser();
  await checkoutPage.fillCheckoutForm(person.firstName, person.lastName, person.zipCode);
  await checkoutPage.continueToOverview();
}
