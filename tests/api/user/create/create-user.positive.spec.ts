import { test, expect } from '../../../../src/api/fixtures/api';
import { buildUser } from '../../../../src/api/data/user-factory';
import { HTTP_STATUS } from '../../../../src/api/constants/http-status';
import { expectSchema } from '../../../../src/api/utils/schemaValidator';
import { commonResponseSchema } from '../../../../src/api/schemas/common-response.schema';
import { expectUsersToBeEqual } from '../../../../src/api/assertions/assert-users-are-equal';
import { UserDetailsResponse } from '../../../../src/api/models/responses/user-details.response';

test.describe('Create User Positive Tests', () => {
  test('Should create user with valid required data', async ({
    userClient,
  }) => {
    const user = buildUser();

    const response = await userClient.createUser(user);
    expectSchema(response, commonResponseSchema);
    expect(response.responseCode).toBe(HTTP_STATUS.CREATED);
    expect(response.message).toContain('User created!');
    expect(response.data).toBeNull();

    const retrieved = await userClient.getUserByEmail(user.email);
    const retrievedUser = retrieved.data as UserDetailsResponse;
    expectUsersToBeEqual(retrievedUser, user);

    await userClient.deleteUserByEmailAndPassword(user.email, user.password);
  });
});
