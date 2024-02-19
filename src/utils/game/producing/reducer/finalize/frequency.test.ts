import {describe, expect, it} from '@jest/globals';

import {testBaseProducingRateOfDrop} from '@/tests/producing/rate';
import {getFinalizedProducingFrequency} from '@/utils/game/producing/reducer/finalize/frequency';


describe('Pokemon Production (Finalization) / Frequency', () => {
  it('is correct if all frequencies are available', () => {
    const {
      awake,
      sleep1Vacant,
      sleep1Filled,
      sleep2Vacant,
      sleep2Filled,
      equivalent,
      unfilledOnly,
    } = getFinalizedProducingFrequency({
      rate: {
        id: NaN, // ignore
        awake: {
          ...testBaseProducingRateOfDrop,
          frequency: 1600,
        },
        sleep1Vacant: {
          ...testBaseProducingRateOfDrop,
          frequency: 2400,
        },
        sleep1Filled: {
          ...testBaseProducingRateOfDrop,
          frequency: 3200,
        },
        sleep2Vacant: {
          ...testBaseProducingRateOfDrop,
          frequency: 3600,
        },
        sleep2Filled: {
          ...testBaseProducingRateOfDrop,
          frequency: 4000,
        },
      },
      producingStateSplit: {
        awake: 16 / 24,
        sleep1Vacant: 6 / 24,
        sleep1Filled: 2 / 24,
        sleep2Vacant: 0,
        sleep2Filled: 0,
      },
      produceSplitRate: 0.8,
    });

    expect(awake).toBeCloseTo(2000);
    expect(sleep1Vacant).toBeCloseTo(3000);
    expect(sleep1Filled).toBeCloseTo(4000);
    expect(sleep2Vacant).toBeCloseTo(4500);
    expect(sleep2Filled).toBeCloseTo(5000);
    expect(equivalent).toBeCloseTo(2285.714);
    expect(unfilledOnly).toBeCloseTo(2400);
  });

  it('is correct if some frequencies are infinity', () => {
    const {
      awake,
      sleep1Vacant,
      sleep1Filled,
      sleep2Vacant,
      sleep2Filled,
      equivalent,
      unfilledOnly,
    } = getFinalizedProducingFrequency({
      rate: {
        id: NaN, // ignore
        awake: {
          ...testBaseProducingRateOfDrop,
          frequency: 1600,
        },
        sleep1Vacant: {
          ...testBaseProducingRateOfDrop,
          frequency: 2400,
        },
        sleep1Filled: {
          ...testBaseProducingRateOfDrop,
          frequency: Infinity,
        },
        sleep2Vacant: {
          ...testBaseProducingRateOfDrop,
          frequency: 3600,
        },
        sleep2Filled: {
          ...testBaseProducingRateOfDrop,
          frequency: Infinity,
        },
      },
      producingStateSplit: {
        awake: 16 / 24,
        sleep1Vacant: 6 / 24,
        sleep1Filled: 1 / 24,
        sleep2Vacant: 1 / 24,
        sleep2Filled: 0,
      },
      produceSplitRate: 0.2,
    });

    expect(awake).toBeCloseTo(8000);
    expect(sleep1Vacant).toBeCloseTo(12000);
    expect(sleep1Filled).toBeCloseTo(Infinity);
    expect(sleep2Vacant).toBeCloseTo(18000);
    expect(sleep2Filled).toBeCloseTo(Infinity);
    expect(equivalent).toBeCloseTo(9391.304);
    expect(unfilledOnly).toBeCloseTo(9391.304);
  });
});
