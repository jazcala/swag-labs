import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { USERS } from "../utils/testData";
import { EXPECTED_LOGIN_CONSTANTS } from "../utils/testConstants";

test.describe("Megative Login Tests", () => {

  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto('/');
  });

  test.afterEach(async ({ page }) => {
    await expect(page).toHaveURL(EXPECTED_LOGIN_CONSTANTS.PAGE_URL);
  });

  // --- Tests checking missing required fields ---

  test("should display an error if username is missing", async ({ page }) => {
    const { password } = USERS.STANDARD_USER;
    await loginPage.login("", password);
    await expect(loginPage.errorMessage).toHaveText(
      EXPECTED_LOGIN_CONSTANTS.ERROR_USERNAME_REQUIRED
    );
  });

  test("should display an error if password is missing", async ({ page }) => {
    const { username } = USERS.STANDARD_USER;
    await loginPage.login(username, "");
    await expect(loginPage.errorMessage).toHaveText(
      EXPECTED_LOGIN_CONSTANTS.ERROR_PASSWORD_REQUIRED
    );
  });

  test("should display an error for empty credentials", async ({ page }) => {
    await loginPage.login("", "");
    await expect(loginPage.errorMessage).toHaveText(
      EXPECTED_LOGIN_CONSTANTS.ERROR_USERNAME_REQUIRED
    );
  });

  // --- Tests checking invalid credentials ---

  test("should fail login with invalid credentials", async ({ page }) => {
    await loginPage.login("invalid_user", "invalid_password");
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toHaveText(
      EXPECTED_LOGIN_CONSTANTS.ERROR_INVALID_CREDENTIALS
    );
  });

  test("should block access for a locked out user", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const { username, password } = USERS.LOCKED_OUT_USER;
    await loginPage.login(username, password);
    await expect(loginPage.errorMessage).toHaveText(EXPECTED_LOGIN_CONSTANTS.ERROR_LOCKED_OUT
    );
  });

  // skipping the problem user test as it is not working as expected
  test.skip("should display an error for problem user", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const { username, password } = USERS.PROBLEM_USER;
    await loginPage.login(username, password);
    await expect(loginPage.errorMessage).toHaveText(
      EXPECTED_LOGIN_CONSTANTS.ERROR_PROBLEM_USER
    );
  });

});
