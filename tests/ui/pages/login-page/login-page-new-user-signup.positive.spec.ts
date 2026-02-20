import { test } from '../../../../src/common/fixtures/ui-pages.fixture';
import { buildUser } from '../../../../src/api/data/user-factory';
import { CreateUserRequest } from '../../../../src/api/models/requests/create-user.request';

test.describe('Login Page - New user signup', () => {
  let user: CreateUserRequest;

  test.beforeEach(async () => {
    user = buildUser();
  });

  test.afterEach(async ({ userClient }) => {
    await userClient.deleteUserByEmailAndPassword(user.email, user.password);
  });

  test('should create a new account via signup flow', async ({ loginPage, signupPage, accountCreatedPage }) => { 
    await loginPage.navigateToLogin();
    await loginPage.fillSignupForm(user.name, user.email);
    await loginPage.submitSignupForm();

    await signupPage.fillSignupForm(user);
    await signupPage.submitSignupForm();

    await accountCreatedPage.expectAccountCreated();
  });
});
