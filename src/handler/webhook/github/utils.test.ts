import {afterAll, beforeEach, describe, expect, it, jest} from '@jest/globals';

import {throwIfGithubSignatureFailed} from '@/handler/webhook/github/utils';


// https://docs.github.com/en/webhooks/using-webhooks/validating-webhook-deliveries
describe('Webhook / GitHub / Signature validation', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = {...OLD_ENV};
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });

  it('verifies', async () => {
    process.env.EXTERNAL_GITHUB_WEBHOOK_SECRET = 'It\'s a Secret to Everybody';

    await expect(throwIfGithubSignatureFailed({
      message: 'Hello, World!',
      expected: 'sha256=757107ea0eb2509fc211221cce984b8a37570b6d7586c22c46f4379c8b043e17',
    })).resolves.not.toThrow();
  });

  it('fails', async () => {
    process.env.EXTERNAL_GITHUB_WEBHOOK_SECRET = 'It\'s not a Secret to Everybody';

    await expect(throwIfGithubSignatureFailed({
      message: 'Hello, World!',
      expected: 'sha256=757107ea0eb2509fc211221cce984b8a37570b6d7586c22c46f4379c8b043e17',
    })).rejects.toThrow();
  });
});
