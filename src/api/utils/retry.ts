import { logger } from '../../common/utils/logger';
import type { APIResponse } from '@playwright/test';

export type RetryPredicate = (error: unknown, response?: APIResponse | null) => boolean;

export async function retry<T>(
  fn: () => Promise<T>,
  attempts: number = 3,
  delayMs: number = 500,
  backoff: number = 1,
  shouldRetry?: RetryPredicate
): Promise<T> {
  let lastError: unknown = null;
  let currentDelay = delayMs;

  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      logger.debug(`Retry attempt ${attempt}/${attempts}`);
      const result = await fn();
      // If caller provided a predicate, let them decide if we should treat result as retryable.
      if (shouldRetry) {
        const retry = shouldRetry(undefined, (result as unknown) as APIResponse);
        if (retry) {
          throw new Error('Predicate signaled retry required after result');
        }
      }
      return result;
    } catch (err) {
      lastError = err;
      // If last attempt, throw
      if (attempt === attempts) {
        logger.error(`Retry operation failed after ${attempts} attempts, finalAttempt: ${attempt}, err: ${String(err)}`);
        throw lastError;
      }
      // Determine retryability:
      const retryAllowed = isRetryableError(err);
      if (!retryAllowed) {
        logger.error(`Non-retryable error encountered, aborting retries',  err: ${String(err)}`);
        throw err;
      }
      logger.warn(`Attempt ${attempt} failed, retrying after ${currentDelay}ms,  err: ${String(err)}`);
      await new Promise(res => setTimeout(res, currentDelay));
      currentDelay *= backoff;
    }
  }
  throw lastError ?? new Error('Retry failed with unknown reason');
}

function isRetryableError(err: unknown): boolean {
  // Playwright network errors and HTTP 5xx are retryable.
  // For network-level, Playwright may throw its own error. We check string message.
  const msg = String(err || '').toLowerCase();
  if (msg.includes('ecxr') || msg.includes('net::') || msg.includes('timeout') || msg.includes('socket')) {
    return true;
  }
  // If caller passed APIResponse via thrown error containing status, handle below:
  if (err && typeof err === 'object' && 'status' in err) {
    const status = (err as { status?: unknown }).status;
    if (typeof status === 'number' && status >= 500) return true;
  }
  return false;
}
