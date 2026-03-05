import { expect } from '@playwright/test';

import { expectSchema } from '../../../../src/api/assertions/expectSchema';
import { HTTP_STATUS } from '../../../../src/api/constants/http-status';
import { validateCommonResponse } from '../../../../src/api/contracts/validators/common-response.validator';
import { buildUser } from '../../../../src/api/data/user-factory';
import {
  mapToUpdateUserDto,
  validateAndMapUser,
} from '../../../../src/api/mappers/user.mapper';
import { expectUsersToBeEqual } from '../../../../src/common/assertions/user.assertions';
import { test } from '../../../../src/common/fixtures/user.fixture';

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
