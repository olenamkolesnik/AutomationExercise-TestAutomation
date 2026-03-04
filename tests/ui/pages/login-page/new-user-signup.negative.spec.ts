import { test } from '../../../../src/common/fixtures/index';

test.describe('Login Page - New user signup', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigateToLogin();
  });

  test('should show validation error for empty form signup', async ({
    loginPage,
  }) => {
    await loginPage.submitSignupForm();
    await loginPage.expectSignupSubmissionBlocked();
  });

  test('should show error for existing email address', async ({
    loginPage,
    testUser,
  }) => {
    await loginPage.fillSignupForm(testUser.name, testUser.email);
    await loginPage.submitSignupForm();
    await loginPage.expectEmailAddressAlreadyExistsError();
  });
});
