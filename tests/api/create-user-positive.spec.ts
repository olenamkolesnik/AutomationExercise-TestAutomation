import { test } from '@playwright/test';
import UserClient from '../../src/api/clients/userClient';
import { createUserRegistrationObject } from '../../src/api/factories/create-user-registration-payload';
import { HTTP_STATUS } from '../../src/api/constants/http-status';
import { CreateUserRequest } from '../../src/api/models/create-user-request';
import { toFormPayload } from '../../src/api/utils/form-helper';

test.describe('Create User Positive Tests', () => {
  // Arrange
  let userClient: UserClient;
  const user = createUserRegistrationObject();
  const formPayload = toFormPayload(user);

  test.beforeEach(({ request }) => {
    userClient = new UserClient(request);
  });

  test.afterEach(async () => {
    // Clean up - delete the created user
    await userClient.deleteUserByEmailAndPassword(
      user.email,
      user.password
    );
  });

  test('Should create a new user successfully', async () => {
    // Act
    const response = await userClient.createUser(formPayload);

    // Assert
    test.expect(response.responseCode).toBe(HTTP_STATUS.CREATED);
    test.expect(response.message).toContain('User created!');

    const retrievedUser = await userClient.getUserByEmail(user.email);
    test.expect(retrievedUser.responseCode).toBe(HTTP_STATUS.OK);

    const userData = retrievedUser.data as CreateUserRequest;
    test.expect(userData.name).toBe(user.name);
    test.expect(userData.email).toBe(user.email);
  });
});
