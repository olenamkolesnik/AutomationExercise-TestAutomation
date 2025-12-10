import { test, expect } from '@playwright/test';
import UserClient from '../../src/api/clients/userClient';
import { createUserRegistrationObject } from '../../src/api/factories/create-user-registration-payload';
import { HTTP_STATUS } from '../../src/api/constants/http-status';
import { UserDTO } from '../../src/api/models/user-dto';
import { toFormPayload } from '../../src/api/utils/form-helper';
import { logger } from '../../src/api/utils/logger';

test.describe('Create User Positive Tests', () => {
  let userClient: UserClient;
  let user: ReturnType<typeof createUserRegistrationObject>;

  test.beforeEach(({ request }) => {
    userClient = new UserClient(request);
    user = createUserRegistrationObject();
  });

  test.afterEach(async () => {
    try {
      // Clean up - delete the created user
      await userClient.deleteUserByEmailAndPassword(user.email, user.password);
    } catch (error) {
      logger.warn(`Cleanup failed — user may not exist. Error: ${error}`);
    }
  });

  test('TC11-01 — Should create user with valid required data', async () => {    

    // Act - create user
    const response = await userClient.createUser(user);

    // Assert - verify user creation
    expect(response.responseCode).toBe(HTTP_STATUS.CREATED);
    expect(response.message).toContain('User created!');

    //Act - retrieve user to verify
    const retrieved = await userClient.getUserByEmail(user.email);

    // Assert - verify retrieved user data
    expect(retrieved.responseCode).toBe(HTTP_STATUS.OK);
    expect(retrieved.data).toBeTruthy();

    const retrievedUser = retrieved.data as UserDTO;
    expect(retrievedUser.name).toBe(user.name);
    expect(retrievedUser.email).toBe(user.email);
  });
});
