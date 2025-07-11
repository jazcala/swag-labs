import { Page } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { USERS } from "./testData";

/**
 * Performs a login action for the standard user.
 * This helper encapsulates the common login steps.
 * @param page The Playwright Page object instance.
 */
export async function loginAsStandardUser(page: Page): Promise<void> {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(USERS.STANDARD_USER.username, USERS.STANDARD_USER.password);
}
