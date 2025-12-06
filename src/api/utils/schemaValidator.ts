import Ajv, { ErrorObject } from 'ajv';
import addFormats from 'ajv-formats';
import { logger } from './logger';

const ajv = new Ajv({ allErrors: true, strict: false });
addFormats(ajv); // registers email, uri, date, etc.

export function validateSchema(schema: object, data: unknown): void {
  const validate = ajv.compile(schema);
  const valid = validate(data);
  if (!valid) {
    const errors = validate.errors as ErrorObject[] | null;
    logger.error(`Schema validation failed ${ errors }`);
    // Normalize error message
    const message = errors
      ? errors.map(e => `${e.instancePath || '/'} ${e.message}`).join('; ')
      : 'Unknown schema validation error';
    throw new Error(`Schema validation error: ${message}`);
  }
}
