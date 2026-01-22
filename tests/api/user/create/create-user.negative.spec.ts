import { test, expect } from '../../../../src/api/fixtures/api';
import { buildUser } from '../../../../src/api/data/user-factory';
import { HTTP_STATUS } from '../../../../src/api/constants/http-status';

test.describe('Create User Negative Tests', () => {
  test('Duplicate email', async ({ userClient }) => {
    const user = buildUser();

    await userClient.createUser(user);
    const response = await userClient.createUser(user);

    expect(response.responseCode).toBe(HTTP_STATUS.BAD_REQUEST);
    expect(response.message).toContain('Email already exists');

    await userClient.deleteUserByEmailAndPassword(user.email, user.password);
  });

  test.describe('Missing required fields', () => {
    ['name', 'email', 'password'].forEach((field) => {
      test(`Missing ${field}`, async ({ userClient }) => {
        const user = buildUser({ [field]: undefined });
        const response = await userClient.createUser(user);

        expect(response.responseCode).toBe(HTTP_STATUS.BAD_REQUEST);
        expect(response.message).toContain(field);
      });
    });
  });

  const invalidEmails = ['user@', 'abc', 'user@domain', 'user@@example.com'];

  invalidEmails.forEach((email) => {
    test(`Invalid email formats ${email}`, async ({ userClient }) => {
      const user = buildUser({ email });
      const response = await userClient.createUser(user);

      expect(response.responseCode).toBe(HTTP_STATUS.BAD_REQUEST);
      // @NOTE: This assertion is here to show intended validation, but the backend currently returns a wrong message.
      expect.soft(response.message).toContain('Invalid email format');

      userClient.deleteUserByEmailAndPassword(user.email, user.password);
    });
  });

  test('Weak passwords', async ({ userClient }) => {
    const weakPasswords = ['short', 'nodigitsletters', '123456'];
    for (const password of weakPasswords) {
      const response = await userClient.createUser(buildUser({ password }));
      // @NOTE: This assertion is here to show intended validation, but the backend currently returns a wrong response code and message.
      expect(response.responseCode).toBe(HTTP_STATUS.BAD_REQUEST);
      expect(response.message).toContain('Weak password');
    }
  });

  test('Invalid birth date combinations', async ({ userClient }) => {
    const invalidDates = [
      { birth_date: 31, birth_month: 2 },
      { birth_date: 1, birth_month: 13 },
      { birth_year: new Date().getFullYear() + 1 },
    ];
    for (const date of invalidDates) {
      const response = await userClient.createUser(buildUser(date));
      // @NOTE: This assertion is here to show intended validation, but the backend currently returns a wrong response code and message.
      expect(response.responseCode).toBe(HTTP_STATUS.BAD_REQUEST);
      expect(response.message).toContain('Invalid birth date');
    }
  });

  test('Invalid country', async ({ userClient }) => {
    const response = await userClient.createUser(
      buildUser({ country: 'InvalidCountry' }),
    );
    // @NOTE: This assertion is here to show intended validation, but the backend currently returns a wrong response code and message.
    expect(response.responseCode).toBe(HTTP_STATUS.BAD_REQUEST);
    expect(response.message).toContain('Invalid country');
  });

  test('Too long values', async ({ userClient }) => {
    const longString = 'a'.repeat(500);
    const response = await userClient.createUser(
      buildUser({ firstname: longString }),
    );
    // @NOTE: This assertion is here to show intended validation, but the backend currently returns a wrong response code and message.
    expect(response.responseCode).toBe(HTTP_STATUS.BAD_REQUEST);
    expect(response.message).toContain('Value too long');
  });
});
