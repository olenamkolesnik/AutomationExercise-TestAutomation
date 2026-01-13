import { test, expect } from '../../../../src/api/fixtures/delete-user';
import { buildUser } from '../../../../src/api/data/user-factory';

test.describe('User API - Security / Technical Negative Tests', () => {
  test('TC11-16 — SQL injection attempt', async ({userClient, createdUsers}) => {
    const user = buildUser({ firstname: "John'); DROP TABLE users; --" });
    const res = await userClient.createUser(user);
    expect([400, 422]).toContain(res.responseCode); // 422 if backend uses validation
    expect(res.message || '').not.toContain('server error');
  });

  test('TC11-17 — Script/HTML injection', async ({userClient}) => {
    const user = buildUser({ firstname: '<script>alert(1)</script>' });
    const res = await userClient.createUser(user);
    expect([400, 422]).toContain(res.responseCode);    
  });

  test('TC11-18 — Excessive request size', async ({userClient}) => {
    const largeString = 'a'.repeat(100_000); // 100k chars
    const user = buildUser({
      firstname: largeString,
      lastname: largeString,
      company: largeString,
      address1: largeString,
      address2: largeString,
    });
    const res = await userClient.createUser(user);
    expect([400, 413]).toContain(res.responseCode); // 413 Payload Too Large
  });

  test.describe('TC11-19 — Duplicate / invalid mobile_number formats', () => {
    const invalidNumbers = ['abcdef', '123-456!', '9'.repeat(50)];
    invalidNumbers.forEach((number) => {
      test(`Invalid mobile_number: ${number}`, async ({userClient}) => {
        const user = buildUser({ mobile_number: number });
        const res = await userClient.createUser(user);
        expect(res.responseCode).toBe(400);
      });
    });

    test('Duplicate mobile_number', async ({userClient, createdUsers}) => {
      const user = buildUser();
      await userClient.createUser(user); // create first time

      const resDuplicate = await userClient.createUser(user); // attempt duplicate

      expect([400, 409]).toContain(resDuplicate.responseCode); // 409 Conflict possible

      createdUsers.push({ email: user.email, password: user.password });
    });
  });
});
