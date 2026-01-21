import { test, expect } from '../../../../src/api/fixtures/api';
import { buildUser } from '../../../../src/api/data/user-factory';
import { HTTP_STATUS } from '../../../../src/api/constants/http-status';
import { assertUserDTO } from '../../../../src/api/assertions/user-assert';

test.describe('Create User Positive Tests', () => {
  test('Should create user with valid required data', async ({
    userClient,
  }) => {
    const user = buildUser();

    const response = await userClient.createUser(user);

    expect(response.responseCode).toBe(HTTP_STATUS.CREATED);
    expect(response.message).toContain('User created!');

    const retrieved = await userClient.getUserByEmail(user.email);
    expect(retrieved.responseCode).toBe(HTTP_STATUS.OK);
    assertUserDTO(retrieved.data);
    expect(retrieved.data.name).toBe(user.name);
    expect(retrieved.data.email).toBe(user.email);

    await userClient.deleteUserByEmailAndPassword(user.email, user.password);
  });
});
