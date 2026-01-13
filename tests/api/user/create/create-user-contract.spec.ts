import { test, expect } from '../../../../src/api/fixtures/delete-user';
import { buildUser } from '../../../../src/api/data/user-factory';
import { API_ENDPOINTS } from '../../../../src/api/constants/endpoints';
import { toFormPayload } from '../../../../src/api/utils/form-helper';
import { HTTP_STATUS } from '../../../../src/api/constants/http-status';

test.describe('User API - Contract Tests', () => {
  test('TC11-20 — Validate response schema', async ({userClient, createdUsers}) => {
    const user = buildUser();
    const res = await userClient.createUser(user);

    // Status code
    expect(res.responseCode).toBe(HTTP_STATUS.CREATED);

    // Validate schema: only message field, type string
    expect(res.message).toBeDefined();
    expect(typeof res.message).toBe('string');

    // Ensure no unexpected fields in data (if data should be null)
    expect(res.data).toBeNull();

    createdUsers.push({ email: user.email, password: user.password });
  });

  test('TC11-21 — Validate HTTP Headers', async ({request, createdUsers}) => {
    const user = buildUser();
    const userPayload = toFormPayload(user);
    const defaultFormHeaders = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };
    const rawResponse = await request.post(API_ENDPOINTS.USER.CREATE, {
      headers: defaultFormHeaders,
      form: userPayload,
    });

    const headers = await rawResponse.headers();

    // Content-Type JSON
    expect(headers['content-type']).toContain('text/html; charset=utf-8');

    // No sensitive headers exposed
    const sensitiveHeaders = ['authorization', 'set-cookie', 'x-api-key'];
    sensitiveHeaders.forEach(header => {
      expect(headers[header]).toBeUndefined();
    });

    createdUsers.push({ email: user.email, password: user.password });
  });
});
