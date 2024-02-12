import {describe, expect, it} from '@jest/globals';

import {testBonus} from '@/tests/data/game/bonus';
import {getDailyBaseQtyInSleep} from '@/utils/game/producing/quantity';


describe('Pokemon Theoretical Daily Quantity in Sleep', () => {
  it('is correct', () => {
    const quantity = getDailyBaseQtyInSleep({
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
      bonus: testBonus['1'],
      produceSplit: {
        berry: 0.85,
        ingredient: 0.15,
        skill: 1,
      },
    });

    expect(quantity).toBeCloseTo(75 / 2.2 * 0.85 + (40 + 20 + 10) / 2.2 * 0.15);
  });

  it('is correct with weekly rate', () => {
    const quantity = getDailyBaseQtyInSleep({
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
      bonus: testBonus['1'],
      produceSplit: {
        berry: 0.85,
        ingredient: 0.15,
        skill: 1,
      },
    });

    expect(quantity).toBeCloseTo((75 / 2.2 * 0.85 + (40 + 20) / 2.2 * 0.15) / 7);
  });
});
