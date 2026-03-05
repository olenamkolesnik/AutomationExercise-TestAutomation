import { expect } from '@playwright/test';

import { expectSchema } from '../../../../src/api/assertions/expectSchema';
import { HTTP_STATUS } from '../../../../src/api/constants/http-status';
import { validateCommonResponse } from '../../../../src/api/contracts/validators/common-response.validator';
import { buildUser } from '../../../../src/api/data/user-factory';
import { mapToCreateUserDto } from '../../../../src/api/mappers/user.mapper';
import { test } from '../../../../src/common/fixtures/api-clients.fixture';

test.describe('Create User Negative Tests', () => {
  test('Duplicate email', async ({ userClient }) => {
    const testUser = buildUser();
    const createUserDto = mapToCreateUserDto(testUser);
    try {
      await userClient.createUser(createUserDto);
      const response = await userClient.createUser(createUserDto);
      expectSchema(response.rawBody, validateCommonResponse);
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
          const response = await userClient.createUser(mapToCreateUserDto(testUser));
          expectSchema(response.rawBody, validateCommonResponse);
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
