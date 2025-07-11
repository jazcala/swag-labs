import { Page } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { USERS, generateRandomUser } from "./testData";
import { ProductsPage } from "../pages/ProductsPage";
import { CheckoutPage } from "../pages/CheckoutPage";
import { CartPage } from "../pages/CartPage";

/**
 * Performs a login action for the standard user.
 * This helper encapsulates the common login steps.
 * @param page The Playwright Page object instance.
 */
export async function loginAsStandardUser(page: Page): Promise<void> {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(USERS.STANDARD_USER.username, USERS.STANDARD_USER.password);
}

// ProductsPage related helper functions
export async function addProductByName(page: Page, productName: string): Promise<void> {
  const productsPage = new ProductsPage(page);
  await productsPage.addToCart(productName);
}

export async function addFirstProductToCart(page: Page): Promise<void> {
  // Assuming there's a method to add the first product to the cart
  // This is a placeholder for the actual implementation
  const productsPage = new ProductsPage(page);
  await productsPage.addFirstProductToCart();
}

export async function viewCart(page: Page): Promise<void> {
  const productsPage = new ProductsPage(page);
  await productsPage.cartButton.click();
}

export async function proceedToCheckout(page: Page): Promise<void> {
  const cartPage = new CartPage(page);
  await cartPage.checkoutButton.click();
}

export async function fillFormAndCheckout(page: Page): Promise<void> {
  const checkoutPage = new CheckoutPage(page);
  const person = generateRandomUser();
  await checkoutPage.fillCheckoutForm(person.firstName, person.lastName, person.zipCode);
  await checkoutPage.continueButton.click();
}
