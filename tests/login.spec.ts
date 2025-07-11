import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { productsPageUrl, USERS } from "../utils/testData";

test.describe("Login Tests", () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await expect(loginPage.loginButton).toBeVisible();
  });

  test("should display Swag Labs as the title", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await expect(page).toHaveTitle(loginPage.expectedTitle);
  });

  test("should have expected text on the login page", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await expect(loginPage.usernameInput).toHaveAttribute(
      "placeholder",
      loginPage.expectedUsernamePlaceholder
    );
    //password field placeholder
    await expect(loginPage.passwordInput).toHaveAttribute(
      "placeholder",
      loginPage.expectedPasswordPlaceholder
    );
    // login button text
    await expect(loginPage.loginButton).toHaveText(
      loginPage.expectedLoginButtonText
    );
  });

  test("should display an error if username is missing", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const { password } = USERS.STANDARD_USER;
    loginPage.login("", password);
    await expect(loginPage.errorMessage).toHaveText(
      loginPage.expectedErrorMessageUsernameRequired
    );
  });

  test("should display an error if password is missing", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const { username } = USERS.STANDARD_USER;
    loginPage.login(username, "");
    await expect(page.locator(".error-message-container")).toHaveText(
      loginPage.expectedErrorMessagePasswordRequired
    );
  });

  test("should display an error for empty credentials", async ({ page }) => {
    const loginPage = new LoginPage(page);
    loginPage.login("", "");
    await expect(page.locator(".error-message-container")).toHaveText(
      loginPage.expectedErrorMessageUsernameRequired
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
      loginPage.expectedErrorMessageInvalidCredentials
    );
  });

  test("should display an error for locked out user", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const { username, password } = USERS.LOCKED_OUT_USER;
    loginPage.login(username, password);
    await expect(loginPage.errorMessage).toHaveText(loginPage.expectedErrorMessageLockedOut
    );
  });

  // skipping the problem user test as it is not working as expected
  test.skip("should display an error for problem user", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const { username, password } = USERS.PROBLEM_USER;
    loginPage.login(username, password);
    await expect(loginPage.errorMessage).toHaveText(
      loginPage.expectedErrorMessageProblemUser
    );
  });
});
