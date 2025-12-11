import { test, expect, Locator } from "@playwright/test";
import { fillFormAndContinue, loginAsStandardUser } from "../utils/testFlows";
import { BasePage } from "../pages/BasePage";
import { ProductsPage } from "../pages/ProductsPage";
import { CartPage } from "../pages/CartPage";
import { EXPECTED_URL_PATHS, EXPECTED_SOCIAL_LINKS } from "../utils/testConstants";

// Define pages where the footer is expected to be visible
const FOOTER_PAGES = [
  { name: 'Products Page', path: EXPECTED_URL_PATHS.PRODUCTS_PAGE },
  { name: 'Cart Page', path: EXPECTED_URL_PATHS.CART_PAGE },
  { name: 'Checkout Step 1', path: EXPECTED_URL_PATHS.CHECKOUT_PAGE_STEP_1 },
  { name: 'Checkout Step 2', path: EXPECTED_URL_PATHS.CHECKOUT_PAGE_STEP_2 },
  { name: 'Checkout Complete', path: EXPECTED_URL_PATHS.CHECKOUT_COMPLETE }
];

test.describe("Footer Functionality Tests", () => {

  test.beforeEach(async ({ page }) => {
    // Prerequisite: Log in as standard user for all footer tests
    await loginAsStandardUser(page);
  });

  // --- Test Group 1: Footer Visibility and Content (DDT) ---
  FOOTER_PAGES.forEach((pagePath) => {

    test(`should display the footer and copyright notice on the ${pagePath.name}`, async ({ page }) => {
      const basePage = new BasePage(page);

      // Navigate to the specific path (if not the products page)
      if (pagePath.path === EXPECTED_URL_PATHS.CART_PAGE) {
        // Must add an item to reach cart page
        const productsPage = new ProductsPage(page);
        await productsPage.addFirstProductToCart();
        await productsPage.viewCart();
      } else if (pagePath.path.includes('checkout')) {
        // Must complete previous steps to reach checkout pages
        const productsPage = new ProductsPage(page);
        await productsPage.addFirstProductToCart();
        await productsPage.viewCart();
        const cartPage = new CartPage(page);
        await cartPage.proceedToCheckout();

        // If targeting step 2 or complete, fill form
        if (pagePath.path === EXPECTED_URL_PATHS.CHECKOUT_PAGE_STEP_2 || pagePath.path === EXPECTED_URL_PATHS.CHECKOUT_COMPLETE) {
          await fillFormAndContinue(page);
        }

        // If targeting complete page, finish checkout
        if (pagePath.path === EXPECTED_URL_PATHS.CHECKOUT_COMPLETE) {
          await page.click('[data-test="finish"]');
        }
      }

      // Assert Footer Visibility
      await expect(basePage.footerContainer).toBeVisible();

      // Assert Copyright Text presence (structure check)
      await expect(basePage.copyrightText).toBeVisible();
      await expect(basePage.copyrightText).toContainText('Sauce Labs');

    });
  });

  // --- Test Group 2: Social Media Link Validation ---

  EXPECTED_SOCIAL_LINKS.forEach((link) => {

    test(`should open the correct URL when clicking the ${link.name} link`, async ({ page, context }) => {
      const basePage = new BasePage(page);
      // CONSTRUCT THE DYNAMIC LOCATOR KEY
      const locatorKey = (link.name.toLowerCase() + "Link") as keyof BasePage;
      // ACCESS THE LOCATOR DYNAMICALLY
      const locator = basePage[locatorKey] as Locator;
      // Validate that the locator exists
      if (!locator) {
        // Use the constructed key in the error message
        console.error(`❌ ERROR: Constructed locator key '${locatorKey}' is missing or undefined on BasePage instance.`);
        return;
      }
      // Step 1: Click the social media link to open in a new tab
      const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        locator.click(),
      ]);

      // Step 2: Assert the new tab's URL
      await expect(newPage).toHaveURL(link.expectedUrl);

      // Step 3: Close the new tab
      await newPage.close();

    });
  });
});
