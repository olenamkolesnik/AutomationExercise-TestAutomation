import { test as base } from './user.fixture';
import AuthClient from '../../api/clients/auth-client';
import { Page, request } from '@playwright/test';

export const test = base.extend<{
  authPage: Page;
}>({
  authPage: async ({ browser, testUser }, use) => {
    const apiContext = await request.newContext();
    const authClient = new AuthClient(apiContext);

    await authClient.login(testUser.email, testUser.password);

    const context = await browser.newContext({
      storageState: await apiContext.storageState(),
    });

    const page = await context.newPage();

    await use(page);

    await page.close();
    await context.close();
    await apiContext.dispose();
  },
});