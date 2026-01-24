import { test, expect } from '../../../../src/api/fixtures/user-fixtures';
import { HTTP_STATUS } from '../../../../src/api/constants/http-status';
import { expectSchema } from '../../../../src/api/utils/schemaValidator';
import { getUserResponseSchema } from '../../../../src/api/schemas/get-user.response.schema';
import { assertUserDetailsResponse } from '../../../../src/api/assertions/user-assert';

test.describe('API: Get User Detail By Email — Positive', () => {
  test('Should return user details for a valid registered email', async ({
    userClient,
    testUser,
  }) => {
    const response = await userClient.getUserByEmail(testUser.email);

    expect(response.responseCode).toBe(HTTP_STATUS.OK);
    expect(response.message).toBeUndefined();
    expectSchema(response, getUserResponseSchema);

    expect(response.data).not.toBeNull();
    assertUserDetailsResponse(response.data);
    const retrievedUser = response.data;
    expect(retrievedUser.id).toBeDefined();
    expect(retrievedUser.name).toBe(testUser.name);
    expect(retrievedUser.email).toBe(testUser.email);
    expect(retrievedUser.title).toBe(testUser.title);
    expect(retrievedUser.birth_day).toBe(testUser.birth_date.toString());
    expect(retrievedUser.birth_month).toBe(testUser.birth_month.toString());
    expect(retrievedUser.birth_year).toBe(testUser.birth_year.toString());
    expect(retrievedUser.first_name).toBe(testUser.firstname);
    expect(retrievedUser.last_name).toBe(testUser.lastname);
    expect(retrievedUser.company).toBe(testUser.company);
    expect(retrievedUser.address1).toBe(testUser.address1);
    expect(retrievedUser.address2).toBe(testUser.address2);
    expect(retrievedUser.country).toBe(testUser.country);
    expect(retrievedUser.zipcode).toBe(testUser.zipcode); //
    expect(retrievedUser.state).toBe(testUser.state);
    expect(retrievedUser.city).toBe(testUser.city);
  });
});
