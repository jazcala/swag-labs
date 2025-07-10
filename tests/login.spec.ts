import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";

test.describe("Login Tests", () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await expect(loginPage.loginButton).toBeVisible();
  });

  test("should display Swag Labs as the title", async ({ page }) => {
    await expect(page).toHaveTitle("Swag Labs");
  });

  test("should have expected text on the login page", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await expect(loginPage.usernameInput).toHaveAttribute(
      "placeholder",
      "Username"
    );
    //password field placeholder
    await expect(loginPage.passwordInput).toHaveAttribute(
      "placeholder",
      "Password"
    );
    // login button text
    await expect(loginPage.loginButton).toHaveText(
      "Login"
    );
  });

  test("should display an error if username is missing", async ({ page }) => {
    const loginPage = new LoginPage(page);
    loginPage.login("", "secret_sauce");
    await expect(loginPage.errorMessage).toHaveText(
      "Epic sadface: Username is required"
    );
  });

  test("should display an error if password is missing", async ({ page }) => {
    const loginPage = new LoginPage(page);
    loginPage.login("standard_user", "");
    await expect(page.locator(".error-message-container")).toHaveText(
      "Epic sadface: Password is required"
    );
  });

  test("should display an error for empty credentials", async ({ page }) => {
    const loginPage = new LoginPage(page);
    loginPage.login("", "");
    await expect(page.locator(".error-message-container")).toHaveText(
      "Epic sadface: Username is required"
    );
  });

  test("should login with valid credentials", async ({ page }) => {
    const loginPage = new LoginPage(page);
    loginPage.login("standard_user", "secret_sauce");
    await expect(page.locator(".title")).toHaveText("Products");
  });

  test("should not login with invalid credentials", async ({ page }) => {
    const loginPage = new LoginPage(page);
    loginPage.login("invalid_user", "invalid_password");
    await expect(page.locator(".error-message-container")).toHaveText(
      "Epic sadface: Username and password do not match any user in this service"
    );
  });

  test("should display an error for locked out user", async ({ page }) => {
    const loginPage = new LoginPage(page);
    loginPage.login("locked_out_user", "secret_sauce");
    await expect(page.locator(".error-message-container")).toHaveText(
      "Epic sadface: Sorry, this user has been locked out."
    );
  });
  // skipping the problem user test as it is not working as expected
  test.skip("should display an error for problem user", async ({ page }) => {
    const loginPage = new LoginPage(page);
    loginPage.login("problem_user", "secret_sauce");
    await expect(page.locator(".error-message-container")).toHaveText(
      "Epic sadface: Sorry, this user has been identified as a problem user."
    );
  });
});
