import { test as base } from '@playwright/test';
import UserClient from '../clients/userClient';

export const test = base.extend<{ userClient: UserClient }>({
  userClient: async ({ request }, use) => {
    const client = new UserClient(request);
    await use(client);
  },
});

export const expect = base.expect;
