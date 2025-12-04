import { Page } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { USERS, generateRandomUser } from "./testData";
import { ProductsPage } from "../pages/ProductsPage";
import { CheckoutPage } from "../pages/CheckoutPage";
import { CartPage } from "../pages/CartPage";
import { CheckoutOverviewPage } from "../pages/CheckoutOverviewPage";

/**
 * --- AUTHENTICATION ---
 * Performs a login action for the standard user.
 * This helper encapsulates the common two-step login flow: navigation and login action.
 * @param page The Playwright Page object instance.
 */
export async function loginAsStandardUser(page: Page): Promise<void> {
  const loginPage = new LoginPage(page);
  await loginPage.goto('/');
  await loginPage.login(USERS.STANDARD_USER.username, USERS.STANDARD_USER.password);
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
 * --- FULL PURCHASE SCENARIO ---
 * Logs in, adds a specified product, and completes the full checkout flow.
 * This function demonstrates the ideal use of a helper: orchestrating multiple pages.
 * @param page The Playwright Page object instance.
 * @param productName The name of the product to purchase.
 */
export async function purchaseProductFlow(page: Page, productName: string): Promise<void> {
  await loginAsStandardUser(page);
  const productsPage = new ProductsPage(page);
  const cartPage = new CartPage(page);
  const checkoutOverviewPage = new CheckoutOverviewPage(page);
  await productsPage.addToCart(productName);
  await cartPage.proceedToCheckout();
  await fillFormAndContinue(page);
  await checkoutOverviewPage.completeCheckout();
}
