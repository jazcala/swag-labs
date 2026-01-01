import { test, expect } from '../fixtures/base-test';
import {
  EXPECTED_SOCIAL_LINKS
} from "../utils/testConstants";


test.describe("Footer Functionality Tests", () => {

  // --- Footer visibility
  // for (const item of pageFixtures) {
  test("should display footer on Products Page", async ({ authenticatedPage }) => {
    await expect.soft(authenticatedPage.footerContainer).toBeVisible();
    await expect.soft(authenticatedPage.copyrightText).toContainText('Sauce Labs');
  });

  test("should display footer on Cart Page", async ({ cartPageReady }) => {
    await expect.soft(cartPageReady.footerContainer).toBeVisible();
  });

  test("should display footer on Checkout Info Page", async ({ checkoutReadyPage }) => {
    await expect.soft(checkoutReadyPage.footerContainer).toBeVisible();
  });

  test("should display footer on Checkout Overview Page", async ({ overviewReadyPage }) => {
    await expect.soft(overviewReadyPage.footerContainer).toBeVisible();
  });

  test("should display footer on Checkout Complete Page", async ({ checkoutCompleteReady }) => {
    await expect.soft(checkoutCompleteReady.footerContainer).toBeVisible();
  });

  // --- Social Media Link Validation (DDT)

  EXPECTED_SOCIAL_LINKS.forEach((link) => {

    test(`should open the correct URL when clicking the ${link.name} link`, async ({ authenticatedPage, context }) => {

      const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        authenticatedPage.clickSocialLink(link.name),
      ]);

      await expect(newPage).toHaveURL(new RegExp(link.expectedUrl));
      await newPage.close();

    });
  });

});
