import {describe, expect, it} from '@jest/globals';

import {testBaseProductionOfDrop} from '@/tests/production/rate';
import {getFinalizedProductionSingleStats} from '@/utils/game/producing/reducer/finalize/singleStats';


describe('Pokemon Production (Finalization) / Single Stats', () => {
  it('is correct', () => {
    const {
      awake,
      sleep1Vacant,
      sleep1Filled,
      sleep2Vacant,
      sleep2Filled,
      base,
      equivalent,
      unfilledOnly,
    } = getFinalizedProductionSingleStats({
      period: 'daily',
      rate: {
        base: {
          ...testBaseProductionOfDrop,
          strength: 888,
        },
        final: {
          id: NaN, // ignore
          awake: {
            ...testBaseProductionOfDrop,
            strength: 300,
          },
          sleep1Vacant: {
            ...testBaseProductionOfDrop,
            strength: 500,
          },
          sleep1Filled: {
            ...testBaseProductionOfDrop,
            strength: 200,
          },
          sleep2Vacant: {
            ...testBaseProductionOfDrop,
            strength: 0,
          },
          sleep2Filled: {
            ...testBaseProductionOfDrop,
            strength: 0,
          },
        },
      },
      key: 'strength',
      producingStateSplit: {
        awake: NaN, // ignore
        sleep1Vacant: NaN, // ignore
        sleep1Filled: NaN, // ignore
        sleep2Vacant: NaN, // ignore
        sleep2Filled: NaN, // ignore
      },
      produceSplitRate: 0.8,
    });

    expect(awake).toBeCloseTo(300 * 0.8);
    expect(sleep1Vacant).toBeCloseTo(500 * 0.8);
    expect(sleep1Filled).toBeCloseTo(200 * 0.8);
    expect(sleep2Vacant).toBeCloseTo(0);
    expect(sleep2Filled).toBeCloseTo(0);
    expect(base).toBeCloseTo(888 * 0.8);
    expect(equivalent).toBeCloseTo((300 + 500 + 200) * 0.8);
    expect(unfilledOnly).toBeCloseTo((300 + 500) * 0.8);
  });
});
