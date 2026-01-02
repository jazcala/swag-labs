import { test, expect } from '../fixtures/base-test';
import { USERS } from "../utils/testData";
import { EXPECTED_LOGIN_CONSTANTS } from "../utils/testConstants";

test.describe("Negative Login Tests", () => {

  // --- Tests checking missing required fields ---

  test("should display an error if username is missing", async ({ loginPageReady, page }) => {

    const { password } = USERS.STANDARD_USER;
    await loginPageReady.login("", password);
    await expect(loginPageReady.errorMessage).toHaveText(
      EXPECTED_LOGIN_CONSTANTS.ERROR_USERNAME_REQUIRED
    );
    await expect(page).toHaveURL(EXPECTED_LOGIN_CONSTANTS.PAGE_URL);

  });

  test("should display an error if password is missing", async ({ loginPageReady, page }) => {

    const { username } = USERS.STANDARD_USER;
    await loginPageReady.login(username, "");
    await expect(loginPageReady.errorMessage).toHaveText(
      EXPECTED_LOGIN_CONSTANTS.ERROR_PASSWORD_REQUIRED
    );
    await expect(page).toHaveURL(EXPECTED_LOGIN_CONSTANTS.PAGE_URL);

  });

  test("should display an error for empty credentials", async ({ loginPageReady, page }) => {

    await loginPageReady.login("", "");
    await expect(loginPageReady.errorMessage).toHaveText(
      EXPECTED_LOGIN_CONSTANTS.ERROR_USERNAME_REQUIRED
    );
    await expect(page).toHaveURL(EXPECTED_LOGIN_CONSTANTS.PAGE_URL);

  });

  // --- Tests checking invalid credentials ---

  test("should fail login with invalid credentials", async ({ loginPageReady, page }) => {

    await loginPageReady.login("invalid_user", "invalid_password");
    await expect(loginPageReady.errorMessage).toBeVisible();
    await expect(loginPageReady.errorMessage).toHaveText(
      EXPECTED_LOGIN_CONSTANTS.ERROR_INVALID_CREDENTIALS
    );
    await expect(page).toHaveURL(EXPECTED_LOGIN_CONSTANTS.PAGE_URL);

  });

  test("should block access for a locked out user", async ({ loginPageReady, page }) => {

    const { username, password } = USERS.LOCKED_OUT_USER;
    await loginPageReady.login(username, password);
    await expect(loginPageReady.errorMessage).toHaveText(EXPECTED_LOGIN_CONSTANTS.ERROR_LOCKED_OUT
    );
    await expect(page).toHaveURL(EXPECTED_LOGIN_CONSTANTS.PAGE_URL);

  });

  test.skip("should display an error for problem user", async ({ loginPageReady, page }) => {

    test.info().annotations.push({ type: 'issue', description: 'This is not working as expected' });
    const { username, password } = USERS.PROBLEM_USER;
    await loginPageReady.login(username, password);
    await expect(loginPageReady.errorMessage).toHaveText(
      EXPECTED_LOGIN_CONSTANTS.ERROR_PROBLEM_USER
    );
    await expect(page).toHaveURL(EXPECTED_LOGIN_CONSTANTS.PAGE_URL);

  });

});
