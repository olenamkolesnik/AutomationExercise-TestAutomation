import { test} from '../../../../src/common/fixtures/user.fixture';
import { HTTP_STATUS } from '../../../../src/api/constants/http-status';
import { expectSchema } from '../../../../src/api/utils/schemaValidator';
import { commonResponseSchema } from '../../../../src/api/schemas/common-response.schema';
import { expect } from '@playwright/test';

test.describe('API: Delete Account - Negative', () => {
 test('Should return an error when deleting with an incorrect password', async ({ userClient, testUser }) => {
    const response = await userClient.deleteUserByEmailAndPassword(testUser.email, 'WrongPassword123!');

    expectSchema(response, commonResponseSchema);
    expect(response.responseCode).toBe(HTTP_STATUS.NOT_FOUND);
    expect(response.message).toContain('Account not found!');
    expect(response.data).toBeNull();
  });

  test('Should return an error when deleting a non-existing user', async ({ userClient }) => {
    const response = await userClient.deleteUserByEmailAndPassword(
      'nonexistent.user.' + Date.now() + '@example.com',
      'RandomPass123!'
    );

    expectSchema(response, commonResponseSchema);
    expect(response.responseCode).toBe(HTTP_STATUS.NOT_FOUND);
    expect(response.message).toContain('Account not found!');
    expect(response.data).toBeNull();
  });

  test('Should fail when email is missing', async ({ userClient, testUser }) => {
    const response = await userClient.deleteUserByEmailAndPassword('', testUser.password);

    expectSchema(response, commonResponseSchema);
    expect(response.responseCode).toBe(HTTP_STATUS.NOT_FOUND);
    expect(response.message).toContain('Account not found');
    expect(response.data).toBeNull();
  });

  test('Should fail when password is missing', async ({ userClient, testUser }) => {
    const response = await userClient.deleteUserByEmailAndPassword(testUser.email, '');

    expectSchema(response, commonResponseSchema);
    expect(response.responseCode).toBe(HTTP_STATUS.BAD_REQUEST);
    expect(response.message).toContain('Bad request, password parameter is missing in DELETE request.');
    expect(response.data).toBeNull();
  });

  test('Should handle repeated deletion (idempotency check)', async ({ userClient, testUser }) => {
    const firstDeleteResponse = await userClient.deleteUserByEmailAndPassword(testUser.email, testUser.password);

    expect(firstDeleteResponse.responseCode).toBe(HTTP_STATUS.OK);

    const secondDeleteResponse = await userClient.deleteUserByEmailAndPassword(testUser.email, testUser.password);

    expectSchema(secondDeleteResponse, commonResponseSchema);
    expect(secondDeleteResponse.responseCode).toBe(HTTP_STATUS.NOT_FOUND);
    expect(secondDeleteResponse.message).toContain('Account not found!');
    expect(secondDeleteResponse.data).toBeNull();
  });

  test('Should reject invalid email format', async ({ userClient, testUser }) => {
    const response = await userClient.deleteUserByEmailAndPassword('invalid-email-format', testUser.password);
    
    expectSchema(response, commonResponseSchema);
    expect(response.responseCode).toBe(HTTP_STATUS.NOT_FOUND);
    expect(response.message).toContain("Account not found");
    expect(response.data).toBeNull();
  });
});