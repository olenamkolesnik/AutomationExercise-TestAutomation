import { buildUser } from '../../api/data/user-factory';
import { CreateUserRequest } from '../../api/models/requests/create-user.request';
import { test as base } from './api-clients.fixture';

export const test = base.extend<{
  testUser: CreateUserRequest;
}>({
  testUser: async ({ userClient }, use) => {
    const user = buildUser();

    await userClient.createUser(user);
    await use(user);
    await userClient.deleteUser(user.email, user.password);
  },
});
