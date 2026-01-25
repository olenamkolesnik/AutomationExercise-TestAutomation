import { expect } from '@playwright/test';
import { assertUserDetailsResponse } from '../../../../src/api/assertions/assert-user-details-response';
import { HTTP_STATUS } from '../../../../src/api/constants/http-status';
import { test } from '../../../../src/api/fixtures/user-fixtures';
import { getUserResponseSchema } from '../../../../src/api/schemas/get-user.response.schema';
import { expectSchema } from '../../../../src/api/utils/schemaValidator';
import { expectUsersToBeEqual } from '../../../../src/api/assertions/assert-users-are-equal';
import { UserDetailsResponse } from '../../../../src/api/models/responses/user-details.response';

test.describe('API: Get User Detail By Email — Positive', () => {
  test('Should return user details for a valid registered email', async ({
    userClient, testUser,
  }) => {
    const response = await userClient.getUserByEmail(testUser.email);
    expectSchema(response, getUserResponseSchema);
    expect(response.responseCode).toBe(HTTP_STATUS.OK);
    expect(response.message).toBeUndefined();
    assertUserDetailsResponse(response.data);
    const retrievedUser = response.data as UserDetailsResponse;
    expectUsersToBeEqual(retrievedUser, testUser);
  });
});
