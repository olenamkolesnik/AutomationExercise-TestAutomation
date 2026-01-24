import { test, expect } from '../../../../src/api/fixtures/user-fixtures';
import { HTTP_STATUS } from '../../../../src/api/constants/http-status';
import { expectSchema } from '../../../../src/api/utils/schemaValidator';
import { commonResponseSchema } from '../../../../src/api/schemas/common-response.schema';
import { buildUser } from '../../../../src/api/data/user-factory';

test.describe('API: Get User Detail By Email — Negative', () => {
  test('Should return 404 for unregistered email', async ({ userClient }) => {
    const nonExistingUser = buildUser();

    const response = await userClient.getUserByEmail(nonExistingUser.email);

    expect(response.responseCode).toBe(HTTP_STATUS.NOT_FOUND);
    expect(response.data).toBeNull();
    expect(response.message).toBeTruthy();
    expect(response.message).toContain(
      'Account not found with this email, try another email!',
    );

    expectSchema(response, commonResponseSchema);
  });

  test('Should return error when email query parameter is missing', async ({
    userClient,
  }) => {
    const response = await userClient.getUserByEmail(undefined as unknown as string);

    expect(response.responseCode).toBeGreaterThanOrEqual(HTTP_STATUS.BAD_REQUEST);
    expect(response.data).toBeNull();
    expect(response.message).toBeTruthy();
    expect(response.message).toContain(
      'Bad request, email parameter is missing in GET request.',
    );

    expectSchema(response, commonResponseSchema);
  });

  test('Should return 404 for email with different case', async ({
    userClient,
    testUser,
  }) => {
    const upperCaseEmail = testUser.email.toUpperCase();

    const response = await userClient.getUserByEmail(upperCaseEmail);

    expect(response.responseCode).toBe(HTTP_STATUS.NOT_FOUND);
    expect(response.data).toBeNull();
    expect(response.message).toBeTruthy();

    expectSchema(response, commonResponseSchema);
  });

  test('Should return 404 for email with leading and trailing spaces', async ({
    userClient,
    testUser,
  }) => {
    const emailWithSpaces = `  ${testUser.email}  `;

    const response = await userClient.getUserByEmail(emailWithSpaces);

    expect(response.responseCode).toBe(HTTP_STATUS.NOT_FOUND);
    expect(response.data).toBeNull();
    expect(response.message).toBeTruthy();

    expectSchema(response, commonResponseSchema);
  });

  test('Should handle injection-like input safely', async ({
    userClient,
  }) => {
    const response = await userClient.getUserByEmail(`' OR 1=1 --`);

    expect(response.responseCode).toBeGreaterThanOrEqual(HTTP_STATUS.BAD_REQUEST);
    expect(response.data).toBeNull();
    expect(response.message).toBeTruthy();

    expectSchema(response, commonResponseSchema);
  });

  test('Should return error for excessively long email input', async ({
    userClient,
  }) => {
    const longEmail = `${'a'.repeat(300)}@example.com`;

    const response = await userClient.getUserByEmail(longEmail);

    expect(response.responseCode).toBeGreaterThanOrEqual(HTTP_STATUS.BAD_REQUEST);
    expect(response.data).toBeNull();
    expect(response.message).toBeTruthy();

    expectSchema(response, commonResponseSchema);
  });
});
