import {describe, expect, it} from '@jest/globals';

import {testBaseProducingRateOfBranch} from '@/tests/producing/rate';
import {getExpectedQtyPerHelp} from '@/utils/game/producing/qtyPerHelp';


describe('Pokemon Theoretical Daily Quantity in Sleep', () => {
  it('is correct', () => {
    const qtyPerHelp = getExpectedQtyPerHelp({
      rate: {
        berry: {
          id: NaN, // Ignored
          rateBase: {
            ...testBaseProducingRateOfBranch,
            qtyPerHelp: 5,
          },
          sleep1: testBaseProducingRateOfBranch,
          sleep2: testBaseProducingRateOfBranch,
          awake: testBaseProducingRateOfBranch,
        },
        ingredient: [
          {
            id: NaN, // Ignored
            rateBase: {
              ...testBaseProducingRateOfBranch,
              qtyPerHelp: 10,
            },
            sleep1: testBaseProducingRateOfBranch,
            sleep2: testBaseProducingRateOfBranch,
            awake: testBaseProducingRateOfBranch,
          },
          {
            id: NaN, // Ignored
            rateBase: {
              ...testBaseProducingRateOfBranch,
              qtyPerHelp: 20,
            },
            sleep1: testBaseProducingRateOfBranch,
            sleep2: testBaseProducingRateOfBranch,
            awake: testBaseProducingRateOfBranch,
          },
        ],
      },
      produceSplit: {
        berry: 0.85,
        ingredient: 0.15,
        skill: 1,
      },
    });

    expect(qtyPerHelp).toBeCloseTo(5 * 0.85 + (10 + 20) * 0.15);
  });

  it('is correct with weekly rate', () => {
    const qtyPerHelp = getExpectedQtyPerHelp({
      rate: {
        berry: {
          id: NaN, // Ignored
          rateBase: {
            ...testBaseProducingRateOfBranch,
            period: 'weekly',
            qtyPerHelp: 5,
          },
          sleep1: testBaseProducingRateOfBranch,
          sleep2: testBaseProducingRateOfBranch,
          awake: testBaseProducingRateOfBranch,
        },
        ingredient: [
          {
            id: NaN, // Ignored
            rateBase: {
              ...testBaseProducingRateOfBranch,
              period: 'weekly',
              qtyPerHelp: 10,
            },
            sleep1: testBaseProducingRateOfBranch,
            sleep2: testBaseProducingRateOfBranch,
            awake: testBaseProducingRateOfBranch,
          },
          {
            id: NaN, // Ignored
            rateBase: {
              ...testBaseProducingRateOfBranch,
              period: 'weekly',
              qtyPerHelp: 20,
            },
            sleep1: testBaseProducingRateOfBranch,
            sleep2: testBaseProducingRateOfBranch,
            awake: testBaseProducingRateOfBranch,
          },
        ],
      },
      produceSplit: {
        berry: 0.85,
        ingredient: 0.15,
        skill: 1,
      },
    });

    expect(qtyPerHelp).toBeCloseTo(5 * 0.85 + (10 + 20) * 0.15);
  });
});
