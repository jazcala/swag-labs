import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

/**
 * CheckoutOverviewPage class represents the checkout overview page of the Swag Labs application.
 * It encapsulates the locators and actions related to the checkout overview functionality.
 */
export class CheckoutOverviewPage extends BasePage {
  readonly title: Locator;
  readonly finishButton: Locator;
  readonly cancelButton: Locator;
  readonly paymentInfoTitle: Locator;
  readonly paymentInfoValue: Locator;
  readonly shippingInfoTitle: Locator;
  readonly shippingInfoValue: Locator;
  readonly totalTitle: Locator;
  readonly itemQuantity: Locator;
  readonly itemName: Locator;
  readonly itemPrice: Locator;
  readonly itemDescription: Locator;
  readonly itemTotalValue: Locator;
  readonly itemSubTotalValue: Locator;
  readonly itemTaxValue: Locator;

  constructor(page: Page) {
    super(page);
    this.title = page.getByText('Checkout: Overview');
    this.finishButton = page.getByRole('button', { name: 'Finish' });
    this.cancelButton = page.getByRole('button', { name: 'Cancel' });
    this.paymentInfoTitle = page.getByText('Payment Information:');
    this.paymentInfoValue = page.getByTestId('payment-info-value');
    this.shippingInfoTitle = page.getByText('Shipping Information:');
    this.shippingInfoValue = page.getByTestId('shipping-info-value');
    this.totalTitle = page.getByText('Price Total');
    this.itemTotalValue = page.getByTestId('total-label');
    this.itemSubTotalValue = page.getByTestId('subtotal-label');
    this.itemTaxValue = page.getByTestId('tax-label');
    this.itemQuantity = page.getByTestId('item-quantity');
    this.itemName = page.getByTestId('inventory-item-name');
    this.itemPrice = page.getByTestId('inventory-item-price');
    this.itemDescription = page.getByTestId('inventory-item-desc');
  }

  async completeCheckout(): Promise<void> {
    await this.finishButton.click();
  }

  async cancelCheckout(): Promise<void> {
    await this.cancelButton.click();
  }
}
