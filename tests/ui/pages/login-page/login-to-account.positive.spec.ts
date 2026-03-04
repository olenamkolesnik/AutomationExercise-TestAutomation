import { test } from '../../../../src/common/fixtures/index';

test.describe('Login Page - login to account', () => {
  test('should login successfully with valid credentials', async ({
    loginPage,
    homePage,
    testUser,
  }) => {
    await loginPage.navigateToLogin();
    await loginPage.fillLoginForm(testUser.email, testUser.password);
    await loginPage.submitLoginForm();

    await homePage.expectLoggedInAs(testUser.name);
    await homePage.expectLogoutVisible();
  });
});
