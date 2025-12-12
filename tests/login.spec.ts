import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { EXPECTED_BASE_CONSTANTS, EXPECTED_LOGIN_CONSTANTS, EXPECTED_PRODUCTS_CONSTANTS } from "../utils/testConstants";
import { USERS } from "../utils/testData";

test.describe("Login Tests", () => {

  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto('/');
  });

  test("should display Swag Labs as the title", async ({ page }) => {
    await expect(page).toHaveTitle(EXPECTED_BASE_CONSTANTS.SITE_TITLE);
  });

  test("should login with valid credentials", async ({ page }) => {
    const { username, password } = USERS.STANDARD_USER;
    await loginPage.login(username, password);
    await expect(page).toHaveURL(EXPECTED_PRODUCTS_CONSTANTS.PAGE_URL);
  });

});
