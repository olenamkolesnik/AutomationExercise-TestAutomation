import { test, expect } from '../../../../src/api/fixtures/user-fixtures';
import { HTTP_STATUS } from '../../../../src/api/constants/http-status';
import { expectSchema } from '../../../../src/api/utils/schemaValidator';
import { commonResponseSchema } from '../../../../src/api/schemas/common-response.schema';

test.describe('API: Delete Account - Negative', () => {
 test('should return an error when deleting with an incorrect password', async ({ userClient, testUser }) => {
    const response = await userClient.deleteUserByEmailAndPassword(testUser.email, 'WrongPassword123!');

    expect(response.responseCode).toBe(HTTP_STATUS.NOT_FOUND);
    expect(response.message).toContain('Account not found!');
    expectSchema(response, commonResponseSchema);
  });

  test('should return an error when deleting a non-existing user', async ({ userClient }) => {
    const response = await userClient.deleteUserByEmailAndPassword(
      'nonexistent.user.' + Date.now() + '@example.com',
      'RandomPass123!'
    );

    expect(response.responseCode).toBe(HTTP_STATUS.NOT_FOUND);
    expect(response.message).toContain('Account not found!');
    expectSchema(response, commonResponseSchema);
  });

  test('should fail when email is missing', async ({ userClient, testUser }) => {
    const response = await userClient.deleteUserByEmailAndPassword('', testUser.password);

    expect(response.responseCode).toBe(HTTP_STATUS.NOT_FOUND);
    expect(response.message).toContain('Account not found');
    expectSchema(response, commonResponseSchema);
  });

  test('should fail when password is missing', async ({ userClient, testUser }) => {
    const response = await userClient.deleteUserByEmailAndPassword(testUser.email, '');

    expect(response.responseCode).toBe(HTTP_STATUS.BAD_REQUEST);
    expect(response.message).toContain('Bad request, password parameter is missing in DELETE request.');
    expectSchema(response, commonResponseSchema);
  });

  test('should handle repeated deletion (idempotency check)', async ({ userClient, testUser }) => {
    // First delete
    const first = await userClient.deleteUserByEmailAndPassword(testUser.email, testUser.password);
    expect(first.responseCode).toBe(HTTP_STATUS.OK);

    // Second delete — account no longer exists
    const second = await userClient.deleteUserByEmailAndPassword(testUser.email, testUser.password);
    expect(second.responseCode).toBe(HTTP_STATUS.NOT_FOUND);
    expect(second.message).toContain('Account not found!');
    expectSchema(second, commonResponseSchema);
  });

  test('should reject invalid email format', async ({ userClient, testUser }) => {
    const response = await userClient.deleteUserByEmailAndPassword('invalid-email-format', testUser.password);

    expect(response.responseCode).toBe(HTTP_STATUS.NOT_FOUND);
    expect(response.message).toContain("Account not found");
    expectSchema(response, commonResponseSchema);
  });
});