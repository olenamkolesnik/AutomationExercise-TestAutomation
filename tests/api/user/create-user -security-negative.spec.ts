import { test, expect } from '@playwright/test';
import { buildUser } from '../../../src/api/data/user-factory';
import UserClient from '../../../src/api/clients/userClient';

test.describe('User API - Security / Technical Negative Tests', () => {
  let client: UserClient;

  test.beforeEach(async ({ request }) => {
    client = new UserClient(request);
  });

  test('TC11-16 — SQL injection attempt', async () => {
    const user = buildUser({ firstname: "John'); DROP TABLE users; --" });
    const res = await client.createUser(user);
    expect([400, 422]).toContain(res.responseCode); // 422 if backend uses validation
    expect(res.message || '').not.toContain('server error');
  });

  test('TC11-17 — Script/HTML injection', async () => {
    const user = buildUser({ firstname: '<script>alert(1)</script>' });
    const res = await client.createUser(user);
    expect([400, 422]).toContain(res.responseCode);    
  });

  test('TC11-18 — Excessive request size', async () => {
    const largeString = 'a'.repeat(100_000); // 100k chars
    const user = buildUser({
      firstname: largeString,
      lastname: largeString,
      company: largeString,
      address1: largeString,
      address2: largeString,
    });
    const res = await client.createUser(user);
    expect([400, 413]).toContain(res.responseCode); // 413 Payload Too Large
  });

  test.describe('TC11-19 — Duplicate / invalid mobile_number formats', () => {
    const invalidNumbers = ['abcdef', '123-456!', '9'.repeat(50)];
    invalidNumbers.forEach((number) => {
      test(`Invalid mobile_number: ${number}`, async () => {
        const user = buildUser({ mobile_number: number });
        const res = await client.createUser(user);
        expect(res.responseCode).toBe(400);
      });
    });

    test('Duplicate mobile_number', async () => {
      const user = buildUser();
      await client.createUser(user); // create first time
      const resDuplicate = await client.createUser(user); // attempt duplicate
      expect([400, 409]).toContain(resDuplicate.responseCode); // 409 Conflict possible
    });
  });
});
