import { expect, test } from '../../../../src/common/fixtures/user-fixtures';
import { LoginFlow } from '../../../../src/ui/flows/login.flow';
import { HomePageAssert } from '../../../../src/ui/assertions/home-page.assert';
import { LoginPage } from '../../../../src/ui/pages/login-page';

test.describe('Login Page - login to account', () => {
  test('should login successfully with valid credentials', async ({
    page,
    testUser,
  }) => {
    const flow = new LoginFlow(page);
    const homePage = await flow.loginUser(testUser);

    await new HomePageAssert(homePage).isLoggedIn(testUser.name);
  });

  test('should show validation error for empty form submission', async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateToLogin();

    await loginPage.submitLoginForm();
    const validation = await loginPage.getLoginEmailValidationState();

    expect(validation.isValid).toBe(false);
    expect(validation.isMissing).toBe(true);
    expect(validation.message.length).toBeGreaterThan(0);
    expect(await loginPage.isAt()).toBe(true);
  });

  test('should show error message for invalid credentials', async ({
    page,
    testUser,
  }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateToLogin();
    await loginPage.fillAndSubmitLoginForm(testUser.email, 'wrongpassword');

    expect(await loginPage.hasInvalidCredentialsError()).toBe(true);
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
