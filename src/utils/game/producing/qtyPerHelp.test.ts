import {describe, expect, it} from '@jest/globals';

import {testBaseProductionOfDrop} from '@/tests/production/rate';
import {getExpectedQtyPerHelp} from '@/utils/game/producing/qtyPerHelp';


describe('Pokemon Production (Daily Quantity)', () => {
  it('is correct', () => {
    const qtyPerHelp = getExpectedQtyPerHelp({
      rate: {
        berry: {
          ...testBaseProductionOfDrop,
          qtyPerHelp: 5,
        },
        ingredient: [
          {
            ...testBaseProductionOfDrop,
            qtyPerHelp: 10,
          },
          {
            ...testBaseProductionOfDrop,
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

    expect(qtyPerHelp).toBeCloseTo(5 * 0.85 + (10 + 20) / 2 * 0.15);
  });

  it('does not change even if the rate period is weekly', () => {
    const qtyPerHelp = getExpectedQtyPerHelp({
      rate: {
        berry: {
          ...testBaseProductionOfDrop,
          period: 'weekly',
          qtyPerHelp: 5,
        },
        ingredient: [
          {
            ...testBaseProductionOfDrop,
            period: 'weekly',
            qtyPerHelp: 10,
          },
          {
            ...testBaseProductionOfDrop,
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

    expect(qtyPerHelp).toBeCloseTo(5 * 0.85 + (10 + 20) / 2 * 0.15);
  });
});
