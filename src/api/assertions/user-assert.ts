import { expect } from '@playwright/test';
import { isUserDetailsResponse } from '../models/guards/user.guard';
import { CreateUserRequest } from '../models/requests/create-user.request';

export function assertUserDetailsResponse(data: unknown): asserts data is CreateUserRequest {
  expect(
    isUserDetailsResponse(data),
    `Expected UserDTO, but received: ${JSON.stringify(data)}`
  ).toBe(true);
}
