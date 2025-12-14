import { Page } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { USERS, generateRandomUser } from "./testData";
import { ProductsPage } from "../pages/ProductsPage";
import { CheckoutPage } from "../pages/CheckoutPage";
import { CartPage } from "../pages/CartPage";
import { CheckoutOverviewPage } from "../pages/CheckoutOverviewPage";
import { EXPECTED_LOGIN_CONSTANTS } from "./testConstants";

/**
 * Helper function to perform login with given credentials.
 * @param page The Playwright Page object.
 * @param username The username for login.
 * @param password The password for login.
 */

async function login(page: Page, username: string, password: string): Promise<LoginPage> {
  const loginPage = new LoginPage(page);
  await loginPage.goto(EXPECTED_LOGIN_CONSTANTS.PAGE_URL);
  await loginPage.login(username, password);
  return loginPage;
}

/** --- LOGIN FLOWS ---
 * These functions encapsulate common login scenarios for reuse across tests.
 */
export async function loginAsStandardUser(page: Page): Promise<void> {
  await login(page, USERS.STANDARD_USER.username, USERS.STANDARD_USER.password);
}

export async function loginAsLockedOutUser(page: Page): Promise<LoginPage> {
  return await login(page, USERS.LOCKED_OUT_USER.username, USERS.LOCKED_OUT_USER.password);
}

/**
 * Helper function that sets up the environment for Checkout Form validation tests.
 * Steps: 1. Login. 2. Add item to cart. 3. Navigate to Checkout Step One page.
 * @param page The Playwright Page object.
 * @param productName The name of the product to add to the cart (defaults to standard test product).
 */
export async function setupForCheckoutFormTest(
  page: Page,
  productName?: string,
) {
  await loginAsStandardUser(page);
  const productsPage = new ProductsPage(page);
  const cartPage = new CartPage(page);
  // 1. Add a product to the cart using the passed variable
  await productsPage.addToCart(productName);
  // 2. Navigate to the cart
  await productsPage.viewCart();
  // 3. Proceed to checkout
  await cartPage.proceedToCheckout();
}

/**
 * --- CHECKOUT SUB-FLOW ---
 * Fills out the checkout form and clicks continue.
 * This is a sub-flow that coordinates data generation and two actions on one page.
 * @param page The Playwright Page object instance.
 */

export async function fillFormAndContinue(page: Page): Promise<void> {
  const checkoutPage = new CheckoutPage(page);
  const person = generateRandomUser();
  await checkoutPage.fillCheckoutForm(person.firstName, person.lastName, person.zipCode);
  await checkoutPage.continueToOverview();
}

/**
 * --- FULL PURCHASE SCENARIO SETUP ---
 * Completes the full flow up to the Checkout Complete page.
 * Used as a setup helper for tests validating the completion screen.
 * @param page The Playwright Page object instance.
 * @param productName? The name of the product to purchase is optional. If it's not privided use first option.
 */
export async function setupForCheckoutCompleteTest(page: Page, productName?: string): Promise<void> {
  await loginAsStandardUser(page);
  await setupForCheckoutFormTest(page, productName);
  const checkoutOverviewPage = new CheckoutOverviewPage(page);
  await fillFormAndContinue(page);
  await checkoutOverviewPage.completeCheckout();
}
