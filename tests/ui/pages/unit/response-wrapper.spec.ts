import { test, expect, APIResponse } from '@playwright/test';
import { wrapResponse } from '../../../../src/api/utils/response-wrapper';

/**
 * Minimal mock implementing ONLY what wrapResponse uses.
 * Cast to APIResponse at the call site (test boundary).
 */
type MockApiResponse = {
  status(): number;
  statusText(): string;
  text(): Promise<string>;
};

function makeApiResponse({
  status = 200,
  statusText = 'OK',
  text = '{}',
}: {
  status?: number;
  statusText?: string;
  text?: string;
}): MockApiResponse {
  return {
    status: () => status,
    statusText: () => statusText,
    text: async () => text,
  };
}

type UserResponseDTO = {
  id: number;
  title: 'Mr' | 'Mrs' | 'Miss';
  name: string;
  email: string;
  birth_day: string;
  birth_month: string;
  birth_year: string;
  first_name: string;
  last_name: string;
  company: string;
  address1: string;
  address2: string;
  country: string;
  state: string;
  city: string;
  zipcode: string;
};

test('wrapResponse — success shape with user (validates schema)', async () => {
  const body = {
    responseCode: 200,
    data: {
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

  const mockResp = makeApiResponse({ text: JSON.stringify(body) });

  const wrapped = await wrapResponse<UserResponseDTO>(
    mockResp as unknown as APIResponse
  );

  expect(wrapped.responseCode).toBe(200);
  expect(wrapped.message).toBeUndefined();
  expect(wrapped.data).not.toBeNull();

  expect(wrapped.data?.email).toBe('alice@example.com');
});

test('wrapResponse — success shape with generic data payload', async () => {
  type GenericDataDTO = {
    id: number;
    value: string;
  };

  const body = {
    responseCode: 200,
    data: {
      id: 222,
      value: 'some payload',
    },
  };

  const mockResp = makeApiResponse({ text: JSON.stringify(body) });

  const wrapped = await wrapResponse<GenericDataDTO>(
    mockResp as unknown as APIResponse
  );

  expect(wrapped.responseCode).toBe(200);
  expect(wrapped.data).not.toBeNull();
  expect(wrapped.data?.id).toBe(222);
  expect(wrapped.data?.value).toBe('some payload');
});

test('wrapResponse — error shape with message', async () => {
  const body = {
    responseCode: 400,
    message: 'Bad request, email parameter is missing',
  };

  const mockResp = makeApiResponse({ text: JSON.stringify(body) });

  const wrapped = await wrapResponse<never>(mockResp as unknown as APIResponse);

  expect(wrapped.responseCode).toBe(400);
  expect(wrapped.message).toContain('Bad request');
  expect(wrapped.data).toBeNull();
});

test('wrapResponse — invalid JSON throws', async () => {
  const mockResp = makeApiResponse({ text: 'not a json' });

  await expect(() =>
    wrapResponse(mockResp as unknown as APIResponse)
  ).rejects.toThrow(/Invalid JSON/);
});
