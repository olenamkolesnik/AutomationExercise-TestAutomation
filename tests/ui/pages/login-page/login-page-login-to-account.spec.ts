import { test } from '../../../../src/api/fixtures/user-fixtures';
import { LoginFlow } from '../../../../src/ui/flows/login.flow';
import { HomePageAssert } from '../../../../src/ui/assertions/home-page.assert';

test.describe('Login Page - login to account', () => {
  test('should login successfully with valid credentials', async ({
    page, testUser,
  }) => {
    const flow = new LoginFlow(page);
    const homePage = await flow.loginUser(testUser);

    await new HomePageAssert(homePage).isLoggedIn(testUser.name);
  });
})