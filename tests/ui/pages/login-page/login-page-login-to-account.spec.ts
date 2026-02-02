import { test } from '../../../../src/common/fixtures/user-fixtures';
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

    await loginPage.expectInvalidCredentialsError();
  });

  /*UI – Login
✓ should login with valid credentials
✓ should show validation error for empty form
✓ should show error message for invalid credentials

API – Login
✓ login with valid credentials
✗ login with non-existing user
✗ login with incorrect password
✗ login with empty email
✗ login with empty password
✗ login with invalid email format
✗ login with locked user

*/
});
