import { APIResponse } from '@playwright/test';

import type { JsonValue } from '../../common/types/json-type';
import { logger } from '../../common/utils/logger';
import { ApiResponse } from './api-response';

type RawApiResponse = {
  responseCode: number;
  message?: string;
  [key: string]: JsonValue | undefined;
};

export async function wrapResponse<T>(
  response: APIResponse,
): Promise<ApiResponse<T>> {
  const rawText = await response.text();

  if (!rawText?.trim()) {
    throw new Error(`Empty API response body (HTTP ${response.status()})`);
  }

  let parsed: RawApiResponse;

  try {
    parsed = JSON.parse(rawText) as RawApiResponse;
  } catch (error) {
    logger.error(`Failed to parse API response, 
      httpStatus: ${response.status()},
      rawResponse: ${rawText},
      error: ${error}`);

    throw new Error(`Invalid JSON returned by API`);
  }

  const { responseCode, message, ...rest } = parsed;

  if (responseCode === undefined || responseCode === null) {
    throw new Error(
      `Unexpected API response format. Missing 'responseCode'. Body: ${rawText}`,
    );
  }

  // Remove undefined fields
  const payloadEntries = Object.entries(rest).filter(
    ([, value]) => value !== undefined,
  );

  let data: T | null = null;

  if (payloadEntries.length > 0) {
    // Prefer "data" if API uses standard envelope
    const dataEntry = payloadEntries.find(([key]) => key === 'data');

    if (dataEntry) {
      data = dataEntry[1] as T;
    } else {
      // fallback to first payload field
      data = payloadEntries[0][1] as T;
    }
  }

  logger.debug('API response processed', {
    httpStatus: response.status(),
    responseCode,
    message: message ?? null,
    payloadKeys: payloadEntries.map(([key]) => key),
    hasData: data !== null,
  });

  return new ApiResponse<T>(
    response.status(),
    responseCode,
    typeof message === 'string' ? message : undefined,
    data,
    parsed,
  );
}
