import { expect } from '@playwright/test';
import { isUserDTO } from '../dto/user-guard';
import { UserDTO } from '../dto/user-dto';

export function assertUserDTO(data: unknown): asserts data is UserDTO {
  expect(
    isUserDTO(data),
    `Expected UserDTO, but received: ${JSON.stringify(data)}`
  ).toBe(true);
}
