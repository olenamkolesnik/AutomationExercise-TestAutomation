import { buildUser } from '../../api/data/user-factory';
import { CreateUserRequest } from '../../api/models/requests/create-user.request';
import { test as base } from './api';

export const test = base.extend<{
  testUser: CreateUserRequest;
}>({
  testUser: async ({ userClient }, use) => {
    const user = buildUser();

    await userClient.createUser(user);
    await use(user);
    await userClient.deleteUserByEmailAndPassword(user.email, user.password);
  },
});

export { expect } from '@playwright/test';
