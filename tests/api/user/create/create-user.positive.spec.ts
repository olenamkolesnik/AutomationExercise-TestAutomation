import { test, expect } from '../../../../src/api/fixtures/api';
import { buildUser } from '../../../../src/api/data/user-factory';
import { HTTP_STATUS } from '../../../../src/api/constants/http-status';
import { assertUserDetailsResponse } from '../../../../src/api/assertions/user-assert';
import { expectSchema } from '../../../../src/api/utils/schemaValidator';
import { commonResponseSchema } from '../../../../src/api/schemas/common-response.schema';

test.describe('Create User Positive Tests', () => {
  test('Should create user with valid required data', async ({
    userClient,
  }) => {
    const user = buildUser();

    const response = await userClient.createUser(user);

    expect(response.responseCode).toBe(HTTP_STATUS.CREATED);
    expect(typeof response.message).toBe('string');
    expect(response.message).toContain('User created!');
    expect(response.message).toBeTruthy();
    expect(response.data).toBeNull();
    expectSchema(response, commonResponseSchema);

    const retrieved = await userClient.getUserByEmail(user.email);
    expect(retrieved.responseCode).toBe(HTTP_STATUS.OK);
    assertUserDetailsResponse(retrieved.data);
    expect(retrieved.data.name).toBe(user.name);
    expect(retrieved.data.email).toBe(user.email);

    await userClient.deleteUserByEmailAndPassword(user.email, user.password);
  });
});
