import { test } from '../../../../src/common/fixtures/ui-pages.fixture';
import { buildUser } from '../../../../src/api/data/user-factory';

test.describe('Login Page - New user signup', () => {
  let user: ReturnType<typeof buildUser>;

  test.beforeEach(async () => {
    user = buildUser();
  });

  test.afterEach(async ({ userClient }) => {
    await userClient.deleteUser({ email: user.email, password: user.password });
  });

  test('should create a new account via signup flow', async ({ loginPage, signupPage, accountCreatedPage }) => { 
    await loginPage.navigateToLogin();
    await loginPage.fillSignupForm(user.firstName, user.email);
    await loginPage.submitSignupForm();

    await signupPage.fillSignupForm(user);
    await signupPage.submitSignupForm();

    await accountCreatedPage.expectAccountCreated();
  });
});
