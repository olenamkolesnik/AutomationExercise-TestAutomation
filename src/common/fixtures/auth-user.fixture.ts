import { Page } from '@playwright/test';

import { test as base } from './user.fixture';

export const test = base.extend<{
  authPage: Page;
}>({
  authPage: async ({ browser, authClient, testUser, request }, use) => {
    await authClient.login(testUser.email, testUser.password);

    const storageState = await request.storageState();

    const context = await browser.newContext({ storageState });

    const page = await context.newPage();

    await use(page);

    await page.close();
    await context.close();
  },
});
