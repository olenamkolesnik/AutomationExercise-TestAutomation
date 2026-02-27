import { logger } from '../../common/utils/logger';

export type RetryPredicate<T> = (
  error: unknown | null,
  result: T | null,
) => boolean;

export async function retry<T>(
  fn: () => Promise<T>,
  attempts: number = 3,
  delayMs: number = 500,
  backoff: number = 2,
  shouldRetry?: RetryPredicate<T>,
): Promise<T> {
  let lastError: unknown;
  let currentDelay = delayMs;

  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      logger.debug(`Retry attempt ${attempt}/${attempts}`);

      const result = await fn();

      // Allow caller to decide based on result
      if (shouldRetry && shouldRetry(null, result)) {
        throw new RetryableResultError(result);
      }

      return result;
    } catch (err) {
      lastError = err;

      if (attempt === attempts) {
        logger.error(
          `Retry failed after ${attempts} attempts. Error: ${String(err)}`,
        );
        throw unwrapRetryError(err);
      }

      const retryAllowed =
        err instanceof RetryableResultError ||
        isRetryableTransportError(err);

      if (!retryAllowed) {
        logger.error(`Non-retryable error: ${String(err)}`);
        throw unwrapRetryError(err);
      }

      logger.warn(
        `Attempt ${attempt} failed. Retrying in ${currentDelay}ms...`,
      );

      await new Promise((res) => setTimeout(res, currentDelay));
      currentDelay *= backoff;
    }
  }

  throw lastError ?? new Error('Retry failed unexpectedly');
}

class RetryableResultError<T = unknown> extends Error {
  constructor(public readonly result: T) {
    super('Retryable result');
  }
}

function unwrapRetryError(error: unknown) {
  if (error instanceof RetryableResultError) {
    return error.result;
  }
  return error;
}

function isRetryableTransportError(err: unknown): boolean {
  const message = String(err || '').toLowerCase();

  return (
    message.includes('net::') ||
    message.includes('timeout') ||
    message.includes('socket') ||
    message.includes('econnreset') ||
    message.includes('econnrefused')
  );
}