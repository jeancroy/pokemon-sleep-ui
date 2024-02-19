import {describe, expect, it} from '@jest/globals';

import {defaultProducingParams} from '@/const/game/production/defaults';
import {defaultRecoveryRate} from '@/const/user/settings';
import {getProduceSplit, getProducingStateSplit} from '@/utils/game/producing/split';
import {getSleepSessionInfo} from '@/utils/game/sleep';


describe('Pokemon Production (Split) / Item', () => {
  it('is correct in non-full pack', () => {
    const split = getProduceSplit({
      pokemonProducingParams: {
        ...defaultProducingParams,
        pokemonId: 1,
        ingredientSplit: 0.25631,
      },
      natureId: null,
      subSkillBonus: {},
      isFullPack: false,
    });

    expect(split.berry).toBeCloseTo(0.74369);
    expect(split.ingredient).toBeCloseTo(0.25631);
  });

  it('is correct full pack', () => {
    const split = getProduceSplit({
      pokemonProducingParams: {
        ...defaultProducingParams,
        pokemonId: 1,
        ingredientSplit: 0.25631,
      },
      natureId: null,
      subSkillBonus: {},
      isFullPack: true,
    });

    expect(split.berry).toBeCloseTo(1);
    expect(split.ingredient).toBeCloseTo(0);
  });
});

describe('Pokemon Production (Split) / Producing State', () => {
  it('is correct with single sleep session', () => {
    const split = getProducingStateSplit({
      sleepSessionInfo: getSleepSessionInfo({
        recoveryRate: defaultRecoveryRate,
        sleepSession: {
          primary: {start: 0, end: 8 * 3600},
          secondary: null,
        },
      }),
      fullPackStats: {
        bySleep: {
          primary: {
            duration: {vacant: 6 * 3600, filled: 2 * 3600},
            helpCount: {vacant: NaN, filled: NaN}, // ignore
          },
          secondary: null,
        },
      },
    });

    expect(split.awake).toBeCloseTo(16 / 24);
    expect(split.sleep1Vacant).toBeCloseTo(6 / 24);
    expect(split.sleep1Filled).toBeCloseTo(2 / 24);
    expect(split.sleep2Vacant).toBeCloseTo(0);
    expect(split.sleep2Filled).toBeCloseTo(0);
  });

  it('is correct with dual sleep sessions', () => {
    const split = getProducingStateSplit({
      sleepSessionInfo: getSleepSessionInfo({
        recoveryRate: defaultRecoveryRate,
        sleepSession: {
          primary: {start: 0, end: 7 * 3600},
          secondary: {start: 0, end: 1.5 * 3600},
        },
      }),
      fullPackStats: {
        bySleep: {
          primary: {
            duration: {vacant: 5 * 3600, filled: 2 * 3600},
            helpCount: {vacant: NaN, filled: NaN}, // ignore
          },
          secondary: {
            duration: {vacant: 0.5 * 3600, filled: 3600},
            helpCount: {vacant: NaN, filled: NaN}, // ignore
          },
        },
      },
    });

    expect(split.awake).toBeCloseTo(15.5 / 24);
    expect(split.sleep1Vacant).toBeCloseTo(5 / 24);
    expect(split.sleep1Filled).toBeCloseTo(2 / 24);
    expect(split.sleep2Vacant).toBeCloseTo(0.5 / 24);
    expect(split.sleep2Filled).toBeCloseTo(1 / 24);
  });
});
