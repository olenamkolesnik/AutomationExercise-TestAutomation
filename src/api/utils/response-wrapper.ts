import { APIResponse } from '@playwright/test';
import { ApiResponseWrapper } from '../dto/api-response-wrapper-model';
import { logger } from './logger';

export async function wrapResponse<T>(
  response: APIResponse
): Promise<ApiResponseWrapper<T>> {
  logger.debug('Wrapping API response', {
    httpStatus: response.status(),
    statusText: response.statusText(),
  });

  const rawText = await response.text();
  let parsed: any = {};

  if (rawText?.trim()) {
    try {
      parsed = JSON.parse(rawText);
    } catch (error) {
      logger.error(`Failed to parse API response as JSON ${rawText}`);
      throw new Error(`Invalid JSON returned by API. Raw response: ${rawText}`);
    }
  }

  logger.debug('API response parsed', { parsed });

  // AutomationExercise-specific invariant:
  // responseCode is expected for all API responses
  if (parsed?.responseCode === undefined || parsed?.responseCode === null) {
    throw new Error(
      `Unexpected API response format. Missing 'responseCode'. Body: ${JSON.stringify(
        parsed
      )}`
    );
  }

  const message =
    typeof parsed?.message === 'string' ? parsed.message : undefined;

  // Normalize data payload (API is inconsistent across endpoints)
  const data: T | null = parsed?.data ?? parsed?.user ?? null;

  const wrapped = new ApiResponseWrapper<T>(
    response.status(), // transport-level status (usually always 200 here)
    parsed.responseCode, // business-level status
    message,
    data,
    parsed // rawBody for schema validation in tests
  );

  logger.debug('API response wrapped', {
    httpStatus: wrapped.httpStatus,
    responseCode: wrapped.responseCode,
    hasMessage: !!wrapped.message,
    hasData: wrapped.data !== null,
  });

  return wrapped;
}
