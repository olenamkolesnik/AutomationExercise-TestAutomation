import { test, expect } from '@playwright/test';
import { wrapResponse } from '../../src/api/utils/response-wrapper';
import { getUserResponseSchema } from '../../src/api/schemas/get-user-response.schema';

function makeApiResponse({
  status = 200,
  statusText = 'OK',
  text = '{}',
}: {
  status?: number;
  statusText?: string;
  text?: string;
}) {
  return {
    status: () => status,
    statusText: () => statusText,
    text: async () => text,
    json: async () => JSON.parse(text),
  } as any;
}

test('wrapResponse — success shape with user (validates schema)', async () => {
  const body = {
    responseCode: 200,
    user: {
      id: 123,
      name: 'Alice',
      email: 'alice@example.com',
      title: 'Miss',
      birth_day: '1',
      birth_month: '1',
      birth_year: '1990',
      first_name: 'Alice',
      last_name: 'Tester',
      company: 'Acme',
      address1: 'Street 1',
      address2: '',
      country: 'USA',
      state: 'NY',
      city: 'NYC',
      zipcode: '10001',
    },
  };
  const raw = JSON.stringify(body);
  const mockResp = makeApiResponse({ text: raw });

  const wrapped = await wrapResponse(mockResp, getUserResponseSchema);

  expect(wrapped.responseCode).toBe(200);
  expect(wrapped.data).not.toBeNull();
  expect(wrapped.message).toBeUndefined();
  const user = wrapped.data as any;
  expect(user.email).toBe('alice@example.com');
});

test('wrapResponse — success shape with data', async () => {
  const body = { responseCode: 200, data: { id: 222, value: 'some payload' } };
  const raw = JSON.stringify(body);
  const mockResp = makeApiResponse({ text: raw });

  const wrapped = await wrapResponse(mockResp);

  expect(wrapped.responseCode).toBe(200);
  expect(wrapped.data).not.toBeNull();
  const d = wrapped.data as any;
  expect(d.id).toBe(222);
  expect(d.value).toBe('some payload');
});

test('wrapResponse — error shape with message', async () => {
  const body = {
    responseCode: 400,
    message: 'Bad request, email parameter is missing',
  };
  const raw = JSON.stringify(body);
  const mockResp = makeApiResponse({ text: raw });

  const wrapped = await wrapResponse(mockResp);

  expect(wrapped.responseCode).toBe(400);
  expect(wrapped.message).toContain('Bad request');
  expect(wrapped.data).toBeNull();
});

test('wrapResponse — invalid JSON throws', async () => {
  const mockResp = makeApiResponse({ text: 'not a json' });
  await expect(() => wrapResponse(mockResp)).rejects.toThrow(/Invalid JSON/);
});
