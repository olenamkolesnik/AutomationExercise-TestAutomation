import { test as base } from './api';

export const test = base.extend<{
  createdUsers: { email: string; password: string }[];
}>({
  createdUsers: async ({userClient}, use) => {
    const created: { email: string; password: string }[] = [];
    await use(created);        

    for (const user of created) {
      await userClient.deleteUserByEmailAndPassword(user.email, user.password);
    }
  },
});

export const expect = base.expect;
