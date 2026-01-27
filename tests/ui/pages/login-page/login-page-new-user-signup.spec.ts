import { test } from '../../../../src/api/fixtures/api';
import { buildUser } from '../../../../src/api/data/user-factory';
import { CreateUserRequest } from '../../../../src/api/models/requests/create-user.request';
import { SignupFlow } from '../../../../src/ui/flows/signup.flow';
import { AccountCreatedPageAssert } from '../../../../src/ui/assertions/account-created-page.assert';

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
});
