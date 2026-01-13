import { APIResponse } from '@playwright/test';
import { ApiResponseWrapper } from '../dto/api-response-wrapper-model';
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
  let parsed: any;
  try {
    parsed = rawText && rawText.trim() ? JSON.parse(rawText) : {};
  } catch (err) {
    logger.error(`Failed to parse response as JSON, ${ rawText }`);
    throw new Error(`Invalid JSON returned by API: ${rawText}`);
  }

  logger.debug('Response body parsed', { parsed });

  // If schema provided, validate against full parsed body
  if (schema) {
    logger.debug('Validating response schema...');
    validateSchema(schema, parsed);
    logger.info('Schema validation passed');
  }

  const responseCode = parsed?.responseCode;
  if (responseCode === undefined || responseCode === null) {
    // For robustness, include parsed in message
    throw new Error(`Unexpected API response format. Missing responseCode. Body: ${JSON.stringify(parsed)}`);
  }

  const message: string | undefined = typeof parsed?.message === 'string' ? parsed.message : undefined;

  // prefer 'data' then 'user' then null
  const data: T | null = parsed?.data ?? parsed?.user ?? null;

  const wrapped = new ApiResponseWrapper<T>(
    response.status(),       // transport status (always 200 for this system)
    responseCode,
    message,
    data
  );

  logger.debug('Response wrapped', {
    httpStatus: wrapped.httpStatus,
    responseCode: wrapped.responseCode,
    hasMessage: !!wrapped.message,
    dataPresent: wrapped.data !== null,
  });

  return wrapped;
}
