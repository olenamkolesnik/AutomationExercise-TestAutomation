import { expect } from '@playwright/test';

import { expectSchema } from '../../../../src/api/assertions/expectSchema';
import { HTTP_STATUS } from '../../../../src/api/constants/http-status';
import { validateCommonResponse } from '../../../../src/api/contracts/validators/common-response.validator';
import { test } from '../../../../src/common/fixtures/user.fixture';

test.describe('API: Delete Account - Positive', () => {
  test('should delete account successfully with valid credentials', async ({
    userClient,
    testUser,
  }) => {
    const response = await userClient.deleteUser({
      email: testUser.email,
      password: testUser.password,
    });

    expectSchema(response.rawBody, validateCommonResponse);
    expect(response.responseCode).toBe(HTTP_STATUS.OK);
    expect(response.message).toBe('Account deleted!');

    const getUserResponse = await userClient.getUserByEmail(testUser.email);
    expect(getUserResponse.responseCode).toBe(HTTP_STATUS.NOT_FOUND);
    expect(getUserResponse.message).toBe(
      'Account not found with this email, try another email!',
    );
  });
});
