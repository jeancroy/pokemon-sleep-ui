import {describe, expect, it} from '@jest/globals';

import {getTheoreticalDailyQuantityInSleep} from '@/utils/game/producing/quantity';


describe('Pokemon Theoretical Daily Quantity in Sleep', () => {
  it('is correct', () => {
    const quantity = getTheoreticalDailyQuantityInSleep({
      rate: {
        berry: {
          id: NaN, // Ignored
          sleep1: {
            id: NaN,
            period: 'daily',
            frequency: NaN, // Ignored
            energy: NaN, // Ignored
            quantity: 75,
          },
          sleep2: {
            id: NaN,
            period: 'daily',
            frequency: NaN, // Ignored
            energy: NaN, // Ignored
            quantity: 0,
          },
          awake: {
            id: NaN, // Ignored
            period: 'daily',
            frequency: NaN, // Ignored
            energy: NaN, // Ignored
            quantity: NaN, // Ignored
          },
        },
        ingredient: [
          {
            id: NaN, // Ignored
            sleep1: {
              id: NaN,
              period: 'daily',
              frequency: NaN, // Ignored
              energy: NaN, // Ignored
              quantity: 40,
            },
            sleep2: {
              id: NaN,
              period: 'daily',
              frequency: NaN, // Ignored
              energy: NaN, // Ignored
              quantity: 0,
            },
            awake: {
              id: NaN, // Ignored
              period: 'daily',
              frequency: NaN, // Ignored
              energy: NaN, // Ignored
              quantity: NaN, // Ignored
            },
          },
          {
            id: NaN, // Ignored
            sleep1: {
              id: NaN,
              period: 'daily',
              frequency: NaN, // Ignored
              energy: NaN, // Ignored
              quantity: 20,
            },
            sleep2: {
              id: NaN,
              period: 'daily',
              frequency: NaN, // Ignored
              energy: NaN, // Ignored
              quantity: 10,
            },
            awake: {
              id: NaN, // Ignored
              period: 'daily',
              frequency: NaN, // Ignored
              energy: NaN, // Ignored
              quantity: NaN, // Ignored
            },
          },
        ],
      },
      produceSplit: {
        berry: 0.85,
        ingredient: 0.15,
        skill: 1,
      },
    });

    expect(quantity).toBeCloseTo(75 * 0.85 + (40 + 20 + 10) * 0.15);
  });

  it('is correct with weekly rate', () => {
    const quantity = getTheoreticalDailyQuantityInSleep({
      rate: {
        berry: {
          id: NaN, // Ignored
          sleep1: {
            id: NaN,
            period: 'weekly',
            frequency: NaN, // Ignored
            energy: NaN, // Ignored
            quantity: 75,
          },
          sleep2: {
            id: NaN,
            period: 'weekly',
            frequency: NaN, // Ignored
            energy: NaN, // Ignored
            quantity: 0,
          },
          awake: {
            id: NaN, // Ignored
            period: 'weekly',
            frequency: NaN, // Ignored
            energy: NaN, // Ignored
            quantity: NaN, // Ignored
          },
        },
        ingredient: [
          {
            id: NaN, // Ignored
            sleep1: {
              id: NaN,
              period: 'weekly',
              frequency: NaN, // Ignored
              energy: NaN, // Ignored
              quantity: 40,
            },
            sleep2: {
              id: NaN,
              period: 'weekly',
              frequency: NaN, // Ignored
              energy: NaN, // Ignored
              quantity: 0,
            },
            awake: {
              id: NaN, // Ignored
              period: 'weekly',
              frequency: NaN, // Ignored
              energy: NaN, // Ignored
              quantity: NaN, // Ignored
            },
          },
          {
            id: NaN, // Ignored
            sleep1: {
              id: NaN,
              period: 'weekly',
              frequency: NaN, // Ignored
              energy: NaN, // Ignored
              quantity: 20,
            },
            sleep2: {
              id: NaN,
              period: 'weekly',
              frequency: NaN, // Ignored
              energy: NaN, // Ignored
              quantity: 0,
            },
            awake: {
              id: NaN, // Ignored
              period: 'weekly',
              frequency: NaN, // Ignored
              energy: NaN, // Ignored
              quantity: NaN, // Ignored
            },
          },
        ],
      },
      produceSplit: {
        berry: 0.85,
        ingredient: 0.15,
        skill: 1,
      },
    });

    expect(quantity).toBeCloseTo((75 * 0.85 + (40 + 20) * 0.15) / 7);
  });
});
