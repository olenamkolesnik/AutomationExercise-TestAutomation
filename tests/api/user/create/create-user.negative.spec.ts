import { test } from '../../../../src/common/fixtures/api-clients.fixture';
import { buildUser } from '../../../../src/api/data/user-factory';
import { HTTP_STATUS } from '../../../../src/api/constants/http-status';
import { commonResponseSchema } from '../../../../src/api/schemas/common-response.schema';
import { expectSchema } from '../../../../src/api/utils/schemaValidator';
import { expect } from '@playwright/test';

test.describe('Create User Negative Tests', () => {
  test('Duplicate email', async ({ userClient }) => {
    const testUser = buildUser();
    try {
      await userClient.createUser(testUser);
      const response = await userClient.createUser(testUser);
      expectSchema(response, commonResponseSchema);
      expect(response.responseCode).toBe(HTTP_STATUS.BAD_REQUEST);
      expect(response.message).toContain('Email already exists');
      expect(response.data).toBeNull();
    } finally {
      await userClient.deleteUser({
        email: testUser.email,
        password: testUser.password,
      });
    }
  });

  test.describe('Missing required fields', () => {
    ['name', 'email', 'password'].forEach((field) => {
      test(`Missing ${field}`, async ({ userClient }) => {
        const testUser = buildUser({ [field]: undefined });
        try {
          const response = await userClient.createUser(testUser);
          expectSchema(response, commonResponseSchema);
          expect(response.responseCode).toBe(HTTP_STATUS.BAD_REQUEST);
          expect(response.message).toContain(field);
          expect(response.data).toBeNull();
        } finally {
          await userClient.deleteUser({
            email: testUser.email,
            password: testUser.password,
          });
        }
      });
    });
  });
});
