// src/fixtures/user-fixture.ts
import { test as base } from '@playwright/test';
import UserClient from '../clients/userClient';

export const test = base.extend<{
  userClient: UserClient;
  createdUsers: { email: string; password: string }[];
}>({
  userClient: async ({ request }, use) => {
    const client = new UserClient(request);
    await use(client);
  },

  createdUsers: async ({userClient}, use) => {
    const created: { email: string; password: string }[] = [];
    await use(created);        

    for (const user of created) {
      await userClient.deleteUserByEmailAndPassword(user.email, user.password);
    }
  },
});

export const expect = base.expect;
