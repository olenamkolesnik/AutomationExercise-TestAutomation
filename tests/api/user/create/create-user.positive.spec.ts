import { expect } from '@playwright/test';

import { expectSchema } from '../../../../src/api/assertions/expectSchema';
import { HTTP_STATUS } from '../../../../src/api/constants/http-status';
import { validateCommonResponse } from '../../../../src/api/contracts/validators/common-response.validator';
import { buildUser } from '../../../../src/api/data/user-factory';
import { mapToCreateUserDto, validateAndMapUser } from '../../../../src/api/mappers/user.mapper';
import { expectUsersToBeEqual } from '../../../../src/common/assertions/user.assertions';
import { test } from '../../../../src/common/fixtures/api-clients.fixture';
import { logger } from '../../../../src/common/utils/logger';

test.describe('Create User Positive Tests', () => {
  let testUser: ReturnType<typeof buildUser>;

  test.beforeEach(() => {
    testUser = buildUser();
  });
  test.afterEach(async ({ userClient }) => {
    try {
      await userClient.deleteUser({
        email: testUser.email,
        password: testUser.password,
      });
    } catch (error) {
      logger.error(`Error occurred while deleting user: ${error}`);
    }
  });

  test('Should create user with valid required data', async ({
    userClient,
  }) => {
    const response = await userClient.createUser(mapToCreateUserDto(testUser));

    expectSchema(response.rawBody, validateCommonResponse);
    expect(response.responseCode).toBe(HTTP_STATUS.CREATED);
    expect(response.message).toContain('User created!');
    expect(response.data).toBeNull();

    const retrievedResponse = await userClient.getUserByEmail(testUser.email);
    const retrievedUser = validateAndMapUser(retrievedResponse.data);
    expectUsersToBeEqual(retrievedUser, testUser);
  });
});
