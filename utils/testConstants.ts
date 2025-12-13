/**
 * Contains expected text and data constants used across the test suite for assertions.
 * This ensures a single source of truth for UI strings.
 */

// -- INTERFACES for EXPECTED CONSTANTS --
/** Defines the expected structure for global text constants applicable to the entire site. */
export interface PAGE_URL_PATHS {
  LOGIN_PAGE: string;
  PRODUCTS_PAGE: string;
  PRODUCT_DETAILS_PAGE?: string;
  CART_PAGE: string;
  CHECKOUT_PAGE_STEP_1: string;
  CHECKOUT_PAGE_STEP_2: string;
  CHECKOUT_COMPLETE: string;
}

export interface SocialLink {
  name: string;
  expectedUrl: string;
}

export interface FooterConstants {
  EXPECTED_SOCIAL_LINKS: SocialLink[];
  COPYRIGHT_TEXT: string;
}

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
  PAGE_URL: string;
}

export interface ProductsPageExpectedConstants {
  PRODUCTS_COUNT: number;
  PAGE_URL: string;
}

export interface CartPageExpectedConstants {
  PAGE_URL: string;
  EMPTY_CART_MESSAGE: string;
}

interface CheckoutPageExpectedConstants {
  PAGE_URL: string;
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
  MESSAGE_TITLE: string;
  MESSAGE_DESCRIPTION: string;
  BACK_TO_HOME_BUTTON_TEXT: string;
}

// -- CONSTANTS OBJECTS --
//-- URL PATHS ---
export const EXPECTED_URL_PATHS: PAGE_URL_PATHS = {
  LOGIN_PAGE: '/',
  PRODUCTS_PAGE: '/inventory.html',
  PRODUCT_DETAILS_PAGE: '/inventory-item.html',
  CART_PAGE: '/cart.html',
  CHECKOUT_PAGE_STEP_1: '/checkout-step-one.html',
  CHECKOUT_PAGE_STEP_2: '/checkout-step-two.html',
  CHECKOUT_COMPLETE: '/checkout-complete.html',
};

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
  ERROR_PROBLEM_USER: "Epic sadface: Problem user",
  PAGE_URL: EXPECTED_URL_PATHS.LOGIN_PAGE,
};

// --- PRODUCTS PAGE EXPECTED CONSTANTS ---
export const EXPECTED_PRODUCTS_CONSTANTS: ProductsPageExpectedConstants = {
  PRODUCTS_COUNT: 6,
  PAGE_URL: EXPECTED_URL_PATHS.PRODUCTS_PAGE,
};

// --- CART PAGE EXPECTED CONSTANTS ---
export const EXPECTED_CART_CONSTANTS: CartPageExpectedConstants = {
  EMPTY_CART_MESSAGE: "Your cart is empty",
  PAGE_URL: EXPECTED_URL_PATHS.CART_PAGE,
};

// --- CHECKOUT PAGE EXPECTED CONSTANTS ---
export const EXPECTED_CHECKOUT_CONSTANTS: CheckoutPageExpectedConstants = {
  PAGE_URL: EXPECTED_URL_PATHS.CHECKOUT_PAGE_STEP_1,
  FIRST_NAME_ERROR: "Error: First Name is required",
  LAST_NAME_ERROR: "Error: Last Name is required",
  ZIP_CODE_ERROR: "Error: Postal Code is required",
};

// --- CHECKOUT OVERVIEW PAGE EXPECTED CONSTANTS ---
export const EXPECTED_CHECKOUT_OVERVIEW_CONSTANTS: CheckoutOverviewPageExpectedConstants = {
  TITLE: "Checkout: Overview",
  PAGE_URL: EXPECTED_URL_PATHS.CHECKOUT_PAGE_STEP_2,
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
  PAGE_URL: EXPECTED_URL_PATHS.CHECKOUT_COMPLETE,
  MESSAGE_TITLE: "Thank you for your order!",
  MESSAGE_DESCRIPTION: "Your order has been dispatched, and will arrive just as fast as the pony can get there!",
  BACK_TO_HOME_BUTTON_TEXT: "Back Home",
};

export const EXPECTED_SOCIAL_LINKS: SocialLink[] = [
  { name: 'Twitter', expectedUrl: 'https://x.com/saucelabs' },
  { name: 'Facebook', expectedUrl: 'https://www.facebook.com/saucelabs' },
  { name: 'LinkedIn', expectedUrl: 'https://www.linkedin.com/company/sauce-labs/' },
];

export const EXPECTED_FOOTER_CONSTANTS: FooterConstants = {
  EXPECTED_SOCIAL_LINKS: EXPECTED_SOCIAL_LINKS,
  COPYRIGHT_TEXT: "© 2025 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy"
}
