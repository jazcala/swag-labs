import { test, expect } from "@playwright/test";
import { ProductsPage } from "../pages/ProductsPage";
import { loginAsStandardUser } from "../utils/testFlows";
import { TEST_PRODUCT_DATA } from "../utils/testData";
import { EXPECTED_CART_CONSTANTS, EXPECTED_PRODUCTS_CONSTANTS, EXPECTED_URL_PATHS } from "../utils/testConstants";

test.describe("Products Tests", () => {

  test.beforeEach(async ({ page }) => {
    await loginAsStandardUser(page);
    await expect(page).toHaveURL(EXPECTED_PRODUCTS_CONSTANTS.PAGE_URL);
  });

  // --- Structural Tests ---

  test("should have Swag Labs as logo", async ({ page }) => {
    const { siteTitle } = new ProductsPage(page);
    await expect(siteTitle).toBeVisible();
  });

  test("should display the products page title", async ({ page }) => {
    const { title } = new ProductsPage(page);
    await expect(title).toBeVisible();
  });

  test("should display the correct number of products", async ({ page }) => {
    const { products } = new ProductsPage(page);
    const productCount = await products.count();
    expect(productCount).toBe(EXPECTED_PRODUCTS_CONSTANTS.PRODUCTS_COUNT);
  });

  // --- Functional Tests ---

  test("should display product details when product name is clicked", async ({ page }) => {
    const { id, name } = TEST_PRODUCT_DATA;
    const productUrl = `${EXPECTED_URL_PATHS.PRODUCT_DETAILS_PAGE}?id=${id}`;
    const productPage = new ProductsPage(page);
    await expect(productPage.products.first()).toBeVisible();
    await productPage.selectProduct(name);
    await expect(page).toHaveURL(productUrl);
  });

  test("should add first product to the cart and update badge", async ({ page }) => {
    const productPage = new ProductsPage(page);
    await expect(productPage.products.first()).toBeVisible();
    await productPage.addFirstProductToCart();
    expect(await productPage.getCartItemCount()).toBe(1);
    const firstProductContainer = await productPage.getProductContainer();
    expect(firstProductContainer.locator(productPage.removeButton)).toBeVisible();

  });

  test("should remove first product from the cart and clean badge", async ({ page }) => {
    const productPage = new ProductsPage(page);
    await expect(productPage.products.first()).toBeVisible();
    await productPage.addFirstProductToCart();
    expect(await productPage.getCartItemCount()).toBe(1);
    await productPage.removeFirstProduct();
    expect(await productPage.getCartItemCount()).toBe(0);
    const firstProductContainer = await productPage.getProductContainer();
    expect(firstProductContainer.locator(productPage.addToCartButton)).toBeVisible();
  });

  test("should navigate to the cart page", async ({ page }) => {
    const productPage = new ProductsPage(page);
    await productPage.viewCart();
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
