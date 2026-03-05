import { buildUser } from '../../api/data/user-factory';
import { mapToCreateUserDto } from '../../api/mappers/user.mapper';
import { User } from '../models/product/user.model';
import { test as base } from './api-clients.fixture';

export const test = base.extend<{
  testUser: User;
}>({
  testUser: async ({ userClient }, use) => {
    const user = buildUser();

    await userClient.createUser(mapToCreateUserDto(user));
    await use(user);
    await userClient.deleteUser({ email: user.email, password: user.password });
  },
});
