import { expect } from '@playwright/test';

import { expectSchema } from '../../../../src/api/assertions/expectSchema';
import { HTTP_STATUS } from '../../../../src/api/constants/http-status';
import { validateUserDetails } from '../../../../src/api/contracts/validators/user.validator';
import { validateAndMapUser } from '../../../../src/api/mappers/user.mapper';
import { expectUsersToBeEqual } from '../../../../src/common/assertions/user.assertions';
import { test } from '../../../../src/common/fixtures/user.fixture';

test.describe('API: Get User Detail By Email — Positive', () => {
  test('Should return user details for a valid registered email', async ({
    userClient,
    testUser,
  }) => {
    const response = await userClient.getUserByEmail(testUser.email);

    expectSchema(response, validateUserDetails);
    expect(response.responseCode).toBe(HTTP_STATUS.OK);
    expect(response.message).toBeUndefined();

    const retrievedUser = validateAndMapUser(response.data);
    expectUsersToBeEqual(retrievedUser, testUser);
  });
});
