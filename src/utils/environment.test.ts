import {afterAll, beforeEach, describe, expect, it, jest} from '@jest/globals';

import {isAdsShouldShow} from '@/utils/environment';


describe('Environment / Ads Visibility', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = {...OLD_ENV};
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });

  it('shows ads', () => {
    // @ts-expect-error: Force writing readonly `NODE_ENV`
    process.env.NODE_ENV = 'production';

    expect(isAdsShouldShow(null)).toBeTruthy();
  });
});
