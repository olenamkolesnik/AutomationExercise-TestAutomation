import { test as base } from '@playwright/test';
import UserClient from '../clients/userClient';
import { createUserRegistrationObject } from '../factories/create-user-registration-payload';
import { logger } from '../utils/logger';

type UserFixture = {
  user: ReturnType<typeof createUserRegistrationObject>;
};

export const userFixture = base.extend<UserFixture>({
  user: async ({ request }, use) => {
    //Create user before test
    const userClient = new UserClient(request);
    const user = createUserRegistrationObject();
    await userClient.createUser(user);

    //Provide user to the test
    await use(user);

    //Delete user after test
    try {
      await userClient.deleteUserByEmailAndPassword(user.email, user.password);
    } catch (error) {
      logger.warn(`Cleanup failed — user may not exist. Error: ${error}`);
    }
  },
});

export { expect } from '@playwright/test';
