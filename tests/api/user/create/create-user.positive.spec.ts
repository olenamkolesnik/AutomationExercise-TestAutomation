import { test} from '../../../../src/common/fixtures/api-clients.fixture';
import { buildUser } from '../../../../src/api/data/user-factory';
import { HTTP_STATUS } from '../../../../src/api/constants/http-status';
import { expectSchema } from '../../../../src/api/utils/schemaValidator';
import { commonResponseSchema } from '../../../../src/api/schemas/common-response.schema';
import { expectUsersToBeEqual } from '../../../../src/api/assertions/assert-users-are-equal';
import { UserDetailsResponse } from '../../../../src/api/models/responses/user-details.response';
import { expect } from '@playwright/test';

test.describe('Create User Positive Tests', () => {
  let testUser: ReturnType<typeof buildUser>;

  test.beforeEach(() => {
    testUser = buildUser();
  });
  test.afterEach(async ({ userClient }) => {
    await userClient.deleteUserByEmailAndPassword(testUser.email, testUser.password);
  });

  test('Should create user with valid required data', async ({
    userClient,
  }) => {
    const response = await userClient.createUser(testUser);

    expectSchema(response, commonResponseSchema);
    expect(response.responseCode).toBe(HTTP_STATUS.CREATED);
    expect(response.message).toContain('User created!');
    expect(response.data).toBeNull();

    const retrieved = await userClient.getUserByEmail(testUser.email);
    const retrievedUser = retrieved.data as UserDetailsResponse;
    expectUsersToBeEqual(retrievedUser, testUser);
  });
});
