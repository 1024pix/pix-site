const RETRYABLE_STATUS_CODES = [408, 425, 429, 500, 502, 503, 504];

// Retries network errors (no HTTP status, e.g. ECONNRESET or a connect timeout) and transient HTTP
// errors, like ofetch does, with an exponential backoff. Other HTTP errors (e.g. 403) are not retried.
export function isRetryableError(error) {
  const statusCode = error?.statusCode ?? error?.status;
  return statusCode === undefined || RETRYABLE_STATUS_CODES.includes(statusCode);
}

export async function withRetry(fn, { retries = 4, delay = 300, shouldRetry = isRetryableError, wait = defaultWait } = {}) {
  for (let attempt = 0; ; attempt++) {
    try {
      return await fn();
    } catch (error) {
      if (attempt >= retries || !shouldRetry(error)) throw error;
      await wait(delay * 2 ** attempt);
    }
  }
}

function defaultWait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
