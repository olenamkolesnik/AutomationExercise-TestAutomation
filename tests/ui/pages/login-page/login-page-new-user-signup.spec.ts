import { expect, test } from '../../../../src/common/fixtures/api';
import { buildUser } from '../../../../src/api/data/user-factory';
import { CreateUserRequest } from '../../../../src/api/models/requests/create-user.request';
import { SignupFlow } from '../../../../src/ui/flows/signup.flow';
import { AccountCreatedPageAssert } from '../../../../src/ui/assertions/account-created-page.assert';
import { LoginPage } from '../../../../src/ui/pages/login-page';

test.describe('Login Page - New user signup', () => {
  let user: CreateUserRequest;

  test.beforeEach(async () => {
    user = buildUser();
  });

  test.afterEach(async ({ userClient }, testInfo) => {
    if (testInfo.status !== 'skipped') {
      await userClient.deleteUserByEmailAndPassword(user.email, user.password);
    }
  });

  test('should create a new account via signup flow', async ({ page }) => {
    const flow = new SignupFlow(page);
    const accountCreatedPage = await flow.createNewUser(user);

    await new AccountCreatedPageAssert(accountCreatedPage).successHeading();
  });

  test('should show validation error for empty form signup', async ({
      page,
    }) => {
      const loginPage = new LoginPage(page);
      await loginPage.navigateToLogin();
  
      await loginPage.submitLoginForm();
      const validation = await loginPage.getSignupEmailValidationState();
  
      expect(validation.isValid).toBe(false);
      expect(validation.isMissing).toBe(true);
      expect(validation.message.length).toBeGreaterThan(0);
      expect(await loginPage.isAt()).toBe(true);
    });    
});
