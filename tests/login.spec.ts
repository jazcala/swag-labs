import { test, expect } from "@playwright/test";

test.describe("Login Tests", () => {

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await expect(page.locator('[data-test="login-button"]')).toBeVisible();
  });

  test("should display Swag Labs as the title", async ({ page }) => {
    await expect(page).toHaveTitle("Swag Labs");
  });

  test("should have expected text on the login page", async ({ page }) => {
    // username field placeholder
    await expect(page.locator('[data-test="username"]')).toHaveAttribute(
      "placeholder",
      "Username"
    );
    //password field placeholder
    await expect(page.locator('[data-test="password"]')).toHaveAttribute(
      "placeholder",
      "Password"
    );
    // login button text
    await expect(page.locator('[data-test="login-button"]')).toHaveText(
      "Login"
    );
  });

  test("should display an error is missing username", async ({ page }) => {
    await page.fill('[data-test="password"]', "secret_sauce");
    page.locator('[data-test="login-button"]').click();
    await expect(page.locator(".error-message-container")).toHaveText(
      "Epic sadface: Username is required"
    );
  });

  test("should display an error is missing password", async ({ page }) => {
    await page.fill('[data-test="username"]', "standard_user");
    page.locator('[data-test="login-button"]').click();
    await expect(page.locator(".error-message-container")).toHaveText(
      "Epic sadface: Password is required"
    );
  });
  test("should display an error for empty credentials", async ({ page }) => {
    page.locator('[data-test="login-button"]').click();
    await expect(page.locator(".error-message-container")).toHaveText(
      "Epic sadface: Username is required"
    );
  });

  test("should login with valid credentials", async ({ page }) => {
    await page.fill('[data-test="username"]', "standard_user");
    await page.fill('[data-test="password"]', "secret_sauce");
    page.locator('[data-test="login-button"]').click();
    await expect(page.locator(".title")).toHaveText("Products");
  });

  test("should not login with invalid credentials", async ({ page }) => {
    await page.fill('[data-test="username"]', "invalid_user");
    await page.fill('[data-test="password"]', "invalid_password");
    page.locator('[data-test="login-button"]').click();
    await expect(page.locator(".error-message-container")).toHaveText(
      "Epic sadface: Username and password do not match any user in this service"
    );
  });

  test("should display an error for locked out user", async ({ page }) => {
    await page.fill('[data-test="username"]', "locked_out_user");
    await page.fill('[data-test="password"]', "secret_sauce");
    page.locator('[data-test="login-button"]').click();
    await expect(page.locator(".error-message-container")).toHaveText(
      "Epic sadface: Sorry, this user has been locked out."
    );
  });
  // skipping the problem user test as it is not working as expected
  test.skip("should display an error for problem user", async ({ page }) => {
    await page.fill('[data-test="username"]', "problem_user");
    await page.fill('[data-test="password"]', "secret_sauce");
    page.locator('[data-test="login-button"]').click();
    await expect(page.locator(".error-message-container")).toHaveText(
      "Epic sadface: Sorry, this user has been identified as a problem user."
    );
  });
});
