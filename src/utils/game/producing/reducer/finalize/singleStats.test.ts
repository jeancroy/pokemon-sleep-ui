import {describe, expect, it} from '@jest/globals';

import {testBaseProducingRateOfDrop} from '@/tests/producing/rate';
import {getFinalizedProducingRateSingleStats} from '@/utils/game/producing/reducer/finalize/singleStats';


describe('Pokemon Production (Finalization) / Single Stats', () => {
  it('is correct', () => {
    const {
      awake,
      sleep1Vacant,
      sleep1Filled,
      sleep2Vacant,
      sleep2Filled,
      equivalent,
      unfilledOnly,
    } = getFinalizedProducingRateSingleStats({
      period: 'daily',
      rate: {
        id: NaN, // ignore
        awake: {
          ...testBaseProducingRateOfDrop,
          strength: 300,
        },
        sleep1Vacant: {
          ...testBaseProducingRateOfDrop,
          strength: 500,
        },
        sleep1Filled: {
          ...testBaseProducingRateOfDrop,
          strength: 200,
        },
        sleep2Vacant: {
          ...testBaseProducingRateOfDrop,
          strength: 0,
        },
        sleep2Filled: {
          ...testBaseProducingRateOfDrop,
          strength: 0,
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
    expect(equivalent).toBeCloseTo((300 + 500 + 200) * 0.8);
    expect(unfilledOnly).toBeCloseTo((300 + 500) * 0.8);
  });
});
