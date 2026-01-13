import { test, expect } from '../../../../src/api/fixtures/user-fixtures';
import { HTTP_STATUS } from '../../../../src/api/constants/http-status';
import { expectSchema } from '../../../../src/api/utils/schemaValidator';
import { deleteAccountSchema } from '../../../../src/api/schemas/delete-account.schema';

test.describe('API: Delete Account - Positive', () => {
  test('should delete account successfully with valid credentials', async ({ userClient, testUser }) => {
    // Act - delete user
    const res = await userClient.deleteUserByEmailAndPassword(testUser.email, testUser.password);

    // Assert - verify deletion response
    expect(res.responseCode).toBe(HTTP_STATUS.OK);
    expect(res.message).toBe('Account deleted!');
    expectSchema(res, deleteAccountSchema);

    //Act - retrieve user to verify
    const retrieved = await userClient.getUserByEmail(testUser.email);

    // Assert - verify retrieved user data
        expect(retrieved.responseCode).toBe(HTTP_STATUS.NOT_FOUND);
        expect(retrieved.message).toBe('Account not found with this email, try another email!');
  });
});