import { test } from '../../../../src/common/fixtures/user.fixture';
import { HTTP_STATUS } from '../../../../src/api/constants/http-status';
import { expect } from '@playwright/test';
import { API_ENDPOINTS } from '../../../../src/api/constants/endpoints';
import { wrapResponse } from '../../../../src/api/utils/response-wrapper';
import { validateCommonResponse } from '../../../../src/api/contracts/validators/common-response.validator';
import { expectSchema } from '../../../../src/api/assertions/expectSchema';

test.describe('API: Delete Account - Negative', () => {
  test('Should return an error when deleting with an incorrect password', async ({
    userClient,
    testUser,
  }) => {
    const response = await userClient.deleteUser({
      email: testUser.email,
      password: 'WrongPassword123!',
    });

    expectSchema(response.rawBody, validateCommonResponse);
    expect(response.responseCode).toBe(HTTP_STATUS.NOT_FOUND);
    expect(response.message).toContain('Account not found!');
    expect(response.data).toBeNull();
  });

  test('Should return an error when deleting a non-existing user', async ({
    userClient,
  }) => {
    const response = await userClient.deleteUser({
      email: 'nonexistent.user.' + Date.now() + '@example.com',
      password: 'RandomPass123!',
    });

    expectSchema(response.rawBody, validateCommonResponse);
    expect(response.responseCode).toBe(HTTP_STATUS.NOT_FOUND);
    expect(response.message).toContain('Account not found!');
    expect(response.data).toBeNull();
  });

  test('Should fail when email is missing', async ({
    userClient,
    testUser,
  }) => {
    const response = await userClient.deleteUser({
      email: '',
      password: testUser.password,
    });

    expectSchema(response.rawBody, validateCommonResponse);
    expect(response.responseCode).toBe(HTTP_STATUS.NOT_FOUND);
    expect(response.message).toContain('Account not found');
    expect(response.data).toBeNull();
  });

  test('Should fail when password is missing', async ({
    testUser,
    request,
  }) => {
    const rawResponse = await request.delete(API_ENDPOINTS.USER.DELETE, {
      form: { email: testUser.email },
    });

    const response = await wrapResponse(rawResponse);

    expectSchema(response.rawBody, validateCommonResponse);
    expect(response.responseCode).toBe(HTTP_STATUS.BAD_REQUEST);
    expect(response.message).toContain(
      'Bad request, password parameter is missing in DELETE request.',
    );
    expect(response.data).toBeNull();
  });

  test('Should handle repeated deletion (idempotency check)', async ({
    userClient,
    testUser,
  }) => {
    const firstDeleteResponse = await userClient.deleteUser({
      email: testUser.email,
      password: testUser.password,
    });

    expect(firstDeleteResponse.responseCode).toBe(HTTP_STATUS.OK);

    const secondDeleteResponse = await userClient.deleteUser({
      email: testUser.email,
      password: testUser.password,
    });

    expectSchema(secondDeleteResponse.rawBody, validateCommonResponse);
    expect(secondDeleteResponse.responseCode).toBe(HTTP_STATUS.NOT_FOUND);
    expect(secondDeleteResponse.message).toContain('Account not found!');
    expect(secondDeleteResponse.data).toBeNull();
  });

  test('Should reject invalid email format', async ({
    userClient,
    testUser,
  }) => {
    const response = await userClient.deleteUser({
      email: 'invalid-email-format',
      password: testUser.password,
    });

    expectSchema(response.rawBody, validateCommonResponse);
    expect(response.responseCode).toBe(HTTP_STATUS.NOT_FOUND);
    expect(response.message).toContain('Account not found');
    expect(response.data).toBeNull();
  });
});
