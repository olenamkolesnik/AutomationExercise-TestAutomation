import { test } from '@playwright/test';
import UserClient from '../../src/api/clients/userClient';
import { createUserRegistrationObject } from '../../src/api/factories/create-user-registration-payload';
import { HTTP_STATUS } from '../../src/api/constants/http-status';
import { UserRegistrationModel } from '../../src/api/models/user-registration-model';
import { toFormPayload } from '../../src/api/utils/form-helper';

test.describe('Create User Positive Tests', () => {
  // Arrange
  let userClient: UserClient;
  const userObject = createUserRegistrationObject();
  const formPayload = toFormPayload(userObject);

  test.beforeEach(({ request }) => {
    userClient = new UserClient(request);
  });

  test.afterEach(async () => {
    // Clean up - delete the created user
    await userClient.deleteUserByEmailAndPassword(
      userObject.email,
      userObject.password
    );
  });

  test('Should create a new user successfully', async () => {
    // Act
    const response = await userClient.createUser(formPayload);

    // Assert
    test.expect(response.httpStatus).toBe(HTTP_STATUS.OK);
    test.expect(response.responseCode).toBe(HTTP_STATUS.CREATED);
    test.expect(response.message).toContain('User created!');

    const retrievedUser = await userClient.getUserByEmail(userObject.email);
    test.expect(retrievedUser.httpStatus).toBe(HTTP_STATUS.OK);
    test.expect(retrievedUser.responseCode).toBe(HTTP_STATUS.OK);
    test.expect(retrievedUser.data).not.toBeNull();
    const userData = retrievedUser.data as UserRegistrationModel;
    test.expect(userData.name).toBe(userObject.name);
    test.expect(userData.email).toBe(userObject.email);
  });
});
