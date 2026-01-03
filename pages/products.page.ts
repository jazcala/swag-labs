import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

/**
 * ProductsPage class represents the products page of the Swag Labs application.
 * It encapsulates the locators and actions related to the products functionality.
 */
export class ProductsPage extends BasePage {
  readonly title: Locator;
  readonly products: Locator;
  readonly sortByPriceDropdown: Locator;
  readonly productName: Locator;
  readonly productPrices: Locator;
  readonly removeButton: Locator;
  readonly addToCartButton: Locator;

  constructor(page: Page) {
    super(page);
    this.title = page.getByText('Products');
    this.products = page.locator('.inventory_item');
    this.sortByPriceDropdown = page.getByTestId('product-sort-container');
    this.productName = page.locator('.inventory_item_name');
    this.productPrices = page.locator('.inventory_item_price');
    this.removeButton = page.getByRole('button', { name: 'Remove' });
    this.addToCartButton = page.getByRole('button', { name: 'Add to cart' });
  }

  // --- PRIVATE DATA HELPERS (The "Logic") ---

  private async getNumericPrices(): Promise<number[]> {
    const prices = await this.productPrices.allTextContents();

    return prices.map(price => parseFloat(price.replace('$', '').trim()));
  }

  private async getNames(): Promise<string[]> {
    return await this.productName.allTextContents();
  }

  // --- ACTIONS ---

  async getProductContainer(productName?: string): Promise<Locator> {
    return productName ? this.products.filter({ hasText: productName }) : this.products.first();
  }

  async selectProduct(productName?: string): Promise<void> {
    const container = await this.getProductContainer(productName);
    await container.locator(this.productName).click();
  }

  async addToCart(productName?: string): Promise<void> {
    const container = await this.getProductContainer(productName);
    await container.locator(this.addToCartButton).click();
  }
  // getCartItemCount is in base page

  async removeFirstProduct(): Promise<void> {
    const container = await this.getProductContainer();
    await container.locator(this.removeButton).click();
  }

  async getFirstProductName(): Promise<string> {
    const container = await this.getProductContainer();

    return await container.locator('.inventory_item_name').textContent() || '';
  }

  /** Checks if the 'Add to Cart' button is visible for a specific product */
  async isAddToCartVisible(productName?: string): Promise<boolean> {
    const container = await this.getProductContainer(productName);

    return await container.locator(this.addToCartButton).isVisible();
  }

  /** Checks if the 'Remove' button is visible for a specific product */
  async isRemoveButtonVisible(productName?: string): Promise<boolean> {
    const container = await this.getProductContainer(productName);

    return await container.locator(this.removeButton).isVisible();
  }

  //--- Sorting Methods ---

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

  //  --- VALIDATIONS ---

  async isSortedByNameAtoZ(): Promise<boolean> {
    const actual = await this.getNames();
    const expected = [...actual].sort();

    return JSON.stringify(actual) === JSON.stringify(expected);
  }

  async isSortedByNameZtoA(): Promise<boolean> {
    const actual = await this.getNames();
    const expected = [...actual].sort((a, b) => b.localeCompare(a));

    return JSON.stringify(actual) === JSON.stringify(expected);
  }

  async arePricesSortedAscending(): Promise<boolean> {
    const actual = await this.getNumericPrices();
    const expected = [...actual].sort((a, b) => a - b);

    return JSON.stringify(actual) === JSON.stringify(expected);
  }

  async arePricesSortedDescending(): Promise<boolean> {
    const actual = await this.getNumericPrices();
    const expected = [...actual].sort((a, b) => b - a);

    return JSON.stringify(actual) === JSON.stringify(expected);
  }

}
