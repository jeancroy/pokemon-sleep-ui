import {describe, expect, it} from '@jest/globals';

import {testBaseProducingRateOfDrop} from '@/tests/producing/rate';
import {getExpectedQtyPerHelp} from '@/utils/game/producing/qtyPerHelp';


describe('Pokemon Production (Daily Quantity)', () => {
  it('is correct', () => {
    const qtyPerHelp = getExpectedQtyPerHelp({
      rate: {
        berry: {
          ...testBaseProducingRateOfDrop,
          qtyPerHelp: 5,
        },
        ingredient: [
          {
            ...testBaseProducingRateOfDrop,
            qtyPerHelp: 10,
          },
          {
            ...testBaseProducingRateOfDrop,
            qtyPerHelp: 20,
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

  it('does not change even if the rate period is weekly', () => {
    const qtyPerHelp = getExpectedQtyPerHelp({
      rate: {
        berry: {
          ...testBaseProducingRateOfDrop,
          period: 'weekly',
          qtyPerHelp: 5,
        },
        ingredient: [
          {
            ...testBaseProducingRateOfDrop,
            period: 'weekly',
            qtyPerHelp: 10,
          },
          {
            ...testBaseProducingRateOfDrop,
            period: 'weekly',
            qtyPerHelp: 20,
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
