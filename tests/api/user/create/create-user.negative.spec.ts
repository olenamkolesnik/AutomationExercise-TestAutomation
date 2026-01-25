import { test, expect } from '../../../../src/api/fixtures/api';
import { buildUser } from '../../../../src/api/data/user-factory';
import { HTTP_STATUS } from '../../../../src/api/constants/http-status';
import { commonResponseSchema } from '../../../../src/api/schemas/common-response.schema';
import { expectSchema } from '../../../../src/api/utils/schemaValidator';

test.describe('Create User Negative Tests', () => {
  test('Duplicate email', async ({ userClient }) => {
    const user = buildUser();

    await userClient.createUser(user);
    const response = await userClient.createUser(user);
    expectSchema(response, commonResponseSchema);
    expect(response.responseCode).toBe(HTTP_STATUS.BAD_REQUEST);
    expect(response.message).toContain('Email already exists');
    expect(response.data).toBeNull();

    await userClient.deleteUserByEmailAndPassword(user.email, user.password);
  });

  test.describe('Missing required fields', () => {
    ['name', 'email', 'password'].forEach((field) => {
      test(`Missing ${field}`, async ({ userClient }) => {
        const user = buildUser({ [field]: undefined });
        const response = await userClient.createUser(user);
        expectSchema(response, commonResponseSchema);
        expect(response.responseCode).toBe(HTTP_STATUS.BAD_REQUEST);
        expect(response.message).toContain(field);
        expect(response.data).toBeNull();
      });
    });
  });
});
