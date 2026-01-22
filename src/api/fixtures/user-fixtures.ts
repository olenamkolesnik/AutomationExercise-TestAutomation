import { buildUser } from '../data/user-factory';
import { CreateUserRequest } from '../models/requests/create-user.request';
import { test as base } from './api';

export const test = base.extend<{
  testUser: CreateUserRequest;
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
