import { test, expect } from '../../../../src/common/fixtures/user-fixtures';
import { HTTP_STATUS } from '../../../../src/api/constants/http-status';
import { expectSchema } from '../../../../src/api/utils/schemaValidator';
import { buildUpdateAccountData } from '../../../../src/api/data/update-user-factory';
import { commonResponseSchema } from '../../../../src/api/schemas/common-response.schema';
import { expectUsersToBeEqual } from '../../../../src/api/assertions/assert-users-are-equal';
import { UserDetailsResponse } from '../../../../src/api/models/responses/user-details.response';

test.describe('API: Update Account Positive Tests - Positive', () => {
  test('Update all updatable fields with valid data', async ({
    userClient,
    testUser,
  }) => {
    const updatedUser = buildUpdateAccountData({
      name: 'Updated Name',
      email: testUser.email,
      password: testUser.password,
      title: 'Mr',
      birth_date: 15,
      birth_month: 6,
      birth_year: 1990,
      firstname: 'UpdatedFirst',
      lastname: 'UpdatedLast',
      company: 'UpdatedCompany',
      address1: '123 Updated St',
      address2: 'Suite 456',
      country: 'USA',
      zipcode: '12345',
      state: 'CA',
      city: 'Los Angeles'
    });

    const response = await userClient.updateUser(updatedUser);
    expectSchema(response, commonResponseSchema);
    expect(response.responseCode).toBe(HTTP_STATUS.OK);
    expect(response.message).toBe('User updated!');
    expect(response.data).toBeNull();

    const retrieved = await userClient.getUserByEmail(testUser.email);    
    const retrievedUser = retrieved.data as UserDetailsResponse;
    expectUsersToBeEqual(retrievedUser, updatedUser);
  });
});
