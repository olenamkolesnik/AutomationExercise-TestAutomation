import { test } from '../../../../src/common/fixtures/user.fixture';
import { HTTP_STATUS } from '../../../../src/api/constants/http-status';
import { expectSchema } from '../../../../src/api/utils/schemaValidator';
import { commonResponseSchema } from '../../../../src/api/schemas/common-response.schema';
import { expect } from '@playwright/test';

test.describe('API: Delete Account - Positive', () => {
  test('should delete account successfully with valid credentials', async ({
    userClient,
    testUser,
  }) => {
    const response = await userClient.deleteUser({
      email: testUser.email,
      password: testUser.password,
    });
    expectSchema(response, commonResponseSchema);
    expect(response.responseCode).toBe(HTTP_STATUS.OK);
    expect(response.message).toBe('Account deleted!');

    const getUserResponse = await userClient.getUserByEmail(testUser.email);
    expect(getUserResponse.responseCode).toBe(HTTP_STATUS.NOT_FOUND);
    expect(getUserResponse.message).toBe(
      'Account not found with this email, try another email!',
    );
  });
});
