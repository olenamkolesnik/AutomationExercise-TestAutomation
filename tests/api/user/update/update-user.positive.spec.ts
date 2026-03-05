import { test } from '../../../../src/common/fixtures/user.fixture';
import { HTTP_STATUS } from '../../../../src/api/constants/http-status';
import { expect } from '@playwright/test';
import { expectSchema } from '../../../../src/api/assertions/expectSchema';
import { validateCommonResponse } from '../../../../src/api/contracts/validators/common-response.validator';
import { expectUsersToBeEqual } from '../../../../src/common/assertions/user.assertions';
import {
  mapToUpdateUserDto,
  validateAndMapUser,
} from '../../../../src/api/mappers/user.mapper';
import { buildUser } from '../../../../src/api/data/user-factory';

test.describe('API: Update Account Positive Tests - Positive', () => {
  test('Update all updatable fields with valid data', async ({
    userClient,
    testUser,
  }) => {
    const updatedUser = buildUser({
      email: testUser.email,
      password: testUser.password,
    });

    const response = await userClient.updateUser(
      mapToUpdateUserDto(updatedUser),
    );

    expectSchema(response.rawBody, validateCommonResponse);
    expect(response.responseCode).toBe(HTTP_STATUS.OK);
    expect(response.message).toBe('User updated!');
    expect(response.data).toBeNull();

    const retrievedResponse = await userClient.getUserByEmail(testUser.email);
    const retrievedUser = validateAndMapUser(retrievedResponse.data);
    expectUsersToBeEqual(retrievedUser, updatedUser);
  });
});
