import { expect } from '@playwright/test';
import { logger } from '../../common/utils/logger';

export function expectSchema<T>(
  data: unknown,
  validate: (data: unknown) => boolean
): asserts data is T {
  const valid = validate(data);

  logger.debug(`Validating schema: ${JSON.stringify(data)}`);
  logger.debug(`Schema validation result: ${valid}, data: ${JSON.stringify(data)}`);
  expect(valid).toBe(true);
}