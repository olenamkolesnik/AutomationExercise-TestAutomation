import { test, expect } from '../../../../src/common/fixtures/user-fixtures';
import { HTTP_STATUS } from '../../../../src/api/constants/http-status';
import { buildUpdateAccountData } from '../../../../src/api/data/update-user-factory';
import { commonResponseSchema } from '../../../../src/api/schemas/common-response.schema';
import { expectSchema } from '../../../../src/api/utils/schemaValidator';

test.describe('API: Update User - Negative', () => {
  test('Should fail when email is missing', async ({ userClient, testUser }) => {
    const updateData = buildUpdateAccountData({
      password: testUser.password,
    });

    const response = await userClient.updateUser(updateData);

    expectSchema(response, commonResponseSchema);
    expect(response.responseCode).toBe(HTTP_STATUS.BAD_REQUEST);
    expect(response.message).toContain("email");
  });

  test('Should fail when password is missing', async ({ userClient, testUser }) => {
    const updateData = buildUpdateAccountData({
      email: testUser.email,
    });

    const response = await userClient.updateUser(updateData);

    expectSchema(response, commonResponseSchema);
    expect(response.responseCode).toBe(HTTP_STATUS.BAD_REQUEST);
    expect(response.message).toContain("password parameter");
  });

  test('Should return account not found when email is empty', async ({ userClient, testUser }) => {
    const updateData = buildUpdateAccountData({
      email: '',
      password: testUser.password,
    });

    const response = await userClient.updateUser(updateData);

    expectSchema(response, commonResponseSchema);
    expect(response.responseCode).toBe(HTTP_STATUS.NOT_FOUND);
    expect(response.message).toBe('Account not found!');
  });

  test('Should return account not found when password is empty', async ({ userClient, testUser }) => {
    const updateData = buildUpdateAccountData({
      email: testUser.email,
      password: '',
    });

    const response = await userClient.updateUser(updateData);

    expectSchema(response, commonResponseSchema);
    expect(response.responseCode).toBe(HTTP_STATUS.NOT_FOUND);
    expect(response.message).toBe('Account not found!');
  });

  test('Should fail with invalid password', async ({ userClient, testUser }) => {
    const updateData = buildUpdateAccountData({
      email: testUser.email,
      password: 'WrongPassword123',
    });

    const response = await userClient.updateUser(updateData);

    expectSchema(response, commonResponseSchema);
    expect(response.responseCode).toBe(HTTP_STATUS.NOT_FOUND);
    expect(response.message).toBe('Account not found!');
  });

  test('Should fail with non-existing email', async ({ userClient, testUser }) => {
    const updateData = buildUpdateAccountData({
      email: 'non-existing@email.com',
      password: testUser.password,
    });

    const response = await userClient.updateUser(updateData);

    expectSchema(response, commonResponseSchema);
    expect(response.responseCode).toBe(HTTP_STATUS.NOT_FOUND);
    expect(response.message).toBe('Account not found!');
  });
});
