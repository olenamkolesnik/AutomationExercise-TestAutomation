import { APIResponse } from '@playwright/test';
import { ApiResponse } from '../models/api-response';
import { logger } from '../../common/utils/logger';
import type { JsonValue } from '../../common/types/json-type';

type RawApiResponse = {
  responseCode: number;
  message?: string;
  [key: string]: JsonValue | undefined;
};

export async function wrapResponse<T extends JsonValue>(
  response: APIResponse
): Promise<ApiResponse<T>> {
  const rawText = await response.text();

  if (!rawText?.trim()) {
    throw new Error('Empty API response body');
  }

  let parsed: RawApiResponse;

  try {
    parsed = JSON.parse(rawText) as RawApiResponse;
  } catch (error) {
    logger.error(`Failed to parse API response as JSON, httpStatus: ${response.status()}, rawResponse: ${rawText}, error: ${error}`);
    throw new Error(`Invalid JSON returned by API. Raw response: ${rawText}`);
  }

  const { responseCode, message, ...rest } = parsed;

  if (responseCode === undefined || responseCode === null) {
    throw new Error(
      `Unexpected API response format. Missing 'responseCode'. Body: ${JSON.stringify(
        parsed
      )}`
    );
  }

  // Extract dynamic payload (AutomationExercise API behavior)
  const payloadEntries = Object.entries(rest).filter(
    ([, value]) => value !== undefined
  );

  let data: T | null = null;

  if (payloadEntries.length === 1) {
    data = payloadEntries[0][1] as T;
  } else if (payloadEntries.length > 1) {
    data = rest as T;
  }

  logger.debug('API response processed', {
    httpStatus: response.status(),
    responseCode,
    message: message ?? null,
    payloadKeys: payloadEntries.map(([key]) => key),
    hasData: data !== null,
    payload: data ?? null,
  });  

  return new ApiResponse<T>(
    response.status(), // transport-level status
    responseCode,      // business-level status
    typeof message === 'string' ? message : undefined,
    data,
    parsed             // raw body for test-level assertions
  );
}
