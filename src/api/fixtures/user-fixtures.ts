import { buildUser } from '../data/user-factory';
import { UserDTO } from '../dto/user-dto';
import { test as base } from './api';

export const test = base.extend<{
  testUser: UserDTO;
}>({
  testUser: async ({ userClient }, use) => {
    const user = buildUser();

    await userClient.createUser(user);

    await use(user);

    // best practice: cleanup only if deletion did not happen during the test
    try {

      await userClient.deleteUserByEmailAndPassword(user.email, user.password);
    } catch {
      // ignore
    }
  }
});

export { expect } from '@playwright/test';
