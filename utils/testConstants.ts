/**
 * Contains expected text and data constants used across the test suite for assertions.
 * This ensures a single source of truth for UI strings.
 */

// -- INTERFACES for EXPECTED CONSTANTS --
/** Defines the expected structure for global text constants applicable to the entire site. */
export interface BaseConstants {
  SITE_TITLE: string;
}

export interface LoginPageExpectedConstants {
  USERNAME_PLACEHOLDER: string;
  PASSWORD_PLACEHOLDER: string;
  LOGIN_BUTTON_TEXT: string;
  ERROR_USERNAME_REQUIRED: string;
  ERROR_PASSWORD_REQUIRED: string;
  ERROR_INVALID_CREDENTIALS: string;
  ERROR_LOCKED_OUT: string;
  ERROR_PROBLEM_USER: string;
}

export interface ProductsPageExpectedConstants {
  TITLE: string;
  PRODUCTS_COUNT: number;
  PAGE_URL: string;
  REMOVE_BUTTON_TEXT: string;
}

export interface CartPageExpectedConstants {
  TITLE: string;
  PAGE_URL: string;
  EMPTY_CART_MESSAGE: string;
  QTY_LABEL: string;
  DESCRIPTION_LABEL: string;
  CHECKOUT_BUTTON_TEXT: string;
  CONTINUE_SHOPPING_BUTTON_TEXT: string;
}

interface CheckoutPageExpectedConstants {
  TITLE: string;
  PAGE_URL: string;
  FIRST_NAME_PLACEHOLDER: string;
  LAST_NAME_PLACEHOLDER: string;
  ZIP_CODE_PLACEHOLDER: string;
  CONTINUE_BUTTON_TEXT: string;
  CANCEL_BUTTON_TEXT: string;
  FIRST_NAME_ERROR: string;
  LAST_NAME_ERROR: string;
  ZIP_CODE_ERROR: string;
}

interface CheckoutOverviewPageExpectedConstants {
  TITLE: string;
  PAGE_URL: string;
  PAYMENT_INFO_TITLE: string;
  SHIPPING_INFO_TITLE: string;
  TOTAL_TITLE: string;
  FINISH_BUTTON_TEXT: string;
  CANCEL_BUTTON_TEXT: string;
  SUBTOTAL_LABEL: string;
  TAX_LABEL: string;
  TOTAL_LABEL: string;
}

interface CheckoutCompletePageExpectedConstants {
  TITLE: string;
  PAGE_URL: string;
}

// -- CONSTANTS OBJECTS --
// --- BASE PAGE EXPECTED CONSTANTS ---
export const EXPECTED_BASE_CONSTANTS: BaseConstants = {
  SITE_TITLE: "Swag Labs",
};

// --- LOGIN PAGE EXPECTED CONSTANTS ---
export const EXPECTED_LOGIN_CONSTANTS = {
  USERNAME_PLACEHOLDER: "Username",
  PASSWORD_PLACEHOLDER: "Password",
  LOGIN_BUTTON_TEXT: "Login",
  ERROR_USERNAME_REQUIRED: "Epic sadface: Username is required",
  ERROR_PASSWORD_REQUIRED: "Epic sadface: Password is required",
  ERROR_INVALID_CREDENTIALS: "Epic sadface: Username and password do not match any user in this service",
  ERROR_LOCKED_OUT: "Epic sadface: Sorry, this user has been locked out.",
  ERROR_PROBLEM_USER: "Epic sadface: Problem user"
};

// --- PRODUCTS PAGE EXPECTED CONSTANTS ---
export const EXPECTED_PRODUCTS_CONSTANTS: ProductsPageExpectedConstants = {
  TITLE: "Products",
  PRODUCTS_COUNT: 6,
  PAGE_URL: "/inventory.html",
  REMOVE_BUTTON_TEXT: "Remove",
};

// --- CART PAGE EXPECTED CONSTANTS ---
export const EXPECTED_CART_CONSTANTS: CartPageExpectedConstants = {
  TITLE: "Your Cart",
  EMPTY_CART_MESSAGE: "Your cart is empty",
  PAGE_URL: "/cart.html",
  QTY_LABEL: "QTY",
  DESCRIPTION_LABEL: "Description",
  CHECKOUT_BUTTON_TEXT: "Checkout",
  CONTINUE_SHOPPING_BUTTON_TEXT: "Continue Shopping",
};

// --- CHECKOUT PAGE EXPECTED CONSTANTS ---
export const EXPECTED_CHECKOUT_CONSTANTS: CheckoutPageExpectedConstants = {
  TITLE: "Checkout: Your Information",
  PAGE_URL: "/checkout-step-one.html",
  FIRST_NAME_PLACEHOLDER: "First Name",
  LAST_NAME_PLACEHOLDER: "Last Name",
  ZIP_CODE_PLACEHOLDER: "Zip/Postal Code",
  CONTINUE_BUTTON_TEXT: "Continue",
  CANCEL_BUTTON_TEXT: "Cancel",
  FIRST_NAME_ERROR: "Error: First Name is required",
  LAST_NAME_ERROR: "Error: Last Name is required",
  ZIP_CODE_ERROR: "Error: Postal Code is required",
};

// --- CHECKOUT OVERVIEW PAGE EXPECTED CONSTANTS ---
export const EXPECTED_CHECKOUT_OVERVIEW_CONSTANTS: CheckoutOverviewPageExpectedConstants = {
  TITLE: "Checkout: Overview",
  PAGE_URL: "/checkout-step-two.html",
  PAYMENT_INFO_TITLE: "Payment Information:",
  SHIPPING_INFO_TITLE: "Shipping Information:",
  TOTAL_TITLE: "Price Total",
  FINISH_BUTTON_TEXT: "Finish",
  CANCEL_BUTTON_TEXT: "Cancel",
  SUBTOTAL_LABEL: "Item total: $",
  TAX_LABEL: "Tax: $",
  TOTAL_LABEL: "Total: $"
};

// --- CHECKOUT COMPLETE PAGE EXPECTED CONSTANTS ---
export const EXPECTED_CHECKOUT_COMPLETE_CONSTANTS: CheckoutCompletePageExpectedConstants = {
  TITLE: "Checkout: Complete!",
  PAGE_URL: "/checkout-complete.html",
};
