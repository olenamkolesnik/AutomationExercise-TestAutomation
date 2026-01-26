import { expect, test } from '@playwright/test';
import { LoginPage } from '../../../../src/ui/pages/login-page';

test.describe('Login Page Body- accessibility and visibility', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigateToLogin();
  });

  test('Should display login form elements', async () => {
    await expect(loginPage.loginForm).toBeVisible();
    await expect(loginPage.emailInputLoginForm).toBeVisible();
    await expect(loginPage.passwordInputLoginForm).toBeVisible();
    await expect(loginPage.loginButton).toBeVisible();
  });

  test('Should match accessibility contract for login form', async () => {
    await expect(loginPage.loginForm).toMatchAriaSnapshot(
      loginPage.loginFormAccessibilityContract(),
    );
  });

  test('Should display new user signup form elements', async () => {
    await expect(loginPage.signupForm).toBeVisible();
    await expect(loginPage.nameInputSignupForm).toBeVisible();
    await expect(loginPage.emailInputSignupForm).toBeVisible();
    await expect(loginPage.signupButton).toBeVisible();
  });

  test('Should match accessibility contract for new user signup form', async () => {
    await expect(loginPage.signupForm).toMatchAriaSnapshot(
      loginPage.newUserSignupAccessibilityContract(),
    );
  });
});
