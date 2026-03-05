import { expect } from '@playwright/test';

import { expectSchema } from '../../../../src/api/assertions/expectSchema';
import { HTTP_STATUS } from '../../../../src/api/constants/http-status';
import { validateCommonResponse } from '../../../../src/api/contracts/validators/common-response.validator';
import { test } from '../../../../src/common/fixtures/user.fixture';

test.describe('API: Get User Detail By Email — Negative', () => {
  test('Should return 404 for unregistered email', async ({ userClient }) => {
    const email = 'nonexistent.user.' + Date.now() + '@example.com';
    const response = await userClient.getUserByEmail(email);

    expectSchema(response.rawBody, validateCommonResponse);
    expect(response.responseCode).toBe(HTTP_STATUS.NOT_FOUND);
    expect(response.message).toContain(
      'Account not found with this email, try another email!',
    );
    expect(response.data).toBeNull();
  });

  test('Should return error when email query parameter is missing', async ({
    userClient,
  }) => {
    const response = await userClient.getUserByEmail(
      undefined as unknown as string,
    );

    expectSchema(response.rawBody, validateCommonResponse);
    expect(response.responseCode).toBeGreaterThanOrEqual(
      HTTP_STATUS.BAD_REQUEST,
    );
    expect(response.message).toContain(
      'Bad request, email parameter is missing in GET request.',
    );
    expect(response.data).toBeNull();
  });

  test('Should return 404 for email with different case', async ({
    userClient,
    testUser,
  }) => {
    const upperCaseEmail = testUser.email.toUpperCase();

    const response = await userClient.getUserByEmail(upperCaseEmail);

    expectSchema(response.rawBody, validateCommonResponse);
    expect(response.responseCode).toBe(HTTP_STATUS.NOT_FOUND);
    expect(response.message).toBeTruthy();
    expect(response.data).toBeNull();
  });

  test('Should return 404 for email with leading and trailing spaces', async ({
    userClient,
    testUser,
  }) => {
    const emailWithSpaces = `  ${testUser.email}  `;

    const response = await userClient.getUserByEmail(emailWithSpaces);

    expectSchema(response.rawBody, validateCommonResponse);
    expect(response.responseCode).toBe(HTTP_STATUS.NOT_FOUND);
    expect(response.message).toBeTruthy();
    expect(response.data).toBeNull();
  });

  test('Should handle injection-like input safely', async ({ userClient }) => {
    const response = await userClient.getUserByEmail(`' OR 1=1 --`);

    expectSchema(response.rawBody, validateCommonResponse);
    expect(response.responseCode).toBeGreaterThanOrEqual(
      HTTP_STATUS.BAD_REQUEST,
    );
    expect(response.message).toBeTruthy();
    expect(response.data).toBeNull();
  });

  test('Should return error for excessively long email input', async ({
    userClient,
  }) => {
    const longEmail = `${'a'.repeat(300)}@example.com`;

    const response = await userClient.getUserByEmail(longEmail);

    expectSchema(response.rawBody, validateCommonResponse);
    expect(response.responseCode).toBeGreaterThanOrEqual(
      HTTP_STATUS.BAD_REQUEST,
    );
    expect(response.message).toBeTruthy();
    expect(response.data).toBeNull();
  });
});
