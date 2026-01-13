import { test, expect } from '../../../../src/api/fixtures/user-fixtures';
import { HTTP_STATUS } from '../../../../src/api/constants/http-status';
import { expectSchema } from '../../../../src/api/utils/schemaValidator';
import { deleteAccountSchema } from '../../../../src/api/schemas/delete-account.schema';

test.describe('API: Delete Account - Negative', () => {
 test('should return an error when deleting with an incorrect password', async ({ userClient, testUser }) => {
    const res = await userClient.deleteUserByEmailAndPassword(testUser.email, 'WrongPassword123!');

    expect(res.responseCode).toBe(HTTP_STATUS.NOT_FOUND);
    expect(res.message).toContain('Account not found!');
    expectSchema(res, deleteAccountSchema);
  });

  test('should return an error when deleting a non-existing user', async ({ userClient }) => {
    const res = await userClient.deleteUserByEmailAndPassword(
      'nonexistent.user.' + Date.now() + '@example.com',
      'RandomPass123!'
    );

    expect(res.responseCode).toBe(HTTP_STATUS.NOT_FOUND);
    expect(res.message).toContain('Account not found!');
    expectSchema(res, deleteAccountSchema);
  });

  test('should fail when email is missing', async ({ userClient, testUser }) => {
    const res = await userClient.deleteUserByEmailAndPassword('', testUser.password);

    expect(res.responseCode).toBe(HTTP_STATUS.NOT_FOUND);
    expect(res.message).toContain('Account not found');
    expectSchema(res, deleteAccountSchema);
  });

  test('should fail when password is missing', async ({ userClient, testUser }) => {
    const res = await userClient.deleteUserByEmailAndPassword(testUser.email, '');

    expect(res.responseCode).toBe(HTTP_STATUS.BAD_REQUEST);
    expect(res.message).toContain('Bad request, password parameter is missing in DELETE request.');
    expectSchema(res, deleteAccountSchema);
  });

  test('should handle repeated deletion (idempotency check)', async ({ userClient, testUser }) => {
    // First delete
    const first = await userClient.deleteUserByEmailAndPassword(testUser.email, testUser.password);
    expect(first.responseCode).toBe(HTTP_STATUS.OK);

    // Second delete — account no longer exists
    const second = await userClient.deleteUserByEmailAndPassword(testUser.email, testUser.password);
    expect(second.responseCode).toBe(HTTP_STATUS.NOT_FOUND);
    expect(second.message).toContain('Account not found!');
    expectSchema(second, deleteAccountSchema);
  });

  test('should reject invalid email format', async ({ userClient, testUser }) => {
    const res = await userClient.deleteUserByEmailAndPassword('invalid-email-format', testUser.password);

    expect(res.responseCode).toBe(HTTP_STATUS.NOT_FOUND);
    expect(res.message).toContain("Account not found");
    expectSchema(res, deleteAccountSchema);
  });
});