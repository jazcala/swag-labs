import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { EXPECTED_BASE_CONSTANTS, EXPECTED_LOGIN_CONSTANTS, EXPECTED_PRODUCTS_CONSTANTS } from "../utils/testConstants";
import { USERS } from "../utils/testData";

test.describe("Login Tests", () => {

  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto('/');
    await expect(loginPage.loginButton).toBeVisible();
  });

  test("should display Swag Labs as the title", async ({ page }) => {
    await expect(page).toHaveTitle(EXPECTED_BASE_CONSTANTS.SITE_TITLE);
  });

  test("should have expected text on the login page", async ({ page }) => {
    await expect(loginPage.usernameInput).toHaveAttribute(
      "placeholder",
      EXPECTED_LOGIN_CONSTANTS.USERNAME_PLACEHOLDER
    );
    //password field placeholder
    await expect(loginPage.passwordInput).toHaveAttribute(
      "placeholder",
      EXPECTED_LOGIN_CONSTANTS.PASSWORD_PLACEHOLDER
    );
    // login button text
    await expect(loginPage.loginButton).toHaveText(
      EXPECTED_LOGIN_CONSTANTS.LOGIN_BUTTON_TEXT
    );
  });

  test("should login with valid credentials", async ({ page }) => {
    const { username, password } = USERS.STANDARD_USER;
    await loginPage.login(username, password);
    await expect(page.url()).toContain(EXPECTED_PRODUCTS_CONSTANTS.PAGE_URL);
  });

});
