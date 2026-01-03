import { test, expect } from '../fixtures/base-test';
import { TEST_PRODUCT_DATA } from '../utils/test-data';
import { EXPECTED_PRODUCTS_CONSTANTS, EXPECTED_URL_PATHS } from '../utils/test-constants';

test.describe('Products Tests', () => {

  // --- Structural Tests ---
  // Using authenticatedPage means we start every test already logged in

  test('should have Swag Labs as logo', async ({ authenticatedPage }) => {
    await expect(authenticatedPage.siteTitle).toBeVisible();
  });

  test('should display the products page title', async ({ authenticatedPage }) => {
    await expect(authenticatedPage.title).toBeVisible();
  });

  test('should display the correct number of products', async ({ authenticatedPage }) => {
    const productCount = await authenticatedPage.products.count();
    expect(productCount).toBe(EXPECTED_PRODUCTS_CONSTANTS.PRODUCTS_COUNT);
  });

  // --- Functional Tests ---

  test('should display product details when product name is clicked', async ({ authenticatedPage, page }) => {
    const { id, name } = TEST_PRODUCT_DATA;
    const productUrl = `${EXPECTED_URL_PATHS.PRODUCT_DETAILS_PAGE}?id=${id}`;

    await authenticatedPage.selectProduct(name);
    await expect(page).toHaveURL(productUrl);
  });

  test('should add first product to the cart and update badge', async ({ authenticatedPage }) => {
    await authenticatedPage.addToCart();
    await expect(authenticatedPage.cartCount).toHaveText('1');
    expect(await authenticatedPage.isRemoveButtonVisible()).toBe(true);

  });

  test('should remove first product from the cart and clean badge', async ({ authenticatedPage }) => {
    await authenticatedPage.addToCart();
    await expect(authenticatedPage.cartCount).toHaveText('1');

    await authenticatedPage.removeFirstProduct();

    await expect(authenticatedPage.cartCount).toBeHidden();

    expect(await authenticatedPage.isAddToCartVisible()).toBe(true);
    expect(await authenticatedPage.isRemoveButtonVisible()).toBe(false);
  });

  test('should navigate to the cart page', async ({ authenticatedPage, page }) => {
    await authenticatedPage.viewCart();
    await expect(page).toHaveURL(EXPECTED_URL_PATHS.CART_PAGE);
  });

  // --- Sorting Tests ---

  test('should sort products by price low to high', async ({ authenticatedPage }) => {
    await authenticatedPage.sortProductsByPriceLowToHigh();
    expect(await authenticatedPage.arePricesSortedAscending()).toBe(true);
  });

  test('should sort products by price high to low', async ({ authenticatedPage }) => {
    await authenticatedPage.sortProductsByPriceHighToLow();
    expect(await authenticatedPage.arePricesSortedDescending()).toBe(true);
  });

  test('should sort products by name A to Z', async ({ authenticatedPage }) => {
    await authenticatedPage.sortProductsByNameAtoZ();
    expect(await authenticatedPage.isSortedByNameAtoZ()).toBe(true);
  });

  test('should sort products by name Z to A', async ({ authenticatedPage }) => {
    await authenticatedPage.sortProductsByNameZtoA();
    expect(await authenticatedPage.isSortedByNameZtoA()).toBe(true);
  });

});
