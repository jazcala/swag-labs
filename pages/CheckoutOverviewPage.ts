import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * CheckoutOverviewPage class represents the checkout overview page of the Swag Labs application.
 * It encapsulates the locators and actions related to the checkout overview functionality.
 */
export class CheckoutOverviewPage extends BasePage {
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
    this.finishButton = page.locator('[data-test="finish"]');
    this.cancelButton = page.locator('[data-test="cancel"]');
    this.paymentInfoTitle = page.locator('[data-test="payment-info-label"]');
    this.paymentInfoValue = page.locator('[data-test="payment-info-value"]');
    this.shippingInfoTitle = page.locator('[data-test="shipping-info-label"]');
    this.shippingInfoValue = page.locator('[data-test="shipping-info-value"]');
    this.totalTitle = page.locator('[data-test="total-info-label"]');
    this.itemTotalValue = page.locator('[data-test="total-label"]');
    this.itemSubTotalValue = page.locator('[data-test="subtotal-label"]');
    this.itemTaxValue = page.locator('[data-test="tax-label"]');
    this.itemQuantity = page.locator('[data-test="item-quantity"]');
    this.itemName = page.locator('[data-test="inventory-item-name"]');
    this.itemPrice = page.locator('[data-test="inventory-item-price"]');
    this.itemDescription = page.locator('[data-test="inventory-item-desc"]');
  }

  async completeCheckout(): Promise<void> {
    await this.finishButton.click();
  }

}
