import { test, expect } from "@playwright/test";
import { ProductsPage } from "../pages/ProductsPage";
import { loginAsStandardUser } from "../utils/testFlows";
import { TEST_PRODUCT_DATA } from "../utils/testData";
import { EXPECTED_BASE_CONSTANTS, EXPECTED_CART_CONSTANTS, EXPECTED_PRODUCTS_CONSTANTS } from "../utils/testConstants";

test.describe("Products Tests", () => {

  test.beforeEach(async ({ page }) => {
    await loginAsStandardUser(page);
    await expect(page).toHaveURL(EXPECTED_PRODUCTS_CONSTANTS.PAGE_URL);
  })

  // --- Structural Tests ---

  test("should have Swag Labs as logo", async ({ page }) => {
    const { siteTitle } = new ProductsPage(page);
    await expect(siteTitle).toBeVisible();
    await expect(siteTitle).toHaveText(EXPECTED_BASE_CONSTANTS.SITE_TITLE);
  });

  test("should display the products page title", async ({ page }) => {
    const { title } = new ProductsPage(page);
    await expect(title).toHaveText(EXPECTED_PRODUCTS_CONSTANTS.TITLE);
  });

  test("should display the correct number of products", async ({ page }) => {
    const { products } = new ProductsPage(page);
    const productCount = await products.count();
    expect(productCount).toBe(EXPECTED_PRODUCTS_CONSTANTS.PRODUCTS_COUNT);
  });

  // --- Functional Tests ---

  test("should display product details when product name is clicked", async ({ page }) => {
    const { id, name } = TEST_PRODUCT_DATA;
    const productUrl = `/inventory-item.html?id=${id}`;
    const productPage = new ProductsPage(page);
    await expect(productPage.products.first()).toBeVisible();
    await productPage.selectProduct(name);
    await expect(page).toHaveURL(productUrl);
  });

  test("should add first product to the cart and update badge", async ({ page }) => {
    const productPage = new ProductsPage(page);
    await expect(productPage.products.first()).toBeVisible();
    await productPage.addFirstProductToCart();
    const cartCount = await productPage.cartCount.textContent();
    // verifies that the cart count is updated to "1"
    expect(cartCount).toBe("1");
    const removeButton = await productPage.getFirstProductRemoveButton();
    // verifies that the button text has changed to "Remove"
    expect(await removeButton.textContent()).toBe(EXPECTED_PRODUCTS_CONSTANTS.REMOVE_BUTTON_TEXT);
  });

  test("should remove first product from the cart and clean badge", async ({ page }) => {
    const productPage = new ProductsPage(page);
    await expect(productPage.products.first()).toBeVisible();
    await productPage.addFirstProductToCart();
    const cartCount = await productPage.cartCount.textContent();
    expect(cartCount).toBe("1");
    const removeButton = await productPage.getFirstProductRemoveButton();
    await removeButton.click();
    const updatedCartCount = await productPage.cartCount.count();
    // verifies that the cart count is updated to ""
    expect(updatedCartCount).toBe(0);
    // verifies that the button text has changed back to "Add to cart"
    const addToCartButton = await productPage.getFirstProductAddToCartButton();
    expect(await addToCartButton.textContent()).toBe(EXPECTED_PRODUCTS_CONSTANTS.ADD_TO_CART_BUTTON_TEXT);
  });

  test("should navigate to the cart page", async ({ page }) => {
    const productPage = new ProductsPage(page);
    productPage.cartButton.click();
    await expect(page).toHaveURL(EXPECTED_CART_CONSTANTS.PAGE_URL);
  });

  // --- Sorting Tests ---

  test("should sort products by price low to high", async ({ page }) => {
    const productPage = new ProductsPage(page);
    await expect(productPage.products.first()).toBeVisible();
    await productPage.sortProductsByPriceLowToHigh();
    const productPrices = await productPage.getProductPrices();
    const sortedPrices = await productPage.sortPricesAscending();
    const firstProductPrice = await productPage.getFirstProductPrice();
    expect(firstProductPrice).toBe(sortedPrices[0]);
    expect(productPrices).toEqual(sortedPrices);
  });

  test("should sort products by price high to low", async ({ page }) => {
    const productPage = new ProductsPage(page);
    await expect(productPage.products.first()).toBeVisible();
    await productPage.sortProductsByPriceHighToLow();
    const productPrices = await productPage.getProductPrices();
    const sortedPrices = await productPage.sortPricesDescending();
    const firstProductPrice = await productPage.getFirstProductPrice();
    expect(firstProductPrice).toBe(sortedPrices[0]);
    expect(productPrices).toEqual(sortedPrices);
  });

  test("should sort products by name A to Z", async ({ page }) => {
    const productPage = new ProductsPage(page);
    await expect(productPage.products.first()).toBeVisible();
    await productPage.sortProductsByNameAtoZ();
    const firstProductName = await productPage.getFirstProductName();
    const productsName = await productPage.getProductsNames();
    const sortedNames = productsName.sort();
    expect(firstProductName).toBe(sortedNames[0]);
    expect(productsName).toEqual(sortedNames);
  });

  test("should sort products by name Z to A", async ({ page }) => {
    const productPage = new ProductsPage(page);
    await expect(productPage.products.first()).toBeVisible();
    await productPage.sortProductsByNameZtoA();
    const firstProductName = await productPage.getFirstProductName();
    const productsName = await productPage.getProductsNames();
    const sortedNames = productsName.sort((a, b) => b.localeCompare(a));
    expect(firstProductName).toBe(sortedNames[0]);
    expect(productsName).toEqual(sortedNames);
  });

});
