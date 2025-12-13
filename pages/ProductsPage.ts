import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * ProductsPage class represents the products page of the Swag Labs application.
 * It encapsulates the locators and actions related to the products functionality.
 */
export class ProductsPage extends BasePage {
  readonly title: Locator;
  readonly products: Locator;
  readonly cartCount: Locator;
  readonly sortByPriceDropdown: Locator;
  readonly productName: Locator;
  readonly productPrices: Locator;
  readonly removeButton: Locator;
  readonly addToCartButton: Locator;

  constructor(page: Page) {
    super(page);
    this.title = page.getByText('Products');
    this.products = page.locator('.inventory_item');
    this.cartCount = page.locator('.shopping_cart_badge');
    this.sortByPriceDropdown = page.getByTestId('product-sort-container');
    this.productName = page.locator('.inventory_item_name');
    this.productPrices = page.locator('.inventory_item_price');
    this.removeButton = page.getByRole('button', { name: 'Remove' });
    this.addToCartButton = page.getByRole('button', { name: 'Add to cart' });
  }

  async getProductContainer(productName?: string): Promise<Locator> {
    if (!productName) {
      return this.products.first();
    }
    return this.products.filter({ hasText: productName });
  }

  async selectProduct(productName?: string): Promise<void> {
    await (await this.getProductContainer(productName)).locator(this.productName).click();
  }

  async removeFirstProduct(): Promise<void> {
    await (await this.getProductContainer()).locator(this.removeButton).click();
  }


  /**
    * Add a product to the cart. If productName is not provided, adds the first  product.
    * @param productName
   */
  async addToCart(productName?: string): Promise<void> {
    await (await this.getProductContainer(productName)).locator(this.addToCartButton).click();
  }

  async getFirstProductName(): Promise<string> {
    return await (await this.getProductContainer()).locator('.inventory_item_name').textContent() || '';
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
    return prices.sort((a, b) => parseFloat(b) - parseFloat(a));
  }

  async getFirstProductPrice(): Promise<string> {
    const firstProductPrice = await this.products.first().locator('.inventory_item_price').textContent();
    return firstProductPrice ? firstProductPrice.replace('$', '').trim() : '';
  }

}
