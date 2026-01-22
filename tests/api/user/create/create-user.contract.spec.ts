import { test, expect } from '../../../../src/api/fixtures/api';
import { buildUser } from '../../../../src/api/data/user-factory';
import { API_ENDPOINTS } from '../../../../src/api/constants/endpoints';
import { toFormPayload } from '../../../../src/api/utils/form-helper';
import { HTTP_STATUS } from '../../../../src/api/constants/http-status';

test.describe('User API - Contract Tests', () => {
  test('Does not expose sensitive headers', async ({ request, userClient }) => {
    const user = buildUser();
    const userPayload = toFormPayload(user);
    const defaultFormHeaders = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    const rawResponse = await request.post(API_ENDPOINTS.USER.CREATE, {
      headers: defaultFormHeaders,
      form: userPayload,
    });

    expect(rawResponse.status()).toBe(HTTP_STATUS.OK);

    const headers = await rawResponse.headers();

    // AutomationExercise returns text/html even for API responses
    expect(headers['content-type']).toContain('text/html; charset=utf-8');

    // No sensitive headers exposed
    const sensitiveHeaders = ['authorization', 'set-cookie', 'x-api-key'];
    sensitiveHeaders.forEach((header) => {
      expect(headers[header]).toBeUndefined();
    });

    const body = await rawResponse.text();
    expect(body.toLowerCase()).not.toContain('<html');

    await userClient.deleteUserByEmailAndPassword(user.email, user.password);
  });
});
