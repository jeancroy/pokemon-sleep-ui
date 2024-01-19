import {describe, expect, it} from '@jest/globals';

import {toBucketed} from '@/utils/number/bucket';


describe('Number / Bucketing', () => {
  it('is correct for data in ascending order', () => {
    const result = toBucketed({
      data: [50, 60, 80, 90, 120, 150],
      getBasis: (num) => num,
      count: 5,
      order: 'asc',
    });

    expect(result[0]).toEqual([50, 60]);
    expect(result[1]).toEqual([80, 90]);
    expect(result[2]).toEqual([]);
    expect(result[3]).toEqual([120]);
    expect(result[4]).toEqual([150]);
  });

  it('is correct for data in descending order', () => {
    const result = toBucketed({
      data: [150, 120, 90, 80, 60, 50],
      getBasis: (num) => num,
      count: 5,
      order: 'desc',
    });

    expect(result[0]).toEqual([150]);
    expect(result[1]).toEqual([120]);
    expect(result[2]).toEqual([90]);
    expect(result[3]).toEqual([80]);
    expect(result[4]).toEqual([60, 50]);
  });
});
