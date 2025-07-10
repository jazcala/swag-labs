import { Page, Locator } from '@playwright/test';
/**
 * CheckoutPage class represents the checkout page of the Swag Labs application.
 * It encapsulates the locators and actions related to the checkout functionality.
 */
export class CheckoutPage {
  readonly page: Page;
  readonly title: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly cancelButton: Locator;
  readonly errorMessage: Locator;
  readonly cartQuantity: Locator;

  //Expected elements values
  readonly expectedTitle: string = "Checkout: Your Information";
  readonly firstNamePlaceholder: string = "First Name";
  readonly lastNamePlaceholder: string = "Last Name";
  readonly postalCodePlaceholder: string = "Zip/Postal Code";
  readonly continueButtonText: string = "Continue";
  readonly cancelButtonText: string = "Cancel";
  // error messages
  readonly firstNameError: string = "Error: First Name is required";
  readonly lastNameError: string = "Error: Last Name is required";
  readonly postalCodeError: string = "Error: Postal Code is required";

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator('[data-test="title"]');
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test=continue]');
    this.cancelButton = page.locator('[data-test=cancel]');
    this.errorMessage = page.locator('[data-test="error"]');
    this.cartQuantity = page.locator('.shopping_cart_badge');
  }

  async fillCheckoutForm(firstName: string, lastName: string, postalCode: string): Promise<void> {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

}
