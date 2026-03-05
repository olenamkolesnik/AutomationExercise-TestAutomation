import { test } from '../../../../src/common/fixtures/api-clients.fixture';
import { buildUser } from '../../../../src/api/data/user-factory';
import { HTTP_STATUS } from '../../../../src/api/constants/http-status';
import { expectSchema } from '../../../../src/api/assertions/expectSchema';
import { expectUsersToBeEqual } from '../../../../src/common/assertions/user.assertions';
import { expect } from '@playwright/test';
import { mapToCreateUserDto, validateAndMapUser } from '../../../../src/api/mappers/user.mapper';
import { validateCommonResponse } from '../../../../src/api/contracts/validators/common-response.validator';

test.describe('Create User Positive Tests', () => {
  let testUser: ReturnType<typeof buildUser>;

  test.beforeEach(() => {
    testUser = buildUser();
  });
  test.afterEach(async ({ userClient }) => {
    await userClient.deleteUser({
      email: testUser.email,
      password: testUser.password,
    });
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
