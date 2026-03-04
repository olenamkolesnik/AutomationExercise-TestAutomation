import { test } from '../../../../src/common/fixtures/index';

test.describe('Login Page - login to account', () => {
  test('should show validation error for empty form submission', async ({
    loginPage,
  }) => {
    await loginPage.navigateToLogin();

    await loginPage.submitLoginForm();
    await loginPage.expectLoginSubmissionBlocked();
  });

  test('should show error message for invalid credentials', async ({
    loginPage,
    testUser,
  }) => {
    await loginPage.navigateToLogin();
    await loginPage.fillLoginForm(testUser.email, 'wrongpassword');
    await loginPage.submitLoginForm();

    await loginPage.expectEmailOrPasswordIncorrectError();
  });
});
