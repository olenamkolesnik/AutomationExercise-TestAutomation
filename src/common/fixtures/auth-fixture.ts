import AuthClient from '../../api/clients/auth-client';
import { test as base } from './user-fixtures';
import { APIRequestContext } from '@playwright/test';

export const test = base.extend<{
  authenticatedRequest: APIRequestContext;
}>({
  // Authenticates request context via API login and provides session-bound request
  authenticatedRequest: async ({ request, testUser }, use) => {
    const auth = new AuthClient(request);
    await auth.login(testUser.email, testUser.password);

    await use(request);

    await auth.logout();
  },
});

export { expect } from '@playwright/test';
