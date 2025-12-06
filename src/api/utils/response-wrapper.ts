import { APIResponse } from '@playwright/test';
import { ApiResponseWrapper } from '../models/api-response-wrapper-model';
import { logger } from './logger';
import { validateSchema } from './schemaValidator';

export async function wrapResponse<T>(
  response: APIResponse,
  schema?: object
): Promise<ApiResponseWrapper<T>> {
  logger.debug('Wrapping API response', {
    status: response.status(),
    statusText: response.statusText(),
    hasSchema: !!schema,
  });

  const rawText = await response.text();
  let body: any;
  try {
    body = rawText ? JSON.parse(rawText) : {};
  } catch (err) {
    logger.error(`Failed to parse body as JSON ${ rawText }`);
    throw new Error(`Invalid JSON returned by API: ${rawText}`);
  }

  logger.debug('Response body parsed', { body });

  // Validate schema (if provided) against the parsed body
  if (schema) {
    logger.debug('Validating response schema...');
    validateSchema(schema, body);
    logger.info('Schema validation passed');
  }

  // Required: responseCode must exist in this API
  const responseCode = body?.responseCode;
  if (responseCode === undefined || responseCode === null) {
    // include raw body for easier debugging
    throw new Error(
      `Unexpected API response format. Missing responseCode. Body: ${JSON.stringify(
        body
      )}`
    );
  }

  // message may be present only for error cases — don't require it for success.
  const message: string | undefined =
    typeof body.message === 'string' ? body.message : undefined;

  // The API returns payload either under "data" (common) or "user" (user-specific endpoint).
  // Prefer 'data', then 'user', then null.
  const data: T | null =
    body.data !== undefined ? (body.data as T) : body.user !== undefined ? (body.user as T) : null;

  // Build wrapper preserving existing ApiResponseWrapper shape
  const wrapped = new ApiResponseWrapper<T>(
    response.status(), // transport/http status (always 200 for this API)
    responseCode,
    message ?? '', // keep compatibility with existing model if it expects string
    data
  );

  logger.debug('Response wrapped successfully', {
    httpStatus: wrapped.httpStatus,
    responseCode: wrapped.responseCode,
    hasMessage: !!message,
    dataPresent: data !== null,
  });

  return wrapped;
}
