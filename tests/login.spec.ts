import { test, expect } from '../fixtures/base-test';
import { loginAsStandardUser } from '../utils/test-flows';

test.describe('Login Tests', () => {

  test('should display Swag Labs as the title', async ({ loginPageReady }) => {
    await expect(loginPageReady.siteTitle).toBeVisible();
  });

  test('should login with valid credentials', async ({ loginPage, productsPage }) => {
    await loginAsStandardUser(loginPage);
    await expect(productsPage.title).toBeVisible();
  });

});
