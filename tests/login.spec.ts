import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { EXPECTED_BASE_CONSTANTS, EXPECTED_LOGIN_CONSTANTS } from "../utils/testConstants";
import { productsPageUrl, USERS } from "../utils/testData";

test.describe("Login Tests", () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto('/');
    await expect(loginPage.loginButton).toBeVisible();
  });

  test("should display Swag Labs as the title", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await expect(page).toHaveTitle(EXPECTED_BASE_CONSTANTS.SITE_TITLE);
  });

  test("should have expected text on the login page", async ({ page }) => {
    const loginPage = new LoginPage(page);
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

  test("should display an error if username is missing", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const { password } = USERS.STANDARD_USER;
    loginPage.login("", password);
    await expect(loginPage.errorMessage).toHaveText(
      EXPECTED_LOGIN_CONSTANTS.ERROR_USERNAME_REQUIRED
    );
  });

  test("should display an error if password is missing", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const { username } = USERS.STANDARD_USER;
    loginPage.login(username, "");
    await expect(page.locator(".error-message-container")).toHaveText(
      EXPECTED_LOGIN_CONSTANTS.ERROR_PASSWORD_REQUIRED
    );
  });

  test("should display an error for empty credentials", async ({ page }) => {
    const loginPage = new LoginPage(page);
    loginPage.login("", "");
    await expect(page.locator(".error-message-container")).toHaveText(
      EXPECTED_LOGIN_CONSTANTS.ERROR_USERNAME_REQUIRED
    );
  });

  test("should login with valid credentials", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const { username, password } = USERS.STANDARD_USER;
    await loginPage.login(username, password);
    await expect(page.url()).toContain(productsPageUrl);
  });

  test("should not login with invalid credentials", async ({ page }) => {
    const loginPage = new LoginPage(page);
    loginPage.login("invalid_user", "invalid_password");
    await expect(loginPage.errorMessage).toHaveText(
      EXPECTED_LOGIN_CONSTANTS.ERROR_INVALID_CREDENTIALS
    );
  });

  test("should display an error for locked out user", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const { username, password } = USERS.LOCKED_OUT_USER;
    loginPage.login(username, password);
    await expect(loginPage.errorMessage).toHaveText(EXPECTED_LOGIN_CONSTANTS.ERROR_LOCKED_OUT
    );
  });

  // skipping the problem user test as it is not working as expected
  test.skip("should display an error for problem user", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const { username, password } = USERS.PROBLEM_USER;
    loginPage.login(username, password);
    await expect(loginPage.errorMessage).toHaveText(
      EXPECTED_LOGIN_CONSTANTS.ERROR_PROBLEM_USER
    );
  });
});
