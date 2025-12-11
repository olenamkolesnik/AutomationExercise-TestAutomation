import { test, expect } from '../../../src/api/fixtures/api';
import { buildUser } from '../../../src/api/data/user-factory';
import { HTTP_STATUS } from '../../../src/api/constants/http-status';

test.describe('Create User Negative Tests', () => {
  test('TC11-06: Duplicate email', async ({userClient}) => {
    const user = buildUser();
    await userClient.createUser(user); // create once

    const response = await userClient.createUser(user); // create again

    expect(response.responseCode).toBe(HTTP_STATUS.BAD_REQUEST);
    expect(response.message).toContain('Email already exists');
  });

  test.describe('TC11-07: Missing required fields', () => {
    ['name', 'email', 'password'].forEach((field) => {
      test(`Missing ${field}`, async ({userClient}) => {
        const user = buildUser({ [field]: undefined });
        const responseponse = await userClient.createUser(user);

        expect(responseponse.responseCode).toBe(HTTP_STATUS.BAD_REQUEST);
        expect(responseponse.message).toContain(field);
      });
    });
  });

  test('TC11-08: Invalid email formats', async ({userClient}) => {
    const invalidEmails = ['user@', 'abc', 'user@domain', 'user@@example.com'];
    for (const email of invalidEmails) {
      const response = await userClient.createUser(buildUser({ email }));
      expect(response.responseCode).toBe(HTTP_STATUS.BAD_REQUEST);
    }
  });

  test('TC11-09: Weak passwords', async ({userClient}) => {
    const weakPasswords = ['short', 'nodigitsletters', '123456'];
    for (const password of weakPasswords) {
      const response = await userClient.createUser(buildUser({ password }));
      expect(response.responseCode).toBe(HTTP_STATUS.BAD_REQUEST);
    }
  });

  test('TC11-11: Invalid birth date combinations', async ({userClient}) => {
    const invalidDates = [
      { birth_date: 31, birth_month: 2 },
      { birth_date: 1, birth_month: 13 },
      { birth_year: new Date().getFullYear() + 1 },
    ];
    for (const date of invalidDates) {
      const response = await userClient.createUser(buildUser(date));
      expect(response.responseCode).toBe(HTTP_STATUS.BAD_REQUEST);
    }
  });

  test('TC11-12: Invalid country', async ({userClient}) => {
    const response = await userClient.createUser(
      buildUser({ country: 'InvalidCountry' })
    );
    expect(response.responseCode).toBe(HTTP_STATUS.BAD_REQUEST);
  });

  test('TC11-13: Too long values', async ({userClient}) => {
    const longString = 'a'.repeat(500);
    const response = await userClient.createUser(
      buildUser({ firstname: longString })
    );
    expect(response.responseCode).toBe(HTTP_STATUS.BAD_REQUEST);
  });
});
