import { test, expect } from '../../../src/api/fixtures/user-fixture';
import { buildUser } from '../../../src/api/data/user-factory';
import { HTTP_STATUS } from '../../../src/api/constants/http-status';
import UserClient from '../../../src/api/clients/userClient';

test.describe('Create User Negative Tests', () => {
  let client: UserClient;

  test.beforeEach(async ({ request }) => {
    client = new UserClient(request);
  });

  test('TC11-06: Duplicate email', async () => {
    const user = buildUser();
    await client.createUser(user); // create once

    const response = await client.createUser(user); // create again

    expect(response.responseCode).toBe(HTTP_STATUS.BAD_REQUEST);
    expect(response.message).toContain('Email already exists');
  });

  test.describe('TC11-07: Missing required fields', () => {
    ['name', 'email', 'password'].forEach((field) => {
      test(`Missing ${field}`, async () => {
        const user = buildUser({ [field]: undefined });
        const responseponse = await client.createUser(user);

        expect(responseponse.responseCode).toBe(HTTP_STATUS.BAD_REQUEST);
        expect(responseponse.message).toContain(field);
      });
    });
  });

  test('TC11-08: Invalid email formats', async () => {
    const invalidEmails = ['user@', 'abc', 'user@domain', 'user@@example.com'];
    for (const email of invalidEmails) {
      const response = await client.createUser(buildUser({ email }));
      expect(response.responseCode).toBe(HTTP_STATUS.BAD_REQUEST);
    }
  });

  test('TC11-09: Weak passwords', async () => {
    const weakPasswords = ['short', 'nodigitsletters', '123456'];
    for (const password of weakPasswords) {
      const response = await client.createUser(buildUser({ password }));
      expect(response.responseCode).toBe(HTTP_STATUS.BAD_REQUEST);
    }
  });

  test('TC11-11: Invalid birth date combinations', async () => {
    const invalidDates = [
      { birth_date: 31, birth_month: 2 },
      { birth_date: 1, birth_month: 13 },
      { birth_year: new Date().getFullYear() + 1 },
    ];
    for (const date of invalidDates) {
      const response = await client.createUser(buildUser(date));
      expect(response.responseCode).toBe(HTTP_STATUS.BAD_REQUEST);
    }
  });

  test('TC11-12: Invalid country', async () => {
    const response = await client.createUser(
      buildUser({ country: 'InvalidCountry' })
    );
    expect(response.responseCode).toBe(HTTP_STATUS.BAD_REQUEST);
  });

  test('TC11-13: Too long values', async () => {
    const longString = 'a'.repeat(500);
    const response = await client.createUser(
      buildUser({ firstname: longString })
    );
    expect(response.responseCode).toBe(HTTP_STATUS.BAD_REQUEST);
  });
});
