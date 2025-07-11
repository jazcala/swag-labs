import { Page, Locator } from '@playwright/test';

/**
 * ProductsPage class represents the products page of the Swag Labs application.
 * It encapsulates the locators and actions related to the products functionality.
 */
export class ProductsPage {
  readonly page: Page;
  readonly logo: Locator;
  readonly title: Locator;
  readonly products: Locator;
  readonly cartCount: Locator;

  readonly sortByPriceDropdown: Locator;
  readonly productPrices: Locator;

  readonly cartButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logo = page.locator('.app_logo');
    this.title = page.locator('[data-test="title"]');
    this.products = page.locator('.inventory_item');
    this.cartCount = page.locator('.shopping_cart_badge');
    this.sortByPriceDropdown = page.locator('[data-test="product-sort-container"]');
    this.productPrices = page.locator('.inventory_item_price');
    this.cartButton = page.locator('.shopping_cart_link');
  }

  async selectProduct(productName: string): Promise<void> {
    const product = this.products.locator('.inventory_item_name', { hasText: productName });
    await product.click();
  }

  async addFirstProductToCart(): Promise<void> {
    const firstProduct = this.products.first();
    await firstProduct.locator('.btn_primary').click();
  }

  async addToCart(productName: string): Promise<void> {
    const productButtonItemLocator = productName.toLowerCase().split(' ').join('-');
    await this.page.locator(`[data-test="add-to-cart-${productButtonItemLocator}"]`).click();
  }

  async getAddToCartButton(productName: string): Promise<Locator> {
    const product = this.products.locator('.inventory_item_name', { hasText: productName });
    return product.locator('.btn_primary');
  }
  async getRemoveButton(productName: string): Promise<Locator> {
    const product = this.products.locator('.inventory_item_name', { hasText: productName });
    return product.locator('.btn_secondary');
  }

  async getFirstProductRemoveButton(): Promise<Locator> {
    const firstProduct = this.products.first();
    return firstProduct.locator('.btn_secondary');
  }

  async getFirstProductName(): Promise<String> {
    const firstProduct = this.products.first();
    const name = await firstProduct.locator('.inventory_item_name').textContent();
    return name || '';
  }

  async sortProductsByPriceLowToHigh(): Promise<void> {
    await this.sortByPriceDropdown.selectOption('lohi');
  }
  async sortProductsByPriceHighToLow(): Promise<void> {
    await this.sortByPriceDropdown.selectOption('hilo');
  }
  async sortProductsByNameAtoZ(): Promise<void> {
    await this.sortByPriceDropdown.selectOption('az');
  }
  async sortProductsByNameZtoA(): Promise<void> {
    await this.sortByPriceDropdown.selectOption('za');
  }

  async getProductPrices(): Promise<string[]> {
    const prices = await this.productPrices.allTextContents();
    return prices.map(price => price.replace('$', '').trim());
  }

  async getProductsNames(): Promise<string[]> {
    const productNames = await this.products.locator('.inventory_item_name').allTextContents();
    return productNames;
  }

  async sortPricesAscending(): Promise<string[]> {
    const prices = await this.getProductPrices();
    return prices.sort((a, b) => parseFloat(a) - parseFloat(b));
  }
  async sortPricesDescending(): Promise<string[]> {
    const prices = await this.getProductPrices();
    return prices.sort((a, b) => parseFloat(a) + parseFloat(b));
  }

  async getFirstProductPrice(): Promise<string> {
    const firstProductPrice = await this.products.first().locator('.inventory_item_price').textContent();
    return firstProductPrice ? firstProductPrice.replace('$', '').trim() : '';
  }
}
