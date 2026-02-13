import { test } from '../../../../src/common/fixtures/user.fixture';
import { LoginFlow } from '../../../../src/ui/flows/login.flow';
import { LoginPage } from '../../../../src/ui/pages/login-page';

test.describe('Login Page - login to account', () => {
  test('should login successfully with valid credentials', async ({
    page,
    testUser,
  }) => {
    const flow = new LoginFlow(page);
    const homePage = await flow.loginUser(testUser);

    await homePage.expectLoggedInAs(testUser.name);
    await homePage.expectLogoutVisible();
  });

  test('should show validation error for empty form submission', async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateToLogin();

    await loginPage.submitLoginForm();
    await loginPage.expectLoginSubmissionBlocked();
  });

  test('should show error message for invalid credentials', async ({
    page,
    testUser,
  }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateToLogin();
    await loginPage.fillAndSubmitLoginForm(testUser.email, 'wrongpassword');

    await loginPage.expectEmailOrPasswordIncorrectError();
  });
});
