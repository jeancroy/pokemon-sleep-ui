import {describe, expect, it} from '@jest/globals';

import {getUnblockedIntervals, getUnblockedIntervalsBySingle, mergeIntervals} from '@/utils/compute/interval';


describe('Interval / Merge', () => {
  it('merges overlapping 2 into 1', () => {
    const result = [...mergeIntervals([
      {start: 1, end: 3},
      {start: 2, end: 4},
    ])];

    expect(result).toHaveLength(1);
    expect(result[0]).toStrictEqual({start: 1, end: 4});
  });

  it('ignores completely overlapped one', () => {
    const result = [...mergeIntervals([
      {start: 1, end: 4},
      {start: 2, end: 3},
    ])];

    expect(result).toHaveLength(1);
    expect(result[0]).toStrictEqual({start: 1, end: 4});
  });

  it('ignores non-overlapping ones', () => {
    const result = [...mergeIntervals([
      {start: 1, end: 2},
      {start: 3, end: 4},
    ])];

    expect(result).toHaveLength(2);
    expect(result[0]).toStrictEqual({start: 1, end: 2});
    expect(result[1]).toStrictEqual({start: 3, end: 4});
  });

  it('merges multiple intervals', () => {
    const result = [...mergeIntervals([
      {start: 1, end: 3},
      {start: 2, end: 7},
      {start: 8, end: 10},
      {start: 13, end: 16},
    ])];

    expect(result).toHaveLength(3);
    expect(result[0]).toStrictEqual({start: 1, end: 7});
    expect(result[1]).toStrictEqual({start: 8, end: 10});
    expect(result[2]).toStrictEqual({start: 13, end: 16});
  });
});

describe('Interval / Get Unblocked by Single', () => {
  it('breaks 1 into 2 if overlapped', () => {
    const result = [...getUnblockedIntervalsBySingle({
      base: [{start: 1, end: 10}, {start: 11, end: 15}],
      singleBlocked: {start: 3, end: 4},
    })];

    expect(result).toHaveLength(3);
    expect(result[0]).toStrictEqual({start: 1, end: 3});
    expect(result[1]).toStrictEqual({start: 4, end: 10});
    expect(result[2]).toStrictEqual({start: 11, end: 15});
  });

  it('removes overlapped area', () => {
    const result = [...getUnblockedIntervalsBySingle({
      base: [{start: 1, end: 3}, {start: 11, end: 15}],
      singleBlocked: {start: 2, end: 4},
    })];

    expect(result).toHaveLength(2);
    expect(result[0]).toStrictEqual({start: 1, end: 2});
    expect(result[1]).toStrictEqual({start: 11, end: 15});
  });

  it('ignores non-overlapping ones', () => {
    const result = [...getUnblockedIntervalsBySingle({
      base: [{start: 1, end: 2}, {start: 11, end: 15}],
      singleBlocked: {start: 3, end: 4},
    })];

    expect(result).toHaveLength(2);
    expect(result[0]).toStrictEqual({start: 1, end: 2});
    expect(result[1]).toStrictEqual({start: 11, end: 15});
  });

  it('does not return 2 if start overlaps', () => {
    const result = [...getUnblockedIntervalsBySingle({
      base: [{start: 1, end: 10}],
      singleBlocked: {start: 1, end: 3},
    })];

    expect(result).toHaveLength(1);
    expect(result[0]).toStrictEqual({start: 3, end: 10});
  });
});

describe('Interval / Get Unblocked', () => {
  it('removes multiple intervals', () => {
    const result = [...getUnblockedIntervals({
      base: [
        {start: 1, end: 5},
        {start: 7, end: 9},
      ],
      blocked: [
        {start: 2, end: 3},
        {start: 4, end: 6},
        {start: 11, end: 13},
      ],
    })];

    expect(result).toHaveLength(3);
    expect(result[0]).toStrictEqual({start: 1, end: 2});
    expect(result[1]).toStrictEqual({start: 3, end: 4});
    expect(result[2]).toStrictEqual({start: 7, end: 9});
  });
});
