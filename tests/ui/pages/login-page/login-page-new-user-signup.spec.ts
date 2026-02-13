import { test } from '../../../../src/common/fixtures/user.fixture';
import { buildUser } from '../../../../src/api/data/user-factory';
import { CreateUserRequest } from '../../../../src/api/models/requests/create-user.request';
import { SignupFlow } from '../../../../src/ui/flows/signup.flow';
import { LoginPage } from '../../../../src/ui/pages/login-page';

test.describe('Login Page - New user signup', () => {
  let user: CreateUserRequest;

  test.beforeEach(async () => {
    user = buildUser();
  });

  test.afterEach(async ({ userClient }) => {
    await userClient.deleteUserByEmailAndPassword(user.email, user.password);
  });

  test('should create a new account via signup flow', async ({ page }) => {
    const flow = new SignupFlow(page);
    const accountCreatedPage = await flow.createNewUser(user);

    await accountCreatedPage.expectAccountCreated();
  });

  test('should show validation error for empty form signup', async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateToLogin();

    await loginPage.submitSignupForm();
    await loginPage.expectSignupSubmissionBlocked();
  });

  test('should show error for existing email address', async ({
    page,
    testUser,
  }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateToLogin();

    await loginPage.fillAndSubmitSignupForm(testUser.name, testUser.email);
    await loginPage.expectEmailAddressAlreadyExistsError();
  });
});
