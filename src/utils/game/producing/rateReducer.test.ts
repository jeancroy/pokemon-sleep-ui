import {describe, expect, it} from '@jest/globals';


import {getValueAfterSplitFromItemRateOfSessions} from '@/utils/game/producing/rateReducer';


describe('Pokemon Production Value After Split', () => {
  it('is correct for berry', () => {
    const {
      awake,
      sleep1Vacant,
      sleep1Filled,
      sleep2Vacant,
      sleep2Filled,
      equivalent,
      unfilledOnly,
    } = getValueAfterSplitFromItemRateOfSessions({
      period: 'daily',
      rate: {
        id: NaN, // Ignored
        sleep1: {
          id: NaN,
          period: 'daily',
          frequency: NaN, // Ignored
          energy: 500,
          quantity: NaN, // Ignored
        },
        sleep2: {
          id: NaN,
          period: 'daily',
          frequency: NaN, // Ignored
          energy: 0,
          quantity: NaN, // Ignored
        },
        awake: {
          id: NaN, // Ignored
          period: 'daily',
          frequency: NaN, // Ignored
          energy: 300,
          quantity: NaN, // Ignored
        },
      },
      valueKey: 'energy',
      sleepStateSplit: {
        awake: 16 / 24,
        sleep1Vacant: 6 / 24,
        sleep1Filled: 2 / 24,
        sleep2Vacant: 0,
        sleep2Filled: 0,
      },
      produceType: 'berry',
      produceItemSplit: 0.8,
    });

    expect(awake).toBeCloseTo(300 * 0.8 * (16 / 24));
    expect(sleep1Vacant).toBeCloseTo(500 * 0.8 * (6 / 24));
    expect(sleep1Filled).toBeCloseTo(500 * (2 / 24));
    expect(sleep2Vacant).toBeCloseTo(0);
    expect(sleep2Filled).toBeCloseTo(0);
    expect(equivalent).toBeCloseTo((300 * 16 / 24 + 500 * 6 / 24) * 0.8 + (500 * 2 / 24));
    expect(unfilledOnly).toBeCloseTo((300 * 16 / 24 + 500 * 6 / 24) * 0.8);
  });

  it('is correct for ingredient', () => {
    const {
      awake,
      sleep1Vacant,
      sleep1Filled,
      sleep2Vacant,
      sleep2Filled,
      equivalent,
      unfilledOnly,
    } = getValueAfterSplitFromItemRateOfSessions({
      period: 'daily',
      rate: {
        id: NaN, // Ignored
        sleep1: {
          id: NaN,
          period: 'daily',
          frequency: NaN, // Ignored
          energy: 500,
          quantity: NaN, // Ignored
        },
        sleep2: {
          id: NaN,
          period: 'daily',
          frequency: NaN, // Ignored
          energy: 0,
          quantity: NaN, // Ignored
        },
        awake: {
          id: NaN, // Ignored
          period: 'daily',
          frequency: NaN, // Ignored
          energy: 300,
          quantity: NaN, // Ignored
        },
      },
      valueKey: 'energy',
      sleepStateSplit: {
        awake: 16 / 24,
        sleep1Vacant: 6 / 24,
        sleep1Filled: 2 / 24,
        sleep2Vacant: 0,
        sleep2Filled: 0,
      },
      produceType: 'ingredient',
      produceItemSplit: 0.2,
    });


    expect(awake).toBeCloseTo(300 * 0.2 * (16 / 24));
    expect(sleep1Vacant).toBeCloseTo(500 * 0.2 * (6 / 24));
    expect(sleep1Filled).toBeCloseTo(0);
    expect(sleep2Vacant).toBeCloseTo(0);
    expect(sleep2Filled).toBeCloseTo(0);
    expect(equivalent).toBeCloseTo((300 * 16 / 24 + 500 * 6 / 24) * 0.2);
    expect(unfilledOnly).toBeCloseTo((300 * 16 / 24 + 500 * 6 / 24) * 0.2);
  });
});
