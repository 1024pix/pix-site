import { vi } from 'vitest';
import { isRetryableError, withRetry } from '../../services/with-retry';

const wait = vi.fn(() => Promise.resolve());

describe('withRetry', () => {
  beforeEach(() => {
    wait.mockClear();
  });

  it('should return the result without retrying when it succeeds', async function () {
    // given
    const fn = vi.fn().mockResolvedValue('data');

    // when
    const result = await withRetry(fn, { wait });

    // then
    expect(result).toEqual('data');
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('should retry network errors with an exponential backoff until it succeeds', async function () {
    // given
    const networkError = new TypeError('fetch failed');
    const fn = vi.fn().mockRejectedValueOnce(networkError).mockRejectedValueOnce(networkError).mockResolvedValue('data');

    // when
    const result = await withRetry(fn, { delay: 100, wait });

    // then
    expect(result).toEqual('data');
    expect(fn).toHaveBeenCalledTimes(3);
    expect(wait.mock.calls).toEqual([[100], [200]]);
  });

  it('should throw the last error after the given number of retries', async function () {
    // given
    const error = Object.assign(new Error('Service Unavailable'), { statusCode: 503 });
    const fn = vi.fn().mockRejectedValue(error);

    // when
    const promise = withRetry(fn, { retries: 2, wait });

    // then
    await expect(promise).rejects.toBe(error);
    expect(fn).toHaveBeenCalledTimes(3);
  });

  it('should not retry errors that are not transient', async function () {
    // given
    const error = Object.assign(new Error('Forbidden'), { statusCode: 403 });
    const fn = vi.fn().mockRejectedValue(error);

    // when
    const promise = withRetry(fn, { wait });

    // then
    await expect(promise).rejects.toBe(error);
    expect(fn).toHaveBeenCalledTimes(1);
  });
});

describe('isRetryableError', () => {
  it.each([
    [new TypeError('fetch failed'), true],
    [{ statusCode: 500 }, true],
    [{ statusCode: 504 }, true],
    [{ status: 429 }, true],
    [{ statusCode: 403 }, false],
    [{ statusCode: 404 }, false],
  ])('should tell whether %o is retryable', function (error, expected) {
    expect(isRetryableError(error)).toBe(expected);
  });
});
