import Ajv, {JSONSchemaType } from 'ajv';
import addFormats from 'ajv-formats';
import { expect } from '@playwright/test';
import {logger} from "./logger"

const ajv = new Ajv({ allErrors: true, strict: false });
addFormats(ajv); // registers email, uri, date, etc.

export function expectSchema<T>(
  data: unknown,
  schema: JSONSchemaType<T> | object
): asserts data is T {
  const validate = ajv.compile(schema);
  logger.debug(`Validating schema: ${JSON.stringify(data)}`);
  const isValid = validate(data);

  expect(
    isValid,
    `Schema validation failed:\n${ajv.errorsText(validate.errors)}`
  ).toBe(true);
}